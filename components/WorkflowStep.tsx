import React from 'react';
import { FadeIn } from './animations/FadeIn';

interface WorkflowStepProps {
  stepNumber: number;
  title: string;
  description: string;
  codeSnippet?: React.ReactNode;
  delay?: number;
}

export const WorkflowStep: React.FC<WorkflowStepProps> = ({
  stepNumber,
  title,
  description,
  codeSnippet,
  delay = 0,
}) => {
  const isEven = stepNumber % 2 === 0;

  return (
    <FadeIn direction="up" delay={delay}>
      <div className="relative flex flex-col md:flex-row gap-8 items-center">
        {/* Text Area */}
        <div className={`flex-1 md:text-right ${isEven ? 'order-3 md:order-1' : 'order-2 md:order-1'}`}>
          {!isEven ? (
             <>
               <h3 className="text-xl font-bold text-slate-900">{stepNumber}. {title}</h3>
               <p className="mt-2 text-slate-600">{description}</p>
             </>
          ) : (
             codeSnippet
          )}
        </div>

        {/* Number Badge */}
        <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full text-white font-bold order-1 md:order-2">
          {stepNumber}
        </div>

        {/* Other Area (Code or Text) */}
        <div className={`flex-1 ${isEven ? 'order-2 md:order-3' : 'order-3'}`}>
          {isEven ? (
             <>
               <h3 className="text-xl font-bold text-slate-900">{stepNumber}. {title}</h3>
               <p className="mt-2 text-slate-600">{description}</p>
             </>
          ) : (
             codeSnippet
          )}
        </div>
      </div>
    </FadeIn>
  );
};
