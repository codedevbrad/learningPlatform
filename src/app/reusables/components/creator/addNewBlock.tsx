"use client"

import * as React from "react"
import { v4 as uuidv4 } from "uuid"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { explanationObject } from "@/app/reusables/components/blocks/explanation/explanation"
import { quizObject } from "@/app/reusables/components/blocks/quiz/quiz"
import { codeSnippetObject } from "@/app/reusables/components/blocks/snippet/snippet"
import { ChallengeComponentObject } from "@/app/reusables/components/blocks/challenge/challenge"
import { taskObject } from "@/app/reusables/components/blocks/task/task"
import { editorJsObject } from "@/app/reusables/components/blocks/editorJs/editor"
import { videoBlockObject } from "@/app/reusables/components/blocks/video/video"
import { animatedCodeChallengeObject } from "../blocks/animatedCodeChallenge"
import { imageObject } from "../blocks/image/image"
import { diagramCompletionObject } from "../blocks/diagramCompletion/diagramCompletion"

import { DataForBuild } from "../render"
import { Button } from "@/components/ui/button"

interface AddNewDataBlockProps {
  addDataToBlock: (props: {
    type: "new"
    blockData: DataForBuild
    blockIndex?: number
  }) => void
  pushAfter: number
}

const blockOptions = [
  { title: "Explanation", object: explanationObject },
  { title: "Image", object: imageObject },
  { title: "Quiz", object: quizObject },
  { title: "Code Snippet", object: codeSnippetObject },
  { title: "Challenge", object: ChallengeComponentObject },
  { title: "Task", object: taskObject },
  { title: "EditorJs", object: editorJsObject },
  { title: "Video", object: videoBlockObject },
  { title: "Animated Code Challenge", object: animatedCodeChallengeObject },
  { title: "Diagram Completion", object: diagramCompletionObject },
]

export default function AddNewDataBlock({
  addDataToBlock,
  pushAfter,
}: AddNewDataBlockProps) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (block: typeof blockOptions[0]) => {
    console.log('works')
    addDataToBlock({
      type: "new",
      blockData: { ...block.object, id: uuidv4() },
      blockIndex: pushAfter,
    })
    setOpen(false) // Close dialog
  }

  return (
    <>
      <Button
        className="btn btn-outline"
        onClick={() => setOpen((prev) => !prev)}
        variant="outline"
      >
        Add a new block
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search blocks..." />
        <CommandList>
          <CommandEmpty>No blocks found.</CommandEmpty>
          <CommandGroup heading="Blocks">
            {blockOptions.map((block, index) => (
              <div key={index} onClick={() => handleSelect(block)} className="rounded-md cursor-pointer hover:bg-black hover:text-white">
                    <CommandItem onSelect={() => handleSelect(block)}>
                        {block.title}
                    </CommandItem>
              </div>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
