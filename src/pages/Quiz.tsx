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
      if (!testType) return;

      const packageId = searchParams.get("package");
      const listeningId = searchParams.get("listening");
      const readingId = searchParams.get("reading");
      const structureId = searchParams.get("structure");

      if (!packageId && !listeningId && !readingId && !structureId) return;

      setIsLoadingPackage(true);
      try {
        const allQs = await getAllQuestions();
        let questions: Question[] = [];
        let duration = 0;

        if (testType === "full" && (listeningId || readingId || structureId)) {
          const allPackages = await import("@/services/packageService").then(m => m.getAllPackages());

          // TOEFL order: Listening, Structure, Reading
          if (listeningId) {
            const pkg = allPackages.find(p => p.id === listeningId);
            if (pkg) {
              const qs = allQs.filter(q => pkg.questionIds.includes(q.id));
              questions = [...questions, ...qs];
              duration += pkg.duration;
            }
          }
          if (structureId) {
            const pkg = allPackages.find(p => p.id === structureId);
            if (pkg) {
              const qs = allQs.filter(q => pkg.questionIds.includes(q.id));
              questions = [...questions, ...qs];
              duration += pkg.duration;
            }
          }
          if (readingId) {
            const pkg = allPackages.find(p => p.id === readingId);
            if (pkg) {
              const qs = allQs.filter(q => pkg.questionIds.includes(q.id));
              questions = [...questions, ...qs];
              duration += pkg.duration;
            }
          }
        } else if (packageId) {
          const packages = await getPackagesByCategory(testType);
          const pkg = packages.find(p => p.id === packageId);
          if (pkg) {
            questions = allQs.filter(q => pkg.questionIds.includes(q.id));
            duration = pkg.duration;
          }
        }

        if (questions.length > 0) {
          setPackageQuestions(questions);
          setPackageDuration(duration);
        }
      } catch (error) {
        console.error("Error loading package:", error);
      } finally {
        setIsLoadingPackage(false);
      }
    };

    loadPackageQuestions();
  }, [searchParams, testType]);

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
  const durationToUse = packageQuestions && packageQuestions.length > 0 ? packageDuration : config.duration;

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
