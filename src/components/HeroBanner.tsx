import React from 'react';
import { VerifiedBadge } from './VerifiedBadge.tsx';
import { Play, Send, Bot, Sparkles, Zap, Flame, ShieldCheck } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onOpenTelegram: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onOpenTelegram
}) => {
  return (
    <div className="relative overflow-hidden border-b border-zinc-800/80 bg-[#090b10]">
      {/* Dynamic neon ambient background flares */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top Pill with 3 colors */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-[0_0_15px_rgba(0,0,0,0.6)]">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-cyber tracking-wider text-zinc-300">
                OFFICIAL PORTAL
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                UC LIVE <VerifiedBadge size="sm" />
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-bold text-emerald-400">
                100% SECURE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white leading-tight">
              WELCOME TO{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(250,204,21,0.45)]">
                  UC LIVE
                </span>
                <span className="absolute -top-2 sm:-top-3 -right-7 sm:-right-9">
                  <VerifiedBadge size="lg" />
                </span>
              </span>
              <br />
              <span className="text-xl sm:text-3xl lg:text-4xl text-zinc-300 font-bold block mt-2">
                BATCHES • WEBVIEW • TELEGRAM & BOTS
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
              Experience ultra-fast batch access with instant In-App Webview streaming, verified Telegram channels, 
              automated responsive Telegram bots, and auto-generated HD thumbnails.
            </p>

            {/* Highlights Bar: Yellow, Red, Green feature cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
              {/* Yellow Highlight Card */}
              <div className="bg-gradient-to-b from-yellow-500/10 to-yellow-950/20 border border-yellow-500/30 rounded-xl p-3 text-center sm:text-left shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start text-yellow-400 font-bold text-xs sm:text-sm font-cyber mb-1">
                  <Zap size={14} />
                  <span>UC VERIFIED</span>
                </div>
                <p className="text-[11px] text-zinc-400 hidden sm:block">
                  All batches authenticated with yellow checkmark badge.
                </p>
                <div className="text-xs font-bold text-yellow-300 sm:hidden">Official</div>
              </div>

              {/* Red Highlight Card */}
              <div className="bg-gradient-to-b from-red-500/10 to-red-950/20 border border-red-500/30 rounded-xl p-3 text-center sm:text-left shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start text-red-400 font-bold text-xs sm:text-sm font-cyber mb-1">
                  <Flame size={14} className="animate-pulse" />
                  <span>WEBVIEW LIVE</span>
                </div>
                <p className="text-[11px] text-zinc-400 hidden sm:block">
                  Direct In-App Webview player with controls & fullscreen.
                </p>
                <div className="text-xs font-bold text-red-400 sm:hidden">In-App View</div>
              </div>

              {/* Green Highlight Card */}
              <div className="bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 border border-emerald-500/30 rounded-xl p-3 text-center sm:text-left shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <div className="flex items-center gap-1.5 justify-center sm:justify-start text-emerald-400 font-bold text-xs sm:text-sm font-cyber mb-1">
                  <Bot size={14} />
                  <span>TELEGRAM & BOTS</span>
                </div>
                <p className="text-[11px] text-zinc-400 hidden sm:block">
                  Instant connect to Telegram channels and active bots.
                </p>
                <div className="text-xs font-bold text-emerald-400 sm:hidden">Telegram</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-extrabold text-sm tracking-wide shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Play size={16} fill="black" />
                <span>EXPLORE ALL BATCHES</span>
              </button>

              <button
                onClick={onOpenTelegram}
                className="px-6 py-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 font-bold text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send size={16} className="text-emerald-400" />
                <span>JOIN OFFICIAL TELEGRAM</span>
              </button>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl p-1 bg-gradient-to-b from-yellow-400/40 via-red-500/30 to-emerald-400/30 shadow-[0_0_40px_rgba(0,0,0,0.9)]">
              <div className="bg-[#0b0d14] rounded-2xl p-5 border border-zinc-800/80 space-y-4">
                
                {/* Header inside mini card */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-white text-lg flex items-center gap-1.5">
                      UC LIVE <VerifiedBadge size="sm" />
                    </span>
                    <span className="text-[10px] font-cyber px-2 py-0.5 rounded bg-yellow-400/10 text-yellow-300 border border-yellow-400/30">
                      HUB
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping"></span>
                    ACTIVE FEED
                  </span>
                </div>

                {/* Quick Interactive Items Preview */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-yellow-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          VIP Study Batch <VerifiedBadge size="sm" />
                        </div>
                        <div className="text-[10px] text-zinc-400">4K Live Webview Stream</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-400 text-black font-extrabold">LIVE</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                        <Send size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Official Telegram Channel</div>
                        <div className="text-[10px] text-zinc-400">Daily Free Notes & Alerts</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold">OPEN</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-red-500/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400">
                        <Bot size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Smart Telegram Bot</div>
                        <div className="text-[10px] text-zinc-400">Auto Bot Command /start</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-extrabold">START</span>
                  </div>
                </div>

                {/* Bottom verified badge guarantee */}
                <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1 text-zinc-300">
                    <ShieldCheck size={13} className="text-yellow-400" />
                    Admin Protected Hub
                  </span>
                  <span className="font-cyber text-yellow-400 font-bold">
                    FAST CDN
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
