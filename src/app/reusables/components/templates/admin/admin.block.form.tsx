import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Title from "../../../content/title"
import ButtonSaving from "@/app/reusables/themes/saveButton"

interface AdminBlockTemplateProps {
    title: string;
    description: string;
    form: React.ReactNode;
    savedData: React.ReactNode;
    formRef: any;
    isSaved: boolean;
}
  
const AdminBlockTemplate: React.FC<AdminBlockTemplateProps> = ({ title, form, savedData, formRef , isSaved }) => {

    const triggerFormSubmit = () => {
      console.log( formRef.current )
      if (formRef.current) {
        console.log('submit');
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    };
    
    return (

      <div className="border border-gray-200 rounded-lg p-5">
          <div className="flex flex-row">
              <div className="w-full">
                  <Title title={ `${ title } block` } variant="subheading1" />
              </div>
              <div onClick={ triggerFormSubmit }>
                  <ButtonSaving isSaved={ isSaved } />
              </div>
            
          </div>

          <Tabs defaultValue="form" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <Card className="border-none">
                {form}
              </Card>
            </TabsContent>
            <TabsContent value="preview">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>View the saved data below.</CardDescription>
                </CardHeader>
                <CardContent>
                  {savedData}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
      </div>
    );
  };

  export default AdminBlockTemplate;