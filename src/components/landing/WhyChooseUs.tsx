import { motion } from "framer-motion";
import {
  Zap,
  BookOpen,
  BarChart3,
  Clock,
  Shield,
  Smartphone
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t("whyChooseUs.feature1.title"),
      description: t("whyChooseUs.feature1.desc"),
    },
    {
      icon: BookOpen,
      title: t("whyChooseUs.feature2.title"),
      description: t("whyChooseUs.feature2.desc"),
    },

    {
      icon: Clock,
      title: t("whyChooseUs.feature4.title"),
      description: t("whyChooseUs.feature4.desc"),
    },
    {
      icon: Shield,
      title: t("whyChooseUs.feature5.title"),
      description: t("whyChooseUs.feature5.desc"),
    },
    {
      icon: Smartphone,
      title: t("whyChooseUs.feature6.title"),
      description: t("whyChooseUs.feature6.desc"),
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("whyChooseUs.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("whyChooseUs.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
