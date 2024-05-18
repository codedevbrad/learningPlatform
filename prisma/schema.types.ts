// Define interfaces for Topic and Concept
interface TopicType {
    id: string;
    title: string;
    description: string;
    data: any[];
    conceptId: string;
    active: boolean;
  }
  
  interface ConceptType {
    id: string;
    title: string;
    description: string;
    topics: TopicType[];
    imgUrl: string;
    data: any[];
    resources: any[];
    categories: any[];
    languages: any[];
    userDataOnCourse?: any;
    active: boolean;
  }

  interface CourseType {
    id: string;
    name: string;
    categories: { id: string; name: string }[];
    languages: { id: string; name: string }[];
    description: string;
    imgUrl: string;
  }

  export type { TopicType , ConceptType, CourseType };