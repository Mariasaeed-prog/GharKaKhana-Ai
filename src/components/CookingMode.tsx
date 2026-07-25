import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { X, Play, Pause, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, Clock, Lightbulb, Sparkles, Trophy, ChefHat } from 'lucide-react';

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
}

export const CookingMode: React.FC<CookingModeProps> = ({ recipe, onClose }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = recipe.instructions[currentStepIndex];
  const totalSteps = recipe.instructions.length;

  // Initialize timer whenever step changes
  useEffect(() => {
    if (currentStep?.timerMinutes && currentStep.timerMinutes > 0) {
      setTimerSeconds(currentStep.timerMinutes * 60);
    } else {
      setTimerSeconds(null);
    }
    setIsTimerRunning(false);
  }, [currentStepIndex, currentStep]);

  // Countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/90 text-stone-100 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
      
      {/* Top Bar */}
      <div className="bg-stone-900/90 border-b border-stone-800 p-4 sm:p-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-serif text-amber-200">
              {recipe.title}
            </h3>
            <p className="text-xs text-stone-400">
              Interactive Cooking Mode • Step {currentStepIndex + 1} of {totalSteps}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="bg-stone-800 hover:bg-stone-700 p-2.5 rounded-xl text-stone-300 transition-colors"
          title="Exit Cooking Mode"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-800 h-1.5 shrink-0">
        <div
          className="bg-amber-500 h-1.5 transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Body Content */}
      <div className="flex-1 max-w-3xl w-full mx-auto p-5 sm:p-8 flex flex-col justify-center my-auto">
        {!isCompleted ? (
          <div className="space-y-6">
            
            {/* Step Card Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full">
                Step {currentStep.stepNumber}
              </span>

              {/* Step Timer Widget */}
              {timerSeconds !== null && (
                <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border transition-all ${
                  timerSeconds === 0
                    ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-bounce'
                    : 'bg-stone-900 border-amber-800/80 text-amber-300'
                }`}>
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="font-mono font-bold text-sm">
                    {formatTimer(timerSeconds)}
                  </span>
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-1 hover:bg-amber-500/20 rounded-md transition-colors"
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-amber-400" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds((currentStep.timerMinutes || 0) * 60);
                    }}
                    className="p-1 hover:bg-amber-500/20 rounded-md transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                  </button>
                </div>
              )}
            </div>

            {/* Step Title & Instruction */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-100">
                {currentStep.title}
              </h2>

              <p className="text-stone-200 text-base sm:text-lg leading-relaxed">
                {currentStep.description}
              </p>

              {/* Technique Tip */}
              {currentStep.techniqueTip && (
                <div className="bg-amber-950/40 border border-amber-800/50 rounded-2xl p-4 text-sm text-amber-200 flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 block mb-0.5">Chef Ammi's Technique Advice:</span>
                    <span className="text-stone-300">{currentStep.techniqueTip}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Optional Upgrade Reminder if on Last Step */}
            {currentStepIndex === totalSteps - 1 && recipe.optionalUpgrade && (
              <div className="bg-gradient-to-r from-amber-900/40 to-orange-950/40 border border-amber-500/50 rounded-2xl p-4 text-amber-200 text-sm flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-300 block mb-0.5">Final Touch (Optional Upgrade):</span>
                  <span>{recipe.optionalUpgrade}</span>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Completion Screen */
          <div className="text-center space-y-6 bg-stone-900 border border-amber-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-amber-500/20 text-amber-400 border border-amber-400/40 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-1">
                Shabash! (Bravo!)
              </span>
              <h2 className="text-3xl font-bold font-serif text-white">
                Your Dish is Ready!
              </h2>
              <p className="text-sm text-stone-300 max-w-md mx-auto mt-2 leading-relaxed">
                Chef Ammi says: "Mashallah! You made a delicious homestyle dish using simple ingredients. Enjoy hot!"
              </p>
            </div>

            <div className="p-4 bg-amber-950/50 border border-amber-800/60 rounded-2xl text-left text-xs text-amber-200 space-y-1 max-w-md mx-auto">
              <span className="font-bold text-amber-300 block">Serving Suggestion:</span>
              <p>{recipe.servingSuggestions}</p>
            </div>

            <button
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold py-3.5 px-8 rounded-xl text-sm transition-all shadow-lg inline-flex items-center"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Done & Return
            </button>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      {!isCompleted && (
        <div className="bg-stone-900/90 border-t border-stone-800 p-4 sm:p-6 flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 px-5 py-3 rounded-xl font-bold text-sm transition-colors flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous Step
          </button>

          <span className="text-xs text-stone-400 font-medium">
            Step {currentStepIndex + 1} of {totalSteps}
          </span>

          <button
            onClick={handleNextStep}
            className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-6 py-3 rounded-xl text-sm transition-all flex items-center shadow-md active:scale-95"
          >
            {currentStepIndex === totalSteps - 1 ? (
              <>
                Finish Cooking
                <CheckCircle2 className="w-4 h-4 ml-1.5" />
              </>
            ) : (
              <>
                Next Step
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      )}

    </div>
  );
};
