
/**
 * AdminBlockTemplate is a flexible admin interface component that provides a structured layout for managing and editing a block of data.
 * It offers three main views: a form to edit data, a preview of the saved data, and a raw object view displaying the underlying data.
 * 
 * This component allows users to toggle fullscreen mode, submit the form, and optionally remove the block. It integrates with external form
 * and saved data passed as props and maintains the full-screen state and the current state of saved data.
**/

import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Title from "../../../content/title"
import ButtonSaving from "@/components/custom/buttons/button.form"
import { buttonVariants } from "@/components/ui/button"
import TrashIcon from "@/app/reusables/icons/random/trash"
import ResizeIcon from "@/app/reusables/icons/random/resize"

interface AdminToolUpdateDataBlockProps {
  type: "new" | "update" | "delete"; // Restrict the type to specific string literals
  blockData: any;
  blockIndex: number;
}

interface AdminToolsProps {
  updateDataBlock: (update: AdminToolUpdateDataBlockProps) => void;
}


interface HandleSubmitParams<T> {
  event: React.FormEvent<HTMLFormElement>;
  formData: T | null;
  setSavedData: React.Dispatch<React.SetStateAction<T | null>>;
  adminTools: AdminToolsProps; // Use the AdminToolsProps type here
  blockIndex: number;
}

export const handleSubmitUtility = <T,>({
  event,
  formData,
  setSavedData,
  adminTools,
  blockIndex,
}: HandleSubmitParams<T>) => {
  event.preventDefault();

  const result: { success: boolean; message: string } = { success: false, message: '' };

  try {
    // Perform the save/update logic here
    if (formData) {
      setSavedData(formData);
      adminTools.updateDataBlock({ type: "update", blockData: formData, blockIndex });

      result.success = true;
      result.message = 'Data saved successfully!';
    } else {
      throw new Error('Form data is null');
    }
  } catch (error) {
    result.success = false;
    result.message = 'An error occurred during saving.';
  }

  // Check for the callback passed via event detail
  const nativeEvent = event.nativeEvent as CustomEvent;
  if (nativeEvent.detail?.callback) {
    nativeEvent.detail.callback(result); // Pass the result back through the callback
  }
};


interface AdminBlockTemplateProps {
  title: string;
  description: string;
  form: React.ReactNode;
  savedData: React.ReactNode;
  formRef: any;
  isSaved: boolean; 
  removeItem?: () => void | null;
}

