/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Batch } from './types.ts';
import { getInitialBatches, saveBatchesToStorage } from './data/defaultBatches.ts';
import { Navbar } from './components/Navbar.tsx';
import { HeroBanner } from './components/HeroBanner.tsx';
import { BatchCard } from './components/BatchCard.tsx';
import { WebviewModal } from './components/WebviewModal.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { VerifiedBadge } from './components/VerifiedBadge.tsx';
import { 
  Radio, 
  Send, 
  Bot, 
  Sparkles, 
  Layers, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

export default function App() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Routing state for separating Admin Panel from Main App
  const [isAdminView, setIsAdminView] = useState(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname;
    const hash = window.location.hash;
    const search = window.location.search;
    return hash === '#admin' || path === '/admin' || search.includes('admin=true') || search.includes('admin=1');
  });

  // Webview Modal state
  const [webviewState, setWebviewState] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
  }>({
    isOpen: false,
    url: '',
    title: ''
  });

  // Listen to hash and popstate changes
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      const search = window.location.search;
      const shouldBeAdmin = hash === '#admin' || path === '/admin' || search.includes('admin=true') || search.includes('admin=1');
      setIsAdminView(shouldBeAdmin);
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Load batches on mount
  useEffect(() => {
    const initial = getInitialBatches();
    setBatches(initial);
  }, []);

  // Save changes to storage whenever batches change
  const handleSaveBatch = (newOrUpdatedBatch: Batch) => {
    setBatches((prev) => {
      const existsIndex = prev.findIndex((b) => b.id === newOrUpdatedBatch.id);
      let updated: Batch[];
      if (existsIndex >= 0) {
        updated = [...prev];
        updated[existsIndex] = newOrUpdatedBatch;
      } else {
        updated = [newOrUpdatedBatch, ...prev];
      }
      saveBatchesToStorage(updated);
      return updated;
    });
  };

  const handleDeleteBatch = (id: string) => {
    setBatches((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      saveBatchesToStorage(updated);
      return updated;
    });
  };

  const handleResetDefaults = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('uc_live_batches_store_v1');
    }
    const fresh = getInitialBatches();
    setBatches(fresh);
  };

  const handleImportBatches = (imported: Batch[]) => {
    setBatches(imported);
    saveBatchesToStorage(imported);
  };

  // Open Webview
  const handleOpenWebview = (url: string, title: string) => {
    setWebviewState({
      isOpen: true,
      url,
      title
    });
  };

  const handleCloseWebview = () => {
    setWebviewState((prev) => ({ ...prev, isOpen: false }));
  };

  // Switch back to public app
  const handleBackToPublicApp = () => {
    window.location.hash = '';
    window.history.pushState(null, '', window.location.pathname);
    setIsAdminView(false);
  };

  // ==========================================
  // 1. STANDALONE DEDICATED ADMIN PANEL VIEW
  // ==========================================
  if (isAdminView) {
    return (
      <AdminPortal
        batches={batches}
        onSaveBatch={handleSaveBatch}
        onDeleteBatch={handleDeleteBatch}
        onResetDefaults={handleResetDefaults}
        onImportBatches={handleImportBatches}
        onBackToApp={handleBackToPublicApp}
      />
    );
  }

  // ==========================================
  // 2. PUBLIC UC LIVE APP (NO ADMIN BUTTONS)
  // ==========================================
  const filteredBatches = batches.filter((batch) => {
    const matchesCategory = 
      activeFilter === 'ALL' || 
      batch.category === activeFilter;

    const matchesSearch = 
      !searchQuery.trim() || 
      batch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const liveBatchesCount = batches.filter((b) => b.isLive).length;

  return (
    <div className="min-h-screen bg-[#06070a] text-zinc-100 flex flex-col selection:bg-yellow-400 selection:text-black">
      
      {/* 1. Header & Navigation (Clean, No Admin UI) */}
      <Navbar
        totalBatches={batches.length}
        liveCount={liveBatchesCount}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Hero Banner with Highlights */}
      <HeroBanner
        onExploreClick={() => {
          const el = document.getElementById('batches-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTelegram={() => {
          const tgBatch = batches.find((b) => b.category === 'TELEGRAM_CHANNEL' || b.linkType === 'telegram');
          if (tgBatch) {
            window.open(tgBatch.primaryUrl, '_blank');
          } else {
            window.open('https://t.me/telegram', '_blank');
          }
        }}
      />

      {/* 3. Main Batches Grid Section */}
      <main id="batches-section" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-1 bg-yellow-400 rounded-full"></span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight flex items-center gap-2">
                <span>ALL BATCHES & HUBS</span>
                <VerifiedBadge size="md" />
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-cyber">
              {filteredBatches.length} verified item{filteredBatches.length === 1 ? '' : 's'} available • High-Definition Thumbnails • Direct Access
            </p>
          </div>

          {/* Quick Filter Reset */}
          {activeFilter !== 'ALL' && (
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveFilter('ALL')}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium transition-colors"
              >
                Show All Batches ✕
              </button>
            </div>
          )}
        </div>

        {/* Batches Grid (Thumbnail-First Presentation) */}
        {filteredBatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredBatches.map((batch) => (
              <BatchCard
                key={batch.id}
                batch={batch}
                onOpenWebview={handleOpenWebview}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="p-12 text-center rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
              <Layers size={28} />
            </div>
            <h3 className="text-lg font-bold text-white">No batches found</h3>
            <p className="text-xs text-zinc-400">
              No results match "{searchQuery}". Try searching for something else or reset your filter.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('ALL');
                }}
                className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-extrabold text-xs shadow-md"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Feature Highlights Panel */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-yellow-950/20 via-zinc-900/50 to-emerald-950/20 border border-zinc-800/80 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="font-heading font-black text-xl text-white flex items-center gap-2">
                  <span>UC LIVE ECOSYSTEM</span>
                  <VerifiedBadge size="sm" />
                </h3>
                <p className="text-xs text-zinc-400 font-cyber">
                  Full Link Support • Telegram Channels • Telegram Bots • In-App Webview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-cyber flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                ACTIVE SERVER
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-yellow-500/30 space-y-2">
              <div className="text-yellow-400 font-bold font-cyber flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>YELLOW CHECK VERIFIED</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Official "UC LIVE ✓" golden badge indicating genuine classes, verified Telegram links, and authorized bots.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-red-500/30 space-y-2">
              <div className="text-red-400 font-bold font-cyber flex items-center gap-1.5">
                <Radio size={14} className="animate-pulse" />
                <span>IN-APP WEBVIEW SUPPORT</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Stream web classes, view portals, and open direct URLs inside our embedded Webview modal with fullscreen and refresh controls.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/80 border border-emerald-500/30 space-y-2">
              <div className="text-emerald-400 font-bold font-cyber flex items-center gap-1.5">
                <Bot size={14} />
                <span>TELEGRAM & BOT INTEGRATION</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Direct one-click connection to Telegram channels, groups, and automated Telegram bots with `/start` command support.
              </p>
            </div>
          </div>
        </div>

      </main>

      {/* 4. Footer (Clean, No Admin UI) */}
      <footer className="border-t border-zinc-800/80 bg-[#07080e] py-8 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-black text-white text-base flex items-center gap-1.5">
              UC LIVE <VerifiedBadge size="sm" />
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-[11px] font-cyber text-zinc-400">
              OFFICIAL STREAM & BATCH PLATFORM
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-cyber">
            <span className="text-yellow-400 font-semibold">DARK NEON THEME</span>
            <span className="text-zinc-600">•</span>
            <span className="text-red-400 font-semibold">LIVE ACTIVE</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 font-semibold">BOT READY</span>
          </div>

          <div className="text-zinc-500 text-[11px]">
            © {new Date().getFullYear()} UC LIVE. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 5. In-App Webview Modal */}
      <WebviewModal
        isOpen={webviewState.isOpen}
        onClose={handleCloseWebview}
        url={webviewState.url}
        title={webviewState.title}
      />

      {/* 6. Floating Action Button (Only Public Telegram) */}
      <div className="fixed bottom-5 right-5 z-30">
        <a
          href="https://t.me/telegram"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer"
          title="Join Official Telegram"
        >
          <Send size={20} className="-translate-x-0.5" />
        </a>
      </div>

    </div>
  );
}
