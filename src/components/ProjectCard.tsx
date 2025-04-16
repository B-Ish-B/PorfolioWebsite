import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';
interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}
export const ProjectCard = ({
  title,
  description,
  imageUrl,
  category
}: ProjectCardProps) => {
  return <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="h-56 overflow-hidden relative">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md">
          {category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <a href="#" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-medium">
          View Project
          <ExternalLinkIcon className="ml-2 h-4 w-4" />
        </a>
      </div>
    </div>;
};