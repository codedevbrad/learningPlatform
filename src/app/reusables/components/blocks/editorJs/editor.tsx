import React, { useEffect, useRef } from 'react'
import Title from '@/app/reusables/content/title'
import Editor from "@/app/reusables/usables/editorJs/index"

interface EditorJsProps {
  content: any; // EditorJS data type
  title: string;
  type: 'editor';
  id?: string;
}

export const editorJsObject: EditorJsProps = {
  content: {
    time: new Date().getTime(),
    blocks: [
        {
            type: 'header',
            data: {
                text: 'this is a header',
                level: 1
            }
        }
    ]
},
  title: '',
  type: 'editor'
};

interface EditorJsUsageProps {
  data: EditorJsProps;
}

const EditorViewComponent: React.FC<EditorJsUsageProps> = ({ data }) => {

  return (
    <div className="mt-4">
      <Title title={data.title} variant="subheading1" noMargin={false} />
      <Editor data={ data.content } inReadMode={ true } />
    </div>
  );
};

export default EditorViewComponent;
export type { EditorJsProps, EditorJsUsageProps };