import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Pause, Play } from "lucide-react";
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
  const [isPaused, setIsPaused] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setTimeSpent((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

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

  const submitTest = useCallback(() => {
    onComplete(answers, timeSpent);
  }, [answers, timeSpent, onComplete]);

  const handleTimeUp = useCallback(() => {
    onComplete(answers, duration * 60);
  }, [answers, duration, onComplete]);

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

            <div className="flex items-center gap-2">
              <Timer duration={duration} onTimeUp={handleTimeUp} isPaused={isPaused} />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPaused(true)}
                className="h-12 w-12 rounded-xl border-border hover:bg-accent transition-colors hidden sm:flex"
                title="Pause Test"
              >
                <Pause className="w-5 h-5" />
              </Button>
            </div>
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

      {/* Pause Overlay */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/40 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="max-w-md w-full bg-card/90 border border-border p-8 rounded-3xl shadow-2xl text-center"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Pause className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Simulasi Di-pause</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Ambil nafas sejenak. Waktu dan progres Anda telah disimpan dengan aman.
              </p>
              <Button
                size="lg"
                onClick={() => setIsPaused(false)}
                className="w-full h-14 text-lg font-bold rounded-2xl bg-gradient-hero hover:opacity-90 transition-all shadow-lg hover:shadow-primary/25"
              >
                <Play className="w-6 h-6 mr-2 fill-current" /> Lanjutkan Simulasi
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
