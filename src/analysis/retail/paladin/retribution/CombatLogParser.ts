import {
  DivinePurpose,
  HammerOfWrath,
  HolyPowerDetails,
  HolyPowerPerMinute,
  HolyPowerTracker,
  Judgment,
} from 'analysis/retail/paladin/shared';
import CoreCombatLogParser from 'parser/core/CombatLogParser';

import Abilities from './modules/Abilities';
import Buffs from './modules/Buffs';
import ArtOfWar from 'analysis/retail/paladin/retribution/modules/talents/ArtOfWar';
import ArtOfWarProbability from 'analysis/retail/paladin/retribution/modules/talents/ArtOfWarProbability';
import BladeOfJustice from 'analysis/retail/paladin/retribution/modules/talents/BladeOfJustice';
import CrusaderStrike from './modules/core/CrusaderStrike';
import ShieldOfVengeance from 'analysis/retail/paladin/retribution/modules/talents/ShieldOfVengeance';
import AlwaysBeCasting from './modules/features/AlwaysBeCasting';
import CooldownThroughputTracker from './modules/features/CooldownThroughputTracker';
import Crusade from './modules/talents/Crusade';
import EmpyreanPower from './modules/talents/EmpyreanPower';
import BuilderUse from './modules/core/BuilderUse';
import Guide from './Guide';
import { MeleeUptimeAnalyzer } from 'interface/guide/foundation/analyzers/MeleeUptimeAnalyzer';
import SPELLS from 'common/SPELLS';
import Expurgation from './modules/talents/Expurgation';
import ExecutionSentence from './modules/talents/ExecutionSentence';
import Lightbearer from '../shared/Lightbearer';
import InstrumentOfRetribution from './modules/core/InstrumentOfRetribution';
import RetributionEventLinkNormalizer from './normalizers/EventLinkNormalizer';

class CombatLogParser extends CoreCombatLogParser {
  static guide = Guide;

  static specModules = {
    // Normalizers
    eventLinkNormalizer: RetributionEventLinkNormalizer,

    // Core
    builderUse: BuilderUse,
    instrumentOfRetribution: InstrumentOfRetribution,
    artOfWar: ArtOfWar,
    artOfWarProbability: ArtOfWarProbability,

    // Features
    abilities: Abilities,
    alwaysBeCasting: AlwaysBeCasting,
    buffs: Buffs,
    cooldownThroughputTracker: CooldownThroughputTracker,
    bladeofJustice: BladeOfJustice,
    crusaderStrike: CrusaderStrike,
    shieldOfVengeance: ShieldOfVengeance,
    judgment: Judgment,

    // Talents
    executionSentence: ExecutionSentence,
    crusade: Crusade,
    hammerofWrath: HammerOfWrath,
    divinePurpose: DivinePurpose,
    empyreanPower: EmpyreanPower,
    expurgation: Expurgation,
    lightBearer: Lightbearer,

    // HolyPower
    holyPowerTracker: HolyPowerTracker,
    holyPowerDetails: HolyPowerDetails,
    holyPowerPerMinute: HolyPowerPerMinute,

    meleeUptime: MeleeUptimeAnalyzer.withMeleeAbility(SPELLS.CRUSADING_STRIKES),
  };
}

export default CombatLogParser;
