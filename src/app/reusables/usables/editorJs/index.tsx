import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import EditorJS from "@editorjs/editorjs"
import { Loader2 } from "lucide-react"
import { EDITOR_JS_TOOLS } from "./tools"
import EditorButtonSavePlain from "../../themes/saveButtonPlain"


const Editor = ({ data, onSaveToState, saveByButton }) => {
  const [canSave, setCanSave] = useState(false);
  const ref = useRef();
  const initialDataRef = useRef(data);

  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editorjs-container',
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const newData = await api.saver.save();
          onSaveToState(newData);
          setCanSave(true);
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
    <div className="editor flex-grow flex-col flex">
      <div className="bg-gray-100 p-3 flex-grow">
        <div id="editorjs-container" />
      </div>
      <div className="flex justify-center items-center mt-5">
        <EditorButtonSavePlain onSave={saveEditorData} canSave={canSave} />
      </div>
    </div>
  );
};

export default Editor;
