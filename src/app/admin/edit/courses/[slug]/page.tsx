'use client'
import Link from "next/link"
import { useState } from "react"

const choices = [
  { name: 'code' , component: '' },
  { name: 'challenge' , component: '' },
  { name: 'quiz' , component: '' },
  { name: 'task' , component: '' },
  { name: 'explanation' , component: '' },
  { name: 'video' , component: '' },
  { name: 'codeSandbox' , component: '' }
]

export default function EditCoursesPage () {
  const [ courseData , changeCourseData ] = useState([]);

  return (
    <div className="flex">
      <div className="w-1/4 p-4 bg-gray-100" > {/* Sidebar */}
        <ul>
            { choices.map( ( choice ) =>
                <li> { choice.name } </li>
            )}
        </ul>
      </div>
      <div className="flex-1 p-4"> 
            course content
      </div>
    </div>
  )
}
