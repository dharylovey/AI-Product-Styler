import React, { useState, useContext } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../types';
import { ModelSelector } from './ModelSelector';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const appContext = useContext(AppContext);

  const linkClass = "text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors [&.active]:text-indigo-600 [&.active]:font-semibold";
  const mobileLinkClass = "block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors [&.active]:text-indigo-600 [&.active]:bg-indigo-50";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-indigo-200 shadow-md">
                AI
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 hidden xs:block">
                Product<span className="text-indigo-600">Styler</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <Link to="/features" className={linkClass}>Features</Link>
            <Link to="/how-it-works" className={linkClass}>How it Works</Link>
            <Link to="/n8n-workflow" className={linkClass}>n8n Workflow</Link>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-4">
             {/* Model Selector (Desktop) */}
            <div className="hidden md:block w-40">
              <ModelSelector 
                 selectedModelId={appContext?.selectedModel || ''}
                 onSelectModel={(id) => appContext?.setSelectedModel(id)}
              />
            </div>

            <button 
              onClick={onOpenSettings}
              className="text-slate-500 hover:text-indigo-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
              title="Settings (Configure n8n)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.217.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <Link to="/" className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm hidden md:block">
              Get Started
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <div className="mb-4 pb-4 border-b border-slate-100">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1">
                  AI Model
                </label>
                <ModelSelector 
                   selectedModelId={appContext?.selectedModel || ''}
                   onSelectModel={(id) => appContext?.setSelectedModel(id)}
                   className="w-full"
                />
              </div>
              <Link 
                to="/features" 
                className={mobileLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/how-it-works" 
                className={mobileLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link 
                to="/n8n-workflow" 
                className={mobileLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                n8n Workflow
              </Link>
              <div className="pt-4 mt-2">
                 <Link 
                  to="/" 
                  className="block w-full text-center bg-slate-900 text-white px-4 py-3 rounded-xl text-base font-semibold hover:bg-slate-800 transition-colors shadow-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};