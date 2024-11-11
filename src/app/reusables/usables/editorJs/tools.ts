import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist"; 
import Code from '@editorjs/code'
import ImageTool from '@editorjs/image';
import CustomHeader from "./extends/header";
import editorjsCodecup from '@calumk/editorjs-codecup';
import Header from "@editorjs/header";

export const EDITOR_JS_TOOLS = { 
    header: {
      class: CustomHeader,
      config: {
        levels: [1, 2, 3, 4, 5, 6],  // Add more heading levels
        defaultLevel: 1
      }
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },    
    code: editorjsCodecup,
    checkList: CheckList,
    list: List,
    delimiter: Delimiter,
    link: Link,

    image: {
      class: ImageTool,
      config: {
        captionPlaceholder: 'Enter caption',
        buttonContent: 'Select an Image',
      }
    }
  };