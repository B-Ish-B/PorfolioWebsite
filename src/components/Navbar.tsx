import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [{
    path: '/',
    label: 'Home'
  }, {
    path: '/projects',
    label: 'Projects'
  }, {
    path: '/about',
    label: 'About'
  }, {
    path: '/blog',
    label: 'Blog'
  }, {
    path: '/finlab',
    label: 'FinLab'
  }, {
    path: '/numlab',
    label: 'NumLab'
  }, {
    path: '/resume',
    label: 'Resume'
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-xl font-bold">NodeLab</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map(item => <Link key={item.path} to={item.path} className="text-gray-300 hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">
                  {item.label}
                </Link>)}
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
              {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
            {navItems.map(item => <Link key={item.path} to={item.path} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>
                {item.label}
              </Link>)}
          </div>
        </div>}
    </nav>;
};