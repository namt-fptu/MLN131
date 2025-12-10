import React, { useState, useRef, useEffect } from 'react';
import { QuizQuestion } from '../types';

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "Tác phẩm nào đánh dấu sự ra đời của Chủ nghĩa xã hội khoa học?",
    options: ["Hệ tư tưởng Đức", "Tuyên ngôn của Đảng Cộng sản", "Bộ Tư bản", "Gia đình thần thánh"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Đối tượng nghiên cứu của Chủ nghĩa xã hội khoa học là gì?",
    options: [
      "Các quy luật chính trị - xã hội của quá trình phát sinh, hình thành và phát triển của hình thái KT-XH CSCN",
      "Các quy luật kinh tế của chủ nghĩa tư bản",
      "Các quy luật vận động của tự nhiên",
      "Các quy luật của tư duy"
    ],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "Ai là người đã đưa chủ nghĩa xã hội từ lý thuyết thành hiện thực?",
    options: ["C.Mác", "Ph.Ăngghen", "V.I.Lênin", "Hồ Chí Minh"],
    correctAnswer: 2
  }
];

export const Quiz: React.FC = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate progress bar
    if (window.gsap && barRef.current) {
      window.gsap.to(barRef.current, {
        width: `${((currentQ) / questions.length) * 100}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [currentQ]);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);

    const isCorrect = idx === questions[currentQ].correctAnswer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      // Success Animation
      if (window.gsap) {
        // Create particles
        const burst = document.createElement('div');
        burst.style.position = 'absolute';
        burst.style.left = '50%';
        burst.style.top = '50%';
        burst.style.pointerEvents = 'none';
        containerRef.current?.appendChild(burst);

        for (let i = 0; i < 20; i++) {
          const p = document.createElement('div');
          p.style.width = '8px';
          p.style.height = '8px';
          p.style.backgroundColor = i % 2 === 0 ? '#800020' : '#ffffff';
          p.style.position = 'absolute';
          p.style.borderRadius = '50%';
          burst.appendChild(p);

          const angle = Math.random() * Math.PI * 2;
          const velocity = 50 + Math.random() * 100;

          window.gsap.to(p, {
            x: Math.cos(angle) * velocity,
            y: Math.sin(angle) * velocity,
            opacity: 0,
            scale: 0,
            duration: 0.8 + Math.random() * 0.5,
            ease: "power3.out"
          });
        }
        
        setTimeout(() => burst.remove(), 1500);
      }
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      // Fade out current
      if (window.gsap) {
        window.gsap.to(".question-card", {
          x: -50,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            setCurrentQ(c => c + 1);
            setSelected(null);
            window.gsap.fromTo(".question-card", 
              { x: 50, opacity: 0 }, 
              { x: 0, opacity: 1, duration: 0.3 }
            );
          }
        });
      } else {
        setCurrentQ(c => c + 1);
        setSelected(null);
      }
    } else {
      setFinished(true);
      if (window.gsap && barRef.current) {
        window.gsap.to(barRef.current, { width: '100%' });
      }
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-cnxh-black px-6">
        <div className="max-w-md w-full text-center bg-cnxh-gray border border-white/10 p-12 rounded-sm shadow-2xl">
          <h2 className="text-3xl font-serif mb-6 text-white">Kết quả</h2>
          <div className="text-6xl font-bold text-cnxh-red mb-4">{score} / {questions.length}</div>
          <p className="text-gray-400 mb-8">
            {score === questions.length ? "Xuất sắc! Bạn nắm vững kiến thức." : "Hãy ôn tập thêm và thử lại nhé."}
          </p>
          <button 
            onClick={restart}
            className="bg-cnxh-red text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-red-900 transition-colors"
          >
            Làm lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 bg-cnxh-black flex flex-col items-center">
      <div className="max-w-3xl w-full" ref={containerRef}>
        <div className="mb-8 flex items-center justify-between text-sm text-gray-500">
          <span>Câu hỏi {currentQ + 1} / {questions.length}</span>
          <span>Góc ôn tập</span>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-white/10 mb-12 rounded-full overflow-hidden">
          <div ref={barRef} className="h-full bg-cnxh-red w-0"></div>
        </div>

        <div className="question-card">
          <h2 className="text-2xl md:text-3xl font-serif text-white mb-10 leading-relaxed">
            {questions[currentQ].question}
          </h2>

          <div className="space-y-4">
            {questions[currentQ].options.map((option, idx) => {
              let btnClass = "w-full text-left p-6 border transition-all duration-300 rounded-sm relative overflow-hidden group ";
              
              if (selected === null) {
                btnClass += "border-white/10 bg-cnxh-gray hover:border-white/30 hover:bg-[#252525]";
              } else {
                if (idx === questions[currentQ].correctAnswer) {
                  btnClass += "border-green-800 bg-green-900/20 text-green-100";
                } else if (idx === selected) {
                  btnClass += "border-red-800 bg-red-900/20 text-red-100";
                } else {
                  btnClass += "border-white/5 bg-cnxh-gray opacity-50";
                }
              }

              return (
                <button 
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={btnClass}
                >
                  <div className="flex items-start">
                     <span className="mr-4 opacity-50 font-serif italic">{String.fromCharCode(65 + idx)}.</span>
                     <span>{option}</span>
                  </div>
                  
                  {/* Hover effect visual */}
                  {selected === null && (
                    <div className="absolute left-0 top-0 h-full w-1 bg-cnxh-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-10 h-12 flex justify-end">
            {selected !== null && (
              <button 
                onClick={handleNext}
                className="flex items-center space-x-2 text-cnxh-red hover:text-white transition-colors uppercase tracking-widest text-sm font-bold animate-pulse"
              >
                <span>Tiếp tục</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
