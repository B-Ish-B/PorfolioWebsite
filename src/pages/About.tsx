import React from 'react';
import { GlobeIcon, BookOpenIcon, CodeIcon } from 'lucide-react';
export const About = () => {
  return <main className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About NodeLab</h1>
          <div className="bg-gray-800 rounded-xl p-8 mb-12">
            <p className="text-xl text-gray-300 mb-6">
              A next-generation platform for exploring the intersection of
              mathematics, finance, and computer science through interactive
              visualizations and simulations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center p-4">
                <GlobeIcon className="h-12 w-12 text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                <p className="text-gray-400">
                  Connected with researchers and developers worldwide
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <BookOpenIcon className="h-12 w-12 text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Open Knowledge</h3>
                <p className="text-gray-400">
                  Sharing insights through interactive learning
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <CodeIcon className="h-12 w-12 text-indigo-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Code</h3>
                <p className="text-gray-400">
                  Real-time simulations and computations
                </p>
              </div>
            </div>
          </div>
          {/* Timeline section will be added here */}
          {/* 3D Globe will be added here */}
          {/* Tech Stack Cloud will be added here */}
        </div>
      </div>
    </main>;
};