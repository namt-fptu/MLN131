import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-cnxh-gray border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-xl text-white mb-4">Về dự án</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Một nỗ lực số hóa và hiện đại hóa việc giảng dạy, học tập Chủ nghĩa Xã hội Khoa học, 
            nhằm lan tỏa những giá trị cốt lõi đến thế hệ trẻ.
          </p>
        </div>
        
        <div>
          <h3 className="font-serif text-xl text-white mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-cnxh-red transition-colors">Tài liệu tham khảo</a></li>
            <li><a href="#" className="hover:text-cnxh-red transition-colors">Đóng góp ý kiến</a></li>
            <li><a href="#" className="hover:text-cnxh-red transition-colors">Liên hệ giảng viên</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl text-white mb-4">Newsletter</h3>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email của bạn"
              className="w-full bg-black/30 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-cnxh-red transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-cnxh-red font-bold uppercase hover:text-white transition-colors">
              Gửi
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
        &copy; 2024 Khoa Lý luận Chính trị. Designed with Philosophy & Code.
      </div>
    </footer>
  );
};
