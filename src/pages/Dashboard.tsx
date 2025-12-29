import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Headphones, 
  PenTool, 
  Clock, 
  ArrowRight,
  Layers,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { testConfigs } from "@/data/questions";

const testTypes = [
  {
    id: "full",
    icon: Layers,
    title: "Full TOEFL Simulation",
    description: "Complete test with all sections - Structure, Reading, and Listening.",
    duration: 55,
    questions: 30,
    color: "primary",
  },
  {
    id: "structure",
    icon: PenTool,
    title: "Structure & Written Expression",
    description: "Focus on grammar, sentence structure, and written expression skills.",
    duration: 25,
    questions: 10,
    color: "success",
  },
  {
    id: "reading",
    icon: BookOpen,
    title: "Reading Comprehension",
    description: "Practice reading passages and answer comprehension questions.",
    duration: 35,
    questions: 10,
    color: "warning",
  },
  {
    id: "listening",
    icon: Headphones,
    title: "Listening Comprehension",
    description: "Improve your listening skills with audio-based questions.",
    duration: 30,
    questions: 10,
    color: "accent",
  },
];

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newValue;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">TOEFLPrep</span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Practice
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a test type to begin your TOEFL preparation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testTypes.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/quiz/${test.id}`}>
                  <Card 
                    variant="interactive" 
                    className="h-full group"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl bg-${test.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <test.icon className={`w-6 h-6 text-${test.color === "primary" ? "primary" : test.color}`} />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <CardTitle className="text-xl mt-4">{test.title}</CardTitle>
                      <CardDescription>{test.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{test.duration} minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{test.questions} questions</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 rounded-2xl bg-accent/50 border border-border text-center"
          >
            <p className="text-muted-foreground mb-4">
              💡 <strong>Tip:</strong> Start with a full simulation to assess your current level, 
              then focus on specific sections where you need improvement.
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
