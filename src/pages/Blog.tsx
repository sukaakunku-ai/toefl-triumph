import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, User, ArrowRight, Search, Moon, Sun, Sparkles, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

const getLocalizedArticles = (t: (key: string) => string, lang: string) => {
  const images = [
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1454165833767-02acd050c3e8?auto=format&fit=crop&q=80&w=800"
  ];

  if (lang === "id") {
    return [
      {
        id: 1,
        title: "10 Strategi Penting TOEFL Reading untuk 2024",
        excerpt: "Kuasai bagian reading dengan strategi terbukti yang digunakan oleh peraih skor tinggi. Pelajari cara mengelola waktu secara efektif.",
        category: "Tips Membaca",
        author: "Sarah Johnson",
        date: "20 Des 2024",
        readTime: "8 mnt",
        image: images[0],
      },
      {
        id: 2,
        title: "Cara Meningkatkan Skor Listening Anda Hingga 10 Poin",
        excerpt: "Temukan teknik untuk meningkatkan pemahaman mendengar dan keterampilan mencatat Anda. Berlatihlah dengan metode ahli.",
        category: "Tips Mendengar",
        author: "Michael Chen",
        date: "18 Des 2024",
        readTime: "6 mnt",
        image: images[1],
      },
      {
        id: 3,
        title: "Kesalahan Tata Bahasa Umum yang Harus Dihindari di TOEFL",
        excerpt: "Pelajari kesalahan tata bahasa yang paling sering merugikan peserta tes poin berharga. Hindari jebakan umum ini.",
        category: "Tips Struktur",
        author: "Emily Roberts",
        date: "15 Des 2024",
        readTime: "5 mnt",
        image: images[2],
      },
      {
        id: 4,
        title: "Templat Menulis TOEFL yang Benar-benar Bekerja",
        excerpt: "Gunakan templat terbukti ini untuk menyusun tugas menulis independen dan terintegrasi Anda.",
        category: "Tips Menulis",
        author: "David Park",
        date: "12 Des 2024",
        readTime: "10 mnt",
        image: images[3],
      },
      {
        id: 5,
        title: "Bagian Speaking: Atasi Kegugupan dan Berbicaralah dengan Percaya Diri",
        excerpt: "Pelajari teknik untuk mengelola kecemasan tes dan memberikan tanggapan yang jelas dan percaya diri.",
        category: "Tips Berbicara",
        author: "Lisa Wang",
        date: "10 Des 2024",
        readTime: "7 mnt",
        image: images[4],
      },
      {
        id: 6,
        title: "Memahami Skor TOEFL: Apa yang Sebenarnya Diinginkan Universitas",
        excerpt: "Pahami persyaratan skor TOEFL dan pelajari seperti apa skor kompetitif untuk universitas top.",
        category: "Umum",
        author: "James Miller",
        date: "8 Des 2024",
        readTime: "4 mnt",
        image: images[5],
      },
    ];
  }
  return [
    {
      id: 1,
      title: "10 Essential TOEFL Reading Strategies for 2024",
      excerpt: "Master the reading section with these proven strategies used by high scorers.",
      category: "Reading Tips",
      author: "Sarah Johnson",
      date: "Dec 20, 2024",
      readTime: "8 min",
      image: images[0],
    },
    {
      id: 2,
      title: "How to Improve Your Listening Score by 10 Points",
      excerpt: "Discover techniques to enhance your listening comprehension and note-taking skills.",
      category: "Listening Tips",
      author: "Michael Chen",
      date: "Dec 18, 2024",
      readTime: "6 min",
      image: images[1],
    },
    {
      id: 3,
      title: "Common Grammar Mistakes to Avoid on TOEFL",
      excerpt: "Learn the most frequent grammar errors that cost test-takers valuable points.",
      category: "Structure Tips",
      author: "Emily Roberts",
      date: "Dec 15, 2024",
      readTime: "5 min",
      image: images[2],
    },
    {
      id: 4,
      title: "TOEFL Writing Templates That Actually Work",
      excerpt: "Use these proven templates to structure your independent and integrated writing tasks.",
      category: "Writing Tips",
      author: "David Park",
      date: "Dec 12, 2024",
      readTime: "10 min",
      image: images[3],
    },
    {
      id: 5,
      title: "Speaking Section: Overcome Nervousness and Speak Confidently",
      excerpt: "Learn techniques to manage test anxiety and deliver clear reactions.",
      category: "Speaking Tips",
      author: "Lisa Wang",
      date: "Dec 10, 2024",
      readTime: "7 min",
      image: images[4],
    },
    {
      id: 6,
      title: "Understanding TOEFL Scores: What Universities Really Want",
      excerpt: "Decode TOEFL score requirements and learn what competitive scores look like.",
      category: "General",
      author: "James Miller",
      date: "Dec 8, 2024",
      readTime: "4 min",
      image: images[5],
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
    <div className="min-h-screen bg-wavy flex flex-col">
      {/* Background ripples */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] ripple -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] ripple -z-10 [animation-delay:2s]" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur-xl border-b border-border transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-black text-xl text-foreground uppercase tracking-tighter">TOEFL Rocket</span>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-primary/10"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Link to="/dashboard">
              <Button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black font-black rounded-xl shadow-[0_4px_0_0_#d97706] transition-all active:translate-y-[2px] active:shadow-none">{t("nav.startPractice")}</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center space-y-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles className="w-3 h-3" />
                Dunia Ilmu & Strategi
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter drop-shadow-sm">
                {t("blog.title")}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                {t("blog.subtitle")}
              </p>

              <div className="max-w-xl mx-auto relative pt-4">
                <Search className="absolute left-7 top-[calc(50%+8px)] -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("blog.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-16 rounded-[32px] border-2 border-primary/20 shadow-lg bg-white/80 dark:bg-black/40 backdrop-blur-md text-lg focus:border-primary transition-all font-medium"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "rounded-2xl px-6 py-2 h-auto text-xs font-black uppercase tracking-widest transition-all",
                    selectedCategory === category
                      ? "bg-primary text-white shadow-[0_4px_0_0_hsl(var(--primary)/0.5)] translate-y-[-2px]"
                      : "bg-white/50 border-white hover:bg-white"
                  )}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card variant="interactive" className="h-full overflow-hidden rounded-[40px] border-4 border-white shadow-xl group bg-white/60 dark:bg-white/5 backdrop-blur-md">
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-primary text-[10px] font-black uppercase tracking-widest shadow-lg border border-primary/10">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-8 space-y-4">
                      <h3 className="text-xl font-black text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2 uppercase tracking-tight">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-medium line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="pt-6 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-xs font-bold text-foreground">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                          <Clock className="w-3.5 h-3.5" />
                          {article.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-24 space-y-4 bg-white/40 rounded-[40px] border-4 border-dashed border-white/60">
                <Rocket className="w-16 h-16 text-muted-foreground/30 mx-auto animate-bounce" />
                <p className="text-xl font-black text-muted-foreground uppercase tracking-widest">{t("blog.noResults")}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
