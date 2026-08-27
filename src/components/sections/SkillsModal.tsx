import React, { useId, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useSystem } from "../../context/SystemContext";
import { ModalHeader } from "../commons/ModalHeader";
import { ModalContainer } from "../commons/ModalContainer";

interface SkillsModalProps {
  isOpen: boolean;
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen }) => {
  const { theme, closeModal, systemLang } = useSystem();

  const isLight = theme === "light";
  const shouldReduceMotion = useReducedMotion();

  const t = systemLang.skillsModal;

  /*
   * =====================================================
   * ACCESSIBILITY
   * =====================================================
   */

  const titleId = useId();

  /*
   * =====================================================
   * ACCORDION STATE
   * =====================================================
   *
   * Default kategori pertama terbuka agar recruiter
   * langsung melihat content tanpa interaction tambahan.
   */

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!isOpen) {
    return null;
  }

  /*
   * =====================================================
   * ACTIONS
   * =====================================================
   */

  const handleClose = () => {
    closeModal("~/sys/home");
  };

  const toggleAccordion = (index: number) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <ModalContainer onClose={handleClose} titleId={titleId}>
      {/* =================================================
          MODAL HEADER
      ================================================== */}

      <ModalHeader title={t.title} titleId={titleId} onClose={handleClose} />

      {/* =================================================
          MODAL BODY
      ================================================== */}

      <div
        className="
          custom-scrollbar
          min-h-0
          flex-1
          space-y-5
          overflow-y-auto
          p-4

          sm:p-6
        "
      >
        {/* =================================================
            INTRODUCTION
        ================================================== */}

        <div
          className={`
            rounded-xl
            border
            px-4
            py-3

            ${
              isLight
                ? `
                  border-slate-200
                  bg-slate-50
                `
                : `
                  border-dark-border
                  bg-navy-base/30
                `
            }
          `}
        >
          <p
            className={`
              text-sm
              leading-6

              ${isLight ? "text-slate-700" : "text-slate-300"}
            `}
          >
            {t.description}
          </p>
        </div>

        {/* =================================================
            SKILL GROUPS
        ================================================== */}

        <div className="space-y-3">
          {t.skillsData.map((group, index) => {
            const isOpenAccordion = openIndex === index;

            /*
             * React useId tidak boleh dipanggil di dalam map,
             * jadi kita menggunakan index hanya untuk membuat
             * DOM relationship id yang stabil selama render.
             */
            const triggerId = `skill-group-trigger-${index}`;

            const panelId = `skill-group-panel-${index}`;

            return (
              <section
                key={group.categoryName}
                className={`
                    overflow-hidden
                    rounded-2xl
                    border
                    transition-colors

                    ${
                      isLight
                        ? `
                          border-slate-200
                          bg-slate-50
                          shadow-sm
                        `
                        : `
                          border-dark-border
                          bg-navy-base/50
                        `
                    }
                  `}
              >
                {/* =========================================
                      ACCORDION TRIGGER
                  ========================================== */}

                <h3>
                  <button
                    id={triggerId}
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpenAccordion}
                    aria-controls={panelId}
                    className={`
                        flex
                        min-h-14
                        w-full
                        items-center
                        justify-between
                        gap-3
                        p-4
                        text-left
                        transition-colors

                        sm:p-5

                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-inset
                        focus-visible:ring-accent-blue

                        ${
                          isLight
                            ? `
                              hover:bg-slate-100
                            `
                            : `
                              hover:bg-accent-blue/5
                            `
                        }
                      `}
                  >
                    <span
                      className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                        "
                    >
                      {/* Status dot */}
                      <span
                        aria-hidden="true"
                        className={`
                            h-2
                            w-2
                            shrink-0
                            rounded-full
                            transition-colors

                            ${
                              isOpenAccordion
                                ? `
                                  scale-125
                                  bg-accent-blue
                                  motion-safe:animate-pulse
                                `
                                : isLight
                                  ? "bg-slate-400"
                                  : "bg-slate-500"
                            }
                          `}
                      />

                      <span
                        className={`
                            min-w-0
                            truncate
                            font-mono
                            text-sm
                            font-semibold
                            uppercase
                            tracking-wider

                            ${
                              isOpenAccordion
                                ? "text-accent-blue"
                                : isLight
                                  ? "text-slate-800"
                                  : "text-slate-300"
                            }
                          `}
                      >
                        // {group.categoryName}
                      </span>
                    </span>

                    {/* =====================================
                          COUNT + EXPAND ICON
                      ====================================== */}

                    <span
                      className="
                          flex
                          shrink-0
                          items-center
                          gap-2
                        "
                    >
                      <span
                        className={`
                            rounded-lg
                            px-2
                            py-1
                            font-mono
                            text-xs
                            font-medium

                            ${
                              isLight
                                ? `
                                  bg-slate-200
                                  text-slate-700
                                `
                                : `
                                  bg-dark-border
                                  text-slate-300
                                `
                            }
                          `}
                      >
                        {group.skills.length} {t.itemsLabel}
                      </span>

                      <motion.span
                        aria-hidden="true"
                        animate={{
                          rotate: isOpenAccordion ? 180 : 0,
                        }}
                        transition={
                          shouldReduceMotion
                            ? {
                                duration: 0,
                              }
                            : {
                                duration: 0.2,
                              }
                        }
                        className={`
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            font-mono
                            text-sm
                            font-semibold

                            ${
                              isLight
                                ? `
                                  bg-slate-200/80
                                  text-slate-700
                                `
                                : `
                                  bg-dark-border
                                  text-slate-300
                                `
                            }
                          `}
                      >
                        {isOpenAccordion ? "−" : "+"}
                      </motion.span>
                    </span>
                  </button>
                </h3>

                {/* =========================================
                      ACCORDION CONTENT
                  ========================================== */}

                <AnimatePresence initial={false}>
                  {isOpenAccordion && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              height: 0,
                            }
                      }
                      animate={{
                        opacity: 1,
                        height: "auto",
                      }}
                      exit={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              height: 0,
                            }
                      }
                      transition={
                        shouldReduceMotion
                          ? {
                              duration: 0,
                            }
                          : {
                              duration: 0.2,
                              ease: "easeInOut",
                            }
                      }
                      className="overflow-hidden"
                    >
                      <div
                        className={`
                            border-t
                            px-4
                            pb-5
                            pt-4

                            sm:px-5

                            ${
                              isLight
                                ? `
                                  border-slate-200
                                  bg-white/60
                                `
                                : `
                                  border-dark-border/60
                                  bg-navy-base/30
                                `
                            }
                          `}
                      >
                        <ul
                          aria-label={`${group.categoryName} skills`}
                          className="
                              flex
                              flex-wrap
                              gap-2
                            "
                        >
                          {group.skills.map((skillObj) => (
                            <li key={`${group.categoryName}-${skillObj.name}`}>
                              <div
                                className={`
                                      inline-flex
                                      items-center
                                      gap-2
                                      rounded-xl
                                      border
                                      px-3
                                      py-2
                                      transition-colors

                                      ${
                                        isLight
                                          ? `
                                            border-slate-200
                                            bg-white
                                            text-slate-700
                                            shadow-sm

                                            hover:border-accent-blue/50
                                          `
                                          : `
                                            border-dark-border
                                            bg-dark-border/60
                                            text-slate-200

                                            hover:border-accent-blue/50
                                          `
                                      }
                                    `}
                              >
                                <span
                                  className="
                                        text-sm
                                        font-medium
                                      "
                                >
                                  {skillObj.name}
                                </span>

                                <span
                                  className={`
                                        rounded-md
                                        border
                                        px-2
                                        py-0.5
                                        font-mono
                                        text-xs
                                        font-medium

                                        ${
                                          skillObj.level === "Advanced"
                                            ? isLight
                                              ? `
                                                border-accent-blue/30
                                                bg-blue-50
                                                text-blue-700
                                              `
                                              : `
                                                border-accent-blue/30
                                                bg-accent-blue/15
                                                text-blue-300
                                              `
                                            : isLight
                                              ? `
                                                border-slate-200
                                                bg-slate-100
                                                text-slate-600
                                              `
                                              : `
                                                border-dark-border
                                                bg-navy-base
                                                text-slate-400
                                              `
                                        }
                                      `}
                                >
                                  {skillObj.level}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            );
          })}
        </div>
      </div>
    </ModalContainer>
  );
};
