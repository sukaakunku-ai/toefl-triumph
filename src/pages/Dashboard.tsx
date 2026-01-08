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
  Trophy,
  Gamepad2,
  Zap,
  Target,
  Sparkles,
  Award,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import { seedQuestions } from "@/services/questionService";
import { getPackagesByCategory, seedPackages } from "@/services/packageService";
import { QuestionPackage } from "@/data/packages";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { toast } from "sonner";

interface TestType {
  id: string;
  icon: any;
  titleKey: string;
  descKey: string;
  duration: number;
  questions: number;
  color: string;
  borderColor: string;
  bgColor: string;
  accentColor: string;
  rewardIcon: any;
}

const testTypes: TestType[] = [
  {
    id: "full",
    icon: Gamepad2,
    titleKey: "dashboard.fullSimulation",
    descKey: "dashboard.fullSimulationDesc",
    duration: 115,
    questions: 140,
    color: "blue",
    borderColor: "border-blue-200 dark:border-blue-500/30",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    accentColor: "bg-blue-500",
    rewardIcon: Trophy,
  },
  {
    id: "listening",
    icon: Headphones,
    titleKey: "dashboard.listening",
    descKey: "dashboard.listeningDesc",
    duration: 35,
    questions: 50,
    color: "primary",
    borderColor: "border-primary/20 dark:border-primary/30",
    bgColor: "bg-primary/5 dark:bg-primary/10",
    accentColor: "bg-primary",
    rewardIcon: Zap,
  },
  {
    id: "structure",
    icon: PenTool,
    titleKey: "dashboard.structure",
    descKey: "dashboard.structureDesc",
    duration: 25,
    questions: 40,
    color: "success",
    borderColor: "border-green-200 dark:border-green-500/30",
    bgColor: "bg-green-50 dark:bg-green-500/10",
    accentColor: "bg-green-500",
    rewardIcon: Award,
  },
  {
    id: "reading",
    icon: BookOpen,
    titleKey: "dashboard.reading",
    descKey: "dashboard.readingDesc",
    duration: 55,
    questions: 50,
    color: "warning",
    borderColor: "border-orange-200 dark:border-orange-500/30",
    bgColor: "bg-orange-50 dark:bg-orange-500/10",
    accentColor: "bg-orange-500",
    rewardIcon: Target,
  },
];

