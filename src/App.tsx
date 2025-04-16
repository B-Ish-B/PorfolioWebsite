import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { FinLab } from './pages/FinLab';
import { NumLab } from './pages/NumLab';
import { Resume } from './pages/Resume';
import { ComputationalCore } from './pages/ComputationalCore';
export function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  
  return <Router>
      <div className="flex min-h-screen bg-[#1C1F26] text-[#E0E0E0]">
        <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
        <main className={`flex-1 transition-all duration-300 ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-16'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/finlab" element={<FinLab />} />
            <Route path="/numlab" element={<NumLab />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/computational-core" element={<ComputationalCore />} />
          </Routes>
        </main>
      </div>
    </Router>;
}