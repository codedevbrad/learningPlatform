import Link from "next/link"
import { useState, useEffect } from "react"
import { action_getTopicById } from "../../actions"
import ExplanationAdminBlock from "@/app/reusables/components/blocks/explanation/explanation.admin"

const choices = [
    { name: 'code' , component: '' },
    { name: 'challenge' , component: '' },
    { name: 'quiz' , component: '' },
    { name: 'task' , component: '' },
    { name: 'explanation' , component: '' },
    { name: 'video' , component: '' },
    { name: 'codeSandbox' , component: '' }
  ];
  

export default function EditDataComponent({ id } : { id : string }) { 
  
    const [conceptData, setConceptData] = useState<any>({}); // Assuming courseData is an array of any type
    const [ data , setData ] = useState([]);
  
    // Define a function to fetch topic data.
    const fetchTopicData = async (topicId: string) => {
      try {
        const topic = await action_getTopicById(topicId);
        setConceptData(topic); 
        setData( topic?.data )
      } catch (error) {
        console.error('Failed to fetch topic data:', error);
      }
    };
  
    // UseEffect hook to fetch topic data when component mounts
    useEffect(() => {
      fetchTopicData( id );
    }, []); // Empty dependency array ensures useEffect runs only once when component mounts
  
    return (
      <div className="flex flex-col">
        { JSON.stringify( data ) } 
        <div className="flex-1 p-4"> 
            <div key={conceptData.id}>
              <h2>{conceptData.title}</h2>
              <p>{conceptData.description}</p>
            </div>
        </div>
        <div>
            <ExplanationAdminBlock />
        </div>
      </div>
    );
}