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
    "hero.title": "Kuasai dengan Percaya Diri",
    "hero.subtitle": "Tingkatkan skor TOEFL Anda dengan latihan soal berkualitas tinggi dan simulasi tes yang realistis.",
    "hero.cta": "Mulai Gratis",
    "hero.secondary": "Pelajari Selengkapnya",

    // How it works
    "howItWorks.title": "Cara Kerjanya",
    "howItWorks.subtitle": "Mulai tingkatkan skor TOEFL Anda dalam tiga langkah sederhana",
    "howItWorks.step1.title": "Pilih Latihan Anda",
    "howItWorks.step1.desc": "Pilih dari simulasi lengkap atau fokus pada bagian tertentu seperti Reading, Listening, atau Structure",
    "howItWorks.step2.title": "Kerjakan Tes",
    "howItWorks.step2.desc": "Jawab pertanyaan di bawah kondisi waktu nyata dengan kemampuan untuk menandai dan meninjau pertanyaan",
    "howItWorks.step3.title": "Tinjau & Tingkatkan",
    "howItWorks.step3.desc": "Dapatkan penjelasan mendetail untuk setiap jawaban dan pantau kemajuan Anda dari waktu ke waktu",

    // Why choose us
    "whyChooseUs.title": "Mengapa Memilih TOEFLPrep?",
    "whyChooseUs.subtitle": "Semua yang Anda butuhkan untuk mencapai target skor TOEFL Anda",
    "whyChooseUs.feature1.title": "Simulasi Realistis",
    "whyChooseUs.feature1.desc": "Berlatihlah dengan pertanyaan yang mencerminkan format dan tingkat kesulitan ujian TOEFL yang sebenarnya.",
    "whyChooseUs.feature2.title": "Penjelasan Detail",
    "whyChooseUs.feature2.desc": "Pahami setiap jawaban dengan penjelasan komprehensif untuk semua pertanyaan.",
    "whyChooseUs.feature3.title": "Pelacakan Kemajuan",
    "whyChooseUs.feature3.desc": "Pantau peningkatan Anda dengan analitik terperinci dan wawasan kinerja.",
    "whyChooseUs.feature4.title": "Latihan Berwaktu",
    "whyChooseUs.feature4.desc": "Bangun stamina mengerjakan tes dengan batasan waktu yang realistis untuk setiap bagian.",
    "whyChooseUs.feature5.title": "Metode Terbukti",
    "whyChooseUs.feature5.desc": "Pelajari strategi yang dikembangkan oleh ahli TOEFL dan peraih skor tinggi.",
    "whyChooseUs.feature6.title": "Latihan di Mana Saja",
    "whyChooseUs.feature6.desc": "Akses tes latihan Anda di perangkat apa pun, kapan pun, di mana pun.",

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
    "hero.students": "10.000+ Siswa",
    "hero.goals": "Mencapai tujuan mereka",
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
    "footer.tagline": "Kuasai TOEFL dengan platform latihan komprehensif kami. Raih skor impian Anda dengan simulasi realistis.",
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
    "hero.title": "Master with Confidence",
    "hero.subtitle": "Boost your TOEFL score with high-quality practice questions and realistic test simulations.",
    "hero.cta": "Get Started Free",
    "hero.secondary": "Learn More",

    // How it works
    "howItWorks.title": "How It Works",
    "howItWorks.subtitle": "Start improving your TOEFL score in three simple steps",
    "howItWorks.step1.title": "Choose Your Practice",
    "howItWorks.step1.desc": "Select from full simulation or focus on specific sections like Reading, Listening, or Structure",
    "howItWorks.step2.title": "Take the Test",
    "howItWorks.step2.desc": "Answer questions under timed conditions with the ability to flag and review questions",
    "howItWorks.step3.title": "Review & Improve",
    "howItWorks.step3.desc": "Get detailed explanations for every answer and track your progress over time",

    // Why choose us
    "whyChooseUs.title": "Why Choose TOEFLPrep?",
    "whyChooseUs.subtitle": "Everything you need to achieve your target TOEFL score",
    "whyChooseUs.feature1.title": "Realistic Simulations",
    "whyChooseUs.feature1.desc": "Practice with questions that mirror the actual TOEFL exam format and difficulty.",
    "whyChooseUs.feature2.title": "Detailed Explanations",
    "whyChooseUs.feature2.desc": "Understand every answer with comprehensive explanations for all questions.",
    "whyChooseUs.feature3.title": "Progress Tracking",
    "whyChooseUs.feature3.desc": "Monitor your improvement with detailed analytics and performance insights.",
    "whyChooseUs.feature4.title": "Timed Practice",
    "whyChooseUs.feature4.desc": "Build test-taking stamina with realistic time constraints for each section.",
    "whyChooseUs.feature5.title": "Proven Methods",
    "whyChooseUs.feature5.desc": "Learn strategies developed by TOEFL experts and high scorers.",
    "whyChooseUs.feature6.title": "Practice Anywhere",
    "whyChooseUs.feature6.desc": "Access your practice tests on any device, anytime, anywhere.",

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
    "hero.students": "10,000+ Students",
    "hero.goals": "Achieved their goals",
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
    "footer.tagline": "Master TOEFL with our comprehensive practice platform. Achieve your dream score with realistic simulations.",
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
