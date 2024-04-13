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
    <a href={ articleUrl } target="_blank" rel="noopener noreferrer" className="p-4 shadow-md shadow-purple-900 max-w-4xl mx-auto flex items-center bg-purple-950 rounded-lg transition-shadow duration-300 ease-in-out no-underline">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-18 w-20">
          <img className="h-full w-full object-cover rounded-lg" src={ imageUrl } alt="" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-white text-sm">{description}</p>
        </div>
      </div>
    </a>
  );
}

export type {
  ArticleReference
} 