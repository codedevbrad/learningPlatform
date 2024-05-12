import Title from "@/app/reusables/content/title"
import Link from "next/link"

function Resource ( { title, content } ) {
    return (
        <div>
            <Title variant="subheading2" title={ title } />
            <div>
                { content.map( ( item ) =>
                    <Link href={ item.link }>
                        <div className="my-4 p-4 border border-gray-200 rounded-lg">
                         <h2 className="mb-2 font-bold"> { item.name }  </h2>
                         <p>
                         { item.description }
                         </p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

const Data = [
    {
        title: 'Youtubers',
        content: [
            { 
                name: 'fireship.io',
                link: 'https://fireship.io/',
                description: "A YouTube channel and website providing tutorials and resources for web development, covering topics such as Firebase, Angular, and more."
            },
            { 
                name: 'coding train', 
                link: 'https://thecodingtrain.com/',
                description: "The Coding Train is a YouTube channel and website run by Daniel Shiffman, featuring creative coding tutorials and projects using Processing, p5.js, and more."
            }
        ]
    },
    {
        title: 'Websites',
        content: [
            { 
                name: 'codecademy',
                link: 'https://www.codecademy.com/',
                description: "Codecademy offers interactive coding tutorials and courses covering various programming languages and topics, suitable for beginners and experienced developers alike."
            },
            { 
                name: 'dev.io',
                link: 'https://dev.to/',
                description: "Dev.to is a community-driven platform for developers to share and discuss programming-related topics, tutorials, and experiences through articles, discussions, and Q&A."
            }
        ]
    },
    {
        title: 'Colours, sprites and illustrations',
        content: [
            {
                name: "Blush: Illustrations for everyone",
                link: "https://blush.design/",
                description: "A platform offering a wide range of customizable illustrations suitable for various design projects."
            },
            {
                name: "Open Peeps, Hand-Drawn Illustration Library",
                link: "https://www.openpeeps.com/",
                description: "A library of hand-drawn illustrations that can be used to add a unique touch to design projects."
            },
            {
                name: "DrawKit - Beautiful vector illustrations",
                link: "https://drawkit.com/",
                description: "A collection of beautifully crafted vector illustrations available for use in design projects."
            },
            {
                name: "Shape 2 - Icons & Illustrations to SVG, Lottie, React",
                link: "https://shape.so/app/animated-illustrations",
                description: "A platform offering a variety of icons and illustrations that can be exported to SVG, Lottie, and React formats."
            },
            {
                name: "Mega Creator - Easy & Free Online Graphic Design Software",
                link: "https://icons8.com/vector-creator/illustration/5dadf21c01d03600111ef4d7",
                description: "An easy-to-use online graphic design software that allows users to create illustrations and designs for free."
            },
            {
                name: "ColorSpace - Color Palettes Generator and Color Gradient Tool",
                link: "https://mycolor.space/?hex=%23845EC2&sub=1",
                description: "A tool for generating color palettes and gradients, providing inspiration and resources for design projects."
            }
        ]
    }
];


export default function BuildContentPage ( ) {
    return (
        <main className="flex flex-col items-center p-4">
           <Title title='Resources to level up your learning' variant="heading" />
           <div className="w-1/3">
                { Data.map( ( { title, content} ) =>
                    <Resource title={ title } content={ content } />
                )}
           </div>
        </main>
    )
}
