import React from 'react'
import DividerWithText from '@/app/reusables/layouts/divider'

import ContentHeader from '@/app/reusables/components/templates/client/header/index'
import PlatformContentBlocks , { DataForBuild } from "@/app/reusables/components/render/index"

interface InfoProps {
    name: string;
    description: string;
    imgUrl: string;
}


interface DataProps {
    map(arg0: (item: DataForBuild, index: React.Key | null | undefined) => React.JSX.Element): React.ReactNode;
    data: DataForBuild[];
}


const CourseMainComponent: React.FC<{ data: DataProps, courseInfo: InfoProps }> = ({ data, courseInfo }) => {
    return (
        <div className=" overflow-x-hidden px-3">
            <ContentHeader courseInfo={ courseInfo } />
            
            <DividerWithText className="">
                enjoy your course 🙂
            </DividerWithText>

            <PlatformContentBlocks data={ data } isInAdminMode={ false } adminTools={ null } />

            <div className="flex justify-center p-5 my-7 items-center">
                <p className='border border-gray-200 rounded-xl p-3 px-6'> I feel i've completed this course </p> 
            </div>
        </div>
    );
};


export default CourseMainComponent;