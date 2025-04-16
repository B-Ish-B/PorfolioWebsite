import React from 'react';
import { GithubIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
export const Footer = () => {
  return <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold text-white">Cube3D</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A modern platform for designers and developers to showcase their
              3D work and project portfolios in an immersive environment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2023 Cube3D. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-400 mr-4">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>;
};