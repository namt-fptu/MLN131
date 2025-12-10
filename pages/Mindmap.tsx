import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MindmapNodeData } from '../types';

// --- MINDMAP DATA ---
const MINDMAP_DATA: MindmapNodeData = {
  id: 'root',
  label: 'CNXHKH',
  description: 'Hệ thống lý luận về sự chuyển biến từ CNTB lên CNXH.',
  children: [
    {
      id: 'history',
      label: 'Lịch sử Tư tưởng',
      description: 'Quá trình hình thành và phát triển.',
      children: [
        { id: 'h1', label: 'CNXH Không tưởng', description: 'Saint-Simon, Charles Fourier, Robert Owen' },
        { id: 'h2', label: 'C.Mác & Ph.Ăngghen', description: 'Người sáng lập, đưa từ không tưởng thành khoa học' },
        { id: 'h3', label: 'V.I.Lênin', description: 'Bảo vệ và phát triển trong thời đại đế quốc chủ nghĩa' },
        { id: 'h4', label: 'Hồ Chí Minh', description: 'Vận dụng sáng tạo vào điều kiện Việt Nam' }
      ]
    },
    {
      id: 'mission',
      label: 'Sứ mệnh GCCN',
      description: 'Giai cấp công nhân là lực lượng xã hội lãnh đạo.',
      children: [
        { id: 'm1', label: 'Đặc điểm chính trị', description: 'Tiên phong, cách mạng triệt để' },
        { id: 'm2', label: 'Nội dung sứ mệnh', description: 'Xóa bỏ áp bức, xây dựng xã hội mới' },
        { id: 'm3', label: 'Liên minh giai cấp', description: 'Công nhân - Nông dân - Trí thức' }
      ]
    },
    {
      id: 'transition',
      label: 'Thời kỳ quá độ',
      description: 'Giai đoạn chuyển tiếp tất yếu.',
      children: [
        { id: 't1', label: 'Tính tất yếu', description: 'CNTB chưa tự chuyển thành CNXH' },
        { id: 't2', label: 'Đặc điểm KT-XH', description: 'Đan xen cái cũ và cái mới' },
        { id: 't3', label: 'Con đường đi lên', description: 'Bỏ qua chế độ TBCN (ở VN)' }
      ]
    },
    {
      id: 'democracy',
      label: 'Dân chủ & Nhà nước',
      description: 'Hệ thống chính trị XHCN.',
      children: [
        { id: 'd1', label: 'Bản chất Dân chủ', description: 'Quyền lực thuộc về nhân dân' },
        { id: 'd2', label: 'Nhà nước Pháp quyền', description: 'Của dân, do dân, vì dân' },
        { id: 'd3', label: 'Đổi mới chính trị', description: 'Hoàn thiện bộ máy nhà nước' }
      ]
    },
    {
      id: 'culture',
      label: 'Dân tộc & Tôn giáo',
      description: 'Các vấn đề xã hội cơ bản.',
      children: [
        { id: 'c1', label: 'Cương lĩnh Dân tộc', description: 'Bình đẳng, đoàn kết, tương trợ' },
        { id: 'c2', label: 'Tôn giáo & Tín ngưỡng', description: 'Tự do tín ngưỡng, lương giáo đoàn kết' }
      ]
    },
    {
      id: 'family',
      label: 'Gia đình XHCN',
      description: 'Tế bào của xã hội.',
      children: [
        { id: 'f1', label: 'Chức năng gia đình', description: 'Tái sản xuất, giáo dục, kinh tế' },
        { id: 'f2', label: 'Xây dựng văn hóa', description: 'Gia đình no ấm, tiến bộ, hạnh phúc' }
      ]
    }
  ]
};

// --- TYPES & HELPERS ---

interface VisualNode {
  id: string;
  data: MindmapNodeData;
  x: number;
  y: number;
  level: number;
  parent?: { x: number; y: number };
  angle?: number;
}

// Simple radial layout calculation
const calculateLayout = (
  rootData: MindmapNodeData, 
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
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    if (node.level === 1 && node.data.children) {
      const newExpanded = new Set(expandedIds);
      if (newExpanded.has(node.id)) {
        newExpanded.delete(node.id);
      } else {
        newExpanded.add(node.id);
      }
      setExpandedIds(newExpanded);
    }
  };

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
                ${node.level === 0 ? 'z-30 w-40 h-40 rounded-full bg-gradient-to-br from-cnxh-red to-black border-4 border-cnxh-red shadow-[0_0_50px_rgba(128,0,32,0.6)]' : ''}
                ${node.level === 1 ? 'z-20 w-48 p-4 rounded-sm bg-[#1a1a1a] border border-white/20 hover:border-cnxh-red hover:shadow-[0_0_30px_rgba(128,0,32,0.4)] cursor-pointer' : ''}
                ${node.level === 2 ? 'z-10 w-40 p-3 rounded-sm bg-[#0a0a0a] border border-white/10 hover:bg-[#222] node-level-2' : ''}
              `}
              style={{ left: node.x, top: node.y }}
            >
              <div className={`font-serif text-white ${node.level === 0 ? 'text-2xl font-bold' : node.level === 1 ? 'text-lg font-bold' : 'text-sm font-medium text-gray-200'}`}>
                {node.data.label}
              </div>
              
              {node.data.description && (
                <div className={`mt-1 text-gray-400 ${node.level === 0 ? 'text-xs hidden' : node.level === 1 ? 'text-xs' : 'text-[10px] leading-tight'}`}>
                  {node.data.description}
                </div>
              )}

              {/* Expand/Collapse Indicator for Level 1 */}
              {node.level === 1 && node.data.children && (
                <div className="mt-2 text-cnxh-red text-xs uppercase font-bold tracking-widest opacity-60">
                   {expandedIds.has(node.id) ? 'Thu gọn' : 'Chi tiết'}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
