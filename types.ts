export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: string; // e.g., "Beginner", "Intermediate"
  icon?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
