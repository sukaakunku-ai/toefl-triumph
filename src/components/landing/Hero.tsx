import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  const features = [
    t("whyChooseUs.feature3.desc"), // Realistic TOEFL simulations
    t("whyChooseUs.feature2.desc"), // Detailed answer explanations
    "Progress tracking & analytics", // This one doesn't have a direct key yet, let's use the one we added if I added it or a direct translation
  ];

  // Let's refine the features based on what's available or add keys
  const translatedFeatures = [
    t("whyChooseUs.feature3.title"),
    t("whyChooseUs.feature2.title"),
    t("whyChooseUs.feature1.title"),
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-accent-foreground">
                {t("hero.freePractice")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t("hero.title").split(" ")[0]}{" "}
              <span className="text-gradient">TOEFL</span>
              <br />
              {t("hero.title").split(" ").slice(1).join(" ")}
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              {t("hero.subtitle")}
            </p>

            <ul className="space-y-3">
              {translatedFeatures.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  {t("hero.cta")}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-hero border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("hero.students")}</p>
                <p className="text-sm text-muted-foreground">{t("hero.goals")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main card */}
              <div className="absolute inset-8 bg-card rounded-2xl shadow-xl border border-border p-6 animate-float">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{t("hero.questionCount")}</span>
                    <span className="px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-medium">
                      {t("hero.timeRemaining")}
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full w-[30%] bg-gradient-hero rounded-full" />
                  </div>
                  <p className="text-foreground font-medium mt-6">
                    The committee _____ their decision tomorrow.
                  </p>
                  <div className="space-y-2 mt-4">
                    {["will announce", "announcing", "announced", "has announcing"].map((opt, i) => (
                      <div
                        key={opt}
                        className={`p-3 rounded-lg border transition-all ${i === 0
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-foreground hover:border-primary/50"
                          }`}
                      >
                        <span className="text-sm font-medium">{String.fromCharCode(65 + i)}. {opt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-0 right-0 px-4 py-2 bg-success text-success-foreground rounded-xl shadow-lg text-sm font-medium">
                ✓ {t("hero.accuracy")}
              </div>
              <div className="absolute bottom-0 left-0 px-4 py-2 bg-card border border-border rounded-xl shadow-lg text-sm font-medium text-foreground">
                🎯 {t("hero.structureSection")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
