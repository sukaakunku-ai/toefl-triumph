import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const getLocalizedTestimonials = (lang: string) => {
    if (lang === "id") {
        return [
            {
                id: 1,
                name: "Bima Syahrul",
                role: "Praktis & Challenging",
                content: "Platform belajar TOEFL yang praktis dan murah. Sangat bermanfaat karena mudah dan challenging dengan adanya leaderboard. Semoga nanti bisa ditambah challenge yang lebih seru lagi!",
                rating: 5,
                color: "bg-orange-50 text-orange-600",
            },
            {
                id: 2,
                name: "Shelyn",
                role: "Serasa Main Game",
                content: "Belajar TOEFL jadi lebih menyenangkan kayak main game! Perintah soalnya jelas, ada hint-nya, dan kalau salah ada penjelasannya. Sangat pemula friendly dan cocok untuk yang mau mulai belajar TOEFL.",
                rating: 5,
                color: "bg-blue-50 text-blue-600",
            },
            {
                id: 3,
                name: "Dara Mahardika",
                role: "Persiapan Interview",
                content: "TOEFL Triumph ngebantu banget buat latihan TOEFL atau persiapan interview. Pertanyaannya beragam, mudah dimengerti, fiturnya pemula friendly, dan ada gambaran hasilnya yang pasti ngebantu banget.",
                rating: 5,
                color: "bg-purple-50 text-purple-600",
            },
        ];
    }
    return [
        {
            id: 1,
            name: "Bima Syahrul",
            role: "Practical & Challenging",
            content: "Practical and affordable TOEFL learning platform. Very useful because it's easy and challenging with a leaderboard. Hope there will be more exciting challenges later!",
            rating: 5,
            color: "bg-orange-50 text-orange-600",
        },
        {
            id: 2,
            name: "Shelyn",
            role: "Feels Like a Game",
            content: "Learning TOEFL becomes more fun like playing a game! The instructions are clear, there are hints, and explanations when wrong. Very beginner-friendly and perfect for those who want to start learning TOEFL.",
            rating: 5,
            color: "bg-blue-50 text-blue-600",
        },
        {
            id: 3,
            name: "Dara Mahardika",
            role: "Interview Prep",
            content: "TOEFL Triumph helps a lot for TOEFL practice or interview preparation. The questions are diverse, easy to understand, beginner-friendly features, and the results overview definitely helps a lot.",
            rating: 5,
            color: "bg-purple-50 text-purple-600",
        },
    ];
};

export function Testimonials() {
    const { t, language } = useLanguage();
    const testimonials = getLocalizedTestimonials(language);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-[20%] left-[-5%] w-[300px] h-[300px] bg-orange-200/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute bottom-[20%] right-[-5%] w-[300px] h-[300px] bg-red-200/20 rounded-full blur-[80px] -z-10" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                        <Star className="w-3 h-3 fill-white" />
                        {t("testimonials.badge")}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">
                        {t("testimonials.title")}
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-tight">
                        {t("testimonials.subtitle")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card variant="retro" className="h-full relative overflow-visible group">
                                {/* Ribbon Badge */}
                                <div className={`absolute -top-4 left-6 px-4 py-2 rounded-xl border-2 border-slate-900 font-black text-[10px] uppercase tracking-wider z-10 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] ${testimonial.color}`}>
                                    {testimonial.role}
                                </div>

                                <CardContent className="p-8 pt-10">
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    <p className="text-slate-700 font-bold mb-8 leading-relaxed italic">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="pt-6 border-t-2 border-slate-100 flex items-center justify-between">
                                        <span className="text-lg font-black text-slate-900 uppercase tracking-tight">
                                            {testimonial.name}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center"
                >
                    <button className="flex items-center gap-3 px-8 py-3 rounded-full border-2 border-slate-900 font-black text-sm text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-widest">
                        {t("testimonials.viewAll")}
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
