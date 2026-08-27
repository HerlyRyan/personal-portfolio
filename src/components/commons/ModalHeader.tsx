import React, { forwardRef } from "react";

import { useSystem } from "../../context/SystemContext";

interface ModalHeaderProps {
  title: string;

  titleId: string;

  onClose: () => void;

  showDot?: boolean;

  extraContent?: React.ReactNode;
}

export const ModalHeader = forwardRef<HTMLButtonElement, ModalHeaderProps>(
  (
    { title, titleId, onClose, showDot = true, extraContent },
    closeButtonRef,
  ) => {
    const { theme } = useSystem();

    const isLight = theme === "light";

    return (
      <header
        className={`
            flex
            shrink-0
            items-center
            justify-between
            gap-3
            border-b
            px-4
            py-3

            sm:px-6
            sm:py-3.5

            ${
              isLight
                ? `
                  border-slate-200
                  bg-slate-50/90
                `
                : `
                  border-dark-border
                  bg-navy-base/60
                `
            }
          `}
      >
        <div
          className="
              flex
              min-w-0
              items-center
              gap-2
            "
        >
          {showDot && (
            <span
              aria-hidden="true"
              className="
                  h-2.5
                  w-2.5
                  shrink-0
                  rounded-full
                  bg-accent-blue
                "
            />
          )}

          <h2
            id={titleId}
            className={`
                truncate
                font-mono
                text-sm
                font-semibold
                uppercase
                tracking-wider

                ${isLight ? "text-slate-900" : "text-slate-100"}
              `}
          >
            {title}
          </h2>

          {extraContent}
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label={`Close ${title} dialog`}
          className={`
              inline-flex
              min-h-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              px-3
              font-mono
              text-xs
              font-medium
              transition-colors

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent-blue
              focus-visible:ring-offset-2

              ${
                isLight
                  ? `
                    border-slate-300
                    bg-white
                    text-slate-700

                    hover:bg-slate-100
                    hover:text-slate-950

                    focus-visible:ring-offset-white
                  `
                  : `
                    border-dark-border
                    bg-dark-border/50
                    text-slate-300

                    hover:bg-dark-border
                    hover:text-white

                    focus-visible:ring-offset-dark-card
                  `
              }
            `}
        >
          <span
            aria-hidden="true"
            className="
                hidden
                sm:inline
              "
          >
            [Esc]&nbsp;
          </span>
          Close
        </button>
      </header>
    );
  },
);

ModalHeader.displayName = "ModalHeader";
