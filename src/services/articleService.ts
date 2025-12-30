import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    query,
    orderBy,
    writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Article {
    id: string;
    title: string;
    excerpt: string;
    content: string; // Bisa HTML string atau markdown
    author: string;
    category: string;
    date: string; // ISO Layout
    imageUrl: string;
    readTime: string;
}

const ARTICLES_COLLECTION = "articles";

// Get all articles
export const getAllArticles = async (): Promise<Article[]> => {
    try {
        const q = query(collection(db, ARTICLES_COLLECTION), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        })) as Article[];
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};

// Save (Create/Update) article
export const saveArticle = async (article: Article): Promise<void> => {
    try {
        // Generate slug as ID if not present or use existing ID
        const articleId = article.id || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const docRef = doc(db, ARTICLES_COLLECTION, articleId);
        await setDoc(docRef, { ...article, id: articleId });
    } catch (error) {
        console.error("Error saving article:", error);
        throw error;
    }
};

// Delete article
export const deleteArticle = async (articleId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, ARTICLES_COLLECTION, articleId));
    } catch (error) {
        console.error("Error deleting article:", error);
        throw error;
    }
};
