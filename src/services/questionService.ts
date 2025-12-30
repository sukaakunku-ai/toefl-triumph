import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  query, 
  where,
  orderBy,
  writeBatch
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Question, testConfigs } from "@/data/questions";

const QUESTIONS_COLLECTION = "questions";

export interface FirebaseQuestion extends Question {
  category: "structure" | "reading" | "listening";
}

// Fetch questions by category
export const getQuestionsByCategory = async (category: string): Promise<Question[]> => {
  try {
    const q = query(
      collection(db, QUESTIONS_COLLECTION),
      where("category", "==", category),
      orderBy("id")
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Return mock data if no data in Firebase
      console.log(`No questions found in Firebase for ${category}, using mock data`);
      return testConfigs[category as keyof typeof testConfigs]?.questions || [];
    }
    
    return querySnapshot.docs.map(doc => ({
      id: doc.data().id,
      category: doc.data().category,
      question_text: doc.data().question_text,
      options: doc.data().options,
      correct_answer: doc.data().correct_answer,
      explanation: doc.data().explanation,
    })) as Question[];
  } catch (error) {
    console.error("Error fetching questions:", error);
    // Fallback to mock data
    return testConfigs[category as keyof typeof testConfigs]?.questions || [];
  }
};

// Seed initial questions to Firebase
export const seedQuestions = async (): Promise<void> => {
  try {
    const batch = writeBatch(db);
    
    Object.entries(testConfigs).forEach(([category, config]) => {
      config.questions.forEach((question) => {
        const docRef = doc(db, QUESTIONS_COLLECTION, `${category}_${question.id}`);
        batch.set(docRef, {
          ...question,
          category,
        });
      });
    });
    
    await batch.commit();
    console.log("Questions seeded successfully!");
  } catch (error) {
    console.error("Error seeding questions:", error);
    throw error;
  }
};

// Get all questions
export const getAllQuestions = async (): Promise<FirebaseQuestion[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));
    return querySnapshot.docs.map(doc => doc.data() as FirebaseQuestion);
  } catch (error) {
    console.error("Error fetching all questions:", error);
    return [];
  }
};
