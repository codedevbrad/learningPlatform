
 {
    "id": "some_concept_id_1",
    "title": "Concept Title 1",
    "description": "Description for Concept 1",
    "topics": [
      {
        "id": "some_topic_id_1",
        "title": "Topic Title 1",
        "description": "Description for Topic 1",
        "data": [ /* JSON data for Topic 1 */ ],
        "conceptId": "some_concept_id_1"
      },
    ],
    "imgUrl": "https://example.com/image1.jpg",
    "data": [ /* JSON data for Concept 1 */ ],
    "resources": [ /* JSON resources for Concept 1 */ ],
    "categories": [ /* CategoryConcept relationships for Concept 1 */ ],
    "languages": [ /* LanguagesConcept relationships for Concept 1 */ ],
    "userDataOnCourse": {
      /* UserDataForConcept object for Concept 1, if any */
    },
    "active": true
  },


// old
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