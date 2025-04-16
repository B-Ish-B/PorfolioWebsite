import React from 'react';

export const Resume = () => {
  return <main className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* The heading remains "Resume" */}
          <h1 className="text-4xl font-bold mb-8">Resume</h1> 
          <div className="bg-gray-800 rounded-xl p-8">
            {/* Changed the text inside this p tag */}
            <p className="text-xl text-gray-300 mb-6">
              JOBLESS MF
            </p>
          </div>
        </div>
      </div>
    </main>;
};