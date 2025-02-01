// components/LearningSection.js
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import QuizDemonstration from "@/app/reusables/components/blocks/quiz/quiz.example"
import AnimatedCodeChallengeDemonstration from "@/app/reusables/components/blocks/animatedCodeChallenge/index.example";


function MethodologyInteractiveCode ( ) {
    return (
        <TabsContent value="interactive-code-snippets">
        <h3 className="text-lg font-semibold text-gray-900">Interactive Code Snippets</h3>
        <div className="pb-4">
          <p className="mt-2 text-gray-600">
              Dive into live, interactive coding challenges that test your knowledge. 
          </p>
          <p className="mt-2 text-gray-600">
              Take this react challenge here. Our bootcamp is full of challenges like this that take you through
              how well you know concepts and writing code step by step. 
          </p>
        </div>
        <AnimatedCodeChallengeDemonstration />
      </TabsContent>
    )
}


function MethodologyQuiz ( ) {
    return (
        <TabsContent value="quizzes">
            <h3 className="text-lg font-semibold text-gray-900">Quizzes</h3>
            <p className="mt-2 text-gray-600">
                Test your knowledge with engaging quizzes designed to reinforce learning objectives.
            </p>
            <QuizDemonstration languageChosen={'reactJs'} />
        </TabsContent>
    )
}

function MethodologyTasks ( ) {
    return (
        <TabsContent value="tasks">
            <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
            <p className="mt-2 text-gray-600">
            Complete practical tasks to apply your skills in real-world scenarios.
            </p>
        </TabsContent>
    )
}

function MethodologyVideo ( ) {
    return (
        <TabsContent value="videos">
            <h3 className="text-lg font-semibold text-gray-900">Videos</h3>
            <p className="mt-2 text-gray-600">
            Watch high-quality, instructor-led videos that break down complex topics into digestible lessons.
            </p>
        </TabsContent>
    )
}


export default function LearningSection() {
  return (
    <div className="mx-auto max-w-7xl px-6">
        
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">How You'll Learn</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          A dynamic approach to mastering tech skills.
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Our learning methodology combines interactive tools and hands-on tasks to ensure a comprehensive learning experience.
        </p>
      </div>

      <div className="mx-auto flex-col flex max-w-4xl gap-6 items-center">

        <h2 className="text-base font-semibold leading-7 text-indigo-600 my-4"> 
            What you can expect 
        </h2>
      
        <Tabs className="flex flex-1 space-x-5" defaultValue="interactive-code-snippets">
          {/* Tabs list (vertical on the left) */}
          <TabsList className="flex flex-col rounded-lg h-full items-start p-5 space-y-4">
            <TabsTrigger value="interactive-code-snippets" className="py-2 px-4">
              Interactive Code Snippets
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="py-2 px-4">
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="tasks" className="py-2 px-4">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="videos" className="py-2 px-4">
              Videos
            </TabsTrigger>
          </TabsList>

          {/* Tabs content */}
          <div className="flex-1 space-y-4 p-6 border border-gray-200 rounded-lg">

            <MethodologyInteractiveCode />
            <MethodologyQuiz />
            <MethodologyTasks />
            <MethodologyVideo /> 
          </div>
        </Tabs>
      </div>
    </div>
  );
}