import React, { useEffect, useRef, useState } from 'react';
import { ParallelEvent, HistoryTrackType } from '../types';

const PARALLEL_EVENTS: ParallelEvent[] = [
  // Philosophy Track
  { id: 'p1', year: 1848, track: 'philosophy', title: 'Tuyên ngôn ĐCS', description: 'C.Mác & Ăng-ghen công bố văn kiện, khai sinh CNXHKH.' },
  { id: 'p2', year: 1867, track: 'philosophy', title: 'Bộ Tư bản (Tập 1)', description: 'C.Mác công bố công trình nghiên cứu vĩ đại về kinh tế chính trị.' },
  { id: 'p3', year: 1917, track: 'philosophy', title: 'Nhà nước & Cách mạng', description: 'Lênin phát triển lý luận về nhà nước chuyên chính vô sản.' },
  
  // World Track
  { id: 'w1', year: 1871, track: 'world', title: 'Công xã Paris', description: 'Nhà nước vô sản đầu tiên trên thế giới được thành lập.' },
  { id: 'w2', year: 1914, track: 'world', title: 'Thế chiến I bùng nổ', description: 'Cuộc chiến tranh đế quốc quy mô toàn cầu.' },
  { id: 'w3', year: 1917, track: 'world', title: 'CM Tháng 10 Nga', description: 'Cách mạng XHCN thắng lợi, mở ra thời đại mới.' },
  { id: 'w4', year: 1991, track: 'world', title: 'Liên Xô tan rã', description: 'Biến động lớn của hệ thống XHCN thế giới.' },

  // Vietnam Track
  { id: 'v1', year: 1858, track: 'vietnam', title: 'Pháp tấn công Đà Nẵng', description: 'Mở đầu quá trình xâm lược của thực dân Pháp.' },
  { id: 'v2', year: 1911, track: 'vietnam', title: 'Bác Hồ ra đi tìm đường', description: 'Người rời bến cảng Nhà Rồng, bắt đầu hành trình cứu nước.' },
  { id: 'v3', year: 1930, track: 'vietnam', title: 'Thành lập ĐCSVN', description: 'Sự kiện bước ngoặt của cách mạng Việt Nam.' },
  { id: 'v4', year: 1945, track: 'vietnam', title: 'Tuyên ngôn Độc lập', description: 'Khai sinh nước Việt Nam Dân chủ Cộng hòa.' },
  { id: 'v5', year: 1986, track: 'vietnam', title: 'Đại hội VI (Đổi mới)', description: 'Việt Nam bắt đầu công cuộc đổi mới toàn diện.' }
];

// Helper to calculate position based on year (scale: 1 year = 50px)
const getPosition = (year: number, baseYear: number = 1840) => {
  return (year - baseYear) * 60;
};

const EventNode: React.FC<{ event: ParallelEvent; isTop?: boolean }> = ({ event, isTop }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (window.gsap) {
      window.gsap.to(nodeRef.current, {
        scale: 1.5,
        backgroundColor: '#800020',
        borderColor: '#ff0000',
        boxShadow: '0 0 20px #800020',
        duration: 0.3
      });
      window.gsap.to(nodeRef.current?.querySelector('.event-info'), {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: 'auto',
        duration: 0.4,
        ease: 'back.out(1.7)'
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.gsap) {
      window.gsap.to(nodeRef.current, {
        scale: 1,
        backgroundColor: '#1E1E1E',
        borderColor: '#ffffff',
        boxShadow: 'none',
        duration: 0.3
      });
      window.gsap.to(nodeRef.current?.querySelector('.event-info'), {
        opacity: 0,
        y: isTop ? 20 : -20,
        scale: 0.9,
        pointerEvents: 'none',
        duration: 0.3
      });
    }
  };

  return (
    <div 
      className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ left: `${getPosition(event.year)}px` }}
    >
      {/* Node */}
      <div 
        ref={nodeRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-4 h-4 bg-cnxh-gray border-2 border-white rounded-full cursor-pointer relative z-10 transition-colors"
      >
        {/* Info Card (Tooltip) */}
        <div 
          className={`event-info absolute left-1/2 -translate-x-1/2 w-64 bg-cnxh-black/90 backdrop-blur-md border border-cnxh-red p-4 rounded-sm opacity-0 pointer-events-none transform ${isTop ? 'top-8 translate-y-4' : 'bottom-8 -translate-y-4'}`}
        >
          <div className="text-cnxh-red font-bold text-xl font-serif mb-1">{event.year}</div>
          <h4 className="text-white font-bold text-sm mb-2">{event.title}</h4>
          <p className="text-gray-400 text-xs leading-relaxed">{event.description}</p>
        </div>
      </div>
      
      {/* Year Label (Always visible) */}
      <span className={`absolute ${isTop ? '-top-6' : '-bottom-6'} text-xs text-gray-500 font-mono pointer-events-none whitespace-nowrap`}>
        {event.year}
      </span>
    </div>
  );
};

