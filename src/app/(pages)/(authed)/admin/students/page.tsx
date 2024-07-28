'use server'
import Title from "@/app/reusables/content/title"
import { Card } from "@/components/ui/card"

export default async function StudentsPage() {
    return (
        <div className="flex w-full justify-center items-center">  
            <Card className="w-[500px] p-6 px-9">
                <Title title="Keep track of your students" variant="heading" noMargin={false} />
                <p className="leading-8 text-sm">
                    Monitor your students' progress and engagement by viewing detailed profiles. 
                    Stay connected with students by viewing and managing their messages. 
                    Additionally, access a comprehensive list of all sessions, 
                    including past and upcoming ones, to ensure a seamless and 
                    organized learning experience.
                </p>
            </Card>
        </div>
    );
}
