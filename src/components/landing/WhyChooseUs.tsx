import { motion } from "framer-motion";
import { Zap, BookOpen, Clock, CheckCircle2, Layout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: "Simulasi mirip Toefl ETS",
      description: "Format, timer, kesulitan mirip ETS.",
    },
    {
      icon: BookOpen,
      title: "Penjelasan Ahli",
      description: "Pahami konsep, bukan hafal.",
    },
    {
      icon: Clock,
      title: "Latihan Bertahap",
      description: "Dari basic ke advanced, bangun stamina.",
    },
    {
      icon: CheckCircle2,
      title: "Metode Terbukti",
      description: "Naik skor hingga 500 poin dan lebih.",
    },
    {
      icon: Layout,
      title: "Akses 24/7",
      description: "Di mana saja, gratis selamanya!",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t("whyChooseUs.title")}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            {t("whyChooseUs.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-8 rounded-[32px] border border-slate-100 bg-white hover:border-primary/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 h-full flex flex-col items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

