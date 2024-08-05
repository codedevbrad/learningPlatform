"use client"
import React, { useEffect , useState , useRef } from "react"
import Title from "@/app/reusables/content/title"
import {   
  PushSheet, PushSheetTrigger, PushSheetContent, PushSheetClose, PushSheetHeader,
  PushSheetFooter, PushSheetTitle, PushSheetDescription, 
} from "@/components/custom/sheetPush"

import { FaBookOpenReader } from "react-icons/fa6"
import Editor from "@/app/reusables/usables/editorJs/index"

import { Card } from "@/components/ui/card"


const Notes: React.FC = ({ notes }) => {
    const [data, setData] = useState( {} );

    const saveDataToState = ( noteObj ) => {
        console.log( 'saving notes to state', noteObj  );
        setData( noteObj );
    }
  
    const saveEditorDataOnClose = (state: boolean) => {
      if (!state) {
        // updateNotesToDb( data );
      }
    };

    const saveEditorDataOnBtnClick = ( ) => {
        console.log( data , 'clicked to save editor...');
        // updateNotesToDb( data );
    }
  
    return (
      <PushSheet side="right">
          <PushSheetTrigger className="" isOpen={undefined} onToggle={undefined} >
            <div className="border p-5 m-4 rounded-lg bg-black text-white shadow-lg ">
                Notes made
              </div>
          </PushSheetTrigger>
          <PushSheetHeader className={undefined}>
            <PushSheetTitle className={undefined}>
              <Title variant="subheading1" title="Notes you've made on this session" noMargin={false} />
            </PushSheetTitle>
            <PushSheetDescription className={undefined}>
              Here is the description of the navigation menu.
            </PushSheetDescription>
          </PushSheetHeader>

          <div className="flex flex-col">
             <div className="p-4 grow flex flex-col text-black overflow-auto">
                  <Editor notesMode={ true } inReadMode={ false } data={data} onSaveToState={ saveDataToState } saveByButton={ saveEditorDataOnBtnClick } />
              </div>
          </div>
      </PushSheet>
    );
};


export default function Page({ params }: { params: { slug: string } }) {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <Card className="w-5/6 p-7">

                <div className="py-5">
                    <div className="flex flex-row mb-4"> 
                        <Title className="font-bold" title="Learning FetchJs" variant="Heading" noMargin={ true }  />
                        <span className="font-bold text-sm px-3 py-0 rounded-lg bg-blue-100 text-blue-800 justify-center items-center flex ml-3"> Web Session </span>
                    </div>
                    <p className="text-gray-500"> We'll be looking at how to integrate Web api's 
                        into our ReactJs project using the Fetch Library.
                    </p>
                </div>

                <div className="w-full relative p-5 mt-7">
                    <img 
                      className="rounded-2xl h-[450px] w-full inset-0 object-cover" 
                      src="https://plus.unsplash.com/premium_photo-1682130183027-2df8f6b99162?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="hey"
                    />
                    
                    <div className="w-2/5 px-9 py-7 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg items-center justify-center flex flex-col p-4">
                        <Title title="Your tutoring session will start" variant="subheading1" noMargin={false} /> 
                        <span className="text-green-600 bg-green-200 px-3 rounded-md mt-2">
                            <Title title="Tomorrow, in 5 hours" variant="subheading3" noMargin={false} />   
                        </span> 
                    </div>
                </div>

                <div className="flex justify-end">
                   <Notes />
                </div>
            </Card>
        </div>
    )
}