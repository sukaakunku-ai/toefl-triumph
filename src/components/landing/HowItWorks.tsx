import { motion } from "framer-motion";
import { Trophy, Users, Layout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Users,
      title: t("howItWorks.step1.title"),
      desc: t("howItWorks.step1.desc"),
      number: 1,
    },
    {
      icon: Layout,
      title: t("howItWorks.step2.title"),
      desc: t("howItWorks.step2.desc"),
      number: 2,
    },
    {
      icon: Trophy,
      title: t("howItWorks.step3.title"),
      desc: t("howItWorks.step3.desc"),
      number: 3,
    },
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step Number Badge */}
              <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/30 z-10 border-4 border-white">
                {step.number}
              </div>

              {/* Card */}
              <div className="bg-white rounded-[32px] p-10 pt-14 text-center border border-slate-100 shadow-xl shadow-slate-200/50 h-full flex flex-col items-center group hover:border-primary/20 transition-all duration-300">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

