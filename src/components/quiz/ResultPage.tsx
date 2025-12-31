import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Trophy,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Question } from "@/data/questions";

interface ResultPageProps {
  questions: Question[];
  answers: Record<number, number>;
  timeSpent: number;
  testName: string;
}

export function ResultPage({ questions, answers, timeSpent, testName }: ResultPageProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const correctCount = questions.reduce((acc, q, index) => {
    return acc + (answers[index] === q.correct_answer ? 1 : 0);
  }, 0);

  const score = Math.round((correctCount / questions.length) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  const isHighScore = score >= 80;

  useEffect(() => {
    if (isHighScore) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#2563eb", "#10b981", "#f59e0b"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#2563eb", "#10b981", "#f59e0b"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isHighScore]);

  const getScoreColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreMessage = () => {
    if (score >= 90) return "Outstanding! You're ready for the TOEFL!";
    if (score >= 80) return "Excellent work! Keep it up!";
    if (score >= 70) return "Good job! A bit more practice will help.";
    if (score >= 60) return "Not bad! Focus on your weak areas.";
    return "Keep practicing! You'll get better.";
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Score Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className={cn(
                "w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center",
                isHighScore ? "bg-success/20" : "bg-secondary"
              )}
            >
              {isHighScore ? (
                <Trophy className="w-16 h-16 text-success" />
              ) : (
                <Target className="w-16 h-16 text-primary" />
              )}
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Test Complete!
            </h1>
            <p className="text-lg text-muted-foreground mb-4">{testName}</p>
            <p className={cn("text-xl font-medium", getScoreColor())}>
              {getScoreMessage()}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className={cn("text-4xl font-bold mb-2", getScoreColor())}>
                  {score}%
                </div>
                <p className="text-sm text-muted-foreground">Final Score</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-success mb-2">
                  {correctCount}
                </div>
                <p className="text-sm text-muted-foreground">Correct</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-destructive mb-2">
                  {questions.length - correctCount}
                </div>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-1">
                  <Clock className="w-6 h-6 text-muted-foreground" />
                  {minutes}:{seconds.toString().padStart(2, "0")}
                </div>
                <p className="text-sm text-muted-foreground">Time Spent</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <RotateCcw className="w-4 h-4" />
                Practice Again
              </Button>
            </Link>
            <Link to="/">
              <Button variant="hero" size="lg" className="gap-2 w-full sm:w-auto">
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Question Review */}
          <Card variant="default">
            <CardHeader>
              <CardTitle>Answer Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question, index) => {
                const isCorrect = answers[index] === question.correct_answer;
                const isExpanded = expandedQuestion === index;
                const userAnswer = answers[index];

                return (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "border rounded-xl overflow-hidden transition-all",
                      isCorrect ? "border-success/30" : "border-destructive/30"
                    )}
                  >
                    <button
                      onClick={() => setExpandedQuestion(isExpanded ? null : index)}
                      className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-foreground text-left">
                          Question {index + 1}
                        </span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>

                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 space-y-4"
                      >
                        {question.passage && (
                          <div className="mb-4 p-4 rounded-lg bg-secondary/30 border border-border">
                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Reading Passage</p>
                            <div
                              className="text-sm text-foreground whitespace-pre-wrap leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: question.passage }}
                            />
                          </div>
                        )}

                        <p className="text-foreground" dangerouslySetInnerHTML={{ __html: question.question_text }} />

                        <div className="space-y-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={cn(
                                "p-3 rounded-lg text-sm",
                                optIndex === question.correct_answer &&
                                "bg-success/10 border border-success/30 text-success",
                                optIndex === userAnswer &&
                                optIndex !== question.correct_answer &&
                                "bg-destructive/10 border border-destructive/30 text-destructive",
                                optIndex !== question.correct_answer &&
                                optIndex !== userAnswer &&
                                "bg-secondary text-muted-foreground"
                              )}
                            >
                              <span className="font-medium">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>{" "}
                              <span dangerouslySetInnerHTML={{ __html: option }} />
                              {optIndex === question.correct_answer && (
                                <span className="ml-2 text-success">(Correct)</span>
                              )}
                              {optIndex === userAnswer &&
                                optIndex !== question.correct_answer && (
                                  <span className="ml-2 text-destructive">(Your answer)</span>
                                )}
                            </div>
                          ))}
                        </div>

                        <div className="p-4 rounded-lg bg-accent/50 border border-border">
                          <p className="text-sm font-medium text-foreground mb-1">
                            Explanation:
                          </p>
                          <p
                            className="text-sm text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: question.explanation }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
