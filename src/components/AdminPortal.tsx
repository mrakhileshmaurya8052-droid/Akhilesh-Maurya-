import React, { useState, useRef } from 'react';
import { Batch, BatchCategory, LinkType, BadgeColor } from '../types.ts';
import { ADMIN_ACCESS_CODE } from '../data/defaultBatches.ts';
import { generateBatchThumbnail, ThumbnailTheme } from '../utils/thumbnailGenerator.ts';
import { VerifiedBadge } from './VerifiedBadge.tsx';
import { 
  Lock, 
  Unlock, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Sparkles, 
  Radio, 
  Send, 
  Bot, 
  Globe, 
  Download, 
  RefreshCw, 
  Check, 
  AlertCircle,
  Sliders,
  ArrowLeft,
  Copy,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface AdminPortalProps {
  batches: Batch[];
  onSaveBatch: (batch: Batch) => void;
  onDeleteBatch: (id: string) => void;
  onResetDefaults: () => void;
  onImportBatches: (batches: Batch[]) => void;
  onBackToApp: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  batches,
  onSaveBatch,
  onDeleteBatch,
  onResetDefaults,
  onImportBatches,
  onBackToApp
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');
  const [copiedLink, setCopiedLink] = useState(false);

  // Form states for creating/editing batch
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<BatchCategory>('LIVE_CLASS');
  const [linkType, setLinkType] = useState<LinkType>('website');
  const [primaryUrl, setPrimaryUrl] = useState('');
  const [botCommand, setBotCommand] = useState('/start');
  const [thumbnail, setThumbnail] = useState('');
  const [isLive, setIsLive] = useState(true);
  const [badgeText, setBadgeText] = useState('LIVE NOW');
  const [badgeColor, setBadgeColor] = useState<BadgeColor>('yellow');
  const [membersCount, setMembersCount] = useState('10K Students');
  const [tagsInput, setTagsInput] = useState('Live, Full Course');

  // Thumbnail generator choices inside admin
  const [genTheme, setGenTheme] = useState<ThumbnailTheme>('tricolor');
  const [autoGenSuccess, setAutoGenSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);

  const adminLink = typeof window !== 'undefined' ? `${window.location.origin}/#admin` : '';

  const handleCopyAdminLink = () => {
    navigator.clipboard.writeText(adminLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Handle Login with required code: Shivkumari872@
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCodeInput.trim() === ADMIN_ACCESS_CODE) {
      setIsLoggedIn(true);
      setLoginError('');
      setAccessCodeInput('');
    } else {
      setLoginError('Invalid Admin Access Code! Please check and enter the correct code.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEditingId(null);
  };

  // Reset Form
  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setCategory('LIVE_CLASS');
    setLinkType('website');
    setPrimaryUrl('');
    setBotCommand('/start');
    setThumbnail('');
    setIsLive(true);
    setBadgeText('LIVE NOW');
    setBadgeColor('yellow');
    setMembersCount('10K Students');
    setTagsInput('Live, Full Course');
  };

  // Populate form for editing
  const startEdit = (b: Batch) => {
    setEditingId(b.id);
    setTitle(b.title);
    setSubtitle(b.subtitle);
    setDescription(b.description);
    setCategory(b.category);
    setLinkType(b.linkType);
    setPrimaryUrl(b.primaryUrl);
    setBotCommand(b.botCommand || '/start');
    setThumbnail(b.thumbnail);
    setIsLive(b.isLive);
    setBadgeText(b.badgeText);
    setBadgeColor(b.badgeColor);
    setMembersCount(b.membersCount || '');
    setTagsInput(b.tags.join(', '));
    setActiveTab('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auto Generate Thumbnail
  const handleAutoGenerateThumbnail = () => {
    const currentTitle = title.trim() || 'UC LIVE SPECIAL BATCH';
    const currentSubtitle = subtitle.trim() || 'Official Fast Updates & Study Materials';
    const newThumb = generateBatchThumbnail({
      title: currentTitle,
      subtitle: currentSubtitle,
      badgeText: badgeText || 'UC LIVE VERIFIED',
      theme: genTheme,
      isLive: isLive,
      category: category.replace('_', ' ')
    });

    setThumbnail(newThumb);
    setAutoGenSuccess(true);
    setTimeout(() => setAutoGenSuccess(false), 2500);
  };

  // Upload Thumbnail from computer
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setThumbnail(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Batch (Create or Update)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a batch title');
      return;
    }
    if (!primaryUrl.trim()) {
      alert('Please enter a valid Link / URL');
      return;
    }

    // Auto-generate thumbnail if empty
    let finalThumbnail = thumbnail;
    if (!finalThumbnail) {
      finalThumbnail = generateBatchThumbnail({
        title: title,
        subtitle: subtitle || 'Official UC LIVE Course',
        badgeText: badgeText || 'VERIFIED',
        theme: genTheme,
        isLive: isLive,
        category: category.replace('_', ' ')
      });
    }

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const batchData: Batch = {
      id: editingId || `uc-batch-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Official High Speed Batch',
      description: description.trim() || 'Access lectures, materials, links, and study resources on UC LIVE.',
      category: category,
      linkType: linkType,
      primaryUrl: primaryUrl.trim(),
      botCommand: linkType === 'bot' ? (botCommand.trim() || '/start') : undefined,
      thumbnail: finalThumbnail,
      isLive: isLive,
      badgeText: badgeText.trim() || 'OFFICIAL',
      badgeColor: badgeColor,
      membersCount: membersCount.trim() || 'Active',
      tags: tagsArray.length > 0 ? tagsArray : ['UCLIVE', 'Official'],
      createdAt: editingId ? (batches.find((b) => b.id === editingId)?.createdAt || Date.now()) : Date.now(),
      verified: true
    };

    onSaveBatch(batchData);
    resetForm();
    setActiveTab('manage');
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(batches, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `uclive_batches_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            onImportBatches(parsed);
            alert(`Successfully imported ${parsed.length} batches!`);
          } else {
            alert('Invalid JSON file format.');
          }
        } catch {
          alert('Error parsing JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080e] text-zinc-100 flex flex-col font-sans">
      
      {/* Top Standalone Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#090b12]/95 border-b border-yellow-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Standalone Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToApp}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Public UC LIVE App"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to App</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl text-white tracking-tight flex items-center gap-1.5">
                UC LIVE <VerifiedBadge size="md" />
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-black font-cyber font-black text-[11px] shadow-[0_0_12px_rgba(250,204,21,0.6)]">
                DEDICATED ADMIN PORTAL
              </span>
            </div>
          </div>

          {/* Direct Link Copier & Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAdminLink}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-yellow-300 font-cyber text-xs flex items-center gap-1.5 transition-all shadow-sm"
              title="Copy Direct Link to this Admin Panel"
            >
              {copiedLink ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Admin Link'}</span>
            </button>

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300 text-xs font-bold transition-colors"
              >
                Lock / Logout
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main Admin Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Direct Link Info Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-zinc-900 to-emerald-500/10 border border-yellow-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-yellow-400 shrink-0" />
            <div>
              <span className="font-bold text-white block sm:inline">
                Independent Admin Portal:
              </span>
              <span className="text-zinc-400 ml-1">
                This page is isolated from the main UC LIVE user app. Bookmark or share this link to access your management suite directly.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="bg-black/60 px-3 py-1 rounded-lg font-mono text-[11px] text-yellow-300 border border-zinc-700 select-all truncate max-w-xs">
              {adminLink}
            </span>
            <button
              onClick={handleCopyAdminLink}
              className="p-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black shrink-0 transition-colors"
              title="Copy Link"
            >
              {copiedLink ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* 1. AUTHENTICATION LOCK SCREEN (If not logged in) */}
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto py-12 text-center space-y-6 bg-zinc-950/80 border border-zinc-800 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
            <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-yellow-500/20 via-yellow-400/30 to-amber-300/10 border-2 border-yellow-400 mx-auto flex items-center justify-center text-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.4)]">
              <Lock size={36} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-black text-white">
                Admin Panel Login
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Enter your secret master access code to unlock batch publishing, thumbnail generation, and link tools.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/60 text-red-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle size={16} className="shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter Master Access Code..."
                  value={accessCodeInput}
                  onChange={(e) => setAccessCodeInput(e.target.value)}
                  className="w-full bg-zinc-900 border-2 border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3.5 text-sm text-center font-mono tracking-widest text-yellow-300 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 transition-all shadow-inner"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-extrabold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(250,204,21,0.5)] transition-all cursor-pointer"
              >
                UNLOCK ADMIN CONTROL PANEL
              </button>
            </form>

            {/* Access Code quick-fill helper */}
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400 font-cyber">
              <span>Admin Code: </span>
              <button
                type="button"
                onClick={() => setAccessCodeInput('Shivkumari872@')}
                className="text-yellow-400 font-mono font-bold hover:underline ml-1"
              >
                Shivkumari872@ (Click to Auto-Fill)
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={onBackToApp}
                className="text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1 mx-auto"
              >
                <ArrowLeft size={13} />
                <span>Return to Public UC LIVE App</span>
              </button>
            </div>

          </div>
        ) : (
          /* 2. UNLOCKED FULL ADMIN MANAGEMENT DASHBOARD */
          <div className="space-y-6">
            
            {/* Top Toolbar Tabs & Backup Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-4 gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('add')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'add'
                      ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Plus size={15} />
                  <span>{editingId ? 'Edit Selected Batch' : '+ Add New Batch'}</span>
                </button>

                <button
                  onClick={() => setActiveTab('manage')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'manage'
                      ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                      : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Sliders size={15} />
                  <span>Manage Batches ({batches.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJSON}
                  className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs flex items-center gap-1.5 transition-colors"
                  title="Export backup JSON"
                >
                  <Download size={14} />
                  <span>Export Backup</span>
                </button>

                <label className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs flex items-center gap-1.5 cursor-pointer transition-colors">
                  <Upload size={14} />
                  <span>Restore Backup</span>
                  <input
                    type="file"
                    ref={importFileRef}
                    onChange={handleImportJSON}
                    accept=".json"
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => {
                    if (confirm('Reset all batches back to initial default list?')) {
                      onResetDefaults();
                    }
                  }}
                  className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-700/60 text-red-300 text-xs flex items-center gap-1 transition-colors"
                  title="Reset to default batches"
                >
                  <RefreshCw size={14} />
                  <span>Reset All</span>
                </button>
              </div>
            </div>

            {/* TAB 1: ADD / EDIT BATCH FORM */}
            {activeTab === 'add' && (
              <form onSubmit={handleSave} className="space-y-6 bg-zinc-950/60 border border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xl">
                
                {editingId && (
                  <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/40 text-yellow-300 text-xs flex items-center justify-between">
                    <span className="font-bold flex items-center gap-2">
                      <Edit3 size={16} />
                      Editing existing batch: "{title}"
                    </span>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs text-yellow-400 hover:underline font-bold"
                    >
                      Cancel Edit & Create New
                    </button>
                  </div>
                )}

                {/* Section Header */}
                <div>
                  <h3 className="text-lg font-heading font-black text-white flex items-center gap-2">
                    <span>{editingId ? 'Edit Batch Details' : 'Publish New Batch to UC LIVE'}</span>
                    <VerifiedBadge size="sm" />
                  </h3>
                  <p className="text-xs text-zinc-400 font-cyber">
                    Fill details below to add thumbnail, Telegram links, bot endpoints, or Webview streams.
                  </p>
                </div>

                {/* Title & Subtitle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                      Batch Title * <VerifiedBadge size="sm" />
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UC LIVE TARGET BATCH 2026"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-zinc-300">
                      Subtitle / Catchphrase
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Daily Live Classes & High-Speed Notes"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                {/* Link Support Section: Telegram, Website URL, Bot Link */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-yellow-400 font-cyber flex items-center gap-1.5">
                      <Send size={14} />
                      LINK SUPPORT (TELEGRAM, URL & BOT)
                    </label>
                    <span className="text-[11px] text-zinc-400">
                      Configure destination action
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setLinkType('telegram');
                        setCategory('TELEGRAM_CHANNEL');
                      }}
                      className={`p-3.5 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all ${
                        linkType === 'telegram'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Send size={18} className="text-emerald-400 shrink-0" />
                      <div className="text-left">
                        <div>Telegram Channel</div>
                        <div className="text-[10px] font-normal text-zinc-400">Direct t.me link</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLinkType('bot');
                        setCategory('TELEGRAM_BOT');
                      }}
                      className={`p-3.5 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all ${
                        linkType === 'bot'
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.3)]'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Bot size={18} className="text-yellow-400 shrink-0" />
                      <div className="text-left">
                        <div>Telegram Bot Link</div>
                        <div className="text-[10px] font-normal text-zinc-400">Bot with command</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLinkType('website');
                        setCategory('WEBVIEW_STREAM');
                      }}
                      className={`p-3.5 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all ${
                        linkType === 'website'
                          ? 'bg-red-500/20 border-red-400 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Globe size={18} className="text-red-400 shrink-0" />
                      <div className="text-left">
                        <div>Website / Webview</div>
                        <div className="text-[10px] font-normal text-zinc-400">In-App Browser</div>
                      </div>
                    </button>
                  </div>

                  {/* URL Input */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                    <div className={linkType === 'bot' ? 'md:col-span-8 space-y-1' : 'md:col-span-12 space-y-1'}>
                      <label className="text-[11px] font-bold text-zinc-300">
                        {linkType === 'telegram' 
                          ? 'Telegram Channel URL (e.g. https://t.me/yourchannel)' 
                          : linkType === 'bot'
                          ? 'Telegram Bot URL (e.g. https://t.me/your_bot)'
                          : 'Website / Webview URL (e.g. https://yourwebsite.com)'}
                      </label>
                      <input
                        type="url"
                        required
                        placeholder={
                          linkType === 'telegram'
                            ? 'https://t.me/example_channel'
                            : linkType === 'bot'
                            ? 'https://t.me/example_bot'
                            : 'https://example.com'
                        }
                        value={primaryUrl}
                        onChange={(e) => setPrimaryUrl(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 font-mono"
                      />
                    </div>

                    {linkType === 'bot' && (
                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[11px] font-bold text-yellow-400">
                          Bot Start Command
                        </label>
                        <input
                          type="text"
                          placeholder="/start"
                          value={botCommand}
                          onChange={(e) => setBotCommand(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-emerald-400 focus:outline-none focus:border-yellow-400 font-mono"
                        />
                      </div>
                    )}
                  </div>

                </div>

                {/* THUMBNAIL CREATOR SECTION */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <label className="text-xs font-bold text-yellow-400 font-cyber flex items-center gap-1.5">
                      <Sparkles size={15} className="text-yellow-400" />
                      THUMBNAIL CREATOR (AUTO-GENERATE & UPLOAD)
                    </label>
                    <span className="text-[11px] text-zinc-400">
                      16:9 Display Ready
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    
                    {/* Left: Thumbnail Preview */}
                    <div className="md:col-span-5 space-y-2">
                      <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-zinc-700 bg-black shadow-lg">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt="Batch Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 p-4 text-center">
                            <Sparkles size={32} className="mb-2 text-zinc-500" />
                            <span className="text-xs font-semibold">No Thumbnail Set</span>
                            <span className="text-[10px] text-zinc-500 mt-1">
                              Click "Generate Thumbnail" or "Upload Image"
                            </span>
                          </div>
                        )}

                        {thumbnail && (
                          <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded bg-black/80 text-[10px] font-cyber text-emerald-400 border border-emerald-500/30">
                            Active Thumbnail ✓
                          </div>
                        )}
                      </div>

                      {autoGenSuccess && (
                        <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 justify-center animate-pulse">
                          <Check size={13} />
                          <span>Thumbnail Generated & Applied!</span>
                        </div>
                      )}
                    </div>

                    {/* Right: Auto Generate & Upload Buttons */}
                    <div className="md:col-span-7 space-y-3">
                      
                      {/* Auto-Generate Tool */}
                      <div className="p-4 rounded-xl bg-zinc-900/90 border border-yellow-500/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-yellow-300 flex items-center gap-1">
                            ⚡ Auto Generate Thumbnail
                          </span>
                          <span className="text-[10px] font-cyber text-zinc-400">
                            Custom Themes
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-[11px]">
                          <button
                            type="button"
                            onClick={() => setGenTheme('tricolor')}
                            className={`py-1.5 px-2 rounded-lg border font-medium ${
                              genTheme === 'tricolor' 
                                ? 'bg-yellow-400/20 border-yellow-400 text-yellow-300' 
                                : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                            }`}
                          >
                            Tricolor Cyber
                          </button>
                          <button
                            type="button"
                            onClick={() => setGenTheme('crimson-red')}
                            className={`py-1.5 px-2 rounded-lg border font-medium ${
                              genTheme === 'crimson-red' 
                                ? 'bg-red-500/20 border-red-400 text-red-300' 
                                : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                            }`}
                          >
                            Crimson Red
                          </button>
                          <button
                            type="button"
                            onClick={() => setGenTheme('emerald-green')}
                            className={`py-1.5 px-2 rounded-lg border font-medium ${
                              genTheme === 'emerald-green' 
                                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' 
                                : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                            }`}
                          >
                            Emerald Green
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleAutoGenerateThumbnail}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-black font-extrabold text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(250,204,21,0.4)] hover:brightness-110 cursor-pointer"
                        >
                          <Sparkles size={14} />
                          <span>GENERATE STYLISH THUMBNAIL NOW</span>
                        </button>
                      </div>

                      {/* Upload Option & Direct URL */}
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <Upload size={14} className="text-yellow-400" />
                          <span>Upload Image File</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt('Enter image URL:');
                            if (url) setThumbnail(url);
                          }}
                          className="py-2.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-zinc-300 text-xs font-medium"
                        >
                          Image URL
                        </button>
                      </div>

                    </div>

                  </div>
                </div>

                {/* Badges & Live Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-300">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as BatchCategory)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                    >
                      <option value="LIVE_CLASS">Live Class Stream</option>
                      <option value="TELEGRAM_CHANNEL">Telegram Channel</option>
                      <option value="TELEGRAM_BOT">Telegram Bot</option>
                      <option value="WEBVIEW_STREAM">Webview Portal</option>
                      <option value="SPECIAL_BATCH">Special Batch</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-300">Badge Text</label>
                    <input
                      type="text"
                      placeholder="e.g. LIVE NOW / HOT"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-300">Badge Color</label>
                    <select
                      value={badgeColor}
                      onChange={(e) => setBadgeColor(e.target.value as BadgeColor)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                    >
                      <option value="yellow">Yellow (Golden Glow)</option>
                      <option value="red">Red (Fiery Live)</option>
                      <option value="green">Green (Emerald Active)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-300">Live Status</label>
                    <button
                      type="button"
                      onClick={() => setIsLive(!isLive)}
                      className={`w-full py-2.5 px-3 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                        isLive 
                          ? 'bg-red-600/30 border-red-500 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.3)]' 
                          : 'bg-zinc-900 border-zinc-700 text-zinc-400'
                      }`}
                    >
                      <Radio size={13} className={isLive ? "animate-pulse text-red-400" : ""} />
                      <span>{isLive ? '🔴 LIVE ACTIVE' : '⚪ REGULAR'}</span>
                    </button>
                  </div>
                </div>

                {/* Description & Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-300">Batch Description</label>
                    <textarea
                      rows={2}
                      placeholder="Key highlights and details about this batch..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-zinc-300">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Live, 4K, Telegram, Bot"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-black font-extrabold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Check size={18} strokeWidth={3} />
                    <span>{editingId ? 'SAVE BATCH CHANGES' : 'PUBLISH NEW BATCH TO UC LIVE'}</span>
                  </button>

                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="py-3.5 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </div>

              </form>
            )}

            {/* TAB 2: MANAGE BATCHES LIST */}
            {activeTab === 'manage' && (
              <div className="space-y-4 bg-zinc-950/60 border border-zinc-800 p-6 rounded-3xl shadow-xl">
                <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-800 pb-3">
                  <span className="font-bold text-white">Live Batch Library ({batches.length} total)</span>
                  <span>Changes appear immediately on public app.</span>
                </div>

                <div className="space-y-3">
                  {batches.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-yellow-400/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={b.thumbnail}
                          alt={b.title}
                          className="w-24 h-14 object-cover rounded-xl border border-zinc-700 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-heading font-black text-sm text-white">
                              {b.title}
                            </h4>
                            <VerifiedBadge size="sm" />
                            {b.isLive && (
                              <span className="px-1.5 py-0.2 rounded bg-red-600 text-white text-[9px] font-extrabold animate-pulse">
                                LIVE
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 truncate max-w-lg mt-0.5">
                            {b.subtitle}
                          </p>
                          <span className="text-[10px] font-mono text-yellow-400 block mt-1">
                            {b.linkType.toUpperCase()} • {b.primaryUrl}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => startEdit(b)}
                          className="px-3.5 py-2 rounded-xl bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400 text-yellow-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete batch "${b.title}"?`)) {
                              onDeleteBatch(b.id);
                            }
                          }}
                          className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-700/60 text-red-300 transition-colors cursor-pointer"
                          title="Delete batch"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

      </main>

    </div>
  );
};
