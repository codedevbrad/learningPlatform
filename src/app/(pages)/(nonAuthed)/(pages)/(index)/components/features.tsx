// components/FeatureSection.js
import { CodeBracketIcon, AcademicCapIcon, PresentationChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Hands-on Projects',
    description:
      'Gain practical experience by working on real-world projects that simulate professional coding scenarios.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Expert Instructors',
    description:
      'Learn from industry experts with years of experience in software development and teaching.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Career Support',
    description:
      'Receive personalized career support including resume building, interview preparation, and job placement assistance.',
    icon: PresentationChartBarIcon,
  },
  {
    name: 'Collaborative Learning',
    description:
      'Engage in a collaborative learning environment where you can share knowledge and grow with your peers.',
    icon: UserGroupIcon,
  },
];

export default function FeatureSection() {
  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Why Choose Us?</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Transform Your Career with Our Coding Bootcamp
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Our comprehensive bootcamp provides everything you need to succeed in a career in tech. From hands-on projects to expert guidance, we have you covered.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}