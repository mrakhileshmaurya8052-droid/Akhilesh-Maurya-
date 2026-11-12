import React from 'react';
import { VerifiedBadge } from './VerifiedBadge.tsx';
import { Radio, ShieldAlert, Sparkles, Send, Bot, Globe, Lock } from 'lucide-react';

interface NavbarProps {
  totalBatches: number;
  liveCount: number;
  activeFilter: string;
  onSelectFilter: (category: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalBatches,
  liveCount,
  activeFilter,
  onSelectFilter,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#08090ebf] border-b border-zinc-800/80 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top Highlights Ticker with Red, Yellow, Green status lights */}
      <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-1.5 border-b border-zinc-800/50 text-[11px] font-cyber tracking-wider flex items-center justify-between">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          <span className="flex items-center gap-1.5 text-red-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            LIVE STREAM ACTIVE: {liveCount} BATCHES
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-yellow-400 font-semibold hidden sm:flex">
            <Sparkles size={12} className="text-yellow-400" />
            OFFICIAL BATCHES: {totalBatches}
          </span>
          <span className="text-zinc-600 hidden md:inline">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold hidden md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
            TELEGRAM & BOT NETWORK: 100% ONLINE
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo Section: UC LIVE with yellow check mark */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onSelectFilter('ALL')}>
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-black border-2 border-yellow-400/80 shadow-[0_0_20px_rgba(234,179,8,0.35)] group">
                <span className="font-heading font-black text-xl tracking-tighter bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  UC
                </span>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                    <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
                      UC LIVE
                    </span>
                    {/* YELLOW CHECK AS SPECIFIED: UC NAME KE AAGE YELLOW COLOUR CHECK LAGA RAHE */}
                    <VerifiedBadge size="md" />
                  </h1>
                </div>
                <p className="text-[11px] font-cyber text-zinc-400 tracking-wider flex items-center gap-1.5">
                  <span className="text-yellow-400 font-bold">OFFICIAL</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-red-400 font-bold">LIVE STREAMS</span>
                  <span className="text-zinc-600">/</span>
                  <span className="text-emerald-400 font-bold">BOTS & TELEGRAM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Search bar & quick filter pills */}
          <div className="flex items-center gap-3 flex-1 max-w-xl md:mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search Batches, Telegram Channels, Bots, Webviews..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all font-sans shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-1.5 font-medium shadow-[0_0_12px_rgba(239,68,68,0.15)]">
              <Radio size={14} className="animate-pulse" />
              <span>Live Webview</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5 font-medium shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <Send size={13} />
              <span>Telegram Links</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center gap-1.5 font-medium shadow-[0_0_12px_rgba(234,179,8,0.15)]">
              <Bot size={14} />
              <span>Bots Ready</span>
            </div>
          </div>

        </div>

        {/* Category Filter Chips Bar */}
        <div className="mt-3.5 pt-3 border-t border-zinc-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-semibold">
          <FilterChip
            label="All Batches"
            count={totalBatches}
            active={activeFilter === 'ALL'}
            onClick={() => onSelectFilter('ALL')}
            highlightColor="yellow"
          />
          <FilterChip
            icon={<Radio size={12} className="text-red-400 animate-pulse" />}
            label="Live Classes"
            active={activeFilter === 'LIVE_CLASS'}
            onClick={() => onSelectFilter('LIVE_CLASS')}
            highlightColor="red"
          />
          <FilterChip
            icon={<Send size={12} className="text-emerald-400" />}
            label="Telegram Channels"
            active={activeFilter === 'TELEGRAM_CHANNEL'}
            onClick={() => onSelectFilter('TELEGRAM_CHANNEL')}
            highlightColor="green"
          />
          <FilterChip
            icon={<Bot size={12} className="text-yellow-400" />}
            label="Telegram Bots"
            active={activeFilter === 'TELEGRAM_BOT'}
            onClick={() => onSelectFilter('TELEGRAM_BOT')}
            highlightColor="yellow"
          />
          <FilterChip
            icon={<Globe size={12} className="text-blue-400" />}
            label="Webview Portals"
            active={activeFilter === 'WEBVIEW_STREAM'}
            onClick={() => onSelectFilter('WEBVIEW_STREAM')}
            highlightColor="red"
          />
          <FilterChip
            icon={<Sparkles size={12} className="text-amber-400" />}
            label="Special Batches"
            active={activeFilter === 'SPECIAL_BATCH'}
            onClick={() => onSelectFilter('SPECIAL_BATCH')}
            highlightColor="yellow"
          />
        </div>
      </div>
    </header>
  );
};

interface FilterChipProps {
  label: string;
  count?: number;
  icon?: React.ReactNode;
  active: boolean;
  onClick: () => void;
  highlightColor: 'yellow' | 'red' | 'green';
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  count,
  icon,
  active,
  onClick,
  highlightColor
}) => {
  let activeStyles = 'bg-yellow-400 text-black border-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.4)]';
  if (highlightColor === 'red') {
    activeStyles = 'bg-red-600 text-white border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]';
  } else if (highlightColor === 'green') {
    activeStyles = 'bg-emerald-500 text-black border-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]';
  }

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
        active 
          ? activeStyles 
          : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80'
      }`}
    >
      {icon}
      <span>{label}</span>
      {count !== undefined && (
        <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${active ? 'bg-black/20 text-current' : 'bg-zinc-800 text-zinc-400'}`}>
          {count}
        </span>
      )}
    </button>
  );
};
