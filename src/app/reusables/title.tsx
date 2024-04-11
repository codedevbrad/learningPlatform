import React from 'react';

// Define an interface for the component props
interface TitleProps {
  title: string;
  variant?: 'heading' | 'subheading1' | 'subheading2';
}

const Title: React.FC<TitleProps> = ({ title, variant = 'heading' }) => {
  // Function to determine the className based on the variant
  const getFontSize = (): string => {
    switch (variant) {
      case 'heading':
        return 'font-bold text-3xl'; // Heading style
      case 'subheading1':
        return 'font-bold text-xl'; // Subheading1 style
      case 'subheading2':
        return 'font-bold text-lg'; // Subheading2 style
      default:
        return 'font-bold text-2xl'; // Default style if no variant is provided
    }
  };

  return (
    <h2 className={ `${getFontSize()} my-3 `}>{title}</h2>
  );
};

export default Title;