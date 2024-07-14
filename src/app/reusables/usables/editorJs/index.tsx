'use client'
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "./tools";
import EditorButtonSavePlain from "../../themes/saveButtonPlain";
import { v4 as uuidv4 } from 'uuid';
import './index.css'; // Import the custom CSS file


const Editor = ({ notesMode = false, data, onSaveToState, saveByButton, inReadMode = true, showSaveButn = true }) => {
  const editorName = `editorJs${uuidv4()}`;
  const [canSave, setCanSave] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: editorName,
        tools: EDITOR_JS_TOOLS,
        data: data,
        readOnly: inReadMode,
        onReady: () => {
          // No need for additional JavaScript here as styles will be applied via CSS
        },
        async onChange(api, event) {
          if (!inReadMode) {
            const newData = await api.saver.save();
            onSaveToState(newData);
            setCanSave(true);
          }
        },
      });
      ref.current = editor;
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  const saveEditorData = async () => {
    console.log(data);
    await saveByButton();
    onSaveToState(data);
    setCanSave(false); // Disable save button after saving
  };

  return (
    <div className={`editor editor-read-${ inReadMode } flex-grow flex-col flex overflow-hidden`}>
      <div className={`overflow-y-auto overflow-x-hidden flex-grow ${notesMode ? 'bg-gray-100' : 'bg-white'} rounded-md`}>
        { /* editor data */ }
        <div id={editorName} className={`p-0 w-auto h-auto ${ notesMode ? 'p-3' : '' }`}/>
      </div>
      {!inReadMode && showSaveButn &&
        <div className="flex justify-center items-center mt-5">
          <EditorButtonSavePlain onSave={saveEditorData} canSave={canSave} />
        </div>
      }
    </div>
  );
};

export default Editor;