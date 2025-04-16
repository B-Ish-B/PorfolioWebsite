import React from 'react';
import { ProjectCard } from './ProjectCard';
export const ProjectGrid = () => {
  const projects = [{
    id: 1,
    title: 'Geometric Exploration',
    description: 'A study of complex geometric shapes and patterns in 3D space.',
    imageUrl: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: '3D Modeling'
  }, {
    id: 2,
    title: 'Architectural Visualization',
    description: 'Modern building concept with realistic lighting and materials.',
    imageUrl: 'https://images.unsplash.com/photo-1638986437079-969aeb5d0b7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    category: 'Architecture'
  }, {
    id: 3,
    title: 'Product Rendering',
    description: 'Photorealistic product visualization for marketing materials.',
    imageUrl: 'https://images.unsplash.com/photo-1638986437093-e307a363018e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    category: 'Product Design'
  }, {
    id: 4,
    title: 'Abstract Composition',
    description: 'Experimental forms and textures creating unique visual experiences.',
    imageUrl: 'https://images.unsplash.com/photo-1620063633168-8b775902b8d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    category: 'Abstract'
  }, {
    id: 5,
    title: 'Character Design',
    description: 'Stylized character modeling and rigging for animation projects.',
    imageUrl: 'https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Character'
  }, {
    id: 6,
    title: 'Environment Design',
    description: 'Immersive 3D environments with detailed texturing and lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    category: 'Environment'
  }];
  return <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our collection of innovative 3D designs and creative
            projects
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => <ProjectCard key={project.id} title={project.title} description={project.description} imageUrl={project.imageUrl} category={project.category} />)}
        </div>
        <div className="mt-16 text-center">
          <a href="#" className="inline-block border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-300">
            View All Projects
          </a>
        </div>
      </div>
    </section>;
};