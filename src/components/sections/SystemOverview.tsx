import React from "react";
import { useSystem } from "../../context/SystemContext";

const TECH_STACK = [
  "Laravel",
  "PHP",
  "Flutter",
  "Node.js",
  "TypeScript",
  "MySQL",
] as const;

export const SystemOverview: React.FC = () => {
  const { theme, systemLang, lang } = useSystem();

  const isLight = theme === "light";

  const title = systemLang.systemOverview.title;

  const highlightKeyword = lang === "EN" ? "precision" : "presisi";

  const keywordIndex = title
    .toLowerCase()
    .indexOf(highlightKeyword.toLowerCase());

  const hasKeyword = keywordIndex !== -1;

  const titleBeforeKeyword = hasKeyword ? title.slice(0, keywordIndex) : title;

  const highlightedTitle = hasKeyword
    ? title.slice(keywordIndex, keywordIndex + highlightKeyword.length)
    : "";

  const titleAfterKeyword = hasKeyword
    ? title.slice(keywordIndex + highlightKeyword.length)
    : "";

  return (
    <section
      aria-labelledby="system-overview-title"
      className={`
        flex
        flex-col
        justify-between
        rounded-2xl
        border
        p-6
        transition-colors

        sm:p-8
        md:p-10

        lg:col-span-8

        ${
          isLight
            ? `
              border-slate-200
              bg-slate-50/70
            `
            : `
              border-dark-border
              bg-navy-base/30
            `
        }
      `}
    >
      <div>
        {/* =================================================
            SECTION HEADER
        ================================================== */}
        <div
          className="
            mb-6
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
          "
        >
          <span
            className="
              font-mono
              text-xs
              font-medium
              uppercase
              tracking-wider
              text-accent-blue
            "
          >
            {systemLang.systemOverview.tag}
          </span>

          <span
            className={`
              shrink-0
              rounded-lg
              border
              px-3
              py-1.5
              font-mono
              text-xs
              font-medium

              ${
                isLight
                  ? `
                    border-slate-200
                    bg-white
                    text-slate-600
                  `
                  : `
                    border-dark-border
                    bg-dark-border/50
                    text-slate-300
                  `
              }
            `}
          >
            {systemLang.systemOverview.badge}
          </span>
        </div>

        {/* =================================================
            MAIN HEADING
        ================================================== */}
        <h1
          id="system-overview-title"
          className={`
            mb-6
            text-3xl
            font-bold
            leading-tight
            tracking-tight
            transition-colors

            md:text-4xl

            ${isLight ? "text-slate-950" : "text-slate-100"}
          `}
        >
          {hasKeyword ? (
            <>
              {titleBeforeKeyword}

              <span className="text-accent-blue">{highlightedTitle}</span>

              {titleAfterKeyword}
            </>
          ) : (
            title
          )}
        </h1>

        {/* =================================================
            DESCRIPTION
        ================================================== */}
        <p
          className={`
            mb-8
            max-w-3xl
            text-sm
            leading-7
            transition-colors

            md:text-base
            md:leading-8

            ${isLight ? "text-slate-600" : "text-slate-300"}
          `}
        >
          {systemLang.systemOverview.description}
        </p>
      </div>

      {/* =================================================
          TECHNOLOGY STACK
      ================================================== */}
      <div
        className={`
          flex
          flex-col
          gap-4
          border-t
          pt-6
          transition-colors

          sm:flex-row
          sm:items-end
          sm:justify-between

          ${isLight ? "border-slate-200" : "border-dark-border/60"}
        `}
      >
        <div>
          <span className="sr-only">Technology stack</span>

          <ul
            aria-label="Technology stack"
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {TECH_STACK.map((tech) => (
              <li key={tech}>
                <span
                  className={`
                    inline-flex
                    items-center
                    rounded-xl
                    border
                    px-3.5
                    py-1.5
                    font-mono
                    text-xs
                    font-medium
                    transition-colors

                    ${
                      isLight
                        ? `
                          border-slate-200
                          bg-white
                          text-slate-700
                          shadow-sm
                        `
                        : `
                          border-dark-border
                          bg-dark-border/40
                          text-slate-300
                        `
                    }
                  `}
                >
                  {tech}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* System connection status */}
        <span
          className="
            shrink-0
            font-mono
            text-xs
            font-medium
            text-accent-blue
          "
        >
          {systemLang.systemOverview.secureConnection}
        </span>
      </div>
    </section>
  );
};
