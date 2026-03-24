import items from 'common/ITEMS/deathknight';
import SPELLS from 'common/SPELLS';
import { TALENTS_PALADIN } from 'common/TALENTS';
import { CastDetail, CastInSequence, GuideSection, PerCastData } from 'interface/guide/components';
import { SpellSequence } from 'interface/guide/components/CastSequence';
import SpellLink from 'interface/SpellLink';
import { spellName } from 'interface/Table/ThroughputTable';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, {
  AnyEvent,
  CastEvent,
  DamageEvent,
  EventType,
  FightEndEvent,
  GlobalCooldownEvent,
  RemoveBuffEvent,
} from 'parser/core/Events';
import MajorCooldown, { CooldownTrigger } from 'parser/core/MajorCooldowns/MajorCooldown';
import { ChecklistUsageInfo, SpellUse } from 'parser/core/SpellUsage/core';
import {
  evaluateQualitativePerformanceByThreshold,
  getLowestPerf,
  QualitativePerformance,
} from 'parser/ui/QualitativePerformance';
import { ReactNode } from 'react';

interface ExecutionSentenceTimeline {
  start: number;
  end?: number | null;
  events: AnyEvent[];
}
interface ExecutionSentenceCooldownCast extends CooldownTrigger<CastEvent> {
  globalCooldowns: number[];
  unusedGcdTime: number;
  timeline: ExecutionSentenceTimeline;
}

const GCD_TOLERANCE = 25;

class ExecutionSentence extends MajorCooldown<ExecutionSentenceCooldownCast> {
  #activeWindow: ExecutionSentenceCooldownCast | null = null;
  #globalCooldownEnds = 0;

  constructor(options: Options) {
    super({ spell: TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT }, options);

    this.active = this.selectedCombatant.hasTalent(TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT);

    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT),
      this.#onExecutionSentenceCast,
    );
    this.addEventListener(
      Events.removebuff.by(SELECTED_PLAYER).spell(SPELLS.EXECUTION_SENTENCE_BUFF),
      this.#onExecutionSentenceEnd,
    );
    this.addEventListener(Events.fightend, this.#onExecutionSentenceEnd);

    this.addEventListener(Events.cast.by(SELECTED_PLAYER), this.#onCast);
    this.addEventListener(Events.GlobalCooldown.by(SELECTED_PLAYER), this.#onGlobalCooldown);
  }

  #onExecutionSentenceCast(event: CastEvent) {
    this.#activeWindow = {
      event: event,
      globalCooldowns: [],
      timeline: {
        start: Math.max(event.timestamp, this.#globalCooldownEnds),
        events: [],
      },
      unusedGcdTime: 0,
    };
  }

  #onExecutionSentenceEnd(event: RemoveBuffEvent | FightEndEvent) {
    if (!this.#activeWindow) {
      return;
    }
    this.#activeWindow.timeline.end = event.timestamp;

    this.recordCooldown(this.#activeWindow);
    this.#activeWindow = null;
  }

  #onCast(event: CastEvent) {
    if (!this.#activeWindow || event.ability.guid === SPELLS.MELEE.id || !event.globalCooldown) {
      return;
    }

    this.#activeWindow.unusedGcdTime += Math.max(event.timestamp - this.#globalCooldownEnds, 0);
    this.#activeWindow.timeline.events.push(event);
  }

  #onGlobalCooldown(event: GlobalCooldownEvent) {
    this.#globalCooldownEnds = event.duration + event.timestamp;
    if (this.#activeWindow) {
      this.#activeWindow.globalCooldowns.push(event.duration);
    }
  }

  #getAverageGcdOfWindow(cast: ExecutionSentenceCooldownCast) {
    return (
      cast.globalCooldowns.reduce((t, gcdDuration) => (t += gcdDuration + GCD_TOLERANCE), 0) /
      (cast.globalCooldowns.length ?? 1)
    );
  }

  #getUnusedGlobalCooldowns(cast: ExecutionSentenceCooldownCast) {
    const avgGcd = this.#getAverageGcdOfWindow(cast);
    return Math.max(Math.floor(cast.unusedGcdTime / avgGcd), 0);
  }

  #buildSpellSequence(cast: ExecutionSentenceCooldownCast): CastInSequence[] {
    return cast.timeline.events
      .filter((event): event is CastEvent => event.type === EventType.Cast)
      .map((event) => ({
        timestamp: event.timestamp,
        spellId: event.ability.guid,
        spellName: event.ability.name,
        icon: event.ability.abilityIcon.replace('.jpg', ''),
        tooltip: (
          <>
            <SpellLink spell={event.ability.guid} />
            <div>@ {this.owner.formatTimestamp(event.timestamp)}</div>
          </>
        ),
      }));
  }

  description(): ReactNode {
    return (
      <>
        <SpellLink spell={TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT} /> description.
      </>
    );
  }

  #gcdPerformance(cast: ExecutionSentenceCooldownCast): ChecklistUsageInfo {
    const avgGcd = this.#getAverageGcdOfWindow(cast);
    const unusedGlobalCooldowns = Math.max(Math.floor(cast.unusedGcdTime / avgGcd), 0);
    const estimatedPotentialCasts = (cast.timeline.end! - cast.timeline.start) / avgGcd;
    const gcdPerfCalc = (unusedGlobalCooldowns / estimatedPotentialCasts) * 100;

    return {
      check: 'global-cooldown',
      timestamp: cast.event.timestamp,
      performance: evaluateQualitativePerformanceByThreshold({
        actual: gcdPerfCalc,
        isLessThanOrEqual: {
          perfect: 7.5,
          good: 15,
          ok: 25,
        },
      }),
      details: <div>{unusedGlobalCooldowns} unused global cooldowns</div>,
      summary: <div>gcd summarysdsd</div>,
    };
  }

  explainPerformance(cast: ExecutionSentenceCooldownCast): SpellUse {
    const checklistItems: ChecklistUsageInfo[] = [this.#gcdPerformance(cast)];

    const overallPerformance =
      checklistItems.length > 0
        ? getLowestPerf(checklistItems.map((item) => item.performance))
        : QualitativePerformance.Perfect;

    return {
      event: cast.event,
      checklistItems: checklistItems,
      performance: overallPerformance,
      extraDetails: <>Extra details</>,
    };
  }

  #buildPerCastData(): PerCastData[] {
    return this.casts.map((cast) => {
      const spellUse = this.explainPerformance(cast);
      const castSequence = this.#buildSpellSequence(cast);
      console.log('sequence', castSequence);
      const unusedGlobalCooldowns = this.#getUnusedGlobalCooldowns(cast);

      return {
        performance: spellUse.performance,
        timestamp: this.owner.formatTimestamp(cast.event.timestamp),
        stats: [
          {
            value: unusedGlobalCooldowns,
            label: 'Unused GCDs',
            tooltip: <>Estimated unused global cooldowns during this window.</>,
            performance: this.#gcdPerformance(cast).performance,
          },
        ],
        additionalContent:
          castSequence.length > 0
            ? {
                title: 'Cast Sequence',
                content: <SpellSequence casts={castSequence} iconSize={40} />,
              }
            : undefined,
      };
    });
  }

  get guideSubsection() {
    return (
      <GuideSection
        spell={TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT}
        explanation={this.description()}
      >
        <CastDetail title="Execution Sentence Windows" casts={this.#buildPerCastData()} />
      </GuideSection>
    );
  }
}

export default ExecutionSentence;
