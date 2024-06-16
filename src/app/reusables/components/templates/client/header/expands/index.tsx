"use client"
import { useEffect , useRef } from "react"
import Title from "@/app/reusables/content/title"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { FaRegFile } from "react-icons/fa"
import { FaBookOpenReader } from "react-icons/fa6"
import React, { useState } from "react"
import Editor from "@/app/reusables/usables/editorjs"
import ButtonSaving from "@/app/reusables/themes/saveButton"

const Notes: React.FC = () => {
    const [data, setData] = useState({});

    const saveDataToTb = ( data ) => {
        console.log( data );
        setData( data );
    }
  
    const saveEditorDataOnClose = (state: boolean) => {
      if (!state) {
        console.log(data, state);
        saveDataToTb( data );
      }
    };
  
    return (
      <Sheet onOpenChange={saveEditorDataOnClose}>
        <SheetTrigger>
          <div className="border p-5 m-4 rounded-md bg-white">
            <FaBookOpenReader />
          </div>
        </SheetTrigger>
        <SheetContent className="w-[700px] flex flex-col h-full">
          <SheetHeader>
            <Title variant="subheading1" title="Notes you've made for this course" />
          </SheetHeader>
          <SheetDescription className="flex-grow flex flex-col text-black overflow-auto">
            <Editor data={data} onSave={ saveDataToTb }/>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    );
};

function Resources({ data }) {
    return (
        <Sheet>
            <SheetTrigger>
                <div className="border p-5 m-4 rounded-md bg-white"> 
                    <FaRegFile />
                </div> 
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <Title variant="subheading1" title="Resources for this course" />
                </SheetHeader>
                <SheetDescription>
                    { data }
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}


function Completed({ completed }) {
    return (
       <div className="border p-5 m-4 rounded-md bg-white"> 
            <p className="text-sm"> completed 👍 </p>
        </div> 
    );
}


export default function PageWorkExtraExpandable({ resources , completed , notes }) {

    return (
        <div className="flex justify-center items-center">
            <Notes />
            <Resources data={ resources } />
            <Completed state={ completed } />
        </div>
    );
}
