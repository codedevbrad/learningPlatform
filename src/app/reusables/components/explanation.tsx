import React from 'react';
import Title from '@/app/reusables/content/title';

interface ExplanationProps {
  content: string;
  title: string;
  type: 'explanation';
}

interface ExplanationUsageProps {
    data: ExplanationProps
}

const ExplanationComponent: React.FC<ExplanationUsageProps> = ({ data }) => {
  return (
    <div className="mt-4">
       <Title title={ data.title } variant='subheading1' />
       <p className="leading-8">
          { data.content }
       </p>
    </div>
  );
};

export default ExplanationComponent;
export type { ExplanationProps, ExplanationUsageProps };