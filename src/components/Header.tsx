import React from 'react';
import { ChefHat, BookOpen, Bookmark, HelpCircle, Utensils, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'generator' | 'presets' | 'saved' | 'helpline' | 'glossary';
  setActiveTab: (tab: 'generator' | 'presets' | 'saved' | 'helpline' | 'glossary') => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, savedCount }) => {
  return (
    <header className="bg-gradient-to-r from-amber-900 via-orange-900 to-amber-950 text-amber-50 shadow-xl border-b border-amber-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Persona */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-serif">
                  Chef Ammi's Pakistani Kitchen
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-200 border border-amber-400/30">
                  <Sparkles className="w-3 h-3 mr-1" /> Practical Desi Chef
                </span>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/80 font-medium mt-0.5">
                Authentic homestyle Pakistani recipes using ONLY what's in your pantry!
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex flex-wrap items-center gap-1.5 bg-amber-950/60 p-1.5 rounded-xl border border-amber-800/40">
            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'generator'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-amber-200 hover:text-white hover:bg-amber-900/50'
              }`}
            >
              <Utensils className="w-4 h-4 mr-1.5" />
              Ingredient Cook
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`flex items-center px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'presets'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-amber-200 hover:text-white hover:bg-amber-900/50'
              }`}
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Quick Presets
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex items-center px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all relative ${
                activeTab === 'saved'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-amber-200 hover:text-white hover:bg-amber-900/50'
              }`}
            >
              <Bookmark className="w-4 h-4 mr-1.5" />
              Saved
              {savedCount > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('helpline')}
              className={`flex items-center px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'helpline'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-amber-200 hover:text-white hover:bg-amber-900/50'
              }`}
            >
              <HelpCircle className="w-4 h-4 mr-1.5" />
              Ask Ammi
            </button>

            <button
              onClick={() => setActiveTab('glossary')}
              className={`flex items-center px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'glossary'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-amber-200 hover:text-white hover:bg-amber-900/50'
              }`}
            >
              <ChefHat className="w-4 h-4 mr-1.5" />
              Terms
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
