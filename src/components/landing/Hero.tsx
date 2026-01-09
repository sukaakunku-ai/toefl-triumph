import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const stats = [
    { label: "TOEFL", value: "500+", color: "bg-white text-slate-900 border-slate-200" },
    { label: "STUDENTS", value: "10K+", color: "bg-white text-slate-900 border-slate-200" },
    { label: "SUCCESS", value: "96%", color: "bg-white text-slate-900 border-slate-200" },
    { label: "FOREVER", value: "FREE", color: "bg-primary text-white border-primary" },
  ];

  const trustBadges = [
    "Expert Coach",
    "Proven Methods",
    "Best TOEFL Platform",
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-16 overflow-hidden bg-white">
      {/* Background Blurs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-[0%] left-[-5%] w-[300px] h-[300px] bg-orange-400/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-[10px] font-bold text-orange-600 uppercase tracking-[0.2em]">
            <Zap className="w-3 h-3 fill-orange-600" />
            {t("hero.freePractice")}
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight">
            RAIH SKOR TOEFL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
              IMPIAN KAMU!
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-3xl leading-relaxed mt-4">
            {t("hero.subtitle")}
          </p>

          {/* Buttons */}
          <div className="flex justify-center mt-10">
            <Link to="/dashboard">
              <Button size="xl" className="relative overflow-hidden rounded-[2rem] px-12 py-10 text-2xl font-black bg-orange-600 hover:bg-orange-500 text-white shadow-[0_12px_24px_-8px_rgba(249,115,22,0.5)] border-b-8 border-orange-800 transition-all hover:translate-y-1 hover:border-b-4 hover:shadow-lg active:translate-y-2 active:border-b-0 group">
                <span className="relative z-10 flex items-center gap-3">
                  {t("hero.cta")}
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </span>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-white/20 to-orange-400/0 -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-3xl">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-6 rounded-[2rem] border-4 flex flex-col items-center justify-center shadow-lg ${stat.color} transition-transform hover:scale-105`}
              >
                <div className="text-3xl font-black">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest opacity-80 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-sm font-bold text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
