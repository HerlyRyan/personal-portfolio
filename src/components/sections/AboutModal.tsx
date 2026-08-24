import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ABOUT_DATA } from "../../data/aboutData";
import { useModalEffect } from "../../hooks/useModalEfffect";
import { useSystem } from "../../context/SystemContext";
import { ModalHeader } from "../commons/ModalHeader";

interface AboutModalProps {
  isOpen: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen }) => {
  const { theme, closeModal } = useSystem();
  useModalEffect(isOpen, () => closeModal("~/sys/home"));
  const isLight = theme === "light";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => closeModal("~/sys/home")}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm font-sans"
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={`border w-full max-w-5xl max-h-[95vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-colors duration-300 ${
            isLight
              ? "bg-white border-slate-200"
              : "bg-[#0d1117] border-dark-border"
          }`}
        >
          {/* Modal Header */}
          <ModalHeader title="About" onClose={() => closeModal("~/sys/home")} />

          {/* Modal Body */}
          <div
            className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: isLight
                ? "#cbd5e1 transparent"
                : "#4b5563 transparent",
            }}
          >
            {/* HERO SECTION (Diperbesar meniru referensi) */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className={`border rounded-3xl relative overflow-hidden transition-all ${
                isLight
                  ? "bg-slate-50 border-slate-200 shadow-sm"
                  : "bg-gradient-to-br from-[#1c2230] to-[#121824] border-dark-border"
              }`}
            >
              <div className="flex flex-col lg:flex-row items-center justify-between min-h-[400px] lg:min-h-[500px] p-8 lg:p-12 gap-10">
                {/* BAGIAN KIRI: Teks & Tipografi Besar */}
                <div className="flex-1 space-y-6 text-center lg:text-left z-10 w-full">
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono shadow-sm bg-black/10 backdrop-blur-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span
                      className={
                        isLight
                          ? "text-slate-800 font-bold tracking-wide"
                          : "text-emerald-400 font-bold tracking-wide"
                      }
                    >
                      {ABOUT_DATA.availability}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2
                      className={`text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-none ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}
                    >
                      <span className="block">{ABOUT_DATA.name}</span>
                    </h2>
                    <div className="w-12 h-1.5 bg-accent-blue mt-4 mb-6 mx-auto lg:mx-0 rounded-full" />
                    <p className="text-sm md:text-base font-mono text-accent-blue uppercase tracking-widest font-bold">
                      {ABOUT_DATA.role} — {ABOUT_DATA.location}
                    </p>
                  </div>

                  <p
                    className={`text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 ${
                      isLight ? "text-slate-600" : "text-slate-300"
                    }`}
                  >
                    {ABOUT_DATA.introduction}
                  </p>
                </div>

                {/* BAGIAN KANAN: Foto Skala Besar */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`w-full lg:w-[45%] h-[350px] md:h-[450px] lg:h-[550px] rounded-3xl border shrink-0 overflow-hidden flex items-center justify-center relative shadow-2xl ${
                    isLight
                      ? "bg-slate-200 border-slate-300"
                      : "bg-[#252c3c] border-slate-700/50"
                  }`}
                >
                  {/* Efek Glow di belakang foto untuk aksen modern */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />

                  {ABOUT_DATA.avatarUrl ? (
                    <img
                      src={ABOUT_DATA.avatarUrl}
                      alt="Profile"
                      className="w-full h-full object-cover z-0"
                      style={{ objectPosition: "center 20%" }} // Memastikan fokus pada wajah/badan atas
                    />
                  ) : (
                    <div className="text-center p-6 space-y-4 z-0">
                      <span className="text-6xl md:text-8xl block opacity-80">
                        👨‍💻
                      </span>
                      <p
                        className={`text-sm font-mono tracking-widest ${isLight ? "text-slate-500" : "text-slate-400"}`}
                      >
                        [LARGE PHOTO SLOT]
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* BAGIAN BAWAH: Grid 2 Kolom (Bio & Prinsip) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* BIOGRAPHY SECTION */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className={`border rounded-3xl p-8 transition-all flex flex-col justify-center ${
                  isLight
                    ? "bg-slate-50 border-slate-200 shadow-sm"
                    : "bg-navy-base/40 border-dark-border"
                }`}
              >
                <h4 className="text-sm font-mono text-accent-blue tracking-widest uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-accent-blue" />
                  Background Story
                </h4>
                <div
                  className={`space-y-4 text-sm md:text-base leading-relaxed ${isLight ? "text-slate-600" : "text-slate-300"}`}
                >
                  {ABOUT_DATA.biography.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              {/* PRINCIPLES SECTION */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4"
              >
                {ABOUT_DATA.principles.map((principle, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className={`border p-6 rounded-2xl flex flex-col justify-center transition-all flex-1 ${
                      isLight
                        ? "bg-slate-50 hover:bg-white border-slate-200 shadow-sm"
                        : "bg-navy-base/50 hover:bg-accent-blue/10 border-dark-border hover:border-accent-blue/40"
                    }`}
                  >
                    <h5
                      className={`text-base font-bold mb-2 ${isLight ? "text-slate-900" : "text-white"}`}
                    >
                      {principle.title}
                    </h5>
                    <p
                      className={`text-sm leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}
                    >
                      {principle.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
