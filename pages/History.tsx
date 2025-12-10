import React, { useEffect, useState, useRef } from "react";
import { TimelineEvent } from "../types";
import { ParallelTimeline } from "../components/ParallelTimeline";

interface HistoryEventDetail extends TimelineEvent {
  content: string;
  keyFigures: string[];
  significance: string[];
  relatedEvents: string[];
}

const timelineEvents: HistoryEventDetail[] = [
  {
    year: "1848",
    title: "Tuyên ngôn của Đảng Cộng sản",
    description:
      "C.Mác và Ph.Ăngghen công bố văn kiện cương lĩnh đầu tiên, đánh dấu sự ra đời của Chủ nghĩa xã hội khoa học.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800",
    content: `Tuyên ngôn của Đảng Cộng sản là văn kiện lý luận quan trọng nhất của chủ nghĩa Mác, được C.Mác và Ph.Ăngghen soạn thảo vào cuối năm 1847 và công bố tháng 2/1848 tại London. Đây là cương lĩnh chính trị đầu tiên của giai cấp công nhân quốc tế, trình bày một cách có hệ thống những nguyên lý cơ bản của chủ nghĩa cộng sản khoa học.`,
    keyFigures: [
      "C.Mác (Karl Marx)",
      "Ph.Ăngghen (Friedrich Engels)",
      "Liên đoàn những người Cộng sản",
    ],
    significance: [
      "Đánh dấu sự ra đời của Chủ nghĩa xã hội khoa học",
      "Khẳng định sứ mệnh lịch sử của giai cấp công nhân",
      "Đặt nền móng cho phong trào cộng sản quốc tế",
      "Phân tích quy luật vận động của xã hội tư bản",
    ],
    relatedEvents: [
      "Cách mạng Tháng Mười Nga",
      "Thành lập Đảng Cộng sản Việt Nam",
    ],
  },
  {
    year: "1917",
    title: "Cách mạng Tháng Mười Nga",
    description:
      "V.I.Lênin lãnh đạo giai cấp công nhân Nga hiện thực hóa lý luận thành thực tiễn, mở ra thời đại mới.",
    image:
      "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=800",
    content: `Cách mạng Tháng Mười Nga năm 1917 là cuộc cách mạng vô sản đầu tiên thành công trên thế giới, do V.I.Lênin và Đảng Bônsêvích lãnh đạo. Cuộc cách mạng đã lật đổ chính quyền tư sản lâm thời, thiết lập nhà nước xã hội chủ nghĩa đầu tiên trong lịch sử nhân loại - Nhà nước Xô viết.`,
    keyFigures: [
      "V.I.Lênin",
      "Đảng Bônsêvích",
      "Xô viết công nhân và binh lính",
    ],
    significance: [
      "Mở ra thời đại mới - thời đại quá độ từ CNTB lên CNXH",
      "Chứng minh tính đúng đắn của học thuyết Mác",
      "Cổ vũ phong trào giải phóng dân tộc trên toàn thế giới",
      "Xây dựng nhà nước XHCN đầu tiên trong lịch sử",
    ],
    relatedEvents: [
      "Tuyên ngôn của Đảng Cộng sản",
      "Thành lập Đảng Cộng sản Việt Nam",
    ],
  },
  {
    year: "1930",
    title: "Thành lập Đảng Cộng sản Việt Nam",
    description:
      "Nguyễn Ái Quốc vận dụng sáng tạo chủ nghĩa Mác-Lênin vào thực tiễn cách mạng Việt Nam.",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800",
    content: `Ngày 3/2/1930, tại Hương Cảng (Trung Quốc), Nguyễn Ái Quốc đã chủ trì Hội nghị hợp nhất các tổ chức cộng sản, thành lập Đảng Cộng sản Việt Nam. Đây là sự kiện chính trị trọng đại, đánh dấu bước ngoặt vĩ đại trong lịch sử cách mạng Việt Nam.`,
    keyFigures: [
      "Nguyễn Ái Quốc (Hồ Chí Minh)",
      "Trần Phú",
      "Lê Hồng Phong",
      "Hà Huy Tập",
    ],
    significance: [
      "Chấm dứt thời kỳ khủng hoảng về đường lối cách mạng",
      "Kết hợp chủ nghĩa Mác-Lênin với phong trào công nhân và yêu nước",
      "Mở ra thời kỳ mới cho cách mạng Việt Nam",
      "Đưa cách mạng Việt Nam trở thành một bộ phận của cách mạng thế giới",
    ],
    relatedEvents: ["Cách mạng Tháng Mười Nga", "Đổi mới tại Việt Nam"],
  },
  {
    year: "1986",
    title: "Đổi mới tại Việt Nam",
    description:
      "Đảng Cộng sản Việt Nam khởi xướng công cuộc Đổi mới, phát triển kinh tế thị trường định hướng XHCN.",
    image:
      "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800",
    content: `Đại hội VI của Đảng Cộng sản Việt Nam (tháng 12/1986) đã khởi xướng công cuộc Đổi mới toàn diện đất nước. Đây là quyết định lịch sử, đưa Việt Nam thoát khỏi khủng hoảng kinh tế - xã hội, mở ra thời kỳ phát triển mới theo hướng công nghiệp hóa, hiện đại hóa.`,
    keyFigures: [
      "Tổng Bí thư Nguyễn Văn Linh",
      "Đại hội VI Đảng CSVN",
      "Nhân dân Việt Nam",
    ],
    significance: [
      "Chuyển đổi từ kinh tế tập trung sang kinh tế thị trường định hướng XHCN",
      "Mở cửa hội nhập quốc tế",
      "Đổi mới tư duy, nhất là tư duy kinh tế",
      "Đưa Việt Nam thoát khỏi khủng hoảng, phát triển bền vững",
    ],
    relatedEvents: [
      "Thành lập Đảng Cộng sản Việt Nam",
      "Tuyên ngôn của Đảng Cộng sản",
    ],
  },
];

