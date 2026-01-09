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
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { Question, testConfigs, allQuestions } from "@/data/questions";

const QUESTIONS_COLLECTION = "questions";

export interface FirebaseQuestion extends Question {
  category: "structure" | "reading" | "listening";
}

// Google Drive link converter
export const convertDriveLink = (url: string): string => {
  if (!url) return "";

  if (url.includes('drive.google.com')) {
    // Check if it's a folder link
    if (url.includes('/folders/')) {
      return "ERROR_FOLDER_LINK";
    }

    // Match file ID from various Drive link formats
    // Format 1: /file/d/ID/view
    // Format 2: /open?id=ID
    // Format 3: /d/ID
    const fileIdRegex = /(?:\/d\/|id=)([a-zA-Z0-9_-]{25,})/;
    const match = url.match(fileIdRegex);

    if (match && match[1]) {
      const id = match[1];
      // Updated to use drive.google.com which often works better with export=download
      return `https://drive.google.com/uc?export=download&id=${id}`;
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
        question_audio_url: data.question_audio_url,
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
export const uploadQuestionAudio = async (
  questionId: string | number,
  file: File,
  onProgress?: (progress: number) => void,
  type?: 'passage' | 'question' // Type to differentiate between passage audio and question text audio
): Promise<string> => {
  console.log("Starting upload for file:", file.name, "Size:", file.size);

  return new Promise((resolve, reject) => {
    // Use the same folder to ensure permissions work, but add prefix
    const folder = 'audio_questions';
    const distinctPrefix = type === 'question' ? 'qtext_' : '';
    const storageRef = ref(storage, `${folder}/${questionId}_${distinctPrefix}${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log('Upload is ' + progress + '% done');
        if (onProgress) onProgress(progress);
      },
      (error) => {
        console.error("Upload error details:", error);
        reject(new Error("Gagal mengunggah audio: " + error.message));
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("Upload complete, download URL:", downloadURL);
          resolve(downloadURL);
        } catch (err: any) {
          reject(new Error("Gagal mendapatkan link audio setelah upload: " + err.message));
        }
      }
    );
  });
};

// Delete question audio from Firebase Storage
export const deleteQuestionAudio = async (audioUrl: string): Promise<void> => {
  try {
    // Extract the path from the Firebase Storage URL
    const decodedUrl = decodeURIComponent(audioUrl);
    // Match both audio_questions and audio_question_text folders
    const pathMatch = decodedUrl.match(/(audio_questions|audio_question_text)\/[^?]+/);

    if (!pathMatch) {
      throw new Error("Invalid audio URL format");
    }

    const audioPath = pathMatch[0];
    const audioRef = ref(storage, audioPath);
    await deleteObject(audioRef);
    console.log("Audio deleted successfully:", audioPath);
  } catch (error: any) {
    console.error("Error deleting audio:", error);
    throw new Error("Gagal menghapus audio: " + error.message);
  }
};
// Get questions by multiple IDs
export const getQuestionsByIds = async (ids: number[]): Promise<Question[]> => {
  try {
    const allQs = await getAllQuestions();
    return allQs.filter(q => ids.includes(q.id)).sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Error fetching questions by IDs:", error);
    return [];
  }
};
