import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, User, ArrowRight, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const getLocalizedArticles = (t: (key: string) => string, lang: string) => {
  if (lang === "id") {
    return [
      {
        id: 1,
        title: "10 Strategi Penting TOEFL Reading untuk 2024",
        excerpt: "Kuasai bagian reading dengan strategi terbukti yang digunakan oleh peraih skor tinggi. Pelajari cara mengelola waktu secara efektif dan mengidentifikasi informasi kunci dengan cepat.",
        category: "Tips Membaca",
        author: "Sarah Johnson",
        date: "20 Des 2024",
        readTime: "8 menit baca",
        image: "📚",
      },
      {
        id: 2,
        title: "Cara Meningkatkan Skor Listening Anda Hingga 10 Poin",
        excerpt: "Temukan teknik untuk meningkatkan pemahaman mendengar dan keterampilan mencatat Anda. Berlatihlah dengan metode yang disetujui ahli ini.",
        category: "Tips Mendengar",
        author: "Michael Chen",
        date: "18 Des 2024",
        readTime: "6 menit baca",
        image: "🎧",
      },
      {
        id: 3,
        title: "Kesalahan Tata Bahasa Umum yang Harus Dihindari di TOEFL",
        excerpt: "Pelajari kesalahan tata bahasa yang paling sering merugikan peserta tes poin berharga. Hindari jebakan umum ini untuk memaksimalkan skor Anda.",
        category: "Tips Struktur",
        author: "Emily Roberts",
        date: "15 Des 2024",
        readTime: "5 menit baca",
        image: "✍️",
      },
      {
        id: 4,
        title: "Templat Menulis TOEFL yang Benar-benar Bekerja",
        excerpt: "Gunakan templat terbukti ini untuk menyusun tugas menulis independen dan terintegrasi Anda. Termasuk contoh nyata dari esai dengan skor tinggi.",
        category: "Tips Menulis",
        author: "David Park",
        date: "12 Des 2024",
        readTime: "10 menit baca",
        image: "📝",
      },
      {
        id: 5,
        title: "Bagian Speaking: Atasi Kegugupan dan Berbicaralah dengan Percaya Diri",
        excerpt: "Pelajari teknik untuk mengelola kecemasan tes dan memberikan tanggapan yang jelas dan percaya diri di bagian speaking.",
        category: "Tips Berbicara",
        author: "Lisa Wang",
        date: "10 Des 2024",
        readTime: "7 menit baca",
        image: "🎤",
      },
      {
        id: 6,
        title: "Memahami Skor TOEFL: Apa yang Sebenarnya Diinginkan Universitas",
        excerpt: "Pahami persyaratan skor TOEFL dan pelajari seperti apa skor kompetitif untuk universitas top di seluruh dunia.",
        category: "Umum",
        author: "James Miller",
        date: "8 Des 2024",
        readTime: "4 menit baca",
        image: "🎯",
      },
    ];
  }
  return [
    {
      id: 1,
      title: "10 Essential TOEFL Reading Strategies for 2024",
      excerpt: "Master the reading section with these proven strategies used by high scorers. Learn how to manage your time effectively and identify key information quickly.",
      category: "Reading Tips",
      author: "Sarah Johnson",
      date: "Dec 20, 2024",
      readTime: "8 min read",
      image: "📚",
    },
    {
      id: 2,
      title: "How to Improve Your Listening Score by 10 Points",
      excerpt: "Discover techniques to enhance your listening comprehension and note-taking skills. Practice with these expert-approved methods.",
      category: "Listening Tips",
      author: "Michael Chen",
      date: "Dec 18, 2024",
      readTime: "6 min read",
      image: "🎧",
    },
    {
      id: 3,
      title: "Common Grammar Mistakes to Avoid on TOEFL",
      excerpt: "Learn the most frequent grammar errors that cost test-takers valuable points. Avoid these common pitfalls to maximize your score.",
      category: "Structure Tips",
      author: "Emily Roberts",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      image: "✍️",
    },
    {
      id: 4,
      title: "TOEFL Writing Templates That Actually Work",
      excerpt: "Use these proven templates to structure your independent and integrated writing tasks. Includes real examples from high-scoring essays.",
      category: "Writing Tips",
      author: "David Park",
      date: "Dec 12, 2024",
      readTime: "10 min read",
      image: "📝",
    },
    {
      id: 5,
      title: "Speaking Section: Overcome Nervousness and Speak Confidently",
      excerpt: "Learn techniques to manage test anxiety and deliver clear, confident responses in the speaking section.",
      category: "Speaking Tips",
      author: "Lisa Wang",
      date: "Dec 10, 2024",
      readTime: "7 min read",
      image: "🎤",
    },
    {
      id: 6,
      title: "Understanding TOEFL Scores: What Universities Really Want",
      excerpt: "Decode TOEFL score requirements and learn what competitive scores look like for top universities worldwide.",
      category: "General",
      author: "James Miller",
      date: "Dec 8, 2024",
      readTime: "4 min read",
      image: "🎯",
    },
  ];
};

export default function Blog() {
  const [isDark, setIsDark] = useState(false);
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(t("blog.categories.all"));
  const [searchQuery, setSearchQuery] = useState("");

  const articles = getLocalizedArticles(t, language);
  const categories = [
    t("blog.categories.all"),
    t("blog.categories.reading"),
    t("blog.categories.listening"),
    t("blog.categories.structure"),
    t("blog.categories.writing"),
    t("blog.categories.speaking"),
    t("blog.categories.general")
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
    // Update selected category when language changes
    setSelectedCategory(t("blog.categories.all"));
  }, [language, t]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newValue;
    });
  };

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === t("blog.categories.all") || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">TOEFL Rocket</span>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Link to="/dashboard">
              <Button variant="hero">{t("nav.startPractice")}</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("blog.title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                {t("blog.subtitle")}
              </p>

              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("blog.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card variant="interactive" className="h-full">
                    <CardContent className="p-6">
                      <div className="text-5xl mb-4">{article.image}</div>
                      <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-3">
                        {article.category}
                      </span>
                      <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("blog.noResults")}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
