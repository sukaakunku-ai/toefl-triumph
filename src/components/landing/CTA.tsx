import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-orange-600 to-red-600 p-12 md:p-24 text-center shadow-2xl shadow-red-200 dark:shadow-red-900/40"
        >
          {/* Decorative Circles */}
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-black/10 rounded-full blur-3xl" />
          <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-orange-400 opacity-50" />
          <div className="absolute bottom-20 left-20 w-8 h-8 rounded-full bg-red-400 opacity-30" />
          <div className="absolute top-40 right-20 w-6 h-6 rounded-full bg-orange-300 opacity-40" />

          <div className="relative z-10 space-y-8 max-w-4xl mx-auto flex flex-col items-center">
            {/* Top Icon */}
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl mb-4">
              <Zap className="w-8 h-8 text-primary fill-primary" />
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[1.1]">
              {t("cta.title")}
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-bold max-w-2xl leading-relaxed">
              {t("cta.subtitle")}
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              {["100% FREE", "NO CREDIT CARD", "INSTANT ACCESS"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-widest bg-white/10 px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {item}
                </div>
              ))}
            </div>

            <div className="pt-8 flex flex-col items-center gap-4">
              <Link to="/dashboard">
                <Button
                  size="xl"
                  className="bg-white hover:bg-slate-50 text-slate-900 font-black text-lg px-12 py-8 rounded-2xl transition-all gap-3 shadow-xl shadow-black/10 group border-2 border-slate-900"
                >
                  {t("cta.button")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] flex gap-4">
                <span>• Setup in 30 seconds</span>
                <span>• No commitment</span>
                <span>• Start learning immediately</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
