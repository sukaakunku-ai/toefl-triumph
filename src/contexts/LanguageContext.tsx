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
    "hero.title": "Raih Skor TOEFL Impianmu dengan Percaya Diri Maksimal!",
    "hero.subtitle": "Bayangkan skor TOEFL tinggi yang membuka pintu kesuksesan studi dan karir internasional. Dengan simulasi tes ETS standar gratis kami, latihan soal premium, dan analisis mendalam, tingkatkan kemampuanmu secara cepat dan efektif – tanpa biaya sepeser pun!",
    "hero.cta": "Mulai Latihan Gratis Sekarang – Raih Skor 100+ dalam Hitungan Minggu!",
    "hero.secondary": "Pelajari Selengkapnya",

    // How it works
    "howItWorks.title": "Cara Mudah Raih Skor TOEFL Tinggi dalam 3 Langkah Sederhana",
    "howItWorks.subtitle": "Siap transformasi kemampuan Bahasa Inggrismu? Ikuti proses kami yang terbukti efektif – gratis dan mudah diakses kapan saja!",
    "howItWorks.step1.title": "Pilih Latihan Personal",
    "howItWorks.step1.desc": "Fokus pada bagian lemahmu seperti Reading, Listening, Speaking, atau Writing – sesuaikan dengan kebutuhanmu untuk hasil maksimal.",
    "howItWorks.step2.title": "Kerjakan Tes Seperti Aslinya",
    "howItWorks.step2.desc": "Jawab soal di bawah tekanan waktu nyata, tandai pertanyaan sulit, dan tinjau jawaban instan untuk belajar dari kesalahan.",
    "howItWorks.step3.title": "Tinjau & Tingkatkan Cepat",
    "howItWorks.step3.desc": "Dapatkan analisis mendalam, tips ahli, dan grafik kemajuan – lihat skor naik secara nyata dalam waktu singkat!",

    // Why choose us
    "whyChooseUs.title": "Kenapa Harus Pilih TOEFLPrep? Karena Kami Bikin Persiapan TOEFL Jadi Mudah, Efektif, dan Gratis!",
    "whyChooseUs.subtitle": "Ribuan siswa sudah membuktikan: Platform kami adalah kunci sukses skor TOEFL tinggi tanpa kursus mahal. Inilah alasan utamanya:",
    "whyChooseUs.feature1.title": "Simulasi Realistis ETS 100%",
    "whyChooseUs.feature1.desc": "Rasakan tekanan ujian asli dengan format soal, timer, dan tingkat kesulitan persis seperti ETS – persiapan terbaik untuk hari H!",
    "whyChooseUs.feature2.title": "Penjelasan Detail Super Lengkap",
    "whyChooseUs.feature2.desc": "Bukan cuma jawaban benar, tapi penjelasan ahli yang bikin konsep melekat selamanya. Pahami, bukan hafal!",
    "whyChooseUs.feature3.title": "Pelacakan Kemajuan Pintar",
    "whyChooseUs.feature3.desc": "Lihat grafik peningkatanmu, identifikasi kelemahan, dan capai target skor lebih cepat – dengan laporan personal yang actionable.",
    "whyChooseUs.feature4.title": "Latihan Bertahap yang Inovatif",
    "whyChooseUs.feature4.desc": "Mulai dari dasar hingga advanced – bangun stamina dan kepercayaan diri dengan simulasi bertingkat yang menyesuaikan levelmu.",
    "whyChooseUs.feature5.title": "Metode Terbukti oleh Ribuan",
    "whyChooseUs.feature5.desc": "Strategi eksklusif dari ahli TOEFL yang sudah membantu siswa naik skor hingga 50 poin – teruji dan efektif!",
    "whyChooseUs.feature6.title": "Akses Fleksibel 24/7",
    "whyChooseUs.feature6.desc": "Latihan di HP, laptop, atau tablet – kapan saja, di mana saja. Persiapan TOEFL tanpa batas, gratis untuk selamanya!",

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
    "hero.students": "Lebih dari 10.000+ Siswa Sudah Berhasil!",
    "hero.goals": "Mereka mencapai skor TOEFL target mereka – sekarang giliranmu untuk bergabung dan sukses!",
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
    "hero.title": "Achieve Your Dream TOEFL Score with Ultimate Confidence!",
    "hero.subtitle": "Imagine a high TOEFL score opening doors to international study and career success. With our free standard ETS-style simulations, premium questions, and in-depth analysis, improve your skills quickly and effectively – at no cost at all!",
    "hero.cta": "Start Free Practice Now – Reach 100+ Score in Weeks!",
    "hero.secondary": "Learn More",

    // How it works
    "howItWorks.title": "The Easy Way to Reach a High TOEFL Score in 3 Simple Steps",
    "howItWorks.subtitle": "Ready to transform your English skills? Follow our proven process – free and easy to access anytime!",
    "howItWorks.step1.title": "Choose Personal Practice",
    "howItWorks.step1.desc": "Focus on your weaknesses like Reading, Listening, Speaking, or Writing – customized to your needs for maximum results.",
    "howItWorks.step2.title": "Take Tests Like the Real Thing",
    "howItWorks.step2.desc": "Answer questions under real-time pressure, flag difficult items, and get instant reviews to learn from mistakes.",
    "howItWorks.step3.title": "Review & Improve Fast",
    "howItWorks.step3.desc": "Get in-depth analysis, expert tips, and progress charts – see your score rise significantly in no time!",

    // Why choose us
    "whyChooseUs.title": "Why Choose TOEFLPrep? Because We Make TOEFL Prep Easy, Effective, and Free!",
    "whyChooseUs.subtitle": "Thousands of students have already proven it: Our platform is the key to high TOEFL scores without expensive courses. Here's why:",
    "whyChooseUs.feature1.title": "100% Realistic ETS Simulation",
    "whyChooseUs.feature1.desc": "Experience actual exam pressure with question formats, timers, and difficulty levels exactly like ETS – best prep for the big day!",
    "whyChooseUs.feature2.title": "Super Detailed & Expert Explanations",
    "whyChooseUs.feature2.desc": "Not just right answers, but expert explanations that make concepts stick forever. Understand, don't memorize!",
    "whyChooseUs.feature3.title": "Smart Progress Tracking",
    "whyChooseUs.feature3.desc": "View your improvement charts, identify weaknesses, and reach your target score faster with actionable personal reports.",
    "whyChooseUs.feature4.title": "Innovative Step-by-Step Practice",
    "whyChooseUs.feature4.desc": "Start from basic to advanced – build stamina and confidence with tiered simulations that adjust to your level.",
    "whyChooseUs.feature5.title": "Proven Method by Thousands",
    "whyChooseUs.feature5.desc": "Exclusive strategies from TOEFL experts that have helped students increase scores by up to 50 points – tested and effective!",
    "whyChooseUs.feature6.title": "Flexible 24/7 Access",
    "whyChooseUs.feature6.desc": "Practice on your phone, laptop, or tablet – anytime, anywhere. Unlimited TOEFL prep, free forever!",

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
    "hero.students": "Over 10,000+ Students Have Already Succeeded!",
    "hero.goals": "They reached their target TOEFL scores – now it's your turn to join and succeed!",
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
