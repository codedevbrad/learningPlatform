import React from 'react';

interface ArticleReference {
    title: string;
    description: string;
    imageUrl?: string; // Optional since not all bookmarks might have an image
    articleUrl: string;
    type: string;
}

type ArticleCardProps = {
  reference: ArticleReference;
}

export default function ReusableArticleCardComponent({ reference }: ArticleCardProps): JSX.Element {
  const { title, description, articleUrl, imageUrl } = reference;

  return (
    <a href={ articleUrl } target="_blank" rel="noopener noreferrer" className="block max-w-md mx-auto overflow-hidden transition-shadow duration-300 ease-in-out">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-18 w-20">
          <img className="h-full w-full object-cover rounded-lg" src={ imageUrl } alt="" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </a>
  );
}

export type {
  ArticleReference
} 