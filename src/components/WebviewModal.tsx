import React, { useState } from 'react';
import { VerifiedBadge } from './VerifiedBadge.tsx';
import { 
  X, 
  RotateCw, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  Copy, 
  Check, 
  AlertTriangle,
  Radio
} from 'lucide-react';

interface WebviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

export const WebviewModal: React.FC<WebviewModalProps> = ({
  isOpen,
  onClose,
  url,
  title
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(1);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey((prev) => prev + 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container */}
      <div 
        className={`bg-[#0a0c13] border-2 border-red-500/60 rounded-2xl flex flex-col shadow-[0_0_50px_rgba(239,68,68,0.3)] overflow-hidden transition-all duration-300 ${
          isFullscreen 
            ? 'w-full h-full rounded-none border-none fixed inset-0' 
            : 'w-full max-w-6xl h-[90vh]'
        }`}
      >
        {/* Browser Top Navigation Bar */}
        <div className="bg-[#111420] border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between gap-3 select-none">
          
          {/* Left: Window Controls & Branding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button 
                onClick={onClose} 
                className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-sm"
                title="Close"
              />
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)} 
                className="w-3.5 h-3.5 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-colors shadow-sm"
                title="Fullscreen"
              />
              <button 
                onClick={handleRefresh} 
                className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors shadow-sm"
                title="Refresh"
              />
            </div>

            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-zinc-700/80">
              <span className="font-heading font-black text-sm text-white flex items-center gap-1">
                UC LIVE <VerifiedBadge size="sm" />
              </span>
              <span className="text-[10px] font-cyber px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                WEBVIEW ENGINE
              </span>
            </div>
          </div>

          {/* Center: Address Bar */}
          <div className="flex-1 max-w-xl mx-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700/80 text-xs text-zinc-300 font-mono shadow-inner">
              <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
              <span className="truncate text-zinc-400 select-all">{url}</span>
              <button 
                onClick={handleCopy}
                className="ml-auto text-zinc-400 hover:text-white transition-colors shrink-0"
                title="Copy URL"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
              title="Reload Page"
            >
              <RotateCw size={14} className={isLoading ? "animate-spin text-yellow-400" : ""} />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-colors flex items-center gap-1 text-xs"
              title="Open in external browser"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Launch Direct</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors ml-1"
              title="Close Webview"
            >
              <X size={15} />
            </button>
          </div>

        </div>

        {/* Sub-header with Title */}
        <div className="px-4 py-1.5 bg-[#0d0f19] border-b border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2 truncate">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="font-bold text-white truncate">{title}</span>
          </div>
          <span className="text-[11px] font-cyber text-yellow-400/90 hidden md:inline">
            IFRAME PROTECTED • HIGH SPEED BUFFERING
          </span>
        </div>

        {/* Webview Content Body / iFrame Area */}
        <div className="relative flex-1 bg-black overflow-hidden flex flex-col">
          
          {/* Loading Indicator Bar */}
          {isLoading && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-900 z-10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-400 via-red-500 to-emerald-400 animate-pulse w-full"></div>
            </div>
          )}

          {/* Iframe */}
          <iframe
            key={iframeKey}
            src={url}
            title={title}
            className="w-full h-full border-none bg-zinc-950"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />

          {/* Fallback Banner for sites that disallow iframe embedding */}
          <div className="bg-[#0b0d15] border-t border-zinc-800 px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <AlertTriangle size={14} className="text-yellow-400 shrink-0" />
              <span>
                Note: Some security-protected websites (Google/YouTube/banking) block inside iframe. If blank, click:
              </span>
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-[0_0_10px_rgba(250,204,21,0.5)] shrink-0"
            >
              <ExternalLink size={12} />
              <span>Open in External Tab</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
