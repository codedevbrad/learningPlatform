import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Title from '@/app/reusables/content/title';

interface TaskProps {
    type: 'task';
    title: string;
    content: {
        description: string;
        tasks: {
            title: string;
            explanation: string;
        }[];
        tips: {
            title: string;
            explanation: string;
        }[];
    };
}

// Define a wrapper type for the task to be passed as a prop named projectTask
interface TaskComponentProps {
    projectTask: TaskProps;
}

const TaskComponent: React.FC<TaskComponentProps> = ({ projectTask }) => {
    const { title, content } = projectTask;
    const { description, tasks , tips } = content;

    return (
        <div className="my-3 mb-5 py-3">
            <Title title={ `Project: ${ title} ` } variant='subheading1' />
            <Tabs defaultValue="description">
                <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="tips">Tips</TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                    <p className="leading-loose"> {description } </p>
                </TabsContent>
                <TabsContent value="tasks">
                    <ul>
                        {tasks.map((task, index) => (
                            <li key={index} className="my-2 flex flex-row">
                                <div className="flex justify-center items-center pr-3">
                                    <div className="bg-purple-700 px-2 py-1 shadow-xl rounded-md text-white">
                                        { index + 1 }    
                                    </div>
                                </div>
                                <p className="leading-loose">  
                                     <strong> { task.task } </strong> 
                                    {task.explanation}
                                </p>
                            </li>
                        ))}
                    </ul>
                </TabsContent>
                <TabsContent value="tips">
                    <ul>
                        {tips.map((tip, index) => (
                            <li key={index} className="my-2 flex flex-row">
                                <div className="flex justify-center items-center pr-3">
                                    <div className="bg-purple-700 px-2 py-1 shadow-xl rounded-md text-white ">
                                        { index + 1 }    
                                    </div>
                                </div>
                                <p className="leading-loose"> 
                                     <strong> {tip.tip} </strong> 
                                    {tip.explanation}
                                </p>
                            </li>
                        ))}
                    </ul>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default TaskComponent;
export type { TaskProps };