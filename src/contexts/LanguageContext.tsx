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
    "hero.title": "Raih Skor TOEFL Impian dengan Percaya Diri Maksimal!",
    "hero.subtitle": "Skor tinggi buka peluang studi & karir global. Simulasi ETS gratis, latihan premium, analisis cepat – semua tanpa biaya!",
    "hero.cta": "Mulai Gratis – Raih 600 + Skor Cepat!",
    "hero.secondary": "Pelajari Selengkapnya",

    // How it works
    "howItWorks.title": "3 Langkah Mudah Raih Skor TOEFL Tinggi",
    "howItWorks.subtitle": "Transformasi skill Bahasa Inggris gratis & mudah!",
    "howItWorks.step1.title": "Pilih Latihan",
    "howItWorks.step1.desc": "Fokus Reading, Listening, dll. untuk hasil optimal.",
    "howItWorks.step2.title": "Kerjakan Tes",
    "howItWorks.step2.desc": "Realtime, tinjau instan, belajar dari error.",
    "howItWorks.step3.title": "Tingkatkan",
    "howItWorks.step3.desc": "Analisis ahli & penjelasan mendalam – skor naik cepat!",

    // Why choose us
    "whyChooseUs.title": "Kenapa TOEFL Rocket? Mudah, Efektif, Gratis!",
    "whyChooseUs.subtitle": "Ribuan sukses tanpa kursus mahal – kunci skor tinggi!",
    "whyChooseUs.feature1.title": "Simulasi mirip Toefl ETS",
    "whyChooseUs.feature1.desc": "Format, timer, kesulitan mirip ETS.",
    "whyChooseUs.feature2.title": "Penjelasan Ahli",
    "whyChooseUs.feature2.desc": "Pahami konsep, bukan hafal.",
    "whyChooseUs.feature3.title": "Pelacakan Pintar",
    "whyChooseUs.feature3.desc": "Grafik kemajuan & laporan personal.",
    "whyChooseUs.feature4.title": "Latihan Bertahap",
    "whyChooseUs.feature4.desc": "Dari dasar ke advanced, bangun stamina.",
    "whyChooseUs.feature5.title": "Metode Terbukti",
    "whyChooseUs.feature5.desc": "Naik skor hingga 600 poin oleh ahli.",
    "whyChooseUs.feature6.title": "Akses 24/7",
    "whyChooseUs.feature6.desc": "Di mana saja, gratis selamanya!",

    // CTA
    "cta.title": "Siap Menaklukkan TOEFL?",
    "cta.subtitle": "Mulai berlatih hari ini dengan simulasi realistis dan umpan balik mendetail. Skor target Anda sudah di depan mata.",
    "cta.button": "Mulai Latihan Gratis Sekarang",

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
    "blog.sectionTitle": "Sumber Belajar",
    "blog.sectionSubtitle": "Tips dan strategi ahli untuk meningkatkan persiapan TOEFL Anda",
    "blog.categories.all": "Semua",
    "blog.categories.reading": "Tips Membaca",
    "blog.categories.listening": "Tips Mendengar",
    "blog.categories.structure": "Tips Struktur",
    "blog.categories.writing": "Tips Menulis",
    "blog.categories.speaking": "Tips Berbicara",
    "blog.categories.general": "Umum",

    // Hero Extra
    "hero.freePractice": "Latihan gratis tersedia",
    "hero.students": "10.000+ Siswa Sukses!",
    "hero.goals": "Capai target skormu – giliranmu sekarang!",
    "hero.demo": "Lihat Demo",
    "hero.questionCount": "Soal 15 dari 50",
    "hero.timeRemaining": "25:30 tersisa",
    "hero.accuracy": "Akurasi 85%",
    "hero.structureSection": "Bagian Structure",

    // Common
    "common.loading": "Memuat...",
    "common.error": "Terjadi kesalahan",
    "common.success": "Berhasil",
    "common.language": "Bahasa",

    // Footer
    "footer.tagline": "Raih skor TOEFL impianmu dengan simulasi standar ETS gratis dan latihan premium yang terarah.",
    "footer.practice": "Latihan",
    "footer.fullSimulation": "Simulasi Lengkap",
    "footer.structure": "Struktur & Tata Bahasa",
    "footer.reading": "Membaca",
    "footer.listening": "Mendengar",
    "footer.resources": "Sumber Daya",
    "footer.studyTips": "Tips Belajar",
    "footer.strategies": "Strategi TOEFL",
    "footer.scoreGuide": "Panduan Skor",
    "footer.connect": "Hubungi Kami",
    "footer.rights": "Semua hak dilindungi.",
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
    "hero.title": "Reach Your Dream TOEFL Score with Max Confidence!",
    "hero.subtitle": "High scores open global study & career opportunities. Free ETS simulations, premium practice, fast analysis – all for free!",
    "hero.cta": "Start Free – Reach 600+ Score Fast!",
    "hero.secondary": "Learn More",

    // How it works
    "howItWorks.title": "3 Easy Steps to Reach a High TOEFL Score",
    "howItWorks.subtitle": "Transform your English skills for free & easily!",
    "howItWorks.step1.title": "Choose Practice",
    "howItWorks.step1.desc": "Focus on Reading, Listening, etc. for optimal results.",
    "howItWorks.step2.title": "Take the Test",
    "howItWorks.step2.desc": "Real-time, instant review, learn from errors.",
    "howItWorks.step3.title": "Improve",
    "howItWorks.step3.desc": "Expert analysis & in-depth feedback – score up fast!",

    // Why choose us
    "whyChooseUs.title": "Why TOEFL Rocket? Easy, Effective, Free!",
    "whyChooseUs.subtitle": "Thousands success without expensive courses – key to high scores!",
    "whyChooseUs.feature1.title": "TOEFL ETS-Style Simulation",
    "whyChooseUs.feature1.desc": "Format, timer, difficulty similar to ETS.",
    "whyChooseUs.feature2.title": "Expert Explanation",
    "whyChooseUs.feature2.desc": "Understand concepts, don't memorize.",
    "whyChooseUs.feature3.title": "Smart Tracking",
    "whyChooseUs.feature3.desc": "Progress charts & personal reports.",
    "whyChooseUs.feature4.title": "Step-by-Step",
    "whyChooseUs.feature4.desc": "From basic to advanced, build stamina.",
    "whyChooseUs.feature5.title": "Proven Method",
    "whyChooseUs.feature5.desc": "Increase scores up to 600 with experts.",
    "whyChooseUs.feature6.title": "24/7 Access",
    "whyChooseUs.feature6.desc": "Everywhere, free forever!",

    // CTA
    "cta.title": "Ready to Ace the TOEFL?",
    "cta.subtitle": "Start practicing today with realistic simulations and detailed feedback. Your target score is within reach.",
    "cta.button": "Start Free Practice Now",

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
