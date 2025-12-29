import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, AlertTriangle } from "lucide-react";

interface TimerProps {
  duration: number; // in minutes
  onTimeUp: () => void;
  isPaused?: boolean;
}

export function Timer({ duration, onTimeUp, isPaused = false }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // convert to seconds
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, onTimeUp]);

  useEffect(() => {
    // Warning when 5 minutes left
    if (timeLeft <= 300 && timeLeft > 0) {
      setIsWarning(true);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  const progress = (timeLeft / (duration * 60)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${
        isWarning
          ? "bg-warning/10 border-warning/30 text-warning"
          : "bg-card border-border text-foreground"
      } transition-colors duration-300`}
    >
      {isWarning ? (
        <AlertTriangle className="w-5 h-5 animate-pulse" />
      ) : (
        <Clock className="w-5 h-5 text-muted-foreground" />
      )}
      <div className="flex flex-col">
        <span className="text-lg font-bold tabular-nums">
          {formatTime(minutes)}:{formatTime(seconds)}
        </span>
        <div className="w-20 h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${isWarning ? "bg-warning" : "bg-gradient-hero"}`}
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
