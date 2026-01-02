import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Question, testConfigs, allQuestions } from "@/data/questions";

const QUESTIONS_COLLECTION = "questions";

export interface FirebaseQuestion extends Question {
  category: "structure" | "reading" | "listening";
}

// Google Drive link converter
export const convertDriveLink = (url: string): string => {
  if (!url) return "";
  if (url.includes('drive.google.com')) {
    const regex = /\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
  }
  return url;
};

// Fetch questions by category
export const getQuestionsByCategory = async (category: string): Promise<Question[]> => {
  try {
    const q = query(
      collection(db, QUESTIONS_COLLECTION),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No questions found in Firebase for ${category}`);
      return [];
    }

    const questions = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id,
        category: data.category,
        question_text: data.question_text,
        passage: data.passage,
        audio_url: data.audio_url,
        options: data.options,
        correct_answer: data.correct_answer,
        explanation: data.explanation,
      };
    }) as Question[];

    return questions.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
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
    if (querySnapshot.empty) {
      return [];
    }
    return querySnapshot.docs.map(doc => doc.data() as FirebaseQuestion);
  } catch (error) {
    console.error("Error fetching all questions:", error);
    return [];
  }
};

// Save/update a question
export const saveQuestion = async (question: Question): Promise<void> => {
  try {
    const docRef = doc(db, QUESTIONS_COLLECTION, `${question.category}_${question.id}`);
    await setDoc(docRef, question);
  } catch (error: any) {
    console.error("Error saving question:", error);
    throw new Error(error.message || "Gagal menyimpan soal");
  }
};

// Delete a question
export const deleteQuestion = async (questionId: number): Promise<void> => {
  try {
    const querySnapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));
    const docToDelete = querySnapshot.docs.find(d => d.data().id === questionId);
    if (docToDelete) {
      await deleteDoc(doc(db, QUESTIONS_COLLECTION, docToDelete.id));
    }
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};

// Upload question audio
export const uploadQuestionAudio = async (questionId: string | number, file: File): Promise<string> => {
  console.log("Starting upload for file:", file.name, "Size:", file.size);
  try {
    const storageRef = ref(storage, `audio_questions/${questionId}_${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload successful, snapshot:", snapshot);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL obtained:", downloadURL);
    return downloadURL;
  } catch (error: any) {
    console.error("Error uploading audio:", error);
    throw new Error(error.message || "Gagal mengunggah audio. Pastikan koneksi internet stabil.");
  }
};
