import Title from "@/app/reusables/content/title"
import React from 'react';

// The web development learning path object
const webDevLearningPath = {
  areas: [
    {
      title: "Front-End Development",
      topics: [
        { name: "HTML", description: "Learn the structure of web pages with HTML." },
        { name: "CSS", description: "Style your web pages using CSS." },
        { name: "JavaScript", description: "Add interactivity to your web pages with JavaScript." },
        { name: "Frameworks", description: "Explore frameworks like React, Angular, or Vue.js for efficient front-end development." }
      ]
    },
    {
      title: "Server-Side Development",
      topics: [
        { name: "Node.js", description: "Use JavaScript on the server with Node.js." },
        { name: "Express.js", description: "Learn about Express.js for routing and middleware." },
        { name: "API Development", description: "Design and implement APIs to serve data." },
        { name: "Environment Configuration", description: "Manage development environments with tools like Docker." }
      ]
    },
    {
      title: "Full-Stack Development",
      topics: [
        { name: "MERN Stack", description: "Master the combination of MongoDB, Express, React, and Node.js." },
        { name: "MEVN Stack", description: "Learn about MongoDB, Express, Vue.js, and Node.js as a stack." },
        { name: "Full-Stack Tools", description: "Explore tools for full-stack development, including CI/CD, testing, and debugging techniques." }
      ]
    },
    {
      title: "Authentication",
      topics: [
        { name: "OAuth", description: "Implement OAuth for third-party authentication." },
        { name: "JWT", description: "Secure your applications with JSON Web Tokens (JWT)." },
        { name: "Session Management", description: "Understand sessions and cookies for maintaining user state." }
      ]
    },
    {
      title: "Database",
      topics: [
        { name: "SQL Databases", description: "Learn about relational databases like PostgreSQL and MySQL." },
        { name: "NoSQL Databases", description: "Explore NoSQL databases such as MongoDB and Cassandra." },
        { name: "ORMs", description: "Utilize Object-Relational Mapping tools to interact with databases more efficiently." }
      ]
    }
  ]
};

// React component to render the learning path
const FlexGrid = () => {
  return (
    <div className="w-full flex flex-wrap -m-2"> {/* Negative margin for gutters */}
      {webDevLearningPath.areas.map((area, index) => (
        <div key={index} className="p-2 w-1/3"> {/* Padding for gutters and width for 3 items per row */}
          <div className="flex items-start p-2">
            {/* Adjust height, background, and content as needed */}
            <div>
              <Title title={ area.title } variant="subheading2" />
              <ul>
                {area.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="my-3">
                    { topic.name }: { topic.description } 
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default function CoursesPage ( ) {
    return (
        <main className="flex flex-col items-center p-4">
            <Title title="Concepts" variant="heading" />
            <div className="my-6 w-full">
                <FlexGrid />
            </div>
        </main>
    )
}