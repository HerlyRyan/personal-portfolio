import React, { useEffect, useId, useRef } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useSystem } from "../../context/SystemContext";

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export const ConfirmExternalModal: React.FC = () => {
  const { confirmUrl, clearExternalUrl, theme, systemLang, activeModal } =
    useSystem();

  const isLight = theme === "light";
  const shouldReduceMotion = useReducedMotion();

  const dialogRef = useRef<HTMLDivElement>(null);

  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descriptionId = useId();

  /*
   * =====================================================
   * DIALOG ACCESSIBILITY
   * =====================================================
   */

  useEffect(() => {
    if (!confirmUrl) {
      return;
    }

    /*
     * Simpan focus sebelum confirmation dialog muncul.
     */
    if (document.activeElement instanceof HTMLElement) {
      previouslyFocusedElementRef.current = document.activeElement;
    }

    /*
     * Jika confirmation dibuka dari ProjectsModal,
     * body sebenarnya sudah dikunci oleh ModalContainer.
     *
     * Confirmation hanya perlu mengambil ownership body
     * jika tidak ada modal utama yang sedang aktif.
     */
    const shouldLockBody = activeModal === null;

    const previousOverflow = document.body.style.overflow;

    if (shouldLockBody) {
      document.body.style.overflow = "hidden";
    }

    /*
     * Default focus diarahkan ke Cancel.
     *
     * Untuk confirmation dialog, destructive / navigation
     * action sebaiknya tidak menjadi default focus.
     */
    const focusFrame = requestAnimationFrame(() => {
      cancelButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        clearExternalUrl();

        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();

        return;
      }

      const firstElement = focusableElements[0];

      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();

        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);

      if (shouldLockBody) {
        document.body.style.overflow = previousOverflow;
      }

      document.removeEventListener("keydown", handleKeyDown);

      /*
       * Kembalikan focus ke elemen yang membuka dialog.
       */
      requestAnimationFrame(() => {
        previouslyFocusedElementRef.current?.focus();
        previouslyFocusedElementRef.current = null;
      });
    };
  }, [confirmUrl, clearExternalUrl, activeModal]);

  /*
   * =====================================================
   * ACTIONS
   * =====================================================
   */

  const handleCancel = () => {
    clearExternalUrl();
  };

  const handleConfirm = () => {
    if (!confirmUrl) {
      return;
    }

    window.open(confirmUrl, "_blank", "noopener,noreferrer");

    clearExternalUrl();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleCancel();
    }
  };

  /*
   * =====================================================
   * URL DISPLAY
   * =====================================================
   */

  const displayUrl = (() => {
    if (!confirmUrl) {
      return "";
    }

    try {
      const parsedUrl = new URL(confirmUrl);

      if (parsedUrl.protocol === "mailto:") {
        return confirmUrl;
      }

      return parsedUrl.hostname;
    } catch {
      return confirmUrl;
    }
  })();

  return (
    <AnimatePresence>
      {confirmUrl && (
        <div
          className="
            fixed
            inset-0
            z-100000
            flex
            items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-xs
          "
          onMouseDown={handleBackdropClick}
        >
          <motion.div
            ref={dialogRef}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 10,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={
              shouldReduceMotion
                ? {
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 10,
                  }
            }
            transition={
              shouldReduceMotion
                ? {
                    duration: 0,
                  }
                : {
                    duration: 0.2,
                    ease: "easeOut",
                  }
            }
            className={`
              w-full
              max-w-md
              space-y-5
              rounded-3xl
              border
              p-5
              shadow-2xl

              sm:p-6

              ${
                isLight
                  ? `
                    border-slate-300
                    bg-white
                    text-slate-950
                  `
                  : `
                    border-dark-border
                    bg-dark-card
                    text-slate-100
                  `
              }
            `}
          >
            {/* =========================================
                HEADER
            ========================================== */}

            <div className="space-y-2">
              <span
                aria-hidden="true"
                className="
                  font-mono
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-accent-blue
                "
              >
                // SECURITY CHECK
              </span>

              <h2
                id={titleId}
                className={`
                  text-lg
                  font-bold
                  leading-7

                  ${isLight ? "text-slate-950" : "text-slate-100"}
                `}
              >
                {systemLang.confirmationModal.title}
              </h2>

              <p
                id={descriptionId}
                className={`
                  text-sm
                  leading-6

                  ${isLight ? "text-slate-600" : "text-slate-300"}
                `}
              >
                {systemLang.confirmationModal.description}
              </p>
            </div>

            {/* =========================================
                TARGET URL
            ========================================== */}

            <div
              className={`
                rounded-2xl
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
                      bg-navy-base/50
                    `
                }
              `}
            >
              <span
                className={`
                  block
                  font-mono
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider

                  ${isLight ? "text-slate-500" : "text-slate-400"}
                `}
              >
                {systemLang.confirmationModal.destination}
              </span>

              <span
                className="
                  mt-1
                  block
                  wrap-break-word
                  font-mono
                  text-sm
                  font-semibold
                  text-accent-blue
                "
                title={confirmUrl}
              >
                {displayUrl}
              </span>
            </div>

            {/* =========================================
                ACTIONS
            ========================================== */}

            <div
              className="
                flex
                flex-col-reverse
                gap-2
                pt-1

                sm:flex-row
                sm:items-center
                sm:justify-end
                sm:gap-3
              "
            >
              <button
                ref={cancelButtonRef}
                type="button"
                onClick={handleCancel}
                className={`
                  min-h-11
                  rounded-xl
                  border
                  px-4
                  py-2.5
                  font-mono
                  text-xs
                  font-semibold
                  transition-colors

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent-blue
                  focus-visible:ring-offset-2

                  ${
                    isLight
                      ? `
                        border-slate-300
                        bg-slate-100
                        text-slate-700

                        hover:bg-slate-200

                        focus-visible:ring-offset-white
                      `
                      : `
                        border-dark-border
                        bg-dark-border/40
                        text-slate-300

                        hover:bg-dark-border
                        hover:text-white

                        focus-visible:ring-offset-dark-card
                      `
                  }
                `}
              >
                {systemLang.confirmationModal.noButton}
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="
                  min-h-11
                  rounded-xl
                  border
                  border-accent-blue
                  bg-accent-blue
                  px-4
                  py-2.5
                  font-mono
                  text-xs
                  font-semibold
                  text-white!
                  shadow-md
                  transition-colors

                  hover:bg-accent-subtle

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-accent-blue
                  focus-visible:ring-offset-2
                "
              >
                {systemLang.confirmationModal.yesButton}
                <span aria-hidden="true" className="ml-1">
                  ↗
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
