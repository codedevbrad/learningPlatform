import React from 'react';
import ExplanationComponent, { ExplanationProps } from "@/app/reusables/components/explanation"
import TaskComponent, { TaskProps } from '@/app/reusables/components/task'
import ChallengeComponent, { ChallengeUsageProps } from '@/app/reusables/components/challenge'
import QuizComponent, { QuizObjectProps } from '@/app/reusables/components/quiz'
import CourseExtraExpandable from './expands'


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
        <div className=" overflow-x-hidden px-3">
            <div className="flex flex-row"> 
                <div className="mb-10 flex-grow">
                    <Title title={ courseInfo.title } variant='heading' />
                    <p> { courseInfo.description } </p>    
                </div>
                <CourseExtraExpandable />
            </div>
            
            <DividerWithText className="">
                enjoy your course 🙂
            </DividerWithText>

            {data.map((item: CourseData, index: React.Key | null | undefined) => (
                <DataChoiceComponent key={index} dataItem={item} />
            ))}

            <div className="flex justify-center p-5 my-7 items-center">
                <p className='border border-gray-200 rounded-xl p-3 px-6'> I feel i've completed this course </p> 
            </div>
        </div>
    );
};


export default CourseMainComponent;