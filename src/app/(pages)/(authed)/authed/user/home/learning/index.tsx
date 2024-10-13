'use client'
import { Card } from "@/components/ui/card"
import ResourceComponent from "@/app/reusables/components/resources"
import Title from "@/app/reusables/content/title"
import Editor from "@/app/reusables/usables/editorJs"
import { useState } from "react"


export default function Learn ( ) {
    const [data, setData] = useState({});

    const saveDataToState = ( noteObj ) => {
        console.log( 'saving notes to state', noteObj  );
    }
  
    const saveEditorDataOnClose = (state: boolean) => {
      if (!state) {}
    };

    const saveEditorDataOnBtnClick = ( ) => {
        console.log( data , 'clicked to save editor...');
    }
  
    return (
        <Card className="p-5 mt-4 space-y-3">
                <div>
                    <Title title="Learn" variant="subheading1" noMargin={false} /> 
                    <p> Take videos and journal your learning </p>
                </div>
                <Editor notesMode={ true } inReadMode={ false } data={data} onSaveToState={ saveDataToState } saveByButton={ saveEditorDataOnBtnClick } />
        </Card>
    )
}