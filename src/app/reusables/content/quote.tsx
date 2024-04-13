import React from 'react';

interface QuoteBlockProps {
    quoteText: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ quoteText }) => {
    return (
        <blockquote className="p-4 italic border-l-4 rounded-md border shadow-sm shadow-gray-200 bg-white text-neutral-600 quote">
            <p className="mb-0">{quoteText}</p>
        </blockquote>
    );
}

export default QuoteBlock;