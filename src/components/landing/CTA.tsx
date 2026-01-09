import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-500 to-blue-600 p-12 md:p-20 text-center shadow-2xl shadow-blue-200"
        >
          {/* Subtle Decorative Circles */}
          <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-black/10 rounded-full blur-3xl" />

          <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              {t("cta.title")}
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed">
              {t("cta.subtitle")}
            </p>
            <div className="pt-4 flex justify-center">
              <Link to="/dashboard">
                <Button
                  size="xl"
                  className="bg-white hover:bg-slate-50 text-primary font-bold text-lg px-10 py-7 rounded-full transition-all gap-3 shadow-xl shadow-black/10 group"
                >
                  {t("cta.button")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

