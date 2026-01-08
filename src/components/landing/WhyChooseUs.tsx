import { motion } from "framer-motion";
import { Gamepad2, UserCheck, Dumbbell, Medal, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Gamepad2,
      title: "Simulasi Mirip Game",
      description: t("whyChooseUs.feature1.desc"),
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-500/10",
    },
    {
      icon: UserCheck,
      title: "Guru Digital",
      description: "Penjelasan Ahli yang mudah dipahami.",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-500/10",
    },
    {
      icon: Dumbbell,
      title: "Bangun Stamina",
      description: "Latihan Bertahap dari dasar ke advanced.",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-600/10",
    },
    {
      icon: Medal,
      title: "Poin Tinggi",
      description: "Metode Terbukti oleh ribuan siswa.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-500/10",
    },
    {
      icon: Clock,
      title: "Akses Tak Terbatas",
      description: "Akses 24/7 di mana saja, kapan saja.",
      color: "text-sky-500",
      bgColor: "bg-sky-100 dark:bg-sky-500/10",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
            <Sparkles className="w-3 h-3" />
            Fitur Unggulan
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 uppercase tracking-tighter">
            {t("whyChooseUs.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            {t("whyChooseUs.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-8 rounded-3xl border-2 border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-full"
            >
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-black text-foreground mb-3 leading-tight uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm font-semibold leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative circle in card background */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500 -z-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
