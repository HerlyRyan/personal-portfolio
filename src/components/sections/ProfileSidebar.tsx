import React from 'react';
import { SITE_CONFIG } from '../../constants/siteConfig';
import { GithubIcon, LinkedinIcon, MailIcon } from '../ui/Icons';
import { useSystem } from '../../context/SystemContext';
import { ConfirmExternalModal } from '../ui/ConfirmModal';

export const ProfileSidebar: React.FC = () => {
  const { theme, systemLang, requestExternalUrl } = useSystem();
  const isLight = theme === 'light';

  return (
    <div className={`lg:col-span-4 rounded-2xl p-8 flex flex-col justify-between border transition-colors duration-300 ${
      isLight 
        ? 'bg-slate-50 border-slate-200' 
        : 'bg-navy-base/60 border-dark-border'
    }`}>
      <div>
        {/* Status Badge */}
        <div className='flex items-center justify-between mb-8'>
          <span className='text-xs font-mono text-accent-blue tracking-wider uppercase'>
            01 // ID CARD
          </span>
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'>
            <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
            {systemLang.profileSidebar.status}
          </span>
        </div>

        {/* Avatar / Logo System */}
        <div className={`w-28 h-28 mx-auto my-6 rounded-2xl border flex items-center justify-center overflow-hidden shadow-inner p-3 transition-colors ${
          isLight ? 'bg-white border-slate-200' : 'bg-dark-border/40 border-dark-border'
        }`}>
          <img
            src='https://avatars.githubusercontent.com/u/121325523?v=4'
            alt='System Logo'
            className='w-full h-full object-contain filter opacity-90 hover:opacity-100 transition-opacity'
          />
        </div>

        <div className='text-center mt-6'>
          <h2 className={`text-lg font-bold transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {SITE_CONFIG.name}
          </h2>
          <p className='text-xs font-mono text-slate-500 mt-1.5'>
            {SITE_CONFIG.role} <span className='text-accent-blue'>@{SITE_CONFIG.current_company}</span>
          </p>
          <p className='text-xs font-mono text-slate-400 mt-1'>{SITE_CONFIG.location}</p>
        </div>
      </div>

      {/* Social Links */}
      <div className={`flex items-center justify-center gap-4 pt-6 border-t transition-colors ${
        isLight ? 'border-slate-200' : 'border-dark-border/60'
      }`}>
        <button
          onClick={() => requestExternalUrl(SITE_CONFIG.social.github)}
          className={`p-2.5 transition-colors cursor-pointer ...`}
        >
          <GithubIcon className='w-4 h-4' />
        </button>
        <button
          onClick={() => requestExternalUrl(SITE_CONFIG.social.linkedin)}
          className={`p-2.5 transition-colors cursor-pointer ...`}
        >
          <LinkedinIcon className='w-4 h-4' />
        </button>
        <button
          onClick={() => requestExternalUrl(`mailto:${SITE_CONFIG.social.email}`)}
          className={`p-2.5 transition-colors cursor-pointer ...`}
        >
          <MailIcon className='w-4 h-4' />
        </button>
      </div>

      <ConfirmExternalModal />
    </div>
  );
};