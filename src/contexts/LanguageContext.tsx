import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";

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
    "hero.title": "ACE YOUR TOEFL EXAM!",
    "hero.subtitle": "Platform latihan TOEFL TERBAIK & GRATIS dengan 500+ soal dan simulasi real test yang bikin kamu UNSTOPPABLE! 🚀",
    "hero.cta": "MULAI SEKARANG!",
    "hero.secondary": "LIHAT DEMO",

    // How it works
    "howItWorks.title": "4 SIMPLE STEPS TO SUCCESS!",
    "howItWorks.subtitle": "Easy, Fast, Effective. 💪",
    "howItWorks.step1.title": "NO SIGN UP",
    "howItWorks.step1.desc": "Tidak perlu daftar. Langsung gaskeun!",
    "howItWorks.step2.title": "PRACTICE",
    "howItWorks.step2.desc": "Pilih section dan mulai kerjakan soal dengan timer real!",
    "howItWorks.step3.title": "REVIEW & IMPROVE",
    "howItWorks.step3.desc": "Dapatkan hasil instant dan analisis untuk peningkatan.",
    "howItWorks.step4.title": "ACHIEVE",
    "howItWorks.step4.desc": "Raih skor TOEFL impian dan mewujudkan goal kamu!",

    // Why choose us
    "whyChooseUs.title": "SUPERCHARGE YOUR TOEFL PREPARATION!",
    "whyChooseUs.subtitle": "Everything you need to crush that TOEFL test! 🚀",
    "whyChooseUs.feature1.title": "READING MASTERY",
    "whyChooseUs.feature1.desc": "500+ passages dengan berbagai topik dan level difficulty.",
    "whyChooseUs.feature2.title": "LISTENING PRO",
    "whyChooseUs.feature2.desc": "Audio HQ quality agar kamu terbiasa dengan aksen native speaker.",
    "whyChooseUs.feature3.title": "STRUCTURE EXPERT",
    "whyChooseUs.feature3.desc": "Master grammar dan structure yang sering muncul di TOEFL.",
    "whyChooseUs.feature4.title": "PROGRESS TRACKER",
    "whyChooseUs.feature4.desc": "Real-time analytics dan insights untuk menilai kemampuan kamu.",
    "whyChooseUs.feature5.title": "TIMED PRACTICE",
    "whyChooseUs.feature5.desc": "Simulasi pengerjaan yang tepat seperti real TOEFL test.",
    "whyChooseUs.feature6.title": "INSTANT SCORING",
    "whyChooseUs.feature6.desc": "Get your score instantly + detailed explanation untuk setiap soal.",

    // CTA
    "cta.title": "READY TO DOMINATE THE TOEFL TEST?",
    "cta.subtitle": "Join 10,000+ students yang udah CRUSHING their TOEFL goals! It's 100% FREE FOREVER! 🏁",
    "cta.button": "START NOW FOR FREE!",

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
    "listening.audio": "Audio Listening",
    "listening.preview": "Preview Audio",
    "listening.instruction": "Silahkan dengarkan audio di bawah ini",

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

    // Blog
    "blog.title": "Sumber Belajar & Tips",
    "blog.subtitle": "Strategi dan wawasan ahli untuk membantu Anda mencapai target skor TOEFL",
    "blog.searchPlaceholder": "Cari artikel...",
    "blog.noResults": "Tidak ada artikel yang cocok dengan pencarian Anda.",
    "blog.readTime": "menit baca",
    "blog.viewAll": "Lihat Semua Artikel",
    "blog.sectionTitle": "LEARN FROM THE BEST!",
    "blog.sectionSubtitle": "Tips, tricks & strategies yang bikin kamu UNSTOPPABLE! 🚀",
    "blog.categories.all": "Semua",
    "blog.categories.reading": "Tips Membaca",
    "blog.categories.listening": "Tips Mendengar",
    "blog.categories.structure": "Tips Struktur",
    "blog.categories.writing": "Tips Menulis",
    "blog.categories.speaking": "Tips Berbicara",
    "blog.categories.general": "Umum",

    // Hero Extra
    "hero.freePractice": "TURBOCHARGE YOUR TOEFL SCORE",
    "hero.students": "10K+ STUDENTS",
    "hero.goals": "Reach your target score – it's your turn!",
    "hero.demo": "Watch Demo",

    // Common
    "common.loading": "Memuat...",
    "common.error": "Terjadi kesalahan",
    "common.success": "Berhasil",
    "common.language": "Bahasa",

    // Footer
    "footer.tagline": "Platform latihan TOEFL terbaik dan gratis. Raih skor impian kamu dengan metode yang terbukti efektif!",
    "footer.practice": "Practice Tests",
    "footer.fullSimulation": "Full Simulation",
    "footer.structure": "Structure & Grammar",
    "footer.reading": "Reading",
    "footer.listening": "Listening",
    "footer.resources": "Resources",
    "footer.studyTips": "Study Tips",
    "footer.strategies": "TOEFL Strategies",
    "footer.scoreGuide": "Score Guide",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved.",

    // Testimonials
    "testimonials.badge": "TESTIMONI",
    "testimonials.title": "APA KATA MEREKA?",
    "testimonials.subtitle": "BERGABUNG DENGAN 1,000+ LEARNERS YANG SUDAH MERASAKAN MANFAAT BELAJAR DI TOEFL JAGOAN. 🚀",
    "testimonials.viewAll": "LIHAT SEMUA TESTIMONI",
    "testimonials.viewLess": "LIHAT LEBIH SEDIKIT",
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
    "hero.title": "ACE YOUR TOEFL EXAM!",
    "hero.subtitle": "The BEST & FREE TOEFL practice platform with 500+ questions and real test simulations! 🚀",
    "hero.cta": "START NOW!",
    "hero.secondary": "WATCH DEMO",

    // How it works
    "howItWorks.title": "4 SIMPLE STEPS TO SUCCESS!",
    "howItWorks.subtitle": "Easy, Fast, Effective. 💪",
    "howItWorks.step1.title": "NO SIGN UP",
    "howItWorks.step1.desc": "No registration required. Get started immediately!",
    "howItWorks.step2.title": "PRACTICE",
    "howItWorks.step2.desc": "Choose your section and start with a real timer!",
    "howItWorks.step3.title": "REVIEW & IMPROVE",
    "howItWorks.step3.desc": "Get instant results and detailed analysis to boost your score.",
    "howItWorks.step4.title": "ACHIEVE",
    "howItWorks.step4.desc": "Reach your dream TOEFL score and achieve your goals!",

    // Why choose us
    "whyChooseUs.title": "SUPERCHARGE YOUR TOEFL PREPARATION!",
    "whyChooseUs.subtitle": "Everything you need to crush that TOEFL test! 🚀",
    "whyChooseUs.feature1.title": "READING MASTERY",
    "whyChooseUs.feature1.desc": "500+ passages with various topics and difficulty levels.",
    "whyChooseUs.feature2.title": "LISTENING PRO",
    "whyChooseUs.feature2.desc": "High quality audio to get you used to native accents.",
    "whyChooseUs.feature3.title": "STRUCTURE EXPERT",
    "whyChooseUs.feature3.desc": "Master grammar and structure commonly seen in TOEFL.",
    "whyChooseUs.feature4.title": "PROGRESS TRACKER",
    "whyChooseUs.feature4.desc": "Real-time analytics and insights to assess your skills.",
    "whyChooseUs.feature5.title": "TIMED PRACTICE",
    "whyChooseUs.feature5.desc": "Realistic simulation just like the actual TOEFL test.",
    "whyChooseUs.feature6.title": "INSTANT SCORING",
    "whyChooseUs.feature6.desc": "Get your score instantly + detailed explanation for each question.",

    // CTA
    "cta.title": "READY TO DOMINATE THE TOEFL TEST?",
    "cta.subtitle": "Join 10,000+ students already CRUSHING their TOEFL goals! It's 100% FREE FOREVER! 🏁",
    "cta.button": "START NOW FOR FREE!",

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
    "listening.audio": "Listening Audio",
    "listening.preview": "Preview Audio",
    "listening.instruction": "Please listen to the audio below",

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

    // Blog
    "blog.title": "Study Resources & Tips",
    "blog.subtitle": "Expert strategies and insights to help you achieve your target TOEFL score",
    "blog.searchPlaceholder": "Search articles...",
    "blog.noResults": "No articles found matching your search.",
    "blog.readTime": "min read",
    "blog.viewAll": "View All Articles",
    "blog.sectionTitle": "Study Resources",
    "blog.sectionSubtitle": "Expert tips and strategies to boost your TOEFL preparation",
    "blog.categories.all": "All",
    "blog.categories.reading": "Reading Tips",
    "blog.categories.listening": "Listening Tips",
    "blog.categories.structure": "Structure Tips",
    "blog.categories.writing": "Writing Tips",
    "blog.categories.speaking": "Speaking Tips",
    "blog.categories.general": "General",

    // Hero Extra
    "hero.freePractice": "Free practice available",
    "hero.students": "10,000+ Success Stories!",
    "hero.goals": "Reach your target score – it's your turn!",
    "hero.demo": "Watch Demo",
    "hero.questionCount": "Question 15 of 50",
    "hero.timeRemaining": "25:30 remaining",
    "hero.accuracy": "85% Accuracy",
    "hero.structureSection": "Structure Section",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.language": "Language",

    // Footer
    "footer.tagline": "Achieve your dream TOEFL score with free ETS-standard simulations and targeted premium practice.",
    "footer.practice": "Practice",
    "footer.fullSimulation": "Full Simulation",
    "footer.structure": "Structure & Grammar",
    "footer.reading": "Reading",
    "footer.listening": "Listening",
    "footer.resources": "Resources",
    "footer.studyTips": "Study Tips",
    "footer.strategies": "TOEFL Strategies",
    "footer.scoreGuide": "Score Guide",
    "footer.connect": "Connect",
    "footer.rights": "All rights reserved.",

    // Testimonials
    "testimonials.badge": "TESTIMONIALS",
    "testimonials.title": "WHAT THEY SAY?",
    "testimonials.subtitle": "JOIN 1,000+ LEARNERS WHO HAVE EXPERIENCED THE BENEFITS OF LEARNING AT TOEFL JAGOAN. 🚀",
    "testimonials.viewAll": "VIEW ALL TESTIMONIALS",
    "testimonials.viewLess": "SHOW LESS",
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

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t
  }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
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
