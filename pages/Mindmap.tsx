import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MindmapNodeData } from '../types';

// --- MINDMAP DATA with detailed content ---
interface MindmapNodeDetail extends MindmapNodeData {
  content?: string;
  keyPoints?: string[];
  relatedTopics?: string[];
  image?: string;
  children?: MindmapNodeDetail[];
}

const MINDMAP_DATA: MindmapNodeDetail = {
  id: 'root',
  label: 'CNXHKH',
  description: 'Hệ thống lý luận về sự chuyển biến từ CNTB lên CNXH.',
  content: 'Chủ nghĩa xã hội khoa học là một trong ba bộ phận cấu thành chủ nghĩa Mác - Lênin, nghiên cứu sự vận động của xã hội trong giai đoạn quá độ từ chủ nghĩa tư bản lên chủ nghĩa cộng sản.',
  keyPoints: ['Ba bộ phận: Triết học, Kinh tế chính trị, CNXHKH', 'Do C.Mác và Ph.Ăngghen sáng lập', 'V.I.Lênin bảo vệ và phát triển', 'Hồ Chí Minh vận dụng sáng tạo vào Việt Nam'],
  image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
  children: [
    {
      id: 'history',
      label: 'Lịch sử Tư tưởng',
      description: 'Quá trình hình thành và phát triển.',
      content: 'Chủ nghĩa xã hội khoa học ra đời vào những năm 40 của thế kỷ XIX, khi chủ nghĩa tư bản phát triển mạnh mẽ và những mâu thuẫn xã hội ngày càng gay gắt.',
      keyPoints: ['CNXH không tưởng: Tiền đề tư tưởng', 'C.Mác - Ph.Ăngghen: Người sáng lập', 'V.I.Lênin: Phát triển trong thời đại mới', 'Hồ Chí Minh: Vận dụng vào Việt Nam'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      children: [
        { id: 'h1', label: 'CNXH Không tưởng', description: 'Saint-Simon, Charles Fourier, Robert Owen', content: 'Chủ nghĩa xã hội không tưởng phê phán xã hội tư bản nhưng chưa tìm ra con đường và lực lượng xã hội để thực hiện lý tưởng. Các nhà tư tưởng như Saint-Simon (1760-1825), Charles Fourier (1772-1837), Robert Owen (1771-1858) đã vẽ ra bức tranh về một xã hội không có bóc lột, nhưng họ không thấy vai trò của giai cấp công nhân.', keyPoints: ['Phê phán CNTB sâu sắc', 'Chưa thấy vai trò giai cấp công nhân', 'Mơ ước về xã hội lý tưởng', 'Thiếu cơ sở khoa học'], examples: ['Saint-Simon đề xuất xã hội do các nhà công nghiệp quản lý', 'Fourier xây dựng mô hình "phalangère" - cộng đồng sản xuất tự nguyện', 'Owen lập các công xã lao động ở New Harmony (Mỹ)'], relatedTopics: ['C.Mác', 'Ph.Ăngghen', 'Triết học cổ điển Đức'] },
        { id: 'h2', label: 'C.Mác & Ph.Ăngghen', description: 'Người sáng lập, đưa từ không tưởng thành khoa học', content: 'C.Mác (1818-1883) và Ph.Ăngghen (1820-1895) đã biến chủ nghĩa xã hội từ không tưởng thành khoa học thông qua hai phát kiến vĩ đại: quan niệm duy vật về lịch sử và học thuyết giá trị thặng dư. Họ phát hiện sứ mệnh lịch sử của giai cấp công nhân.', keyPoints: ['Phát hiện quy luật vận động xã hội', 'Sứ mệnh lịch sử của GCCN', 'Tuyên ngôn Đảng Cộng sản 1848', 'Bộ Tư bản (Das Kapital)'], examples: ['Tuyên ngôn Đảng Cộng sản (1848) - văn kiện cương lĩnh đầu tiên', 'Bộ Tư bản - phân tích khoa học về CNTB', 'Quốc tế I (1864) - tổ chức quốc tế đầu tiên của GCCN'], relatedTopics: ['Triết học Mác', 'Kinh tế chính trị Mác', 'V.I.Lênin'] },
        { id: 'h3', label: 'V.I.Lênin', description: 'Bảo vệ và phát triển trong thời đại đế quốc chủ nghĩa', content: 'V.I.Lênin (1870-1924) bảo vệ và phát triển chủ nghĩa Mác trong điều kiện mới - thời đại đế quốc chủ nghĩa. Ông lãnh đạo thành công Cách mạng Tháng Mười 1917, xây dựng nhà nước XHCN đầu tiên trên thế giới.', keyPoints: ['Lý luận về Đảng kiểu mới', 'Cách mạng Tháng Mười 1917', 'Nhà nước chuyên chính vô sản', 'Chính sách kinh tế mới (NEP)'], examples: ['Đảng Bônsêvích - mô hình đảng kiểu mới', 'Cách mạng Tháng Mười Nga 1917', 'Quốc tế Cộng sản (1919)'], relatedTopics: ['Đảng Cộng sản', 'Cách mạng vô sản', 'Hồ Chí Minh'] },
        { id: 'h4', label: 'Hồ Chí Minh', description: 'Vận dụng sáng tạo vào điều kiện Việt Nam', content: 'Hồ Chí Minh (1890-1969) vận dụng sáng tạo chủ nghĩa Mác-Lênin vào điều kiện cụ thể của Việt Nam - một nước thuộc địa nửa phong kiến. Người kết hợp chủ nghĩa yêu nước với chủ nghĩa quốc tế vô sản, dẫn dắt cách mạng Việt Nam đi từ thắng lợi này đến thắng lợi khác.', keyPoints: ['Kết hợp CN Mác-Lênin với CN yêu nước', 'Thành lập Đảng CSVN 1930', 'Cách mạng Tháng Tám 1945', 'Tư tưởng Hồ Chí Minh'], examples: ['Bản yêu sách 8 điểm gửi Hội nghị Versailles (1919)', 'Thành lập Việt Nam Cách mạng Thanh niên (1925)', 'Cách mạng Tháng Tám 1945 - lập nước VNDCCH'], relatedTopics: ['Đảng Cộng sản Việt Nam', 'Cách mạng Tháng Tám', 'Tư tưởng Hồ Chí Minh'] }
      ]
    },
    {
      id: 'mission',
      label: 'Sứ mệnh GCCN',
      description: 'Giai cấp công nhân là lực lượng xã hội lãnh đạo.',
      content: 'Giai cấp công nhân có sứ mệnh lịch sử là lật đổ chế độ tư bản, xây dựng xã hội mới không có áp bức bóc lột.',
      keyPoints: ['Giai cấp tiên tiến nhất', 'Lực lượng sản xuất hiện đại', 'Tính tổ chức kỷ luật cao', 'Tinh thần quốc tế vô sản'],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
      children: [
        { id: 'm1', label: 'Đặc điểm chính trị', description: 'Tiên phong, cách mạng triệt để', content: 'Giai cấp công nhân có đặc điểm tiên phong, cách mạng triệt để, là người đại diện cho phương thức sản xuất tiên tiến. Họ là sản phẩm của nền đại công nghiệp, có kỷ luật cao và tinh thần đoàn kết.', keyPoints: ['Đại diện lực lượng sản xuất mới', 'Lợi ích thống nhất với nhân dân', 'Tinh thần cách mạng triệt để', 'Có kỷ luật và tổ chức chặt chẽ'], examples: ['Công nhân mỏ than - tiêu biểu cho tinh thần đấu tranh', 'Công nhân dệt may - biểu tượng kỷ luật lao động', 'Công nhân cơ khí - đại diện cho công nghiệp hiện đại'], relatedTopics: ['Đảng tiên phong', 'Chủ nghĩa công đoàn', 'Phong trào công nhân'] },
        { id: 'm2', label: 'Nội dung sứ mệnh', description: 'Xóa bỏ áp bức, xây dựng xã hội mới', content: 'Sứ mệnh của giai cấp công nhân là lãnh đạo nhân dân lao động đấu tranh xóa bỏ chế độ tư bản, xây dựng chủ nghĩa xã hội và chủ nghĩa cộng sản. Đây là sứ mệnh giải phóng không chỉ bản thân mà còn giải phóng toàn nhân loại.', keyPoints: ['Lật đổ chế độ TBCN', 'Xây dựng CNXH', 'Giải phóng toàn nhân loại', 'Xóa bỏ mọi hình thức bóc lột'], examples: ['Cách mạng Tháng Mười Nga 1917', 'Cách mạng Trung Quốc 1949', 'Cách mạng Cuba 1959'], relatedTopics: ['Cách mạng vô sản', 'Chuyên chính vô sản', 'Chủ nghĩa cộng sản'] },
        { id: 'm3', label: 'Liên minh giai cấp', description: 'Công nhân - Nông dân - Trí thức', content: 'Liên minh công nông trí là nền tảng của khối đại đoàn kết toàn dân tộc trong xây dựng và bảo vệ Tổ quốc. Giai cấp công nhân là hạt nhân lãnh đạo, nông dân là đồng minh chiến lược, trí thức là lực lượng quan trọng.', keyPoints: ['Công nhân lãnh đạo', 'Nông dân là đồng minh chủ yếu', 'Trí thức là lực lượng quan trọng', 'Đại đoàn kết dân tộc'], examples: ['Liên minh công nông trong Cách mạng Tháng Tám', 'Vai trò trí thức trong cách mạng KHKT', 'Khối đại đoàn kết trong kháng chiến chống Mỹ'], relatedTopics: ['Mặt trận Tổ quốc', 'Chính sách dân tộc', 'Khối đại đoàn kết'] }
      ]
    },
    {
      id: 'transition',
      label: 'Thời kỳ quá độ',
      description: 'Giai đoạn chuyển tiếp tất yếu.',
      content: 'Thời kỳ quá độ là giai đoạn chuyển tiếp từ chủ nghĩa tư bản lên chủ nghĩa xã hội, có thể kéo dài và phức tạp.',
      keyPoints: ['Tính tất yếu khách quan', 'Đan xen cái cũ và cái mới', 'Đấu tranh giai cấp tiếp diễn', 'Xây dựng cơ sở vật chất kỹ thuật'],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      children: [
        { id: 't1', label: 'Tính tất yếu', description: 'CNTB chưa tự chuyển thành CNXH', content: 'Thời kỳ quá độ là tất yếu vì CNTB không tự động chuyển thành CNXH mà cần có sự lãnh đạo của giai cấp công nhân thông qua đảng tiên phong. Đây là quy luật khách quan của sự phát triển xã hội.', keyPoints: ['Quy luật khách quan', 'Cần có Đảng lãnh đạo', 'Cần có chính quyền nhà nước', 'Không thể "nhảy cóc" các giai đoạn'], examples: ['Liên Xô: Quá độ từ phong kiến lên CNXH', 'Việt Nam: Bỏ qua TBCN, tiến lên CNXH', 'Trung Quốc: Giai đoạn sơ kỳ CNXH'], relatedTopics: ['Quy luật phát triển', 'Đảng Cộng sản', 'Nhà nước XHCN'] },
        { id: 't2', label: 'Đặc điểm KT-XH', description: 'Đan xen cái cũ và cái mới', content: 'Trong thời kỳ quá độ, các yếu tố của xã hội cũ và mới đan xen, đấu tranh với nhau trên mọi lĩnh vực. Nền kinh tế có nhiều thành phần, văn hóa tư tưởng phức tạp, đấu tranh giai cấp vẫn tiếp diễn dưới nhiều hình thức.', keyPoints: ['Kinh tế nhiều thành phần', 'Văn hóa tư tưởng phức tạp', 'Đấu tranh giai cấp tiếp diễn', 'Xây dựng đi đôi với đấu tranh'], examples: ['Kinh tế thị trường định hướng XHCN (Việt Nam)', 'Chính sách kinh tế mới NEP (Lênin)', 'Cải cách mở cửa (Trung Quốc)'], relatedTopics: ['Kinh tế hỗn hợp', 'Đấu tranh tư tưởng', 'Xây dựng CNXH'] },
        { id: 't3', label: 'Con đường đi lên', description: 'Bỏ qua chế độ TBCN (ở VN)', content: 'Việt Nam đi lên CNXH bỏ qua chế độ TBCN, nhưng tiếp thu những thành tựu của nhân loại, đặc biệt về khoa học kỹ thuật. Đây là con đường phát triển rút ngắn, không qua giai đoạn thống trị của CNTB nhưng vẫn kế thừa những thành tựu của nó.', keyPoints: ['Bỏ qua chế độ TBCN', 'Tiếp thu thành tựu nhân loại', 'Phát triển kinh tế thị trường định hướng XHCN', 'Công nghiệp hóa, hiện đại hóa'], examples: ['Đổi mới 1986 - bước ngoặt lịch sử', 'Hội nhập kinh tế quốc tế', 'Cách mạng công nghiệp 4.0'], relatedTopics: ['Đổi mới', 'Hội nhập quốc tế', 'Công nghiệp hóa'] }
      ]
    },
    {
      id: 'democracy',
      label: 'Dân chủ & Nhà nước',
      description: 'Hệ thống chính trị XHCN.',
      content: 'Dân chủ xã hội chủ nghĩa là nền dân chủ của nhân dân, do nhân dân và vì nhân dân, được thể chế hóa trong nhà nước pháp quyền.',
      keyPoints: ['Quyền lực thuộc về nhân dân', 'Nhà nước pháp quyền XHCN', 'Đảng lãnh đạo, Nhà nước quản lý', 'Nhân dân làm chủ'],
      image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=800',
      children: [
        { id: 'd1', label: 'Bản chất Dân chủ', description: 'Quyền lực thuộc về nhân dân', content: 'Dân chủ XHCN đảm bảo quyền làm chủ thực sự của nhân dân trên mọi lĩnh vực: kinh tế, chính trị, văn hóa, xã hội. Khác với dân chủ tư sản chỉ là hình thức, dân chủ XHCN là dân chủ thực chất, của đa số nhân dân.', keyPoints: ['Dân chủ trực tiếp', 'Dân chủ đại diện', 'Dân biết, dân bàn, dân làm, dân kiểm tra', 'Dân chủ thực chất'], examples: ['Bầu cử Quốc hội và HĐND các cấp', 'Quy chế dân chủ ở cơ sở', 'Tiếp xúc cử tri của đại biểu dân cử'], relatedTopics: ['Quyền công dân', 'Nghĩa vụ công dân', 'Quốc hội'] },
        { id: 'd2', label: 'Nhà nước Pháp quyền', description: 'Của dân, do dân, vì dân', content: 'Nhà nước pháp quyền XHCN là nhà nước của dân, do dân, vì dân; mọi hoạt động của nhà nước đều theo pháp luật. Quyền lực nhà nước thuộc về nhân dân, được kiểm soát bằng pháp luật.', keyPoints: ['Pháp luật là tối thượng', 'Bảo vệ quyền công dân', 'Quyền lực được kiểm soát', 'Nhà nước phục vụ nhân dân'], examples: ['Hiến pháp 2013 - đạo luật gốc', 'Hệ thống tòa án độc lập', 'Viện Kiểm sát nhân dân'], relatedTopics: ['Hiến pháp', 'Pháp luật', 'Tư pháp'] },
        { id: 'd3', label: 'Đổi mới chính trị', description: 'Hoàn thiện bộ máy nhà nước', content: 'Đổi mới chính trị nhằm hoàn thiện hệ thống chính trị, nâng cao năng lực lãnh đạo của Đảng và hiệu lực quản lý của Nhà nước. Mục tiêu là xây dựng nhà nước tinh gọn, hoạt động hiệu lực, hiệu quả.', keyPoints: ['Đổi mới Đảng', 'Cải cách hành chính', 'Phòng chống tham nhũng', 'Tinh gọn bộ máy'], examples: ['Cải cách thủ tục hành chính', 'Chương trình phòng chống tham nhũng', 'Xây dựng chính phủ điện tử'], relatedTopics: ['Cải cách hành chính', 'Phòng chống tham nhũng', 'Chính phủ điện tử'] }
      ]
    },
    {
      id: 'culture',
      label: 'Dân tộc & Tôn giáo',
      description: 'Các vấn đề xã hội cơ bản.',
      content: 'Vấn đề dân tộc và tôn giáo là những vấn đề xã hội quan trọng, cần được giải quyết đúng đắn theo quan điểm chủ nghĩa Mác-Lênin.',
      keyPoints: ['Các dân tộc bình đẳng', 'Quyền tự quyết dân tộc', 'Tự do tín ngưỡng', 'Đoàn kết lương - giáo'],
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
      children: [
        { id: 'c1', label: 'Cương lĩnh Dân tộc', description: 'Bình đẳng, đoàn kết, tương trợ', content: 'Cương lĩnh dân tộc của Lênin gồm 3 nội dung: Các dân tộc hoàn toàn bình đẳng; Các dân tộc có quyền tự quyết; Liên hiệp công nhân tất cả các dân tộc. Đây là kim chỉ nam giải quyết vấn đề dân tộc.', keyPoints: ['Bình đẳng dân tộc', 'Quyền tự quyết', 'Đoàn kết quốc tế', 'Chống áp bức dân tộc'], examples: ['Chính sách dân tộc ở Việt Nam - 54 dân tộc anh em', 'Vùng tự trị dân tộc (Trung Quốc)', 'Quyền tự quyết trong Hiến chương LHQ'], relatedTopics: ['Quyền dân tộc', 'Liên Hợp Quốc', 'Chính sách dân tộc VN'] },
        { id: 'c2', label: 'Tôn giáo & Tín ngưỡng', description: 'Tự do tín ngưỡng, lương giáo đoàn kết', content: 'Tôn trọng quyền tự do tín ngưỡng của nhân dân, đoàn kết đồng bào có đạo và không có đạo trong khối đại đoàn kết dân tộc. Chống lợi dụng tôn giáo để chia rẽ dân tộc.', keyPoints: ['Tự do tín ngưỡng', 'Tôn giáo gắn bó dân tộc', 'Chống lợi dụng tôn giáo', 'Đoàn kết lương giáo'], examples: ['Chính sách tôn giáo của Việt Nam', 'Các tổ chức tôn giáo hợp pháp', 'Vai trò tôn giáo trong xây dựng đạo đức'], relatedTopics: ['Tự do tín ngưỡng', 'Đạo đức xã hội', 'Pháp luật về tôn giáo'] }
      ]
    },
    {
      id: 'family',
      label: 'Gia đình XHCN',
      description: 'Tế bào của xã hội.',
      content: 'Gia đình là tế bào của xã hội, là nơi duy trì nòi giống, giáo dục nhân cách, lưu giữ truyền thống văn hóa dân tộc.',
      keyPoints: ['Chức năng tái sản xuất', 'Chức năng kinh tế', 'Chức năng giáo dục', 'Chức năng văn hóa - tình cảm'],
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800',
      children: [
        { id: 'f1', label: 'Chức năng gia đình', description: 'Tái sản xuất, giáo dục, kinh tế', content: 'Gia đình có các chức năng cơ bản: tái sản xuất con người, giáo dục thế hệ trẻ, tổ chức đời sống kinh tế và thỏa mãn nhu cầu tinh thần của các thành viên. Mỗi chức năng đều quan trọng cho sự phát triển xã hội.', keyPoints: ['Sinh sản và nuôi dưỡng', 'Giáo dục thế hệ trẻ', 'Đơn vị kinh tế tiêu dùng', 'Thỏa mãn nhu cầu tình cảm'], examples: ['Gia đình truyền thống Việt Nam - tam tứ đại đồng đường', 'Mô hình gia đình hạt nhân hiện đại', 'Gia đình doanh nhân - kinh tế hộ gia đình'], relatedTopics: ['Dân số', 'Giáo dục', 'Kinh tế hộ gia đình'] },
        { id: 'f2', label: 'Xây dựng văn hóa', description: 'Gia đình no ấm, tiến bộ, hạnh phúc', content: 'Xây dựng gia đình văn hóa với tiêu chí: no ấm, tiến bộ, hạnh phúc; bình đẳng giới; phát huy giá trị truyền thống tốt đẹp. Gia đình văn hóa là nền tảng xây dựng xã hội văn minh.', keyPoints: ['Bình đẳng giới', 'Gia đình văn hóa', 'Giữ gìn truyền thống', 'Xây dựng nếp sống văn minh'], examples: ['Phong trào xây dựng gia đình văn hóa', 'Ngày Gia đình Việt Nam 28/6', 'Chương trình bình đẳng giới quốc gia'], relatedTopics: ['Bình đẳng giới', 'Văn hóa gia đình', 'Nếp sống văn minh'] }
      ]
    }
  ]
};

// --- TYPES & HELPERS ---

interface VisualNode {
  id: string;
  data: MindmapNodeDetail;
  x: number;
  y: number;
  level: number;
  parent?: { x: number; y: number };
  angle?: number;
}

// Simple radial layout calculation
const calculateLayout = (
  rootData: MindmapNodeDetail, 
  expandedIds: Set<string>, 
  width: number, 
  height: number
): { nodes: VisualNode[], links: any[] } => {
  const nodes: VisualNode[] = [];
  const links: any[] = [];
  
  const centerX = 0;
  const centerY = 0;

  // Root
  nodes.push({ id: rootData.id, data: rootData, x: centerX, y: centerY, level: 0 });

  if (!rootData.children) return { nodes, links };

  // Level 1: Main Branches (Circle)
  const level1Radius = 280;
  const level1Count = rootData.children.length;
  
  rootData.children.forEach((child, index) => {
    const angle = (index / level1Count) * Math.PI * 2 - Math.PI / 2; // Start from top
    const x = centerX + Math.cos(angle) * level1Radius;
    const y = centerY + Math.sin(angle) * level1Radius;

    nodes.push({ id: child.id, data: child, x, y, level: 1, parent: { x: centerX, y: centerY }, angle });
    links.push({ source: { x: centerX, y: centerY }, target: { x, y } });

    // Level 2: Sub-branches (Fan out from parent)
    if (expandedIds.has(child.id) && child.children) {
      const level2Radius = 200; // Distance from parent
      const subCount = child.children.length;
      // Spread children within a 120 degree cone outward from center
      const spreadAngle = Math.PI / 1.5; 
      const startAngle = angle - spreadAngle / 2;

      child.children.forEach((subChild, subIndex) => {
        // Distribute evenly in the cone
        const subAngle = startAngle + (subIndex / (subCount - 1 || 1)) * spreadAngle; 
        
        // Correct angle to ensure it points away from center roughly
        // (This simple logic works well for radial star)
        
        const subX = x + Math.cos(subAngle) * level2Radius;
        const subY = y + Math.sin(subAngle) * level2Radius;

        nodes.push({ 
          id: subChild.id, 
          data: subChild, 
          x: subX, 
          y: subY, 
          level: 2, 
          parent: { x, y } 
        });
        links.push({ source: { x, y }, target: { x: subX, y: subY } });
      });
    }
  });

  return { nodes, links };
};

// --- COMPONENT ---

export const Mindmap: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 0.8 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<MindmapNodeDetail | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Initial expand
  useEffect(() => {
    // Optionally expand some nodes initially? 
    // Let's keep it collapsed to level 1 for cleaner start
  }, []);

  const { nodes, links } = useMemo(() => {
    return calculateLayout(MINDMAP_DATA, expandedIds, 1000, 1000);
  }, [expandedIds]);

  // Handle Pan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTransform({
        ...transform,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle Zoom
  const handleWheel = (e: React.WheelEvent) => {
    const scaleSensitivity = 0.001;
    const newScale = transform.scale - e.deltaY * scaleSensitivity;
    // Limit scale
    const clampedScale = Math.min(Math.max(newScale, 0.2), 3);
    setTransform({ ...transform, scale: clampedScale });
  };

  // Handle Node Click
  const handleNodeClick = (node: VisualNode) => {
    // Level 0 (root): Show modal directly
    if (node.level === 0 && node.data.content) {
      setSelectedNode(node.data);
      return;
    }
    // Level 1: Toggle expand/collapse
    if (node.level === 1 && node.data.children) {
      const newExpanded = new Set(expandedIds);
      if (newExpanded.has(node.id)) {
        newExpanded.delete(node.id);
      } else {
        newExpanded.add(node.id);
      }
      setExpandedIds(newExpanded);
    }
    // Level 2: Show modal (detailed content)
    if (node.level === 2 && node.data.content) {
      setSelectedNode(node.data);
    }
  };

  // Close modal
  const closeModal = () => {
    if (window.gsap && modalRef.current) {
      window.gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setSelectedNode(null)
      });
    } else {
      setSelectedNode(null);
    }
  };

  // Modal animation on open
  useEffect(() => {
    if (selectedNode && window.gsap && modalRef.current) {
      window.gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [selectedNode]);

  // GSAP Animation for entering nodes
  useEffect(() => {
    if (!window.gsap) return;
    
    // Animate Level 2 nodes when they appear
    const level2Nodes = document.querySelectorAll('.node-level-2');
    if (level2Nodes.length > 0) {
      window.gsap.fromTo(level2Nodes, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.7)" }
      );
    }

    // Animate lines
    const lines = document.querySelectorAll('.map-line');
    window.gsap.to(lines, {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power2.out"
    });

  }, [expandedIds]); // Trigger when structure changes

  // Center on mount
  useEffect(() => {
    if (wrapperRef.current) {
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      setTransform(t => ({ ...t, x: width / 2, y: height / 2 }));
    }
  }, []);

  return (
    <div className="h-screen w-full bg-[#050505] overflow-hidden relative font-sans">
      {/* UI Overlay */}
      <div className="absolute top-24 left-6 z-20">
        <h1 className="text-3xl font-serif text-white mb-2">Bản đồ Tư duy</h1>
        <p className="text-gray-400 text-sm max-w-xs">
          Khám phá hệ thống lý luận CNXHKH. 
          <br/>
          <span className="text-cnxh-red text-xs uppercase tracking-wider mt-2 block">
            • Kéo để di chuyển • Cuộn để zoom • Click node để mở rộng
          </span>
        </p>
      </div>

      <div className="absolute bottom-6 right-6 z-20 flex gap-2">
         <button onClick={() => setTransform(t => ({...t, scale: t.scale + 0.2}))} className="bg-white/10 hover:bg-cnxh-red p-2 rounded text-white transition-colors">+</button>
         <button onClick={() => setTransform(t => ({...t, scale: t.scale - 0.2}))} className="bg-white/10 hover:bg-cnxh-red p-2 rounded text-white transition-colors">-</button>
         <button onClick={() => setTransform({x: window.innerWidth/2, y: window.innerHeight/2, scale: 0.8})} className="bg-white/10 hover:bg-cnxh-red px-3 py-2 rounded text-white text-xs uppercase font-bold transition-colors">Reset</button>
      </div>

      {/* Main Canvas Area */}
      <div 
        ref={wrapperRef}
        className="w-full h-full cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div 
          ref={containerRef}
          style={{ 
            transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            transformOrigin: '0 0',
            transition: isDragging ? 'none' : 'transform 0.1s ease-out'
          }}
          className="absolute top-0 left-0 w-0 h-0" // Centered by transform
        >
          {/* SVG Layer for Lines */}
          <svg className="absolute -top-[2500px] -left-[2500px] w-[5000px] h-[5000px] pointer-events-none">
            <defs>
              <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#800020" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ff4d4d" stopOpacity="0.3" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {links.map((link, i) => (
              <path
                key={i}
                d={`M${link.source.x + 2500},${link.source.y + 2500} Q${(link.source.x + link.target.x)/2 + 2500},${(link.source.y + link.target.y)/2 + 2500} ${link.target.x + 2500},${link.target.y + 2500}`}
                fill="none"
                stroke="url(#glowGradient)"
                strokeWidth="2"
                className="map-line"
                filter="url(#glow)"
                strokeDasharray="1000"
                strokeDashoffset="1000" // Will be animated to 0
              />
            ))}
          </svg>

          {/* Nodes Layer */}
          {nodes.map((node) => (
            <div
              key={node.id}
              onClick={(e) => { e.stopPropagation(); handleNodeClick(node); }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center transition-colors duration-300
                ${node.level === 0 ? 'z-30 w-44 h-44 rounded-full bg-gradient-to-br from-cnxh-red to-black border-4 border-cnxh-red shadow-[0_0_50px_rgba(128,0,32,0.6)] cursor-pointer hover:scale-105' : ''}
                ${node.level === 1 ? 'z-20 w-52 p-4 rounded-sm bg-[#1a1a1a] border border-white/20 hover:border-cnxh-red hover:shadow-[0_0_30px_rgba(128,0,32,0.4)] cursor-pointer' : ''}
                ${node.level === 2 ? 'z-10 w-44 p-3 rounded-sm bg-[#0a0a0a] border border-white/10 hover:bg-[#222] cursor-pointer node-level-2' : ''}
              `}
              style={{ left: node.x, top: node.y }}
            >
              <div className={`font-serif text-white ${node.level === 0 ? 'text-xl font-bold' : node.level === 1 ? 'text-lg font-bold' : 'text-sm font-medium text-gray-200'}`}>
                {node.data.label}
              </div>
              
              {node.data.description && (
                <div className={`mt-1 text-gray-400 ${node.level === 0 ? 'text-[10px] px-2' : node.level === 1 ? 'text-xs' : 'text-[10px] leading-tight'}`}>
                  {node.data.description}
                </div>
              )}

              {/* Actions for Level 1 nodes */}
              {node.level === 1 && (
                <div className="mt-3 flex gap-2 text-[10px]">
                  {node.data.children && (
                    <span className="text-cnxh-red uppercase font-bold tracking-wider opacity-60">
                      {expandedIds.has(node.id) ? '▼ Thu gọn' : '▶ Mở rộng'}
                    </span>
                  )}
                  {node.data.content && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedNode(node.data); }}
                      className="text-white bg-cnxh-red/20 px-2 py-0.5 rounded hover:bg-cnxh-red/40 transition-colors uppercase font-bold tracking-wider"
                    >
                      Chi tiết
                    </button>
                  )}
                </div>
              )}

              {/* Click to view detail indicator for Level 2 */}
              {node.level === 2 && node.data.content && (
                <div className="mt-2 text-cnxh-red text-[10px] uppercase font-bold tracking-wider opacity-60 hover:opacity-100 cursor-pointer">
                   Xem chi tiết →
                </div>
              )}

              {/* Root node detail indicator */}
              {node.level === 0 && node.data.content && (
                <div className="mt-1 text-white/60 text-[9px] uppercase font-bold tracking-wider hover:text-white">
                   Click để xem
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for detailed node content */}
      {selectedNode && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            ref={modalRef}
            className="bg-[#0a0a0a] border border-white/10 rounded-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-[0_0_80px_rgba(128,0,32,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-cnxh-red/20 to-transparent border-b border-white/10 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-serif text-white mb-2">{selectedNode.label}</h2>
                  {selectedNode.description && (
                    <p className="text-gray-400 text-sm">{selectedNode.description}</p>
                  )}
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl font-light transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Image (if available) */}
              {selectedNode.image && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <img 
                    src={selectedNode.image} 
                    alt={selectedNode.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              )}

              {/* Main Content */}
              {selectedNode.content && (
                <div>
                  <h3 className="text-cnxh-red uppercase text-xs font-bold tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-cnxh-red"></span>
                    Nội dung chi tiết
                  </h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedNode.content}
                  </p>
                </div>
              )}

              {/* Key Points */}
              {selectedNode.keyPoints && selectedNode.keyPoints.length > 0 && (
                <div>
                  <h3 className="text-cnxh-red uppercase text-xs font-bold tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-cnxh-red"></span>
                    Điểm chính
                  </h3>
                  <ul className="space-y-2">
                    {selectedNode.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <span className="text-cnxh-red mt-1">✦</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Examples */}
              {selectedNode.examples && selectedNode.examples.length > 0 && (
                <div>
                  <h3 className="text-cnxh-red uppercase text-xs font-bold tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-cnxh-red"></span>
                    Ví dụ minh họa
                  </h3>
                  <div className="grid gap-3">
                    {selectedNode.examples.map((example, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded">
                        <div className="flex items-start gap-3">
                          <span className="bg-cnxh-red/20 text-cnxh-red text-xs font-bold px-2 py-1 rounded">
                            {idx + 1}
                          </span>
                          <p className="text-gray-300 text-sm">{example}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Topics */}
              {selectedNode.relatedTopics && selectedNode.relatedTopics.length > 0 && (
                <div>
                  <h3 className="text-cnxh-red uppercase text-xs font-bold tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-8 h-px bg-cnxh-red"></span>
                    Chủ đề liên quan
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.relatedTopics.map((topic, idx) => (
                      <span 
                        key={idx} 
                        className="bg-white/5 text-gray-300 text-xs px-3 py-2 rounded border border-white/10 hover:border-cnxh-red/50 transition-colors"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/10 p-4 flex justify-end">
              <button 
                onClick={closeModal}
                className="bg-cnxh-red hover:bg-cnxh-red/80 text-white px-6 py-2 rounded text-sm font-medium transition-colors"
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
