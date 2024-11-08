import { explanationObject, ExplanationProps } from "@/app/reusables/components/blocks/explanation/explanation"
import { quizObject, QuizObjectProps } from "@/app/reusables/components/blocks/quiz/quiz"
import { codeSnippetObject, CodeSnippetProps } from "@/app/reusables/components/blocks/snippet/snippet"
import { ChallengeComponentObject, ChallengeUsageProps } from "@/app/reusables/components/blocks/challenge/challenge"
import { taskObject, TaskProps } from "@/app/reusables/components/blocks/task/task"
import { editorJsObject, EditorJsProps } from "@/app/reusables/components/blocks/editorJs/editor"
import { videoBlockObject, VideoBlockProps } from "@/app/reusables/components/blocks/video/video"

// using this for my a.i generation prompt.

export const blockObjects = [
    explanationObject,
    quizObject,
    codeSnippetObject,
    ChallengeComponentObject,
    taskObject,
    editorJsObject,
    videoBlockObject
];