import React, { useState, useEffect, useRef } from 'react';
import { BlogPost, Comment } from '../types';

// --- MOCK DATA ---
const POSTS: BlogPost[] = [
  {
    id: '1',
    title: "Chuyển đổi số và sự thích ứng của Kiến trúc thượng tầng",
    excerpt: "Phân tích tác động của cuộc cách mạng công nghiệp 4.0 đến phương thức quản lý nhà nước và cấu trúc xã hội trong bối cảnh mới.",
    content: `
      <p class="mb-4">Cuộc cách mạng công nghiệp lần thứ tư với trọng tâm là chuyển đổi số đang tạo ra những thay đổi sâu sắc trong cơ sở hạ tầng kinh tế. Điều này tất yếu dẫn đến những biến đổi tương ứng trong kiến trúc thượng tầng.</p>
      <p class="mb-4">Thứ nhất, chuyển đổi số làm thay đổi phương thức quản trị quốc gia. Nhà nước pháp quyền XHCN đang dần chuyển dịch sang mô hình Chính phủ số, nơi dữ liệu trở thành tài nguyên quan trọng để ra quyết định.</p>
      <p class="mb-4">Thứ hai, không gian mạng trở thành một mặt trận tư tưởng mới. Việc bảo vệ nền tảng tư tưởng của Đảng trên không gian số đòi hỏi những phương pháp tiếp cận vừa kiên định về nguyên tắc, vừa linh hoạt về sách lược.</p>
      <h3 class="text-xl font-serif text-white mt-8 mb-4">Thách thức và Cơ hội</h3>
      <p class="mb-4">Cơ hội nằm ở việc minh bạch hóa thông tin và tăng cường sự tham gia của người dân. Tuy nhiên, thách thức về an ninh phi truyền thống cũng ngày càng hiện hữu rõ nét hơn bao giờ hết.</p>
    `,
    author: "Tiến sĩ Trần Văn A",
    date: "15/03/2024",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
    tags: ["Chuyển đổi số", "Triết học", "Xã hội học"]
  },
  {
    id: '2',
    title: "Giữ gìn bản sắc văn hóa dân tộc trong thời kỳ hội nhập",
    excerpt: "Văn hóa là hồn cốt của dân tộc. Làm thế nào để 'hòa nhập mà không hòa tan' là câu hỏi lớn trong thời đại toàn cầu hóa.",
    content: `
      <p class="mb-4">Văn hóa không chỉ là di sản của quá khứ mà còn là động lực của sự phát triển trong tương lai. Trong tư tưởng Hồ Chí Minh, văn hóa soi đường cho quốc dân đi.</p>
      <p class="mb-4">Toàn cầu hóa mang lại cơ hội giao lưu, học hỏi tinh hoa nhân loại, nhưng cũng đặt ra nguy cơ xâm lăng văn hóa. Việc xây dựng nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc là nhiệm vụ cấp bách.</p>
    `,
    author: "Nguyễn Thị B",
    date: "10/03/2024",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200",
    tags: ["Văn hóa", "Hội nhập"]
  },
  {
    id: '3',
    title: "Kinh tế thị trường định hướng XHCN: Lý luận và Thực tiễn",
    excerpt: "Tổng kết 35 năm đổi mới và những thành tựu trong việc vận dụng sáng tạo chủ nghĩa Mác - Lênin vào phát triển kinh tế.",
    content: `
      <p class="mb-4">Mô hình kinh tế thị trường định hướng XHCN là một đột phá lý luận của Đảng ta. Đó là nền kinh tế vận hành đầy đủ, đồng bộ theo các quy luật của kinh tế thị trường, đồng thời có sự quản lý của Nhà nước pháp quyền XHCN.</p>
      <p class="mb-4">Thực tiễn đã chứng minh tính đúng đắn của đường lối này qua sự tăng trưởng vượt bậc của quy mô nền kinh tế và đời sống nhân dân.</p>
    `,
    author: "Lê Văn C",
    date: "01/03/2024",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    tags: ["Kinh tế", "Đổi mới"]
  }
];

const COMMENTS_MOCK: Comment[] = [
  { id: 'c1', author: 'Minh Tuấn', avatar: 'https://i.pravatar.cc/150?u=1', content: 'Bài viết rất sâu sắc, đặc biệt là phần phân tích về Chính phủ số. Tôi nghĩ chúng ta cần thêm các ví dụ thực tiễn.', date: '2 giờ trước', likes: 12 },
  { id: 'c2', author: 'Lan Anh', avatar: 'https://i.pravatar.cc/150?u=2', content: 'Đồng ý với tác giả. Việc giữ gìn bản sắc không có nghĩa là khép kín, mà là tiếp thu có chọn lọc.', date: '5 giờ trước', likes: 8 },
  { id: 'c3', author: 'Hoàng Nam', avatar: 'https://i.pravatar.cc/150?u=3', content: 'Cảm ơn ban biên tập đã chia sẻ những kiến thức bổ ích này.', date: '1 ngày trước', likes: 5 },
];

// --- COMPONENTS ---

const RippleButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const circle = document.createElement('span');
    circle.style.position = 'absolute';
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.width = '0px';
    circle.style.height = '0px';
    circle.style.borderRadius = '50%';
    circle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    circle.style.pointerEvents = 'none';
    
    btn.appendChild(circle);

    if (window.gsap) {
      window.gsap.to(circle, {
        width: '300px',
        height: '300px',
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => circle.remove()
      });
    }

    onClick();
  };

  return (
    <button 
      ref={btnRef}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </button>
  );
};

