import { motion } from "framer-motion";
import { Zap, Book, Headphones, PenTool, BarChart3, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Book,
      title: t("whyChooseUs.feature1.title"),
      description: t("whyChooseUs.feature1.desc"),
      color: "bg-red-50",
      iconColor: "text-red-600",
      emoji: "📚",
    },
    {
      icon: Headphones,
      title: t("whyChooseUs.feature2.title"),
      description: t("whyChooseUs.feature2.desc"),
      color: "bg-pink-50",
      iconColor: "text-pink-600",
      emoji: "🎧",
    },
    {
      icon: PenTool,
      title: t("whyChooseUs.feature3.title"),
      description: t("whyChooseUs.feature3.desc"),
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      emoji: "✍️",
    },
    {
      icon: BarChart3,
      title: t("whyChooseUs.feature4.title"),
      description: t("whyChooseUs.feature4.desc"),
      color: "bg-indigo-50",
      iconColor: "text-indigo-600",
      emoji: "📊",
    },
    {
      icon: Clock,
      title: t("whyChooseUs.feature5.title"),
      description: t("whyChooseUs.feature5.desc"),
      color: "bg-orange-50",
      iconColor: "text-orange-600",
      emoji: "⏱️",
    },
    {
      icon: Zap,
      title: t("whyChooseUs.feature6.title"),
      description: t("whyChooseUs.feature6.desc"),
      color: "bg-amber-50",
      iconColor: "text-amber-600",
      emoji: "🔥",
    },
  ];

  return (
    <section className="py-24 bg-[#fffaf0] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
            ALL-IN-ONE PREP PACKAGE
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">
            {t("whyChooseUs.title")}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-tight">
            {t("whyChooseUs.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-8 rounded-3xl border-2 border-slate-900 bg-white shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex flex-col items-start"
            >
              <div className="flex items-center justify-between w-full mb-6">
                <div className={`w-14 h-14 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center justify-center ${feature.color}`}>
                  <feature.icon className={`w-7 h-7 text-slate-900`} />
                </div>
                <span className="text-2xl">{feature.emoji}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tighter uppercase">
                {feature.title}
              </h3>
              <p className="text-slate-500 font-bold text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
