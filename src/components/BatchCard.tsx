import React, { useState } from 'react';
import { Batch } from '../types.ts';
import { VerifiedBadge } from './VerifiedBadge.tsx';
import { 
  Play, 
  Send, 
  Bot, 
  ExternalLink, 
  Globe, 
  Share2, 
  Check, 
  Maximize2, 
  Radio, 
  Users,
  Terminal
} from 'lucide-react';

interface BatchCardProps {
  batch: Batch;
  onOpenWebview: (url: string, title: string) => void;
}

export const BatchCard: React.FC<BatchCardProps> = ({
  batch,
  onOpenWebview
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(batch.primaryUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrimaryAction = () => {
    if (batch.linkType === 'website') {
      onOpenWebview(batch.primaryUrl, batch.title);
    } else {
      // Telegram, Bot, etc.
      window.open(batch.primaryUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Badge color mapping
  const badgeColors = {
    yellow: 'bg-yellow-400 text-black border-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.5)]',
    red: 'bg-red-600 text-white border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.5)]',
    green: 'bg-emerald-500 text-black border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
  };

  const getLinkIcon = () => {
    switch (batch.linkType) {
      case 'telegram':
        return <Send size={15} className="text-emerald-400" />;
      case 'bot':
        return <Bot size={15} className="text-yellow-400" />;
      case 'website':
        return <Globe size={15} className="text-red-400" />;
      default:
        return <Play size={15} className="text-yellow-400" />;
    }
  };

  return (
    <div className="group relative bg-[#0e1017] hover:bg-[#121520] border border-zinc-800 hover:border-yellow-400/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_rgba(234,179,8,0.15)] flex flex-col">
      
      {/* 1. THUMBNAIL TYPE KA AAGE AAYE (16:9 Thumbnail container with overlay badges) */}
      <div 
        className="relative aspect-video w-full overflow-hidden bg-zinc-950 cursor-pointer select-none"
        onClick={handlePrimaryAction}
      >
        <img
          src={batch.thumbnail}
          alt={batch.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Dark gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none"></div>

        {/* Top Badges Bar inside thumbnail */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 pointer-events-none">
          {/* Brand stamp on thumbnail */}
          <div className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700/80 text-[11px] font-black text-white flex items-center gap-1.5 shadow-md">
            <span>UC LIVE</span>
            <VerifiedBadge size="sm" />
          </div>

          {/* Dynamic Status / Badge */}
          <div className="flex items-center gap-1.5">
            {batch.isLive && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-wider animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.7)]">
                <Radio size={12} className="animate-spin" />
                LIVE
              </span>
            )}

            <span className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider border ${badgeColors[batch.badgeColor] || badgeColors.yellow}`}>
              {batch.badgeText}
            </span>
          </div>
        </div>

        {/* Hover Center Play / View Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="w-13 h-13 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-[0_0_25px_rgba(250,204,21,0.8)] transform group-hover:scale-110 transition-transform">
            {batch.linkType === 'website' ? (
              <Maximize2 size={24} className="stroke-[2.5]" />
            ) : batch.linkType === 'bot' ? (
              <Bot size={26} className="stroke-[2.5]" />
            ) : (
              <Send size={24} className="stroke-[2.5] -translate-x-0.5" />
            )}
          </div>
        </div>

        {/* Bottom Bar inside thumbnail with stats & link type */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-zinc-300 font-cyber">
          <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-zinc-800">
            {getLinkIcon()}
            <span className="capitalize">{batch.linkType} Link</span>
          </div>

          {batch.membersCount && (
            <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
              <Users size={11} className="text-zinc-400" />
              <span>{batch.membersCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. CARD CONTENT BODY */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Title & Description */}
        <div className="space-y-2">
          {/* Batch Title with Yellow Verified Check */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={handlePrimaryAction}
              className="font-heading font-black text-lg text-white group-hover:text-yellow-400 transition-colors cursor-pointer flex items-center flex-wrap gap-1.5 leading-snug"
            >
              <span>{batch.title}</span>
              {/* Yellow Verified Check */}
              <VerifiedBadge size="sm" />
            </h3>
          </div>

          {/* Subtitle */}
          <p className="text-xs text-yellow-400/90 font-semibold line-clamp-1">
            {batch.subtitle}
          </p>

          {/* Description */}
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {batch.description}
          </p>

          {/* Bot Command preview if bot */}
          {batch.linkType === 'bot' && batch.botCommand && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <Terminal size={12} className="text-yellow-400" />
              <span>Command:</span>
              <span className="text-emerald-400 font-bold">{batch.botCommand}</span>
            </div>
          )}

          {/* Tags */}
          {batch.tags && batch.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {batch.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-[10px] font-cyber"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. ACTION BUTTONS */}
        <div className="pt-2 border-t border-zinc-800/80 space-y-2">
          
          <div className="flex items-center gap-2">
            {/* Primary Action Button */}
            {batch.linkType === 'website' ? (
              <button
                onClick={() => onOpenWebview(batch.primaryUrl, batch.title)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-red-500 text-white font-extrabold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(239,68,68,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Maximize2 size={14} />
                <span>OPEN WEBVIEW</span>
              </button>
            ) : batch.linkType === 'telegram' ? (
              <a
                href={batch.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-emerald-500 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={14} />
                <span>JOIN TELEGRAM</span>
              </a>
            ) : batch.linkType === 'bot' ? (
              <a
                href={batch.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-extrabold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(250,204,21,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Bot size={15} />
                <span>START BOT</span>
              </a>
            ) : (
              <a
                href={batch.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-yellow-400 text-black font-bold text-xs flex items-center justify-center gap-2"
              >
                <ExternalLink size={14} />
                <span>OPEN LINK</span>
              </a>
            )}

            {/* Direct Open in new tab (if webview) or Secondary tool */}
            {batch.linkType === 'website' && (
              <a
                href={batch.primaryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white transition-colors"
                title="Open in new browser tab"
              >
                <ExternalLink size={15} />
              </a>
            )}

            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white transition-colors"
              title={copied ? "Copied!" : "Copy link"}
            >
              {copied ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
