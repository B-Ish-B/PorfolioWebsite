import React from 'react';

export const Blog = () => {
  return (
    <main className="pt-20 min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center">Blog</h1>
        
        {/* Daily Article/Paper Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">Daily Article</h2>
          <div className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition duration-300">
            <h3 className="text-xl font-bold mb-4">Latest Research Paper</h3>
            <p className="text-gray-300 mb-4">
              Explore today's featured academic paper on quantitative finance and algorithmic trading.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-blue-400">Read more →</span>
              <span className="text-gray-400">Published today</span>
            </div>
          </div>
        </section>

        {/* Daily Video Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">Daily Video</h2>
          <div className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition duration-300">
            <div className="aspect-video bg-gray-700 rounded-lg mb-4"></div>
            <h3 className="text-xl font-bold mb-4">Today's Educational Content</h3>
            <p className="text-gray-300 mb-4">
              Watch our latest video on advanced trading strategies and mathematical concepts.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-blue-400">Watch now →</span>
              <span className="text-gray-400">10 minutes</span>
            </div>
          </div>
        </section>

        {/* General Articles Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-400">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition duration-300">
                <div className="h-40 bg-gray-700 rounded-lg mb-4"></div>
                <h3 className="text-lg font-bold mb-2">Article Title {item}</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Brief description of the article content and its key insights.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 text-sm">Read more →</span>
                  <span className="text-gray-400 text-sm">5 min read</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};