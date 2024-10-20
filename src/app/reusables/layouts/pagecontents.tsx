import Title from '@/app/reusables/content/title'

interface PageContentsProps {
    content: { title: string; id: string }[]; // Add an id property to identify the section
}
  
const PageContents: React.FC<PageContentsProps> = ({ content }) => {

    const handleScroll = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling
      }
    };
  
    return (
      <div>
        <Title title="Content" variant="subheading2" noMargin={false} />
        <ul>
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