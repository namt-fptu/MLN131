export interface NavItem {
  label: string;
  path: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface LibraryTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // HTML content or long text
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

export interface QuoteItem {
  id: string;
  text: string;
  author: string;
  source: string;
  analysis: string;
}

export type HistoryTrackType = 'vietnam' | 'world' | 'philosophy';

export interface ParallelEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  track: HistoryTrackType;
  image?: string;
}

export interface MindmapNodeData {
  id: string;
  label: string;
  description?: string;
  children?: MindmapNodeData[];
}

export interface Recommendation {
  title: string;
  author: string;
  type: 'Book' | 'Article' | 'Document';
  summary: string;
  link?: string;
}

export interface AiResponse {
  answer: string;
  recommendations: Recommendation[];
}
