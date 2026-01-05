import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timer } from "./Timer";
import { QuestionNav } from "./QuestionNav";
import { QuestionCard } from "./QuestionCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Question } from "@/data/questions";

interface QuizEngineProps {
  testName: string;
  questions: Question[];
  duration: number;
  onComplete: (answers: Record<number, number>, timeSpent: number) => void;
}

export function QuizEngine({ testName, questions, duration, onComplete }: QuizEngineProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [startTime] = useState(Date.now());

  const currentQuestion = questions?.[currentIndex];
  const progress = questions?.length ? ((Object.keys(answers).length) / questions.length) * 100 : 0;
  const unansweredCount = questions?.length ? questions.length - Object.keys(answers).length : 0;

  // Guard against empty questions array
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Tidak ada soal tersedia untuk tes ini.</p>
          <Button onClick={() => navigate("/dashboard")}>Kembali ke Dashboard</Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Soal tidak ditemukan.</p>
          <Button onClick={() => navigate("/dashboard")}>Kembali ke Dashboard</Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: answerIndex }));
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentIndex)) {
        newSet.delete(currentIndex);
      } else {
        newSet.add(currentIndex);
      }
      return newSet;
    });
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    if (unansweredCount > 0) {
      setShowSubmitDialog(true);
    } else {
      submitTest();
    }
  };

  const submitTest = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    onComplete(answers, timeSpent);
  };

  const handleTimeUp = useCallback(() => {
    submitTest();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowExitDialog(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-semibold text-foreground">{testName}</h1>
                <p className="text-sm text-muted-foreground">
                  {Object.keys(answers).length} of {questions.length} answered
                </p>
              </div>
            </div>

            <Timer duration={duration} onTimeUp={handleTimeUp} />
          </div>

          <div className="mt-4">
            <Progress value={progress} variant="primary" className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[1fr,300px] gap-8">
          {/* Question Area */}
          <div>
            <QuestionCard
              question={currentQuestion}
              questionIndex={currentIndex}
              totalQuestions={questions.length}
              selectedAnswer={answers[currentIndex]}
              isFlagged={flagged.has(currentIndex)}
              onAnswerSelect={handleAnswerSelect}
              onToggleFlag={handleToggleFlag}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isFirst={currentIndex === 0}
              isLast={currentIndex === questions.length - 1}
            />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <QuestionNav
                totalQuestions={questions.length}
                currentQuestion={currentIndex}
                answers={answers}
                flagged={flagged}
                onQuestionClick={setCurrentIndex}
              />

              {flagged.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-xl bg-warning/10 border border-warning/30"
                >
                  <div className="flex items-center gap-2 text-warning">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {flagged.size} question{flagged.size > 1 ? "s" : ""} flagged for review
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </aside>
        </div>

        {/* Mobile Question Nav */}
        <div className="lg:hidden mt-8">
          <QuestionNav
            totalQuestions={questions.length}
            currentQuestion={currentIndex}
            answers={answers}
            flagged={flagged}
            onQuestionClick={setCurrentIndex}
          />
        </div>
      </main>

      {/* Exit Dialog */}
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to exit? Your progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Test</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate("/dashboard")}>
              Exit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Submit Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              You have {unansweredCount} unanswered question{unansweredCount > 1 ? "s" : ""}.
              Are you sure you want to submit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Answers</AlertDialogCancel>
            <AlertDialogAction onClick={submitTest}>
              Submit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
