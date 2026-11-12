export type BatchCategory = 
  | 'LIVE_CLASS'
  | 'TELEGRAM_CHANNEL'
  | 'TELEGRAM_BOT'
  | 'WEBVIEW_STREAM'
  | 'SPECIAL_BATCH';

export type LinkType = 'telegram' | 'bot' | 'website' | 'other';

export type BadgeColor = 'yellow' | 'red' | 'green';

export interface Batch {
  id: string;
  title: string;
  subtitle: string;
  category: BatchCategory;
  linkType: LinkType;
  primaryUrl: string;
  botCommand?: string;
  thumbnail: string;
  isLive: boolean;
  badgeText: string;
  badgeColor: BadgeColor;
  membersCount?: string;
  description: string;
  tags: string[];
  createdAt: number;
  verified: boolean;
  customColor?: string;
}

export interface AdminCredentials {
  code: string;
}
