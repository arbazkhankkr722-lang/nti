
import React, { useState, useEffect, useRef } from 'react';
import { Timer, Zap, Target, RefreshCw } from 'lucide-react';

const TEST_PARAGRAPH = "The quick brown fox jumps over the lazy dog. Programming is the art of algorithm design and implementation. Speed and accuracy are vital for computer operators in the modern information age. Proper finger placement on the keyboard significantly improves your typing words per minute.";

const TypingTest: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let interval: any;
    if (isActive && !endTime) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, endTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setIsActive(true);
    setUserInput(val);

    if (val.length >= TEST_PARAGRAPH.length) {
      setEndTime(Date.now());
      setIsActive(false);
    }
  };

  const calculateWPM = () => {
    if (!startTime || !endTime) return 0;
    const minutes = (endTime - startTime) / 60000;
    const words = userInput.length / 5; // Standard WPM definition is length / 5
    return Math.round(words / minutes);
  };

  const calculateAccuracy = () => {
    if (userInput.length === 0) return 100;
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === TEST_PARAGRAPH[i]) correct++;
    }
    return Math.round((correct / userInput.length) * 100);
  };

  const reset = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setTimer(0);
    setIsActive(false);
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-xl text-center">
            <Timer className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <p className="text-xs text-blue-500 uppercase font-bold">Time</p>
            <p className="text-2xl font-bold text-blue-900">{timer}s</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl text-center">
            <Zap className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-xs text-green-500 uppercase font-bold">WPM</p>
            <p className="text-2xl font-bold text-green-900">{endTime ? calculateWPM() : '---'}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl text-center">
            <Target className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-xs text-purple-500 uppercase font-bold">Accuracy</p>
            <p className="text-2xl font-bold text-purple-900">{calculateAccuracy()}%</p>
          </div>
        </div>

        <div className="relative mb-6">
          <div className="p-6 bg-slate-50 rounded-xl font-mono text-lg leading-relaxed text-slate-400 select-none">
            {TEST_PARAGRAPH.split('').map((char, i) => {
              let color = 'text-slate-400';
              if (i < userInput.length) {
                color = userInput[i] === char ? 'text-green-600' : 'text-red-500 bg-red-100';
              }
              return <span key={i} className={color}>{char}</span>;
            })}
          </div>
        </div>

        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          disabled={!!endTime}
          placeholder="Start typing above..."
          className="w-full h-32 p-4 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none transition-all font-mono text-lg resize-none"
        />

        {endTime && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="p-4 bg-green-100 text-green-700 rounded-lg font-bold text-center w-full">
              Test Completed! Final Score: {calculateWPM()} WPM with {calculateAccuracy()}% Accuracy.
            </div>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;
