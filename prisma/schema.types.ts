import { 
  Categories, Concepts, Courses, Languages, Topic, LanguagesCourse, LanguagesTopic, 
  UserDataForCourse, UserDataForTopic, CategoriesConcept, CategoryCourse
} from '@prisma/client'

// categories with the actual object properties in the categories array.
/*
  {
       id: string;
     name: string;
    color: string;
  }
*/
export type ExtendedConcepts = Concepts & {
  topics: Topic[];
  categories: Categories[];
};

// categories with the object properties containing the id connectors for categories.
/*
  {
            id: string;
     conceptId: string;
    categoryId: string;
  }
*/
export type ExtendedConceptsNotAttached = Concepts & {
  topics: Topic[];
  categories: CategoriesConcept[];
};


export type ExtendedCourses = Courses & {
  categories: Categories[];
  languages: Languages[];
};


interface TopicType {
    id: string;
    title: string;
    description: string;
    data: any[];
    conceptId: string;
    active: boolean;
    resources: any[];
    categories: any[];
    languages: any[];
    userDataOnCourse?: any;
  }
  

interface CourseType {
    id: string;
    name: string;
    categories: { id: string; name: string }[];
    languages: { id: string; name: string }[];
    description: string;
    imgUrl: string;
}

export type { TopicType , CourseType };