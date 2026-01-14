import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const getLocalizedTestimonials = (lang: string) => {
    if (lang === "id") {
        return [
            {
                id: 1,
                name: "Rizky Pratama",
                role: "Skor Naik Drastis",
                content: "Wah gila sih, skor TOEFL saya naik 80 poin setelah latihan sebulan di TOEFL Jagoan. Interface-nya enak banget buat belajar dan gak ngebosenin!",
                rating: 5,
                color: "bg-orange-50 text-orange-600",
            },
            {
                id: 2,
                name: "Anisa Putri",
                role: "Belajar Jadi Seru",
                content: "Gak kerasa belajar TOEFL berjam-jam karena fiturnya seru kayak main game. Penjelasannya juga gampang dimengerti buat yang masih pemula.",
                rating: 5,
                color: "bg-blue-50 text-blue-600",
            },
            {
                id: 3,
                name: "Dimas Wijaya",
                role: "Simulasi Mantap",
                content: "Simulasinya beneran mirip tes asli. Waktunya presisi dan bikin kita terbiasa dengan tekanan saat tes sesungguhnya. Sangat worth it!",
                rating: 5,
                color: "bg-purple-50 text-purple-600",
            },
            {
                id: 4,
                name: "Larasati Indah",
                role: "Full Gratis 100%",
                content: "Awalnya skeptis kok ada yang gratis sebagus ini. Ternyata fiturnya lengkap banget dari Listening sampe Structure tanpa biaya sepeserpun.",
                rating: 5,
                color: "bg-red-50 text-red-600",
            },
            {
                id: 5,
                name: "Budi Santoso",
                role: "Praktis & Cepat",
                content: "Sangat praktis buat yang sibuk kerja. Bisa latihan lewat HP pas lagi istirahat. Gak perlu ribet daftar, langsung gas!",
                rating: 5,
                color: "bg-green-50 text-green-600",
            },
            {
                id: 6,
                name: "Siti Aminah",
                role: "Materi Akurat",
                content: "Bank soalnya banyak banget dan up-to-date. Penjelasan jawabannya sangat membantu memahami pola soal yang sering keluar di TOEFL.",
                rating: 5,
                color: "bg-amber-50 text-amber-600",
            },
        ];
    }
    return [
        {
            id: 1,
            name: "Rizky Pratama",
            role: "Score Boosted",
            content: "Wow, my TOEFL score jumped 80 points after practicing at TOEFL Jagoan for a month. The interface is really nice and not boring at all!",
            rating: 5,
            color: "bg-orange-50 text-orange-600",
        },
        {
            id: 2,
            name: "Anisa Putri",
            role: "Fun Learning",
            content: "I didn't realize I'd been studying for hours because the features at TOEFL Jagoan are as fun as playing a game. Explanations are easy to understand for beginners.",
            rating: 5,
            color: "bg-blue-50 text-blue-600",
        },
        {
            id: 3,
            name: "Dimas Wijaya",
            role: "Great Simulation",
            content: "The TOEFL Jagoan simulation is exactly like the real test. The timing is precise and gets you used to the pressure of the actual exam. Totally worth it!",
            rating: 5,
            color: "bg-purple-50 text-purple-600",
        },
        {
            id: 4,
            name: "Larasati Indah",
            role: "100% Free Forever",
            content: "I was skeptical at first about a free platform being this good. Turns out TOEFL Jagoan is fully featured from Listening to Structure without any cost.",
            rating: 5,
            color: "bg-red-50 text-red-600",
        },
        {
            id: 5,
            name: "Budi Santoso",
            role: "Fast & Practical",
            content: "Extremely practical for busy workers. Can practice via phone during breaks at TOEFL Jagoan. No complicated sign-ups, just jump straight in!",
            rating: 5,
            color: "bg-green-50 text-green-600",
        },
        {
            id: 6,
            name: "Siti Aminah",
            role: "Accurate Content",
            content: "The question bank is huge and up-to-date. The answer explanations at TOEFL Jagoan really help in understanding the common patterns in TOEFL exams.",
            rating: 5,
            color: "bg-amber-50 text-amber-600",
        },
    ];
};

export function Testimonials() {
    const { t, language } = useLanguage();
    const [showAll, setShowAll] = useState(false);
    const testimonials = getLocalizedTestimonials(language);

    const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3);

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
                    <AnimatePresence mode="popLayout">
                        {visibleTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.4, delay: showAll ? 0 : index * 0.1 }}
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
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex justify-center"
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="flex items-center gap-3 px-8 py-3 rounded-full border-2 border-slate-900 font-black text-sm text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-1 active:translate-y-1 active:shadow-none uppercase tracking-widest"
                    >
                        {showAll ? t("testimonials.viewLess") : t("testimonials.viewAll")}
                        {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
