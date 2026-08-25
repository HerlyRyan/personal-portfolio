import React from "react";
import { motion } from "framer-motion";
import { ProfileSidebar } from "../sections/ProfileSidebar";
import { SystemOverview } from "../sections/SystemOverview";
import { ControlDock } from "./ControlDock";
import { ProjectsModal } from "../sections/ProjectsModal";
import { ExperienceModal } from "../sections/ExperienceModal";
import { SkillsModal } from "../sections/SkillsModal";
import { AboutModal } from "../sections/AboutModal";
import { useSystem } from "../../context/SystemContext";

export const SystemCardLayout: React.FC = () => {
  const { lang, toggleLang, theme, toggleTheme, activeModal, loadingPath } =
    useSystem();
  const isLight = theme === "light";

  const isExitAction = loadingPath === "~/sys/home";

  // const handlePreview = () => {
  //   // Logika membuka modal preview CV atau membuka file PDF di tab baru
  //   window.open('https://drive.google.com/file/d/1jD0EO5Xln6LnX5qvCubZW7dWUPr8EYuv/view?usp=sharing', '_blank');
  // };

  // const handleDownload = () => {
  //   // Logika mengunduh dokumen CV
  //   const fileId = '1jD0EO5Xln6LnX5qvCubZW7dWUPr8EYuv';
  //   const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

  //   // Membuat elemen link sementara untuk memicu download
  //   const link = document.createElement('a');
  //   link.href = downloadUrl;
  //   link.setAttribute('download', 'CV_Herly_Riyanto_Hidayat.pdf'); // Nama file saat diunduh
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    // PERUBAHAN DI SINI: Hapus my-auto, gunakan w-full flex flex-col items-center justify-center
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto px-4 w-full flex flex-col items-center justify-center relative"
    >
      {/* Terminal Loading Overlay */}
      {loadingPath && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-fadeIn font-mono">
          <div
            className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 overflow-hidden ${
              isLight
                ? "bg-white border border-slate-200 text-slate-800"
                : "bg-dark-card/95 border border-white/10 text-white"
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full animate-ping ${isExitAction ? "bg-red-500" : "bg-accent-blue"}`}
            />

            <span className="text-xs">
              $ cd{" "}
              <span
                className={`font-bold ${isExitAction ? "text-red-500" : "text-accent-blue"}`}
              >
                {loadingPath}
              </span>
              {isExitAction ? " && exit_process..." : " && ./execute.sh..."}
            </span>
          </div>
        </div>
      )}

      {/* TOGGLE CONTROLS (Bahasa & Tema) */}
      <div className="w-full flex justify-end mb-4 max-w-6xl">
        {/* Control Island / Pill Container */}
        <div
          className={`p-1 rounded-2xl border flex items-center gap-1 transition-all backdrop-blur-md ${
            isLight
              ? "bg-slate-100/80 border-slate-200/80 shadow-xs"
              : "bg-navy-base/60 border-dark-border/80 shadow-lg shadow-black/20"
          }`}
        >
          {/* Tombol Bahasa (Lang Switcher) */}
          <button
            onClick={toggleLang}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              isLight
                ? "text-slate-700 hover:bg-white hover:text-slate-900 shadow-none"
                : "text-slate-300 hover:bg-dark-border/50 hover:text-white"
            }`}
            title="Switch Language"
          >
            <span className="text-[10px] font-semibold text-accent-blue uppercase tracking-wider">
              LANG
            </span>
            <span className="font-bold">{lang}</span>
          </button>

          {/* Pemisah Vertikal Tipis */}
          <div
            className={`w-px h-4 ${isLight ? "bg-slate-300" : "bg-dark-border"}`}
          />

          {/* Tombol Tema (Theme Switcher) */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
              isLight
                ? "text-slate-700 hover:bg-white hover:text-slate-900"
                : "text-slate-300 hover:bg-dark-border/50 hover:text-white"
            }`}
            title="Toggle Theme"
          >
            <span className="text-[10px] font-semibold text-accent-blue uppercase tracking-wider">
              MODE
            </span>
            <span className="flex items-center gap-1.5">
              {theme === "dark" ? (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-white"
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
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5 text-white"
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
                  <span>Light</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Kartu Utama */}
      <motion.div
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-dark-card border border-dark-border rounded-3xl p-5 md:p-10 shadow-2xl flex flex-col justify-between w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <ProfileSidebar />
          <SystemOverview />
        </div>

        <ControlDock />
      </motion.div>

      {/* Modals Controller */}
      {activeModal === "projects" && <ProjectsModal isOpen={true} />}
      <ExperienceModal isOpen={activeModal === "experience"} />
      <SkillsModal isOpen={activeModal === "skills"} />
      <AboutModal isOpen={activeModal === "about"} />
    </motion.div>
  );
};
