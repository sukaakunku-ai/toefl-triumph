import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Rocket, Trophy, Headphones, Book, PenTool, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const translatedFeatures = [
    `${t("whyChooseUs.feature2.title")}: ${t("whyChooseUs.feature2.desc")}`,
    `${t("whyChooseUs.feature1.title")}: ${t("whyChooseUs.feature1.desc")}`,
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-wavy">
      {/* Background ripples */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] ripple -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] ripple -z-10 [animation-delay:2s]" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 border border-primary/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {t("hero.freePractice")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-foreground">
              {t("hero.title").includes("Skor TOEFL") ? (
                <>
                  {t("hero.title").split("Skor TOEFL")[0]}
                  <span className="text-primary drop-shadow-sm block mt-2">Skor TOEFL</span>
                  {t("hero.title").split("Skor TOEFL")[1]}
                </>
              ) : (
                t("hero.title")
              )}
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed font-medium">
              {t("hero.subtitle")}
            </p>

            <ul className="grid gap-3">
              {translatedFeatures.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-1 w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 group-hover:bg-success/20 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-6 items-center pt-2">
              <Link to="/dashboard">
                <Button size="xl" className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-extrabold text-lg px-8 rounded-2xl shadow-[0_8px_0_0_#d97706] hover:shadow-[0_4px_0_0_#d97706] active:shadow-none translate-y-[-4px] active:translate-y-[4px] transition-all gap-3 uppercase tracking-wide">
                  {t("hero.cta").split("–")[0]}
                  <Rocket className="w-6 h-6 animate-bounce" />
                </Button>
              </Link>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-hero border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground shadow-md ring-2 ring-background"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm leading-tight">{t("hero.students")}</p>
                  <p className="text-xs text-muted-foreground font-medium">{t("hero.goals")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Elements */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateY: 10 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:block perspective-1000"
          >
            {/* Daily Challenge Banner */}
            <div className="absolute top-[-20px] right-[20px] z-20 bg-[#fbbf24] px-4 py-2 rounded-xl shadow-lg border-2 border-[#d97706] flex items-center gap-3 animate-float whitespace-nowrap">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-black" />
              </div>
              <span className="text-sm font-black text-black uppercase italic tracking-tighter">
                Tantangan Harian: Selesaikan Latihan Reading Hari Ini! &gt;
              </span>
            </div>

            <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-[40px] p-8 border-4 border-white dark:border-white/10 shadow-2xl space-y-8">
              {/* Gauge Chart */}
              <div className="relative w-full aspect-square max-w-[320px] mx-auto flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-md">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="125.6"
                    strokeLinecap="round"
                    className="opacity-20 translate-y-[-2px] translate-x-[2px]"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#gauge-gradient)"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="140"
                    strokeLinecap="round"
                    className="filter drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                  />
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-4">
                  <span className="text-5xl font-black text-foreground drop-shadow-sm leading-none">TOEFL</span>
                  <span className="text-7xl font-black text-primary -mt-2">100</span>
                  <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mt-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-tighter">Target: 100+</span>
                  </div>
                  <div className="mt-4 px-4 py-1.5 bg-success/20 rounded-lg border border-success/30 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-success fill-success" />
                    <span className="text-xs font-black text-success uppercase">Boost: 186+</span>
                  </div>
                </div>
              </div>

              {/* Progress Track */}
              <div className="grid grid-cols-4 gap-4 p-4 bg-white/60 dark:bg-white/5 rounded-3xl border-2 border-white/40 dark:border-white/10">
                {[
                  { icon: Book, label: "Reading", color: "text-green-500", bg: "bg-green-100 dark:bg-green-500/10" },
                  { icon: Headphones, label: "Listening", color: "text-primary", bg: "bg-blue-100 dark:bg-blue-500/10" },
                  { icon: Brain, label: "Speaking", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-500/10", tag: "Level Up" },
                  { icon: PenTool, label: "Writing", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-500/10", tag: "Level Up" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 relative group">
                    {item.tag && (
                      <span className="absolute top-[-15px] bg-[#fbbf24] text-[8px] font-black px-1.5 py-0.5 rounded-full border border-black/10 text-black uppercase whitespace-nowrap animate-bounce shadow-sm">
                        {item.tag}
                      </span>
                    )}
                    <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Connector dots line */}
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-primary w-4' : 'bg-muted-foreground/30'}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
