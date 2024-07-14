import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist"; 
import Code from '@editorjs/code'
import ImageTool from '@editorjs/image';
import CustomHeader from "./extends";


export const EDITOR_JS_TOOLS = { 
    header: CustomHeader,
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },    
    code: Code,
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