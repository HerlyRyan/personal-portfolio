import React, { useId, useMemo, useState } from "react";

import { useSystem } from "../../context/SystemContext";
import { ModalHeader } from "../commons/ModalHeader";
import { ModalContainer } from "../commons/ModalContainer";
import type { ExperienceType } from "../../locales/data/experienceData";

interface ExperienceModalProps {
  isOpen: boolean;
}

const AVAILABLE_TYPES: ExperienceType[] = [
  "full-time",
  "part-time",
  "internship",
  "freelance",
  "bootcamp",
];

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen }) => {
  const { theme, closeModal, systemLang } = useSystem();

  const isLight = theme === "light";
  const t = systemLang.experienceModal;

  const titleId = useId();

  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const [selectedType, setSelectedType] = useState<ExperienceType | null>(null);

  const [expandedExperienceId, setExpandedExperienceId] = useState<
    string | null
  >(null);

  const [isTechMenuOpen, setIsTechMenuOpen] = useState(false);

  /*
   * =====================================================
   * DATA DERIVATION
   * =====================================================
   */

  const allTechs = useMemo(() => {
    return Array.from(
      new Set(t.experienceItems.flatMap((item) => item.techStack)),
    ).sort((a, b) => a.localeCompare(b));
  }, [t.experienceItems]);

  const filteredExperience = useMemo(() => {
    return t.experienceItems
      .slice()
      .reverse()
      .filter((item) => {
        const matchesTech = selectedTech
          ? item.techStack.includes(selectedTech)
          : true;

        const matchesType = selectedType ? item.type === selectedType : true;

        return matchesTech && matchesType;
      });
  }, [selectedTech, selectedType, t.experienceItems]);

  /*
   * =====================================================
   * MODAL
   * =====================================================
   */

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    closeModal("~/sys/home");
  };

  /*
   * =====================================================
   * BADGE STYLE
   * =====================================================
   */

  const getTypeBadgeStyle = (type: ExperienceType) => {
    switch (type) {
      case "full-time":
      case "freelance":
        return isLight
          ? `
            border-emerald-600/30
            bg-emerald-50
            text-emerald-700
          `
          : `
            border-emerald-500/30
            bg-emerald-500/10
            text-emerald-400
          `;

      case "internship":
      case "part-time":
        return isLight
          ? `
            border-amber-600/30
            bg-amber-50
            text-amber-700
          `
          : `
            border-amber-500/30
            bg-amber-500/10
            text-amber-400
          `;

      case "bootcamp":
        return isLight
          ? `
            border-purple-600/30
            bg-purple-50
            text-purple-700
          `
          : `
            border-purple-500/30
            bg-purple-500/10
            text-purple-400
          `;

      default:
        return `
          border-accent-blue/30
          bg-accent-blue/10
          text-accent-blue
        `;
    }
  };

  const activeFilterCount =
    Number(Boolean(selectedType)) + Number(Boolean(selectedTech));

  const handleExperienceToggle = (experienceId: string) => {
    setExpandedExperienceId((currentId) =>
      currentId === experienceId ? null : experienceId,
    );
  };

  return (
    <ModalContainer onClose={handleClose} titleId={titleId}>
      {/* =================================================
          MODAL HEADER
      ================================================== */}

      <ModalHeader
        title={t.title}
        titleId={titleId}
        onClose={handleClose}
        extraContent={
          activeFilterCount > 0 ? (
            <span
              className="
                hidden
                rounded-full
                bg-accent-blue/10
                px-2
                py-0.5
                font-mono
                text-xs
                font-medium
                text-accent-blue

                sm:inline
              "
            >
              {activeFilterCount} active
            </span>
          ) : null
        }
      />

      {/* =================================================
          FILTER RESULT ANNOUNCEMENT
      ================================================== */}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {filteredExperience.length} experience
        {filteredExperience.length === 1 ? "" : "s"}.
      </p>

      {/* =================================================
          MODAL BODY
      ================================================== */}

      <div
        className="
          custom-scrollbar
          min-h-0
          flex-1
          space-y-6
          overflow-y-auto
          p-4

          sm:p-6
        "
      >
        {/* =================================================
            TYPE FILTER
        ================================================== */}

        <section aria-labelledby="experience-type-filter" className="space-y-3">
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <h3
              id="experience-type-filter"
              className={`
                font-mono
                text-xs
                font-semibold
                uppercase
                tracking-wider

                ${isLight ? "text-slate-600" : "text-slate-400"}
              `}
            >
              {t.filterTypeTag || "// Filter by Category"}
            </h3>

            {selectedType && (
              <button
                type="button"
                onClick={() => setSelectedType(null)}
                className="
                  min-h-8
                  rounded-lg
                  px-2
                  font-mono
                  text-xs
                  font-medium
                  text-accent-blue
                  transition-colors

                  hover:bg-accent-blue/10

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent-blue
                "
              >
                {t.resetTypeFilter || "Reset Category"}
              </button>
            )}
          </div>

          <div
            role="group"
            aria-label="Filter experiences by employment type"
            className="
              flex
              flex-wrap
              gap-2
            "
          >
            {AVAILABLE_TYPES.map((typeKey) => {
              const isSelected = selectedType === typeKey;

              return (
                <button
                  key={typeKey}
                  type="button"
                  onClick={() => setSelectedType(isSelected ? null : typeKey)}
                  aria-pressed={isSelected}
                  className={`
                      min-h-10
                      rounded-xl
                      border
                      px-3.5
                      py-2
                      font-mono
                      text-xs
                      font-medium
                      transition-colors

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-accent-blue

                      ${
                        isSelected
                          ? `
                            border-accent-blue
                            bg-accent-blue
                            text-white!
                          `
                          : isLight
                            ? `
                              border-slate-200
                              bg-slate-100
                              text-slate-700

                              hover:bg-slate-200
                            `
                            : `
                              border-dark-border
                              bg-dark-border/40
                              text-slate-300

                              hover:bg-dark-border
                              hover:text-white
                            `
                      }
                    `}
                >
                  {t.typeLabels[typeKey]}
                </button>
              );
            })}
          </div>
        </section>

        {/* =================================================
            TECH FILTER
        ================================================== */}

        <section
          aria-labelledby="experience-tech-filter"
          className={`
            space-y-3
            border-t
            border-dashed
            pt-5

            ${isLight ? "border-slate-300" : "border-dark-border"}
          `}
        >
          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <h3
              id="experience-tech-filter"
              className={`
                font-mono
                text-xs
                font-semibold
                uppercase
                tracking-wider

                ${isLight ? "text-slate-600" : "text-slate-400"}
              `}
            >
              {t.filterTag}
            </h3>

            {selectedTech && (
              <button
                type="button"
                onClick={() => setSelectedTech(null)}
                className="
                  min-h-8
                  rounded-lg
                  px-2
                  font-mono
                  text-xs
                  font-medium
                  text-accent-blue
                  transition-colors

                  hover:bg-accent-blue/10

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent-blue
                "
              >
                {t.resetFilter}
              </button>
            )}
          </div>

          <div className="relative">
            <label htmlFor="experience-tech-select" className="sr-only">
              Filter experiences by technology
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTechMenuOpen((previous) => !previous)}
                aria-haspopup="listbox"
                aria-expanded={isTechMenuOpen}
                aria-controls="experience-tech-list"
                className={`
      flex
      min-h-11
      w-full
      items-center
      justify-between
      gap-3
      rounded-xl
      border
      px-3
      py-2.5
      text-left
      transition-colors

      focus-visible:outline-none
      focus-visible:ring-2
      focus-visible:ring-accent-blue

      ${
        isLight
          ? `
            border-slate-200
            bg-slate-100
            text-slate-700

            hover:border-accent-blue/40
          `
          : `
            border-dark-border
            bg-dark-border/40
            text-slate-300

            hover:border-accent-blue/40
          `
      }
    `}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <span className="shrink-0 font-mono text-xs font-semibold text-accent-blue">
                    {">"}
                  </span>

                  <span
                    className={`truncate font-mono text-sm font-medium ${
                      selectedTech
                        ? isLight
                          ? "text-slate-800"
                          : "text-slate-200"
                        : isLight
                          ? "text-slate-500"
                          : "text-slate-400"
                    }`}
                  >
                    {selectedTech ?? "All Technologies"}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={`shrink-0 font-mono text-xs text-accent-blue transition-transform ${
                    isTechMenuOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {isTechMenuOpen && (
                <div
                  id="experience-tech-list"
                  role="listbox"
                  aria-label="Filter experiences by technology"
                  className={`
        absolute
        left-0
        right-0
        top-full
        z-40
        mt-2
        overflow-hidden
        rounded-xl
        border
        shadow-2xl

        ${
          isLight
            ? `
              border-slate-200
              bg-white
              shadow-slate-300/40
            `
            : `
              border-dark-border
              bg-dark-card
              shadow-black/50
            `
        }
      `}
                >
                  <div
                    className="
          custom-scrollbar
          max-h-64
          overflow-y-auto
          overscroll-contain
          p-1.5
        "
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedTech === null}
                      onClick={() => {
                        setSelectedTech(null);
                        setIsTechMenuOpen(false);
                      }}
                      className={`
            flex
            min-h-10
            w-full
            items-center
            justify-between
            gap-3
            rounded-lg
            px-3
            py-2
            text-left
            transition-colors

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-inset
            focus-visible:ring-accent-blue

            ${
              selectedTech === null
                ? "bg-accent-blue/10 text-accent-blue"
                : isLight
                  ? "text-slate-700 hover:bg-slate-100"
                  : "text-slate-300 hover:bg-dark-border/50 hover:text-white"
            }
          `}
                    >
                      <span className="font-mono text-sm font-medium">
                        All Technologies
                      </span>

                      {selectedTech === null && (
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-sm font-bold text-accent-blue"
                        >
                          ✓
                        </span>
                      )}
                    </button>

                    {allTechs.map((tech) => {
                      const isSelected = selectedTech === tech;

                      return (
                        <button
                          key={tech}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setSelectedTech(tech);
                            setIsTechMenuOpen(false);
                          }}
                          className={`
                flex
                min-h-10
                w-full
                items-center
                justify-between
                gap-3
                rounded-lg
                px-3
                py-2
                text-left
                transition-colors

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-inset
                focus-visible:ring-accent-blue

                ${
                  isSelected
                    ? "bg-accent-blue/10 text-accent-blue"
                    : isLight
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-dark-border/50 hover:text-white"
                }
              `}
                        >
                          <span className="truncate font-mono text-sm font-medium">
                            {tech}
                          </span>

                          {isSelected && (
                            <span
                              aria-hidden="true"
                              className="shrink-0 text-sm font-bold text-accent-blue"
                            >
                              ✓
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =================================================
            EXPERIENCE SUMMARY
        ================================================== */}

        <div
          className={`
            flex
            items-center
            justify-between
            gap-3
            border-t
            pt-4

            ${isLight ? "border-slate-200" : "border-dark-border"}
          `}
        >
          <span
            className={`
              text-sm
              font-medium

              ${isLight ? "text-slate-700" : "text-slate-300"}
            `}
          >
            {filteredExperience.length} experience
            {filteredExperience.length === 1 ? "" : "s"}
          </span>

          {(selectedType || selectedTech) && (
            <button
              type="button"
              onClick={() => {
                setSelectedType(null);
                setSelectedTech(null);
              }}
              className="
                min-h-9
                rounded-lg
                px-2
                font-mono
                text-xs
                font-medium
                text-accent-blue
                transition-colors

                hover:bg-accent-blue/10

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent-blue
              "
            >
              Clear all
            </button>
          )}
        </div>

        {/* =================================================
            EXPERIENCE TIMELINE
        ================================================== */}

        <section aria-label="Professional experience timeline">
          {filteredExperience.length === 0 ? (
            <div
              role="status"
              className={`
                rounded-2xl
                border
                px-4
                py-8
                text-center

                ${
                  isLight
                    ? `
                      border-slate-200
                      bg-slate-50
                    `
                    : `
                      border-dark-border
                      bg-navy-base/40
                    `
                }
              `}
            >
              <p
                className="
                  font-mono
                  text-xs
                  font-medium
                  text-accent-blue
                "
              >
                $ warning:
              </p>

              <p
                className={`
                  mt-2
                  text-sm

                  ${isLight ? "text-slate-600" : "text-slate-300"}
                `}
              >
                No experience matches the selected filters.
              </p>
            </div>
          ) : (
            <ol
              className="
                relative
                ml-3
                space-y-5
                border-l-2
                border-accent-blue/30
                pl-5

                sm:pl-6
              "
            >
              {filteredExperience.map((item) => {
                const isExpanded = expandedExperienceId === item.id;

                return (
                  <li
                    key={item.id}
                    className="
                      group
                      relative
                    "
                  >
                    {/* Timeline marker */}
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        -left-7
                        top-6

                        h-3.5
                        w-3.5

                        rounded-full
                        border-2
                        border-accent-blue
                        bg-navy-base
                        transition-colors

                        group-hover:scale-110
                        group-hover:bg-accent-blue

                        sm:-left-8
                      "
                    />

                    <article
                      className={`rounded-2xl border p-5 transition-colors sm:p-6 ${
                        isLight
                          ? "border-slate-200 bg-slate-50 hover:border-accent-blue/40"
                          : "border-dark-border bg-navy-base/50 hover:border-accent-blue/40"
                      }`}
                    >
                      {/* EXPERIENCE SUMMARY */}
                      <header className="space-y-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex min-w-0 flex-wrap items-center gap-2">
                            <h3
                              className={`text-base font-bold leading-snug sm:text-lg ${
                                isLight ? "text-slate-950" : "text-slate-100"
                              }`}
                            >
                              {item.role}
                            </h3>

                            {item.type && t.typeLabels[item.type] && (
                              <span
                                className={`rounded-lg border px-2.5 py-1 font-mono text-xs font-semibold ${getTypeBadgeStyle(
                                  item.type,
                                )}`}
                              >
                                {t.typeLabels[item.type]}
                              </span>
                            )}
                          </div>

                          <span
                            className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs font-medium ${
                              isLight
                                ? "border-slate-200 bg-white text-slate-600"
                                : "border-dark-border bg-dark-border/60 text-slate-300"
                            }`}
                          >
                            <span aria-hidden="true">◷</span>

                            {item.period}
                          </span>
                        </div>

                        {/* COMPANY & LOCATION */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-mono text-sm font-semibold text-accent-blue">
                            @ {item.company}
                          </span>

                          <span
                            aria-hidden="true"
                            className={
                              isLight ? "text-slate-400" : "text-slate-500"
                            }
                          >
                            •
                          </span>

                          <span
                            className={`text-sm ${
                              isLight ? "text-slate-600" : "text-slate-400"
                            }`}
                          >
                            <span aria-hidden="true">📍 </span>

                            {item.location}
                          </span>
                        </div>

                        {/* ACCORDION TRIGGER */}
                        <button
                          type="button"
                          onClick={() => handleExperienceToggle(item.id)}
                          aria-expanded={isExpanded}
                          aria-controls={`${item.id}-details`}
                          className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue ${
                            isLight
                              ? "border-slate-200 bg-white text-slate-700 hover:border-accent-blue/40 hover:bg-slate-50"
                              : "border-dark-border bg-dark-border/30 text-slate-300 hover:border-accent-blue/40 hover:bg-dark-border/50"
                          }`}
                        >
                          <span className="font-mono text-xs font-medium text-accent-blue">
                            {isExpanded ? "// Hide Details" : "// View Details"}
                          </span>

                          <span
                            aria-hidden="true"
                            className={`font-mono text-xs text-accent-blue transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          >
                            ▼
                          </span>
                        </button>
                      </header>

                      {/* ACCORDION CONTENT */}
                      {isExpanded && (
                        <div
                          id={`${item.id}-details`}
                          className={`mt-5 space-y-5 border-t pt-5 ${
                            isLight
                              ? "border-slate-200"
                              : "border-dark-border/60"
                          }`}
                        >
                          {/* DESCRIPTION */}
                          <p
                            className={`text-sm leading-7 ${
                              isLight ? "text-slate-700" : "text-slate-300"
                            }`}
                          >
                            {item.description}
                          </p>

                          {/* CONTRIBUTIONS */}
                          {item.highlights && item.highlights.length > 0 && (
                            <section
                              aria-labelledby={`${item.id}-highlights`}
                              className="space-y-2"
                            >
                              <h4
                                id={`${item.id}-highlights`}
                                className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                                  isLight ? "text-slate-600" : "text-slate-400"
                                }`}
                              >
                                // Key Contributions & Impact
                              </h4>

                              <ul className="space-y-2">
                                {item.highlights.map((highlight) => (
                                  <li
                                    key={highlight}
                                    className={`flex items-start gap-2.5 text-sm leading-6 ${
                                      isLight
                                        ? "text-slate-700"
                                        : "text-slate-300"
                                    }`}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className="mt-0.5 shrink-0 font-bold text-accent-blue"
                                    >
                                      ›
                                    </span>

                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </section>
                          )}

                          {/* TECH STACK */}
                          {item.techStack.length > 0 && (
                            <section
                              aria-label={`${item.role} technology stack`}
                              className={`border-t pt-4 ${
                                isLight
                                  ? "border-slate-200"
                                  : "border-dark-border/60"
                              }`}
                            >
                              <ul className="flex flex-wrap gap-2">
                                {item.techStack.map((tech) => (
                                  <li key={tech}>
                                    <span
                                      className={`inline-flex rounded-lg border px-2.5 py-1.5 font-mono text-xs font-medium ${
                                        isLight
                                          ? "border-slate-200 bg-white text-slate-700"
                                          : "border-dark-border bg-dark-border/50 text-slate-300"
                                      }`}
                                    >
                                      {tech}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </section>
                          )}
                        </div>
                      )}
                    </article>
                  </li>
                );
              })}
            </ol>
          )}
        </section>
      </div>
    </ModalContainer>
  );
};
