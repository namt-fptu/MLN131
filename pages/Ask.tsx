import React, { useState, useRef, useEffect } from "react";
import { GoogleGenAI, Type } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { AiResponse } from "../types";

const SUGGESTED_QUESTIONS = [
  "Sứ mệnh lịch sử của giai cấp công nhân là gì?",
  "Tại sao nói Chủ nghĩa xã hội khoa học là tất yếu?",
  "Mối quan hệ giữa Triết học và thực tiễn?",
  "Ý nghĩa thời đại của Cách mạng Tháng Mười Nga?",
  "Vai trò của Đảng Cộng sản Việt Nam?",
];

export const Ask: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<AiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const recsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (questionText: string = question) => {
    if (!questionText.trim()) return;

    if (questionText !== question) setQuestion(questionText);

    setIsLoading(true);
    setResponse(null);
    setError(null);

    // 1. Continuous Shake Animation (Thinking phase)
    if (window.gsap && boxRef.current) {
      window.gsap.to(boxRef.current, {
        x: "random(-4, 4)",
        y: "random(-4, 4)",
        duration: 0.08, // Faster, subtle vibration
        repeat: -1, // Infinite repeat while loading
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    try {
      // 2. Call Gemini API
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = "gemini-2.5-flash";

      const systemInstruction = `
Bạn là một Giáo sư Triết học uyên thâm, chuyên sâu về Chủ nghĩa Xã hội Khoa học và Triết học Mác - Lênin, với nhiều năm kinh nghiệm giảng dạy và nghiên cứu.

NHIỆM VỤ CHÍNH:
- Trả lời câu hỏi theo phương pháp Socrates: gợi mở tư duy, dẫn dắt người học tự khám phá chân lý thay vì đưa ra đáp án trực tiếp
- Kết nối lý thuyết với thực tiễn đương đại, giúp người học thấy được ý nghĩa của triết học trong cuộc sống
- Khuyến khích tư duy phản biện, phê phán và sáng tạo

PHONG CÁCH TRÌNH BÀY:
- Trang trọng nhưng gần gũi, sâu sắc nhưng dễ hiểu
- Sử dụng ẩn dụ, ví dụ minh họa sinh động từ thực tế
- Truyền cảm hứng học tập và khát khao tìm hiểu triết học
- Tôn trọng quan điểm của người học, khuyến khích đối t화

CẤU TRÚC TRẢ LỜI:
1. Mở đầu bằng câu hỏi gợi mở hoặc trích dẫn triết học liên quan
2. Phân tích vấn đề từ nhiều góc độ, làm rõ các khái niệm cốt lõi
3. Kết nối với bối cảnh lịch sử và thực tiễn đương đại
4. Kết thúc bằng câu hỏi suy ngẫm để người học tự khám phá sâu hơn

YÊU CẦU OUTPUT - JSON HỢP LỆ:
{
  "answer": "Câu trả lời dưới dạng Markdown với định dạng:\n\n**In đậm** cho khái niệm quan trọng\n\n### Tiêu đề cho các ý chính\n\n- Danh sách gạch đầu dòng\n\n> Trích dẫn để làm nổi bật\n\nHãy chia nhỏ đoạn văn, sử dụng khoảng trắng hợp lý để dễ đọc."
}

LƯU Ý QUAN TRỌNG:
- Chỉ trả về JSON hợp lệ, KHÔNG thêm markdown backticks hay văn bản nào khác
- Đảm bảo tất cả chuỗi JSON được escape đúng cách (sử dụng \\n cho xuống dòng)
- KHÔNG bao gồm trường "recommendations" - chỉ trả về trường "answer"
`;

      const result = await ai.models.generateContent({
        model: model,
        contents: questionText,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              answer: { type: Type.STRING },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    author: { type: Type.STRING },
                    type: { type: Type.STRING },
                    summary: { type: Type.STRING },
                    link: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });

      const jsonResponse: AiResponse = JSON.parse(result.text || "{}");
      setResponse(jsonResponse);
    } catch (err) {
      console.error("AI Error:", err);
      setError("Hệ thống tư duy đang bận. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
      // Stop shake / Reset position immediately
      if (window.gsap && boxRef.current) {
        window.gsap.killTweensOf(boxRef.current);
        window.gsap.to(boxRef.current, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  };

  // 3. Reveal Animation Logic
  useEffect(() => {
    if (response && window.gsap && answerRef.current) {
      const tl = window.gsap.timeline();

      // Fade in the whole answer block
      tl.fromTo(
        answerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      // Grow underline glow after text finishes
      if (underlineRef.current) {
        tl.to(
          underlineRef.current,
          {
            width: "100%",
            duration: 1.5,
            ease: "power4.out",
            boxShadow: "0 0 25px rgba(128, 0, 32, 0.8)",
            background:
              "linear-gradient(90deg, transparent 0%, #800020 50%, transparent 100%)",
          },
          "-=0.5"
        );
      }

      // Show recommendations
      if (recsRef.current && recsRef.current.children.length > 0) {
        tl.fromTo(
          recsRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        );
      }
    }
  }, [response]);

  return (
    <div className="min-h-screen pt-32 px-6 bg-cnxh-black flex flex-col items-center pb-20">
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
          Hỏi đáp Triết học
        </h1>
        <p className="text-gray-400 font-light text-lg">
          Đặt câu hỏi để kích thích tư duy biện chứng. AI sẽ đóng vai trò người
          dẫn đường, không chỉ đưa ra câu trả lời mà còn mở ra những chân trời
          nhận thức mới.
        </p>
      </div>

      {/* Input Box Area */}
      <div className="w-full max-w-2xl relative z-10">
        <div
          ref={boxRef}
          className={`bg-[#151515] border transition-all duration-300 rounded-sm p-2 shadow-2xl relative
            ${
              isLoading
                ? "border-cnxh-red/80 shadow-[0_0_40px_rgba(128,0,32,0.4)]"
                : "border-white/10 hover:border-cnxh-red/30"
            }
          `}
        >
          <div className="relative">
            <textarea
              ref={inputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ví dụ: Tại sao giai cấp công nhân lại có sứ mệnh lịch sử?"
              disabled={isLoading}
              className="w-full h-32 bg-transparent text-white font-serif text-lg p-4 focus:outline-none resize-none placeholder-gray-600"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />

            <div className="flex justify-between items-center px-4 pb-2">
              <span
                className={`text-xs uppercase tracking-widest transition-colors ${
                  isLoading ? "text-cnxh-red animate-pulse" : "text-gray-600"
                }`}
              >
                {isLoading ? "Đang suy ngẫm..." : "Nhấn Enter để gửi"}
              </span>
              <button
                onClick={() => handleSubmit()}
                disabled={isLoading || !question.trim()}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300
                  ${
                    isLoading
                      ? "bg-cnxh-red scale-90"
                      : "bg-white/10 hover:bg-cnxh-red text-white"
                  }
                `}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      {!response && !isLoading && (
        <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-3xl px-4">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSubmit(q)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:bg-white/10 hover:text-white hover:border-cnxh-red/50 transition-all duration-300"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-8 text-red-400 font-mono text-sm border border-red-900/50 p-4 bg-red-900/10 rounded animate-fade-in">
          {error}
        </div>
      )}

      {/* Response Section */}
      {response && (
        <div className="w-full max-w-4xl mt-20">
          {/* Answer Text */}
          <div className="relative mb-16 px-4 md:px-0">
            <div
              ref={answerRef}
              className="font-serif text-xl md:text-2xl text-gray-200 leading-relaxed text-justify opacity-0"
            >
              <ReactMarkdown
                components={{
                  strong: ({ node, ...props }) => (
                    <span className="text-cnxh-red font-bold" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-2xl font-bold text-white mt-8 mb-4 border-l-4 border-cnxh-red pl-3"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc list-inside mb-6 space-y-2 ml-4"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-300 pl-2" {...props} />
                  ),
                  p: ({ node, ...props }) => <p className="mb-6" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-gray-600 pl-4 italic text-gray-400 my-4"
                      {...props}
                    />
                  ),
                }}
              >
                {response.answer}
              </ReactMarkdown>
            </div>

            {/* Underline Glow */}
            <div className="relative mt-8 h-1 w-full flex justify-center">
              <div
                ref={underlineRef}
                className="h-full bg-cnxh-red w-0 rounded-full opacity-80 shadow-[0_0_10px_#800020]"
              ></div>
            </div>
          </div>

          {/* Recommendations Grid */}
          {response.recommendations.length > 0 && (
            <div className="border-t border-white/10 pt-12">
              <h3 className="text-cnxh-red text-xs font-bold uppercase tracking-[0.2em] mb-8">
                Tài liệu tham khảo & Gợi mở
              </h3>

              <div
                ref={recsRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {response.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="group bg-[#121212] border border-white/10 p-6 rounded-sm hover:border-cnxh-red transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_-10px_rgba(128,0,32,0.2)] relative overflow-hidden"
                  >
                    {/* Hover glow background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cnxh-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-1 rounded border border-white/5 ${
                            rec.type === "Book"
                              ? "bg-blue-900/20 text-blue-300"
                              : "bg-green-900/20 text-green-300"
                          }`}
                        >
                          {rec.type}
                        </span>
                        {/* Icon with hover rotation */}
                        <svg
                          className="w-5 h-5 text-gray-600 group-hover:text-cnxh-red group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>

                      <h4 className="text-white font-serif text-lg font-bold mb-1 group-hover:text-cnxh-red transition-colors">
                        {rec.title}
                      </h4>
                      <p className="text-gray-500 text-xs italic mb-4 border-l-2 border-cnxh-red/50 pl-2">
                        {rec.author}
                      </p>

                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {rec.summary}
                      </p>

                      {rec.link && (
                        <a
                          href={rec.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs text-white group/link"
                        >
                          <span className="border-b border-cnxh-red pb-0.5 group-hover/link:text-cnxh-red transition-colors">
                            Đọc chi tiết
                          </span>
                          <svg
                            className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-cnxh-red"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
