import React, { useState, useEffect, useRef } from "react";
import { BlogPost, Comment } from "../types";

// --- DETAILED BLOG POST INTERFACE ---
interface BlogPostDetail extends BlogPost {
  fullContent: string;
  keyInsights: string[];
  theoreticalBasis: string;
  practicalImplications: string[];
  relatedConcepts: string[];
  references: { title: string; author: string; year: string }[];
  discussionQuestions: string[];
}

// --- MOCK DATA with detailed content ---
const POSTS: BlogPostDetail[] = [
  {
    id: "1",
    title: "Chuyển đổi số và sự thích ứng của Kiến trúc thượng tầng",
    excerpt:
      "Phân tích tác động của cuộc cách mạng công nghiệp 4.0 đến phương thức quản lý nhà nước và cấu trúc xã hội trong bối cảnh mới.",
    content: `
      <p class="mb-4">Cuộc cách mạng công nghiệp lần thứ tư với trọng tâm là chuyển đổi số đang tạo ra những thay đổi sâu sắc trong cơ sở hạ tầng kinh tế. Điều này tất yếu dẫn đến những biến đổi tương ứng trong kiến trúc thượng tầng.</p>
      <p class="mb-4">Thứ nhất, chuyển đổi số làm thay đổi phương thức quản trị quốc gia. Nhà nước pháp quyền XHCN đang dần chuyển dịch sang mô hình Chính phủ số, nơi dữ liệu trở thành tài nguyên quan trọng để ra quyết định.</p>
      <p class="mb-4">Thứ hai, không gian mạng trở thành một mặt trận tư tưởng mới. Việc bảo vệ nền tảng tư tưởng của Đảng trên không gian số đòi hỏi những phương pháp tiếp cận vừa kiên định về nguyên tắc, vừa linh hoạt về sách lược.</p>
      <h3 class="text-xl font-serif text-white mt-8 mb-4">Thách thức và Cơ hội</h3>
      <p class="mb-4">Cơ hội nằm ở việc minh bạch hóa thông tin và tăng cường sự tham gia của người dân. Tuy nhiên, thách thức về an ninh phi truyền thống cũng ngày càng hiện hữu rõ nét hơn bao giờ hết.</p>
    `,
    fullContent: `Cuộc cách mạng công nghiệp lần thứ tư (CMCN 4.0) đang diễn ra với tốc độ chưa từng có, tạo nên những biến đổi sâu sắc trong mọi lĩnh vực của đời sống xã hội. Trọng tâm của cuộc cách mạng này là chuyển đổi số - quá trình chuyển đổi từ mô hình hoạt động truyền thống sang mô hình số hóa dựa trên công nghệ thông tin, trí tuệ nhân tạo, dữ liệu lớn và Internet vạn vật.

Theo quan điểm của chủ nghĩa Mác - Lênin, cơ sở hạ tầng quyết định kiến trúc thượng tầng. Khi lực lượng sản xuất phát triển, quan hệ sản xuất cũng phải thay đổi để phù hợp, kéo theo sự biến đổi của toàn bộ hệ thống chính trị, pháp luật, văn hóa, tư tưởng.

Trong bối cảnh CMCN 4.0, chuyển đổi số chính là sự thay đổi căn bản của lực lượng sản xuất. Tri thức, dữ liệu, thuật toán trở thành tư liệu sản xuất quan trọng. Điều này tất yếu đòi hỏi kiến trúc thượng tầng - bao gồm hệ thống chính trị, pháp luật, văn hóa - phải thích ứng.

Về phương thức quản trị quốc gia, Nhà nước pháp quyền XHCN đang chuyển dịch mạnh mẽ sang mô hình Chính phủ số, Chính phủ điện tử. Dữ liệu trở thành tài nguyên chiến lược, là cơ sở để hoạch định chính sách và ra quyết định. Việc chia sẻ và liên thông dữ liệu giữa các cơ quan nhà nước giúp nâng cao hiệu quả quản lý, giảm thủ tục hành chính, tăng cường minh bạch.

Không gian mạng đã trở thành một mặt trận tư tưởng mới. Các thế lực thù địch lợi dụng không gian này để tuyên truyền xuyên tạc, chống phá Đảng và Nhà nước. Do đó, việc bảo vệ nền tảng tư tưởng của Đảng trên không gian số là nhiệm vụ cấp bách, đòi hỏi vừa kiên định về nguyên tắc, vừa linh hoạt về phương pháp.`,
    author: "Tiến sĩ Trần Văn A",
    date: "15/03/2024",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
    tags: ["Chuyển đổi số", "Triết học", "Xã hội học"],
    keyInsights: [
      "Cơ sở hạ tầng số đang định hình lại kiến trúc thượng tầng chính trị - xã hội",
      "Chính phủ số là xu thế tất yếu của nhà nước pháp quyền XHCN trong thời đại mới",
      "Không gian mạng trở thành mặt trận tư tưởng quan trọng cần được bảo vệ",
      "Dữ liệu là tài nguyên chiến lược mới của quốc gia",
      "Cần kết hợp kiên định nguyên tắc với linh hoạt phương pháp",
    ],
    theoreticalBasis:
      "Quy luật về mối quan hệ biện chứng giữa cơ sở hạ tầng và kiến trúc thượng tầng trong triết học Mác - Lênin. Khi lực lượng sản xuất thay đổi, quan hệ sản xuất và toàn bộ thượng tầng kiến trúc cũng phải biến đổi theo.",
    practicalImplications: [
      "Xây dựng Chính phủ điện tử, Chính phủ số với cơ sở dữ liệu quốc gia tập trung",
      "Đào tạo cán bộ công chức có năng lực số, thích ứng với môi trường số",
      "Hoàn thiện pháp luật về an ninh mạng, bảo vệ dữ liệu cá nhân",
      "Tăng cường đấu tranh tư tưởng trên không gian mạng",
    ],
    relatedConcepts: [
      "Cơ sở hạ tầng & Kiến trúc thượng tầng",
      "Chính phủ điện tử",
      "An ninh phi truyền thống",
      "Lực lượng sản xuất",
      "Quan hệ sản xuất",
    ],
    references: [
      {
        title: "Cách mạng công nghiệp lần thứ tư",
        author: "Klaus Schwab",
        year: "2016",
      },
      {
        title: "Góp phần phê phán kinh tế chính trị học",
        author: "C.Mác",
        year: "1859",
      },
      {
        title: "Văn kiện Đại hội XIII của Đảng",
        author: "Đảng CSVN",
        year: "2021",
      },
    ],
    discussionQuestions: [
      "Làm thế nào để cân bằng giữa tự do thông tin và an ninh quốc gia trên không gian mạng?",
      "Vai trò của trí tuệ nhân tạo trong việc hoạch định chính sách công là gì?",
      "Làm sao để đảm bảo tính công bằng trong xã hội số?",
    ],
  },
  {
    id: "2",
    title: "Giữ gìn bản sắc văn hóa dân tộc trong thời kỳ hội nhập",
    excerpt:
      "Văn hóa là hồn cốt của dân tộc. Làm thế nào để 'hòa nhập mà không hòa tan' là câu hỏi lớn trong thời đại toàn cầu hóa.",
    content: `
      <p class="mb-4">Văn hóa không chỉ là di sản của quá khứ mà còn là động lực của sự phát triển trong tương lai. Trong tư tưởng Hồ Chí Minh, văn hóa soi đường cho quốc dân đi.</p>
      <p class="mb-4">Toàn cầu hóa mang lại cơ hội giao lưu, học hỏi tinh hoa nhân loại, nhưng cũng đặt ra nguy cơ xâm lăng văn hóa. Việc xây dựng nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc là nhiệm vụ cấp bách.</p>
    `,
    fullContent: `Trong di sản tư tưởng Hồ Chí Minh, văn hóa được đặt ở vị trí đặc biệt quan trọng. Người khẳng định: "Văn hóa soi đường cho quốc dân đi". Điều này cho thấy văn hóa không chỉ là sản phẩm của sự phát triển kinh tế - xã hội mà còn là động lực, là "ngọn đuốc" dẫn đường cho sự nghiệp xây dựng và bảo vệ Tổ quốc.

Toàn cầu hóa là xu thế khách quan, tạo điều kiện cho các quốc gia giao lưu, học hỏi tinh hoa văn hóa nhân loại. Tuy nhiên, mặt trái của nó là nguy cơ "xâm lăng văn hóa" - khi các giá trị ngoại lai, đặc biệt là văn hóa tiêu dùng phương Tây, có thể lấn át bản sắc văn hóa dân tộc.

Nghị quyết Hội nghị Trung ương 5 khóa VIII đã xác định phương hướng xây dựng nền văn hóa Việt Nam "tiên tiến, đậm đà bản sắc dân tộc". "Tiên tiến" nghĩa là tiếp thu những giá trị tiến bộ của nhân loại; "đậm đà bản sắc" là giữ gìn và phát huy những giá trị cốt lõi của văn hóa Việt Nam như lòng yêu nước, tinh thần đoàn kết, truyền thống hiếu học.

Để "hòa nhập mà không hòa tan", cần thực hiện đồng bộ nhiều giải pháp: Giáo dục thế hệ trẻ về lịch sử, văn hóa dân tộc; Bảo tồn và phát huy di sản văn hóa vật thể và phi vật thể; Chọn lọc tiếp thu tinh hoa văn hóa thế giới; Xây dựng công nghiệp văn hóa mang đậm bản sắc Việt Nam.`,
    author: "Nguyễn Thị B",
    date: "10/03/2024",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200",
    tags: ["Văn hóa", "Hội nhập"],
    keyInsights: [
      "Văn hóa vừa là mục tiêu, vừa là động lực của sự phát triển bền vững",
      "Toàn cầu hóa tạo cả cơ hội lẫn thách thức cho bản sắc văn hóa dân tộc",
      "Cần xây dựng nền văn hóa 'tiên tiến, đậm đà bản sắc dân tộc'",
      "Giáo dục là then chốt trong việc giữ gìn và phát huy văn hóa",
      "Công nghiệp văn hóa là phương thức mới để quảng bá văn hóa dân tộc",
    ],
    theoreticalBasis:
      "Tư tưởng Hồ Chí Minh về văn hóa và Nghị quyết Trung ương 5 khóa VIII về xây dựng nền văn hóa Việt Nam tiên tiến, đậm đà bản sắc dân tộc.",
    practicalImplications: [
      "Đưa giáo dục văn hóa, lịch sử dân tộc vào chương trình giáo dục ở mọi cấp",
      "Đầu tư bảo tồn di sản văn hóa vật thể và phi vật thể",
      "Phát triển công nghiệp văn hóa như điện ảnh, âm nhạc, thời trang mang bản sắc Việt",
      "Quảng bá văn hóa Việt Nam ra thế giới thông qua ngoại giao văn hóa",
    ],
    relatedConcepts: [
      "Tư tưởng Hồ Chí Minh về văn hóa",
      "Toàn cầu hóa",
      "Bản sắc văn hóa",
      "Công nghiệp văn hóa",
      "Di sản văn hóa",
    ],
    references: [
      {
        title: "Hồ Chí Minh toàn tập, tập 3",
        author: "Hồ Chí Minh",
        year: "1995",
      },
      {
        title: "Nghị quyết Trung ương 5 khóa VIII",
        author: "BCH TW Đảng",
        year: "1998",
      },
      {
        title: "Chiến lược phát triển văn hóa đến năm 2030",
        author: "Chính phủ VN",
        year: "2021",
      },
    ],
    discussionQuestions: [
      "Làm thế nào để thế hệ trẻ quan tâm hơn đến văn hóa truyền thống?",
      "Vai trò của công nghệ số trong bảo tồn và phát huy di sản văn hóa?",
      "Công nghiệp văn hóa Việt Nam cần phát triển theo hướng nào?",
    ],
  },
  {
    id: "3",
    title: "Kinh tế thị trường định hướng XHCN: Lý luận và Thực tiễn",
    excerpt:
      "Tổng kết 35 năm đổi mới và những thành tựu trong việc vận dụng sáng tạo chủ nghĩa Mác - Lênin vào phát triển kinh tế.",
    content: `
      <p class="mb-4">Mô hình kinh tế thị trường định hướng XHCN là một đột phá lý luận của Đảng ta. Đó là nền kinh tế vận hành đầy đủ, đồng bộ theo các quy luật của kinh tế thị trường, đồng thời có sự quản lý của Nhà nước pháp quyền XHCN.</p>
      <p class="mb-4">Thực tiễn đã chứng minh tính đúng đắn của đường lối này qua sự tăng trưởng vượt bậc của quy mô nền kinh tế và đời sống nhân dân.</p>
    `,
    fullContent: `Đại hội Đảng toàn quốc lần thứ VI (1986) đánh dấu bước ngoặt lịch sử với đường lối Đổi mới, chuyển từ nền kinh tế kế hoạch hóa tập trung sang kinh tế thị trường định hướng XHCN. Đây là sự vận dụng sáng tạo chủ nghĩa Mác - Lênin vào điều kiện cụ thể của Việt Nam.

Kinh tế thị trường định hướng XHCN là nền kinh tế vận hành đầy đủ, đồng bộ theo các quy luật của kinh tế thị trường, nhưng có sự quản lý của Nhà nước pháp quyền XHCN, do Đảng Cộng sản Việt Nam lãnh đạo, nhằm mục tiêu "dân giàu, nước mạnh, dân chủ, công bằng, văn minh".

Đặc trưng cơ bản của mô hình này:
- Đa dạng hình thức sở hữu, trong đó kinh tế nhà nước giữ vai trò chủ đạo
- Phân phối theo lao động và hiệu quả kinh tế, đồng thời đảm bảo công bằng xã hội
- Nhà nước điều tiết vĩ mô để khắc phục khuyết tật của thị trường
- Mở cửa, hội nhập kinh tế quốc tế

Sau 35+ năm Đổi mới, Việt Nam đã đạt được những thành tựu to lớn: GDP tăng gấp nhiều lần; tỷ lệ hộ nghèo giảm từ 58% (1993) xuống dưới 5%; trở thành nước có thu nhập trung bình; hội nhập sâu rộng với kinh tế thế giới.

Tuy nhiên, còn nhiều thách thức cần vượt qua: năng suất lao động còn thấp; mô hình tăng trưởng dựa nhiều vào vốn và lao động giá rẻ; khoảng cách giàu nghèo; ô nhiễm môi trường.`,
    author: "Lê Văn C",
    date: "01/03/2024",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    tags: ["Kinh tế", "Đổi mới"],
    keyInsights: [
      "Kinh tế thị trường định hướng XHCN là đột phá lý luận của Đảng ta",
      "Kết hợp quy luật thị trường với vai trò quản lý của Nhà nước XHCN",
      "35+ năm Đổi mới đã mang lại thành tựu to lớn về kinh tế - xã hội",
      "Kinh tế nhà nước giữ vai trò chủ đạo trong nền kinh tế nhiều thành phần",
      "Cần tiếp tục đổi mới mô hình tăng trưởng theo hướng bền vững",
    ],
    theoreticalBasis:
      "Sự vận dụng sáng tạo quy luật về mối quan hệ giữa lực lượng sản xuất và quan hệ sản xuất trong điều kiện cụ thể của Việt Nam - một nước đi lên CNXH từ nền kinh tế nông nghiệp lạc hậu.",
    practicalImplications: [
      "Hoàn thiện thể chế kinh tế thị trường định hướng XHCN",
      "Đẩy mạnh cải cách doanh nghiệp nhà nước, nâng cao hiệu quả",
      "Phát triển kinh tế tư nhân trở thành động lực quan trọng",
      "Chuyển đổi mô hình tăng trưởng từ chiều rộng sang chiều sâu",
      "Hội nhập kinh tế quốc tế sâu rộng, hiệu quả",
    ],
    relatedConcepts: [
      "Đổi mới",
      "Kinh tế nhiều thành phần",
      "Kinh tế nhà nước",
      "Công nghiệp hóa - Hiện đại hóa",
      "Hội nhập kinh tế",
    ],
    references: [
      {
        title: "Văn kiện Đại hội VI của Đảng",
        author: "Đảng CSVN",
        year: "1986",
      },
      {
        title: "Lý luận về kinh tế thị trường định hướng XHCN",
        author: "GS.TS. Nguyễn Văn Nam",
        year: "2020",
      },
      {
        title: "35 năm Đổi mới: Thành tựu và bài học",
        author: "Tạp chí Cộng sản",
        year: "2021",
      },
    ],
    discussionQuestions: [
      "Làm thế nào để nâng cao hiệu quả kinh tế nhà nước?",
      "Vai trò của kinh tế tư nhân trong nền kinh tế thị trường định hướng XHCN?",
      "Làm sao để chuyển đổi mô hình tăng trưởng thành công?",
    ],
  },
  {
    id: "4",
    title: "Đấu tranh bảo vệ nền tảng tư tưởng của Đảng trong tình hình mới",
    excerpt:
      "Phân tích các phương thức, thủ đoạn chống phá của các thế lực thù địch và giải pháp đấu tranh hiệu quả.",
    content: `
      <p class="mb-4">Bảo vệ nền tảng tư tưởng của Đảng là nhiệm vụ quan trọng, thường xuyên. Trong bối cảnh mới, các thế lực thù địch sử dụng nhiều phương thức tinh vi hơn.</p>
    `,
    fullContent: `Nghị quyết số 35-NQ/TW ngày 22/10/2018 của Bộ Chính trị về "Tăng cường bảo vệ nền tảng tư tưởng của Đảng, đấu tranh phản bác các quan điểm sai trái, thù địch trong tình hình mới" đã xác định đây là nhiệm vụ quan trọng, thường xuyên của toàn Đảng, toàn dân.

Trong bối cảnh hiện nay, các thế lực thù địch, phản động sử dụng nhiều phương thức, thủ đoạn tinh vi:
- Lợi dụng không gian mạng để tuyên truyền xuyên tạc
- Xuyên tạc lịch sử, phủ nhận vai trò lãnh đạo của Đảng
- Lợi dụng các vấn đề "nhạy cảm" về dân tộc, tôn giáo, dân chủ, nhân quyền
- Kích động chia rẽ nội bộ, "diễn biến hòa bình"

Để đấu tranh hiệu quả, cần thực hiện đồng bộ các giải pháp:

Về tư tưởng: Nâng cao nhận thức, bản lĩnh chính trị cho cán bộ, đảng viên và nhân dân; Tăng cường giáo dục chủ nghĩa Mác - Lênin, tư tưởng Hồ Chí Minh.

Về tổ chức: Xây dựng lực lượng chuyên trách; Phát huy vai trò của các cơ quan báo chí, truyền thông; Huy động sức mạnh tổng hợp của cả hệ thống chính trị.

Về phương thức: Chủ động, kịp thời; Kết hợp "xây" và "chống"; Đấu tranh trực diện trên không gian mạng.`,
    author: "Đại tá Phạm Văn D",
    date: "20/02/2024",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200",
    tags: ["Tư tưởng", "An ninh", "Đảng"],
    keyInsights: [
      "Bảo vệ nền tảng tư tưởng là nhiệm vụ thường xuyên của toàn Đảng, toàn dân",
      "Không gian mạng trở thành mặt trận đấu tranh tư tưởng mới",
      "Cần kết hợp 'xây' và 'chống', lấy xây làm chính",
      "Phát huy sức mạnh tổng hợp của cả hệ thống chính trị",
      "Nâng cao nhận thức, bản lĩnh chính trị cho mọi tầng lớp",
    ],
    theoreticalBasis:
      "Nghị quyết số 35-NQ/TW của Bộ Chính trị và các văn kiện của Đảng về công tác tư tưởng, lý luận.",
    practicalImplications: [
      "Tăng cường giáo dục lý luận chính trị trong hệ thống giáo dục",
      "Xây dựng đội ngũ chuyên gia đấu tranh trên không gian mạng",
      "Nâng cao chất lượng báo chí, truyền thông chính thống",
      "Xây dựng cơ chế phản ứng nhanh với các thông tin xấu độc",
    ],
    relatedConcepts: [
      "Nền tảng tư tưởng",
      "Diễn biến hòa bình",
      "An ninh phi truyền thống",
      "Công tác tư tưởng",
      "Đấu tranh phản bác",
    ],
    references: [
      { title: "Nghị quyết 35-NQ/TW", author: "Bộ Chính trị", year: "2018" },
      {
        title: "Phòng chống diễn biến hòa bình",
        author: "Học viện CTQG HCM",
        year: "2019",
      },
      {
        title: "Đấu tranh trên không gian mạng",
        author: "Ban Tuyên giáo TW",
        year: "2020",
      },
    ],
    discussionQuestions: [
      "Làm thế nào để thu hút thanh niên quan tâm đến công tác tư tưởng?",
      "Vai trò của mạng xã hội trong việc tuyên truyền chủ trương của Đảng?",
      "Cách nhận diện các quan điểm sai trái, thù địch?",
    ],
  },
  {
    id: "5",
    title: "Phát triển bền vững và vấn đề môi trường từ góc nhìn CNXHKH",
    excerpt:
      "Mối quan hệ giữa phát triển kinh tế và bảo vệ môi trường - một thách thức của thời đại.",
    content: `
      <p class="mb-4">Phát triển bền vững đòi hỏi sự cân bằng giữa tăng trưởng kinh tế, công bằng xã hội và bảo vệ môi trường.</p>
    `,
    fullContent: `Phát triển bền vững được định nghĩa là "sự phát triển đáp ứng nhu cầu của hiện tại mà không làm tổn hại đến khả năng đáp ứng nhu cầu của các thế hệ tương lai". Đây là yêu cầu cấp thiết trong bối cảnh biến đổi khí hậu và cạn kiệt tài nguyên.

Từ góc nhìn của chủ nghĩa xã hội khoa học, mối quan hệ giữa con người và tự nhiên cần được nhìn nhận một cách biện chứng. Con người vừa là một phần của tự nhiên, vừa tác động và cải tạo tự nhiên. Tuy nhiên, sự tác động đó phải tuân theo quy luật tự nhiên, không được phá vỡ cân bằng sinh thái.

Chủ nghĩa tư bản, với mục tiêu tối đa hóa lợi nhuận, đã và đang gây ra những tổn hại nghiêm trọng cho môi trường. Ô nhiễm, phá rừng, hiệu ứng nhà kính... là hậu quả của mô hình sản xuất chạy theo lợi nhuận.

Chủ nghĩa xã hội với định hướng vì con người, vì cộng đồng có điều kiện để giải quyết tốt hơn mối quan hệ này. Tuy nhiên, trong thực tiễn xây dựng CNXH, vẫn còn những bất cập cần khắc phục.

Việt Nam đã cam kết đạt phát thải ròng bằng 0 (Net Zero) vào năm 2050. Điều này đòi hỏi sự chuyển đổi mạnh mẽ trong mô hình phát triển, từ "nâu" sang "xanh".`,
    author: "ThS. Hoàng Minh E",
    date: "05/02/2024",
    image:
      "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=80&w=1200",
    tags: ["Môi trường", "Phát triển bền vững", "Kinh tế xanh"],
    keyInsights: [
      "Phát triển bền vững cần cân bằng kinh tế - xã hội - môi trường",
      "CNXH có ưu thế trong giải quyết vấn đề môi trường so với CNTB",
      "Biến đổi khí hậu là thách thức toàn cầu đòi hỏi hợp tác quốc tế",
      "Việt Nam cam kết Net Zero 2050 - yêu cầu chuyển đổi mô hình phát triển",
      "Kinh tế tuần hoàn là xu hướng tất yếu",
    ],
    theoreticalBasis:
      "Quan điểm của chủ nghĩa Mác về mối quan hệ biện chứng giữa con người và tự nhiên; Quan điểm phát triển bền vững của Liên Hợp Quốc.",
    practicalImplications: [
      "Chuyển đổi sang mô hình kinh tế xanh, kinh tế tuần hoàn",
      "Phát triển năng lượng tái tạo thay thế năng lượng hóa thạch",
      "Hoàn thiện pháp luật về bảo vệ môi trường",
      "Nâng cao nhận thức cộng đồng về bảo vệ môi trường",
    ],
    relatedConcepts: [
      "Biến đổi khí hậu",
      "Kinh tế tuần hoàn",
      "Năng lượng tái tạo",
      "Net Zero",
      "Phát triển xanh",
    ],
    references: [
      {
        title: "Mục tiêu phát triển bền vững SDGs",
        author: "Liên Hợp Quốc",
        year: "2015",
      },
      {
        title: "Chiến lược quốc gia về tăng trưởng xanh",
        author: "Chính phủ VN",
        year: "2021",
      },
      { title: "Cam kết Net Zero 2050", author: "COP26", year: "2021" },
    ],
    discussionQuestions: [
      "Làm thế nào để cân bằng giữa tăng trưởng kinh tế và bảo vệ môi trường?",
      "Vai trò của doanh nghiệp trong phát triển bền vững?",
      "Mỗi cá nhân có thể đóng góp gì cho phát triển xanh?",
    ],
  },
];

