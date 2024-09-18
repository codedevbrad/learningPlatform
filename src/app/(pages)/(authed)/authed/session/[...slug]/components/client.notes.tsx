'use client'
import { PushSheet, PushSheetTrigger, PushSheetContent, PushSheetClose, PushSheetHeader, PushSheetFooter, PushSheetTitle, PushSheetDescription } from "@/components/custom/sheetPush"
import { FaBookOpenReader } from "react-icons/fa6"
import Editor from "@/app/reusables/usables/editorJs/index"
import Title from "@/app/reusables/content/title"
import { useState } from "react"

export default function Notes ({ notes  , notesButtonText }) {
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
            <div className="border p-5 my-5 rounded-lg bg-black text-white shadow-lg ">
                { notesButtonText }
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