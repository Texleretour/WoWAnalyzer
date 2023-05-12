import { change, date } from 'common/changelog';
import SPELLS from 'common/SPELLS';
import { TALENTS_MONK } from 'common/TALENTS';
import { emallson, Trevor, ToppleTheNun, Vetyst, Vohrr } from 'CONTRIBUTORS';
import { SpellLink } from 'interface';


export default [
  change(date(2023, 5, 6), <>Added additional analysis to the <SpellLink spell={TALENTS_MONK.DANCING_MISTS_TALENT}/> module.</>, Vohrr),
  change(date(2023, 5, 5), <>Added per-stack breakdowns for each spell affected in the <SpellLink spell={TALENTS_MONK.CLOUDED_FOCUS_TALENT}/> module.</>, Vohrr),
  change(date(2023, 5, 2), <>Re-enable <SpellLink id={TALENTS_MONK.LIFE_COCOON_TALENT.id}/> module and add Cast Efficieny subsection to the Guide</>, Vohrr),
  change(date(2023, 4, 28), <>Typo fix</>, Vohrr),
  change(date(2023, 4, 28), <>Updated Guide sections for 10.1</>, Vohrr),
  change(date(2023, 4, 27), <>Added <SpellLink id={TALENTS_MONK.CALMING_COALESCENCE_TALENT.id}/> module.</>, Vohrr),
  change(date(2023, 4, 27), <>Conditionally load <SpellLink id={TALENTS_MONK.ESSENCE_FONT_TALENT.id}/> guide metrics based on talent selection.</>, Vohrr),
  change(date(2023, 4, 27), <>Fixed <SpellLink id={TALENTS_MONK.CLOUDED_FOCUS_TALENT.id}/> MP5 tally</>, Vohrr),
  change(date(2023, 4, 22), <>Add <SpellLink spell={TALENTS_MONK.LEGACY_OF_WISDOM_TALENT}/> to talent summary.</>, Trevor),
  change(date(2023, 4, 20), <>Updated apl logic buckets to fix the wrong builds being recommended. Added a not supported warning for <SpellLink id={TALENTS_MONK.AWAKENED_FAELINE_TALENT.id}/> talent builds</>, Vohrr),
  change(date(2023, 4, 5), <>Update suggestions for <SpellLink spell={TALENTS_MONK.REVIVAL_TALENT}/> based on 10.0.7 changes</>, Trevor),
  change(date(2023, 3, 29), <>Improve accuracy of <SpellLink id={TALENTS_MONK.VEIL_OF_PRIDE_TALENT}/> module</>, Trevor),
  change(date(2023, 3, 27), <>Add Tier 30 Set Bonus Module.</>, Vohrr),
  change(date(2023, 3, 23), <>Add <SpellLink id={TALENTS_MONK.CELESTIAL_HARMONY_TALENT.id}/> and renamed where appropriate.</>, Vohrr),
  change(date(2023, 3, 21), <>Bump spec config to 10.0.7</>, Trevor),
  change(date(2023, 3, 21), <>10.0.7 Updates, added <SpellLink id={TALENTS_MONK.LEGACY_OF_WISDOM_TALENT.id}/> module.</>, Vohrr),
  change(date(2023, 3, 17), <>Fix crash in HotAttributor</>, Trevor),
  change(date(2023, 3, 8), <>Fix <SpellLink id={TALENTS_MONK.ESSENCE_FONT_TALENT}/> module</>, Trevor),
  change(date(2023, 3, 8), <>Visual updates to the Guide to be more user friendly</>, Vohrr),
  change(date(2023, 3, 7), <>Update styling for <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/> tab to not interefere with guide styling.</>, Vohrr),
  change(date(2023, 3, 6), <>Add extra safeguard to base celestial module</>, Trevor),
  change(date(2023, 3, 3), <>Added <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/> tab for detail of each hot's extension.</>, Vohrr),
  change(date(2023, 3, 1), <>Missed a few line items in Healing Efficiency Tracker</>, Vohrr),
  change(date(2023, 3, 1), <>Updated the Healing Efficiency Tracker for Dragonflight talents</>, Vohrr),
  change(date(2023, 2, 28), <>Updates to <SpellLink id={TALENTS_MONK.DANCING_MISTS_TALENT.id}/> and <SpellLink id={TALENTS_MONK.RAPID_DIFFUSION_TALENT.id}/> to show a more detailed breakdown</>, Vohrr),
  change(date(2023, 2, 28), <>Refactored Hot Attributor for readability and increased <SpellLink id={TALENTS_MONK.DANCING_MISTS_TALENT.id}/> event link threshold</>, Vohrr),
  change(date(2023, 2, 27), <>Updated <SpellLink id={TALENTS_MONK.DANCING_MISTS_TALENT.id}/> to show proc source breakdown</>, Vohrr),
  change(date(2023, 2, 27), <>Fix crash when <SpellLink id={TALENTS_MONK.UPLIFTED_SPIRITS_TALENT.id}/> is not talented</>, Vohrr),
  change(date(2023, 2, 27), <>Updated <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/> tooltips and some spell colors</>, Vohrr),
  change(date(2023, 2, 26), <>Added <SpellLink id={TALENTS_MONK.UPLIFTED_SPIRITS_TALENT.id}/> cooldown reduction to the <SpellLink id={SPELLS.VIVIFY.id}/> cast breakdown tooltips</>, Vohrr),
  change(date(2023, 2, 26), <>Refactor Talent Aggregate Statistic to handle scale and sorting in the component instead of having to do it before sending in the parameters</>, Vohrr),
  change(date(2023, 2, 26), <>Updated <SpellLink id={TALENTS_MONK.ANCIENT_TEACHINGS_TALENT.id}/> to use new component and added more detail to the breadown</>, Vohrr),
  change(date(2023, 2, 25), <>Added TalentAggregateStatictic, added new <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/> healing breakdown module. Fixed bugs in the HotTracker</>, Vohrr),
  change(date(2023, 2, 24), <>Clarify <SpellLink id={TALENTS_MONK.THUNDER_FOCUS_TEA_TALENT}/> wording</>, Trevor),
  change(date(2023, 2, 24), <>Bug fix in the Hot Tracker to improve the accuracy of <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/>, <SpellLink id={TALENTS_MONK.DANCING_MISTS_TALENT.id}/>, <SpellLink id={TALENTS_MONK.MISTY_PEAKS_TALENT.id}/>, <SpellLink id={TALENTS_MONK.MIST_WRAP_TALENT.id}/> and <SpellLink id={TALENTS_MONK.RAPID_DIFFUSION_TALENT.id}/>.</>, Vohrr),
  change(date(2023, 2, 23), <>Fixed inconsistent QualitativePerformance marks for <SpellLink id={SPELLS.VIVIFY.id}/> casts in the Guide.</>, Vohrr),
  change(date(2023, 2, 21), <>Added Initial version of <SpellLink id={TALENTS_MONK.CLOUDED_FOCUS_TALENT.id}/> apl.</>, Vohrr),
  change(date(2023, 2, 19), <>Added better APL handling for <SpellLink id={SPELLS.BLACKOUT_KICK}/> and <SpellLink id={SPELLS.VIVIFY.id}/>.</>, Vohrr),
  change(date(2023, 2, 18), <>Added pt 1 of the Core Rotation Section of the guide - <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/> / <SpellLink id={TALENTS_MONK.ANCIENT_TEACHINGS_TALENT.id}/> build rotation.</>, Vohrr),
  change(date(2023, 2, 19), <>Fix crash in old version of MW module</>, Trevor),
  change(date(2023, 2, 18), <>Fixed issue with <SpellLink id={TALENTS_MONK.MANA_TEA_TALENT.id}/> not showing up in the Cooldown Tracker.</>, Vohrr),
  change(date(2023, 2, 18), <>Updated the sample report to a Dragonflight encounter. Minor wording and formatting fixes for the guide</>, Vohrr),
  change(date(2023, 2, 17), <>Added non-Renewing Mist hot graph to guide and as a statistic</>, Vohrr),
  change(date(2023, 2, 17), <>Added <SpellLink id={TALENTS_MONK.REVIVAL_TALENT}/> checklist to cooldowns guide section</>, Vohrr),
  change(date(2023, 2, 17), <>Added <SpellLink id={SPELLS.VIVIFY.id}/> to Core Spells in Guide</>, Vohrr),
  change(date(2023, 2, 17), <>Refactor <SpellLink id={TALENTS_MONK.ESSENCE_FONT_TALENT}/> module</>, Trevor),
  change(date(2023, 2, 17), <>UI updates to the <SpellLink id={TALENTS_MONK.INVOKE_CHI_JI_THE_RED_CRANE_TALENT.id}/> guide section</>, Vohrr),
  change(date(2023, 2, 17), <>UI Updates to core spells section</>, Vohrr),
  change(date(2023, 2, 16), <>Fix bug in celestial modules with <SpellLink id={TALENTS_MONK.SHAOHAOS_LESSONS_TALENT}/></>, Trevor),
  change(date(2023, 2, 15), <>Fix celestial crash when using summon statues</>, Trevor),
  change(date(2023, 2, 12), <>Add <SpellLink id={TALENTS_MONK.MANA_TEA_TALENT}/> and <SpellLink id={TALENTS_MONK.ANCIENT_TEACHINGS_TALENT}/> section to guide</>, Trevor),
  change(date(2023, 2, 12), <>Add celestials section to guide</>, Trevor),
  change(date(2023, 2, 12), <>Add guide prototype for Mistweaver</>, Trevor),
  change(date(2023, 2, 7), <>Updated spell values for Feb 7 tuning</>, Trevor),
  change(date(2023, 2, 1), <>Fixed UI bug with <SpellLink id={TALENTS_MONK.SHEILUNS_GIFT_TALENT.id}/> suggestion (again).</>, Trevor),
  change(date(2023, 2, 1), <><SpellLink id={TALENTS_MONK.SHAOHAOS_LESSONS_TALENT.id}/> formatting fix.</>, Vohrr),
  change(date(2023, 1, 31), <>Fixed UI bug with <SpellLink id={TALENTS_MONK.SHEILUNS_GIFT_TALENT.id}/> suggestion.</>, Vohrr),
  change(date(2023, 1, 28), <>Add average healing per cast to <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/> tooltip.</>, Vohrr),
  change(date(2023, 1, 27), <>Add table to <SpellLink id={TALENTS_MONK.SHAOHAOS_LESSONS_TALENT}/> module</>, Trevor),
  change(date(2023, 1, 27), <>Add <SpellLink id={TALENTS_MONK.SHEILUNS_GIFT_TALENT}/> to checklist</>, Trevor),
  change(date(2023, 1 , 26), <>Added average <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/> hits per cast of <SpellLink id={TALENTS_MONK.RISING_SUN_KICK_TALENT.id}/>.</>, Vohrr),
  change(date(2023, 1, 26), <>Update breakdown for <SpellLink id={TALENTS_MONK.SHAOHAOS_LESSONS_TALENT.id}/>.</>, Vohrr),
  change(date(2023, 1, 25), <>Add <SpellLink id={TALENTS_MONK.VEIL_OF_PRIDE_TALENT}/> module</>, Trevor),
  change(date(2023, 1, 25), <>Fixed but with <SpellLink id={TALENTS_MONK.MIST_WRAP_TALENT.id}/> module.</>, Vohrr),
  change(date(2023, 1, 25), <>Reworked <SpellLink id={TALENTS_MONK.MIST_WRAP_TALENT.id}/> module to show all healing contribution and not just from <SpellLink id={SPELLS.ENVELOPING_BREATH_HEAL.id}/>. </>, Vohrr),
  change(date(2023, 1, 24), <>Add <SpellLink id={TALENTS_MONK.SHAOHAOS_LESSONS_TALENT}/> module</>, Trevor),
  change(date(2023, 1, 24), <>Updated <SpellLink id={SPELLS.GUSTS_OF_MISTS}/> breakdown to include <SpellLink id={TALENTS_MONK.SHEILUNS_GIFT_TALENT}/> and improved accuracy.</>, Vohrr),
  change(date(2023, 1, 24), <>Removed Bonedust Brew modules and references for Mistweaver for 10.0.5</>, Vohrr),
  change(date(2023, 1, 16), <>Add <SpellLink id={TALENTS_MONK.SHEILUNS_GIFT_TALENT}/> module and update extension logic for <SpellLink id={TALENTS_MONK.RAPID_DIFFUSION_TALENT}/></>, Trevor),
  change(date(2023, 1, 12), <>Improve accuracy of <SpellLink id={TALENTS_MONK.VIVACIOUS_VIVIFICATION_TALENT.id}/> module and the <SpellLink id={TALENTS_MONK.INVOKE_CHI_JI_THE_RED_CRANE_TALENT.id}/> missed GCDs tally.</>, Vohrr),
  change(date(2023, 1, 8), <>Improve accuracy of <SpellLink id={TALENTS_MONK.UPWELLING_TALENT.id}/> module.</>, Trevor),
  change(date(2023, 1, 6), <>Improve accuracy of <SpellLink id={TALENTS_MONK.UPWELLING_TALENT.id}/> module.</>, Trevor),
  change(date(2023, 1, 5), <>Update <SpellLink id={TALENTS_MONK.UPWELLING_TALENT.id}/> to subtract out estimated healing from missed casts.</>, Trevor),
  change(date(2023, 1, 5), <>Added statistic for average <SpellLink id={TALENTS_MONK.TEACHINGS_OF_THE_MONASTERY_TALENT.id}/> stacks.</>, Trevor),
  change(date(2023, 1, 5), <>Added checklist item for <SpellLink id={TALENTS_MONK.ESSENCE_FONT_TALENT.id}/> module.</>, Trevor),
  change(date(2022, 12, 27), <>Added <SpellLink id={TALENTS_MONK.MENDING_PROLIFERATION_TALENT.id}/> module.</>, Vohrr),
  change(date(2022, 12, 20), <>Fix suggestion for <SpellLink id={TALENTS_MONK.SUMMON_JADE_SERPENT_STATUE_TALENT.id}/></>, Vohrr),
  change(date(2022, 12, 18), <>Fix suggestion for <SpellLink id={TALENTS_MONK.THUNDER_FOCUS_TEA_TALENT.id}/> usage based on talent selection</>, Trevor),
  change(date(2022, 12, 18), <>Add suggestion for <SpellLink id={TALENTS_MONK.ANCIENT_TEACHINGS_TALENT.id}/> buff uptime</>, Trevor),
  change(date(2022, 12, 14), <>Remove <SpellLink id={TALENTS_MONK.FAELINE_STOMP_TALENT.id}/> cast efficiency suggestion for Mistweaver</>, Trevor),
  change(date(2022, 12, 14), <>Update <SpellLink id={TALENTS_MONK.VIVACIOUS_VIVIFICATION_TALENT}/> module suggestion thresholds</>, Trevor),
  change(date(2022, 12, 3), <>Update <SpellLink id={TALENTS_MONK.JADE_BOND_TALENT.id}/> module to show average CDR</>, Trevor),
  change(date(2022, 12, 3), <>Update <SpellLink id={TALENTS_MONK.YULONS_WHISPER_TALENT.id}/> suggestions for Mistweaver</>, Trevor),
  change(date(2022, 11, 28), <>Updated the <SpellLink id={TALENTS_MONK.INVOKE_CHI_JI_THE_RED_CRANE_TALENT.id}/> and <SpellLink id={TALENTS_MONK.INVOKE_YULON_THE_JADE_SERPENT_TALENT.id}/> modules to include <SpellLink id={TALENTS_MONK.CELESTIAL_HARMONY_TALENT.id}/> in the title now that it is its own talent. Updated tooltips to use SpellLinks.</>, Vohrr),
  change(date(2022, 11, 28), <>Update ability tracker for MW</>, Trevor),
  change(date(2022, 11, 27), <>Added Mistweaver Talent Summary Panel</>, Vohrr),
  change(date(2022, 11, 23), <>Fix another Mistweaver degraded experience</>, Trevor),
  change(date(2022, 11, 22), <>Fix Mistweaver degraded experience</>, Trevor),
  change(date(2022, 11, 17), <>Added <SpellLink id={TALENTS_MONK.DANCING_MISTS_TALENT.id}/> module and <SpellLink id={TALENTS_MONK.MISTY_PEAKS_TALENT.id}/> Breakdown chart.</>, Vohrr),
  change(date(2022, 11, 17), <>Fix some typos and remove <SpellLink id={TALENTS_MONK.LIFE_COCOON_TALENT.id}/> statistic</> ,Trevor),
  change(date(2022, 11, 17), <>Fixed <SpellLink id={TALENTS_MONK.MISTS_OF_LIFE_TALENT.id}/> module</>, Vohrr),
  change(date(2022, 11, 17), <>Fix for T29 not catching multiple extensions to the same HoT</>, Vohrr),
  change(date(2022, 11, 14), <>Updated average <SpellLink id={SPELLS.RENEWING_MIST_HEAL.id}/> per <SpellLink id={SPELLS.VIVIFY.id}/> suggestion threshold to be accurate for specific talent selections</>, Vohrr),
  change(date(2022, 11, 13), <>Updates to Hot Tracker to better handle <SpellLink id={TALENTS_MONK.RENEWING_MIST_TALENT.id}/> tracking. Added <SpellLink id={TALENTS_MONK.RAPID_DIFFUSION_TALENT.id}/> module.</>, Vohrr),
  change(date(2022, 11, 13), <>Add <SpellLink id={TALENTS_MONK.MISTS_OF_LIFE_TALENT.id}/> module</>, Trevor),
  change(date(2022, 11, 14), <>Add T29 tier set module for Mistweaver</>, Trevor),
  change(date(2022, 11, 14), <>Fix broken <SpellLink id={TALENTS_MONK.FAELINE_STOMP_TALENT.id}/> references and reordered the talent modules based on importance</>, Vohrr),
  change(date(2022, 11, 13), <>Fix load conditions for some Mistweaver talents</>, Trevor),
  change(date(2022, 11, 12), <>Updated the spell icon for <SpellLink id={SPELLS.ENVELOPING_BREATH_HEAL.id}/></>, Vohrr),
  change(date(2022, 11, 12), <>Cleanup covenant files for Mistweaver</>, Trevor),
  change(date(2022, 11, 11), <>Combined the <SpellLink id={TALENTS_MONK.RISING_SUN_KICK_TALENT.id}/> module and moved into general. Reordered the statistics in general to make more sense.</>, Vohrr),
  change(date(2022, 11, 9), <>Improve accuracy of healing statistic for <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/> and <SpellLink id={TALENTS_MONK.UPWELLING_TALENT.id}/></>, Trevor),
  change(date(2022, 11, 9), <>Cleanup labels for talents</>, Trevor),
  change(date(2022, 11, 8), <>Cleanup covenant files for Mistweaver</>, Trevor),
  change(date(2022, 11, 9), <>Fixed changelog breaking the build</>, Vohrr),
  change(date(2022, 11, 9), <>Removed shadowlands spell references from the <SpellLink id={TALENTS_MONK.INVOKE_CHI_JI_THE_RED_CRANE_TALENT.id}/> module and updated the statistic to use TalentSpellText. Added Vohrr to mistweaver contributors. </>, Vohrr),
  change(date(2022, 11, 8), <>Add module for <SpellLink id={TALENTS_MONK.SAVE_THEM_ALL_TALENT}/></>, Trevor),
  change(date(2022, 11, 8), <>Added module for <SpellLink id={TALENTS_MONK.UNISON_TALENT}/></>, Vohrr),
  change(date(2022, 11, 8), <>Updated the <SpellLink id={SPELLS.GUSTS_OF_MISTS.id}/> from <SpellLink id={TALENTS_MONK.ESSENCE_FONT_TALENT.id}/> module to show healing contribution and <SpellLink id={TALENTS_MONK.INVOKE_CHI_JI_THE_RED_CRANE_TALENT.id}/> contribution when talented.</>, Vohrr), 
  change(date(2022, 11, 8), <>Readded the tooltip for average renewing mists during <SpellLink id={TALENTS_MONK.MANA_TEA_TALENT.id}/> and updated wording to 'mana saved per cast'</>, Vohrr),
  change(date(2022, 11, 8), <>Fix and update for <SpellLink id={TALENTS_MONK.SUMMON_JADE_SERPENT_STATUE_TALENT.id}/> uptime</>, Vohrr),
  change(date(2022, 11, 8), <>Fixed <SpellLink id={TALENTS_MONK.NOURISHING_CHI_TALENT.id}/> showing up when not talented</>, Vohrr),
  change(date(2022, 11, 8), <>Consolidated <SpellLink id={TALENTS_MONK.MANA_TEA_TALENT.id}/> modules into one statistics box</>, Vohrr),
  change(date(2022, 11, 4), <>Remove Abelito75 from the contribution list.</>, Vetyst),
  change(date(2022, 11, 1), <>Add support for extending <SpellLink id={TALENTS_MONK.ENVELOPING_MIST_TALENT.id}/> from <SpellLink id={TALENTS_MONK.MISTY_PEAKS_TALENT.id}/>  with <SpellLink id={TALENTS_MONK.RISING_MIST_TALENT.id}/></>, Trevor),
  change(date(2022, 10, 26), <>Fix detection for cancelling <SpellLink id={TALENTS_MONK.ESSENCE_FONT_TALENT.id}/></>, Trevor),
  change(date(2022, 10, 25), <>Fix overcapping detection for <SpellLink id={TALENTS_MONK.VIVACIOUS_VIVIFICATION_TALENT.id}/></>, Trevor),
  change(date(2022, 10, 25), <>Fix another crash caused by <SpellLink id={TALENTS_MONK.INVOKE_YULON_THE_JADE_SERPENT_TALENT.id}/></>, Trevor),
  change(date(2022, 10, 25), <>Fix crashes caused by <SpellLink id={TALENTS_MONK.INVOKE_YULON_THE_JADE_SERPENT_TALENT.id}/></>, ToppleTheNun),
  change(date(2022, 10, 23), <>Added module for <SpellLink id={TALENTS_MONK.YULONS_WHISPER_TALENT.id}/></>, Trevor),
  change(date(2022, 10, 23), <>Enhance tooltip for <SpellLink id={TALENTS_MONK.UPLIFTED_SPIRITS_TALENT.id}/> module to breakdown CDR by spell</>, Trevor),
  change(date(2022, 10, 22), <>Added module for <SpellLink id={TALENTS_MONK.VIVACIOUS_VIVIFICATION_TALENT.id}/></>, Trevor),
  change(date(2022, 10 , 21), <>Fix cancellation detection for <SpellLink id={TALENTS_MONK.ESSENCE_FONT_TALENT}/> when buffed by <SpellLink id={TALENTS_MONK.THUNDER_FOCUS_TEA_TALENT}/> </>, Trevor),
  change(date(2022, 10, 16), <>Added module for <SpellLink id={TALENTS_MONK.MISTY_PEAKS_TALENT.id}/></>, Trevor),
  change(date(2022, 10, 18), <>Fixed <SpellLink id={TALENTS_MONK.RISING_SUN_KICK_TALENT}/> uptime calculation and <SpellLink id={TALENTS_MONK.TEACHINGS_OF_THE_MONASTERY_TALENT}/></>, Trevor),
  change(date(2022, 10, 16), <>Fixed Uplifted Spirits CDR</>, Trevor),
  change(date(2022, 10, 13), <>Cleaned up MW spells/talents files</>, Trevor),
  change(date(2022, 10, 13), <>Updated Rising Mist module for Dragonflight</>, Trevor),
  change(date(2022, 10, 9), <>Added Secret Infusion haste buff and fixed <SpellLink id={TALENTS_MONK.UPLIFTED_SPIRITS_TALENT.id}/></>, Trevor),
  change(date(2022, 10, 8), <>Added support for existing MW talents</>, Trevor),
  change(date(2022, 9, 4), <>Updated guide link in checklist.</>, emallson),
];
