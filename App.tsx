import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import RightSidebar from './components/Layout/RightSidebar';
import Home from './pages/Home';
import DirectMessages from './pages/DirectMessages';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex bg-white md:bg-gray-50 min-h-screen text-gray-900 font-sans">
        {/* Left Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex justify-center w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/messages" element={<DirectMessages />} />
            {/* Placeholder routes for demo purposes */}
            <Route path="/explore" element={<div className="flex items-center justify-center h-screen text-gray-400 font-bold text-xl">Explore Page Mockup</div>} />
            <Route path="/notifications" element={<div className="flex items-center justify-center h-screen text-gray-400 font-bold text-xl">Notifications Page Mockup</div>} />
            <Route path="/create" element={<div className="flex items-center justify-center h-screen text-gray-400 font-bold text-xl">Create Page Mockup</div>} />
            <Route path="/profile" element={<div className="flex items-center justify-center h-screen text-gray-400 font-bold text-xl">Profile Page Mockup</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Right Sidebar (Desktop Only) - Hidden on /messages route to give chat more space */}
        <Routes>
            <Route path="/" element={<RightSidebar />} />
            <Route path="/messages" element={null} /> 
            <Route path="*" element={<div className="hidden lg:block w-[320px]"></div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;