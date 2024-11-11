import React from 'react'
import Title from '@/app/reusables/content/title'

interface ExplanationProps {
  content: string;
  title: string;  // Title text
  size: 'subheading1' | 'subheading2' | 'subheading3';  // Title size
  renderTitle: boolean;  // Whether to display the title
  type: 'explanation';
  id?: string;
}

interface ExplanationUsageProps {
  data: ExplanationProps;
}

export const explanationObject: ExplanationProps = {
  content: '',
  title: '',
  size: 'subheading1',
  renderTitle: true,
  type: 'explanation',
};

const ExplanationComponent: React.FC<ExplanationUsageProps> = ({ data }) => {
  return (
    <div className="mt-4 w-full">
      {data.renderTitle && (
        <Title title={data.title} variant={data.size} noMargin={false} />
      )}
      <p className="leading-8 break-words whitespace-pre-wrap">
        {data.content}
      </p>
    </div>
  );
};

export default ExplanationComponent;
export type { ExplanationProps, ExplanationUsageProps };
