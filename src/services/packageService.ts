import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { QuestionPackage, defaultPackages } from "@/data/packages";

const PACKAGES_COLLECTION = "packages";

// Get all packages
export const getAllPackages = async (): Promise<QuestionPackage[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PACKAGES_COLLECTION));
    if (querySnapshot.empty) {
      return [];
    }
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as QuestionPackage[];
  } catch (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
};

// Get packages by category
export const getPackagesByCategory = async (
  category: string
): Promise<QuestionPackage[]> => {
  try {
    const q = query(
      collection(db, PACKAGES_COLLECTION),
      where("category", "==", category),
      orderBy("name")
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as QuestionPackage[];
  } catch (error) {
    console.error("Error fetching packages by category:", error);
    return [];
  }
};

// Create or update package
export const savePackage = async (pkg: QuestionPackage): Promise<void> => {
  try {
    const docRef = doc(db, PACKAGES_COLLECTION, pkg.id);
    await setDoc(docRef, {
      ...pkg,
      createdAt: pkg.createdAt || new Date(),
    });
  } catch (error) {
    console.error("Error saving package:", error);
    throw error;
  }
};

// Delete package
export const deletePackage = async (packageId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PACKAGES_COLLECTION, packageId));
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
};

// Seed default packages
export const seedPackages = async (): Promise<void> => {
  try {
    const batch = writeBatch(db);

    defaultPackages.forEach((pkg) => {
      const docRef = doc(db, PACKAGES_COLLECTION, pkg.id);
      batch.set(docRef, {
        ...pkg,
        createdAt: new Date(),
      });
    });

    await batch.commit();
    console.log("Packages seeded successfully!");
  } catch (error) {
    console.error("Error seeding packages:", error);
    throw error;
  }
};
