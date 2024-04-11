'use client';
import React, { useState } from "react";
import { Course } from "../types";
import CourseComponent from "./courseListItem";

export default function CoursesUI() {
    const [courses, updateCourses] = useState<Course[]>([
        {
            courseId: 1,
            title: "Introduction to React",
            description: "Learn the fundamentals of React, including components, state, and props.",
            imageUrl: "https://via.placeholder.com/150",
            categoryTags: ["JavaScript", "ReactJs"],
            belongsTo: 'Frontend'
        },
        {
            courseId: 2,
            title: "Advanced React",
            description: "Dive deeper into React with hooks, context API, and advanced patterns.",
            imageUrl: "https://via.placeholder.com/150",
            categoryTags: ["JavaScript", "ReactJs", "Advanced"],
            belongsTo: 'Frontend'
        },
        {
            courseId: 3,
            title: "Full Stack Development with Node.js",
            description: "Become a full stack developer by learning how to build backend services with Node.js.",
            imageUrl: "https://via.placeholder.com/150",
            categoryTags: ["JavaScript", "Node.js"],
            belongsTo: 'Full Stack'
        },
    ]);
    
    return (
        <div className="">
            {courses.map((course) => (
                <CourseComponent course={ course } />
            ))}
        </div>
    );
}