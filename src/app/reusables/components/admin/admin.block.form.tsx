import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card";
import Title from "../../content/title";

interface AdminBlockTemplateProps {
    title: string;
    description: string;
    form: React.ReactNode;
    savedData: React.ReactNode;
}
  
  
const AdminBlockTemplate: React.FC<AdminBlockTemplateProps> = ({ title, description, form, savedData }) => {
    return (
      <div className="border border-gray-200 rounded-lg p-5">
          <Title title={ `${ title } block` } variant="subheading1" />
          <Tabs defaultValue="form" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="form">
              <Card className="border-none">
                <CardHeader>
                  <CardTitle> Fill Out the {title} form </CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
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