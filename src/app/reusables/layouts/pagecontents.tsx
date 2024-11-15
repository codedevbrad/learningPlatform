import Title from '@/app/reusables/content/title'


interface ContentBlock {
  title: string;
  id: string;
  [key: string]: any; // To allow additional properties if necessary
}

interface PageContentsProps {
  content: ContentBlock[]; // Expecting an array of ContentBlock
}


/** 
 * @component
 * 
 * Table of contents component that generates a list based on provided content.
 * 
 * This allows users to click an item and smoothly scroll to the corresponding section of the page
 * using the `scrollIntoView` function.
 * 

 * 
 * @description 
 * - For the scroll functionality to work, ensure that there is an HTML element on the page with an `id` 
 *   attribute matching the `id` value in the `content` array.
 * - Example: If the content array contains an item with `id: 'section-1'`, the corresponding HTML element 
 *   should look like: `<div id="section-1">Section 1 Content</div>`.
 * - The `scrollIntoView` function will find the element by its `id` and smoothly scroll to it.
 * 
 * @important
 * - Ensure that each `id` is unique on the page.
 * - If multiple elements share the same `id`, the scroll will target only the first element found.
*/

const PageContents: React.FC<PageContentsProps> = ({ content }) => {

    const handleScroll = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      }
    };
  
    return (
      <div>
        <div>
          <Title title="On this page" variant="subheading2" noMargin={false} className='text-nowrap' />
        </div>
        <ul className='ml-4 border-l border-gray-100'>
          {content.map((block, index) => (
            <li
              key={index}
              className="my-3 cursor-pointer hover:bg-gray-50 p-3"
              onClick={() => handleScroll(block.id)} // Scroll to the corresponding section on click
            >
              {index + 1}. {block.title}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default PageContents;