
// ** explanation ** //

{
    content: 
    `Learning React, a popular JavaScript library for building user interfaces, 
    offers a powerful way to create dynamic and responsive web applications. 
    #React emphasizes a component-based architecture, 
    enabling developers to encapsulate individual parts of their project
    into self-contained modules that manage their own state, 
    leading to more manageable and reusable code. It utilizes 
    a virtual DOM to efficiently update the user interface, 
    ensuring optimal performance and a smooth user experience. 
    React's extensive ecosystem, including tools like Redux for state management 
    and React Router for navigation, provides developers with a comprehensive 
    suite of options for building complex, feature-rich applications. 
    With its strong community support and a wealth of resources and tutorials 
    available, learning React opens up vast opportunities for developers 
    in the web development landscape.`,
    type: 'explanation',
    title: 'Understand how react works'
},

// ** task ** //

{
    type: 'task',
    title: 'Build a realtime chat app.',
    content: {
        description: `
        The goal of this project is to build a real-time chat application using Node.js. 
        This application will allow users to communicate with each other in real-time, 
        join different chat rooms, and send direct messages. The app will be built using 
        Node.js for the backend, with Socket.IO to enable real-time, bidirectional 
        communication between web clients and servers. For the frontend, you can use 
        HTML/CSS along with a JavaScript framework like React or Vue.js 
        for a dynamic user interface.
        `,
        tasks: [
                {
                    title: "Setup Node.js Environment",
                    explanation: "Initialize a new Node.js project by creating a package.json file. Install necessary packages such as 'express' for building the server and 'socket.io' for enabling real-time communication between clients and the server."
                },
                {
                    title: "Create the Server",
                    explanation: "Develop a basic server using Express. This server should be capable of handling HTTP requests. Integrate Socket.IO into the server to manage real-time communication across clients."
                },
                {
                    title: "Design the Frontend",
                    explanation: "Design a simple yet user-friendly interface for the chat application. This design should include a login screen for user authentication, chat rooms for group discussions, and a chat interface for sending and receiving messages."
                },
                {
                    title: "Implement Chat Rooms",
                    explanation: "Allow users to create and join chat rooms. Each chat room should support multiple users"
                }
        ],
        tips: [
            {
                title: "Start Simple",
                explanation: "Initiate the project with a straightforward implementation focused on the core functionality of sending and receiving messages in real-time. Expand and add more complex features gradually, ensuring a strong foundation is built first."
            },
            {
                title: "Use Socket.IO Rooms",
                explanation: "Utilize the rooms feature in Socket.IO to efficiently manage different chat rooms. This feature helps in organizing users and messages into separate spaces, making it easier to scale and maintain the chat application."
            },
            {
                title: "Focus on User Experience",
                explanation: "Design the user interface to be clean and intuitive, prioritizing ease of use. Incorporate real-time feedback mechanisms, such as showing when another user is typing, to enhance the overall user experience and interaction within the chat."
            },
            {
                title: "Secure the Application",
                explanation: "Implement security measures to protect the application and its users"
            }
        ]
    }
},

// ** quiz ** //

{
    type: 'quiz',
    title: 'React.js Quiz',
    quizData: [
        {
        title: 'Question 1',
        content: {
            question: 'What is React?',
            options: [
            'A server-side framework',
            'A database',
            'A client-side library',
            'A programming language'
            ],
            answerIndex: 2
        }
        },
        {
        title: 'Question 2',
        content: {
            question: 'What is JSX?',
            options: [
            'A function',
            'A custom HTML language',
            'A syntax extension for JavaScript',
            'A state management tool'
            ],
            answerIndex: 2
        }
        },
        {
        title: 'Question 3',
        content: {
            question: 'What can you use to handle state in a React component?',
            options: [
            'setState',
            'useState',
            'Both setState and useState',
            'State is immutable'
            ],
            answerIndex: 2
        }
        },
        {
        title: 'Question 4',
        content: {
            question: 'Which hook is used to perform side effects in function components?',
            options: [
            'useEffect',
            'useSideEffect',
            'useReducer',
            'useContext'
            ],
            answerIndex: 0
        }
        },
        {
        title: 'Question 5',
        content: {
            question: 'Where should you make API calls in a React component?',
            options: [
            'Constructor',
            'componentDidMount',
            'render',
            'useEffect'
            ],
            answerIndex: 3
        }
        }
    ]
},


// ** challenge ** //

{
    type: 'challenge',
    content: [
        { 
            title: 'How to add components', showcase: 'something'
        }
    ]
}