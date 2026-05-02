// @ts-nocheck
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, X, Globe, Landmark, Coins, Building2, Construction, UserCheck, 
  CheckCircle2, ChevronRight, Phone, Mail, MapPin, Clock, ArrowRight,
  Database, ShieldCheck, LineChart, FileText, Settings, Laptop, BarChart3
} from "lucide-react";
import { translations } from "./translations";
import { COLORS } from "./constants";

// --- Components ---

const Logo = ({ className = "" }) => (
  <img
    src="/logo-avalue.png"
    alt="Avalue Logo"
    className={`h-12 w-auto object-contain ${className}`}
  />
);

const partners = [
  { name: "VCB", logo: "/partners/vcb.png" },
  { name: "BIDV", logo: "/partners/bidv.png" },
  { name: "VIETINBANK", logo: "/partners/vietinbank.png" },
  { name: "AGRIBANK", logo: "/partners/agribank.png" },
  { name: "BWID", logo: "/partners/bw.png" },
  { name: "MSB", logo: "/partners/msb.png" },
  { name: "UBSP", logo: "/partners/ubsp.png" },
  { name: "VAMC", logo: "/partners/vamc.png" },
];

const Navbar = ({ lang, setLang, t }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: t.nav.home, href: "#" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.services, href: "#services" },
    { name: t.nav.assets, href: "#assets" },
    { name: t.nav.insights, href: "#insights" },
    { name: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] bg-white border-b border-border-gray z-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        <a href="#" className="flex items-center">
          <Logo className="h-10 sm:h-12" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[13px] font-bold text-dark hover:text-primary uppercase tracking-wider transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5 text-dark">
            <div className="bg-light-gray px-3 py-1.5 rounded-full flex gap-2 font-bold text-[12px] cursor-pointer">
              <button
                type="button"
                onClick={() => setLang("vi")}
                className={lang === "vi" ? "text-primary" : "text-dark"}
              >
                VI
              </button>
              <span className="text-border-gray">|</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                className={lang === "en" ? "text-primary" : "text-dark"}
              >
                EN
              </button>
            </div>

            <a href="#contact" className="btn-primary whitespace-nowrap">
              {t.nav.request}
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden w-11 h-11 rounded-xl flex items-center justify-center text-dark hover:bg-lightGray transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-border px-5 py-6 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-xl text-base font-bold text-dark hover:text-primary hover:bg-lightGray transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="mt-5 pt-5 border-t border-border flex items-center justify-between gap-4">
              <div className="bg-lightGray rounded-full p-1 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setLang("vi");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full font-bold text-sm ${
                    lang === "vi" ? "bg-white text-primary shadow-sm" : "text-dark"
                  }`}
                >
                  VI
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLang("en");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full font-bold text-sm ${
                    lang === "en" ? "bg-white text-primary shadow-sm" : "text-dark"
                  }`}
                >
                  EN
                </button>
              </div>

              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-primary text-white px-5 py-3 rounded-xl text-center font-bold text-sm"
              >
                {t.nav.request}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }) => (
  <div className={`mb-12 ${centered ? "text-center" : ""}`}>
    <div className={`flex items-center gap-3 mb-4 ${centered ? "justify-center" : ""}`}>
      {!centered && <div className="w-1 h-5 bg-primary" />}
      <motion.h4 
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="text-dark font-bold uppercase tracking-wider text-sm"
      >
        {title}
      </motion.h4>
    </div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-4xl font-bold text-dark leading-tight"
    >
      {subtitle}
    </motion.h2>
  </div>
);

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState("vi");
  const t = translations[lang];
  const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  assetType: "",
  message: "",
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [submitMessage, setSubmitMessage] = useState("");
const [legalModal, setLegalModal] = useState(null);

const handleFormChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmitContact = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.name || !formData.phone) {
  setSubmitMessage(
    lang === "vi"
      ? "Vui lòng nhập họ tên và số điện thoại."
      : "Please enter your full name and phone number."
  );
  return;
}

  setIsSubmitting(true);
  setSubmitMessage("");

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbyNZHaWYS-Ht8jF8eu-7MESIntGXnhQN5pgsPIKsXCHkvmJeskz1p6veyewaxB0OTlZ/exec", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify({
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        assetType: formData.assetType,
        message: formData.message,
      }),
    });

    const result = await response.json();

    if (result.success) {
  setSubmitMessage(
    lang === "vi"
      ? "Yêu cầu tư vấn đã được gửi thành công. Avalue sẽ liên hệ lại sớm."
      : "Your consultation request has been sent successfully. Avalue will contact you soon."
  );
  setFormData({
    name: "",
    phone: "",
    email: "",
    assetType: "",
    message: "",
  });
} else {
  setSubmitMessage(
    lang === "vi"
      ? "Chưa gửi được yêu cầu. Vui lòng thử lại."
      : "Your request could not be sent. Please try again."
  );
}
  } catch (error) {
    setSubmitMessage(
  lang === "vi"
    ? "Có lỗi khi gửi yêu cầu. Vui lòng thử lại sau."
    : "An error occurred while sending your request. Please try again later."
);
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Hero Section */}
<section className="pt-[96px] pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-lightGray">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-5 lg:gap-6">
    {/* Main Hero Panel */}
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="hero-glow bg-dark rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 text-white min-h-[460px] sm:min-h-[520px] flex flex-col justify-center overflow-hidden"
    >
      <h4 className="text-primary font-bold uppercase tracking-[0.22em] text-[11px] sm:text-xs mb-4">
        Valuation Intelligence
      </h4>

      <h1 className="text-[42px] sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 sm:mb-8 max-w-3xl break-words">
        {t.hero.headline}
      </h1>

      <p className="text-accent-silver text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl leading-relaxed">
        {t.hero.subheadline}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        <a
          href="#contact"
          className="w-full sm:w-auto text-center bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wide transition-colors"
        >
          {t.hero.ctaPrimary}
        </a>

        <a
          href="#capabilities"
          className="w-full sm:w-auto text-center border border-white/20 hover:border-white/50 text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wide transition-colors"
        >
          {t.hero.ctaSecondary}
        </a>
      </div>
    </motion.div>

    {/* Sidebar Services Panel */}
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white rounded-3xl border border-border-gray p-5 sm:p-6 lg:p-8 flex flex-col h-full overflow-hidden"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-7 bg-primary" />
        <h3 className="font-bold uppercase text-sm sm:text-base tracking-wider text-dark">
          {t.services.title}
        </h3>
      </div>

      <div className="space-y-2 flex-1">
        {t.services.items.slice(0, 5).map((service, idx) => (
          <div
            key={idx}
            className="group p-4 border-b border-light-gray last:border-b-0 hover:bg-lightGray transition-colors cursor-pointer rounded-2xl"
          >
            <div className="flex gap-4 items-start">
              <div className="w-11 h-11 bg-primary/5 rounded-xl flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                {idx === 0 ? <Building2 size={21} /> : <ShieldCheck size={21} />}
              </div>

              <div className="min-w-0">
                <h4 className="font-bold text-base text-dark mb-1 leading-snug">
                  {service.title}
                </h4>
                <p className="text-sm text-silver leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border-gray">
        <h4 className="font-bold text-[10px] uppercase text-silver tracking-widest mb-4">
          Trusted Partners
        </h4>

        <div className="partners-marquee">
          <div className="partners-track">
            {[...partners, ...partners].map((partner, index) => (
              <div className="partner-logo-item" key={`${partner.name}-${index}`}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="partner-logo-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>

{/* Stats + Technology Panel */}
<section id="tech-summary" className="pb-12 sm:pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-lightGray">
  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_500px] gap-5 lg:gap-6">
    <div className="bg-white rounded-3xl border border-border-gray p-6 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
        {t.hero.stats.slice(0, 3).map((stat, idx) => (
          <div
            key={idx}
            className="text-center border-b sm:border-b-0 sm:border-r border-border-gray last:border-0 pb-5 sm:pb-0 sm:pr-6 last:pr-0"
          >
            <div className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-none mb-3">
              {stat.value}
            </div>
            <div className="text-xs sm:text-[11px] md:text-xs font-bold uppercase text-dark tracking-widest leading-relaxed">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="terminal-box rounded-3xl min-h-[220px] p-6 sm:p-8 lg:p-10 flex flex-col justify-center overflow-hidden">
      <div className="text-sm sm:text-base leading-relaxed break-words">
        <div>{"> INITIALIZING AVALUE_INTEL"}</div>
        <div>{"> SEARCHING ASSET_ID: 992-B"}</div>
        <div>{"> ANALYSIS COMPLETE"}</div>
        <div>{"> ACCURACY: 99.82%"}</div>
        <div>{"> SLA: 24h TARGET MET"}</div>
      </div>

      <div className="mt-6 bg-green-400 h-1.5 w-4/5 max-w-full"></div>
      <div className="mt-1.5 bg-green-400/50 h-1.5 w-2/5 max-w-full"></div>

      <div className="mt-8 text-white font-bold text-xl sm:text-2xl tracking-wider">
        A-PLATFORM v2.1
      </div>
    </div>
  </div>
</section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading title={t.about.title} subtitle="Valuation Intelligence" />
              <p className="text-lg text-charcoal mb-8 leading-relaxed italic">
                "{t.about.description}"
              </p>
              <div className="space-y-4">
                {t.about.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-primary" />
                    </div>
                    <span className="font-medium text-dark">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/593717837_1154537293464158_6867897628852378406_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_ohc=Kmw03cJExJ0Q7kNvwEAm_aR&_nc_oc=AdoZ9n1fxwqwuIZhtqqk4P0-bwSbe9K6QckXBpaJzZ1wnwQIEWZyBqy7qnw3YFbGeCY&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=JNVjYgTiLH3nnoNQjhQfEw&_nc_ss=7b2a8&oh=00_Af6b9Yto_LaxGqCaOn_h2bp6D2V_KKgXZUZa5nDhUKzNyQ&oe=69FA9C77" 
                  alt="Avalue Professionalism" 
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-lightGray relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading title={t.services.title} subtitle={t.services.description} centered />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.items.map((service, idx) => {
              const icons = [Building2, Settings, ShieldCheck, BarChart3, LineChart, FileText, Globe, Laptop];
              const IconComp = icons[idx];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-border/50 hover:border-primary/20 flex flex-col h-full"
                >
                  <div className="w-14 h-14 bg-lightGray group-hover:bg-primary group-hover:text-white rounded-lg flex items-center justify-center transition-all mb-6">
                    <IconComp size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-dark group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-silver text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>
                  <a
  href="#contact"
  className="inline-flex items-center gap-2 text-dark font-bold text-xs uppercase tracking-wider group-hover:gap-4 transition-all"
>
  {lang === "vi" ? "Tìm hiểu thêm" : "Learn more"}
  <ChevronRight size={14} className="text-primary" />
</a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Asset Types Section */}
      <section id="assets" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading title={t.assets.title} subtitle={t.assets.subtitle} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.assets.items.map((asset, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-lg"
              >
                <img src={asset.image} alt={asset.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h4 className="text-white text-xl font-bold">{asset.name}</h4>
                  <div className="h-1 w-0 bg-primary mt-2 transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 bg-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h4 className="text-primary font-bold uppercase tracking-widest text-xs mb-3">{t.process.title}</h4>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                {lang === "vi"
                  ? "Xây dựng uy tín qua quy trình chuẩn mực"
                  : "Building trust through a standardized process"}
              </h2>
            </div>
            <div className="hidden md:block">
              <img
                src="/logo-avalue-white.png"
                alt="Avalue Logo"
                className="h-16 w-auto object-contain opacity-90"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-0 relative">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 hidden md:block" />
            {t.process.steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-0"
              >
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center font-bold text-primary mb-8 relative z-10">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.name}</h3>
                <p className="text-silver text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="tech" className="py-24 bg-lightGray overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2">
              <SectionHeading title={t.tech.title} subtitle={t.tech.description} />
              <div className="space-y-6">
                {t.tech.features.map((feat, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-primary">
                    <Database size={20} className="text-primary flex-shrink-0" />
                    <span className="font-semibold text-dark text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-3 relative">
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white p-4 rounded-2xl shadow-2xl border border-border"
              >
                {/* Mock UI Dashboard */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="h-4 w-40 bg-lightGray rounded ml-4" />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="h-20 bg-primary/5 rounded-xl border border-primary/10 p-4">
                    <div className="h-2 w-12 bg-primary/20 rounded mb-2" />
                    <div className="h-4 w-full bg-primary/40 rounded" />
                  </div>
                  <div className="h-20 bg-dark/5 rounded-xl border border-dark/10 p-4">
                    <div className="h-2 w-12 bg-silver/20 rounded mb-2" />
                    <div className="h-4 w-full bg-dark/40 rounded" />
                  </div>
                  <div className="h-20 bg-green-50 rounded-xl border border-green-100 p-4">
                    <div className="h-2 w-12 bg-green-200 rounded mb-2" />
                    <div className="h-4 w-full bg-green-500/40 rounded" />
                  </div>
                </div>
                <div className="space-y-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="flex items-center justify-between p-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-lightGray" />
                        <div className="space-y-1">
                          <div className="h-2 w-32 bg-silver/20 rounded" />
                          <div className="h-1.5 w-20 bg-silver/10 rounded" />
                        </div>
                      </div>
                      <div className="h-3 w-12 bg-primary/10 rounded-full" />
                    </div>
                  ))}
                </div>
              </motion.div>
              {/* Floatings */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 bg-primary text-white p-6 rounded-2xl shadow-xl hidden md:block"
              >
                <LineChart size={32} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="bg-dark rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
            <div className="relative z-10 grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  {lang === "vi" ? (
                    <>
                      Sứ mệnh tạo dựng <span className="text-primary">giá trị thật</span> cho thị trường
                    </>
                  ) : (
                    <>
                      Building <span className="text-primary">true value</span> for the market
                    </>
                  )}
                </h2>
                <p className="text-silver text-lg mb-1">
                  {t.hero.subheadline}
                </p>
                <img
                  src="/logo-avalue-white.png"
                  alt="Avalue Logo"
                  className="h-16 w-auto object-contain opacity-90 -mt-30"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                {t.why.points.map((point, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <CheckCircle2 size={24} className="text-primary flex-shrink-0" />
                    <span className="text-white font-medium text-sm md:text-base leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section id="insights" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-16">
            <SectionHeading title={t.insights.title} subtitle="Valuation Insights" />
            <a href="#" className="hidden md:flex items-center gap-2 text-primary font-bold mb-16">
              {lang === "vi" ? "Xem toàn bộ" : "View all"} <ArrowRight size={18} />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {t.insights.items.map((post, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group border border-border rounded-2xl overflow-hidden"
              >
                <div className="h-56 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">{post.category}</span>
                  <h3 className="text-xl font-bold mt-3 mb-6 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                  <div className="flex items-center gap-2 text-dark font-bold text-sm">
                    {lang === 'vi' ? 'Đọc bài viết' : 'Read article'} <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
<section id="contact" className="py-24 bg-lightGray">
  <div className="max-w-7xl mx-auto px-4 md:px-8">
    <div className="grid lg:grid-cols-2 gap-20">
      <div>
        <SectionHeading
          title={t.contact.title}
          subtitle={lang === "vi" ? "Bắt đầu liên hệ Avalue" : "Start your project with Avalue"}
        />

        <div className="space-y-10 mt-12">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 text-primary">
              <Phone size={24} />
            </div>
            <div>
              <h5 className="font-bold text-silver uppercase text-xs tracking-widest mb-1">
                Hotline
              </h5>
              <p className="text-2xl font-bold text-dark">{t.contact.info.hotline}</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 text-primary">
              <Mail size={24} />
            </div>
            <div>
              <h5 className="font-bold text-silver uppercase text-xs tracking-widest mb-1">
                Email
              </h5>
              <p className="text-xl font-bold text-dark">{t.contact.info.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <h5 className="font-bold text-silver uppercase text-xs tracking-widest mb-1">
                {lang === "vi" ? "Địa chỉ" : "Address"}
              </h5>
              <p className="font-medium text-dark max-w-xs">{t.contact.info.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 text-primary">
              <Clock size={24} />
            </div>
            <div>
              <h5 className="font-bold text-silver uppercase text-xs tracking-widest mb-1">
                {lang === "vi" ? "Thời gian làm việc" : "Working Hours"}
              </h5>
              <p className="font-medium text-dark">{t.contact.info.hours}</p>
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmitContact}
        className="bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-border"
      >
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-silver tracking-wider">
              {t.contact.form.name}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full bg-lightGray border border-border rounded-lg p-4 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-silver tracking-wider">
              {t.contact.form.phone}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              className="w-full bg-lightGray border border-border rounded-lg p-4 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase text-silver tracking-wider">
              {t.contact.form.email}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full bg-lightGray border border-border rounded-lg p-4 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase text-silver tracking-wider">
              {t.contact.form.assetType}
            </label>
            <select
              name="assetType"
              value={formData.assetType}
              onChange={handleFormChange}
              className="w-full bg-lightGray border border-border rounded-lg p-4 focus:outline-none focus:border-primary transition-all"
            >
              <option value="">-</option>
              <option value={lang === "vi" ? "BĐS Dân dụng" : "Residential Real Estate"}>
                {lang === "vi" ? "BĐS Dân dụng" : "Residential Real Estate"}
              </option>
              <option value={lang === "vi" ? "BĐS Công nghiệp" : "Industrial Real Estate"}>
                {lang === "vi" ? "BĐS Công nghiệp" : "Industrial Real Estate"}
              </option>
              <option value={lang === "vi" ? "Máy móc thiết bị" : "Machinery and Equipment"}>
                {lang === "vi" ? "Máy móc thiết bị" : "Machinery and Equipment"}
              </option>
              <option value={lang === "vi" ? "Định giá doanh nghiệp" : "Business Valuation"}>
                {lang === "vi" ? "Định giá doanh nghiệp" : "Business Valuation"}
              </option>
            </select>
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase text-silver tracking-wider">
              {t.contact.form.message}
            </label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              className="w-full bg-lightGray border border-border rounded-lg p-4 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="sm:col-span-2 bg-primary hover:bg-primary-dark text-white py-5 rounded-lg font-bold text-lg transition-all shadow-xl shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? lang === "vi"
                ? "Đang gửi..."
                : "Sending..."
              : t.contact.form.submit}
          </button>

          {submitMessage && (
            <p className="sm:col-span-2 mt-2 text-sm font-semibold text-primary">
              {submitMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  </div>
</section>

{/* Legal Modal */}
<AnimatePresence>
  {legalModal && (
    <motion.div
      className="fixed inset-0 z-[120] bg-dark/80 backdrop-blur-sm overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="min-h-screen px-4 py-8 sm:py-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden"
        >
          <div className="sticky top-0 bg-white border-b border-border px-6 sm:px-10 py-5 flex items-center justify-between gap-4 z-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark">
                {legalModal === "privacy"
                  ? "Chính sách bảo mật thông tin"
                  : "Điều khoản dịch vụ"}
              </h2>
              <p className="text-sm text-silver mt-1">
                Cập nhật lần cuối: 02/05/2026
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="w-11 h-11 rounded-full bg-lightGray text-dark flex items-center justify-center hover:bg-primary hover:text-white transition-colors flex-shrink-0"
              aria-label="Close legal modal"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 sm:p-10 lg:p-12 text-charcoal leading-relaxed">
            {legalModal === "privacy" ? (
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">1. Mục đích của chính sách</h3>
                  <p>
                    Chính sách bảo mật này mô tả cách Avalue thu thập, sử dụng, lưu trữ, bảo vệ và xử lý
                    thông tin cá nhân của khách hàng, đối tác và người dùng khi truy cập website, gửi yêu cầu
                    tư vấn, yêu cầu thẩm định giá hoặc tương tác với các kênh trực tuyến của Avalue.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">2. Thông tin chúng tôi có thể thu thập</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Họ và tên, số điện thoại, email, tổ chức/doanh nghiệp.</li>
                    <li>Thông tin về loại tài sản cần thẩm định, vị trí tài sản và nội dung yêu cầu tư vấn.</li>
                    <li>Thông tin kỹ thuật cơ bản như địa chỉ IP, loại thiết bị, trình duyệt, thời gian truy cập và hành vi sử dụng website.</li>
                    <li>Các thông tin khác do người dùng chủ động cung cấp cho Avalue trong quá trình liên hệ hoặc sử dụng dịch vụ.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">3. Mục đích sử dụng thông tin</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Liên hệ, phản hồi và tư vấn theo yêu cầu của khách hàng.</li>
                    <li>Tiếp nhận, phân loại và xử lý nhu cầu thẩm định giá hoặc tư vấn tài sản.</li>
                    <li>Cải thiện chất lượng dịch vụ, trải nghiệm người dùng và hiệu quả vận hành website.</li>
                    <li>Thực hiện các nghĩa vụ pháp lý, tuân thủ quy định về bảo vệ dữ liệu cá nhân, an toàn thông tin và quản trị rủi ro.</li>
                    <li>Gửi thông tin dịch vụ, tài liệu chuyên môn hoặc thông báo liên quan nếu người dùng đồng ý hoặc pháp luật cho phép.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">4. Chia sẻ thông tin</h3>
                  <p>
                    Avalue không bán, trao đổi hoặc cho thuê thông tin cá nhân của người dùng cho bên thứ ba.
                    Thông tin chỉ có thể được chia sẻ cho nhân sự, chi nhánh, cộng tác viên, nhà cung cấp hạ tầng kỹ thuật
                    hoặc cơ quan có thẩm quyền trong trường hợp cần thiết để xử lý yêu cầu dịch vụ, vận hành hệ thống,
                    tuân thủ pháp luật hoặc bảo vệ quyền và lợi ích hợp pháp của Avalue.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">5. Lưu trữ và bảo mật thông tin</h3>
                  <p>
                    Avalue áp dụng các biện pháp quản lý, kỹ thuật và tổ chức phù hợp để bảo vệ thông tin khỏi
                    truy cập trái phép, mất mát, lạm dụng, thay đổi hoặc tiết lộ ngoài ý muốn. Thời gian lưu trữ
                    thông tin phụ thuộc vào mục đích xử lý, yêu cầu nghiệp vụ, nghĩa vụ pháp lý và chính sách lưu trữ
                    nội bộ của Avalue.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">6. Quyền của người dùng</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Yêu cầu cung cấp thông tin về việc xử lý dữ liệu cá nhân của mình.</li>
                    <li>Yêu cầu chỉnh sửa, cập nhật hoặc bổ sung thông tin chưa chính xác.</li>
                    <li>Rút lại sự đồng ý xử lý dữ liệu cá nhân trong trường hợp pháp luật cho phép.</li>
                    <li>Yêu cầu xóa, hạn chế xử lý hoặc phản đối việc xử lý dữ liệu cá nhân.</li>
                    <li>Gửi khiếu nại hoặc phản ánh liên quan đến việc bảo vệ dữ liệu cá nhân.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">7. Cookie và công nghệ theo dõi</h3>
                  <p>
                    Website có thể sử dụng cookie hoặc công nghệ tương tự để ghi nhớ tùy chọn người dùng,
                    phân tích lưu lượng truy cập, cải thiện hiệu suất website và nâng cao trải nghiệm sử dụng.
                    Người dùng có thể điều chỉnh cài đặt trình duyệt để từ chối cookie.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">8. Liên hệ về bảo mật thông tin</h3>
                  <p>
                    Nếu có câu hỏi, yêu cầu hoặc khiếu nại liên quan đến chính sách bảo mật, người dùng có thể
                    liên hệ Avalue qua email: <strong>dungdq@avalue.vn</strong> hoặc hotline:
                    <strong> 0934 256 969</strong>.
                  </p>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">1. Phạm vi áp dụng</h3>
                  <p>
                    Điều khoản dịch vụ này áp dụng cho việc người dùng truy cập website Avalue, gửi yêu cầu tư vấn,
                    yêu cầu thẩm định giá, đọc nội dung chuyên môn hoặc sử dụng các tiện ích trực tuyến được cung cấp
                    trên website.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">2. Chấp thuận điều khoản</h3>
                  <p>
                    Khi truy cập hoặc sử dụng website, người dùng được hiểu là đã đọc, hiểu và đồng ý tuân thủ các
                    điều khoản này. Nếu không đồng ý, người dùng nên ngừng truy cập hoặc không tiếp tục sử dụng các
                    chức năng trên website.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">3. Nội dung trên website</h3>
                  <p>
                    Các thông tin, bài viết, tài liệu hoặc nhận định trên website được cung cấp nhằm mục đích tham khảo,
                    giới thiệu dịch vụ và chia sẻ kiến thức chuyên môn. Các nội dung này không được xem là chứng thư
                    thẩm định giá, báo cáo tư vấn chính thức, ý kiến pháp lý hoặc cam kết kết quả trong từng hồ sơ cụ thể.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">4. Yêu cầu tư vấn và thẩm định giá</h3>
                  <p>
                    Khi gửi thông tin qua biểu mẫu liên hệ, người dùng cam kết cung cấp thông tin trung thực, chính xác
                    và có quyền cung cấp các thông tin đó. Việc gửi biểu mẫu không tự động tạo lập hợp đồng dịch vụ,
                    trừ khi hai bên có thỏa thuận hoặc văn bản xác nhận riêng.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">5. Trách nhiệm của người dùng</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Không sử dụng website cho mục đích trái pháp luật, gian lận hoặc xâm phạm quyền lợi của bên thứ ba.</li>
                    <li>Không gửi thông tin sai lệch, giả mạo, gây hiểu nhầm hoặc chứa mã độc.</li>
                    <li>Không can thiệp, tấn công, làm gián đoạn hoặc cố gắng truy cập trái phép vào hệ thống website.</li>
                    <li>Không sao chép, khai thác hoặc sử dụng nội dung website cho mục đích thương mại khi chưa được Avalue chấp thuận.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">6. Quyền sở hữu trí tuệ</h3>
                  <p>
                    Toàn bộ giao diện, nội dung, hình ảnh, biểu tượng, nhãn hiệu, dữ liệu, bài viết và tài liệu trên
                    website thuộc quyền sở hữu hoặc quyền sử dụng hợp pháp của Avalue, trừ khi có ghi chú khác. Người dùng
                    không được sao chép, chỉnh sửa, phân phối, tái xuất bản hoặc khai thác thương mại các nội dung này nếu
                    chưa có sự đồng ý bằng văn bản của Avalue.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">7. Giới hạn trách nhiệm</h3>
                  <p>
                    Avalue nỗ lực bảo đảm thông tin trên website chính xác và cập nhật, tuy nhiên không cam kết rằng mọi
                    nội dung luôn đầy đủ, không có sai sót hoặc phù hợp với mọi mục đích sử dụng. Avalue không chịu trách
                    nhiệm đối với thiệt hại phát sinh từ việc người dùng tự ý sử dụng thông tin trên website mà không có
                    tư vấn, xác nhận hoặc thỏa thuận dịch vụ chính thức.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">8. Luật áp dụng và giải quyết tranh chấp</h3>
                  <p>
                    Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp phát sinh liên quan đến việc
                    truy cập hoặc sử dụng website sẽ được ưu tiên giải quyết thông qua thương lượng thiện chí. Trường hợp
                    không thể giải quyết bằng thương lượng, tranh chấp sẽ được xử lý theo quy định pháp luật có thẩm quyền
                    tại Việt Nam.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-dark mb-3">9. Liên hệ</h3>
                  <p>
                    Mọi câu hỏi liên quan đến điều khoản dịch vụ có thể gửi về email:
                    <strong> dungdq@avalue.vn</strong> hoặc hotline: <strong>0934 256 969</strong>.
                  </p>
                </section>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      {/* Footer */}
<footer className="bg-white border-t border-border-gray px-4 sm:px-6 lg:px-10 py-4 text-[11px] text-silver font-bold uppercase tracking-widest">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    <div>&copy; 2026 Avalue Valuation Intelligence. All Rights Reserved. DESIGN BY KESO</div>

    <div className="flex gap-6">
      <button
        type="button"
        onClick={() => setLegalModal("privacy")}
        className="hover:text-primary transition-colors"
      >
        Privacy Policy
      </button>

      <button
        type="button"
        onClick={() => setLegalModal("terms")}
        className="hover:text-primary transition-colors"
      >
        Terms of Service
      </button>
    </div>
  </div>
</footer>

      {/* Floating CTA for Mobile */}
<a
  href="tel:0934256969"
  className="fixed bottom-5 right-5 lg:hidden z-40 bg-primary text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
  aria-label="Call Avalue"
>
  <Phone size={24} />
</a>
    </div>
  );
}
