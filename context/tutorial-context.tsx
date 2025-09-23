"use client"

import { createContext, ReactNode, useContext, useState } from 'react';

interface TutorialContextType {
  tutorialActive: boolean;
  currentStep: number;
  startTutorial: () => void;
  endTutorial: () => void;
  nextStep: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const TutorialProvider = ({ children }: {children: ReactNode}) => {
  const [tutorialActive, setTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const startTutorial = () => {
    setTutorialActive(true);
    setCurrentStep(1);
  };

  const endTutorial = () => {
    setTutorialActive(false);
    setCurrentStep(1);
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  return (
    <TutorialContext.Provider value={{ tutorialActive, currentStep, startTutorial, endTutorial, nextStep }}>
      {children}
    </TutorialContext.Provider>
  );
};

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (context === undefined) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};