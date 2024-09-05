// Props for the AddLoremIspum component...

interface AddLoremIspumProps {
    content: any; // Current content of the textarea
    onUpdate: (newContent: string) => void; // Function to update the content
    wordLimit: number; // Limit for the total content length
}

// Component to add Lorem Ipsum words ...

export default function AddLoremIspum({ content, onUpdate, wordLimit }: AddLoremIspumProps) {
    // Function to add random Lorem Ipsum words to the content
    const addLoremIpsum = () => {
      const loremWords = [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
        "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
        "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua",
      ];
      const randomWords = Array.from({ length: 5 }, () =>
        loremWords[Math.floor(Math.random() * loremWords.length)]
      ).join(" "); // Generate a string with 5 random words
  
      const newValue = `${content} ${randomWords}`.trim();
      if (newValue.length <= wordLimit) { // Check word limit
        onUpdate(newValue); // Update the parent component's state
      }
    };
  
    return (
      <div onClick={addLoremIpsum} className="cursor-pointer mt-2 px-3 py-2 text-sm text-white bg-black rounded-sm disabled:bg-gray-400">
        Add Lorem Ipsum
      </div>
    );
  }