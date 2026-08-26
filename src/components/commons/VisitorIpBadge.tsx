/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { useSystem } from "../../context/SystemContext";

export const VisitorIpBadge: React.FC = () => {
  const { theme } = useSystem();
  const isLight = theme === "light";

  const [ipAddress, setIpAddress] = useState<string>("Connecting...");
  const [visitorName, setVisitorName] = useState<string>("Guest");
  const [ping, setPing] = useState<number>(0);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Ambil Nama dari LocalStorage jika sudah pernah diatur sebelumnya
    const savedName = localStorage.getItem("sys_visitor_name");
    if (savedName) {
      setVisitorName(savedName);
    }

    // 2. Simulasi / Hitung Latency (Ping) sederhana
    const startTime = performance.now();

    // 3. Fetch IP Pengunjung
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => {
        setIpAddress(data.ip || "127.0.0.1");
        const endTime = performance.now();
        setPing(Math.round(endTime - startTime));
        setIsLoading(false);
      })
      .catch(() => {
        setIpAddress("(Local)");
        setPing(12);
        setIsLoading(false);
      });
  }, []);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setVisitorName(tempName.trim());
      localStorage.setItem("sys_visitor_name", tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <div
      className={`px-3 py-1.5 rounded-2xl border flex items-center gap-3 transition-all backdrop-blur-md font-mono text-xs ${
        isLight
          ? "bg-slate-100/80 border-slate-200/80 text-slate-700 shadow-xs"
          : "bg-navy-base/60 border-dark-border/80 text-slate-300 shadow-lg shadow-black/20"
      }`}
    >
      {/* Indikator Status Koneksi Berkelip */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-semibold text-accent-blue uppercase tracking-wider hidden sm:inline">
          SYS_NET:
        </span>
      </div>

      {/* Identitas Pengunjung (Bisa diklik untuk diubah) */}
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-slate-400">user:</span>
        {isEditingName ? (
          <form onSubmit={handleSaveName} className="flex items-center gap-1">
            <input
              type="text"
              value={tempName}
              placeholder={visitorName}
              autoFocus
              onChange={(e) => setTempName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              className={`px-1.5 py-0.5 rounded text-xs outline-none w-24 font-mono ${
                isLight ? "bg-white border border-slate-300 text-slate-900" : "bg-dark-border text-white"
              }`}
            />
          </form>
        ) : (
          <button
            onClick={() => {
              setTempName(visitorName);
              setIsEditingName(true);
            }}
            className="font-bold text-accent-blue hover:underline cursor-pointer"
            title="Klik untuk mengubah nama panggilan"
          >
            @{visitorName}
          </button>
        )}
      </div>

      <span className={`w-px h-3 ${isLight ? "bg-slate-300" : "bg-dark-border"}`} />

      {/* IP Address */}
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-slate-400">Your IP:</span>
        <span className={`font-semibold ${isLoading ? "text-slate-400 animate-pulse" : ""}`}>
          {ipAddress}
        </span>
      </div>

      <span className={`w-px h-3 hidden md:block ${isLight ? "bg-slate-300" : "bg-dark-border"}`} />

      {/* System Metrics (Ping) */}
      <div className="hidden md:flex items-center gap-1">
        <span className="text-[10px] text-slate-400">ping:</span>
        <span className="text-emerald-500 font-semibold">{ping ? `${ping}ms` : "Sync..."}</span>
      </div>
    </div>
  );
};