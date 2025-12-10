import React, { useEffect } from 'react';
import { LibraryTopic } from '../types';

const topics: LibraryTopic[] = [
  { id: '1', title: 'Sứ mệnh giai cấp công nhân', description: 'Nội dung cốt lõi của CNXHKH, làm sáng tỏ vai trò lãnh đạo cách mạng.', icon: 'M' },
  { id: '2', title: 'CNXH & Thời kỳ quá độ', description: 'Tính tất yếu, đặc điểm và các quy luật của quá trình chuyển biến.', icon: 'T' },
  { id: '3', title: 'Dân chủ XHCN', description: 'Bản chất, chức năng và mối quan hệ với nhà nước pháp quyền.', icon: 'D' },
  { id: '4', title: 'Liên minh giai cấp', description: 'Cơ sở chính trị - xã hội của khối đại đoàn kết toàn dân.', icon: 'L' },
  { id: '5', title: 'Vấn đề dân tộc', description: 'Nguyên tắc giải quyết vấn đề dân tộc của chủ nghĩa Mác - Lênin.', icon: 'V' },
  { id: '6', title: 'Vấn đề tôn giáo', description: 'Quan điểm lịch sử, cụ thể trong giải quyết tín ngưỡng, tôn giáo.', icon: 'R' },
];

export const Library: React.FC = () => {
  useEffect(() => {
    if (window.gsap) {
      window.gsap.from(".lib-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
           trigger: ".lib-grid",
           start: "top 85%"
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen pt-32 px-6 bg-cnxh-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-serif text-4xl text-white mb-2">Thư viện Kiến thức</h1>
            <p className="text-gray-400">Hệ thống lý luận cơ bản và chuyên sâu.</p>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <input 
              type="text" 
              placeholder="Tìm kiếm chủ đề..." 
              className="w-full bg-cnxh-gray border border-white/10 rounded-sm px-4 py-3 pl-10 text-white focus:outline-none focus:border-cnxh-red transition-colors"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-cnxh-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </header>

        <div className="lib-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div 
              key={topic.id}
              className="lib-card group relative bg-[#151515] p-8 border border-white/5 hover:border-cnxh-red/50 transition-colors duration-300 cursor-pointer overflow-hidden"
              onMouseEnter={(e) => {
                window.gsap && window.gsap.to(e.currentTarget, { y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8)' })
              }}
              onMouseLeave={(e) => {
                window.gsap && window.gsap.to(e.currentTarget, { y: 0, boxShadow: 'none' })
              }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-serif font-bold group-hover:text-cnxh-red group-hover:opacity-10 transition-all duration-500">
                {topic.icon}
              </div>
              
              <div className="relative z-10">
                <div className="w-10 h-1 bg-cnxh-red mb-6 w-0 group-hover:w-10 transition-all duration-500"></div>
                <h3 className="text-xl font-serif text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">{topic.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                  {topic.description}
                </p>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs uppercase tracking-widest text-cnxh-red">Khám phá</span>
                  <span className="text-lg text-white group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
