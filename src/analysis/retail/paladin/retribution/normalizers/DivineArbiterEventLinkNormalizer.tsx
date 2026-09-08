import SPELLS from 'common/SPELLS';
import { Options } from 'parser/core/Analyzer';
import EventLinkNormalizer, { EventLink } from 'parser/core/EventLinkNormalizer';
import { CastEvent, EventType, GetRelatedEvent, RemoveBuffEvent } from 'parser/core/Events';
import { DAMAGE_HOLY_POWER_SPENDERS } from '../../shared/constants';

const DIVINE_PURPOSE_SPENDER = 'DivineArbiterSource';
const DIVINE_ARBITER_PROC = 'DivineArbiterProc';

const EVENT_LINKS: EventLink[] = [
  {
    linkRelation: DIVINE_PURPOSE_SPENDER,
    referencedEventId: DAMAGE_HOLY_POWER_SPENDERS.map((spender) => spender.id),
    referencedEventType: EventType.Cast,
    linkingEventId: SPELLS.DIVINE_PURPOSE_BUFF_RET.id,
    linkingEventType: EventType.RemoveBuff,
    backwardBufferMs: 100,
    anyTarget: true,
  },
  {
    linkRelation: DIVINE_ARBITER_PROC,
    referencedEventId: SPELLS.DIVINE_ARBITER_BUFF.id,
    referencedEventType: EventType.ApplyBuff,
    linkingEventId: SPELLS.DIVINE_PURPOSE_BUFF_RET.id,
    linkingEventType: EventType.RemoveBuff,
    forwardBufferMs: 100,
    anyTarget: true,
  },
];

export default class DivineArbiterEventLinkNormalizer extends EventLinkNormalizer {
  constructor(options: Options) {
    super(options, EVENT_LINKS);
  }
}

export function getDivinePurposeSpender(event: RemoveBuffEvent): CastEvent | undefined {
  return GetRelatedEvent(
    event,
    DIVINE_PURPOSE_SPENDER,
    (e): e is CastEvent => e.type === EventType.Cast,
  );
}

export function hasDivineArbiterProcced(event: RemoveBuffEvent): boolean {
  return (
    GetRelatedEvent(
      event,
      DIVINE_ARBITER_PROC,
      (e): e is CastEvent => e.type === EventType.ApplyBuff,
    ) !== undefined
  );
}
