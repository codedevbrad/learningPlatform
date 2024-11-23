// components/TaughtSection.js

import {
  CodeBracketIcon, AcademicCapIcon, CubeTransparentIcon, GlobeAltIcon, LockClosedIcon, ServerIcon,
} from '@heroicons/react/24/outline'

import IconWrapper from '@/app/reusables/icons/iconDisplay'
import CodeIconReact from '@/app/reusables/icons/langauges/react'
import { CodeIconDB1 } from '@/app/reusables/icons/langauges/db'
import { CodeIconJS1 } from '@/app/reusables/icons/langauges/js'
import { CodeIconTypescript1 } from '@/app/reusables/icons/langauges/ts'


const taught = {
  languages: [
    { name: 'JavaScript', icon: CodeIconJS1 },
    { name: 'TypeScript', icon: CodeIconTypescript1 },
    { name: 'TailwindCSS', icon: CubeTransparentIcon },
    { name: 'ReactJS', icon: CodeIconReact },
    { name: 'Python', icon: AcademicCapIcon },
    { name: 'Django', icon: ServerIcon },
    { name: 'Databases', icon: CodeIconDB1 },
    { name: 'Prisma', icon: GlobeAltIcon },
    { name: 'Authentication', icon: LockClosedIcon },
  ],
  concepts: [
    { name: 'Frontend Development', icon: CodeBracketIcon },
    { name: 'Backend Development', icon: ServerIcon },
    { name: 'Fullstack Development', icon: GlobeAltIcon },
    { name: 'MERN Stack', icon: CodeBracketIcon },
    { name: 'Authentication Systems', icon: LockClosedIcon },
  ],
};

export default function TaughtSection() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">What We Teach</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Decide your learning journey using our concept and topic paths.
        </p>
      </div>

      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        {/* Languages Section */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-900">Languages Taught</h3>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {taught.languages.map(({ name, icon: Icon }, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 shadow-2xl">
                  <IconWrapper IconComponent={ Icon } size="small" className="text-white" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">{name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Concepts Section */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-gray-900">Key Concepts</h3>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {taught.concepts.map(({ name, icon: Icon }, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 shadow-2xl">
                  <IconWrapper IconComponent={ Icon } size="small" className="text-white" />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}