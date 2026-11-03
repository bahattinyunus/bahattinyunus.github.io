import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles, Copy, Check } from "lucide-react";
import { IDENTITY } from "@/lib/portfolioContent";
import { ALL_CERTIFICATES } from "@/lib/certificatesData";

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: "tr" | "en";
}

interface CommandOutput {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  lang = "tr",
}) => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1.5 text-xs font-mono text-neutral-300">
          <div className="text-emerald-400 font-bold">
            ⚡ Bahattin Yunus Çetin — Autonomous Systems & AI Lab [v2.5.0-LTS]
          </div>
          <div className="text-neutral-400">
            {lang === "tr"
              ? "Hoş geldiniz! Terminal üzerinden profilimi ve mühendislik matrisini keşfedebilirsiniz."
              : "Welcome! Explore my engineering profile and system matrix via this terminal."}
          </div>
          <div className="text-neutral-500">
            {lang === "tr"
              ? "Kullanılabilir komutları listelemek için 'help' yazın."
              : "Type 'help' to inspect available system commands."}
          </div>
        </div>
      ),
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  const availableCommands = [
    "help",
    "whoami",
    "skills",
    "projects",
    "certs",
    "stats",
    "contact",
    "neofetch",
    "cv",
    "clear",
    "exit",
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(IDENTITY.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, cmdText]);
    setHistoryIndex(-1);

    const timeStr = new Date().toLocaleTimeString();

    if (trimmed === "clear") {
      setOutputs([]);
      setInputVal("");
      return;
    }

    if (trimmed === "exit") {
      onClose();
      return;
    }

    let resultNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
      case "commands":
      case "?":
        resultNode = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-cyan-400 font-semibold mb-1">
              {lang === "tr" ? "KULLANILABİLİR KOMUTLAR:" : "AVAILABLE COMMANDS:"}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-emerald-400 font-bold">whoami</span> — {lang === "tr" ? "Mühendislik kimliği & odak" : "Engineering identity & summary"}</div>
              <div><span className="text-emerald-400 font-bold">skills</span> — {lang === "tr" ? "Teknik yetkinlikler & yığın" : "Tech stack & tools"}</div>
              <div><span className="text-emerald-400 font-bold">projects</span> — {lang === "tr" ? "Öne çıkan Ar-Ge projeleri" : "Flagship R&D projects"}</div>
              <div><span className="text-emerald-400 font-bold">certs</span> — {lang === "tr" ? "270+ Sertifika & kurumlar" : "270+ Certified credentials"}</div>
              <div><span className="text-emerald-400 font-bold">stats</span> — {lang === "tr" ? "GitHub & akademik metrikler" : "GitHub & academic telemetry"}</div>
              <div><span className="text-emerald-400 font-bold">neofetch</span> — {lang === "tr" ? "Sistem neofetch dökümü" : "System neofetch summary"}</div>
              <div><span className="text-emerald-400 font-bold">contact</span> — {lang === "tr" ? "E-posta, LinkedIn ve bağlantılar" : "Contact channels"}</div>
              <div><span className="text-emerald-400 font-bold">cv</span> — {lang === "tr" ? "Özgeçmiş PDF indir" : "Download CV (PDF)"}</div>
              <div><span className="text-emerald-400 font-bold">clear</span> — {lang === "tr" ? "Terminal ekranını temizle" : "Clear console buffer"}</div>
              <div><span className="text-emerald-400 font-bold">exit</span> — {lang === "tr" ? "Terminali kapat" : "Exit console"}</div>
            </div>
          </div>
        );
        break;

      case "whoami":
        resultNode = (
          <div className="text-xs font-mono space-y-2 text-neutral-300">
            <div className="text-emerald-400 font-bold text-sm">Bahattin Yunus Çetin</div>
            <p className="leading-relaxed">
              {lang === "tr"
                ? "Orta Doğu Teknik Üniversitesi (BÖTE / CEIT) ve Hacettepe Üniversitesi'nde akademik öğrenim ve araştırmalarımı sürdürüyorum. Yapay Zekâ model optimizasyonu (%80 budama/quantization), ROS2/PX4 otonom İHA aviyonikleri ve C++/FreeRTOS gömülü sistem mimarileri geliştiriyorum."
                : "Undergraduate researcher at METU and Hacettepe University specializing in Edge AI model compression (up to 80% pruning/quantization), ROS2/PX4 autonomous UAV avionics, and low-latency C++/FreeRTOS embedded systems."}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">ODTÜ (CEIT)</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">Hacettepe Üniv.</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">SHGM İHA-1 Pilot</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">Siber Vatan (SSB)</span>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30">Fransa Heyeti (Top 20)</span>
            </div>
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="text-xs font-mono space-y-2">
            <div className="text-cyan-400 font-bold">{lang === "tr" ? "MÜHENDİSLİK TEKNOLOJİ MATRİSİ:" : "ENGINEERING TECH MATRIX:"}</div>
            <div className="space-y-1.5 text-neutral-300">
              <div><span className="text-emerald-400 font-semibold">[AI & Optimizasyon]:</span> PyTorch, Model Budama (%80 Pruning), Quantization (INT8/FP4), vLLM, QLoRA, TFLite, TensorRT, Scikit-Learn</div>
              <div><span className="text-cyan-400 font-semibold">[Aviyonik & Robotik]:</span> ROS2 (Humble/Iron), PX4 Autopilot, MAVLink, FastDDS, EKF Sensör Füzyonu, Gazebo, Unreal Engine 5</div>
              <div><span className="text-amber-400 font-semibold">[Gömülü & Donanım]:</span> Modern C++20, C, FreeRTOS, RISC-V Çelik MCU SDK, Linux Kernel, GPIO/I2C/SPI, Jetson Orin</div>
              <div><span className="text-rose-400 font-semibold">[Siber & Adli Bilişim]:</span> Siber Vatan (SSB), PRNU Sensör Analizi, ELA Görsel Analizi, C2PA Standartları, Wireshark, Linux Bash</div>
            </div>
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="text-xs font-mono space-y-2 text-neutral-300">
            <div className="text-cyan-400 font-bold">{lang === "tr" ? "ÖNE ÇIKAN AR-GE PROJELERİ:" : "FEATURED R&D PROJECTS:"}</div>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <span className="text-emerald-300 font-semibold">Datathon Attention-LSTM:</span> 100+ öznitelik mühendisliği ve hibrit zaman serisi tahminleme hattı.
              </li>
              <li>
                <span className="text-emerald-300 font-semibold">Aura Hockey AR:</span> MediaPipe 21 el eklemi takibi + Three.js ile donanımsız 60 FPS masa hokeyi.
              </li>
              <li>
                <span className="text-emerald-300 font-semibold">FezaArsivi & TUA Aviyonik:</span> ROS2 & EKF CubeSat spektrogram telemetri kütüphanesi (TÜBİTAK KAMP+).
              </li>
              <li>
                <span className="text-emerald-300 font-semibold">DeepForensics:</span> PRNU sensör parmak izi, ELA analizi ve GAN deepfake doğrulama motoru.
              </li>
              <li>
                <span className="text-emerald-300 font-semibold">BeeRoute Optimizer:</span> Yapay Arı Kolonisi (ABC) algoritmasıyla otonom rota planlama çekirdeği.
              </li>
              <li>
                <span className="text-emerald-300 font-semibold">Çelik MCU RISC-V SDK:</span> Yerli RISC-V çipi için Modern C++20 ve FreeRTOS HAL katmanı.
              </li>
            </ul>
          </div>
        );
        break;

      case "certs":
      case "vault":
        resultNode = (
          <div className="text-xs font-mono space-y-2 text-neutral-300">
            <div className="text-cyan-400 font-bold">{lang === "tr" ? "SERTİFİKA VE AKREDİTASYON KASASI:" : "CERTIFICATE & ACCREDITATION VAULT:"}</div>
            <div className="grid grid-cols-2 gap-2 text-neutral-300">
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                <div className="text-neutral-500 text-[10px]">{lang === "tr" ? "Toplam Akreditasyon" : "Total Credentials"}</div>
                <div className="text-lg font-bold text-emerald-400">{ALL_CERTIFICATES.length}+</div>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800">
                <div className="text-neutral-500 text-[10px]">{lang === "tr" ? "Doğrulanmış Kodlar" : "Verified Credentials"}</div>
                <div className="text-lg font-bold text-cyan-400">%100</div>
              </div>
            </div>
            <div className="text-[11px] text-neutral-400">
              {lang === "tr"
                ? "Kurumlar: BTK Akademi, ODTÜ Bilgeİş, SHGM, T.C. SSB Siber Vatan, TEI TUSAŞ, Turkcell, T3 Vakfı, IBM, TÜBİTAK."
                : "Issuers: BTK Academy, METU Bilgeİş, DGCA, SSB Cyber Homeland, TEI TUSAŞ, Turkcell, T3 Foundation, IBM, TUBITAK."}
            </div>
          </div>
        );
        break;

      case "stats":
        resultNode = (
          <div className="text-xs font-mono space-y-2 text-neutral-300">
            <div className="text-cyan-400 font-bold">{lang === "tr" ? "SİSTEM TELEMETRİSİ & METRİKLER:" : "SYSTEM TELEMETRY & STATS:"}</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-500">Public Repos</div>
                <div className="text-sm font-bold text-emerald-400">231+</div>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-500">GitHub Stars</div>
                <div className="text-sm font-bold text-amber-400">1,500+</div>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-500">Followers</div>
                <div className="text-sm font-bold text-cyan-400">2,063+</div>
              </div>
              <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-[10px] text-neutral-500">Certificates</div>
                <div className="text-sm font-bold text-purple-400">{ALL_CERTIFICATES.length}+</div>
              </div>
            </div>
          </div>
        );
        break;

      case "neofetch":
        resultNode = (
          <div className="font-mono text-[11px] leading-tight text-neutral-300 space-y-1">
            <pre className="text-emerald-400 font-bold overflow-x-auto">
{`
    _   ___ _    _       _   ___ ___ 
   /_\\ / __| |  / /_ _  | | /   / _ \\
  / _ \\ (_ | |_/ / '_ \\ | |/ /\\/ (_) |
 /_/ \\_\\___|___/\\_/ .__/|_/___/ \\___/ 
                  |_|                 
`}
            </pre>
            <div className="text-neutral-400">------------------------------------------</div>
            <div><span className="text-cyan-400 font-bold">OS:</span> Linux Ubuntu 24.04 LTS (x86_64 / aarch64)</div>
            <div><span className="text-cyan-400 font-bold">Host:</span> Jetson Orin Nano & Workstation Matrix</div>
            <div><span className="text-cyan-400 font-bold">Uptime:</span> Continuous Academic & Engineering R&D</div>
            <div><span className="text-cyan-400 font-bold">Shell:</span> bash / zsh / ros2-humble-cli</div>
            <div><span className="text-cyan-400 font-bold">Education:</span> ODTÜ (BÖTE / CEIT) & Hacettepe Üniversitesi</div>
            <div><span className="text-cyan-400 font-bold">Avionics:</span> PX4 Autopilot + SHGM UAV-1 Commercial Pilot</div>
            <div><span className="text-cyan-400 font-bold">AI Matrix:</span> PyTorch, TensorRT, vLLM, 80% Model Pruning</div>
            <div><span className="text-cyan-400 font-bold">Memory:</span> 270+ Certificates / 231+ Public Repositories</div>
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="text-xs font-mono space-y-2 text-neutral-300">
            <div className="text-cyan-400 font-bold">{lang === "tr" ? "İLETİŞİM KANALLARI:" : "CONTACT CHANNELS:"}</div>
            <div className="space-y-1">
              <div><span className="text-neutral-400">E-posta:</span> <a href={`mailto:${IDENTITY.email}`} className="text-emerald-400 hover:underline">{IDENTITY.email}</a></div>
              <div><span className="text-neutral-400">LinkedIn:</span> <a href={IDENTITY.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{IDENTITY.linkedin}</a></div>
              <div><span className="text-neutral-400">GitHub:</span> <a href={IDENTITY.github} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">{IDENTITY.github}</a></div>
              <div><span className="text-neutral-400">Konum:</span> <span className="text-neutral-200">{IDENTITY.location}</span></div>
            </div>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? (lang === "tr" ? "Kopyalandı!" : "Copied!") : (lang === "tr" ? "E-postayı Kopyala" : "Copy Email")}
            </button>
          </div>
        );
        break;

      case "cv":
        window.open("/cv3.pdf", "_blank");
        resultNode = (
          <div className="text-xs font-mono text-emerald-400">
            {lang === "tr" ? "✓ cv3.pdf yeni sekmede açıldı ve indirme tetiklendi." : "✓ cv3.pdf opened in new tab."}
          </div>
        );
        break;

      default:
        resultNode = (
          <div className="text-xs font-mono text-rose-400">
            {lang === "tr"
              ? `Komut bulunamadı: '${trimmed}'. Komut listesi için 'help' yazın.`
              : `Command not found: '${trimmed}'. Type 'help' for available commands.`}
          </div>
        );
        break;
    }

    setOutputs((prev) => [
      ...prev,
      {
        command: cmdText,
        output: resultNode,
        timestamp: timeStr,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (current) {
        const match = availableCommands.find((c) => c.startsWith(current));
        if (match) setInputVal(match);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className={`w-full max-w-3xl flex flex-col rounded-2xl border border-neutral-800 bg-[#090a0f] shadow-2xl overflow-hidden ${
            isMaximized ? "h-[92vh] max-w-5xl" : "h-[560px]"
          }`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 text-xs font-mono text-neutral-400 select-none">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer hover:opacity-100" onClick={onClose} />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block cursor-pointer" />
              </div>
              <span className="ml-2 font-semibold text-neutral-300 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                sys:bahattin@autonomous-lab ~ $
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick pills */}
              <div className="hidden sm:flex items-center gap-1">
                {["help", "whoami", "skills", "projects", "certs"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => handleCommand(cmd)}
                    className="px-2 py-0.5 text-[10px] rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700/60 transition"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 text-neutral-400 hover:text-neutral-200 transition"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 text-neutral-400 hover:text-neutral-200 transition"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
            {outputs.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-500 text-[11px]">
                  <span className="text-emerald-400 font-semibold">bahattin@matrix:~$</span>
                  <span className="text-neutral-200 font-medium">{item.command}</span>
                  <span className="ml-auto text-[10px] text-neutral-600">{item.timestamp}</span>
                </div>
                <div className="pl-4 border-l border-neutral-800/80 py-1">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input */}
          <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900/60 border-t border-neutral-800 font-mono text-xs">
            <span className="text-emerald-400 font-bold">bahattin@matrix:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === "tr" ? "Komut girin (örn: 'help', 'whoami', 'skills')..." : "Type a command ('help', 'skills')..."}
              className="flex-1 bg-transparent text-neutral-100 outline-none border-none placeholder-neutral-600 focus:ring-0"
              autoFocus
            />
            <button
              onClick={() => handleCommand(inputVal)}
              disabled={!inputVal.trim()}
              className="p-1 rounded text-neutral-400 hover:text-emerald-400 disabled:opacity-30 transition"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
