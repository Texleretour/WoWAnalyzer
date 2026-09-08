import { DAMAGE_HOLY_POWER_SPENDERS } from 'analysis/retail/paladin/shared/constants';
import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import { TIERS } from 'game/TIERS';
import { qualitativePerformanceToColor } from 'interface/guide';
import { explanationAndDataSubsection } from 'interface/guide/components/ExplanationRow';
import SpellIcon from 'interface/SpellIcon';
import { TooltipElement } from 'interface/Tooltip';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { CastEvent, RemoveBuffEvent } from 'parser/core/Events';
import { QualitativePerformance } from 'parser/ui/QualitativePerformance';
import { RoundedPanel } from 'interface/guide/components/GuideDivs';
import type { JSX } from 'react';
import {
  getDivinePurposeSpender,
  hasDivineArbiterProcced,
} from '../../normalizers/DivineArbiterEventLinkNormalizer';
import SpellLink from 'interface/SpellLink';
import ResourceLink from 'interface/ResourceLink';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
import { TALENTS_PALADIN } from 'common/TALENTS';

class DivineArbiter extends Analyzer {
  #totalProcs = 0;
  #consumedProcs = 0;
  #divineArbiterOvercaps = 0;

  #lastDivineArbiterSource: CastEvent | null = null;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.has4PieceByTier(TIERS.MID2);

    this.addEventListener(
      Events.removebuff.by(SELECTED_PLAYER).spell(SPELLS.DIVINE_PURPOSE_BUFF_RET),
      this.#onDivinePurposeLost,
    );

    this.addEventListener(
      Events.cast.by(SELECTED_PLAYER).spell(DAMAGE_HOLY_POWER_SPENDERS),
      this.#onDamageSpenderCast,
    );
  }

  #onDivinePurposeLost(event: RemoveBuffEvent) {
    // Figuring out wether Divine Purpose was consumed or expired
    const divinePurposeSpender = getDivinePurposeSpender(event);
    console.log('source', divinePurposeSpender?.ability);

    if (!divinePurposeSpender) {
      // Divine Purpose expired
      return;
    }
    this.#lastDivineArbiterSource = divinePurposeSpender;

    this.#totalProcs += 1;

    // Divine Arbiter cannot occur if already active, so we can't check for refreshes
    const hasProcced = hasDivineArbiterProcced(event);
    if (!hasProcced) {
      this.#divineArbiterOvercaps += 1;
    }
  }

  #onDamageSpenderCast(event: CastEvent) {
    console.log(
      'spender',
      this.selectedCombatant.hasBuff(SPELLS.DIVINE_ARBITER_BUFF),
      this.#lastDivineArbiterSource?.ability.name,
      event.ability.name,
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
    const explanation = (
      <>
        <p>
          <SpellLink spell={SPELLS.DIVINE_ARBITER_BUFF} /> is a somewhat unintuitive buff. Consuming{' '}
          <SpellLink spell={SPELLS.DIVINE_PURPOSE_BUFF_RET} /> by spending{' '}
          <ResourceLink id={RESOURCE_TYPES.HOLY_POWER.id} /> makes your next <b>other</b> spenders
          unleash AoE damage.
        </p>
        <p>
          For instance, if you have <SpellLink spell={SPELLS.DIVINE_PURPOSE_BUFF_RET} /> and use{' '}
          <SpellLink spell={TALENTS_PALADIN.FINAL_VERDICT_TALENT} />, your next{' '}
          <SpellLink spell={TALENTS_PALADIN.DIVINE_STORM_TALENT} />{' '}
          {this.selectedCombatant.hasTalent(TALENTS_PALADIN.LIGHTS_GUIDANCE_TALENT) && (
            <>
              (and <SpellLink spell={SPELLS.HAMMER_OF_LIGHT} />, if available){' '}
            </>
          )}{' '}
          will be buffed and that is what you should use next <b>even in single target scenarios</b>{' '}
          (reverse being also true).
        </p>
        <p>
          In other words, spend <SpellLink spell={SPELLS.DIVINE_PURPOSE_BUFF_RET} /> with the
          "correct" spender for the situation, and follow it up by spending{' '}
          <SpellLink spell={SPELLS.DIVINE_ARBITER_BUFF} /> with the "incorrect" one.
        </p>
      </>
    );

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
