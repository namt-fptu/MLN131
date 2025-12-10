import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { label: 'Trang chủ', path: '/' },
  { label: 'Lịch sử', path: '/history' },
  { label: 'Bản đồ tư duy', path: '/mindmap' },
  { label: 'Hỏi đáp AI', path: '/ask' },
  { label: 'Thư viện', path: '/library' },
  { label: 'Trích dẫn', path: '/quotes' },
  { label: 'Ôn tập', path: '/quiz' },
  { label: 'Góc nhìn', path: '/blog' },
];

export const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // GSAP animation for nav appearance
    if (window.gsap) {
      window.gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.gsap) {
      const line = e.currentTarget.querySelector('.nav-line');
      window.gsap.to(line, { width: '100%', duration: 0.3, ease: 'power2.out' });
      window.gsap.to(e.currentTarget, { color: '#ffffff', textShadow: '0 0 8px rgba(255,255,255,0.5)', duration: 0.3 });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.gsap) {
      const line = e.currentTarget.querySelector('.nav-line');
      window.gsap.to(line, { width: '0%', duration: 0.3, ease: 'power2.in' });
      window.gsap.to(e.currentTarget, { color: '#E0E0E0', textShadow: 'none', duration: 0.3 });
    }
  };

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-cnxh-black/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="font-serif text-2xl font-bold tracking-wider text-cnxh-light">
          CNXHKH<span className="text-cnxh-red">.</span>
        </div>
        
        <div className="hidden lg:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `relative py-2 text-xs xl:text-sm uppercase tracking-widest transition-colors ${isActive ? 'text-white font-medium' : 'text-cnxh-light/70'}`
              }
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span 
                    className={`nav-line absolute bottom-0 left-0 h-[1px] bg-cnxh-red transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                  ></span>
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Placeholder */}
        <button className="lg:hidden text-cnxh-light">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </nav>
  );
};
