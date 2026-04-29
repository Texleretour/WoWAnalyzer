import { GuideProps } from 'interface/guide';
import CombatLogParser from './CombatLogParser';
import PreparationSection from 'interface/guide/components/Preparation/PreparationSection';
import CoreSection from './modules/guide/CoreSection';
import CooldownsSection from './modules/guide/CooldownsSection';

export const GUIDE_CORE_EXPLANATION_PERCENT = 40;

export default function Guide(props: GuideProps<typeof CombatLogParser>) {
  return (
    <>
      <CoreSection {...props} />
      <CooldownsSection {...props} />
      <PreparationSection />
    </>
  );
}
