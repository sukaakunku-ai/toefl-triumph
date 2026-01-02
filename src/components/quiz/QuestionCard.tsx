import { motion } from "framer-motion";
import { Flag, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Question } from "@/data/questions";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
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
          {question.category === 'listening' && question.audio_url && (
            <div className="mb-8 p-6 rounded-xl bg-primary/5 border border-primary/20 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  </motion.div>
                </div>
                <div>
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">{t("listening.audio")}</p>
                  <p className="text-xs text-muted-foreground">{t("listening.instruction")}</p>
                </div>
              </div>
              <audio
                key={question.audio_url}
                src={question.audio_url}
                controls
                crossOrigin="anonymous"
                preload="auto"
                className="w-full h-12"
              />
            </div>
          )}

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
