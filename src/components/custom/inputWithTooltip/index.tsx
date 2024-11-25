
'use client'
import React, { useState, useEffect, useRef } from "react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { PushSheet, PushSheetTrigger, PushSheetHeader, PushSheetTitle, PushSheetDescription, PushSheetFooter } from "../sheetPush"
import { useTextStateWithCatches , CharacterCountDisplay , LimitWarning } from "@/app/reusables/usables/useCharacterCount"
import { Textarea } from "@/components/ui/textarea"
import DivAsButton from "../divAsButton"


interface TextAreaWithTooltipProps {
  displayOnly?: boolean;
}


interface TextAreaWithTooltipProps {
    displayOnly?: boolean;
    wordLimit?: number;
    onChange: any;
    value: {
        state: string;
        stateBuilt: [] | [{
            type: 'basic' | 'tooltip',
            content: string | {
                trigger: string;
                text: string
            }
        }];
    }
}

  
const TextAreaWithTooltip2: React.FC<TextAreaWithTooltipProps> = ({
  value, 
  onChange,
  displayOnly = false,
  wordLimit = 100, // Default word limit
}) => {

  const [stateBuilt, updateStateBuilt] = useState<{ type: string; content: any }[]>([]);
  const [highlightedText, setHighlightedText] = useState<string>("");
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const { state, setState, count, warning } = useTextStateWithCatches( value.state , wordLimit);

  useEffect( ( ) => {
    onChange & onChange({ 
      state , stateBuilt 
    });
  }, [ state , stateBuilt] );

  const buildState = () => {
    if (contentEditableRef.current) {
      const elements = Array.from(contentEditableRef.current.childNodes);
      const builtState = elements.map((node) => {
        if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).classList.contains("tooltip")) {
          return { type: "tooltip", content: { trigger: node.textContent, text: "" } };
        }
        return { type: "basic", content: node.textContent || "" };
      });
      updateStateBuilt(builtState);
    }
  };

  useEffect(() => {
    buildState();
  }, [state]);

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

      // Create the span element with a class name
      const span = document.createElement("span");
      span.className = "tooltip text-blue-500";
      span.textContent = highlightedText;

      range.deleteContents();
      range.insertNode(span);

      const newState = contentEditableRef.current.innerHTML;
      setState(newState); // Update the primary state
      setHighlightedText(""); // Clear the highlighted text
    }
  };

  const handleInput = ( e: React.FormEvent<HTMLDivElement> ) => {
      if (contentEditableRef.current) {
        const textContent = contentEditableRef.current.innerHTML;
    
        // Ensure the new content doesn't exceed the word limit
        if (textContent.length <= wordLimit) {
          setState(textContent);
        } else {
          // Prevent the state update but retain the current value
          // restrict the content editible.
          console.log('should prevent?')
          e.preventDefault();
          contentEditableRef.current.textContent = state;
        }
      }
    };
    

  const updateTooltipText = (index: number, newText: string) => {
    const updatedStateBuilt = [...stateBuilt];
    const tooltip = updatedStateBuilt[index];
    if (tooltip.type === "tooltip") {
      tooltip.content.text = newText;
      updateStateBuilt(updatedStateBuilt);

      const updatedHTML = updatedStateBuilt
        .map((item) => {
          if (item.type === "tooltip") {
            return `<span class="tooltip text-blue-500">${item.content.trigger}</span>`;
          }
          return item.content;
        })
        .join("");
      setState(updatedHTML);
    }
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
                <DivAsButton variant={'outline'}> Manage Tooltips </DivAsButton>
            </PushSheetTrigger>
            <PushSheetHeader>
              <PushSheetTitle>Manage Tooltips</PushSheetTitle>
            </PushSheetHeader>
            <div className="p-4">
              {stateBuilt.map((item, index) =>
                item.type === "tooltip" ? (
                  <div key={index} className="mb-4 flex space-y-4 flex-col">
                    <Label className="block mb-1">Trigger: {item.content.trigger}</Label>
                    <Textarea
                      className="w-full border p-2 rounded"
                      value={item.content.text}
                      onChange={(e) => updateTooltipText(index, e.target.value)}
                      placeholder="Tooltip text"
                      wordLimit={250}
                    />
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
            Create Tooltip.
          </button>
        )}
        <div
          ref={contentEditableRef}
          contentEditable={ true  }
          suppressContentEditableWarning={true}
          onInput={handleInput}
          className="border-none rounded p-1 focus:outline-none"
        />
      </div>
      <CharacterCountDisplay count={count} wordLimit={wordLimit} />
      <LimitWarning warning={warning.limitReached} />
      {/* <pre>{state}</pre>
      <pre className="mt-5 border p-3">{JSON.stringify(stateBuilt, null, 2)}</pre> */}
    </>
  );
};
  


export { TextAreaWithTooltip2 };

// interface TooltipContent {
//   trigger: string;
//   content: string;
// }

// type TextContent = 
//   | { content: string; type: "basic" }
//   | { content: TooltipContent; type: "tooltip" };


//   const TextAreaWithTooltip: React.FC<TextAreaWithTooltipProps> = ({ displayOnly = false }) => {
//   const [textTooltipTextState, setTextTooltipTextState] = useState<TextContent[]>([
//     { content: "..", type: "basic" },
//     { content: "--", type: "basic" },
//   ]);

