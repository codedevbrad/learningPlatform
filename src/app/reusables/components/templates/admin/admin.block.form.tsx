import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Title from "../../../content/title";
import ButtonSaving from "@/app/reusables/themes/saveButton";
import { buttonVariants } from "@/components/ui/button";

const TrashIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" 
        strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  )
}

const ResizeIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
  )
}

interface AdminBlockTemplateProps {
  title: string;
  description: string;
  form: React.ReactNode;
  savedData: React.ReactNode;
  formRef: any;
  isSaved: boolean; 
  removeItem?: () => void | null;
}


const AdminBlockTemplate: React.FC<AdminBlockTemplateProps> = ({ title, form, savedData, formRef , isSaved, removeItem = null }) => {

  const [ savedDataObject , updateSavedDataObject ] = useState( savedData.props.data );
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect( ( ) => {
     console.log( savedData.props.data )
  }, [ savedData ] );

  const triggerFormSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isFullScreen]);

  return (
    <div className={`border border-gray-200 rounded-lg p-5 ${isFullScreen ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : ''}`}>
      <div className={`bg-white ${isFullScreen ? 'w-full flex flex-col h-full p-5 overflow-hidden rounded-xl' : ''}`}>
        <div className="flex flex-row justify-between items-center mb-5">
          <Title title={`${title} block`} variant="subheading1" noMargin={false} />
          <div className="flex items-center">
              <div onClick={ triggerFormSubmit }>
                   <ButtonSaving isSaved={ isSaved } />
              </div>
            { removeItem && 
              <div className={`${buttonVariants({ variant: 'outline'})} ml-4 text-white bg-red-500 hover:bg-red-800 hover:text-white cursor-pointer`}
                    onClick={() => removeItem()}>
                <TrashIcon />
              </div>
            }
            <div className={`cursor-pointer ml-4 ${buttonVariants({ variant: 'outline'})}`} onClick={toggleFullScreen}>
              <ResizeIcon />
            </div>
          </div>
        </div>

        <div className="flex-1  flex flex-col overflow-hidden">
          <Tabs defaultValue="form" className="px-2 flex flex-col h-full overflow-hidden">

            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="form">       Form        </TabsTrigger>
              <TabsTrigger value="preview">    Preview     </TabsTrigger>
              <TabsTrigger value="raw object"> Raw object  </TabsTrigger>
            </TabsList>

            <TabsContent value="form" className={`${isFullScreen ? 'py-3 flex-grow overflow-hidden' : ''}`}>
              <Card className="border-none h-full flex-grow">
                <div className={`${isFullScreen ? "h-full overflow-y-scroll p-3 my-3" : '' }`}>
                  {form}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="flex-grow overflow-auto">
              <Card className="border-none h-full">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription className="py-3">
                     View the saved data below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-full">
                  {savedData} 
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="raw object" className="flex-grow overflow-auto">
                <Card className="border-none h-full">
                    <CardHeader>
                      <CardTitle> View your block as a raw object. </CardTitle>
                      <CardDescription> This is how it's saved as an object. </CardDescription>
                    </CardHeader>
                    <CardContent className="h-full">
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto h-full">
                          {JSON.stringify(savedDataObject, null, 2)}
                        </pre>
                      </CardContent>
                </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminBlockTemplate;