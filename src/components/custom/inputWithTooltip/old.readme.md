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
