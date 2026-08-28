import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProfileSidebar } from "../sections/ProfileSidebar";
import { SystemOverview } from "../sections/SystemOverview";
import { ControlDock } from "./ControlDock";
import { ProjectsModal } from "../sections/ProjectsModal";
import { ExperienceModal } from "../sections/ExperienceModal";
import { SkillsModal } from "../sections/SkillsModal";
import { AboutModal } from "../sections/AboutModal";
import { SystemClockBadge } from "../commons/SystemClockBadge";
import { useSystem } from "../../context/SystemContext";

export const SystemCardLayout: React.FC = () => {
  const { lang, toggleLang, theme, toggleTheme, activeModal, loadingPath } =
    useSystem();

  const shouldReduceMotion = useReducedMotion();
  const isLight = theme === "light";
  const isExitAction = loadingPath === "~/sys/home";

  return (
    <motion.section
      aria-label="Portfolio dashboard"
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.6,
              ease: "easeOut",
            }
      }
      className="
        relative
        mx-auto
        flex
        w-full
        max-w-6xl
        flex-col
        items-center
        justify-center
        px-4
      "
    >
      {/* Terminal navigation/loading overlay */}
      {loadingPath && (
        <div
          role="status"
          aria-live="polite"
          aria-label={
            isExitAction ? "Returning to system home" : `Opening ${loadingPath}`
          }
          className="
            fixed
            inset-0
            z-100
            flex
            items-center
            justify-center
            bg-black/60
            p-4
            font-mono
            backdrop-blur-xs
          "
        >
          <div
            className={`
              flex
              max-w-full
              items-center
              gap-3
              overflow-hidden
              rounded-2xl
              border
              px-5
              py-4
              shadow-2xl

              ${
                isLight
                  ? "border-slate-300 bg-white text-slate-800"
                  : "border-dark-border bg-dark-card/95 text-slate-100"
              }
            `}
          >
            <span
              aria-hidden="true"
              className={`
                h-2.5
                w-2.5
                shrink-0
                rounded-full
                motion-safe:animate-pulse

                ${isExitAction ? "bg-red-500" : "bg-accent-blue"}
              `}
            />

            <span className="text-xs leading-5 sm:text-sm">
              <span aria-hidden="true">$ cd </span>

              <span
                className={`
                  font-semibold

                  ${isExitAction ? "text-red-500" : "text-accent-blue"}
                `}
              >
                {loadingPath}
              </span>

              <span aria-hidden="true">
                {isExitAction ? " && exit_process..." : " && ./execute.sh..."}
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Header controls */}
      <div
        className="
          mb-4
          mt-3
          flex
          min-w-0
          w-full
          max-w-6xl
          items-center
          justify-between
          gap-2

          sm:mt-4
          sm:gap-3
        "
      >
        {/* System Clock */}
        <div className="shrink-0">
          <SystemClockBadge />
        </div>

        {/* Language & Theme controls */}
        <div
          className={`
            flex
            shrink-0
            items-center
            gap-1
            rounded-2xl
            border
            p-1
            backdrop-blur-md
            transition-colors

            ${
              isLight
                ? `
                  border-slate-300
                  bg-white/80
                  shadow-sm
                `
                : `
                  border-dark-border
                  bg-navy-base/70
                  shadow-lg
                  shadow-black/20
                `
            }
          `}
          role="group"
          aria-label="Interface settings"
        >
          {/* Language switcher */}
          <button
            type="button"
            onClick={toggleLang}
            className={`
              flex
              min-h-11
              items-center
              gap-2
              rounded-xl
              px-3
              font-mono
              text-xs
              transition-colors

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent-blue
              focus-visible:ring-offset-2

              ${
                isLight
                  ? `
                    text-slate-700
                    hover:bg-slate-100
                    hover:text-slate-950
                    focus-visible:ring-offset-white
                  `
                  : `
                    text-slate-300
                    hover:bg-dark-border/50
                    hover:text-white
                    focus-visible:ring-offset-dark-card
                  `
              }
            `}
            aria-label={`Change language. Current language: ${lang}`}
            title={`Current language: ${lang}`}
          >
            <span
              aria-hidden="true"
              className="
                  hidden
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-accent-blue

                  sm:inline
                "
            >
              LANG
            </span>

            <span className="font-semibold">{lang}</span>
          </button>

          {/* Divider */}
          <div
            aria-hidden="true"
            className={`
              h-5
              w-px

              ${isLight ? "bg-slate-300" : "bg-dark-border"}
            `}
          />

          {/* Theme switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`
              flex
              min-h-11
              items-center
              gap-2
              rounded-xl
              px-3
              font-mono
              text-xs
              transition-colors

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent-blue
              focus-visible:ring-offset-2

              ${
                isLight
                  ? `
                    text-slate-700
                    hover:bg-slate-100
                    hover:text-slate-950
                    focus-visible:ring-offset-white
                  `
                  : `
                    text-slate-300
                    hover:bg-dark-border/50
                    hover:text-white
                    focus-visible:ring-offset-dark-card
                  `
              }
            `}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span
              aria-hidden="true"
              className="
                hidden
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-accent-blue

                sm:inline
              "
            >
              MODE
            </span>

            <span className="flex items-center gap-1.5">
              {theme === "dark" ? (
                <>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 text-slate-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>

                  <span className="hidden font-medium sm:inline">Dark</span>
                </>
              ) : (
                <>
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 text-slate-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>

                  <span className="hidden font-medium sm:inline">Light</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Main portfolio card */}
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : {
                scale: 0.98,
              }
        }
        animate={{
          scale: 1,
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 0.5,
                delay: 0.2,
              }
        }
        className={`
          flex
          w-full
          flex-col
          justify-between
          rounded-3xl
          border
          p-5
          shadow-2xl
          transition-colors

          md:p-8
          lg:p-10

          ${
            isLight
              ? `
                border-slate-300
                bg-white
                shadow-slate-300/30
              `
              : `
                border-dark-border
                bg-dark-card
                shadow-black/30
              `
          }
        `}
      >
        <div
          className="
            grid
            grid-cols-1
            items-stretch
            gap-6

            lg:grid-cols-12
            lg:gap-8
          "
        >
          <ProfileSidebar />
          <SystemOverview />
        </div>

        <ControlDock />
      </motion.div>

      {/* Modals */}
      <ProjectsModal isOpen={activeModal === "projects"} />

      <ExperienceModal isOpen={activeModal === "experience"} />

      <SkillsModal isOpen={activeModal === "skills"} />

      <AboutModal isOpen={activeModal === "about"} />
    </motion.section>
  );
};