export default function Dashboard() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isSeeded, setIsSeeded] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [packageCounts, setPackageCounts] = useState<Record<string, number>>({});

  // Package selection state
  const [showPackageDialog, setShowPackageDialog] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState<TestType | null>(null);
  const [packages, setPackages] = useState<QuestionPackage[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string>("");
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);

  // Full simulation nested packages
  const [listeningPackages, setListeningPackages] = useState<QuestionPackage[]>([]);
  const [readingPackages, setReadingPackages] = useState<QuestionPackage[]>([]);
  const [structurePackages, setStructurePackages] = useState<QuestionPackage[]>([]);
  const [selectedListeningId, setSelectedListeningId] = useState<string>("");
  const [selectedReadingId, setSelectedReadingId] = useState<string>("");
  const [selectedStructureId, setSelectedStructureId] = useState<string>("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const seeded = localStorage.getItem("firebase_seeded");

    if (seeded) setIsSeeded(true);

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    // Fetch real question and package counts
    const fetchCounts = async () => {
      try {
        const [allQuestions, allPackages] = await Promise.all([
          import("@/services/questionService").then(m => m.getAllQuestions()),
          import("@/services/packageService").then(m => m.getAllPackages())
        ]);

        const counts: Record<string, number> = {
          structure: 0,
          reading: 0,
          listening: 0,
          full: 0
        };

        const pkgCounts: Record<string, number> = {
          structure: 0,
          reading: 0,
          listening: 0,
          full: 0
        };

        allQuestions.forEach(q => {
          if (counts[q.category] !== undefined) {
            counts[q.category]++;
          }
        });

        allPackages.forEach(p => {
          if (pkgCounts[p.category] !== undefined) {
            pkgCounts[p.category]++;
          }
        });

        // Calculate 'full' simulation statistics
        counts.full = counts.listening + counts.structure + counts.reading;
        // Number of available full combinations is the minimum number of packages in any section
        pkgCounts.full = Math.min(pkgCounts.listening || 0, pkgCounts.structure || 0, pkgCounts.reading || 0);

        setCategoryCounts(counts);
        setPackageCounts(pkgCounts);
      } catch (error) {
        console.error("Failed to fetch counts", error);
      }
    };

    fetchCounts();
  }, [t]);

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

  const handleTestSelect = async (test: TestType) => {
    setSelectedTestType(test);
    setIsLoadingPackages(true);
    setShowPackageDialog(true);

    try {
      if (test.id === "full") {
        const [lPkgs, rPkgs, sPkgs] = await Promise.all([
          getPackagesByCategory("listening"),
          getPackagesByCategory("reading"),
          getPackagesByCategory("structure"),
        ]);
        setListeningPackages(lPkgs);
        setReadingPackages(rPkgs);
        setStructurePackages(sPkgs);

        if (lPkgs.length > 0) setSelectedListeningId(lPkgs[0].id);
        if (rPkgs.length > 0) setSelectedReadingId(rPkgs[0].id);
        if (sPkgs.length > 0) setSelectedStructureId(sPkgs[0].id);
      } else {
        const categoryPackages = await getPackagesByCategory(test.id);
        setPackages(categoryPackages);
        if (categoryPackages.length > 0) {
          setSelectedPackageId(categoryPackages[0].id);
        }
      }
    } catch (error) {
      console.error("Error loading packages:", error);
      toast.error(t("common.error"));
    } finally {
      setIsLoadingPackages(false);
    }
  };

  const handleStartQuiz = () => {
    if (selectedTestType) {
      if (selectedTestType.id === "full") {
        const params = new URLSearchParams();
        if (selectedListeningId) params.append("listening", selectedListeningId);
        if (selectedReadingId) params.append("reading", selectedReadingId);
        if (selectedStructureId) params.append("structure", selectedStructureId);
        navigate(`/quiz/full?${params.toString()}`);
      } else if (selectedPackageId) {
        navigate(`/quiz/${selectedTestType.id}?package=${selectedPackageId}`);
      }
      setShowPackageDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-wavy flex flex-col">
      {/* Background ripples */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] ripple -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] ripple -z-10 [animation-delay:2s]" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-border transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-black text-xl text-foreground uppercase tracking-tighter">TOEFL Rocket</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link to="/admin">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-primary/10"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] animate-bounce">
              <Sparkles className="w-3 h-3" />
              Pilih Target Belajar
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tight leading-none drop-shadow-sm">
              {t("dashboard.title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Selesaikan misi harian dan raih poin tertinggi di setiap sezione!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testTypes.map((test, index) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={cn(
                    "group relative rounded-[40px] p-8 border-4 transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col justify-between",
                    test.borderColor,
                    test.bgColor,
                    "shadow-[0_12px_0_0_rgba(0,0,0,0.05)] hover:shadow-[0_8px_0_0_rgba(0,0,0,0.05)] hover:translate-y-1 active:shadow-none active:translate-y-[6px]"
                  )}
                  onClick={() => handleTestSelect(test)}
                >
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                        <h3 className="text-3xl font-black text-foreground leading-tight uppercase tracking-tighter">
                          {t(test.titleKey)}
                        </h3>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                          <Target className="w-3 h-3" />
                          {t(test.descKey)}
                        </p>
                      </div>
                      <div className="w-16 h-16 rounded-[20px] bg-white dark:bg-white/10 flex items-center justify-center shadow-lg transform rotate-6 group-hover:rotate-12 transition-transform">
                        <test.icon className={cn("w-8 h-8", `text-${test.color === "primary" ? "primary" : test.color}`)} />
                      </div>
                    </div>

                    <div className="space-y-4 pt-10">
                      <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
                            <Clock className="w-4 h-4 text-foreground/70" />
                          </div>
                          <span>{test.duration} MIN</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white dark:bg-white/10 flex items-center justify-center shadow-sm">
                            <Layers className="w-4 h-4 text-foreground/70" />
                          </div>
                          <span>{packageCounts[test.id] || 0} QUESTS</span>
                        </div>
                      </div>

                      {/* Progress visual bar */}
                      <div className="h-4 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden p-1 border border-white/20">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "40%" }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className={cn("h-full rounded-full shadow-inner", test.accentColor)}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Reward Potential:</span>
                          <span className="text-xs font-black text-foreground">XP +500</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#fbbf24] flex items-center justify-center shadow-lg border-2 border-[#d97706] group-hover:scale-110 transition-transform">
                          <test.rewardIcon className="w-5 h-5 text-black" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative element in card background */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 dark:bg-black/10 rounded-full -z-0 blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-20 p-8 rounded-[32px] bg-white/40 dark:bg-black/20 backdrop-blur-md border-4 border-white dark:border-white/5 text-center flex items-center justify-center gap-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#fbbf24] flex items-center justify-center shadow-lg border-2 border-[#d97706] rotate-3">
              <Trophy className="w-8 h-8 text-black" />
            </div>
            <div className="text-left">
              <h4 className="text-xl font-black text-foreground uppercase tracking-tighter">{t("dashboard.tip")}</h4>
              <p className="text-sm text-muted-foreground font-medium">Latihan setiap hari untuk menjaga stamina belajarmu tetap prima!</p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Package Selection Dialog */}
      <Dialog open={showPackageDialog} onOpenChange={setShowPackageDialog}>
        <DialogContent className={cn(
          "transition-all duration-300 flex flex-col max-h-[90vh] rounded-[40px] border-4 border-white shadow-2xl bg-wavy overflow-hidden",
          selectedTestType?.id === "full" ? "sm:max-w-2xl" : "sm:max-w-xl"
        )}>
          <DialogHeader className="p-8 pb-0 text-center">
            <div className="w-16 h-16 bg-[#fbbf24] rounded-2xl shadow-lg border-2 border-[#d97706] flex items-center justify-center mx-auto mb-4 -rotate-3">
              <Rocket className="w-8 h-8 text-black" />
            </div>
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-foreground">{t("dashboard.selectPackage")}</DialogTitle>
            <DialogDescription className="text-lg font-bold text-muted-foreground uppercase tracking-widest">
              {selectedTestType && t(selectedTestType.titleKey)}
            </DialogDescription>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-8 space-y-8 py-8 scrollbar-hide">
            {isLoadingPackages ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
                <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">Memuat Quest...</span>
              </div>
            ) : selectedTestType?.id === "full" ? (
              <div className="space-y-8">
                {/* Listening सेक्शन */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-md">
                      <Headphones className="w-4 h-4 text-white" />
                    </div>
                    <label className="text-sm font-black uppercase tracking-widest text-foreground">{t("dashboard.listening")}</label>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {listeningPackages.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic col-span-full">Tidak ada misi tersedia</p>
                    ) : (
                      listeningPackages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => setSelectedListeningId(pkg.id)}
                          className={cn(
                            "px-4 py-3 rounded-2xl border-2 text-xs font-black uppercase transition-all",
                            selectedListeningId === pkg.id
                              ? "border-[#22c55e] bg-[#22c55e] text-white shadow-[0_4px_0_0_#15803d]"
                              : "border-white bg-white/50 hover:bg-white text-muted-foreground shadow-sm"
                          )}
                        >
                          {pkg.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Structure सेक्शन */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center shadow-md">
                      <PenTool className="w-4 h-4 text-white" />
                    </div>
                    <label className="text-sm font-black uppercase tracking-widest text-foreground">{t("dashboard.structure")}</label>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {structurePackages.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic col-span-full">Tidak ada misi tersedia</p>
                    ) : (
                      structurePackages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => setSelectedStructureId(pkg.id)}
                          className={cn(
                            "px-4 py-3 rounded-2xl border-2 text-xs font-black uppercase transition-all",
                            selectedStructureId === pkg.id
                              ? "border-[#22c55e] bg-[#22c55e] text-white shadow-[0_4px_0_0_#15803d]"
                              : "border-white bg-white/50 hover:bg-white text-muted-foreground shadow-sm"
                          )}
                        >
                          {pkg.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* Reading सेक्शन */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-md">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <label className="text-sm font-black uppercase tracking-widest text-foreground">{t("dashboard.reading")}</label>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {readingPackages.length === 0 ? (
                      <p className="text-xs text-muted-foreground italic col-span-full">Tidak ada misi tersedia</p>
                    ) : (
                      readingPackages.map((pkg) => (
                        <button
                          key={pkg.id}
                          onClick={() => setSelectedReadingId(pkg.id)}
                          className={cn(
                            "px-4 py-3 rounded-2xl border-2 text-xs font-black uppercase transition-all",
                            selectedReadingId === pkg.id
                              ? "border-[#22c55e] bg-[#22c55e] text-white shadow-[0_4px_0_0_#15803d]"
                              : "border-white bg-white/50 hover:bg-white text-muted-foreground shadow-sm"
                          )}
                        >
                          {pkg.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : packages.length === 0 ? (
              <p className="text-center font-bold text-muted-foreground py-12 uppercase tracking-widest">
                {t("admin.noPackages")}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={cn(
                      "p-6 rounded-[32px] border-4 text-left transition-all duration-300 flex items-center justify-between group relative overflow-hidden",
                      selectedPackageId === pkg.id
                        ? "border-[#22c55e] bg-white translate-y-[-4px] shadow-[0_8px_0_0_rgba(34,197,94,0.2)]"
                        : "border-white bg-white/50 hover:bg-white/80 shadow-sm"
                    )}
                  >
                    <div className="relative z-10 space-y-1">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "font-black text-2xl uppercase tracking-tighter",
                          selectedPackageId === pkg.id ? "text-[#22c55e]" : "text-foreground"
                        )}>
                          {pkg.name}
                        </span>
                        {selectedPackageId === pkg.id && (
                          <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground">
                        <div className="flex items-center gap-1.5 bg-accent/30 px-2 py-0.5 rounded-full">
                          <BookOpen className="w-3 h-3" />
                          <span>{pkg.questionIds.length} Soal</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-accent/30 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>{pkg.duration} MENIT</span>
                        </div>
                      </div>
                    </div>

                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                      selectedPackageId === pkg.id ? "bg-[#22c55e] rotate-6" : "bg-white/60"
                    )}>
                      <Rocket className={cn("w-6 h-6", selectedPackageId === pkg.id ? "text-white" : "text-muted-foreground")} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-8 pt-4">
            <Button
              onClick={handleStartQuiz}
              size="xl"
              disabled={
                isLoadingPackages ||
                (selectedTestType?.id === "full"
                  ? (!selectedListeningId && !selectedReadingId && !selectedStructureId)
                  : !selectedPackageId)
              }
              className="w-full bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-black text-2xl py-8 rounded-[24px] shadow-[0_10px_0_0_#d97706] hover:shadow-[0_6px_0_0_#d97706] active:shadow-none translate-y-[-6px] active:translate-y-[4px] transition-all gap-4 uppercase tracking-tighter"
            >
              Mulai Misi Sekarang
              <Rocket className="w-8 h-8 animate-bounce" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
