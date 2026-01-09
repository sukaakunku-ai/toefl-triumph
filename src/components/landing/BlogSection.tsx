import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const getLocalizedArticles = (lang: string) => {
  if (lang === "id") {
    return [
      {
        id: 1,
        title: "10 STRATEGI KILLER UNTUK READING SECTION",
        readTime: "8 MIN",
        image: "/blog/reading.png",
        category: "TIPS & TRICKS",
        color: "text-red-600 bg-red-50",
      },
      {
        id: 2,
        title: "CARA BOOST LISTENING SCORE DALAM 7 HARI",
        readTime: "7 MIN",
        image: "/blog/listening.png",
        category: "TECHNIQUES",
        color: "text-blue-600 bg-blue-50",
      },
      {
        id: 3,
        title: "30 DAYS CHALLENGE: TOEFL ROADMAP TO 600+",
        readTime: "12 MIN",
        image: "/blog/roadmap.png",
        category: "GUIDES",
        color: "text-purple-600 bg-purple-50",
      },
    ];
  }
  return [
    {
      id: 1,
      title: "10 KILLER STRATEGIES FOR READING SECTION",
      readTime: "8 MIN",
      image: "/blog/reading.png",
      category: "TIPS & TRICKS",
      color: "text-red-600 bg-red-50",
    },
    {
      id: 2,
      title: "HOW TO BOOST LISTENING SCORE IN 7 DAYS",
      readTime: "7 MIN",
      image: "/blog/listening.png",
      category: "TECHNIQUES",
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: 3,
      title: "30 DAYS CHALLENGE: TOEFL ROADMAP TO 600+",
      readTime: "12 MIN",
      image: "/blog/roadmap.png",
      category: "GUIDES",
      color: "text-purple-600 bg-purple-50",
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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
            FREE LEARNING RESOURCES
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">
            {t("blog.sectionTitle")}
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-tight">
            {t("blog.sectionSubtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 border-slate-900 rounded-[2rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group">
                <div className="aspect-[4/3] relative overflow-hidden border-b-2 border-slate-900">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${article.color}`}>
                    {article.category}
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-6 leading-tight group-hover:text-primary transition-colors uppercase tracking-tight">
                    {article.title}
                  </h3>
                  <Link
                    to={`/blog/${article.id}`}
                    className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-[0.2em] group/link"
                  >
                    READ NOW
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
