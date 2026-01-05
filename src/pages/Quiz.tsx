import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { ResultPage } from "@/components/quiz/ResultPage";
import { useTestConfig } from "@/hooks/useQuestions";
import { getPackagesByCategory } from "@/services/packageService";
import { getAllQuestions } from "@/services/questionService";
import { Question } from "@/data/questions";
import { Loader2 } from "lucide-react";

export default function Quiz() {
  const { testType } = useParams<{ testType: string }>();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get("package");
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<{
    answers: Record<number, number>;
    timeSpent: number;
  } | null>(null);
  const [packageQuestions, setPackageQuestions] = useState<Question[] | null>(null);
  const [packageDuration, setPackageDuration] = useState<number>(25);
  const [isLoadingPackage, setIsLoadingPackage] = useState(!!packageId);

  const { config, isLoading } = useTestConfig(testType || "");

  useEffect(() => {
    const loadPackageQuestions = async () => {
      if (!packageId || !testType) return;
      
      setIsLoadingPackage(true);
      try {
        const packages = await getPackagesByCategory(testType);
        const pkg = packages.find(p => p.id === packageId);
        
        if (pkg) {
          const allQs = await getAllQuestions();
          const filtered = allQs.filter(q => pkg.questionIds.includes(q.id));
          setPackageQuestions(filtered);
          setPackageDuration(pkg.duration);
        }
      } catch (error) {
        console.error("Error loading package:", error);
      } finally {
        setIsLoadingPackage(false);
      }
    };

    loadPackageQuestions();
  }, [packageId, testType]);

  if (!config) {
    navigate("/dashboard");
    return null;
  }

  const handleComplete = (answers: Record<number, number>, timeSpent: number) => {
    setResults({ answers, timeSpent });
    setIsComplete(true);
  };

  if (isLoading || isLoadingPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Memuat soal...</p>
        </div>
      </div>
    );
  }

  const questionsToUse = packageQuestions && packageQuestions.length > 0 ? packageQuestions : config.questions;
  const durationToUse = packageId && packageQuestions && packageQuestions.length > 0 ? packageDuration : config.duration;

  if (isComplete && results) {
    return (
      <ResultPage
        questions={questionsToUse}
        answers={results.answers}
        timeSpent={results.timeSpent}
        testName={config.name}
      />
    );
  }

  return (
    <QuizEngine
      testName={config.name}
      questions={questionsToUse}
      duration={durationToUse}
      onComplete={handleComplete}
    />
  );
}
