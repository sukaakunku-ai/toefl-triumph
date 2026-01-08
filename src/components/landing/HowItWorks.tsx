import { motion } from "framer-motion";
import { Trophy, Gamepad2, TrendingUp, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Trophy,
      title: "1. Tantang Diri",
      subtitle: "Pilih Latihan",
      progress: 30,
      reward: "30%",
      color: "blue",
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
      borderColor: "border-blue-200 dark:border-blue-500/30",
      accentColor: "bg-blue-500",
    },
    {
      icon: Gamepad2,
      title: "2. Taklukkan Tes",
      subtitle: "Kerjakan Tes",
      progress: 20,
      reward: "20%",
      color: "green",
      bgColor: "bg-green-50 dark:bg-green-500/10",
      borderColor: "border-green-200 dark:border-green-500/30",
      accentColor: "bg-green-500",
    },
    {
      icon: TrendingUp,
      title: "3. Tingkatkan Level",
      subtitle: "Analisis & Kenaikan Skor",
      progress: 11,
      reward: "11%",
      color: "orange",
      bgColor: "bg-orange-50 dark:bg-orange-500/10",
      borderColor: "border-orange-200 dark:border-orange-500/30",
      accentColor: "bg-orange-500",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 uppercase tracking-tight">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative rounded-[32px] p-8 border-4 ${step.borderColor} ${step.bgColor} shadow-xl hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-foreground mb-1 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {step.subtitle}
                  </p>
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-12 transition-transform`}>
                  <step.icon className={`w-8 h-8 ${step.color === 'blue' ? 'text-blue-500' : step.color === 'green' ? 'text-green-500' : 'text-orange-500'}`} />
                </div>
              </div>

              <div className="space-y-4 pt-12">
                <div className="h-4 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden p-1 border border-white/20">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${step.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full rounded-full ${step.accentColor} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Reward bonus:</span>
                    <span className="text-xs font-black text-foreground">{step.reward}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#fbbf24] flex items-center justify-center shadow-md border-2 border-[#d97706] -mr-2">
                    <Award className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
