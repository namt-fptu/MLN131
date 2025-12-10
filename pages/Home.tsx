import React, { useEffect, useRef } from 'react';

export const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;

    const tl = window.gsap.timeline();

    // Hero Text Stagger
    tl.from(".hero-line", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    });

    // Parallax Effect
    window.gsap.to(".hero-bg", {
      yPercent: 50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Quote Typing Effect Simulation (Staggered Opacity)
    const quoteChars = quoteRef.current?.querySelectorAll('.char');
    if (quoteChars) {
      window.gsap.to(quoteChars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.05,
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top 70%",
        }
      });
    }

    // Feature Cards Stagger
    window.gsap.from(".feature-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 80%",
      }
    });

  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, enter: boolean) => {
    if(window.gsap) {
      window.gsap.to(e.currentTarget, {
        scale: enter ? 1.03 : 1,
        boxShadow: enter ? "0 10px 30px -10px rgba(128, 0, 32, 0.5)" : "0 0 0 0 rgba(0,0,0,0)",
        borderColor: enter ? "#800020" : "rgba(255,255,255,0.1)",
        duration: 0.4
      });
    }
  };

  const quoteText = "Sự phát triển tự do của mỗi người là điều kiện cho sự phát triển tự do của tất cả mọi người.";
  const quoteAuthor = "— Tuyên ngôn của Đảng Cộng sản";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="hero-bg absolute inset-0 z-0 bg-cover bg-center opacity-40"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
            filter: 'grayscale(100%) sepia(20%) hue-rotate(320deg) saturate(150%)' 
          }}
        ></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-cnxh-black/50 via-cnxh-black/20 to-cnxh-black"></div>

        {/* Content */}
        <div ref={heroTextRef} className="relative z-10 text-center px-6 max-w-4xl">
          <p className="hero-line text-cnxh-red text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-6">Giáo dục Chính trị & Tư tưởng</p>
          <h1 className="hero-line font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
            Chủ nghĩa <br /> 
            <span className="italic font-light text-white/90">Xã hội Khoa học</span>
          </h1>
          <p className="hero-line text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Khám phá nền tảng lý luận, sứ mệnh lịch sử và giá trị thời đại của học thuyết Mác - Lênin trong thế kỷ 21.
          </p>
          <div className="hero-line mt-12">
            <button className="group relative px-8 py-3 bg-transparent border border-white/20 overflow-hidden rounded-sm transition-all hover:border-cnxh-red">
              <span className="absolute inset-0 w-0 bg-cnxh-red transition-all duration-[250ms] ease-out group-hover:w-full"></span>
              <span className="relative text-sm tracking-widest uppercase font-medium group-hover:text-white">Bắt đầu học</span>
            </button>
          </div>
        </div>
      </section>

      {/* Daily Quote Section */}
      <section className="py-24 bg-cnxh-black relative flex items-center justify-center">
        <div ref={quoteRef} className="max-w-4xl px-6 text-center">
          <div className="text-4xl md:text-5xl lg:text-6xl font-serif text-cnxh-light leading-snug">
            "
            {quoteText.split('').map((char, index) => (
              <span key={index} className="char opacity-0 inline-block" style={{ minWidth: char === ' ' ? '10px' : '0' }}>{char}</span>
            ))}
            "
          </div>
          <div className="mt-8 text-cnxh-red text-sm tracking-widest uppercase font-medium opacity-0 char" style={{transitionDelay: '1s'}}>
            {quoteAuthor}
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section ref={featureRef} className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl font-serif text-white mb-2">Bài viết nổi bật</h2>
            <div className="h-1 w-20 bg-cnxh-red"></div>
          </div>
          <a href="/blog" className="text-sm text-gray-400 hover:text-cnxh-red transition-colors">Xem tất cả &rarr;</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="feature-card group cursor-pointer border border-white/10 bg-cnxh-gray p-6 rounded-sm relative overflow-hidden"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-cnxh-red">
                  <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/>
                </svg>
              </div>
              <div className="text-cnxh-red text-xs font-bold tracking-widest mb-4">LÝ LUẬN</div>
              <h3 className="text-xl font-serif text-white mb-4 group-hover:text-cnxh-red transition-colors">
                {item === 1 ? "Sứ mệnh lịch sử của giai cấp công nhân" : 
                 item === 2 ? "Dân chủ xã hội chủ nghĩa trong thời đại mới" : 
                 "Vấn đề dân tộc và tôn giáo ở Việt Nam"}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Phân tích sâu sắc về vai trò và vị trí của các yếu tố cốt lõi trong cấu trúc xã hội hiện đại...
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <span>5 phút đọc</span>
                <span className="mx-2">•</span>
                <span>Tác giả: Ban Biên Tập</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
