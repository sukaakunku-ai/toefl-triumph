import { motion } from "framer-motion";
import { Flag, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionNavProps {
  totalQuestions: number;
  currentQuestion: number;
  answers: Record<number, number>;
  flagged: Set<number>;
  onQuestionClick: (index: number) => void;
  showResults?: boolean;
  correctAnswers?: Record<number, number>;
}

export function QuestionNav({
  totalQuestions,
  currentQuestion,
  answers,
  flagged,
  onQuestionClick,
  showResults = false,
  correctAnswers = {},
}: QuestionNavProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Questions</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-primary" />
            Current
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-accent border border-primary/30" />
            Answered
          </span>
          <span className="flex items-center gap-1">
            <Flag className="w-3 h-3 text-warning" />
            Flagged
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isAnswered = answers[i] !== undefined;
          const isCurrent = i === currentQuestion;
          const isFlagged = flagged.has(i);
          const isCorrect = showResults && correctAnswers[i] === answers[i];
          const isWrong = showResults && answers[i] !== undefined && correctAnswers[i] !== answers[i];

          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuestionClick(i)}
              className={cn(
                "relative w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center",
                isCurrent && "bg-primary text-primary-foreground shadow-md",
                !isCurrent && isAnswered && !showResults && "bg-accent text-accent-foreground border border-primary/30",
                !isCurrent && !isAnswered && "bg-secondary text-muted-foreground hover:bg-accent",
                showResults && isCorrect && "bg-success/20 text-success border border-success/50",
                showResults && isWrong && "bg-destructive/20 text-destructive border border-destructive/50"
              )}
            >
              {showResults && isCorrect && <Check className="w-4 h-4" />}
              {showResults && isWrong && <X className="w-4 h-4" />}
              {!showResults && (i + 1)}

              {isFlagged && (
                <Flag className="absolute -top-1 -right-1 w-3 h-3 text-warning fill-warning" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
