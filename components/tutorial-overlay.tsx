import { useTutorial } from '@/context/tutorial-context';

// interface TutorialOverlayProps {
//   children?: ReactNode;
// }

const TutorialOverlay = () => {
  const { tutorialActive } = useTutorial();

  if (!tutorialActive) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/60" />
  );
};

export default TutorialOverlay;