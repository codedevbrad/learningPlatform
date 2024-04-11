'use client';
import React, { useState } from "react";
import { Course } from "../types";
import Link from "next/link";

// Props interface for the CourseComponent
interface CourseComponentProps {
  course: Course;
}

// CourseComponent functional component
const CourseComponent: React.FC<CourseComponentProps> = ({ course }) => {
  return (
    <div className="flex flex-row mb-6 bg-white p-4 rounded-xl">
      <img src={course.imageUrl} alt={course.title} className="w-24 h-24 mr-4 rounded-xl" />

      <div>
        <h2 className="text-xl font-semibold">{course.title} <span className="text-gray-600 text-sm border-gray-300 border rounded-full px-4 py-1 ml-1"> {course.belongsTo} </span> </h2>
        
        <p className="text-gray-700 mt-2">{course.description}</p>
        
        <div className="flex flex-wrap mt-2">
          {course.categoryTags.map((category, index) => (
            <div key={index} className="border border-gray-300 rounded-full py-1 mr-3 mb-2 px-3 text-sm">
              {category}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end items-center flex-grow">
          <div className="bg-purple-800 p-4 shadow-lg rounded-xl">
            <Link href={ `course/${ course.courseId }`} className="text-white"> 
                View course
            </Link>
          </div>
      </div>
    </div>
  );
};

export default CourseComponent;
