import items from 'common/ITEMS/deathknight';
import { TALENTS_PALADIN } from 'common/TALENTS';
import { CastDetail, GuideSection, PerCastData } from 'interface/guide/components';
import SpellLink from 'interface/SpellLink';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, {
  AnyEvent,
  CastEvent,
  DamageEvent,
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
  #executionSentenceCasts: ExecutionSentenceCooldownCast[] = [];
  #activeWindow: ExecutionSentenceCooldownCast | null = null;
  #globalCooldownEnds = 0;

  constructor(options: Options) {
    super({ spell: TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT }, options);

    this.active = this.selectedCombatant.hasTalent(TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT);

    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT),
      this.#onExecutionSentenceCast,
    );

    this.addEventListener(Events.cast.by(SELECTED_PLAYER), this.#onCast);

    this.addEventListener(Events.GlobalCooldown.by(SELECTED_PLAYER), this.#onGlobalCooldown);

    this.addEventListener(Events.removebuff.by(SELECTED_PLAYER), this.#onExecutionSentenceEnd);
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

  #onExecutionSentenceEnd(event: RemoveBuffEvent) {
    if (!this.#activeWindow) {
      return;
    }

    this.recordCooldown(this.#activeWindow);
    this.#activeWindow = null;
  }

  #onCast(event: CastEvent) {
    if (!this.#activeWindow) {
      return;
    }

    this.#activeWindow.unusedGcdTime += Math.max(event.timestamp - this.#globalCooldownEnds, 0);
  }

  #onGlobalCooldown(event: GlobalCooldownEvent) {
    this.#globalCooldownEnds = event.duration + event.timestamp;
    if (this.#activeWindow) {
      this.#activeWindow.timeline.events?.push(event);
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

  description(): ReactNode {
    return (
      <>
        <SpellLink spell={TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT} /> description.
      </>
    );
  }

  #gcdPerformance(cast: ExecutionSentenceCooldownCast): ChecklistUsageInfo {
    const unusedGcds = this.#getUnusedGlobalCooldowns(cast);

    return {
      check: 'global-cooldown',
      timestamp: cast.event.timestamp,
      performance: evaluateQualitativePerformanceByThreshold({
        actual: unusedGcds,
        isLessThan: {
          perfect: 0,
          good: 1,
          ok: 3,
        },
      }),
      details: <>{unusedGcds} unused global cooldowns</>,
      summary: <>gcd summarysdsd</>,
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

      return {
        performance: spellUse.performance,
        timestamp: this.owner.formatTimestamp(cast.event.timestamp),
        stats: [
          {
            value: this.#getUnusedGlobalCooldowns(cast),
            label: 'Unused GCDs',
            tooltip: <>Estimated unused global cooldowns during this window.</>,
            performance: this.#gcdPerformance(cast).performance,
          },
        ],
        details: <>fdsfisd</>,
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