//   const [highlightedText, setHighlightedText] = useState<string>("");
//   const [editingTooltipIndex, setEditingTooltipIndex] = useState<number | null>(null);

//   const handleHighlight = () => {
//     const selection = window.getSelection();
//     if (selection && selection.toString()) {
//       const selectedText = selection.toString();
//       const isWithinTooltip = textTooltipTextState.some(
//         (item) =>
//           item.type === "tooltip" &&
//           selectedText.includes((item.content as TooltipContent).trigger)
//       );

//       // Avoid highlighting text already part of a tooltip
//       if (!isWithinTooltip) {
//         setHighlightedText(selectedText);
//       } else {
//         setHighlightedText("");
//       }
//     } else {
//       setHighlightedText("");
//     }
//   };

//   const addTooltip = () => {
//     if (highlightedText) {
//       const selection = window.getSelection();
//       if (!selection || !selection.anchorNode || !selection.anchorNode.textContent) return;

//       const parentText = selection.anchorNode.textContent;
//       const start = parentText.indexOf(highlightedText);
//       const end = start + highlightedText.length;

//       if (start === -1) return;

//       const updatedState: TextContent[] = [];
//       let isUpdated = false;

//       textTooltipTextState.forEach((item) => {
//         if (isUpdated || item.type !== "basic" || !item.content.includes(parentText)) {
//           updatedState.push(item);
//         } else {
//           const before = item.content.slice(0, start);
//           const after = item.content.slice(end);

//           if (before) updatedState.push({ content: before, type: "basic" });
//           updatedState.push({
//             content: { trigger: highlightedText, content: "New tooltip content" },
//             type: "tooltip",
//           });
//           if (after) updatedState.push({ content: after, type: "basic" });

//           isUpdated = true;
//         }
//       });

//       setTextTooltipTextState(updatedState);
//       setHighlightedText(""); // Clear after adding
//     }
//   };

//   const handleEditTooltipContent = (index: number, newContent: string) => {
//     setTextTooltipTextState((prevState) => {
//       const updatedState = [...prevState];
//       if (updatedState[index].type === "tooltip") {
//         updatedState[index] = {
//           ...updatedState[index],
//           content: {
//             ...updatedState[index].content as TooltipContent,
//             content: newContent,
//           },
//         };
//       }
//       return updatedState;
//     });
//   };

//   useEffect(() => {
//     document.addEventListener("mouseup", handleHighlight);
//     return () => document.removeEventListener("mouseup", handleHighlight);
//   }, []);

//   return (
//     <div className="w-full p-3 rounded space-y-2 relative border">
//       { JSON.stringify( textTooltipTextState ) }
//       {/* Show Convert Button Only If Text is Highlighted */}
//       {!displayOnly && highlightedText && (
//         <Button
//           type="button"
//           variant={'outline'}
//           onClick={(e) => {
//             e.preventDefault(); // Prevent any default action
//             addTooltip();
//           }}
//           className="absolute top-2 right-2 border text-sm text-black px-3 py-2 rounded"
//         >
//           Convert to Tooltip
//         </Button>
//       )}

//       {/* Editable Area */}
//       <div
//         contentEditable={!displayOnly}
//         suppressContentEditableWarning={true}
//         className={`border border-transparent rounded p-3 focus:outline-none ${
//           displayOnly ? "bg-gray-100 cursor-not-allowed" : ""
//         }`}
//       >
//         {textTooltipTextState.map((item, index) =>
//           item.type === "basic" ? (
//             <span key={index}>{item.content} </span>
//           ) : (
//             <Tooltip key={index}>
//               <TooltipTrigger asChild>
//                 <span
//                   className={`bg-gray-100 text-black rounded-md p-1.5 ${
//                     displayOnly ? "cursor-not-allowed" : "cursor-pointer"
//                   }`}
//                 >
//                   {(item.content as TooltipContent).trigger}
//                 </span>
//               </TooltipTrigger>
//               <TooltipContent
//                 contentEditable={false}
//                 className="outline-none caret-transparent"
//                 onMouseLeave={() => !displayOnly && setEditingTooltipIndex(null)}
//               >
//                 {editingTooltipIndex === index && !displayOnly ? (
//                   <textarea
//                     value={(item.content as TooltipContent).content}
//                     onChange={(e) =>
//                       handleEditTooltipContent(index, e.target.value)
//                     }
//                     onBlur={() => setEditingTooltipIndex(null)} // Save and exit edit mode on blur
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         e.preventDefault();
//                         setEditingTooltipIndex(null); // Save and exit on Enter
//                       }
//                     }}
//                     className="w-full border p-2 rounded focus:outline-none caret-black"
//                   />
//                 ) : (
//                   <p
//                     onClick={() => !displayOnly && setEditingTooltipIndex(index)}
//                     className={`${
//                       displayOnly ? "cursor-not-allowed" : "cursor-pointer"
//                     }`}
//                   >
//                     {(item.content as TooltipContent).content}
//                   </p>
//                 )}
//               </TooltipContent>
//             </Tooltip>
//           )
//         )}
//       </div>
//     </div>
//   );
// };