export const ParallelTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const vnRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const philRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger && containerRef.current && trackContainerRef.current) {
      const tl = window.gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000", // Scroll distance
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Deep Parallax: Move tracks at different speeds/distances
      // World History (Top) - Slower
      tl.to(worldRef.current, { x: -2000, ease: "none" }, 0);
      
      // Philosophy (Middle) - Fastest (Center focus)
      tl.to(philRef.current, { x: -3500, ease: "none" }, 0);
      
      // Vietnam (Bottom) - Medium
      tl.to(vnRef.current, { x: -2500, ease: "none" }, 0);

      // Intro Animation for the whole section
      window.gsap.from(trackContainerRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="h-screen bg-cnxh-black flex flex-col justify-center overflow-hidden relative border-t border-b border-white/10">
      <div className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none">
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Đối sánh Lịch sử</h2>
        <p className="text-sm text-gray-500 uppercase tracking-widest">Scroll để khám phá dòng chảy thời gian</p>
      </div>

      <div ref={trackContainerRef} className="relative w-full py-20 flex flex-col gap-24">
        
        {/* Track 1: World History */}
        <div className="relative h-20 w-full">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-32 z-20">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block bg-cnxh-black pr-2">Thế giới</span>
          </div>
          <div ref={worldRef} className="absolute left-40 top-1/2 w-[5000px] h-[1px] bg-white/10 flex items-center">
             {PARALLEL_EVENTS.filter(e => e.track === 'world').map(e => (
               <EventNode key={e.id} event={e} isTop={true} />
             ))}
          </div>
        </div>

        {/* Track 2: Philosophy (Center Highlight) */}
        <div className="relative h-32 w-full bg-gradient-to-r from-transparent via-cnxh-red/5 to-transparent">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-32 z-20">
            <span className="text-cnxh-red text-sm font-bold uppercase tracking-widest block bg-cnxh-black pr-2 border-l-2 border-cnxh-red pl-2">Triết học</span>
          </div>
          <div ref={philRef} className="absolute left-40 top-1/2 w-[5000px] h-[2px] bg-gradient-to-r from-cnxh-red/20 via-cnxh-red to-cnxh-red/20 flex items-center shadow-[0_0_15px_rgba(128,0,32,0.3)]">
             {PARALLEL_EVENTS.filter(e => e.track === 'philosophy').map(e => (
               <EventNode key={e.id} event={e} isTop={true} />
             ))}
          </div>
        </div>

        {/* Track 3: Vietnam History */}
        <div className="relative h-20 w-full">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-32 z-20">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block bg-cnxh-black pr-2">Việt Nam</span>
          </div>
          <div ref={vnRef} className="absolute left-40 top-1/2 w-[5000px] h-[1px] bg-white/10 flex items-center">
             {PARALLEL_EVENTS.filter(e => e.track === 'vietnam').map(e => (
               <EventNode key={e.id} event={e} isTop={false} />
             ))}
          </div>
        </div>

        {/* Vertical Guide Line (Current Time) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-cnxh-red/30 z-0 pointer-events-none"></div>
      </div>
    </div>
  );
};
