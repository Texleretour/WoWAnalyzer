import { DAMAGE_HOLY_POWER_SPENDERS } from 'analysis/retail/paladin/shared/constants';
import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import { TIERS } from 'game/TIERS';
import { qualitativePerformanceToColor } from 'interface/guide';
import { explanationAndDataSubsection } from 'interface/guide/components/ExplanationRow';
import SpellIcon from 'interface/SpellIcon';
import { TooltipElement } from 'interface/Tooltip';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { ApplyBuffEvent, CastEvent, RefreshBuffEvent } from 'parser/core/Events';
import { QualitativePerformance } from 'parser/ui/QualitativePerformance';
import { RoundedPanel } from 'interface/guide/components/GuideDivs';
import type { JSX } from 'react';
import { getDivineArbiterSource } from '../../normalizers/DivineArbiterEventLinkNormalizer';

class DivineArbiter extends Analyzer {
  #totalProcs = 0;
  #consumedProcs = 0;
  #divineArbiterOvercaps = 0;

  #lastDivineArbiterSource: CastEvent | null = null;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.has4PieceByTier(TIERS.MID2);

    this.addEventListener(
      Events.applybuff.by(SELECTED_PLAYER).spell(SPELLS.ART_OF_WAR),
      this.#onApplyBuff,
    );

    this.addEventListener(
      Events.refreshbuff.by(SELECTED_PLAYER).spell(SPELLS.ART_OF_WAR),
      this.#onRefreshBuff,
    );

    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(DAMAGE_HOLY_POWER_SPENDERS),
      this.#onDamageSpenderCast,
    );
  }

  #onApplyBuff(event: ApplyBuffEvent) {
    this.#totalProcs += 1;

    const divineArbiterSources = getDivineArbiterSource(event);
    console.log('spender d', divineArbiterSources);
    if (divineArbiterSources.length > 0) {
      this.#lastDivineArbiterSource = divineArbiterSources[0];
    }
  }

  #onRefreshBuff(event: RefreshBuffEvent) {
    this.#totalProcs += 1;
    this.#divineArbiterOvercaps += 1;

    const divineArbiterSources = getDivineArbiterSource(event);
    if (divineArbiterSources.length > 0) {
      this.#lastDivineArbiterSource = divineArbiterSources[0];
    }
  }

  #onDamageSpenderCast(event: CastEvent) {
    console.log(
      'spender',
      this.selectedCombatant.hasBuff(SPELLS.DIVINE_ARBITER_BUFF),
      this.#lastDivineArbiterSource?.ability,
      event.ability,
    );
    if (
      !this.selectedCombatant.hasBuff(SPELLS.DIVINE_ARBITER_BUFF) ||
      event.ability.guid === this.#lastDivineArbiterSource?.ability.guid
    ) {
      return;
    }

    this.#consumedProcs += 1;
  }

  get expiredProcs() {
    return this.#totalProcs - this.#consumedProcs - this.#divineArbiterOvercaps;
  }

  get expiredProcsPercentage() {
    return this.expiredProcs / this.#totalProcs;
  }

  get overwrittenProcsPercentage() {
    return this.#divineArbiterOvercaps / this.#totalProcs;
  }

  get consumedProcsPercentage() {
    return this.#consumedProcs / this.#totalProcs;
  }

  get expiredPerformance() {
    let performance = QualitativePerformance.Fail;

    if (this.expiredProcsPercentage > 0.25) {
      performance = QualitativePerformance.Fail;
    } else if (this.expiredProcsPercentage > 0.1) {
      performance = QualitativePerformance.Ok;
    } else if (this.expiredProcsPercentage > 0) {
      performance = QualitativePerformance.Good;
    } else if (this.expiredProcsPercentage === 0) {
      performance = QualitativePerformance.Perfect;
    }

    return performance;
  }

  get overwrittenPerformance() {
    let performance = QualitativePerformance.Fail;

    if (this.overwrittenProcsPercentage > 0.25) {
      performance = QualitativePerformance.Fail;
    } else if (this.overwrittenProcsPercentage > 0.1) {
      performance = QualitativePerformance.Ok;
    } else if (this.overwrittenProcsPercentage > 0) {
      performance = QualitativePerformance.Good;
    } else if (this.overwrittenProcsPercentage === 0) {
      performance = QualitativePerformance.Perfect;
    }

    return performance;
  }

  get consumedPerformance() {
    let performance = QualitativePerformance.Fail;

    if (this.consumedProcsPercentage < 0.75) {
      performance = QualitativePerformance.Fail;
    } else if (this.consumedProcsPercentage < 0.9) {
      performance = QualitativePerformance.Ok;
    } else if (this.consumedProcsPercentage < 1) {
      performance = QualitativePerformance.Good;
    } else if (this.consumedProcsPercentage === 1) {
      performance = QualitativePerformance.Perfect;
    }

    return performance;
  }

  get guideSubsection(): JSX.Element {
    const explanation = <>dsdf</>;

    const consumedTooltip = (
      <>
        {this.#consumedProcs}/{this.#totalProcs} procs consumed
      </>
    );

    const expiredTooltip = (
      <>
        {this.expiredProcs}/{this.#totalProcs} procs expired
      </>
    );

    const overwrittenTooltip = (
      <>
        {this.#divineArbiterOvercaps}/{this.#totalProcs} procs overwritten
      </>
    );

    const data = (
      <RoundedPanel
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        <div
          style={{
            fontSize: '20px',
            color: qualitativePerformanceToColor(this.consumedPerformance),
          }}
        >
          <SpellIcon spell={SPELLS.DIVINE_ARBITER_BUFF} />{' '}
          <TooltipElement content={consumedTooltip}>
            {formatPercentage(this.#consumedProcs / this.#totalProcs, 0)} % <small>consumed</small>
          </TooltipElement>
        </div>

        <div
          style={{
            fontSize: '20px',
            color: qualitativePerformanceToColor(this.overwrittenPerformance),
          }}
        >
          <SpellIcon spell={SPELLS.DIVINE_ARBITER_BUFF} />{' '}
          <TooltipElement content={overwrittenTooltip}>
            {formatPercentage(this.#divineArbiterOvercaps / this.#totalProcs, 0)} %{' '}
            <small>overwritten</small>
          </TooltipElement>
        </div>

        <div
          style={{
            fontSize: '20px',
            color: qualitativePerformanceToColor(this.expiredPerformance),
          }}
        >
          <SpellIcon spell={SPELLS.DIVINE_ARBITER_BUFF} />{' '}
          <TooltipElement content={expiredTooltip}>
            {formatPercentage(this.expiredProcs / this.#totalProcs, 0)} % <small>expired</small>
          </TooltipElement>
        </div>
      </RoundedPanel>
    );

    return explanationAndDataSubsection(explanation, data, 50, 'Divine Arbiter');
  }
}

export default DivineArbiter;
