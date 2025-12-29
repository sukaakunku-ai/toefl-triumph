import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const features = [
    "Realistic TOEFL simulations",
    "Detailed answer explanations",
    "Progress tracking & analytics",
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
                Free practice available
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Master the{" "}
              <span className="text-gradient">TOEFL</span>
              <br />
              with Confidence
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Practice with realistic simulations, get instant feedback, and track your progress. 
              Join thousands of students achieving their target scores.
            </p>

            <ul className="space-y-3">
              {features.map((feature, index) => (
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
                  Start Free Practice
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
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
                <p className="font-semibold text-foreground">10,000+ Students</p>
                <p className="text-sm text-muted-foreground">Achieved their goals</p>
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
                    <span className="text-sm font-medium text-muted-foreground">Question 15 of 50</span>
                    <span className="px-3 py-1 rounded-full bg-warning/20 text-warning text-xs font-medium">
                      25:30 remaining
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
                        className={`p-3 rounded-lg border transition-all ${
                          i === 0
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
                ✓ 85% Accuracy
              </div>
              <div className="absolute bottom-0 left-0 px-4 py-2 bg-card border border-border rounded-xl shadow-lg text-sm font-medium text-foreground">
                🎯 Structure Section
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
