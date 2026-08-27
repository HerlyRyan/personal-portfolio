import React, { useId, useRef, useState } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useSystem } from "../../context/SystemContext";
import { ModalHeader } from "../commons/ModalHeader";
import { ModalContainer } from "../commons/ModalContainer";

interface ProjectsModalProps {
  isOpen: boolean;
}

export const ProjectsModal: React.FC<ProjectsModalProps> = ({ isOpen }) => {
  const { theme, closeModal, requestExternalUrl, systemLang } = useSystem();

  const isLight = theme === "light";
  const shouldReduceMotion = useReducedMotion();

  const t = systemLang.projectsModal;

  /*
   * =====================================================
   * ACCESSIBILITY
   * =====================================================
   */

  const titleId = useId();

  /*
   * =====================================================
   * STATE
   * =====================================================
   */

  const [currentIndex, setCurrentIndex] = useState(0);

  const [mediaIndex, setMediaIndex] = useState(0);

  /*
   * =====================================================
   * CAROUSEL REF
   * =====================================================
   */

  const mediaContainerRef = useRef<HTMLDivElement>(null);

  /*
   * Jangan render modal ketika tidak aktif.
   */
  if (!isOpen) {
    return null;
  }

  /*
   * =====================================================
   * CURRENT PROJECT
   * =====================================================
   */

  const currentProject = t.projectsList[currentIndex];

  const totalProjects = t.projectsList.length;

  const isFirstProject = currentIndex === 0;

  const isLastProject = currentIndex === totalProjects - 1;

  const prevProject = !isFirstProject ? t.projectsList[currentIndex - 1] : null;

  const nextProject = !isLastProject ? t.projectsList[currentIndex + 1] : null;

  /*
   * =====================================================
   * PROJECT MEDIA
   * =====================================================
   */

  const mediaList = [
    ...(currentProject.coverImage ? [currentProject.coverImage] : []),

    ...(currentProject.screenshots ?? []),
  ];

  const hasMedia = mediaList.length > 0;

  /*
   * =====================================================
   * MODAL ACTIONS
   * =====================================================
   */

  const handleClose = () => {
    closeModal("~/sys/home");
  };

  /*
   * =====================================================
   * PROJECT NAVIGATION
   * =====================================================
   */

  const handleNextProject = () => {
    if (isLastProject) {
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);

    setMediaIndex(0);
  };

  const handlePrevProject = () => {
    if (isFirstProject) {
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex - 1);

    setMediaIndex(0);
  };

  const handleProjectJump = (index: number) => {
    if (index < 0 || index >= totalProjects || index === currentIndex) {
      return;
    }

    setCurrentIndex(index);
    setMediaIndex(0);
  };

  /*
   * =====================================================
   * MEDIA NAVIGATION
   * =====================================================
   */

  const scrollToMedia = (index: number) => {
    const container = mediaContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTo({
      left: index * container.clientWidth,

      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const handlePreviousMedia = () => {
    if (!hasMedia) {
      return;
    }

    const newIndex = (mediaIndex - 1 + mediaList.length) % mediaList.length;

    setMediaIndex(newIndex);
    scrollToMedia(newIndex);
  };

  const handleNextMedia = () => {
    if (!hasMedia) {
      return;
    }

    const newIndex = (mediaIndex + 1) % mediaList.length;

    setMediaIndex(newIndex);
    scrollToMedia(newIndex);
  };

  const handleMediaJump = (index: number) => {
    if (index < 0 || index >= mediaList.length || index === mediaIndex) {
      return;
    }

    setMediaIndex(index);
    scrollToMedia(index);
  };

  return (
    <ModalContainer onClose={handleClose} titleId={titleId}>
      {/* =================================================
          MODAL HEADER
      ================================================== */}

      <ModalHeader title={t.title} titleId={titleId} onClose={handleClose} />

      {/* =================================================
          SCREEN READER STATUS
      ================================================== */}

      <div className="sr-only">
        <p aria-live="polite" aria-atomic="true">
          Project {currentIndex + 1} of {totalProjects}: {currentProject.title}
        </p>

        {hasMedia && (
          <p aria-live="polite" aria-atomic="true">
            Image {mediaIndex + 1} of {mediaList.length}
          </p>
        )}
      </div>

      {/* =================================================
          MODAL BODY
      ================================================== */}

      <div
        className="
          custom-scrollbar
          min-h-0
          flex-1
          overflow-y-auto
          p-4

          sm:p-6
        "
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={currentProject.id}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: 15,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: -15,
                  }
            }
            transition={
              shouldReduceMotion
                ? {
                    duration: 0,
                  }
                : {
                    duration: 0.15,
                  }
            }
            className="space-y-6"
          >
            {/* =============================================
                PROJECT HEADER
            ============================================== */}

            <header className="space-y-3">
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-2
                "
              >
                <span
                  className="
                    font-mono
                    text-xs
                    font-semibold
                    text-accent-blue
                  "
                >
                  // {currentProject.id}
                </span>

                <span
                  className="
                    rounded-full
                    border
                    border-accent-blue/20
                    bg-accent-blue/10
                    px-3
                    py-1.5
                    font-mono
                    text-xs
                    font-medium
                    text-accent-blue
                  "
                >
                  {currentProject.category}
                </span>
              </div>

              <h3
                className={`
                  text-xl
                  font-bold
                  leading-tight
                  tracking-tight
                  transition-colors

                  sm:text-2xl

                  ${isLight ? "text-slate-950" : "text-slate-100"}
                `}
              >
                {currentProject.title}
              </h3>
            </header>

            {/* =============================================
                ROLE & IMPACT
            ============================================== */}

            {(currentProject.role || currentProject.metrics) && (
              <div className="space-y-2">
                {currentProject.role && (
                  <div>
                    <span
                      className={`
                        inline-flex
                        rounded-xl
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
                              bg-slate-100
                              text-slate-700
                            `
                            : `
                              border-dark-border
                              bg-dark-border/40
                              text-slate-300
                            `
                        }
                      `}
                    >
                      {t.roleLabel}: {currentProject.role}
                    </span>
                  </div>
                )}

                {currentProject.metrics && (
                  <div
                    className={`
                      rounded-xl
                      border
                      px-3
                      py-2
                      text-sm
                      leading-5

                      ${
                        isLight
                          ? `
                            border-slate-200
                            bg-slate-50
                            text-slate-700
                          `
                          : `
                            border-dark-border
                            bg-dark-border/40
                            text-slate-300
                          `
                      }
                    `}
                  >
                    <span className="font-medium">{t.impactLabel}: </span>

                    <strong
                      className={
                        isLight
                          ? "font-semibold text-emerald-700"
                          : "font-semibold text-emerald-400"
                      }
                    >
                      {currentProject.metrics}
                    </strong>
                  </div>
                )}
              </div>
            )}

            {/* =============================================
                PROJECT MEDIA
            ============================================== */}

            <section
              aria-label={`${currentProject.title} media`}
              className="space-y-3"
            >
              <div
                className={`
                  group
                  relative
                  aspect-708/228
                  w-full
                  overflow-hidden
                  rounded-2xl
                  border

                  ${
                    isLight
                      ? `
                        border-slate-200
                        bg-slate-100
                        shadow-inner
                      `
                      : `
                        border-dark-border
                        bg-dark-border/20
                        shadow-inner
                      `
                  }
                `}
              >
                {hasMedia ? (
                  <div
                    ref={mediaContainerRef}
                    onScroll={(event) => {
                      const target = event.currentTarget;

                      const itemWidth = target.clientWidth;

                      if (itemWidth === 0) {
                        return;
                      }

                      const newIndex = Math.round(
                        target.scrollLeft / itemWidth,
                      );

                      if (
                        newIndex !== mediaIndex &&
                        newIndex >= 0 &&
                        newIndex < mediaList.length
                      ) {
                        setMediaIndex(newIndex);
                      }
                    }}
                    className="
                      flex
                      h-full
                      w-full
                      snap-x
                      snap-mandatory
                      overflow-x-auto
                      overscroll-x-contain
                      touch-pan-x

                      motion-safe:scroll-smooth

                      scrollbar-none
                      [&::-webkit-scrollbar]:hidden
                    "
                  >
                    {mediaList.map((mediaUrl, index) => {
                      const isCover =
                        index === 0 && Boolean(currentProject.coverImage);

                      const screenshotNumber = currentProject.coverImage
                        ? index
                        : index + 1;

                      return (
                        <div
                          key={`${currentProject.id}-${mediaUrl}`}
                          className="
                              relative
                              h-full
                              w-full
                              shrink-0
                              snap-center
                            "
                        >
                          <img
                            src={mediaUrl}
                            alt={
                              isCover
                                ? `${currentProject.title} project cover`
                                : `${currentProject.title} screenshot ${screenshotNumber}`
                            }
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className={`
                                h-full
                                w-full

                                ${isCover ? "object-cover" : "object-contain"}
                              `}
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      p-4
                      text-center
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-xs
                        font-medium
                        text-accent-blue
                      "
                    >
                      [Cover & Screenshots Pending]
                    </span>
                  </div>
                )}

                {/* =========================================
                    CAROUSEL ARROWS
                ========================================== */}

                {hasMedia && mediaList.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePreviousMedia}
                      aria-label="Previous project image"
                      className={`
                          absolute
                          left-2
                          top-1/2
                          z-10

                          flex
                          h-11
                          w-11
                          -translate-y-1/2
                          items-center
                          justify-center

                          rounded-full
                          border
                          font-mono
                          text-sm

                          backdrop-blur-md
                          transition-colors

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-accent-blue

                          sm:left-3

                          ${
                            isLight
                              ? `
                                border-slate-200
                                bg-white/90
                                text-slate-800

                                hover:bg-accent-blue
                                hover:text-white
                              `
                              : `
                                border-white/10
                                bg-black/60
                                text-white

                                hover:bg-accent-blue
                              `
                          }
                        `}
                    >
                      <span aria-hidden="true">❮</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleNextMedia}
                      aria-label="Next project image"
                      className={`
                          absolute
                          right-2
                          top-1/2
                          z-10

                          flex
                          h-11
                          w-11
                          -translate-y-1/2
                          items-center
                          justify-center

                          rounded-full
                          border
                          font-mono
                          text-sm

                          backdrop-blur-md
                          transition-colors

                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-accent-blue

                          sm:right-3

                          ${
                            isLight
                              ? `
                                border-slate-200
                                bg-white/90
                                text-slate-800

                                hover:bg-accent-blue
                                hover:text-white
                              `
                              : `
                                border-white/10
                                bg-black/60
                                text-white

                                hover:bg-accent-blue
                              `
                          }
                        `}
                    >
                      <span aria-hidden="true">❯</span>
                    </button>
                  </>
                )}
              </div>

              {/* =========================================
                  MEDIA LABEL & INDICATORS
              ========================================== */}

              {hasMedia && (
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    px-1
                  "
                >
                  <span
                    className={`
                      font-mono
                      text-xs
                      font-medium
                      uppercase
                      tracking-wider

                      ${isLight ? "text-slate-600" : "text-slate-400"}
                    `}
                  >
                    {mediaIndex === 0 && currentProject.coverImage
                      ? t.coverImageLabel
                      : `${t.screenshotLabel} ${
                          currentProject.coverImage
                            ? mediaIndex
                            : mediaIndex + 1
                        }`}
                  </span>

                  {mediaList.length > 1 && (
                    <div
                      role="group"
                      aria-label="Project media navigation"
                      className="
                        flex
                        items-center
                        gap-0.5
                      "
                    >
                      {mediaList.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleMediaJump(index)}
                          aria-label={`Go to project image ${index + 1}`}
                          aria-current={
                            mediaIndex === index ? "true" : undefined
                          }
                          className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-lg

                              focus-visible:outline-none
                              focus-visible:ring-2
                              focus-visible:ring-accent-blue
                            "
                        >
                          <span
                            aria-hidden="true"
                            className={`
                                h-1.5
                                rounded-full
                                transition-all

                                ${
                                  mediaIndex === index
                                    ? "w-5 bg-accent-blue"
                                    : isLight
                                      ? "w-1.5 bg-slate-300"
                                      : "w-1.5 bg-slate-600"
                                }
                              `}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* =============================================
                DESCRIPTION
            ============================================== */}

            <p
              className={`
                text-sm
                leading-7

                md:text-base
                md:leading-7

                ${isLight ? "text-slate-700" : "text-slate-300"}
              `}
            >
              {currentProject.longDescription}
            </p>

            {/* =============================================
                KEY FEATURES
            ============================================== */}

            {currentProject.keyFeatures &&
              currentProject.keyFeatures.length > 0 && (
                <section
                  aria-labelledby={`${currentProject.id}-features`}
                  className="space-y-2"
                >
                  <h4
                    id={`${currentProject.id}-features`}
                    className={`
                      font-mono
                      text-xs
                      font-semibold
                      uppercase
                      tracking-wider

                      ${isLight ? "text-slate-600" : "text-slate-400"}
                    `}
                  >
                    {t.keyFeaturesLabel}
                  </h4>

                  <ul
                    className={`
                      list-disc
                      space-y-1.5
                      pl-5
                      text-sm
                      leading-6

                      ${isLight ? "text-slate-700" : "text-slate-300"}
                    `}
                  >
                    {currentProject.keyFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>
              )}

            {/* =============================================
                TECH STACK
            ============================================== */}

            <section
              aria-labelledby={`${currentProject.id}-tech-stack`}
              className="space-y-2"
            >
              <h4
                id={`${currentProject.id}-tech-stack`}
                className={`
                  font-mono
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider

                  ${isLight ? "text-slate-600" : "text-slate-400"}
                `}
              >
                {t.techStackLabel}
              </h4>

              <ul
                aria-label={`${currentProject.title} technology stack`}
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {currentProject.techStack.map((tech) => (
                  <li key={tech}>
                    <span
                      className={`
                          inline-flex
                          rounded-xl
                          border
                          px-3
                          py-1.5
                          font-mono
                          text-xs
                          font-medium
                          transition-colors

                          ${
                            isLight
                              ? `
                                border-slate-200
                                bg-slate-50
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
            </section>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* =================================================
          MODAL FOOTER
      ================================================== */}

      <footer
        className={`
          flex
          shrink-0
          flex-col
          gap-3
          border-t
          px-4
          py-3

          sm:px-6
          sm:py-4

          md:flex-row
          md:items-center
          md:justify-between

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
        {/* ===============================================
            PROJECT PREVIOUS / NEXT
        ================================================ */}

        <div
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-2
          "
        >
          <div
            className="
              grid
              min-w-0
              flex-1
              grid-cols-2
              gap-2
            "
          >
            {/* Previous Project */}
            <button
              type="button"
              onClick={handlePrevProject}
              disabled={isFirstProject}
              aria-label={
                prevProject
                  ? `Previous project: ${prevProject.title}`
                  : "No previous project"
              }
              className={`
                flex
                min-h-12
                min-w-0
                items-center
                gap-2
                rounded-xl
                border
                px-3
                py-2
                text-left
                transition-colors

                disabled:cursor-not-allowed
                disabled:opacity-40

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent-blue

                ${
                  isLight
                    ? `
                      border-slate-200
                      bg-white
                      text-slate-700

                      enabled:hover:bg-slate-100
                    `
                    : `
                      border-dark-border
                      bg-dark-border/40
                      text-slate-300

                      enabled:hover:text-white
                    `
                }
              `}
            >
              <span
                aria-hidden="true"
                className="
                  shrink-0
                  text-sm
                  font-bold
                  text-accent-blue
                "
              >
                ←
              </span>

              <span className="min-w-0">
                <span
                  className={`
                    block
                    font-mono
                    text-xs
                    font-semibold
                    uppercase

                    ${isLight ? "text-slate-600" : "text-slate-400"}
                  `}
                >
                  {t.prevLabel}
                </span>

                <span
                  className="
                    hidden
                    truncate
                    text-sm
                    font-medium

                    sm:block
                  "
                >
                  {prevProject ? prevProject.title : t.startLabel}
                </span>
              </span>
            </button>

            {/* Next Project */}
            <button
              type="button"
              onClick={handleNextProject}
              disabled={isLastProject}
              aria-label={
                nextProject
                  ? `Next project: ${nextProject.title}`
                  : "No next project"
              }
              className={`
                flex
                min-h-12
                min-w-0
                items-center
                justify-end
                gap-2
                rounded-xl
                border
                px-3
                py-2
                text-right
                transition-colors

                disabled:cursor-not-allowed
                disabled:opacity-40

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-accent-blue

                ${
                  isLight
                    ? `
                      border-slate-200
                      bg-white
                      text-slate-700

                      enabled:hover:bg-slate-100
                    `
                    : `
                      border-dark-border
                      bg-dark-border/40
                      text-slate-300

                      enabled:hover:text-white
                    `
                }
              `}
            >
              <span className="min-w-0">
                <span
                  className={`
                    block
                    font-mono
                    text-xs
                    font-semibold
                    uppercase

                    ${isLight ? "text-slate-600" : "text-slate-400"}
                  `}
                >
                  {t.nextLabel}
                </span>

                <span
                  className="
                    hidden
                    truncate
                    text-sm
                    font-medium

                    sm:block
                  "
                >
                  {nextProject ? nextProject.title : t.endLabel}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="
                  shrink-0
                  text-sm
                  font-bold
                  text-accent-blue
                "
              >
                →
              </span>
            </button>
          </div>

          {/* =============================================
              PROJECT DOTS
          ============================================== */}

          {totalProjects > 1 && (
            <div
              role="group"
              aria-label="Project navigation"
              className="
                hidden
                items-center
                gap-0.5

                lg:flex
              "
            >
              {t.projectsList.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleProjectJump(index)}
                  aria-label={`Open project ${index + 1}: ${project.title}`}
                  aria-current={currentIndex === index ? "true" : undefined}
                  className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-lg

                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-accent-blue
                    "
                >
                  <span
                    aria-hidden="true"
                    className={`
                        h-2
                        rounded-full
                        transition-all

                        ${
                          currentIndex === index
                            ? "w-6 bg-accent-blue"
                            : isLight
                              ? "w-2 bg-slate-300"
                              : "w-2 bg-slate-600"
                        }
                      `}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ===============================================
            REPOSITORY
        ================================================ */}

        {currentProject.githubUrl && (
          <button
            type="button"
            onClick={() => requestExternalUrl(currentProject.githubUrl!)}
            aria-label={`Open GitHub repository for ${currentProject.title}`}
            className="
              min-h-11
              w-full
              shrink-0
              rounded-xl
              border
              border-accent-blue/30
              bg-accent-blue/10
              px-4
              py-2.5
              text-center
              font-mono
              text-xs
              font-semibold
              text-accent-blue
              transition-colors

              hover:border-accent-blue/50
              hover:bg-accent-blue/20

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent-blue
              focus-visible:ring-offset-2

              md:w-auto
            "
          >
            {t.repoButton}
          </button>
        )}
      </footer>
    </ModalContainer>
  );
};
