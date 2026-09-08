import SPELLS from 'common/SPELLS';
import { Options } from 'parser/core/Analyzer';
import EventLinkNormalizer, { EventLink } from 'parser/core/EventLinkNormalizer';
import {
  ApplyBuffEvent,
  CastEvent,
  EventType,
  GetRelatedEvents,
  RefreshBuffEvent,
} from 'parser/core/Events';
import { TALENTS_PALADIN } from 'common/TALENTS';

const DIVINE_ARBITER_SOURCES = 'DivineArbiterSources';

const EVENT_LINKS: EventLink[] = [
  {
    linkRelation: DIVINE_ARBITER_SOURCES,
    // referencedEventId: DAMAGE_HOLY_POWER_SPENDERS.map(spender => spender.id),
    referencedEventId: [
      TALENTS_PALADIN.DIVINE_STORM_TALENT.id,
      TALENTS_PALADIN.FINAL_VERDICT_TALENT.id,
    ],
    referencedEventType: EventType.Cast,
    linkingEventId: SPELLS.DIVINE_ARBITER_BUFF.id,
    linkingEventType: [EventType.ApplyBuff, EventType.RefreshBuff],
    backwardBufferMs: 2000,
    forwardBufferMs: 2000,
    anyTarget: true,
  },
];

export default class DivineArbiterEventLinkNormalizer extends EventLinkNormalizer {
  constructor(options: Options) {
    super(options, EVENT_LINKS);
  }
}

export function getDivineArbiterSource(event: ApplyBuffEvent | RefreshBuffEvent): CastEvent[] {
  return GetRelatedEvents(
    event,
    DIVINE_ARBITER_SOURCES,
    (e): e is CastEvent => e.type === EventType.Cast,
  );
}
