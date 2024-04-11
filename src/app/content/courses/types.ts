
// Define a type for the course object
type Course = {
    courseId: number;
    title: string;
    description: string;
    imageUrl: string;
    categoryTags: string[];
    belongsTo: string;
};

export type {
    Course
}