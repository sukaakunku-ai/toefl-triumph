import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useTestConfig } from "@/hooks/useQuestions";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { ResultPage } from "@/components/quiz/ResultPage";
import { Question } from "@/data/questions";
import { getPackageById } from "@/services/packageService";
import { getQuestionsByIds } from "@/services/questionService";
import { Loader2 } from "lucide-react";

export default function Quiz() {
  const { testType } = useParams<{ testType: string }>();
  const [searchParams] = useSearchParams();

  const packageId = searchParams.get("package");
  const listeningId = searchParams.get("listening");
  const readingId = searchParams.get("reading");
  const structureId = searchParams.get("structure");

  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<{
    answers: Record<number, number>;
    timeSpent: number;
  } | null>(null);
  const [packageQuestions, setPackageQuestions] = useState<Question[] | null>(null);
  const [packageDuration, setPackageDuration] = useState<number>(0);
  const [isLoadingPackage, setIsLoadingPackage] = useState(!!packageId || testType === "full");

  const { config, duration: hookDuration, isLoading } = useTestConfig(testType || "");

  useEffect(() => {
    const loadPackageQuestions = async () => {
      if (!testType) return;

      try {
        if (packageId) {
          const pkg = await getPackageById(packageId);
          if (pkg) {
            const questions = await getQuestionsByIds(pkg.questionIds);
            setPackageQuestions(questions);
            setPackageDuration(pkg.duration);
          }
        } else if (testType === "full") {
          const ids = [listeningId, readingId, structureId].filter(Boolean) as string[];
          if (ids.length > 0) {
            const pkgs = await Promise.all(ids.map(id => getPackageById(id)));
            const allQuestionIds = pkgs.flatMap(p => p?.questionIds || []);
            const questions = await getQuestionsByIds(allQuestionIds);

            setPackageQuestions(questions);
            const totalDuration = pkgs.reduce((acc, p) => acc + (p?.duration || 0), 0);
            setPackageDuration(totalDuration || 115);
          }
        }
      } catch (error) {
        console.error("Error loading package questions:", error);
      } finally {
        setIsLoadingPackage(false);
      }
    };

    if (packageId || testType === "full") {
      setIsLoadingPackage(true);
      loadPackageQuestions();
    } else {
      setIsLoadingPackage(false);
    }
  }, [testType, packageId, listeningId, readingId, structureId]);

  if (!config && !isLoading) {
    navigate("/dashboard");
    return null;
  }

  if (isLoading || isLoadingPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground">Loading Paket Soal...</h2>
          <p className="text-muted-foreground">Preparing your test environment</p>
        </div>
      </div>
    );
  }

  const handleComplete = (answers: Record<number, number>, timeSpent: number) => {
    setResults({ answers, timeSpent });
    setIsComplete(true);
  };

  // Extract from config for type safety
  const finalQuestions = packageQuestions || config?.questions || [];
  const finalDuration = packageDuration || hookDuration || 25;
  const finalTestName = config?.name || "TOEFL Practice";

  if (isComplete && results && config) {
    return (
      <ResultPage
        testName={finalTestName}
        questions={finalQuestions}
        answers={results.answers}
        timeSpent={results.timeSpent}
      />
    );
  }

  if (config) {
    return (
      <QuizEngine
        testName={finalTestName}
        questions={finalQuestions}
        duration={finalDuration}
        onComplete={handleComplete}
      />
    );
  }

  return null;
}
