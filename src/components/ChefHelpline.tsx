import React, { useState } from 'react';
import { HelpCircle, Send, Sparkles, ChefHat, AlertCircle, MessageSquare } from 'lucide-react';

interface ChefHelplineProps {
  currentRecipeTitle?: string;
}

const COMMON_QUESTIONS = [
  'My curry salt is too high! How do I fix it?',
  'How do I make gravy thicker without cream or nuts?',
  'What can I substitute for fresh tomatoes in Pakistani curry?',
  'How to do perfect Bhunai so oil separates (Tari floats)?',
  'How do I keep scrambled eggs/khagina soft and moist?'
];

export const ChefHelpline: React.FC<ChefHelplineProps> = ({ currentRecipeTitle }) => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'chef'; text: string }>>([
    {
      sender: 'chef',
      text: 'Assalamu Alaikum! I am Chef Ammi. Ask me any kitchen question, cooking dilemma, or substitution trick! How can I help in your kitchen today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || question;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = textToSend.trim();
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    if (!queryText) setQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/recipe/ask-chef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMsg, currentRecipeTitle })
      });

      const data = await res.json();
      if (data.success && data.answer) {
        setChatHistory(prev => [...prev, { sender: 'chef', text: data.answer }]);
      } else {
        setChatHistory(prev => [...prev, { sender: 'chef', text: 'Beta, I am having a moment in the kitchen! Please try asking again.' }]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { sender: 'chef', text: 'Sorry dear, my recipe notes got misplaced. Please try asking again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-5 sm:p-7 max-w-4xl mx-auto flex flex-col h-[650px]">
      
      {/* Top Header */}
      <div className="flex items-center space-x-3 pb-4 border-b border-amber-100 shrink-0">
        <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold font-serif text-xl shadow-md">
          <ChefHat className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-800 flex items-center">
            Chef Ammi's Kitchen Helpline
            <Sparkles className="w-4 h-4 text-amber-500 ml-2" />
          </h2>
          <p className="text-xs text-stone-500">
            Instant homestyle solutions for salt fixes, gravy adjustments, and Pakistani cooking secrets!
          </p>
        </div>
      </div>

      {/* Common Quick Question Chips */}
      <div className="py-3 border-b border-amber-50 bg-amber-50/40 px-2 my-2 rounded-xl shrink-0">
        <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block mb-2">
          Quick Kitchen Queries:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              className="text-[11px] bg-white border border-amber-200 text-amber-950 px-2.5 py-1 rounded-lg font-medium hover:bg-amber-100 transition-colors shadow-2xs"
            >
              💡 {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'chef' && (
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-1 shadow-xs">
                A
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-amber-600 text-white rounded-tr-xs font-medium shadow-xs'
                  : 'bg-stone-100 border border-stone-200 text-stone-800 rounded-tl-xs shadow-xs whitespace-pre-line'
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-stone-700 text-white font-bold flex items-center justify-center text-xs shrink-0 mt-1">
                You
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              A
            </div>
            <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-2xl text-xs font-medium flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-600 rounded-full animate-ping"></div>
              <span>Chef Ammi is thinking of the best kitchen trick...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="pt-3 border-t border-amber-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask Ammi anything e.g., 'How do I soften meat faster?'..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder:text-stone-400"
          />
          <button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