const PostDetail: React.FC<{ post: BlogPost; onClose: () => void }> = ({ post, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Entry animation
    if (window.gsap) {
      const tl = window.gsap.timeline();
      
      tl.from(containerRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
      .from(".detail-content > *", {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4
      }, "-=0.2");

      // Comments animation (Simulate loading)
      window.gsap.fromTo(".comment-item", 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 0.5, 
          ease: "back.out(1.7)",
          delay: 0.8 
        }
      );
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    if (window.gsap) {
      window.gsap.to(containerRef.current, {
        y: '50px',
        opacity: 0,
        duration: 0.3,
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex justify-center overflow-y-auto">
      <div 
        ref={containerRef}
        className="bg-[#121212] w-full max-w-4xl min-h-screen md:min-h-0 md:mt-10 md:mb-10 md:rounded-lg shadow-2xl relative flex flex-col"
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-cnxh-red transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 w-full shrink-0 overflow-hidden md:rounded-t-lg">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <div className="flex gap-2 mb-3">
              {post.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-cnxh-red/80 text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-2">{post.title}</h1>
            <div className="flex items-center text-gray-400 text-sm">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 detail-content">
          <div 
            className="prose prose-invert prose-lg max-w-none font-sans text-gray-300 leading-loose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>

        {/* Comments Section (Simulated Disqus) */}
        <div ref={commentRef} className="bg-[#0a0a0a] p-8 md:p-12 border-t border-white/5 md:rounded-b-lg flex-grow">
          <h3 className="text-xl font-serif text-white mb-8 flex items-center">
            Bình luận <span className="ml-2 text-sm bg-white/10 px-2 py-0.5 rounded-full text-gray-400">{COMMENTS_MOCK.length}</span>
          </h3>
          
          {/* Fake Input */}
          <div className="flex gap-4 mb-10">
            <div className="w-10 h-10 rounded-full bg-cnxh-red/20 flex items-center justify-center text-cnxh-red font-bold">
              T
            </div>
            <div className="flex-1 relative">
              <textarea 
                placeholder="Tham gia thảo luận..." 
                className="w-full bg-[#1a1a1a] border border-white/10 rounded p-4 text-white focus:outline-none focus:border-cnxh-red transition-colors min-h-[100px] resize-none"
              ></textarea>
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button className="text-xs uppercase font-bold text-gray-500 hover:text-white transition-colors">Hủy</button>
                <button className="text-xs uppercase font-bold bg-cnxh-red text-white px-4 py-1.5 rounded hover:bg-red-900 transition-colors">Gửi</button>
              </div>
            </div>
          </div>

          {/* Comment List */}
          <div className="space-y-8">
            {COMMENTS_MOCK.map((comment) => (
              <div key={comment.id} className="comment-item flex gap-4">
                <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-white text-sm">{comment.author}</h4>
                    <span className="text-xs text-gray-500">{comment.date}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{comment.content}</p>
                  <div className="flex gap-4 text-xs font-bold text-gray-600">
                    <button className="hover:text-cnxh-red flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                      {comment.likes}
                    </button>
                    <button className="hover:text-white">Trả lời</button>
                    <button className="hover:text-white">Chia sẻ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.from(".blog-post-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".blog-list",
          start: "top 80%"
        }
      });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector('img');
    const rect = e.currentTarget.getBoundingClientRect();
    if (!img) return;

    // Calculate mouse position relative to center of the card
    // x, y range from -1 to 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    if (window.gsap) {
      // Move image slightly in opposite direction for depth
      window.gsap.to(img, {
        x: -x * 15, // Move up to 15px
        y: -y * 15,
        scale: 1.15, // Zoom in to avoid edges
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector('img');
    if (window.gsap && img) {
      window.gsap.to(img, {
        x: 0,
        y: 0,
        scale: 1.0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="min-h-screen pt-32 px-6 bg-cnxh-black pb-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
           <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Góc nhìn & Phân tích</h1>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg">
             Diễn đàn trao đổi học thuật, phân tích sâu về các vấn đề lý luận và thực tiễn trong xây dựng CNXH.
           </p>
        </div>

        {/* Blog List */}
        <div className="blog-list space-y-16">
          {POSTS.map((post) => (
            <div key={post.id} className="blog-post-card flex flex-col md:flex-row gap-8 items-center group">
              {/* Thumbnail with Parallax Hover */}
              <div 
                className="w-full md:w-1/2 h-64 md:h-80 overflow-hidden rounded-sm relative cursor-pointer"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedPost(post)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform will-change-transform"
                />
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <div className="flex gap-3 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-cnxh-red text-xs font-bold uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
                <h2 
                  onClick={() => setSelectedPost(post)}
                  className="text-2xl md:text-3xl font-serif text-white mb-4 cursor-pointer hover:text-cnxh-red transition-colors leading-tight"
                >
                  {post.title}
                </h2>
                <div className="flex items-center text-gray-500 text-xs mb-6 uppercase tracking-wider font-medium">
                  <span>{post.date}</span>
                  <span className="mx-2">|</span>
                  <span>{post.author}</span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <RippleButton 
                  onClick={() => setSelectedPost(post)}
                  className="px-6 py-2 border border-white/20 text-sm text-white hover:bg-white hover:text-black transition-colors uppercase tracking-widest font-bold"
                >
                  Đọc tiếp
                </RippleButton>
              </div>
            </div>
          ))}
        </div>

        {/* Loading / End */}
        <div className="mt-20 text-center">
          <div className="inline-block w-2 h-2 bg-cnxh-red rounded-full animate-bounce mr-1"></div>
          <div className="inline-block w-2 h-2 bg-cnxh-red rounded-full animate-bounce mr-1 delay-100"></div>
          <div className="inline-block w-2 h-2 bg-cnxh-red rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};
