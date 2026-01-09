import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Rocket, Trophy, Headphones, Book, PenTool, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const translatedFeatures = [
    { title: "Penjelasan Ahli", desc: "Pahami konsep, bukan hafal." },
    { title: "Simulasi mirip TOEFL ETS", desc: "Format, Umur, kesulitan mirip ETS." },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-[0%] left-[-5%] w-[400px] h-[400px] bg-accent/30 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold text-primary">
                {t("hero.freePractice")}
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-slate-900 tracking-tight">
                Raih <span className="text-primary italic">TOEFL</span> <br />
                Skor TOEFL Impian <br />
                dengan Percaya Diri <br />
                Maksimal!
              </h1>

              <p className="text-lg text-slate-600 max-w-lg leading-relaxed font-medium">
                {t("hero.subtitle")}
              </p>
            </div>

            <ul className="space-y-4">
              {translatedFeatures.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 border border-green-100">
                    <CheckCircle2 className="w-3 h-3 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    <span className="font-bold">{feature.title}:</span> {feature.desc}
                  </p>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col gap-6 pt-2">
              <Link to="/dashboard" className="w-fit">
                <Button size="xl" className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-10 rounded-full shadow-lg shadow-primary/20 transition-all gap-3 group">
                  Mulai Gratis – Raih 600 + Skor Cepat!
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-slate-100"
                    >
                      {i === 1 ? 'A+' : i === 2 ? 'B' : i === 3 ? 'C' : 'S'}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm leading-tight">{t("hero.students")}</p>
                  <p className="text-xs text-slate-500 font-medium">Capai target TOEFL + garisnya sekarang!</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Elements - Quiz Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Mockup Card */}
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 p-8 max-w-[480px] mx-auto relative overflow-hidden">
              {/* Header Status Bar */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Soal 15 dari 50
                </div>
                <div className="px-3 py-1 bg-orange-50 rounded-full border border-orange-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-orange-600">25:30 tersisa</span>
                </div>
                <div className="px-3 py-1 bg-green-50 rounded-full border border-green-100">
                  <span className="text-[10px] font-bold text-green-600">✓ Akurasi 85%</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <p className="font-bold text-slate-800 text-lg leading-relaxed">
                  The committee _____ their decision tomorrow.
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {[
                  { label: "A. will announce", active: true },
                  { label: "B. announcing", active: false },
                  { label: "C. announced", active: false },
                  { label: "D. has announcing", active: false },
                ].map((option, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-sm font-medium transition-all ${option.active
                        ? "bg-blue-50 border-primary text-primary shadow-sm ring-1 ring-primary/20"
                        : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100 hover:border-slate-200"
                      }`}
                  >
                    {option.label}
                  </div>
                ))}
              </div>

              {/* Tag/Category Badge */}
              <div className="mt-8 flex items-center gap-2">
                <div className="p-1.5 bg-red-50 rounded-lg">
                  <Rocket className="w-4 h-4 text-red-500" />
                </div>
                <span className="text-xs font-bold text-slate-500">Bagian Structure</span>
              </div>
            </div>

            {/* Floating Element - User Avatar/Success */}
            <div className="absolute top-10 right-[-10px] bg-white rounded-2xl shadow-xl p-3 border border-slate-50 flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
                JD
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Terakhir Selesai</div>
                <div className="text-xs font-bold text-slate-800">Skor: 620</div>
              </div>
            </div>

            <div className="absolute bottom-10 left-[-20px] bg-white rounded-2xl shadow-xl p-3 border border-slate-50 flex items-center gap-3 animate-float [animation-delay:1s]">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Target Tercapai!</div>
                <div className="text-xs font-bold text-slate-800">Reading +15 poin</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

