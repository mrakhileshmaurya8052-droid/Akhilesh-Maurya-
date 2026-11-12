import { Batch } from '../types.ts';
import { generateBatchThumbnail } from '../utils/thumbnailGenerator.ts';

export const ADMIN_ACCESS_CODE = 'Shivkumari872@';
export const LOCAL_STORAGE_KEY = 'uc_live_batches_store_v1';

export function getInitialBatches(): Batch[] {
  // Check if browser has localStorage
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
  }

  // Pre-generate starter thumbnails cleanly using canvas
  const thumb1 = generateBatchThumbnail({
    title: 'UC LIVE TARGET BATCH 2026',
    subtitle: 'Daily Live Classes, PDF Notes & Full Syllabus Test',
    badgeText: 'HOT BATCH',
    theme: 'tricolor',
    isLive: true,
    category: 'LIVE STREAM'
  });

  const thumb2 = generateBatchThumbnail({
    title: 'UC OFFICIAL TELEGRAM CHANNEL',
    subtitle: 'Fastest Updates, Daily Quizzes & Exclusive Links',
    badgeText: '120K MEMBERS',
    theme: 'emerald-green',
    isLive: false,
    category: 'TELEGRAM'
  });

  const thumb3 = generateBatchThumbnail({
    title: 'UC AUTO BOT ASSISTANT 24/7',
    subtitle: 'Instant PDF Downloads, Test Links & Auto Query',
    badgeText: 'BOT ONLINE',
    theme: 'cyber-yellow',
    isLive: false,
    category: 'TELEGRAM BOT'
  });

  const thumb4 = generateBatchThumbnail({
    title: 'LIVE WEBVIEW PORTAL & PLAYER',
    subtitle: 'Direct In-App Webview Streaming Player with Zero Lag',
    badgeText: 'WEBVIEW 4K',
    theme: 'crimson-red',
    isLive: true,
    category: 'WEBVIEW'
  });

  const thumb5 = generateBatchThumbnail({
    title: 'SPEED REVISION & FORMULA CRACKER',
    subtitle: 'High Impact 30-Day Crash Course with Mock Tests',
    badgeText: 'SPECIAL',
    theme: 'dark-gold',
    isLive: false,
    category: 'VIP BATCH'
  });

  const thumb6 = generateBatchThumbnail({
    title: 'TELEGRAM NOTIFICATION BOT V2',
    subtitle: 'Instant Alerts for Every Live Class & Special Announcements',
    badgeText: 'BOT READY',
    theme: 'cyber-yellow',
    isLive: true,
    category: 'TELEGRAM BOT'
  });

  const defaultBatches: Batch[] = [
    {
      id: 'uc-batch-1',
      title: 'UC LIVE VIP BATCH 2026',
      subtitle: 'Complete Interactive Live Stream & High-Def Webview Classes',
      category: 'LIVE_CLASS',
      linkType: 'website',
      primaryUrl: 'https://wikipedia.org',
      thumbnail: thumb1,
      isLive: true,
      badgeText: 'LIVE NOW',
      badgeColor: 'red',
      membersCount: '15.4K Students',
      description: 'Access top tier live interactive streaming, real-time discussion boards, test series, and high definition web player directly inside the app.',
      tags: ['Live', 'Full Course', 'High Speed'],
      createdAt: Date.now() - 3600000 * 5,
      verified: true
    },
    {
      id: 'uc-batch-2',
      title: 'UC OFFICIAL TELEGRAM CHANNEL',
      subtitle: 'Join India\'s Most Active Community for Daily PDFs & Alerts',
      category: 'TELEGRAM_CHANNEL',
      linkType: 'telegram',
      primaryUrl: 'https://t.me/telegram',
      thumbnail: thumb2,
      isLive: false,
      badgeText: 'JOIN CHANNEL',
      badgeColor: 'green',
      membersCount: '128.5K Subs',
      description: 'Instant notifications, curated study materials, discussion forums, and direct access to upcoming lectures and schedules.',
      tags: ['Telegram', 'Daily PDFs', 'Alerts'],
      createdAt: Date.now() - 3600000 * 4,
      verified: true
    },
    {
      id: 'uc-batch-3',
      title: 'UC AUTO ASSISTANT BOT',
      subtitle: 'Smart Telegram Bot for Batch Enrolment, Notes & Auto Help',
      category: 'TELEGRAM_BOT',
      linkType: 'bot',
      primaryUrl: 'https://t.me/BotFather',
      botCommand: '/start',
      thumbnail: thumb3,
      isLive: true,
      badgeText: 'ACTIVE BOT',
      badgeColor: 'yellow',
      membersCount: '24/7 Online',
      description: 'Automated 24/7 Telegram assistant. Send /start to access lecture links, chapter notes, doubt solving, and batch timetable in seconds.',
      tags: ['Bot', 'Instant Support', 'Command /start'],
      createdAt: Date.now() - 3600000 * 3,
      verified: true
    },
    {
      id: 'uc-batch-4',
      title: 'UC IN-APP WEBVIEW STREAM HUB',
      subtitle: 'Direct In-App Web Browser View with Fullscreen & Controls',
      category: 'WEBVIEW_STREAM',
      linkType: 'website',
      primaryUrl: 'https://example.com',
      thumbnail: thumb4,
      isLive: true,
      badgeText: 'WEBVIEW LIVE',
      badgeColor: 'red',
      membersCount: 'HD 1080p',
      description: 'Integrated sleek browser view with back, refresh, copy URL, and zero-distraction layout built directly inside UC LIVE.',
      tags: ['Webview', 'Zero Lag', 'Direct Browser'],
      createdAt: Date.now() - 3600000 * 2,
      verified: true
    },
    {
      id: 'uc-batch-5',
      title: 'FAST CRACK SPECIAL BATCH',
      subtitle: 'Exclusive Problem Sets, Rapid Tricks & Dedicated Doubt Desk',
      category: 'SPECIAL_BATCH',
      linkType: 'telegram',
      primaryUrl: 'https://t.me/telegram',
      thumbnail: thumb5,
      isLive: false,
      badgeText: 'TOP RATED',
      badgeColor: 'yellow',
      membersCount: '4.9 ★ Rating',
      description: 'Master key concepts with condensed revision modules, chapter-wise test practice, and direct mentor guidance.',
      tags: ['Special', 'Rapid Revision', 'Mentorship'],
      createdAt: Date.now() - 3600000 * 1,
      verified: true
    },
    {
      id: 'uc-batch-6',
      title: 'UC NOTIFIER & QUIZ BOT',
      subtitle: 'Daily Live Quiz Bot with Leaderboards and Instant Solution PDFs',
      category: 'TELEGRAM_BOT',
      linkType: 'bot',
      primaryUrl: 'https://t.me/BotFather',
      botCommand: '/quiz',
      thumbnail: thumb6,
      isLive: false,
      badgeText: 'QUIZ BOT',
      badgeColor: 'green',
      membersCount: '8.9K Daily Users',
      description: 'Engage with daily time-bound quizzes on your mobile telegram app. Track score ranks, accuracy graphs, and solution breakdowns.',
      tags: ['Bot', 'Live Quiz', 'Leaderboard'],
      createdAt: Date.now(),
      verified: true
    }
  ];

  return defaultBatches;
}

export function saveBatchesToStorage(batches: Batch[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(batches));
    } catch (e) {
      console.error('Failed to save batches to localStorage', e);
    }
  }
}
