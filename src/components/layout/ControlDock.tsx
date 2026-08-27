import React from "react";
import { ArrowUpRightIcon } from "../ui/Icons";
import { useSystem, type ModalType } from "../../context/SystemContext";

type NavigationModal = Exclude<ModalType, null>;

interface NavItem {
  id: NavigationModal;
  label: string;
  code: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "projects",
    label: "Projects",
    code: "01",
    path: "~/sys/projects",
  },
  {
    id: "experience",
    label: "Experience",
    code: "02",
    path: "~/sys/experience",
  },
  {
    id: "skills",
    label: "Skills Stack",
    code: "03",
    path: "~/sys/skills",
  },
  {
    id: "about",
    label: "About & Philosophy",
    code: "04",
    path: "~/sys/about",
  },
];

export const ControlDock: React.FC = () => {
  const { theme, openModal, loadingPath } = useSystem();

  const isLight = theme === "light";
  const isNavigating = loadingPath !== null;

  const handleModuleClick = (item: NavItem) => {
    if (isNavigating) {
      return;
    }

    openModal(item.id, item.path);
  };

  return (
    <nav
      aria-label="Portfolio sections"
      className={`
        mt-6
        grid
        grid-cols-1
        gap-3
        border-t
        pt-5
        transition-colors

        sm:grid-cols-2
        md:grid-cols-4

        ${isLight ? "border-slate-200" : "border-dark-border"}
      `}
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => handleModuleClick(item)}
          disabled={isNavigating}
          aria-label={`Open ${item.label} section`}
          className={`
            group
            flex
            min-h-16
            w-full
            items-center
            justify-between
            gap-3
            rounded-2xl
            border
            px-5
            py-3
            text-left
            transition-colors

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent-blue
            focus-visible:ring-offset-2

            disabled:cursor-wait
            disabled:opacity-60

            ${
              isLight
                ? `
                  border-slate-200
                  bg-slate-50
                  text-slate-900

                  hover:border-slate-300
                  hover:bg-slate-100

                  focus-visible:ring-offset-white
                `
                : `
                  border-dark-border
                  bg-navy-base/50
                  text-slate-100

                  hover:border-accent-blue/40
                  hover:bg-accent-blue/10

                  focus-visible:ring-offset-dark-card
                `
            }
          `}
        >
          <span className="min-w-0">
            <span
              aria-hidden="true"
              className="
                mb-1
                block
                font-mono
                text-xs
                font-medium
                uppercase
                tracking-wider
                text-accent-blue
              "
            >
              {item.code} // Module
            </span>

            <span
              className={`
                block
                text-sm
                font-semibold
                leading-5
                transition-colors

                ${
                  isLight
                    ? `
                      text-slate-900
                      group-hover:text-accent-blue
                    `
                    : `
                      text-slate-100
                      group-hover:text-accent-blue
                    `
                }
              `}
            >
              {item.label}
            </span>
          </span>

          <ArrowUpRightIcon
            aria-hidden="true"
            className="
              h-4
              w-4
              shrink-0
              text-slate-400
              transition-colors
              group-hover:text-accent-blue
            "
          />
        </button>
      ))}
    </nav>
  );
};
