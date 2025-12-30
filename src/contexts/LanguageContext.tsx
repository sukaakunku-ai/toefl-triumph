import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Indonesian translations (default)
const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.practice": "Latihan",
    "nav.blog": "Blog",
    "nav.about": "Tentang",
    "nav.admin": "Admin",
    "nav.startPractice": "Mulai Latihan",
    
    // Dashboard
    "dashboard.title": "Pilih Jenis Latihan",
    "dashboard.subtitle": "Pilih jenis tes untuk memulai persiapan TOEFL Anda",
    "dashboard.fullSimulation": "Simulasi TOEFL Lengkap",
    "dashboard.fullSimulationDesc": "Tes lengkap dengan semua bagian - Structure, Reading, dan Listening.",
    "dashboard.structure": "Structure & Written Expression",
    "dashboard.structureDesc": "Fokus pada tata bahasa, struktur kalimat, dan keterampilan menulis.",
    "dashboard.reading": "Reading Comprehension",
    "dashboard.readingDesc": "Latihan membaca teks dan menjawab pertanyaan pemahaman.",
    "dashboard.listening": "Listening Comprehension",
    "dashboard.listeningDesc": "Tingkatkan kemampuan mendengar dengan pertanyaan berbasis audio.",
    "dashboard.minutes": "menit",
    "dashboard.questions": "soal",
    "dashboard.tip": "💡 Tip: Mulai dengan simulasi lengkap untuk menilai tingkat kemampuan Anda, lalu fokus pada bagian tertentu yang perlu ditingkatkan.",
    "dashboard.selectPackage": "Pilih Paket Soal",
    "dashboard.package": "Paket",
    "dashboard.start": "Mulai Latihan",
    
    // Hero
    "hero.title": "Persiapan TOEFL Terbaik",
    "hero.subtitle": "Tingkatkan skor TOEFL Anda dengan latihan soal berkualitas tinggi dan simulasi tes yang realistis.",
    "hero.cta": "Mulai Gratis",
    "hero.secondary": "Pelajari Selengkapnya",
    
    // How it works
    "howItWorks.title": "Cara Kerjanya",
    "howItWorks.step1.title": "Pilih Jenis Tes",
    "howItWorks.step1.desc": "Pilih antara simulasi lengkap atau latihan per bagian",
    "howItWorks.step2.title": "Kerjakan Soal",
    "howItWorks.step2.desc": "Jawab soal dengan timer seperti tes sesungguhnya",
    "howItWorks.step3.title": "Lihat Hasil",
    "howItWorks.step3.desc": "Dapatkan analisis detail dan penjelasan jawaban",
    
    // Why choose us
    "whyChooseUs.title": "Mengapa Memilih Kami",
    "whyChooseUs.feature1.title": "Soal Berkualitas",
    "whyChooseUs.feature1.desc": "Soal-soal dirancang sesuai standar TOEFL terbaru",
    "whyChooseUs.feature2.title": "Penjelasan Detail",
    "whyChooseUs.feature2.desc": "Setiap jawaban dilengkapi penjelasan lengkap",
    "whyChooseUs.feature3.title": "Simulasi Realistis",
    "whyChooseUs.feature3.desc": "Timer dan format seperti tes sesungguhnya",
    
    // CTA
    "cta.title": "Siap Meningkatkan Skor TOEFL?",
    "cta.subtitle": "Mulai latihan sekarang dan raih skor impianmu!",
    "cta.button": "Mulai Sekarang",
    
    // Quiz
    "quiz.question": "Soal",
    "quiz.of": "dari",
    "quiz.flagQuestion": "Tandai Soal",
    "quiz.unflagQuestion": "Hapus Tanda",
    "quiz.previous": "Sebelumnya",
    "quiz.next": "Selanjutnya",
    "quiz.submit": "Kumpulkan",
    "quiz.exitConfirm": "Keluar dari Tes?",
    "quiz.exitMessage": "Progress Anda akan hilang. Yakin ingin keluar?",
    "quiz.cancel": "Batal",
    "quiz.exit": "Keluar",
    "quiz.unansweredTitle": "Soal Belum Terjawab",
    "quiz.unansweredMessage": "Masih ada {count} soal yang belum dijawab. Yakin ingin mengumpulkan?",
    "quiz.submitAnyway": "Tetap Kumpulkan",
    
    // Results
    "results.title": "Hasil Tes",
    "results.score": "Skor Anda",
    "results.correct": "Benar",
    "results.incorrect": "Salah",
    "results.timeSpent": "Waktu Digunakan",
    "results.review": "Lihat Jawaban",
    "results.tryAgain": "Coba Lagi",
    "results.backToDashboard": "Kembali ke Dashboard",
    "results.yourAnswer": "Jawaban Anda",
    "results.correctAnswer": "Jawaban Benar",
    "results.explanation": "Penjelasan",
    
    // Admin
    "admin.title": "Panel Admin",
    "admin.packages": "Kelola Paket Soal",
    "admin.questions": "Kelola Soal",
    "admin.addPackage": "Tambah Paket",
    "admin.addQuestion": "Tambah Soal",
    "admin.editPackage": "Edit Paket",
    "admin.editQuestion": "Edit Soal",
    "admin.deleteConfirm": "Yakin ingin menghapus?",
    "admin.packageName": "Nama Paket",
    "admin.category": "Kategori",
    "admin.questionCount": "Jumlah Soal",
    "admin.save": "Simpan",
    "admin.delete": "Hapus",
    "admin.questionText": "Teks Soal",
    "admin.options": "Pilihan Jawaban",
    "admin.correctAnswer": "Jawaban Benar",
    "admin.explanation": "Penjelasan",
    "admin.selectPackage": "Pilih Paket",
    "admin.noPackages": "Belum ada paket soal",
    "admin.noQuestions": "Belum ada soal dalam paket ini",
    "admin.backToDashboard": "Kembali ke Dashboard",
    
    // Common
    "common.loading": "Memuat...",
    "common.error": "Terjadi kesalahan",
    "common.success": "Berhasil",
    "common.language": "Bahasa",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.practice": "Practice",
    "nav.blog": "Blog",
    "nav.about": "About",
    "nav.admin": "Admin",
    "nav.startPractice": "Start Practice",
    
    // Dashboard
    "dashboard.title": "Choose Your Practice",
    "dashboard.subtitle": "Select a test type to begin your TOEFL preparation",
    "dashboard.fullSimulation": "Full TOEFL Simulation",
    "dashboard.fullSimulationDesc": "Complete test with all sections - Structure, Reading, and Listening.",
    "dashboard.structure": "Structure & Written Expression",
    "dashboard.structureDesc": "Focus on grammar, sentence structure, and written expression skills.",
    "dashboard.reading": "Reading Comprehension",
    "dashboard.readingDesc": "Practice reading passages and answer comprehension questions.",
    "dashboard.listening": "Listening Comprehension",
    "dashboard.listeningDesc": "Improve your listening skills with audio-based questions.",
    "dashboard.minutes": "minutes",
    "dashboard.questions": "questions",
    "dashboard.tip": "💡 Tip: Start with a full simulation to assess your current level, then focus on specific sections where you need improvement.",
    "dashboard.selectPackage": "Select Question Package",
    "dashboard.package": "Package",
    "dashboard.start": "Start Practice",
    
    // Hero
    "hero.title": "Best TOEFL Preparation",
    "hero.subtitle": "Boost your TOEFL score with high-quality practice questions and realistic test simulations.",
    "hero.cta": "Get Started Free",
    "hero.secondary": "Learn More",
    
    // How it works
    "howItWorks.title": "How It Works",
    "howItWorks.step1.title": "Choose Test Type",
    "howItWorks.step1.desc": "Select between full simulation or section practice",
    "howItWorks.step2.title": "Answer Questions",
    "howItWorks.step2.desc": "Answer questions with timer like the real test",
    "howItWorks.step3.title": "View Results",
    "howItWorks.step3.desc": "Get detailed analysis and answer explanations",
    
    // Why choose us
    "whyChooseUs.title": "Why Choose Us",
    "whyChooseUs.feature1.title": "Quality Questions",
    "whyChooseUs.feature1.desc": "Questions designed according to latest TOEFL standards",
    "whyChooseUs.feature2.title": "Detailed Explanations",
    "whyChooseUs.feature2.desc": "Every answer comes with complete explanation",
    "whyChooseUs.feature3.title": "Realistic Simulation",
    "whyChooseUs.feature3.desc": "Timer and format like the real test",
    
    // CTA
    "cta.title": "Ready to Boost Your TOEFL Score?",
    "cta.subtitle": "Start practicing now and achieve your dream score!",
    "cta.button": "Start Now",
    
    // Quiz
    "quiz.question": "Question",
    "quiz.of": "of",
    "quiz.flagQuestion": "Flag Question",
    "quiz.unflagQuestion": "Unflag",
    "quiz.previous": "Previous",
    "quiz.next": "Next",
    "quiz.submit": "Submit",
    "quiz.exitConfirm": "Exit Test?",
    "quiz.exitMessage": "Your progress will be lost. Are you sure you want to exit?",
    "quiz.cancel": "Cancel",
    "quiz.exit": "Exit",
    "quiz.unansweredTitle": "Unanswered Questions",
    "quiz.unansweredMessage": "You still have {count} unanswered questions. Submit anyway?",
    "quiz.submitAnyway": "Submit Anyway",
    
    // Results
    "results.title": "Test Results",
    "results.score": "Your Score",
    "results.correct": "Correct",
    "results.incorrect": "Incorrect",
    "results.timeSpent": "Time Spent",
    "results.review": "Review Answers",
    "results.tryAgain": "Try Again",
    "results.backToDashboard": "Back to Dashboard",
    "results.yourAnswer": "Your Answer",
    "results.correctAnswer": "Correct Answer",
    "results.explanation": "Explanation",
    
    // Admin
    "admin.title": "Admin Panel",
    "admin.packages": "Manage Packages",
    "admin.questions": "Manage Questions",
    "admin.addPackage": "Add Package",
    "admin.addQuestion": "Add Question",
    "admin.editPackage": "Edit Package",
    "admin.editQuestion": "Edit Question",
    "admin.deleteConfirm": "Are you sure you want to delete?",
    "admin.packageName": "Package Name",
    "admin.category": "Category",
    "admin.questionCount": "Question Count",
    "admin.save": "Save",
    "admin.delete": "Delete",
    "admin.questionText": "Question Text",
    "admin.options": "Answer Options",
    "admin.correctAnswer": "Correct Answer",
    "admin.explanation": "Explanation",
    "admin.selectPackage": "Select Package",
    "admin.noPackages": "No packages yet",
    "admin.noQuestions": "No questions in this package",
    "admin.backToDashboard": "Back to Dashboard",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.language": "Language",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "id" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
