import Title from "@/app/reusables/content/title"

import ChartTopics from "./charts/topics"
import ChartUsers from "./charts/users"

export default async function CoursesPage() {
    return (
      <main className="flex flex-col">
        <Title title="Dashboard" variant="heading" />
        <div className="grid grid-cols-3 gap-3 p-4">
          <ChartTopics size="full" />
          <ChartTopics size="half" />
          <ChartUsers  />
          <ChartTopics />
          <ChartTopics />
          <ChartTopics />
        </div>
      </main>
    )
  }
  