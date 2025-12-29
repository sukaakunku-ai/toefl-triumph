import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuizEngine } from "@/components/quiz/QuizEngine";
import { ResultPage } from "@/components/quiz/ResultPage";
import { testConfigs } from "@/data/questions";

type TestType = keyof typeof testConfigs;

export default function Quiz() {
  const { testType } = useParams<{ testType: string }>();
  const navigate = useNavigate();
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<{
    answers: Record<number, number>;
    timeSpent: number;
  } | null>(null);

  const config = testConfigs[testType as TestType];

  if (!config) {
    navigate("/dashboard");
    return null;
  }

  const handleComplete = (answers: Record<number, number>, timeSpent: number) => {
    setResults({ answers, timeSpent });
    setIsComplete(true);
  };

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
