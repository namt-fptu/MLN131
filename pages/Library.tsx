import React, { useEffect, useState, useRef } from 'react';
import { LibraryTopic } from '../types';

interface TopicDetail extends LibraryTopic {
  content: string;
  keyPoints: string[];
  relatedTopics: string[];
}

const topicsData: TopicDetail[] = [
  { 
    id: '1', 
    title: 'Sứ mệnh giai cấp công nhân', 
    description: 'Nội dung cốt lõi của CNXHKH, làm sáng tỏ vai trò lãnh đạo cách mạng.', 
    icon: '⚒',
    content: `Giai cấp công nhân là giai cấp tiên tiến nhất, cách mạng nhất trong xã hội hiện đại. C.Mác và Ph.Ăngghen đã chứng minh rằng giai cấp công nhân có sứ mệnh lịch sử thế giới là xoá bỏ chế độ tư bản chủ nghĩa, xoá bỏ chế độ người bóc lột người, giải phóng giai cấp công nhân, nhân dân lao động và toàn thể nhân loại khỏi mọi sự áp bức, bóc lột, nghèo nàn lạc hậu, xây dựng xã hội cộng sản chủ nghĩa văn minh.`,
    keyPoints: [
      'Giai cấp công nhân là sản phẩm của nền đại công nghiệp',
      'Đại diện cho lực lượng sản xuất tiên tiến nhất',
      'Có lợi ích cơ bản thống nhất với lợi ích của nhân dân lao động',
      'Có hệ tư tưởng riêng là chủ nghĩa Mác - Lênin',
      'Có chính đảng lãnh đạo là Đảng Cộng sản'
    ],
    relatedTopics: ['CNXH & Thời kỳ quá độ', 'Liên minh giai cấp']
  },
  { 
    id: '2', 
    title: 'CNXH & Thời kỳ quá độ', 
    description: 'Tính tất yếu, đặc điểm và các quy luật của quá trình chuyển biến.', 
    icon: '⏳',
    content: `Thời kỳ quá độ lên chủ nghĩa xã hội là thời kỳ cải biến cách mạng từ xã hội cũ sang xã hội mới - xã hội xã hội chủ nghĩa. Đây là thời kỳ lịch sử đặc biệt, bắt đầu từ khi giai cấp công nhân giành được chính quyền và kết thúc khi xây dựng xong về cơ bản cơ sở vật chất - kỹ thuật của chủ nghĩa xã hội.`,
    keyPoints: [
      'Tính tất yếu khách quan của thời kỳ quá độ',
      'Đặc điểm: Đấu tranh giữa cái cũ và cái mới',
      'Nhiệm vụ: Xây dựng cơ sở vật chất - kỹ thuật',
      'Phát triển lực lượng sản xuất hiện đại',
      'Xây dựng quan hệ sản xuất mới XHCN'
    ],
    relatedTopics: ['Sứ mệnh giai cấp công nhân', 'Dân chủ XHCN']
  },
  { 
    id: '3', 
    title: 'Dân chủ XHCN', 
    description: 'Bản chất, chức năng và mối quan hệ với nhà nước pháp quyền.', 
    icon: '🏛',
    content: `Dân chủ xã hội chủ nghĩa là nền dân chủ của nhân dân lao động, do nhân dân lao động và vì nhân dân lao động. Đây là nền dân chủ cao hơn về chất so với dân chủ tư sản, bởi nó thể hiện quyền lực thực sự thuộc về nhân dân trong mọi lĩnh vực của đời sống xã hội.`,
    keyPoints: [
      'Bản chất giai cấp công nhân',
      'Dân chủ trên mọi lĩnh vực: Kinh tế, Chính trị, Văn hóa - Xã hội',
      'Nhà nước pháp quyền XHCN',
      'Quyền làm chủ của nhân dân',
      'Thực hiện nguyên tắc tập trung dân chủ'
    ],
    relatedTopics: ['CNXH & Thời kỳ quá độ', 'Liên minh giai cấp']
  },
  { 
    id: '4', 
    title: 'Liên minh giai cấp', 
    description: 'Cơ sở chính trị - xã hội của khối đại đoàn kết toàn dân.', 
    icon: '🤝',
    content: `Liên minh giai cấp, tầng lớp là sự kết hợp giữa giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức, tạo nên nền tảng chính trị - xã hội vững chắc cho công cuộc xây dựng và bảo vệ Tổ quốc xã hội chủ nghĩa.`,
    keyPoints: [
      'Liên minh công - nông - trí thức',
      'Giai cấp công nhân lãnh đạo liên minh',
      'Cơ sở: Thống nhất lợi ích căn bản',
      'Nền tảng của khối đại đoàn kết toàn dân',
      'Điều kiện thắng lợi của cách mạng XHCN'
    ],
    relatedTopics: ['Sứ mệnh giai cấp công nhân', 'Dân chủ XHCN']
  },
  { 
    id: '5', 
    title: 'Vấn đề dân tộc', 
    description: 'Nguyên tắc giải quyết vấn đề dân tộc của chủ nghĩa Mác - Lênin.', 
    icon: '🌍',
    content: `Chủ nghĩa Mác - Lênin khẳng định các dân tộc hoàn toàn bình đẳng, có quyền tự quyết và liên hiệp công nhân tất cả các dân tộc. Đây là những nguyên tắc cơ bản trong giải quyết vấn đề dân tộc, đảm bảo quyền lợi chính đáng của mọi dân tộc.`,
    keyPoints: [
      'Các dân tộc hoàn toàn bình đẳng',
      'Các dân tộc có quyền tự quyết',
      'Liên hiệp công nhân tất cả các dân tộc',
      'Chống chủ nghĩa dân tộc lớn',
      'Chống chủ nghĩa dân tộc hẹp hòi'
    ],
    relatedTopics: ['Vấn đề tôn giáo', 'Liên minh giai cấp']
  },
  { 
    id: '6', 
    title: 'Vấn đề tôn giáo', 
    description: 'Quan điểm lịch sử, cụ thể trong giải quyết tín ngưỡng, tôn giáo.', 
    icon: '☯',
    content: `Chủ nghĩa Mác - Lênin có thái độ khoa học đối với tôn giáo: Tôn trọng quyền tự do tín ngưỡng của nhân dân, đồng thời tuyên truyền thế giới quan duy vật. Việc giải quyết vấn đề tôn giáo phải gắn liền với cải tạo xã hội, nâng cao đời sống vật chất và tinh thần của nhân dân.`,
    keyPoints: [
      'Tôn giáo là hiện tượng xã hội có tính lịch sử',
      'Tôn trọng quyền tự do tín ngưỡng',
      'Tách biệt nhà nước và giáo hội',
      'Đoàn kết lương - giáo',
      'Đấu tranh chống lợi dụng tôn giáo'
    ],
    relatedTopics: ['Vấn đề dân tộc', 'Dân chủ XHCN']
  },
];

