import { ENROLLMENTTYPE } from "@prisma/client"

/**
 * The shape of a single tier plan.
*/

export type Tier = {
  name: string
  id: ENROLLMENTTYPE
  href: string
  priceMonthly: string
  description: string
  features: string[]
  mostPopular: boolean
}

export const tiers : Tier[] = [
    {
      name: 'Free-Tier',
      id: 'FREE' ,
      href: '#',
      priceMonthly: 'Free',
      description: 'The essentials to help you in journney to learning web dev learning.',
      features: [
        'Detailed explanations and help on web dev concepts.', 
        'Currated quizzes, challenges and guides.', 
        'Projects to keep you progressing.', 
        'A basic earning plan for your dev journey.'
      ],
      mostPopular: false,
    },
    {
      name: 'Tutor-led learning',
      id: 'TUTORED',
      href: '#',
      priceMonthly: '£35',
      description: 'Great for a more customised learning plan that allows you gain hands on help from a tutor and be given a more advanced currated learning plan.',
      features: [
        'everthing covered in free-tier.',
        
        '1-1 messaging with your tutor.',
        'Currated weekly / monthly Homework.',
        'Currated Design and Dev challenges.',
        'access to book 1-1 tutoring sessions.',
      ],
      mostPopular: true,
    }
];