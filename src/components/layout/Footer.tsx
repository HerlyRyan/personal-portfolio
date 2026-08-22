import React from 'react';
import { SITE_CONFIG } from '../../constants/siteConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-6xl mx-auto px-4 py-8 mt-4 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
      {/* Left: System Status Indicator */}
      <div className="flex items-center gap-2 bg-dark-card border border-dark-border px-3 py-1 rounded-full">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-slate-400">All systems normal</span>
      </div>

      {/* Center: Copyright & Name */}
      <div className="flex items-center gap-2">
        <span>© {currentYear} {SITE_CONFIG.name}. All rights reserved.</span>
      </div>

      {/* Right: Build / Stack Tech Credit */}
      <div>
        <span>Built with React, Vite & Tailwind CSS</span>
      </div>
    </footer>
  );
};