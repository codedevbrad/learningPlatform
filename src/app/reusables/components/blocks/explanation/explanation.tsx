import React from 'react'
import Title from '@/app/reusables/content/title'

interface ExplanationProps {
  content: string;
  title: {
    value: string;
    size: 'subheading1' | 'subheading2' | 'subheading3';
    show: boolean;
  };
  type: 'explanation';
  id?: string;
}

interface ExplanationUsageProps {
  data: ExplanationProps;
}

export const explanationObject: ExplanationProps = {
  content: '',
  title: {
    value: '',
    size: 'subheading1',
    show: true,
  },
  type: 'explanation',
};

const ExplanationComponent: React.FC<ExplanationUsageProps> = ({ data }) => {
  return (
    <div className="mt-4 w-full">
      {data.title.show && (
        <Title title={data.title.value} variant={data.title.size} noMargin={false} />
      )}
      <p className="leading-8 break-words whitespace-pre-wrap">
        {data.content}
      </p>
    </div>
  );
};

export default ExplanationComponent;
export type { ExplanationProps, ExplanationUsageProps };
