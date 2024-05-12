'use client'
import Title from "@/app/reusables/content/title"

function AboutSection ( ) {
   return (
      <div className="">
          <Title title="About you 👍" variant="subheading1" />
          <p className="leading-8">
              " As a student eager to 
              learn web development, I'm seeking guidance from my 
              tutor to acquire essential skills and knowledge. I'm motivated to understand HTML, CSS, and 
              JavaScript thoroughly, as well as the principles behind creating effective user experiences. 
              With my tutor's expertise, I aim to grasp key concepts efficiently and gain practical insights
              into building websites and applications. My goal is to develop proficiency in web development, 
              equipping myself with the tools needed to create impactful digital solutions. "
          </p>
       </div>
   )
}

function AboutCode() {
    const data = [
        {
            type: 'Frontend',
            data:  ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js'],
        },
        {
            type: 'Backend',
            data: ['JavaScript (Node.js)', 'Python (Django)', 'Ruby (Ruby on Rails)', 'Java (Spring)', 'PHP (Laravel)', 'C# (ASP.NET)', 'Go'],
        },
        {
            type: 'Other',
            data: ['SQL', 'NoSQL', 'GraphQL', 'Bash/Shell', 'Rust', 'Swift', 'Kotlin', 'Assembly']
        }
    ];

    return (
        <div className="flex flex-col mt-5">
            <Title title="What you're hoping to learn. 👍" variant="subheading1" />
            <div className="flex flex-row space-x-6">
                { data.map((category, index) => (
                    <div key={index} className="flex-1 mb-4 bg-gray-100 p-2 px-5">
                        <Title variant="subheading2" title={ category.type } />
                        <ul>
                            {category.data.map((item, i) => (
                                <li key={i} className="list-disc ml-6 my-2">{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default function AboutUser ( ) {
    return (
        <div className="p-5">
          <div className="flex flex-col">
              <AboutSection />
              <AboutCode />
          </div>
        </div>
    )
}