export type NavigationTab = 'dashboard' | 'analytics' | 'messages' | 'assets' | 'settings';

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  status: 'online' | 'busy' | 'offline';
  avatarBg: string;
  currentActivity?: string;
}

export interface AssetItem {
  id: string;
  title: string;
  category: 'Component' | 'Neural Filter' | 'Vector' | 'UI Kit' | '3D Render';
  updatedAt: string;
  author: string;
  size: string;
  tags: string[];
  gradient: string;
  blurLevel: string;
  downloads: number;
  previewUrl?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  avatarBg: string;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    type: string;
    size: string;
  };
}

export interface NotificationItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  read: boolean;
  type: 'edit' | 'comment' | 'share' | 'system';
}

export interface GlassConfig {
  blur: number; // in px
  bgOpacity: number; // 0 to 100
  borderOpacity: number; // 0 to 100
  accentColor: string;
  glowIntensity: number;
}
