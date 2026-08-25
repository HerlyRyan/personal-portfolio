import React from 'react';
import { SITE_CONFIG } from '../../constants/siteConfig';
import { VisitorIpBadge } from '../commons/VisitorIpBadge'; // Pastikan path import sesuai dengan lokasi file Anda

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-6xl mx-auto px-4 py-8 mt-4 border-t border-dark-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
      
      {/* Left: Visitor IP, Name & Metrics Badge (Menggantikan "All systems normal") */}
      <div className="w-full md:w-auto flex justify-center md:justify-start overflow-x-auto pb-1 md:pb-0">
        <VisitorIpBadge />
      </div>

      {/* Center: Copyright & Name */}
      <div className="flex items-center gap-2 text-center">
        <span>© {currentYear} {SITE_CONFIG.name}. All rights reserved.</span>
      </div>

      {/* Right: Build / Stack Tech Credit */}
      <div className="text-center md:text-right">
        <span>Built with React, Vite & Tailwind CSS</span>
      </div>

    </footer>
  );
};