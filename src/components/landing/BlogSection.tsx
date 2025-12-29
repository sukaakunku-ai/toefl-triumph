import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const articles = [
  {
    id: 1,
    title: "10 Essential TOEFL Reading Strategies for 2024",
    excerpt: "Master the reading section with these proven strategies used by high scorers.",
    category: "Reading Tips",
    author: "Sarah Johnson",
    date: "Dec 20, 2024",
    readTime: "8 min read",
    image: "📚",
  },
  {
    id: 2,
    title: "How to Improve Your Listening Score by 10 Points",
    excerpt: "Discover techniques to enhance your listening comprehension and note-taking skills.",
    category: "Listening Tips",
    author: "Michael Chen",
    date: "Dec 18, 2024",
    readTime: "6 min read",
    image: "🎧",
  },
  {
    id: 3,
    title: "Common Grammar Mistakes to Avoid on TOEFL",
    excerpt: "Learn the most frequent grammar errors that cost test-takers valuable points.",
    category: "Structure Tips",
    author: "Emily Roberts",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    image: "✍️",
  },
];

export function BlogSection() {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Study Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Expert tips and strategies to boost your TOEFL preparation
            </p>
          </div>
          <Link to="/blog" className="mt-4 md:mt-0">
            <Button variant="outline" className="gap-2">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card variant="interactive" className="h-full">
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{article.image}</div>
                  <span className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-3">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
