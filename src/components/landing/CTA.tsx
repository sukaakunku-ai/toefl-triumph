import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Coins, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[40px] bg-[#60a5fa] p-12 md:p-16 text-center border-4 border-white shadow-2xl"
        >
          {/* Decorative icons and patterns */}
          <div className="absolute top-10 left-10 opacity-30 animate-pulse">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-30 animate-pulse">
            <Rocket className="w-8 h-8 text-white" />
          </div>

          {/* Lock Icon */}
          <div className="absolute left-10 md:left-24 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-[#22c55e] border-4 border-black/10 rounded-3xl shadow-lg flex items-center justify-center -rotate-12">
                <Lock className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#22c55e] shadow-md">
                <Sparkles className="w-6 h-6 text-[#22c55e]" />
              </div>
            </div>
          </div>

          {/* Coins Icons */}
          <div className="absolute right-10 md:right-24 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 items-center">
            <div className="w-20 h-20 bg-[#fbbf24] border-4 border-black/10 rounded-full shadow-lg flex items-center justify-center rotate-12">
              <Coins className="w-10 h-10 text-black/40" />
            </div>
            <div className="w-12 h-12 bg-[#fbbf24] border-4 border-black/10 rounded-full shadow-md flex items-center justify-center translate-x-12">
              <div className="w-6 h-1 bg-black/10 rounded-full" />
            </div>
            <div className="w-16 h-16 bg-[#fbbf24] border-4 border-black/10 rounded-full shadow-lg flex items-center justify-center -translate-x-10">
              <div className="text-xl font-black text-black/20 italic">TOEFL</div>
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-md">
              {t("cta.title")}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-bold mb-8">
              Mulai berlatih hari ini dengan simulasi realistis dan umpan balik mendalam.
            </p>
            <Link to="/dashboard">
              <Button
                size="xl"
                className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-black text-xl px-10 py-8 rounded-2xl shadow-[0_8px_0_0_#d97706] hover:shadow-[0_4px_0_0_#d97706] active:shadow-none translate-y-[-4px] active:translate-y-[4px] transition-all gap-4 uppercase tracking-tighter"
              >
                Mulai Latihan Gratis Sekarang
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
