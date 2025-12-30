import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { ResultPage } from "@/components/quiz/ResultPage";
import { useTestConfig } from "@/hooks/useQuestions";
import { Loader2 } from "lucide-react";

export default function Quiz() {
  const { testType } = useParams<{ testType: string }>();
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<{
    answers: Record<number, number>;
    timeSpent: number;
  } | null>(null);

  const { config, isLoading } = useTestConfig(testType || "");

  if (!config) {
    navigate("/dashboard");
    return null;
  }

  const handleComplete = (answers: Record<number, number>, timeSpent: number) => {
    setResults({ answers, timeSpent });
    setIsComplete(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (isComplete && results) {
    return (
      <ResultPage
        questions={config.questions}
        answers={results.answers}
        timeSpent={results.timeSpent}
        testName={config.name}
      />
    );
  }

  return (
    <QuizEngine
      testName={config.name}
      questions={config.questions}
      duration={config.duration}
      onComplete={handleComplete}
    />
  );
}
