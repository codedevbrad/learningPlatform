import { Card } from "@/components/ui/card"
import ResourceComponent from "@/app/reusables/components/resources"
import Title from "@/app/reusables/content/title"

export default async function Learn ( ) {
    return (
        <Card className="p-5 mt-4">
                <Title title="Learn" variant="subheading1" noMargin={false} /> 
                <p> Take videos and journal your learning </p>
                <ResourceComponent resource={{
                    title: 'Title', 
                    description: 'desc', 
                    url: 'https://youtube.com', 
                    imgUrl: 'https://images.unsplash.com/photo-1726697187202-c1c33efd40d6?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }} />
        </Card>
    )
}