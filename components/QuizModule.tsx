
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { storageService } from '../services/storage';
import { CheckCircle, ChevronRight, RotateCcw, Award as AwardIcon } from 'lucide-react';

const QuizModule: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    const saved = storageService.getQuiz();
    if (saved && saved.length > 0) {
      setQuestions(saved);
    }
  }, []);

  const handleNext = () => {
    if (selectedOption === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
  };

  if (questions.length === 0) {
    return <div className="text-center py-20 bg-white rounded-3xl border"> <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No Quiz Questions Available in Database</p> </div>;
  }

  if (showResult) {
    return (
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-500">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full mb-8 shadow-inner">
          <AwardIcon className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-2 italic tracking-tighter uppercase">Evaluation Complete</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest mb-10">Official Performance Score</p>
        <div className="text-7xl font-black text-emerald-600 mb-12 tracking-tighter italic">
          {score} <span className="text-3xl text-slate-300 font-bold">/ {questions.length}</span>
        </div>
        <button
          onClick={resetQuiz}
          className="flex items-center gap-4 mx-auto px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl"
        >
          <RotateCcw className="w-5 h-5" /> Retake Evaluation
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
        <div className="flex justify-between items-center mb-10">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Assessment Session</span>
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
          <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-10 italic tracking-tight leading-tight">
          {currentQ.question}
        </h3>

        <div className="space-y-4">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              className={`w-full p-6 text-left rounded-2xl border-2 transition-all flex justify-between items-center font-bold ${
                selectedOption === idx 
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-md' 
                  : 'border-slate-50 hover:border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              <span>{option}</span>
              {selectedOption === idx && <CheckCircle className="w-6 h-6 text-emerald-500" />}
            </button>
          ))}
        </div>

        <button
          disabled={selectedOption === null}
          onClick={handleNext}
          className="mt-12 w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest flex items-center justify-center gap-4 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black transition-all shadow-2xl"
        >
          {currentIndex + 1 === questions.length ? 'Finalize Assessment' : 'Proceed to Next Segment'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default QuizModule;
