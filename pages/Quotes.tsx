import React, { useEffect, useRef, useState } from 'react';
import { QuoteItem } from '../types';

const QUOTES: QuoteItem[] = [
  {
    id: '1',
    text: "Các nhà triết học đã chỉ giải thích thế giới bằng nhiều cách khác nhau, vấn đề là cải tạo thế giới.",
    author: "Karl Marx",
    source: "Luận cương về Feuerbach",
    analysis: "Đây là nguyên lý cốt lõi của triết học Mác, khẳng định vai trò của thực tiễn. Triết học không chỉ là sự chiêm nghiệm thụ động mà phải trở thành công cụ tư tưởng để giai cấp vô sản và nhân dân lao động thay đổi hiện thực xã hội."
  },
  {
    id: '2',
    text: "Học, học nữa, học mãi.",
    author: "V.I. Lênin",
    source: "Lời khuyên thanh niên",
    analysis: "Một chân lý giản dị nhưng sâu sắc về sự vận động không ngừng của tri thức. Trong bối cảnh cách mạng, việc học không chỉ để nâng cao trình độ cá nhân mà còn để xây dựng năng lực làm chủ đất nước, làm chủ xã hội."
  },
  {
    id: '3',
    text: "Không có gì quý hơn độc lập, tự do.",
    author: "Hồ Chí Minh",
    source: "Lời kêu gọi chống Mỹ cứu nước",
    analysis: "Tư tưởng mang tầm vóc thời đại, đúc kết khát vọng ngàn đời của dân tộc Việt Nam và nhân loại tiến bộ. Độc lập, tự do là quyền thiêng liêng, là điều kiện tiên quyết để xây dựng chủ nghĩa xã hội."
  },
  {
    id: '4',
    text: "Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.",
    author: "K. Marx & F. Engels",
    source: "Tuyên ngôn của Đảng Cộng sản",
    analysis: "Mục tiêu tối thượng của Chủ nghĩa Cộng sản: giải phóng con người khỏi mọi áp bức, bóc lột, tha hóa, để mỗi cá nhân có điều kiện phát triển toàn diện, tạo nên sức mạnh tổng hợp của cộng đồng."
  },
  {
    id: '5',
    text: "Thực tiễn là thước đo của chân lý.",
    author: "Triết học Mác - Lênin",
    source: "Lý luận nhận thức",
    analysis: "Mọi lý thuyết đều chỉ là màu xám nếu không được kiểm chứng qua thực tiễn. Thực tiễn không chỉ là cơ sở, động lực của nhận thức mà còn là tiêu chuẩn khách quan duy nhất để đánh giá sự đúng đắn của chân lý."
  },
  {
    id: '6',
    text: "Cách mạng là sự nghiệp của quần chúng.",
    author: "V.I. Lênin",
    source: "Nhà nước và Cách mạng",
    analysis: "Khẳng định vai trò chủ thể của nhân dân trong lịch sử. Đảng lãnh đạo nhưng sức mạnh dời non lấp bể nằm ở lòng dân và sự giác ngộ, hành động của quần chúng lao động."
  }
];

const QuoteCard: React.FC<{ quote: QuoteItem; index: number }> = ({ quote, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Particle Burst Effect
    if (window.gsap && !isOpen) {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Create burst container inside card
      const burstContainer = document.createElement('div');
      burstContainer.style.position = 'absolute';
      burstContainer.style.left = `${clickX}px`;
      burstContainer.style.top = `${clickY}px`;
      burstContainer.style.pointerEvents = 'none';
      burstContainer.style.zIndex = '20';
      cardRef.current?.appendChild(burstContainer);

      // Create particles
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 4 + 2;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.backgroundColor = Math.random() > 0.5 ? '#ffffff' : '#800020'; // White or Burgundy
        p.style.position = 'absolute';
        p.style.borderRadius = '50%';
        p.style.boxShadow = '0 0 10px rgba(255,255,255,0.8)';
        burstContainer.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 60 + Math.random() * 100;

        window.gsap.to(p, {
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity,
          opacity: 0,
          scale: 0,
          duration: 1 + Math.random(),
          ease: "power3.out"
        });
      }

      setTimeout(() => burstContainer.remove(), 2000);
    }

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (window.gsap && analysisRef.current) {
      if (isOpen) {
        window.gsap.fromTo(analysisRef.current,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
      } else {
         window.gsap.to(analysisRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
      }
    }
  }, [isOpen]);

  return (
    <div 
      ref={cardRef}
      onClick={handleClick}
      className="quote-tablet relative bg-[#141414] border border-white/10 p-8 cursor-pointer group overflow-hidden rounded-sm transition-all duration-500 hover:border-white/30"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cnxh-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Stone Texture Overlay (Simulated) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] pointer-events-none"></div>

      <div className="relative z-10 text-center">
        {/* Quote Icon */}
        <div className="text-4xl text-cnxh-red/30 font-serif mb-4">❝</div>

        {/* Text */}
        <h3 className="text-xl md:text-2xl font-serif text-gray-200 italic leading-relaxed mb-6 group-hover:text-white transition-colors">
          "{quote.text}"
        </h3>

        {/* Author Info */}
        <div className="flex flex-col items-center">
          <div className="h-px w-10 bg-cnxh-red mb-3 group-hover:w-20 transition-all duration-300"></div>
          <span className="text-cnxh-red font-bold text-sm uppercase tracking-[0.2em]">{quote.author}</span>
          <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{quote.source}</span>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button 
            className="px-6 py-2 border border-cnxh-red/30 text-cnxh-red text-xs font-bold uppercase tracking-widest hover:bg-cnxh-red hover:text-white transition-all duration-300 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleClick(e);
            }}
          >
            {isOpen ? 'Thu gọn' : 'Xem phân tích'}
          </button>
        </div>

        {/* Analysis Section (Hidden by default) */}
        <div ref={analysisRef} className="h-0 opacity-0 overflow-hidden">
          <div className="pt-8 mt-8 border-t border-white/10 text-left">
            <h4 className="text-white text-sm font-bold uppercase mb-2 flex items-center">
              <span className="w-1.5 h-1.5 bg-cnxh-red rounded-full mr-2"></span>
              Phân tích
            </h4>
            <p className="text-gray-400 text-sm md:text-base leading-loose font-light">
              {quote.analysis}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Quotes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    if (window.gsap && window.ScrollTrigger && containerRef.current) {
      // Use gsap.context for proper cleanup in React strict mode/hot reload
      ctx = window.gsap.context(() => {
        // Use fromTo instead of from to ensure end state opacity is always 1
        window.gsap.fromTo(".quote-tablet", 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".quotes-grid",
              start: "top 90%" // Trigger slightly earlier to ensure visibility
            }
          }
        );
      }, containerRef);
    }

    return () => ctx && ctx.revert(); // Cleanup GSAP animations on unmount
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen pt-32 px-6 bg-cnxh-black pb-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-cnxh-red text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Tinh hoa tư tưởng</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Kho Trích Dẫn</h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Những "bia đá ánh sáng" lưu giữ các nguyên lý nền tảng. Chạm vào từng phiến đá để khám phá tầng sâu ý nghĩa bên trong.
          </p>
        </div>

        <div className="quotes-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {QUOTES.map((quote, index) => (
            <QuoteCard key={quote.id} quote={quote} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
