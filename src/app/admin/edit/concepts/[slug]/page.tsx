'use client'
// Import necessary dependencies and functions
import Link from "next/link"
import { useState, useEffect } from "react"
import { action_getTopicById } from "../actions"


const choices = [
  { name: 'code' , component: '' },
  { name: 'challenge' , component: '' },
  { name: 'quiz' , component: '' },
  { name: 'task' , component: '' },
  { name: 'explanation' , component: '' },
  { name: 'video' , component: '' },
  { name: 'codeSandbox' , component: '' }
];

export default function EditCoursesPage({ params }: { params: { slug: string } }) { 

  const [courseData, setCourseData] = useState<any[]>([]); // Assuming courseData is an array of any type

  // Define a function to fetch topic data
  const fetchTopicData = async (topicId: string) => {
    try {
      const topic = await action_getTopicById(topicId);
      setCourseData([topic]); // Assuming you want to store topic data in courseData array
    } catch (error) {
      console.error('Failed to fetch topic data:', error);
    }
  };

  // UseEffect hook to fetch topic data when component mounts
  useEffect(() => {
    const topicId = params.slug; // Replace 'your_topic_id' with the actual topic ID
    fetchTopicData(topicId);
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-gray-100">
        <ul>
          {choices.map(choice => (
            <li key={choice.name}>{choice.name}</li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4"> 
        {/* Render topic content */}
        {courseData.map(topic => (
          <div key={topic.id}>
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            {/* Render other topic details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}
