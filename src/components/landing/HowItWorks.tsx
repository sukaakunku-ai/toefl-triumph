import { motion } from "framer-motion";
import { UserPlus, Target, Trophy } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Choose Your Practice",
    description: "Select from full simulation or focus on specific sections like Reading, Listening, or Structure.",
  },
  {
    icon: Target,
    title: "Take the Test",
    description: "Answer questions under timed conditions with the ability to flag and review questions.",
  },
  {
    icon: Trophy,
    title: "Review & Improve",
    description: "Get detailed explanations for every answer and track your progress over time.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start improving your TOEFL score in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-border" />
              )}

              <div className="relative bg-card rounded-2xl p-8 border border-border shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
