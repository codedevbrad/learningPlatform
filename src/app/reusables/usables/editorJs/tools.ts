import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist"; 
import Code from '@editorjs/code'
import CustomHeader from "./extends";


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