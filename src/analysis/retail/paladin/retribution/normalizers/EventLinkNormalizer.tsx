import EventLinkNormalizer, { EventLink } from 'parser/core/EventLinkNormalizer';
import {
  ApplyBuffEvent,
  CastEvent,
  EventType,
  GetRelatedEvent,
  RefreshBuffEvent,
} from 'parser/core/Events';
import { TALENTS_PALADIN } from 'common/TALENTS';
import { Options } from 'parser/core/Analyzer';

const AVENGING_WRATH_CAST_BUFFER_MS = 500;
const AVENGING_WRATH_CAST_LINK = 'AvengingWrathCast';

const avengingWrathCastLink: EventLink = {
  linkRelation: AVENGING_WRATH_CAST_LINK,
  linkingEventType: [EventType.ApplyBuff, EventType.RefreshBuff],
  linkingEventId: TALENTS_PALADIN.AVENGING_WRATH_TALENT.id,
  referencedEventType: EventType.Cast,
  referencedEventId: TALENTS_PALADIN.AVENGING_WRATH_TALENT.id,
  backwardBufferMs: AVENGING_WRATH_CAST_BUFFER_MS,
  forwardBufferMs: AVENGING_WRATH_CAST_BUFFER_MS,
  anyTarget: true,
};

class RetributionEventLinkNormalizer extends EventLinkNormalizer {
  constructor(options: Options) {
    super(options, [avengingWrathCastLink]);
  }
}

export function getCastEvent(event: ApplyBuffEvent | RefreshBuffEvent): CastEvent | undefined {
  return GetRelatedEvent(
    event,
    AVENGING_WRATH_CAST_LINK,
    (e): e is CastEvent => e.type === EventType.Cast,
  );
}

export default RetributionEventLinkNormalizer;