const COMMENTS_MOCK: Comment[] = [
  {
    id: "c1",
    author: "Minh Tuấn",
    avatar: "https://i.pravatar.cc/150?u=1",
    content:
      "Bài viết rất sâu sắc, đặc biệt là phần phân tích về Chính phủ số. Tôi nghĩ chúng ta cần thêm các ví dụ thực tiễn.",
    date: "2 giờ trước",
    likes: 12,
  },
  {
    id: "c2",
    author: "Lan Anh",
    avatar: "https://i.pravatar.cc/150?u=2",
    content:
      "Đồng ý với tác giả. Việc giữ gìn bản sắc không có nghĩa là khép kín, mà là tiếp thu có chọn lọc.",
    date: "5 giờ trước",
    likes: 8,
  },
  {
    id: "c3",
    author: "Hoàng Nam",
    avatar: "https://i.pravatar.cc/150?u=3",
    content: "Cảm ơn ban biên tập đã chia sẻ những kiến thức bổ ích này.",
    date: "1 ngày trước",
    likes: 5,
  },
];

// --- COMPONENTS ---

const RippleButton: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, children, className }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const circle = document.createElement("span");
    circle.style.position = "absolute";
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.transform = "translate(-50%, -50%)";
    circle.style.width = "0px";
    circle.style.height = "0px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    circle.style.pointerEvents = "none";

    btn.appendChild(circle);

    if (window.gsap) {
      window.gsap.to(circle, {
        width: "300px",
        height: "300px",
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => circle.remove(),
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

const PostDetail: React.FC<{ post: BlogPostDetail; onClose: () => void }> = ({
  post,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<
    "content" | "insights" | "discussion"
  >("content");

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Entry animation - use fromTo for reliability
    if (window.gsap && containerRef.current) {
      window.gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    if (window.gsap && containerRef.current) {
      window.gsap.to(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex justify-center overflow-y-auto"
      onClick={handleClose}
    >
      <div
        ref={containerRef}
        className="bg-[#121212] w-full max-w-4xl min-h-screen md:min-h-0 md:mt-10 md:mb-10 md:rounded-lg shadow-2xl relative flex flex-col"
        style={{ opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-cnxh-red transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Hero Image */}
        <div className="relative h-64 md:h-80 w-full shrink-0 overflow-hidden md:rounded-t-lg">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <div className="flex gap-2 mb-3 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-cnxh-red/80 text-white text-xs font-bold uppercase tracking-widest rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-2xl md:text-4xl font-serif text-white leading-tight mb-2">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-400 text-sm">
              <span>{post.author}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-white/10 px-6 md:px-8">
          <div className="flex gap-1">
            {[
              { id: "content", label: "Nội dung", icon: "📄" },
              { id: "insights", label: "Kiến thức", icon: "💡" },
              { id: "discussion", label: "Thảo luận", icon: "💬" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cnxh-red"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 detail-content flex-grow overflow-y-auto">
          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="space-y-8">
              {/* Full Content */}
              <div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
                  {post.fullContent}
                </p>
              </div>

              {/* Theoretical Basis */}
              {post.theoreticalBasis && (
                <div className="bg-cnxh-red/10 border-l-4 border-cnxh-red p-5 rounded-r">
                  <h3 className="text-cnxh-red uppercase text-xs font-bold tracking-wider mb-2 flex items-center gap-2">
                    📚 Cơ sở lý luận
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {post.theoreticalBasis}
                  </p>
                </div>
              )}

              {/* Practical Implications */}
              {post.practicalImplications &&
                post.practicalImplications.length > 0 && (
                  <div>
                    <h3 className="text-white uppercase text-xs font-bold tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-8 h-px bg-cnxh-red"></span>
                      Hàm ý thực tiễn
                    </h3>
                    <div className="grid gap-3">
                      {post.practicalImplications.map((impl, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-white/5 p-4 rounded border border-white/5"
                        >
                          <span className="bg-cnxh-red text-white text-xs font-bold w-6 h-6 rounded flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <p className="text-gray-300 text-sm">{impl}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* References */}
              {post.references && post.references.length > 0 && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="text-white uppercase text-xs font-bold tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-cnxh-red"></span>
                    Tài liệu tham khảo
                  </h3>
                  <ul className="space-y-2">
                    {post.references.map((ref, idx) => (
                      <li
                        key={idx}
                        className="text-gray-400 text-sm flex items-start gap-2"
                      >
                        <span className="text-cnxh-red">•</span>
                        <span>
                          {ref.author} ({ref.year}).{" "}
                          <em className="text-gray-300">{ref.title}</em>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === "insights" && (
            <div className="space-y-8">
              {/* Key Insights */}
              {post.keyInsights && post.keyInsights.length > 0 && (
                <div>
                  <h3 className="text-white uppercase text-xs font-bold tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-cnxh-red"></span>
                    Điểm chính của bài viết
                  </h3>
                  <div className="space-y-3">
                    {post.keyInsights.map((insight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-cnxh-red/10 to-transparent rounded border-l-2 border-cnxh-red"
                      >
                        <span className="text-cnxh-red text-lg">✦</span>
                        <p className="text-gray-200">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Concepts */}
              {post.relatedConcepts && post.relatedConcepts.length > 0 && (
                <div>
                  <h3 className="text-white uppercase text-xs font-bold tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-8 h-px bg-cnxh-red"></span>
                    Khái niệm liên quan
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.relatedConcepts.map((concept, idx) => (
                      <span
                        key={idx}
                        className="bg-white/5 text-gray-300 text-sm px-4 py-2 rounded-full border border-white/10 hover:border-cnxh-red/50 hover:bg-cnxh-red/10 transition-colors cursor-pointer"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Theoretical Basis (also in insights) */}
              {post.theoreticalBasis && (
                <div className="bg-[#1a1a1a] p-6 rounded-lg border border-white/5">
                  <h3 className="text-cnxh-red uppercase text-xs font-bold tracking-wider mb-3 flex items-center gap-2">
                    📖 Nền tảng lý luận
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {post.theoreticalBasis}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Discussion Tab */}
          {activeTab === "discussion" && (
            <div className="space-y-8">
              {/* Discussion Questions */}
              {post.discussionQuestions &&
                post.discussionQuestions.length > 0 && (
                  <div>
                    <h3 className="text-white uppercase text-xs font-bold tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-8 h-px bg-cnxh-red"></span>
                      Câu hỏi thảo luận
                    </h3>
                    <div className="space-y-4">
                      {post.discussionQuestions.map((question, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 p-5 rounded-lg border border-white/10 hover:border-cnxh-red/30 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <span className="bg-cnxh-red/20 text-cnxh-red text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                              ?
                            </span>
                            <p className="text-gray-200 leading-relaxed">
                              {question}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Comments Section */}
              <div ref={commentRef} className="border-t border-white/10 pt-8">
                <h3 className="text-xl font-serif text-white mb-6 flex items-center">
                  Bình luận{" "}
                  <span className="ml-2 text-sm bg-white/10 px-2 py-0.5 rounded-full text-gray-400">
                    {COMMENTS_MOCK.length}
                  </span>
                </h3>

                {/* Comment Input */}
                <div className="flex gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-cnxh-red/20 flex items-center justify-center text-cnxh-red font-bold shrink-0">
                    T
                  </div>
                  <div className="flex-1 relative">
                    <textarea
                      placeholder="Chia sẻ quan điểm của bạn..."
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cnxh-red transition-colors min-h-[100px] resize-none"
                    ></textarea>
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button className="text-xs uppercase font-bold text-gray-500 hover:text-white transition-colors">
                        Hủy
                      </button>
                      <button className="text-xs uppercase font-bold bg-cnxh-red text-white px-4 py-1.5 rounded hover:bg-red-900 transition-colors">
                        Gửi
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comment List */}
                <div className="space-y-6">
                  {COMMENTS_MOCK.map((comment) => (
                    <div key={comment.id} className="comment-item flex gap-4">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-white text-sm">
                            {comment.author}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                          {comment.content}
                        </p>
                        <div className="flex gap-4 text-xs font-bold text-gray-600">
                          <button className="hover:text-cnxh-red flex items-center gap-1">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                            </svg>
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
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 flex justify-between items-center bg-[#0a0a0a] md:rounded-b-lg">
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </button>
            <button className="p-2 bg-white/5 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
          </div>
          <button
            onClick={handleClose}
            className="bg-cnxh-red hover:bg-cnxh-red/80 text-white px-6 py-2 rounded text-sm font-medium transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPostDetail | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = [...new Set(POSTS.flatMap((post) => post.tags))];

  // Filter posts
  const filteredPosts = filterTag
    ? POSTS.filter((post) => post.tags.includes(filterTag))
    : POSTS;

  // Simple hover effect for images (no complex animations)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    img.style.transform = "scale(1.05)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    img.style.transform = "scale(1)";
  };

  return (
    <div
      className="min-h-screen pt-32 px-6 bg-cnxh-black pb-20"
      style={{ opacity: 1, visibility: "visible" }}
    >
      <div
        className="max-w-5xl mx-auto"
        style={{ opacity: 1, visibility: "visible" }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Góc nhìn & Phân tích
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Diễn đàn trao đổi học thuật, phân tích sâu về các vấn đề lý luận và
            thực tiễn trong xây dựng CNXH.
          </p>

          {/* Filter Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilterTag(null)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                filterTag === null
                  ? "bg-cnxh-red text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              Tất cả
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  filterTag === tag
                    ? "bg-cnxh-red text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-12 pb-6 border-b border-white/10">
          <div className="text-gray-500 text-sm">
            Hiển thị{" "}
            <span className="text-white font-bold">{filteredPosts.length}</span>{" "}
            bài viết
          </div>
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 rounded hover:bg-white/10 transition-colors text-gray-400">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button className="p-2 bg-cnxh-red/20 rounded text-cnxh-red">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Blog List */}
        <div
          className="blog-list space-y-12"
          style={{ opacity: 1, visibility: "visible" }}
        >
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className={`blog-post-card flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center group`}
              style={{ opacity: 1, visibility: "visible" }}
            >
              {/* Thumbnail with Parallax Hover */}
              <div
                className="w-full md:w-1/2 h-64 md:h-72 overflow-hidden rounded-lg relative cursor-pointer shadow-lg"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedPost(post)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform will-change-transform"
                />
                {/* Quick Stats */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center">
                  <div className="flex gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-cnxh-red/90 text-white text-[10px] font-bold uppercase tracking-wider rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-white/80 text-xs">
                    <span className="flex items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      {Math.floor(Math.random() * 500) + 100}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      {COMMENTS_MOCK.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">
                    {post.date}
                  </span>
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-500 text-xs">{post.author}</span>
                </div>
                <h2
                  onClick={() => setSelectedPost(post)}
                  className="text-xl md:text-2xl font-serif text-white mb-4 cursor-pointer hover:text-cnxh-red transition-colors leading-tight"
                >
                  {post.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4 line-clamp-3 text-sm">
                  {post.excerpt}
                </p>

                {/* Key Insights Preview */}
                {post.keyInsights && post.keyInsights.length > 0 && (
                  <div className="mb-5 p-3 bg-white/5 rounded border-l-2 border-cnxh-red">
                    <p className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-cnxh-red">✦</span>
                      {post.keyInsights[0]}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <RippleButton
                    onClick={() => setSelectedPost(post)}
                    className="px-5 py-2 bg-cnxh-red text-sm text-white hover:bg-cnxh-red/80 transition-colors rounded font-medium"
                  >
                    Đọc bài viết
                  </RippleButton>
                  <button
                    onClick={() => setSelectedPost(post)}
                    className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
                  >
                    <span>{post.keyInsights?.length || 0} điểm chính</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-serif text-white mb-2">
              Không có bài viết
            </h3>
            <p className="text-gray-500">
              Không tìm thấy bài viết với bộ lọc hiện tại.
            </p>
            <button
              onClick={() => setFilterTag(null)}
              className="mt-4 text-cnxh-red hover:underline"
            >
              Xem tất cả bài viết
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredPosts.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-8 py-3 border border-white/20 text-white text-sm uppercase tracking-wider font-medium hover:bg-white hover:text-black transition-colors rounded">
              Xem thêm bài viết
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedPost && (
        <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};
