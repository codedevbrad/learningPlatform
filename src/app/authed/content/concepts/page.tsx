import Title from "@/app/reusables/content/title"
import Link from "next/link"
import { getAllConcepts } from "@/db_queries/concepts/student.queries"

// The web development learning path object
const webDevLearningPath = {
  areas: [
    {
      title: "Front-End Development",
      id: "djdkckrmdd",
      topics: [
        { name: "HTML", description: "Learn the structure of web pages with HTML." , level: 1 },
        { name: "CSS", description: "Style your web pages using CSS.", level: 1 },
        { name: "JavaScript", description: "Add interactivity to your web pages with JavaScript.", level: 2  },
        { name: "Frameworks", 
          description: "Explore frameworks like React, Angular, or Vue.js for efficient front-end development." ,
          level: 3
        }
      ]
    },
    {
      title: "Server-Side Development",
      id: "djrrkdddkddsosoos",
      topics: [
        { name: "Node.js", description: "Use JavaScript on the server with Node.js.", level: 4 },
        { name: "Express.js", description: "Learn about Express.js for routing and middleware.", level: 3 },
        { name: "API Development", description: "Design and implement APIs to serve data." , level: 3 },
        { 
          name: "Environment Configuration", 
          description: "Manage development environments with tools like Docker.", 
          level: 4 
        }
      ]
    },
    {
      title: "Full-Stack Development",
      id: "sksksxsssssslss",
      topics: [
        { name: "MERN Stack", description: "Master the combination of MongoDB, Express, React, and Node.js.", level: 4 },
        { name: "MEVN Stack", description: "Learn about MongoDB, Express, Vue.js, and Node.js as a stack.", level: 4 },
        { 
          name: "Full-Stack Tools", 
          description: "Explore tools for full-stack development, including CI/CD, testing, and debugging techniques.", 
          level: 4
        }
      ]
    },
    {
      title: "Authentication",
      id: "eoeekdemskeods",
      topics: [
        { name: "OAuth", description: "Implement OAuth for third-party authentication.", level: 4 },
        { name: "JWT", description: "Secure your applications with JSON Web Tokens (JWT).", level: 3 },
        { name: "Session Management", description: "Understand sessions and cookies for maintaining user state.", level: 4 }
      ]
    },
    {
      title: "Database",
      id: "ddldlddkdleesadff",
      topics: [
        { name: "SQL Databases", description: "Learn about relational databases like PostgreSQL and MySQL." , level: 2 },
        { name: "NoSQL Databases", description: "Explore NoSQL databases such as MongoDB and Cassandra.", level: 2 },
        { name: "ORMs", description: "Utilize Object-Relational Mapping tools to interact with databases more efficiently.", level: 3 }
      ]
    }
  ]
};

// React component to render the learning path ...
const ConceptsRender = async () => {

  const concepts = await getAllConcepts();
  console.log( 'concepts: ', concepts );

  return (
    <div className="w-full flex flex-wrap -m-2"> {/* Negative margin for gutters */}
      { concepts.map((area, index) => (
        <div key={index} className="p-2 w-1/3"> {/* Padding for gutters and width for 3 items per row */}
          <div className="flex items-start p-2">
            {/* Adjust height, background, and content as needed */}
            <div>
              <Title title={ area.title } variant="subheading2" />
              <ul>
                { area.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="p-3 border border-gray-200 rounded-lg my-4">
                    <Link href={`/authed/content/concepts/${ area.id }`} className="text-md">
                        { topic.title }: { topic.description }  
                    </Link>
                  </li>
                )) }
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default function ConceptsPage ( ) {
    return (
        <main className="flex flex-col items-center p-4">
            <Title title="Concepts" variant="heading" />
            <div className="my-6 w-full">
                <ConceptsRender />
            </div>
        </main>
    )
}