const AdminBlockTemplate: React.FC<AdminBlockTemplateProps> = ({ title, form, savedData, formRef, isSaved, removeItem = null }) => {
  const [savedDataObject, updateSavedDataObject] = useState(savedData.props.data);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [saveState, updateSaveState] = useState( true );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleFormChange = (newFormData: any) => {
    // Compare new form data with saved data
    console.log('hey dude')
    updateSaveState( false );
    setHasUnsavedChanges( true );
  };

  const triggerFormSubmit = () => {
    if (formRef.current) {
      const event = new CustomEvent('submit', {
        cancelable: true,
        bubbles: true,
        detail: {
          callback: (result: any) => {
            console.log('Form submission result:', result);
            if (result.success) {
              updateSaveState(true);
              setHasUnsavedChanges(false); // Reset unsaved changes
            }
          },
        },
      });
      formRef.current.dispatchEvent(event);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    updateSavedDataObject(savedData.props.data);
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFullScreen, savedData]);

  return (
    <>
      <div className={`border border-gray-200 rounded-lg p-5 ${isFullScreen ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : ''}`}>
        <div className={`bg-white ${isFullScreen ? 'w-full flex flex-col h-full p-5 overflow-hidden rounded-xl' : ''}`}>
          <div className="flex flex-row justify-between items-center mb-5">
            <Title title={`${title} block`} variant="subheading1" noMargin={false} />
            <div className="flex items-center">
              <div onClick={triggerFormSubmit} className="relative">
                <ButtonSaving isSaved={saveState} />    
                { hasUnsavedChanges && <div className="text-red-500 absolute text-nowrap bg-red-50 my-3 bottom-9 p-2 rounded-lg text-sm">
                   You have unsaved changes!
                </div>}
              </div>
          

              {removeItem && (
                <div
                  className={`${buttonVariants({ variant: 'outline' })} ml-4 text-white bg-red-500 hover:bg-red-800 hover:text-white cursor-pointer`}
                  onClick={() => removeItem()}
                >
                  <TrashIcon />
                </div>
              )}
              <div className={`cursor-pointer ml-4 ${buttonVariants({ variant: 'outline' })}`} onClick={toggleFullScreen}>
                <ResizeIcon />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs defaultValue="form" className="px-2 flex flex-col h-full overflow-hidden">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="form">Form</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="raw object">Raw object</TabsTrigger>
              </TabsList>

              <TabsContent value="form" className={`${isFullScreen ? 'py-3 flex-grow overflow-hidden' : ''}`}>
                <Card className="border-none h-full flex-grow">
                  <div className={`${isFullScreen ? 'h-full overflow-y-scroll p-3 my-3' : ''}`}>
                    {/* Pass the handleFormChange callback to the form */}
                    {React.cloneElement(form, { onChange: handleFormChange })}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="preview" className="flex-grow overflow-auto">
                <Card className="border-none h-full">
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription className="py-1">View the saved data below.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-full">{savedData}</CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="raw object" className="flex-grow overflow-auto">
                <Card className="border-none h-full">
                  <CardHeader>
                    <CardTitle>View your block as a raw object.</CardTitle>
                    <CardDescription>This is how it's saved as an object.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-full">
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-auto h-full break-words whitespace-pre-wrap">
                      {JSON.stringify(savedDataObject, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBlockTemplate;


// const AdminBlockTemplate: React.FC<AdminBlockTemplateProps> = ({ title, form, savedData, formRef , isSaved, removeItem = null }) => {

//   const [ savedDataObject , updateSavedDataObject ] = useState( savedData.props.data );
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const triggerFormSubmit = () => {
//     if (formRef.current) {
//       formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
//     }
//   };

//   const toggleFullScreen = () => {
//     setIsFullScreen(!isFullScreen);
//   };

//   useEffect(() => {
//     updateSavedDataObject( savedData.props.data )
//     if (isFullScreen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//   }, [ isFullScreen , savedData ]);

//   return (
//     <>
//     <div className={`border border-gray-200 rounded-lg p-5 ${isFullScreen ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : ''}`}>
//       <div className={`bg-white ${isFullScreen ? 'w-full flex flex-col h-full p-5 overflow-hidden rounded-xl' : ''}`}>
//         <div className="flex flex-row justify-between items-center mb-5">
//           <Title title={`${title} block`} variant="subheading1" noMargin={false} />
//           <div className="flex items-center">
//               <div onClick={ triggerFormSubmit }>
//                    <ButtonSaving isSaved={ isSaved } />
//               </div>
//             { removeItem && 
//               <div className={`${buttonVariants({ variant: 'outline'})} ml-4 text-white bg-red-500 hover:bg-red-800 hover:text-white cursor-pointer`}
//                     onClick={() => removeItem()}>
//                 <TrashIcon />
//               </div>
//             }
//             <div className={`cursor-pointer ml-4 ${buttonVariants({ variant: 'outline'})}`} onClick={toggleFullScreen}>
//               <ResizeIcon />
//             </div>
//           </div>
//         </div>

//         <div className="flex-1  flex flex-col overflow-hidden">
//           <Tabs defaultValue="form" className="px-2 flex flex-col h-full overflow-hidden">

//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="form">       Form        </TabsTrigger>
//               <TabsTrigger value="preview">    Preview     </TabsTrigger>
//               <TabsTrigger value="raw object"> Raw object  </TabsTrigger>
//             </TabsList>

//             <TabsContent value="form" className={`${isFullScreen ? 'py-3 flex-grow overflow-hidden' : ''}`}>
//               <Card className="border-none h-full flex-grow">
//                 <div className={`${isFullScreen ? "h-full overflow-y-scroll p-3 my-3" : '' }`}>
//                   {form}
//                 </div>
//               </Card>
//             </TabsContent>

//             <TabsContent value="preview" className="flex-grow overflow-auto">
//               <Card className="border-none h-full ">
//                 <CardHeader>
//                   <CardTitle>Preview</CardTitle>
//                   <CardDescription className="py-3">
//                      View the saved data below.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="h-full">
//                   {savedData} 
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="raw object" className="flex-grow overflow-auto">
//               <Card className="border-none h-full">
//                 <CardHeader>
//                   <CardTitle> View your block as a raw object. </CardTitle>
//                   <CardDescription> This is how it's saved as an object. </CardDescription>
//                 </CardHeader>
//                 <CardContent className="h-full">
//                   <pre className="bg-gray-100 p-4 rounded-lg overflow-auto h-full break-words whitespace-pre-wrap">
//                     {JSON.stringify(savedDataObject, null, 2)}
//                   </pre>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default AdminBlockTemplate;