import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function OverViewTabContent() {
  return (
    <div className="space-y-4 mt-5">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Personal Note */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle> My Personal Note</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              "James has been incredibly dedicated to learning JavaScript. They struggled with callbacks earlier in the bootcamp, but their persistence has really paid off. I'm impressed with their improvement in problem-solving and teamwork."
            </p>
          </CardContent>
        </Card>

        {/* Their Summary */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Their Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">
              "This week has been a mix of challenges and breakthroughs for me. I finally wrapped my head around React state management, and it feels great to see my projects come to life. Debugging was tough at first, but I'm learning to trust the process.
            </p>
            <p className="mt-2 text-gray-600 leading-relaxed">
              I'm proud of how far I’ve come since struggling with JavaScript basics a few weeks ago. My biggest takeaway this week is realizing how much I enjoy building interactive UIs. I can’t wait to tackle more complex components and dive deeper into APIs next week!"
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Last time on the bootcamp: <strong>2 days ago</strong></li>
            <li>Topics interacted with: <strong>React Basics, State Management, APIs</strong></li>
            <li>Total time spent: <strong>8 hours</strong></li>
            <li>Topics completed: <strong>3 topics (JavaScript Fundamentals, React Basics, APIs)</strong></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
