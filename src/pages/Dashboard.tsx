import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Headphones,
  PenTool,
  Clock,
  ArrowRight,
  Layers,
  Moon,
  Sun,
  Database,
  Loader2,
  CheckCircle,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { seedQuestions } from "@/services/questionService";
import { getPackagesByCategory, seedPackages } from "@/services/packageService";
import { QuestionPackage } from "@/data/packages";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { toast } from "sonner";

interface TestType {
  id: string;
  icon: typeof Layers;
  titleKey: string;
  descKey: string;
  duration: number;
  questions: number;
  color: string;
}

const testTypes: TestType[] = [
  {
    id: "full",
    icon: Layers,
    titleKey: "dashboard.fullSimulation",
    descKey: "dashboard.fullSimulationDesc",
    duration: 55,
    questions: 30,
    color: "primary",
  },
  {
    id: "structure",
    icon: PenTool,
    titleKey: "dashboard.structure",
    descKey: "dashboard.structureDesc",
    duration: 25,
    questions: 10,
    color: "success",
  },
  {
    id: "reading",
    icon: BookOpen,
    titleKey: "dashboard.reading",
    descKey: "dashboard.readingDesc",
    duration: 35,
    questions: 10,
    color: "warning",
  },
  {
    id: "listening",
    icon: Headphones,
    titleKey: "dashboard.listening",
    descKey: "dashboard.listeningDesc",
    duration: 30,
    questions: 10,
    color: "accent",
  },
];

export default function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeeded, setIsSeeded] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});

  // Package selection state
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState<TestType | null>(null);
  const [packages, setPackages] = useState<QuestionPackage[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const seeded = localStorage.getItem("firebase_seeded");

    if (seeded) setIsSeeded(true);

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    // Fetch real question counts
    const fetchCounts = async () => {
      try {
        const allQuestions = await import("@/services/questionService").then(m => m.getAllQuestions());
        const counts: Record<string, number> = {
          structure: 0,
          reading: 0,
          listening: 0,
          full: 0 // Full simulation uses all
        };

        allQuestions.forEach(q => {
          if (counts[q.category] !== undefined) {
            counts[q.category]++;
          }
        });

        // Full simulation count is total unique questions usable in full sim? 
        // Or specific full sim questions? Usually full sim pulls from all.
        // Let's assume full sim uses packages designated as 'full'.
        // For simplicity, let's just count all for now or specific category.
        // Actually, the testTypes use specific IDs.

        // Let's verify 'full' category exists in questions. Usually it's composed of others.
        // If 'full' is not a category in questions, we might need to count packages. 
        // But for structure/reading/listening it works.

        setCategoryCounts(counts);
      } catch (error) {
        console.error("Failed to fetch counts", error);
      }
    };

    fetchCounts();
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

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      await seedQuestions();
      await seedPackages();
      setIsSeeded(true);
      localStorage.setItem("firebase_seeded", "true");
      toast.success(t("common.success") + "! Database seeded.");
    } catch (error) {
      toast.error(t("common.error") + ". Check Firebase console.");
      console.error(error);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleTestSelect = async (test: TestType) => {
    setSelectedTestType(test);
    setIsLoadingPackages(true);
    setShowPackageDialog(true);

    try {
      const categoryPackages = await getPackagesByCategory(test.id);
      setPackages(categoryPackages);
      if (categoryPackages.length > 0) {
        setSelectedPackageId(categoryPackages[0].id);
      }
    } catch (error) {
      console.error("Error loading packages:", error);
      toast.error(t("common.error"));
    } finally {
      setIsLoadingPackages(false);
    }
  };

  const handleStartQuiz = () => {
    if (selectedPackageId && selectedTestType) {
      navigate(`/quiz/${selectedTestType.id}?package=${selectedPackageId}`);
      setShowPackageDialog(false);
    }
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

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeedDatabase}
              disabled={isSeeding || isSeeded}
              className="gap-2"
            >
              {isSeeding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isSeeded ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <Database className="w-4 h-4" />
              )}
              {isSeeding ? "Seeding..." : isSeeded ? "Seeded" : "Seed DB"}
            </Button>
            <Link to="/admin">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
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
              {t("dashboard.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("dashboard.subtitle")}
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
                <Card
                  variant="interactive"
                  className="h-full group cursor-pointer"
                  onClick={() => handleTestSelect(test)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-12 h-12 rounded-xl bg-${test.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <test.icon
                          className={`w-6 h-6 text-${test.color === "primary" ? "primary" : test.color
                            }`}
                        />
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-xl mt-4">
                      {t(test.titleKey)}
                    </CardTitle>
                    <CardDescription>{t(test.descKey)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {test.duration} {t("dashboard.minutes")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {categoryCounts[test.id] || 0} {t("dashboard.questions")}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 rounded-2xl bg-accent/50 border border-border text-center"
          >
            <p className="text-muted-foreground">{t("dashboard.tip")}</p>
          </motion.div>
        </motion.div>
      </main>

      {/* Package Selection Dialog */}
      <Dialog open={showPackageDialog} onOpenChange={setShowPackageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("dashboard.selectPackage")}</DialogTitle>
            <DialogDescription>
              {selectedTestType && t(selectedTestType.titleKey)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {isLoadingPackages ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : packages.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                {t("admin.noPackages")}
              </p>
            ) : (
              <Select value={selectedPackageId} onValueChange={setSelectedPackageId}>
                <SelectTrigger>
                  <SelectValue placeholder={t("dashboard.selectPackage")} />
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.questionIds.length} {t("dashboard.questions")})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button
              onClick={handleStartQuiz}
              disabled={!selectedPackageId || isLoadingPackages}
              className="w-full"
            >
              {t("dashboard.start")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
