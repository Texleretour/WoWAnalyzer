import SPELLS from 'common/SPELLS';
import { TALENTS_PALADIN } from 'common/TALENTS';
import { CastDetail, CastInSequence, GuideSection, PerCastData } from 'interface/guide/components';
import { SpellSequence } from 'interface/guide/components/CastSequence';
import SpellLink from 'interface/SpellLink';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, {
  CastEvent,
  FightEndEvent,
  GlobalCooldownEvent,
  RemoveBuffEvent,
} from 'parser/core/Events';
import {
  evaluateQualitativePerformanceByThreshold,
  getLowestPerf,
  QualitativePerformance,
} from 'parser/ui/QualitativePerformance';
import { JSX } from 'react';

interface ExecutionSentenceWindowBreakdown {
  unusedGlobalCooldowns: number;
  gcdPerformance: QualitativePerformance;
  performance: QualitativePerformance;
  sequence: CastInSequence[];
}

interface ExecutionSentenceWindow {
  event: CastEvent;
  castEvents: CastEvent[];
  globalCooldowns: number[];
  unusedGcdTime: number;
  start: number;
  end?: number | null;
}

const GCD_TOLERANCE = 25;

class ExecutionSentence extends Analyzer {
  #activeWindow: ExecutionSentenceWindow | null = null;
  #windows: ExecutionSentenceWindow[] = [];
  #globalCooldownEnds = 0;

  constructor(options: Options) {
    super(options);

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
      castEvents: [],
      globalCooldowns: [],
      unusedGcdTime: 0,
      start: Math.max(event.timestamp, this.#globalCooldownEnds),
    };
  }

  #onExecutionSentenceEnd(event: RemoveBuffEvent | FightEndEvent) {
    if (!this.#activeWindow) {
      return;
    }

    this.#activeWindow.end = event.timestamp;

    this.#windows.push(this.#activeWindow);
    this.#activeWindow = null;
  }

  #onCast(event: CastEvent) {
    if (!this.#activeWindow || event.ability.guid === SPELLS.MELEE.id || !event.globalCooldown) {
      return;
    }

    this.#activeWindow.unusedGcdTime += Math.max(event.timestamp - this.#globalCooldownEnds, 0);
    this.#activeWindow.castEvents.push(event);
  }

  #onGlobalCooldown(event: GlobalCooldownEvent) {
    this.#globalCooldownEnds = event.duration + event.timestamp;
    if (this.#activeWindow) {
      this.#activeWindow.globalCooldowns.push(event.duration);
    }
  }

  #getAverageGcdOfWindow(cast: ExecutionSentenceWindow) {
    return (
      cast.globalCooldowns.reduce(
        (total, gcdDuration) => (total += gcdDuration + GCD_TOLERANCE),
        0,
      ) / (cast.globalCooldowns.length ?? 1)
    );
  }

  #getUnusedGlobalCooldowns(cast: ExecutionSentenceWindow) {
    const avgGcd = this.#getAverageGcdOfWindow(cast);
    return Math.max(Math.floor(cast.unusedGcdTime / avgGcd), 0);
  }

  #buildSpellSequence(cast: ExecutionSentenceWindow): CastInSequence[] {
    return cast.castEvents.map((event) => ({
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

  #description(): JSX.Element {
    return (
      <>
        <SpellLink spell={TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT} /> description.
      </>
    );
  }

  #getGcdPerformance(cast: ExecutionSentenceWindow): QualitativePerformance {
    const avgGcd = this.#getAverageGcdOfWindow(cast);
    const unusedGlobalCooldowns = Math.max(Math.floor(cast.unusedGcdTime / avgGcd), 0);
    const estimatedPotentialCasts = (cast.end! - cast.start) / avgGcd;
    const gcdPerfCalc = (unusedGlobalCooldowns / estimatedPotentialCasts) * 100;

    return evaluateQualitativePerformanceByThreshold({
      actual: gcdPerfCalc,
      isLessThanOrEqual: {
        perfect: 7.5,
        good: 15,
        ok: 25,
      },
    });
  }

  #buildWindowBreakdown(window: ExecutionSentenceWindow): ExecutionSentenceWindowBreakdown {
    const unusedGlobalCooldowns = this.#getUnusedGlobalCooldowns(window);
    const gcdPerformance = this.#getGcdPerformance(window);

    return {
      unusedGlobalCooldowns,
      gcdPerformance,
      performance: getLowestPerf([gcdPerformance]),
      sequence: this.#buildSpellSequence(window),
    };
  }

  #buildPerCastData(): PerCastData[] {
    return this.#windows.map((window) => {
      const breakdown = this.#buildWindowBreakdown(window);
      console.log('breakdown', breakdown);

      return {
        performance: breakdown.performance,
        timestamp: this.owner.formatTimestamp(window.event.timestamp),
        stats: [
          {
            value: breakdown.unusedGlobalCooldowns,
            label: 'Unused GCDs',
            tooltip: <>Estimated unused global cooldowns during this window.</>,
            performance: breakdown.gcdPerformance,
          },
        ],
        additionalContent:
          breakdown.sequence.length > 0
            ? {
                title: 'Cast Sequence',
                content: <SpellSequence casts={breakdown.sequence} iconSize={40} />,
              }
            : undefined,
      };
    });
  }

  get guideSubsection() {
    return (
      <GuideSection
        spell={TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT}
        explanation={this.#description()}
      >
        <CastDetail title="Execution Sentence Windows" casts={this.#buildPerCastData()} />
      </GuideSection>
    );
  }
}

export default ExecutionSentence;
