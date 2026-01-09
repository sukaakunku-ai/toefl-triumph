import { motion } from "framer-motion";
import { Trophy, UserPlus, PlayCircle, BarChart3, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: UserPlus,
      title: t("howItWorks.step1.title"),
      desc: t("howItWorks.step1.desc"),
      number: "01",
      color: "text-red-600 bg-red-50",
    },
    {
      icon: PlayCircle,
      title: t("howItWorks.step2.title"),
      desc: t("howItWorks.step2.desc"),
      number: "02",
      color: "text-red-600 bg-red-50",
    },
    {
      icon: BarChart3,
      title: t("howItWorks.step3.title"),
      desc: t("howItWorks.step3.desc"),
      number: "03",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: Trophy,
      title: t("howItWorks.step4.title"),
      desc: t("howItWorks.step4.desc"),
      number: "04",
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-bold">
            {t("howItWorks.subtitle")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Card */}
              <div className="bg-white rounded-3xl p-8 pt-10 border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] h-full flex flex-col items-start transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                {/* Step Number Badge */}
                <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 ${step.color}`}>
                  STEP {step.number}
                </div>

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]`}>
                  <step.icon className="w-7 h-7 text-slate-900" />
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-bold text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link to="/dashboard">
            <Button size="xl" className="rounded-2xl px-10 py-8 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 transition-all hover:scale-105 active:scale-95 group">
              GET STARTED NOW!
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
