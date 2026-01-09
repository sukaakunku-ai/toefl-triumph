import { Link } from "react-router-dom";
import { BookOpen, Twitter, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">TOEFL Rocket</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t("footer.practice")}</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/dashboard" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                  {t("footer.fullSimulation")}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                  {t("footer.structure")}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                  {t("footer.reading")}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                  {t("footer.listening")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t("footer.resources")}</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/blog" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                  Tips Belajar
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                  Strategi TOEFL
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                  Panduan Skor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">{t("footer.connect")}</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-blue-50 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-blue-50 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/20 hover:bg-blue-50 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-50 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            © {new Date().getFullYear()} TOEFL Rocket. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}

