import React from 'react';
import { Scene3D } from './Scene3D';
import { ArrowRightIcon } from 'lucide-react';
export const Hero = () => {
  return <section className="relative h-screen w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-20"></div>
        <div className="w-full h-full">
          <Scene3D />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="block">Showcase Your</span>
            <span className="block text-indigo-400">3D Projects</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            A modern platform for designers and developers to display their 3D
            work and project portfolios in an immersive environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center justify-center transition-colors duration-300">
              View Projects
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
            <a href="#" className="border border-white hover:border-indigo-400 hover:text-indigo-400 px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center justify-center transition-colors duration-300">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>;
};