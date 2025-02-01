'use client';
import React, { useState, useEffect, useRef } from "react"
import { Label } from "@/components/ui/label"
import { PushSheet, PushSheetTrigger, PushSheetHeader, PushSheetTitle } from "../sheetPush"
import { useTextStateWithCatches, CharacterCountDisplay, LimitWarning } from "@/app/reusables/usables/useCharacterCount";
import { Textarea } from "@/components/ui/textarea"
import DivAsButton from "../divAsButton"

// Type Definitions
interface TooltipContent {
  trigger: string;
  text: string;
}

type StateBuiltItem = 
  | { type: "basic"; content: string }
  | { type: "tooltip"; content: TooltipContent };

export interface ContentWithToolTipProps {
  state: string;
  stateBuilt: StateBuiltItem[];
}

interface TextAreaWithTooltipProps {
  displayOnly?: boolean;
  wordLimit?: number;
  onChange?: (value: ContentWithToolTipProps ) => void;
  handleContentEditableTrigger: () => void;
  value: ContentWithToolTipProps;
}

interface UseTextState {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  count: number;
  warning: { limitReached: boolean };
}


const TextAreaWithTooltip2: React.FC<TextAreaWithTooltipProps> = ({
  value,
  onChange,
  displayOnly = false,
  wordLimit = 100, // Default word limit
  handleContentEditableTrigger,
}) => {
  const [stateBuilt, updateStateBuilt] = useState<StateBuiltItem[]>(value.stateBuilt || []);
  const [highlightedText, setHighlightedText] = useState<string>("");
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const { state, setState, count, warning }: UseTextState = useTextStateWithCatches(value.state, wordLimit);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (contentEditableRef.current) {
      const textContent = contentEditableRef.current.innerHTML;

      if (textContent.length <= wordLimit) {
        setState(textContent);
        handleContentEditableTrigger();
      } else {
        e.preventDefault();
        contentEditableRef.current.textContent = state;
      }
    }
  };

  const buildState = () => {
    if (contentEditableRef.current) {
      const elements = Array.from(contentEditableRef.current.childNodes);

      const builtState = elements.map((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).classList.contains("tooltip")) {
          const trigger = node.textContent || "";
          const existingTooltip = stateBuilt.find(
            (item) => item.type === "tooltip" && item.content.trigger === trigger
          );
          return {
            type: "tooltip",
            content: {
              trigger,
              text: existingTooltip?.content.text || "", // Preserve existing text
            },
          };
        }
        return { type: "basic", content: node.textContent || "" };
      });
      updateStateBuilt(builtState);
    }
  };

  const handleTooltipTextChange = () => {
    console.log("tooltip textarea updated. can save state");
  };

  useEffect(() => {
    buildState();
    console.log("hey this is when state is updated");
  }, [state]);

  useEffect(() => {
    onChange && onChange({ state, stateBuilt });
  }, [state, stateBuilt]);

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setHighlightedText(selection.toString());
    } else {
      setHighlightedText("");
    }
  };

  const addTooltip = () => {
    if (highlightedText && contentEditableRef.current) {
      const selection = window.getSelection();
      if (!selection || !selection.anchorNode || !selection.anchorNode.textContent) return;

      const range = selection.getRangeAt(0);

      const spanHTML = `<span class="tooltip text-blue-500">${highlightedText}</span>`;
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = spanHTML;
      const spanElement = tempContainer.firstChild;

      range.deleteContents();
      range.insertNode(spanElement!);

      const newTooltip: StateBuiltItem = {
        type: "tooltip",
        content: { trigger: highlightedText, text: "" },
      };
      updateStateBuilt([...stateBuilt, newTooltip]);

      const newState = contentEditableRef.current.innerHTML;
      setState(newState);
      setHighlightedText("");
      handleContentEditableTrigger();
    }
  };

  const updateTooltipText = (index: number, newText: string) => {
    const updatedStateBuilt = [...stateBuilt];
    const tooltip = updatedStateBuilt[index];
    if (tooltip.type === "tooltip") {
      tooltip.content.text = newText;
      updateStateBuilt(updatedStateBuilt);

      const updatedHTML = updatedStateBuilt
        .map((item) =>
          item.type === "tooltip"
            ? `<span class="tooltip text-blue-500">${item.content.trigger}</span>`
            : item.content
        )
        .join("");
      setState(updatedHTML);
    }
  };

  const deleteTooltip = (index: number) => {
    const updatedStateBuilt = stateBuilt.filter((_, i) => i !== index);

    if (contentEditableRef.current) {
      const updatedHTML = updatedStateBuilt
        .map((item) =>
          item.type === "tooltip"
            ? `<span class="tooltip text-blue-500">${item.content.trigger}</span>`
            : item.content
        )
        .join("");

      contentEditableRef.current.innerHTML = updatedHTML;
      setState(updatedHTML);
    }
    updateStateBuilt(updatedStateBuilt);
  };

  useEffect(() => {
    if (contentEditableRef.current && contentEditableRef.current.innerHTML !== state) {
      contentEditableRef.current.innerHTML = state;
    }
  }, [state]);

  useEffect(() => {
    document.addEventListener("mouseup", handleHighlight);
    return () => document.removeEventListener("mouseup", handleHighlight);
  }, []);

  return (
    <>
      <Label htmlFor="content">Content</Label>
      <div className="w-full p-3 rounded space-y-2 relative border">
        <div>
          <PushSheet side="right">
            <PushSheetTrigger isOpen={undefined} onToggle={undefined}>
              <DivAsButton variant="outline">Manage Tooltips</DivAsButton>
            </PushSheetTrigger>
            <PushSheetHeader>
              <PushSheetTitle>Manage Tooltips</PushSheetTitle>
            </PushSheetHeader>
            <div className="p-4">
              {stateBuilt.map((item, index) =>
                item.type === "tooltip" ? (
                  <div key={index} className="mb-4 flex flex-col space-y-2">
                    <Label className="block mb-1">Trigger: {item.content.trigger}</Label>
                    <Textarea
                      className="w-full border p-2 rounded"
                      value={item.content.text}
                      onChange={(e) => updateTooltipText(index, e.target.value)}
                      placeholder="Tooltip text"
                    />
                    <button
                      type="button"
                      onClick={() => deleteTooltip(index)}
                      className="text-red-500 text-sm self-end underline"
                    >
                      Delete
                    </button>
                  </div>
                ) : null
              )}
            </div>
          </PushSheet>
        </div>
        {!displayOnly && highlightedText && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addTooltip();
            }}
            className="absolute top-2 right-2 border text-sm text-black px-3 py-2 rounded bg-gray-200"
          >
            Create Tooltip
          </button>
        )}
        <div
          ref={contentEditableRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleInput}
          className="border-none rounded p-1 focus:outline-none"
        />
      </div>
      <CharacterCountDisplay count={count} wordLimit={wordLimit} />
      <LimitWarning warning={warning.limitReached} />
    </>
  );
};

export { TextAreaWithTooltip2 };