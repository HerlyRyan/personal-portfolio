import React from 'react';
import { useSystem } from '../../context/SystemContext';

const TECH_STACK = ["Laravel", "PHP", "Flutter", "Node.js", "TypeScript", "MySQL"];

export const SystemOverview: React.FC = () => {
  const { theme, systemLang, lang } = useSystem(); // Mengambil objek kamus `t`
  const isLight = theme === 'light';

  return (
    <div className={`lg:col-span-8 rounded-2xl p-8 md:p-10 flex flex-col justify-between border transition-colors ${
      isLight ? 'bg-slate-50/50 border-slate-200' : 'bg-navy-base/30 border-dark-border'
    }`}>
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono text-accent-blue tracking-wider uppercase">
            {systemLang.systemOverview.tag}
          </span>
          <span className={`text-xs font-mono px-3 py-1 rounded-lg border ${
            isLight ? 'bg-white border-slate-200 text-slate-600' : 'bg-dark-border/50 border-dark-border text-slate-400'
          }`}>
            {systemLang.systemOverview.badge}
          </span>
        </div>

        <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-6 transition-colors ${
            isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {(() => {
                // Tentukan kata kunci yang ingin di-highlight berdasarkan bahasa aktif
                const keyword = lang === 'EN' ? 'precision' : 'presisi';
                const parts = systemLang.systemOverview.title.split(keyword);

                return (
                  <>
                    {parts[0]}
                    <span className="text-accent-blue">{keyword}</span>
                    {parts[1] || ''}
                  </>
                );
              })()}
        </h1>

        <p className={`text-sm md:text-base leading-relaxed mb-8 transition-colors ${
          isLight ? 'text-slate-600' : 'text-slate-300'
        }`}>
          {systemLang.systemOverview.description}
        </p>
      </div>

      {/* Tech Stack Chips */}
      <div className={`pt-6 border-t flex flex-wrap items-center justify-between gap-3 transition-colors ${
        isLight ? 'border-slate-200' : 'border-dark-border/60'
      }`}>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((tech, i) => (
            <span
              key={i}
              className={`text-xs font-mono px-3.5 py-1.5 rounded-xl border transition-colors ${
                isLight ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-dark-border/40 border-dark-border/50 text-slate-300'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
        <span className="text-xs font-mono text-accent-blue">
          {systemLang.systemOverview.secureConnection}
        </span>
      </div>
    </div>
  );
};