export const Library: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<TopicDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const filteredTopics = topicsData.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      // Ensure cards are visible first, then animate
      const cards = document.querySelectorAll('.lib-card');
      cards.forEach(card => {
        (card as HTMLElement).style.opacity = '1';
        (card as HTMLElement).style.transform = 'translateY(0)';
      });
    }
  }, [filteredTopics]);

  // Modal open/close animation
  useEffect(() => {
    if (selectedTopic && window.gsap && modalRef.current) {
      window.gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [selectedTopic]);

  const closeModal = () => {
    if (window.gsap && modalRef.current) {
      window.gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => setSelectedTopic(null)
      });
    } else {
      setSelectedTopic(null);
    }
  };

  const openRelatedTopic = (title: string) => {
    const topic = topicsData.find(t => t.title === title);
    if (topic) setSelectedTopic(topic);
  };

  return (
    <div className="min-h-screen pt-32 px-6 bg-cnxh-black pb-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-cnxh-red text-xs font-bold uppercase tracking-[0.3em] mb-4">Học liệu & Tài nguyên</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-2">Thư viện Kiến thức</h1>
            <p className="text-gray-400 text-lg">Hệ thống lý luận cơ bản và chuyên sâu về Chủ nghĩa Xã hội Khoa học.</p>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm chủ đề..." 
              className="w-full bg-cnxh-gray border border-white/10 rounded-sm px-4 py-3 pl-10 text-white focus:outline-none focus:border-cnxh-red transition-colors"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 group-focus-within:text-cnxh-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </header>

        {/* Stats Bar */}
        <div className="flex flex-wrap gap-8 mb-12 pb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cnxh-red/10 flex items-center justify-center">
              <span className="text-cnxh-red text-lg">📚</span>
            </div>
            <div>
              <p className="text-white font-bold text-xl">{topicsData.length}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Chủ đề</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <span className="text-blue-400 text-lg">💡</span>
            </div>
            <div>
              <p className="text-white font-bold text-xl">{topicsData.reduce((acc, t) => acc + t.keyPoints.length, 0)}</p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Ý chính</p>
            </div>
          </div>
        </div>

        <div className="lib-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, index) => (
            <div 
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="lib-card group relative bg-gradient-to-br from-[#151515] to-[#0d0d0d] p-8 border border-white/5 hover:border-cnxh-red/50 transition-all duration-300 cursor-pointer overflow-hidden rounded-sm"
              style={{ opacity: 1, transform: 'translateY(0)', animationDelay: `${index * 0.1}s` }}
              onMouseEnter={(e) => {
                if (window.gsap) window.gsap.to(e.currentTarget, { y: -5, boxShadow: '0 20px 40px -10px rgba(128,0,32,0.3)' })
              }}
              onMouseLeave={(e) => {
                if (window.gsap) window.gsap.to(e.currentTarget, { y: 0, boxShadow: 'none' })
              }}
            >
              <div className="absolute top-4 right-4 text-4xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                {topic.icon}
              </div>
              
              <div className="relative z-10">
                <div className="h-1 bg-cnxh-red mb-6 w-0 group-hover:w-16 transition-all duration-500 rounded-full"></div>
                <h3 className="text-xl font-serif text-white mb-3 group-hover:text-cnxh-red transition-colors duration-300">{topic.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 line-clamp-2">
                  {topic.description}
                </p>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{topic.keyPoints.length} ý chính</span>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-cnxh-red flex items-center gap-2 group-hover:gap-3 transition-all">
                    Xem chi tiết 
                    <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Không tìm thấy chủ đề phù hợp với "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedTopic && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 rounded-sm max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10 p-6 flex items-start justify-between z-10">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{selectedTopic.icon}</span>
                <div>
                  <h2 className="text-2xl font-serif text-white">{selectedTopic.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{selectedTopic.description}</p>
                </div>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-cnxh-red/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Main Content */}
              <div>
                <h3 className="text-cnxh-red text-xs font-bold uppercase tracking-[0.2em] mb-4">Nội dung chính</h3>
                <p className="text-gray-300 leading-relaxed text-lg">{selectedTopic.content}</p>
              </div>

              {/* Key Points */}
              <div>
                <h3 className="text-cnxh-red text-xs font-bold uppercase tracking-[0.2em] mb-4">Các ý chính</h3>
                <ul className="space-y-3">
                  {selectedTopic.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <span className="w-6 h-6 rounded-full bg-cnxh-red/20 text-cnxh-red text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Topics */}
              <div>
                <h3 className="text-cnxh-red text-xs font-bold uppercase tracking-[0.2em] mb-4">Chủ đề liên quan</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedTopic.relatedTopics.map((title, idx) => (
                    <button
                      key={idx}
                      onClick={() => openRelatedTopic(title)}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-cnxh-red/10 hover:border-cnxh-red/50 hover:text-white transition-all"
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-[#1a1a1a]/95 backdrop-blur-md border-t border-white/10 p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-cnxh-red text-white text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-colors rounded-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
