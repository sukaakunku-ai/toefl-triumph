import { Link } from "react-router-dom";
import { Zap, Twitter, Linkedin, Github, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-[#111827] border-t border-slate-800">
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="space-y-8 col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="font-black text-2xl text-white tracking-tighter uppercase">
                TOEFL<span className="text-primary">BLAST</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-bold max-w-xs">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/50 transition-all hover:bg-slate-700"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block"></div>

          <div>
            <h4 className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-8">{t("footer.practice")}</h4>
            <ul className="space-y-4">
              {[
                { label: t("footer.fullSimulation"), href: "/dashboard" },
                { label: t("footer.structure"), href: "/dashboard" },
                { label: t("footer.blog"), href: "/blog" },
                { label: "FAQs", href: "#" },
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.href} className="text-sm text-slate-400 hover:text-primary transition-colors font-bold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-8">COMPANY</h4>
            <ul className="space-y-4">
              {[
                { label: "About Us", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.href} className="text-sm text-slate-400 hover:text-primary transition-colors font-bold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} TOEFL BLAST. {t("footer.rights")}
          </p>
          <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
