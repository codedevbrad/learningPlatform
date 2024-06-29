import React from 'react'
import Title from '@/app/reusables/content/title'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CodeSnippetProps {
  code: string;
  title: string;
  type: 'codeSnippet';
  id?: string;
}

interface CodeSnippetUsageProps {
  data: CodeSnippetProps;
}

export const codeSnippetObject: CodeSnippetProps = {
  code: '',
  title: '',
  type: 'codeSnippet'
};

const CodeSnippetComponent: React.FC<CodeSnippetUsageProps> = ({ data }) => {
  return (
    <div className="mt-4">
        <Title title={data.title} variant="subheading1" noMargin={false} />
        <div className="border-gray-200 rounded-md border p-5">
          <SyntaxHighlighter language="javascript" style={docco}>
          {data.code}
          </SyntaxHighlighter>
        </div>
    </div>
  );
};

export default CodeSnippetComponent;
export type { CodeSnippetProps, CodeSnippetUsageProps };