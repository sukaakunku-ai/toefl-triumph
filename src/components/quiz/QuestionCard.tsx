import { motion } from "framer-motion";
import { Flag, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  isFlagged: boolean;
  onAnswerSelect: (answerIndex: number) => void;
  onToggleFlag: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isLast: boolean;
  isFirst: boolean;
}

export function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  isFlagged,
  onAnswerSelect,
  onToggleFlag,
  onPrevious,
  onNext,
  onSubmit,
  isLast,
  isFirst,
}: QuestionCardProps) {
  const categoryLabels = {
    structure: "Structure & Written Expression",
    reading: "Reading Comprehension",
    listening: "Listening Comprehension",
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium text-muted-foreground">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span className="mx-2 text-muted-foreground">•</span>
          <span className="text-sm text-primary font-medium">
            {categoryLabels[question.category]}
          </span>
        </div>
        <Button
          variant={isFlagged ? "warning" : "outline"}
          size="sm"
          onClick={onToggleFlag}
          className="gap-2"
        >
          <Flag className={cn("w-4 h-4", isFlagged && "fill-current")} />
          {isFlagged ? "Flagged" : "Flag for Review"}
        </Button>
      </div>

      <Card variant="elevated" className="overflow-hidden">
        <CardContent className="p-8">
          {question.passage && (
            <div className="mb-8 p-6 rounded-xl bg-secondary/50 border border-border">
              <p className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Reading Passage</p>
              <div
                className="text-base md:text-lg text-foreground whitespace-pre-wrap leading-relaxed"
                dangerouslySetInnerHTML={{ __html: question.passage }}
              />
            </div>
          )}

          <p
            className="text-lg md:text-xl font-medium text-foreground leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: question.question_text }}
          />

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onAnswerSelect(index)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-4 group",
                  selectedAnswer === index
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-sm transition-colors",
                    selectedAnswer === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                  )}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span
                  className={cn(
                    "flex-1 text-foreground",
                    selectedAnswer === index && "font-medium"
                  )}
                  dangerouslySetInnerHTML={{ __html: option }}
                />
                {selectedAnswer === index && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={isFirst}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-3">
          {isLast ? (
            <Button variant="hero" onClick={onSubmit} className="gap-2">
              Submit Test
              <Check className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="default" onClick={onNext} className="gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
