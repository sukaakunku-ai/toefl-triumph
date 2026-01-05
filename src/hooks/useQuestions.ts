import { useQuery } from "@tanstack/react-query";
import { getQuestionsByCategory } from "@/services/questionService";
import { Question, testConfigs } from "@/data/questions";

export const useQuestions = (category: string) => {
  return useQuery<Question[]>({
    queryKey: ["questions", category],
    queryFn: async () => {
      const questions = await getQuestionsByCategory(category);
      // If Firebase returns questions, use them
      if (questions && questions.length > 0) {
        return questions;
      }
      // Fallback to mock data only if Firebase is empty
      const config = testConfigs[category as keyof typeof testConfigs];
      return config?.questions || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useTestConfig = (testType: string) => {
  const config = testConfigs[testType as keyof typeof testConfigs];
  const { data: questions, isLoading, error } = useQuestions(testType);
  
  return {
    config: config ? {
      ...config,
      questions: questions || config.questions,
    } : null,
    isLoading,
    error,
  };
};
