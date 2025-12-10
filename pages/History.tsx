import React, { useEffect } from 'react';
import { TimelineEvent } from '../types';
import { ParallelTimeline } from '../components/ParallelTimeline';

const timelineEvents: TimelineEvent[] = [
  {
    year: "1848",
    title: "Tuyên ngôn của Đảng Cộng sản",
    description: "C.Mác và Ph.Ăngghen công bố văn kiện cương lĩnh đầu tiên, đánh dấu sự ra đời của Chủ nghĩa xã hội khoa học.",
    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=800"
  },
  {
    year: "1917",
    title: "Cách mạng Tháng Mười Nga",
    description: "V.I.Lênin lãnh đạo giai cấp công nhân Nga hiện thực hóa lý luận thành thực tiễn, mở ra thời đại mới.",
  },
  {
    year: "1930",
    title: "Thành lập Đảng Cộng sản Việt Nam",
    description: "Nguyễn Ái Quốc vận dụng sáng tạo chủ nghĩa Mác-Lênin vào thực tiễn cách mạng Việt Nam.",
  },
  {
    year: "1986",
    title: "Đổi mới tại Việt Nam",
    description: "Đảng Cộng sản Việt Nam khởi xướng công cuộc Đổi mới, phát triển kinh tế thị trường định hướng XHCN.",
  }
];

export const History: React.FC = () => {
  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;

    // Line drawing animation
    window.gsap.from(".timeline-line", {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 60%",
      }
    });

    // Events appearing
    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item, index) => {
      const isEven = index % 2 === 0;
      window.gsap.from(item, {
        x: isEven ? -50 : 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        }
      });
    });

  }, []);

  return (
    <div className="bg-cnxh-black">
      {/* Introduction Section */}
      <div className="min-h-[60vh] pt-32 pb-10 px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Lịch sử Tư tưởng</h1>
          <p className="text-gray-400">Hành trình phát triển từ lý luận đến thực tiễn cách mạng.</p>
        </div>

        <div className="timeline-container relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cnxh-red/20 via-cnxh-red to-cnxh-red/20 -translate-x-1/2 md:translate-x-0"></div>

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`timeline-item flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 relative ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Date Marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-cnxh-black border-2 border-cnxh-red rounded-full z-10 shadow-[0_0_15px_rgba(128,0,32,0.8)]"></div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                  <div className="text-cnxh-red font-bold text-5xl font-serif opacity-20 mb-2">{event.year}</div>
                  <h3 className="text-2xl font-serif text-white mb-3">{event.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">{event.description}</p>
                </div>
                
                {/* Image/Empty Side */}
                <div className="w-full md:w-1/2 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parallel Timeline Section */}
      <ParallelTimeline />
    </div>
  );
};
