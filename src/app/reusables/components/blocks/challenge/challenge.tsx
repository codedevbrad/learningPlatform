import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import React from 'react'
import Title from "@/app/reusables/content/title"

// Define the type for a single challenge
interface ChallengeProps {
  title: string;
  showcase: string;
}

// use for when you want to decide on the data coming into the component.
interface ChallengeUsageProps {
  content: ChallengeProps[];
  type: string;
  id?: string;
}

// Define the props for the ChallengeComponent
interface ChallengeComponentProps {
  data: ChallengeUsageProps;
}

export const ChallengeComponentObject: ChallengeUsageProps = {
  type: 'challenge',
  content: [
      { 
          title: '', showcase: ''
      }
  ],
}

// Annotate the function with the defined props type
const ChallengeComponent: React.FC<ChallengeComponentProps> = ({ data }) => {
  const { content } = data;
  return (
    <div className="my-3">
      <Title title={'Challenge yourself'} variant='subheading1' noMargin={false} />
      {content.map( ( challenge ) => (
        <Accordion type="single" collapsible key={ challenge.title }>
          <AccordionItem value="item-1">
            <AccordionTrigger> 
              {challenge.title}
            </AccordionTrigger>
            <AccordionContent>
              {challenge.showcase}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}

export default ChallengeComponent;
export type {ChallengeUsageProps , ChallengeProps }