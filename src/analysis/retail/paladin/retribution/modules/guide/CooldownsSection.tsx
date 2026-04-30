import { TALENTS_PALADIN } from 'common/TALENTS';
import { GuideProps, Section } from 'interface/guide';
import CooldownGraphSubsection, {
  Cooldown,
} from 'interface/guide/components/CooldownGraphSubSection';
import CombatLogParser from 'analysis/retail/paladin/retribution/CombatLogParser';

const cooldowns: Cooldown[] = [
  {
    spell: TALENTS_PALADIN.AVENGING_WRATH_TALENT,
    isActive: (c) => !c.hasTalent(TALENTS_PALADIN.RADIANT_GLORY_TALENT),
  },
  {
    spell: TALENTS_PALADIN.WAKE_OF_ASHES_TALENT,
    isActive: (c) => c.hasTalent(TALENTS_PALADIN.WAKE_OF_ASHES_TALENT),
  },
  {
    spell: TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT,
    isActive: (c) => c.hasTalent(TALENTS_PALADIN.EXECUTION_SENTENCE_TALENT),
  },
  {
    spell: TALENTS_PALADIN.DIVINE_TOLL_TALENT,
    isActive: (c) => c.hasTalent(TALENTS_PALADIN.DIVINE_TOLL_TALENT),
  },
];

export default function CooldownsSection({ modules }: GuideProps<typeof CombatLogParser>) {
  return (
    <Section title="Cooldowns">
      <p>
        Retribution's cooldowns are decently powerful but should not be held on to for long. In
        order to maximize usages over the course of an encounter, you should aim to send the
        cooldown as soon as it becomes available (as long as it can do damage on target).
      </p>
      <CooldownGraphSubsection cooldowns={cooldowns} />
      {modules.executionSentence.guideSubsection}
    </Section>
  );
}
