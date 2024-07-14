/*
 generate an object of warning message objects with an array of the connections to other models it has. 
 I need it for when I'm deleting data from db 
 schemas but need an alert message to tell users what relations they'll be removing also.

 make it a plain js object.

 could you give a little more explanation like for concepts. 

 you could explain that topics belong to one concept so you'd be deleting all topics , 
 then all user content for those topics. d this for all please.

 for the relations array, again split that into an object of model and explanation.
*/

const warningMessages = {
    Users: {
      message: "Deleting this user will also remove the following related data:",
      relations: [
        { model: "UserDataForTopic", explanation: "All progress and notes related to various topics." },
        { model: "Languages", explanation: "Any language associations this user has." },
        { model: "Questions", explanation: "Any questions posted by this user." }
      ]
    },
    AdminUsers: {
      message: "Deleting this admin user will also remove their administrative privileges.",
      relations: []
    },
    UserDataForTopic: {
      message: "Deleting this user data will affect the user's progress and notes on the related topic.",
      relations: [
        { model: "Users", explanation: "The user whose progress and notes are being tracked." },
        { model: "Topics", explanation: "The specific topic related to this user data." }
      ]
    },
    Categories: {
      message: "Deleting this category will also remove associations with courses, concepts, and challenges.",
      relations: [
        { model: "CategoryCourse", explanation: "All courses associated with this category." },
        { model: "CategoriesConcept", explanation: "All concepts linked to this category." },
        { model: "CategoriesChallenge", explanation: "All challenges associated with this category." }
      ]
    },
    Languages: {
      message: "Deleting this language will also remove associations with courses, topics, and challenges.",
      relations: [
        { model: "LanguagesCourse", explanation: "All courses taught in this language." },
        { model: "LanguagesTopic", explanation: "All topics available in this language." },
        { model: "LanguagesChallenge", explanation: "All challenges provided in this language." }
      ]
    },
    Concepts: {
      message: "Deleting this concept will also remove all related topics and user data associated with those topics.",
      relations: [
        { model: "Topics", explanation: "All topics that belong to this concept will be deleted." },
        { model: "CategoriesConcept", explanation: "All category associations for this concept." },
        { model: "UserDataForTopic", explanation: "All user progress and notes on the topics related to this concept." }
      ]
    },
    Topics: {
      message: "Deleting this topic will also remove related user data, concept associations, and language links.",
      relations: [
        { model: "UserDataForTopic", explanation: "All user data related to this topic." },
        { model: "Concepts", explanation: "The concept to which this topic belongs." },
        { model: "LanguagesTopic", explanation: "All language associations for this topic." }
      ]
    },
    Courses: {
      message: "Deleting this course will also remove associated data, resources, categories, and languages.",
      relations: [
        { model: "CategoryCourse", explanation: "All category associations for this course." },
        { model: "LanguagesCourse", explanation: "All language associations for this course." }
      ]
    },
    Challenges: {
      message: "Deleting this challenge will also remove associations with languages and categories.",
      relations: [
        { model: "LanguagesChallenge", explanation: "All language associations for this challenge." },
        { model: "CategoriesChallenge", explanation: "All category associations for this challenge." }
      ]
    },
    CategoriesConcept: {
      message: "Deleting this category concept relation will unlink the concept from the category.",
      relations: [
        { model: "Concepts", explanation: "The concept that will be unlinked from the category." },
        { model: "Categories", explanation: "The category from which the concept will be unlinked." }
      ]
    },
    LanguagesTopic: {
      message: "Deleting this language topic relation will unlink the topic from the language.",
      relations: [
        { model: "Topics", explanation: "The topic that will be unlinked from the language." },
        { model: "Languages", explanation: "The language from which the topic will be unlinked." }
      ]
    },
    CategoryCourse: {
      message: "Deleting this category course relation will unlink the course from the category.",
      relations: [
        { model: "Courses", explanation: "The course that will be unlinked from the category." },
        { model: "Categories", explanation: "The category from which the course will be unlinked." }
      ]
    },
    LanguagesCourse: {
      message: "Deleting this language course relation will unlink the course from the language.",
      relations: [
        { model: "Courses", explanation: "The course that will be unlinked from the language." },
        { model: "Languages", explanation: "The language from which the course will be unlinked." }
      ]
    },
    CategoriesChallenge: {
      message: "Deleting this category challenge relation will unlink the challenge from the category.",
      relations: [
        { model: "Challenges", explanation: "The challenge that will be unlinked from the category." },
        { model: "Categories", explanation: "The category from which the challenge will be unlinked." }
      ]
    },
    LanguagesChallenge: {
      message: "Deleting this language challenge relation will unlink the challenge from the language.",
      relations: [
        { model: "Challenges", explanation: "The challenge that will be unlinked from the language." },
        { model: "Languages", explanation: "The language from which the challenge will be unlinked." }
      ]
    }
};  