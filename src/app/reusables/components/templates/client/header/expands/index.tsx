"use client"
import React, { useEffect , useState , useRef } from "react"
import Title from "@/app/reusables/content/title"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { FaRegFile } from "react-icons/fa"
import { FaBookOpenReader } from "react-icons/fa6"
import Editor from "@/app/reusables/usables/editorJs/index"
import ResourceComponent from "@/app/reusables/components/resources"


const Notes: React.FC = ({ notes }) => {
    const { state , updateNotesToDb } = notes;
    const [data, setData] = useState( state );

    const saveDataToState = ( noteObj ) => {
        console.log( 'saving notes to state', noteObj  );
        setData( noteObj );
    }
  
    const saveEditorDataOnClose = (state: boolean) => {
      if (!state) {
        updateNotesToDb( data );
      }
    };

    const saveEditorDataOnBtnClick = ( ) => {
        console.log( data , 'clicked to save editor...');
        updateNotesToDb( data );
    }
  
    return (
      <Sheet onOpenChange={saveEditorDataOnClose}>
        <SheetTrigger>
          <div className="border p-5 m-4 rounded-md bg-white">
            <FaBookOpenReader />
          </div>
        </SheetTrigger>
        <SheetContent className="w-[700px] flex flex-col h-full">
          <SheetHeader>
            <Title variant="subheading1" title="Notes you've made for this course" noMargin={false} />
          </SheetHeader>
          <SheetDescription className="flex-grow flex flex-col text-black overflow-auto">
            <Editor notesMode={ true } inReadMode={ false } data={data} onSaveToState={ saveDataToState } saveByButton={ saveEditorDataOnBtnClick } />
          </SheetDescription>
        </SheetContent>
      </Sheet>
    );
};

function Resources({ resources }) {
    console.log( 'resources: ', resources  )
    return (
        <Sheet>
            <SheetTrigger>
                <div className="border p-5 m-4 rounded-md bg-white"> 
                    <FaRegFile />
                </div> 
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <Title variant="subheading1" title="Resources for this course" noMargin={false} />
                </SheetHeader>
                <SheetDescription>
                    {  resources.map( ( resource , index ) => 
                        <ResourceComponent key={ `resource_${ index }`} resource={ resource } isInAdminMode={ false } />
                    )}
                </SheetDescription>
            </SheetContent>
        </Sheet>
    );
}


export default function PageWorkExtraExpandable({ resources , notes }) {

    return (
        <div className="flex justify-center items-center">
            <Notes notes={ notes } />
            <Resources resources={ resources } />
        </div>
    );
}
