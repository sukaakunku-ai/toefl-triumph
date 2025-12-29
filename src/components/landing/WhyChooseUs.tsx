import { motion } from "framer-motion";
import { 
  Zap, 
  BookOpen, 
  BarChart3, 
  Clock, 
  Shield, 
  Smartphone 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Realistic Simulations",
    description: "Practice with questions that mirror the actual TOEFL exam format and difficulty.",
  },
  {
    icon: BookOpen,
    title: "Detailed Explanations",
    description: "Understand every answer with comprehensive explanations for all questions.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed analytics and performance insights.",
  },
  {
    icon: Clock,
    title: "Timed Practice",
    description: "Build test-taking stamina with realistic time constraints for each section.",
  },
  {
    icon: Shield,
    title: "Proven Methods",
    description: "Learn strategies developed by TOEFL experts and high scorers.",
  },
  {
    icon: Smartphone,
    title: "Practice Anywhere",
    description: "Access your practice tests on any device, anytime, anywhere.",
  },
];

export function WhyChooseUs() {
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
            Why Choose TOEFLPrep?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to achieve your target TOEFL score
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
