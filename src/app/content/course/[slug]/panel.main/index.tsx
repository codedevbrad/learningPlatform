import React from 'react';
import ExplanationComponent, { ExplanationProps } from "./components/explanation"
import TaskComponent, { TaskProps } from './components/task'
import ChallengeComponent, { ChallengeUsageProps } from './components/challenge'
import QuizComponent, { QuizObjectProps } from './components/quiz';

import Title from '@/app/reusables/content/title'
import DividerWithText from '@/app/reusables/layouts/divider';

type CourseData = ExplanationProps | TaskProps | ChallengeUsageProps | QuizObjectProps;

interface InfoProps {
    title: string;
    description: string;
    imageUrl: string;
    categoryTags: string[];
    belongsTo: string;
  }

interface DataChoiceComponentProps {
    dataItem: CourseData;
}

interface DataProps {
    map(arg0: (item: CourseData, index: React.Key | null | undefined) => React.JSX.Element): React.ReactNode;
    data: CourseData[];
}

  
const DataChoiceComponent: React.FC<DataChoiceComponentProps> = ({ dataItem }) => {
    switch (dataItem.type) {
        case 'explanation':
            // Directly render the explanation component
            return <ExplanationComponent data={ dataItem as ExplanationProps } />;
        case 'task':
            // Render the task component, passing the entire task object
            return <TaskComponent projectTask={ dataItem as TaskProps } />;
        case 'challenge':
            return <ChallengeComponent data={ dataItem as ChallengeUsageProps } />
        case 'quiz':
            return <QuizComponent data={ dataItem as QuizObjectProps } />
        default:
            // This should never happen, but it's good to handle unexpected cases ...
            return <div> Could not render course Item... </div>
    }
}


const CourseMainComponent: React.FC<{ data: DataProps, courseInfo: InfoProps }> = ({ data, courseInfo }) => {
    return (
        <div className="overflow-y-scroll overflow-x-hidden px-3">
            <div className="mb-10">
                <Title title={ courseInfo.title } variant='heading' />
                <p> { courseInfo.description } </p>    
            </div>
            
            <DividerWithText className="">
                enjoy your course 🙂
            </DividerWithText>

            {data.map((item: CourseData, index: React.Key | null | undefined) => (
                <DataChoiceComponent key={index} dataItem={item} />
            ))}
        </div>
    );
};


export default CourseMainComponent;