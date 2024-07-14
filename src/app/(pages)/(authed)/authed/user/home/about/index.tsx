'use server'
import Title from "@/app/reusables/content/title"
import { action__getUserData } from "../actions"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

async function AboutSection ( { bio = '' }) {   
   return (
      <div className="">
          <Title title="About you 👍" variant="subheading1" noMargin={false} />
          <p className="leading-8">
                { bio }
          </p>
       </div>
   )
}


async function AboutQuestionsAnswered ({ questions = []}) {
    return (
        <div className="flex flex-col mt-5">
            <Title title="What you're looking for 👍" variant="subheading1" noMargin={false} />
            <Accordion type="single" collapsible className="">
                    {questions.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
            </Accordion>
        </div>
    );
}


export default async function AboutUser ( ) { 
    let userData = await action__getUserData();

    return (
        <div className="p-5">
          <div className="flex flex-col">
              <AboutSection bio={ userData?.bio } />
              <AboutQuestionsAnswered questions={ userData?.questions } />
          </div>
        </div>
    )
}