import CourseMainComponent from "./panel.main"
import { getCourseById } from "@/db_queries/courses/student.queries"

export default async function Page({ params }: { params: { slug: string } }) {

    const courseData = await getCourseById( params.slug );
    console.log( 'course', courseData );
    const { id, name, description, imgUrl, data, resources } = courseData;

    const references = [
      {
          title: 'Learning ReactJs',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
          imageUrl: 'https://via.placeholder.com/150',
          description: 'Great for learning components and state.'
      },
      {
          title: 'Understanding ReactJs',
          type: 'article',
          articleUrl: 'https://react.dev/',
          imageUrl: 'https://via.placeholder.com/150',
          description: 'great for learning state and components'
    }];

    return (
      <div className="h-full flex flex-row">
          <CourseMainComponent 
            courseInfo={{ name , description , imgUrl }} 
            data={ data } 
          />
      </div>
    )
}