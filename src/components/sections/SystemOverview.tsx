import React from "react";
import { useSystem } from "../../context/SystemContext";

export const SystemOverview: React.FC = () => {
  const { theme, systemLang } = useSystem();

  const isLight = theme === "light";
  const t = systemLang.systemOverview;

  return (
    <section
      aria-labelledby="system-overview-title"
      className={`
        lg:col-span-8
        rounded-2xl
        border
        p-6
        sm:p-8
        flex
        flex-col
        justify-between
        transition-colors

        ${
          isLight
            ? "border-slate-200 bg-slate-50/70"
            : "border-dark-border bg-navy-base/30"
        }
      `}
    >
      <div>
        {/* Header */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-blue">
            {t.tag}
          </span>

          <span
            className={`
              rounded-lg
              border
              px-3
              py-1.5
              font-mono
              text-xs
              font-medium

              ${
                isLight
                  ? "border-slate-200 bg-white text-slate-700"
                  : "border-dark-border bg-dark-border/50 text-slate-300"
              }
            `}
          >
            {t.badge}
          </span>
        </div>

        {/* Main headline */}
        <h1
          id="system-overview-title"
          className={`
            max-w-3xl
            text-3xl
            font-bold
            leading-tight
            tracking-tight

            md:text-4xl

            ${isLight ? "text-slate-950" : "text-slate-100"}
          `}
        >
          {t.title}
        </h1>

        {/* Description */}
        <p
          className={`
            mt-4
            max-w-3xl
            text-sm
            leading-7

            md:text-base

            ${isLight ? "text-slate-700" : "text-slate-300"}
          `}
        >
          {t.description}
        </p>

        {/* Compact proof row */}
        <dl
          className="
            mt-5
            grid
            grid-cols-1
            gap-2.5

            sm:grid-cols-3
          "
        >
          {t.highlights.map((item) => (
            <div
              key={item.label}
              className={`
                rounded-xl
                border
                px-3.5
                py-2.5

                ${
                  isLight
                    ? "border-slate-200 bg-white"
                    : "border-dark-border bg-dark-border/30"
                }
              `}
            >
              <dd className="font-mono text-base font-bold text-accent-blue">
                {item.value}
              </dd>

              <dt
                className={`
                  mt-0.5
                  text-xs
                  font-medium

                  ${isLight ? "text-slate-600" : "text-slate-400"}
                `}
              >
                {item.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Compact focus / stack row */}
      <div
        className={`
          mt-5
          flex
          flex-wrap
          items-center
          gap-2
          border-t
          pt-4

          ${isLight ? "border-slate-200" : "border-dark-border/60"}
        `}
      >
        {t.focusAreas.map((focus) => (
          <span
            key={focus}
            className={`
              rounded-lg
              border
              px-3
              py-1.5
              font-mono
              text-xs
              font-medium

              ${
                isLight
                  ? "border-slate-200 bg-white text-slate-700"
                  : "border-dark-border bg-dark-border/40 text-slate-300"
              }
            `}
          >
            {focus}
          </span>
        ))}
      </div>
    </section>
  );
};
