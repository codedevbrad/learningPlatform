'use client';
import React, { useState } from "react"
import Heart from "react-animated-heart"
import Link from "next/link"
import { CourseType } from "@/../prisma/schema.types"


function HeartIcon () {
  const [isClick, setClick] = useState(false);
  return (
    <div className="App">
      <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
    </div>
  );
}


interface CoursesUIProps {
  courses: CourseType[];
}

export default function CoursesUI({ courses }: CoursesUIProps) {
  const [coursesData, updateCourses] = useState<CourseType[]>(courses);

  return (
    <div className="">
      {coursesData.map((course, index) => (
        
        <div key={index} className="flex flex-row mb-6 bg-white p-4 rounded-xl">
          <img src={course.imgUrl} alt={course.name} className="w-29 h-24 mr-4 rounded-xl" />

          <div className="flex flex-col flex-1">
            <h2 className="text-xl font-semibold">
              {course.name}
              {course.categories.map((category, catIndex) => (
                <span key={catIndex} className="mx-2 border border-grey-200 rounded-lg p-1 px-2 font-normal text-sm">
                  {category.name}
                </span>
              ))}
            </h2>
            <p className="text-gray-700 mt-2">{course.description}</p>
            <div className="flex flex-row my-2">
              {course.languages.map((language, langIndex) => (
                <span key={langIndex} className="mr-3 border border-grey-200 rounded-lg p-1 px-2 text-sm">
                  {language.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <HeartIcon />
          </div>
          <div className="flex items-center justify-end">
            <Link href={`course/${course.id}`} className="bg-blue-800 p-3 px-5 text-white rounded-md">
              View course
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}