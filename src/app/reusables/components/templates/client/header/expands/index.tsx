"use client"
import React, { useEffect , useState , useRef } from "react"
import Title from "@/app/reusables/content/title"
import { 
  PushSheet, PushSheetTrigger, PushSheetHeader, PushSheetTitle, PushSheetDescription 
} from "@/components/custom/sheetPush"

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
      <PushSheet side="right" className="">
          <PushSheetTrigger className="" isOpen={undefined} onToggle={undefined} >
            <div className="border p-5 m-4 rounded-md bg-white">
                <FaBookOpenReader />
              </div>
          </PushSheetTrigger>
          <PushSheetHeader className={undefined}>
            <PushSheetTitle className={undefined}>
              <Title variant="subheading1" title="Notes you've made for this course" noMargin={false} />
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


function Resources({ resources , displayResource }) {
    console.log( 'resources: ', resources  )

    return (
          <PushSheet side="right" className={'z-50'}>
            <PushSheetTrigger className="" isOpen={undefined} onToggle={undefined} >
              <div className="border p-5 m-4 rounded-md bg-white">
                  <FaRegFile />
                </div>
            </PushSheetTrigger>
            <PushSheetHeader className={undefined}>
              <PushSheetTitle className={undefined}>
                <Title variant="subheading1" title="Resources for this course" noMargin={false} />
              </PushSheetTitle>
             
            </PushSheetHeader> 
            <PushSheetDescription className={undefined}>
                  { resources.map( ( resource , index ) => 
                      <div key={ `resource_${ index }`} onClick={ () => displayResource( resource.url ) }>
                         <ResourceComponent viewType={ 'embedded'}resource={ resource } isInAdminMode={ false } />
                      </div>
                  )}
              </PushSheetDescription>
        </PushSheet>
    );
}


export default function PageWorkExtraExpandable({ resources , notes , triggerResourceVideoDisplay }) {

    return (
        <div className="flex justify-center items-center">
            <Notes notes={ notes } />
            <Resources resources={ resources } displayResource={ triggerResourceVideoDisplay } />
        </div>
    );
}