export const History: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<HistoryEventDetail | null>(
    null
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.gsap || !window.ScrollTrigger) return;

    // Ensure timeline items are visible
    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      (item as HTMLElement).style.opacity = "1";
      (item as HTMLElement).style.transform = "translateX(0)";
    });
  }, []);

  // Modal animation
  useEffect(() => {
    if (selectedEvent && window.gsap && modalRef.current) {
      window.gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [selectedEvent]);

  const closeModal = () => {
    if (window.gsap && modalRef.current) {
      window.gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 20,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => setSelectedEvent(null),
      });
    } else {
      setSelectedEvent(null);
    }
  };

  const openRelatedEvent = (title: string) => {
    const event = timelineEvents.find((e) => e.title === title);
    if (event) setSelectedEvent(event);
  };

  return (
    <div className="bg-cnxh-black">
      {/* Introduction Section */}
      <div className="min-h-[60vh] pt-32 pb-10 px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <p className="text-cnxh-red text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Dòng chảy lịch sử
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Lịch sử Tư tưởng
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hành trình phát triển từ lý luận đến thực tiễn cách mạng, từ những
            trang sách đến những cuộc cách mạng làm thay đổi thế giới.
          </p>
        </div>

        <div className="timeline-container relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cnxh-red/20 via-cnxh-red to-cnxh-red/20 -translate-x-1/2 md:translate-x-0"></div>

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedEvent(event)}
                className={`timeline-item flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-0 relative cursor-pointer group ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
                style={{ opacity: 1, transform: "translateX(0)" }}
              >
                {/* Date Marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-cnxh-black border-2 border-cnxh-red rounded-full z-10 shadow-[0_0_15px_rgba(128,0,32,0.8)] group-hover:scale-150 group-hover:bg-cnxh-red transition-all duration-300"></div>

                {/* Content Side */}
                <div
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                  }`}
                >
                  <div className="text-cnxh-red font-bold text-5xl md:text-6xl font-serif opacity-30 mb-2 group-hover:opacity-60 transition-opacity">
                    {event.year}
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-cnxh-red transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-4">
                    {event.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-cnxh-red opacity-0 group-hover:opacity-100 transition-opacity">
                    Xem chi tiết{" "}
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </div>

                {/* Image Side */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pl-16" : "md:pr-16"
                  }`}
                >
                  {event.image && (
                    <div className="relative overflow-hidden rounded-sm border border-white/10 group-hover:border-cnxh-red/50 transition-colors">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 md:h-56 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cnxh-black/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-white text-sm font-serif">
                          {event.title}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parallel Timeline Section */}
      <ParallelTimeline />

      {/* Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-white/10 rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Modal Header with Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={
                  selectedEvent.image ||
                  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1200"
                }
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-cnxh-red/20 to-transparent"></div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 hover:bg-cnxh-red/50 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
              >
                ✕
              </button>

              {/* Year Badge */}
              <div className="absolute bottom-6 left-6">
                <span className="text-7xl md:text-8xl font-serif font-bold text-white/20">
                  {selectedEvent.year}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-8 -mt-12 relative z-10">
              {/* Title */}
              <div>
                <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                  {selectedEvent.title}
                </h2>
                <p className="text-gray-400">{selectedEvent.description}</p>
              </div>

              {/* Main Content */}
              <div>
                <h3 className="text-cnxh-red text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  Nội dung chi tiết
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {selectedEvent.content}
                </p>
              </div>

              {/* Key Figures */}
              <div>
                <h3 className="text-cnxh-red text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  Nhân vật chính
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedEvent.keyFigures.map((figure, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300"
                    >
                      👤 {figure}
                    </span>
                  ))}
                </div>
              </div>

              {/* Significance */}
              <div>
                <h3 className="text-cnxh-red text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  Ý nghĩa lịch sử
                </h3>
                <ul className="space-y-3">
                  {selectedEvent.significance.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="w-6 h-6 rounded-full bg-cnxh-red/20 text-cnxh-red text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Events */}
              <div>
                <h3 className="text-cnxh-red text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  Sự kiện liên quan
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedEvent.relatedEvents.map((title, idx) => (
                    <button
                      key={idx}
                      onClick={() => openRelatedEvent(title)}
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
