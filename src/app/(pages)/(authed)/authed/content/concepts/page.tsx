
 'use server'
import Title from "@/app/reusables/content/title"
import { getAllConcepts } from "@/db_queries/concepts/student.queries"
import TopicsPushSheetRender from "./client.topicDisplay"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


export default async function ConceptsPage() {
  const concepts = await getAllConcepts();
  return (
    <div className="w-3/4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8"> Explore Concepts </h1>
      <div className="grid gap-8 md:grid-cols-3">
        {concepts.map((concept) => (
          <Card key={concept.id} className="flex flex-col overflow-hidden">
            <CardHeader className="bg-gradient-to-tr from-white via-blue-100 50% to-blue-200">
              <div className="flex items-center gap-4">       
                <div>
                  <CardTitle className="text-2xl text-gray-800">{concept.title}</CardTitle>
                  <CardDescription className="text-gray-600">{concept.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 my-4">
                {concept.categories.map((category, index) => (
                  <Badge key={index} variant="secondary">{category.name}</Badge>
                ))}
              </div>
              <div className="space-y-4">
                {concept.topics.map((topic, index ) => (
                  <div key={ index }>
                    <Link href={`/authed/content/concepts/${topic.id}`} key={topic.id} className="">
                      <h3 className="font-semibold mb-1 text-gray-800">{topic.title}</h3>
                      <p className="text-sm text-gray-600">{topic.description}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-4">
              <Button className="w-full" variant="outline">Explore All Topics </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}