import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, FolderIcon, UserIcon, BookOpenIcon, LineChartIcon, Calculator, FileTextIcon, MenuIcon, XIcon } from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
}

export const Sidebar = ({ isExpanded, setIsExpanded }: SidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Close mobile sidebar when window is resized to desktop size
  // and handle mouse events for desktop sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Only apply hover effect on desktop
      
      if (sidebarRef.current) {
        const sidebarRect = sidebarRef.current.getBoundingClientRect();
        const isMouseOverSidebar = e.clientX <= sidebarRect.right; // Detect exactly at the border
        
        // Only auto-collapse if on home page
        if (isHomePage) {
          setIsExpanded(isMouseOverSidebar || isHovered);
        }
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setIsExpanded, isHovered, isHomePage]);
  const navItems = [{
    path: '/',
    icon: HomeIcon,
    label: 'Home'
  }, {
    path: '/projects',
    icon: FolderIcon,
    label: 'Projects'
  }, {
    path: '/about',
    icon: UserIcon,
    label: 'About'
  }, {
    path: '/blog',
    icon: BookOpenIcon,
    label: 'Blog'
  }, {
    path: '/finlab',
    icon: LineChartIcon,
    label: 'FinLab'
  }, {
    path: '/numlab',
    icon: Calculator,
    label: 'NumLab'
  }, {
    path: '/resume',
    icon: FileTextIcon,
    label: 'Resume'
  }];
  return <>
      {/* Mobile menu toggle button */}
      <button onClick={() => setIsMobileOpen(!isMobileOpen)} className={`fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1a237e] text-white ${isHomePage ? 'block' : 'md:hidden'}`}>
        {isMobileOpen ? <XIcon /> : <MenuIcon />}
      </button>
      
      {/* Desktop sidebar toggle button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1a237e] text-white hidden md:block shadow-lg"
      >
        {isExpanded ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>
      
      <div 
        ref={sidebarRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
        fixed top-0 left-0 h-full bg-gradient-to-b from-[#1a237e] via-[#0d47a1] to-[#1565c0] text-white
        transition-all duration-300 ease-in-out shadow-xl
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        ${isExpanded ? 'md:w-64' : 'md:w-16'}
        z-50
      `}>
        <div className={`p-6 ${!isExpanded ? 'md:p-3' : ''}`}>
          <h1 className={`text-2xl font-bold mb-8 text-white ${!isExpanded ? 'md:text-center md:text-xl md:mb-6' : ''}`}>
            {isExpanded ? 'NodeLab' : 'NL'}
          </h1>
          <nav className="space-y-4">
            {navItems.map(({
            path,
            icon: Icon,
            label
          }) => <Link key={path} to={path} className={`
                  flex items-center ${isExpanded ? 'space-x-3' : 'justify-center'} px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${location.pathname === path ? 'bg-white/20 text-white' : 'hover:bg-white/10'}
                `} onClick={() => setIsMobileOpen(false)}>
                <Icon className="w-5 h-5" />
                {isExpanded && <span>{label}</span>}
              </Link>)}
          </nav>
        </div>
      </div>
    </>;
};