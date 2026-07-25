import React from 'react';
import { PAKISTANI_GLOSSARY } from '../data/glossary';
import { BookOpen, Sparkles, ChefHat, Flame, X } from 'lucide-react';

interface KitchenGlossaryProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const KitchenGlossaryModal: React.FC<KitchenGlossaryProps> = ({ onClose, isModal = false }) => {
  const content = (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 sm:p-8 space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-100">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold font-serif text-xl shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-800 flex items-center">
              Pakistani Kitchen Terms & Culinary Secrets
              <Sparkles className="w-4 h-4 text-amber-500 ml-2" />
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Master the core techniques that give homestyle Pakistani curries their signature flavor!
            </p>
          </div>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="bg-stone-100 hover:bg-stone-200 p-2 rounded-xl text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PAKISTANI_GLOSSARY.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-amber-50/50 via-stone-50 to-stone-50 border border-amber-200/80 rounded-2xl p-5 hover:border-amber-400 transition-all shadow-xs"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold font-serif text-amber-950">
                  {item.term}
                </h3>
                <span className="text-xs text-stone-500 font-sans italic">
                  Pronounced: {item.phonetic}
                </span>
              </div>
              <span className="text-lg font-serif text-amber-800 font-extrabold bg-amber-100 px-3 py-0.5 rounded-lg border border-amber-200">
                {item.urduScript}
              </span>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed mb-3">
              {item.definition}
            </p>

            <div className="bg-white border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950 flex items-start space-x-2">
              <ChefHat className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900 block">Ammi's Secret:</span>
                <span className="text-stone-600">{item.chefAdvice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full my-auto">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
