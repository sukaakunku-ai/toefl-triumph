import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Clock, User, ArrowRight, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Footer } from "@/components/Footer";

const articles = [
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

const categories = ["All", "Reading Tips", "Listening Tips", "Structure Tips", "Writing Tips", "Speaking Tips", "General"];

export default function Blog() {
  const [isDark, setIsDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

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
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
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
            <span className="font-bold text-xl text-foreground">TOEFLPrep</span>
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Link to="/dashboard">
              <Button variant="hero">Start Practice</Button>
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
                Study Resources & Tips
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Expert strategies and insights to help you achieve your target TOEFL score
              </p>

              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
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
                <p className="text-muted-foreground">No articles found matching your search.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
