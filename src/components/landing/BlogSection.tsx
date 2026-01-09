import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Book, Headphones, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const getLocalizedArticles = (lang: string) => {
  if (lang === "id") {
    return [
      {
        id: 1,
        title: "10 Strategi Penting TOEFL Reading untuk 2024",
        excerpt: "Kuasai bagian reading dengan strategi terbukti yang digunakan oleh peraih skor tinggi.",
        category: "Tips Membaca",
        author: "Sarah Johnson",
        date: "20 Des 2024",
        readTime: "8 menit baca",
        icon: Book,
        color: "bg-green-50 text-green-600",
        tagColor: "bg-green-50 text-green-600 border-green-100"
      },
      {
        id: 2,
        title: "Cara Meningkatkan Skor Listening Anda Hingga 10 Poin",
        excerpt: "Temukan teknik untuk meningkatkan pemahaman mendengar dan keterampilan mencatat Anda.",
        category: "Tips Mendengar",
        author: "Michael Chen",
        date: "18 Des 2024",
        readTime: "6 menit baca",
        icon: Headphones,
        color: "bg-blue-50 text-blue-600",
        tagColor: "bg-blue-50 text-blue-600 border-blue-100"
      },
      {
        id: 3,
        title: "Kesalahan Tata Bahasa Umum yang Harus Dihindari di TOEFL",
        excerpt: "Pelajari kesalahan tata bahasa yang paling sering merugikan peserta tes poin berharga.",
        category: "Tips Struktur",
        author: "Emily Roberts",
        date: "15 Des 2024",
        readTime: "5 menit baca",
        icon: PenTool,
        color: "bg-orange-50 text-orange-600",
        tagColor: "bg-orange-50 text-orange-600 border-orange-100"
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
      readTime: "8 min read",
      icon: Book,
      color: "bg-green-50 text-green-600",
      tagColor: "bg-green-50 text-green-600 border-green-100"
    },
    {
      id: 2,
      title: "How to Improve Your Listening Score by 10 Points",
      excerpt: "Discover techniques to enhance your listening comprehension and note-taking skills.",
      category: "Listening Tips",
      author: "Michael Chen",
      date: "Dec 18, 2024",
      readTime: "6 min read",
      icon: Headphones,
      color: "bg-blue-50 text-blue-600",
      tagColor: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      id: 3,
      title: "Common Grammar Mistakes to Avoid on TOEFL",
      excerpt: "Learn the most frequent grammar errors that cost test-takers valuable points.",
      category: "Structure Tips",
      author: "Emily Roberts",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      icon: PenTool,
      color: "bg-orange-50 text-orange-600",
      tagColor: "bg-orange-50 text-orange-600 border-orange-100"
    },
  ];
};

export function BlogSection() {
  const { t, language } = useLanguage();
  const articles = getLocalizedArticles(language);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div className="space-y-4 text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              {t("blog.sectionTitle")}
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl font-medium">
              {t("blog.sectionSubtitle")}
            </p>
          </div>
          <Link
            to="/blog"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-slate-900 hover:text-primary transition-colors group"
          >
            {t("blog.viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="interactive" className="h-full border-slate-100 shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl ${article.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <article.icon className="w-8 h-8" />
                  </div>

                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${article.tagColor}`}>
                      {article.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-slate-500 font-medium text-sm mb-8 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-col gap-3 pt-6 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <User className="w-3.5 h-3.5" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

