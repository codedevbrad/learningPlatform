import React from 'react';
import Title from '@/app/reusables/content/title';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

// ExplanationProps interface
interface ExplanationProps {
  content: {
    state: string;
    stateBuilt: [] | [
      {
        type: 'basic' | 'tooltip';
        content: string | {
          trigger: string;
          text: string;
        };
      }
    ];
  };
  title: string; // Title text
  size: 'subheading1' | 'subheading2' | 'subheading3'; // Title size
  renderTitle: boolean; // Whether to display the title
  type: 'explanation';
  id?: string;
}

// ExplanationUsageProps interface
interface ExplanationUsageProps {
  data: ExplanationProps;
}

// GenerateContent Component
function GenerateContent({ state }: { state: ExplanationProps['content']['stateBuilt'][0] }) {
  if (!state) {
    return null;
  }

  const { type, content } = state;

  if (type === 'basic' && typeof content === 'string') {
    // Render plain string for 'basic'
    return <div>{content}</div>;
  }

  if (type === 'tooltip' && typeof content === 'object') {
    // Render Tooltip for 'tooltip'
    return (
      <Tooltip>
        <TooltipTrigger>
          <span className="relative inline-block group">
            {content.trigger}
            <div className="absolute left-0 right-0 bottom-1 h-[7px] bg-gradient-to-r from-purple-500/50 to-purple-800/50 opacity-40"></div>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <span>{content.text}</span>
        </TooltipContent>
      </Tooltip>
    );
  }
  return null;
}

// Default explanationObject
export const explanationObject: ExplanationProps = {
  content: {
    state: '',
    stateBuilt: [],
  },
  title: '',
  size: 'subheading1',
  renderTitle: true,
  type: 'explanation',
};


// ExplanationComponent
const ExplanationComponent: React.FC<ExplanationUsageProps> = ({ data }) => {
  return (
    <div className="mt-4 w-full">
      {data.renderTitle && (
        <Title title={data.title} variant={data.size} noMargin={false} />
      )}
      <div className="whitespace-nowrap flex flex-wrap items-center gap-1">
        {data.content.stateBuilt.map((state, index) => (
          <GenerateContent state={state} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ExplanationComponent;
export type { ExplanationProps, ExplanationUsageProps };