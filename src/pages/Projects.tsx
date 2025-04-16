import React, { useMemo, useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { SearchIcon, FilterIcon, TagIcon } from 'lucide-react';
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  domain: string;
}
const projects: Project[] = [{
  id: 1,
  title: 'Neural Network Visualizer',
  description: 'Interactive visualization of neural network architectures and training processes.',
  imageUrl: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be',
  category: 'Machine Learning',
  tags: ['Python', 'TensorFlow', 'React'],
  domain: 'ML'
}, {
  id: 2,
  title: 'Quantitative Trading System',
  description: 'Real-time trading simulator with advanced portfolio optimization.',
  imageUrl: 'https://images.unsplash.com/photo-1638986437079-969aeb5d0b7f',
  category: 'Finance',
  tags: ['Python', 'NumPy', 'Financial APIs'],
  domain: 'Finance'
}, {
  id: 3,
  title: 'Numerical Methods Library',
  description: 'High-performance numerical computation library for scientific computing.',
  imageUrl: 'https://images.unsplash.com/photo-1638986437093-e307a363018e',
  category: 'Numerical',
  tags: ['C++', 'CUDA', 'Scientific Computing'],
  domain: 'Numerical'
}];
export const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const domains = ['all', 'ML', 'Finance', 'Numerical', 'Systems'];
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => project.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDomain = selectedDomain === 'all' || project.domain === selectedDomain;
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag));
      return matchesSearch && matchesDomain && matchesTags;
    });
  }, [searchQuery, selectedDomain, selectedTags]);
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };
  return <main className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-4">Project Playground</h1>
            <p className="text-gray-400 max-w-2xl">
              Explore interactive demos, simulations, and code examples across
              machine learning, finance, and numerical computing.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col gap-4 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow sm:flex-grow-0">
                <input type="text" placeholder="Search projects..." className="w-full sm:w-64 bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="relative">
                <select className="w-full sm:w-auto bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500" value={selectedDomain} onChange={e => setSelectedDomain(e.target.value)}>
                  {domains.map(domain => <option key={domain} value={domain}>
                      {domain === 'all' ? 'All Domains' : domain}
                    </option>)}
                </select>
                <FilterIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => <button key={tag} onClick={() => toggleTag(tag)} className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${selectedTags.includes(tag) ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
                  <TagIcon className="h-4 w-4 mr-1" />
                  {tag}
                </button>)}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => <ProjectCard key={project.id} title={project.title} description={project.description} imageUrl={project.imageUrl} category={project.category} />)}
        </div>
      </div>
    </main>;
};