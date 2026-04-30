import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { ApplyBuffEvent, RefreshBuffEvent } from 'parser/core/Events';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import SPELLS from 'common/SPELLS';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import { formatDurationMinSec } from 'common/format';
import { getCastEvent } from '../../normalizers/EventLinkNormalizer';
import { JSX } from 'react';
import { TALENTS_PALADIN } from 'common/TALENTS';

const INSTRUMENT_OF_RETRIBUTION_AVENGING_WRATH_DURATION_SECONDS = 9;

export default class InstrumentOfRetribution extends Analyzer {
  #avengingWrathSecondsGained = 0;

  constructor(options: Options) {
    super(options);

    this.addEventListener(
      Events.applybuff.by(SELECTED_PLAYER).spell(TALENTS_PALADIN.AVENGING_WRATH_TALENT),
      this.#onAvengingWrathApply,
    );

    this.addEventListener(
      Events.refreshbuff.by(SELECTED_PLAYER).spell(TALENTS_PALADIN.AVENGING_WRATH_TALENT),
      this.#onAvengingWrathApply,
    );
  }

  #onAvengingWrathApply(event: ApplyBuffEvent | RefreshBuffEvent) {
    // Look for a related cast event to determine if the buff was applied via a cast
    const relatedCastEvent = getCastEvent(event);
    if (!relatedCastEvent) {
      this.#avengingWrathSecondsGained += INSTRUMENT_OF_RETRIBUTION_AVENGING_WRATH_DURATION_SECONDS;
    }
  }

  statistic(): JSX.Element {
    return (
      <Statistic size="flexible" category={STATISTIC_CATEGORY.GENERAL}>
        <BoringSpellValueText spell={SPELLS.INSTRUMENT_OF_RETRIBUTION}>
          {formatDurationMinSec(this.#avengingWrathSecondsGained)} <small>gained</small>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}
