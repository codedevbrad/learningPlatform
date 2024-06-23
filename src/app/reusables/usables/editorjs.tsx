import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist"; 
import Code from '@editorjs/code'

import React, { memo, useEffect, useRef, useState } from "react"; 
import { Button } from "@/components/ui/button";
import EditorJS from "@editorjs/editorjs";

class CustomHeader extends Header {
  render(settings) {
    const wrapper = super.render(settings);
    const level = this.data.level || this.defaultLevel;

    let tailwindClasses = '';
    switch (level) {
      case 1:
        tailwindClasses = 'text-4xl font-bold';
        break;
      case 2:
        tailwindClasses = 'text-3xl font-bold';
        break;
      case 3:
        tailwindClasses = 'text-2xl font-bold';
        break;
      case 4:
        tailwindClasses = 'text-xl font-bold';
        break;
      case 5:
        tailwindClasses = 'text-lg font-bold';
        break;
      case 6:
        tailwindClasses = 'text-md font-bold';
        break;
      default:
        tailwindClasses = 'text-lg font-bold';
        break;
    }

    tailwindClasses.split(' ').forEach(cls => wrapper.classList.add(cls));

    return wrapper;
  }
}

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  checkList: CheckList,
  list: List,
  header: CustomHeader,
  delimiter: Delimiter,
  link: Link,
  code: Code
};


const Editor = ({ data , onSave }) => {

  const [isChanged, setIsChanged] = useState(false);
  const [savedToDb, setSavedToDb] = useState(true);
  const ref = useRef();
  const initialDataRef = useRef(data);

  //Initialize editorjs
  useEffect(() => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editorjs-container',
        tools: EDITOR_JS_TOOLS,
        data: data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onSave(data);
          setSavedToDb(false);
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

  useEffect(() => {
    if (JSON.stringify(data.blocks) !== JSON.stringify(initialDataRef.current.blocks)) {
      setIsChanged(true);
      setSavedToDb(false);
    } else {
      setIsChanged(false);
    }
  }, [data]);

  const saveEditorData = () => {
    console.log(data);
    setSavedToDb(true);
    if (onSave) onSave(data);
  };

  return (
    <div className="editor flex-grow flex-col flex">
      <div className="bg-gray-100 p-3 flex-grow"> 
       <div id="editorjs-container" />
      </div>
      <div className="flex justify-center items-center mt-5">
        <Button className="savebtn" onClick={saveEditorData} disabled={!isChanged || savedToDb}>
          Save notes
        </Button>
      </div>
    </div>
  );
};

export default Editor;