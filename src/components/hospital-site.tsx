import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Clock3, Eye, HeartHandshake, Instagram, MapPin,
  Menu, Phone, ScanEye, ShieldCheck, Smile, Star, Trash2, Upload, X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import hospitalLogo from "@/assets/hendge-hospital-logo.png";
import eyeImage from "@/assets/hendge-eye.jpg";
import dentalImage from "@/assets/hendge-dental.jpg";
import eyeExamImage from "@/assets/services/eye-exam-machine.jpg";
import cataractServiceImage from "@/assets/services/cataract-care.jpg";
import dentalServiceImage from "@/assets/services/dental-care.jpg";
import operatingRoom from "@/assets/hospital/operating-room.webp";
import eyeCareImage from "@/assets/hospital/eye-care.webp";
import careTeamImage from "@/assets/hospital/care-team.webp";
import hospitalExterior from "@/assets/hospital/hospital-exterior.webp";
import communityImage from "@/assets/hospital/community.webp";
import {
  DENTAL_SERVICES, EYE_SERVICES, HOSPITAL_HOURS, HOSPITAL_LOCATION, HOSPITAL_MAP_URL,
  HOSPITAL_PHONE, HOSPITAL_PHONE_LINK, HOSPITAL_WHATSAPP_URL,
} from "@/lib/hospital-info";
import { addLocalGalleryPhoto, removeLocalGalleryPhoto } from "@/lib/local-gallery";
import { useLocalHospitalGallery } from "@/hooks/use-local-hospital-gallery";

const navItems = [
  ["Home", "/"], ["About", "/about"], ["Eye care", "/eye-care"],
  ["Dental", "/dental-care"], ["Services", "/services"], ["Gallery", "/gallery"], ["Contact", "/contact"],
] as const;

const waAppointment = `${HOSPITAL_WHATSAPP_URL}?text=${encodeURIComponent("Hello Hendge Hospital, I would like to enquire about an appointment.")}`;
const originalGalleryPhotos = [
  { src: operatingRoom, alt: "Eye care at Hendge Hospital" },
  { src: eyeCareImage, alt: "Ophthalmology care at Hendge Hospital" },
  { src: communityImage, alt: "Community event at Hendge Hospital" },
  { src: careTeamImage, alt: "Care team at Hendge Hospital" },
  { src: hospitalExterior, alt: "Hendge Hospital in Nanded" },
];
const serviceDescriptions: Record<string, string> = {
  "Cataract Care": "Assessment and care for cataracts and changing vision.",
  "Eye Exams": "Eye examinations to understand your vision and eye health.",
  "Dry Eye Treatment": "Support for dry eye symptoms and ongoing comfort.",
  "Glaucoma Care": "Assessment and ongoing care for glaucoma.",
  "Eye Procedures": "Ask our team about available ophthalmic procedures.",
  "Lens And Contact Prescriptions": "Prescription support for lenses and contact lenses.",
  "Macular Degeneration Care": "Assessment and support for macular degeneration.",
  "Strabismus Squint": "Evaluation and care for squint and eye alignment.",
  "Vision Therapy": "Ask our team about vision therapy options.",
  Pterygium: "Assessment and care for pterygium.",
  Refraction: "Vision testing to help determine your prescription.",
  "Dental Services": "Dental consultations and treatment options.",
  "Dental Implants": "Consultation for dental implant options.",
  "Dentures And Bridges": "Restorative options for missing teeth.",
  Extractions: "Dental assessment and extraction care.",
  "Fillings And Sealants": "Care for cavities and preventive sealants.",
  "Root Canals": "Assessment and treatment for damaged or infected teeth.",
  "Teeth Cleaning": "Professional cleaning to support oral health.",
  "Teeth Whitening": "Ask about available teeth-whitening options.",
  "X Ray": "Dental imaging to support diagnosis and treatment planning.",
};
const featuredServices = [
  {
    title: "Eye Exams",
    category: "Ophthalmology",
    description: "Eye examinations to understand your vision and eye health.",
    image: eyeExamImage,
    imageAlt: "Patient having their vision checked with an eye examination machine",
  },
  {
    title: "Cataract Care",
    category: "Eye care",
    description: "Assessment and care for cataracts and changing vision.",
    image: cataractServiceImage,
    imageAlt: "Surgeons preparing for a procedure in an operating room",
  },
  {
    title: "Dental Services",
    category: "Dental care",
    description: "Dental consultations and treatment options.",
    image: dentalServiceImage,
    imageAlt: "Dentists caring for a patient in a dental clinic",
  },
];

function Brand({ invert = false }: { invert?: boolean }) {
  return (
    <Link to="/" className={`inline-flex min-w-0 items-center gap-2.5 sm:gap-3 ${invert ? "text-ice" : "text-deep-navy"}`} aria-label="Hendge Hospital home">
      <img src={hospitalLogo} alt="Hendge Hospital logo" width={52} height={52} className="size-11 shrink-0 object-contain sm:size-[52px]" />
      <span className="min-w-0 leading-none"><span className="block text-[19px] font-bold sm:text-[22px]">Hendge</span><span className="mt-1.5 block text-[11px] font-semibold tracking-[0.14em] opacity-75 sm:text-xs">HOSPITAL</span></span>
    </Link>
  );
}

export function SiteHeader({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`absolute inset-x-0 top-0 z-40 border-b ${dark ? "border-ice/10" : "border-deep-navy/10"}`}>
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between gap-3 px-4 sm:h-[90px] sm:px-8 lg:px-14">
        <Brand invert={dark} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map(([label, href]) => <Link key={href} to={href} className={`text-[13px] font-medium transition-colors hover:text-neon-teal ${dark ? "text-ice/70" : "text-deep-navy/70"}`}>{label}</Link>)}
        </nav>
        <Button asChild className="hidden h-11 rounded-none bg-neon-teal px-5 font-semibold text-deep-navy hover:bg-neon-teal/85 sm:inline-flex">
          <a href={waAppointment} target="_blank" rel="noreferrer">Book an appointment <ArrowUpRight size={15} /></a>
        </Button>
        <button className={`grid size-11 place-items-center lg:hidden ${dark ? "text-ice" : "text-deep-navy"}`} type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && <nav className="absolute inset-x-0 top-full grid gap-1 border-b border-border bg-background px-6 py-4 shadow-lg lg:hidden" aria-label="Mobile navigation">
        {navItems.map(([label, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-foreground">{label}</Link>)}
        <Button asChild className="mt-2 h-11 rounded-none bg-neon-teal text-deep-navy"><a href={waAppointment} target="_blank" rel="noreferrer">Book an appointment <ArrowUpRight size={15} /></a></Button>
      </nav>}
    </header>
  );
}

export function SiteFooter() {
  return <footer className="bg-deep-navy text-ice">
    <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-12 lg:py-20">
      <div><Brand invert /><p className="mt-6 max-w-sm text-sm leading-7 text-ice/60">Thoughtful eye and dental care, rooted in Nanded and centered on your well-being.</p><a className="mt-6 inline-flex items-center gap-2 text-sm text-neon-teal" href={waAppointment} target="_blank" rel="noreferrer">Enquire about an appointment <ArrowUpRight size={15} /></a></div>
      <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ice/45">Explore</p><div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">{navItems.slice(1).map(([label, href]) => <Link key={href} to={href} className="text-sm text-ice/75 transition-colors hover:text-neon-teal">{label}</Link>)}<Link to="/admin" className="text-sm text-ice/75 transition-colors hover:text-neon-teal">Local gallery manager</Link></div></div>
      <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-ice/45">Visit or call</p><a href={`tel:${HOSPITAL_PHONE_LINK}`} className="mt-5 flex items-center gap-3 text-sm text-ice/80"><Phone size={16} className="text-neon-teal" />{HOSPITAL_PHONE}</a><p className="mt-4 flex items-start gap-3 text-sm leading-6 text-ice/70"><MapPin size={16} className="mt-1 shrink-0 text-neon-teal" />{HOSPITAL_LOCATION}</p><p className="mt-4 flex items-center gap-3 text-sm text-ice/70"><Clock3 size={16} className="text-neon-teal" />{HOSPITAL_HOURS}</p><div className="mt-6 flex flex-wrap gap-4 border-t border-ice/10 pt-5"><a href={HOSPITAL_WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-ice/75 transition-colors hover:text-neon-teal"><WhatsAppIcon className="size-4" /> WhatsApp <ArrowUpRight size={14} /></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-ice/75 transition-colors hover:text-neon-teal"><Instagram size={15} /> Instagram <ArrowUpRight size={14} /></a><a href={`tel:${HOSPITAL_PHONE_LINK}`} className="inline-flex items-center gap-2 text-sm text-ice/75 transition-colors hover:text-neon-teal">Call <Phone size={14} /></a></div></div>
    </div>
    <div className="border-t border-ice/10"><div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-5 text-xs text-ice/40 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12"><span>© {new Date().getFullYear()} Hendge Hospital</span><span>Eye care · Dental care · Nanded</span></div></div>
  </footer>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reducedMotion = useReducedMotion();
  return <motion.div className={className} initial={reducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${light ? "text-neon-teal" : "text-medical-blue"}`}><span className="h-px w-8 bg-neon-teal" />{children}</div>;
}

function SectionTitle({ kicker, title, copy, light = false }: { kicker: string; title: React.ReactNode; copy?: string; light?: boolean }) {
  return <div className="max-w-2xl"><Eyebrow light={light}>{kicker}</Eyebrow><h2 className={`font-display text-4xl leading-[1.08] sm:text-5xl ${light ? "text-ice" : "text-deep-navy"}`}>{title}</h2>{copy && <p className={`mt-5 max-w-xl text-base leading-7 ${light ? "text-ice/65" : "text-secondary-text"}`}>{copy}</p>}</div>;
}

export function SiteShell({ children, darkHeader = false }: { children: React.ReactNode; darkHeader?: boolean }) {
  return <><SiteHeader dark={darkHeader} /><main id="main-content">{children}</main><SiteFooter /><FloatingContactActions /></>;
}

function FloatingContactActions() {
  return <nav aria-label="Quick contact" className="fixed bottom-5 right-4 z-50 flex flex-col gap-3 sm:right-6">
    <a href={HOSPITAL_WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Contact Hendge Hospital on WhatsApp" className="grid size-12 place-items-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-teal"><WhatsAppIcon className="size-6" /></a>
    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Visit Instagram" className="grid size-12 place-items-center rounded-full bg-pure-white text-medical-blue shadow-lg transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-teal"><Instagram size={20} /></a>
    <a href={`tel:${HOSPITAL_PHONE_LINK}`} aria-label={`Call Hendge Hospital at ${HOSPITAL_PHONE}`} className="grid size-12 place-items-center rounded-full bg-deep-navy text-ice shadow-lg transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-teal"><Phone size={19} /></a>
  </nav>;
}

function WhatsAppIcon({ className }: { className: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.52 3.48A11.815 11.815 0 0 0 12.05 0C5.393 0 .002 5.39 0 12.045c0 2.126.556 4.201 1.614 6.03L.07 23.714l5.77-1.514a12.02 12.02 0 0 0 6.206 1.68h.005c6.656 0 12.047-5.39 12.05-12.048a11.97 11.97 0 0 0-3.637-8.336zM12.05 21.88h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.824 9.824 0 0 1-1.51-5.254c.002-5.45 4.438-9.886 9.893-9.886a9.83 9.83 0 0 1 7.006 2.902 9.82 9.82 0 0 1 2.898 6.994c-.003 5.45-4.439 9.876-9.914 9.876zm5.421-7.403c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.1-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.007-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
  </svg>;
}

function HeroScan() {
  const reducedMotion = useReducedMotion();
  return <div className="relative mx-auto aspect-[1.1/1] w-full max-w-[630px] overflow-hidden border border-ice/10 bg-medical-blue/20 sm:aspect-[1.12/1]">
    <img src={eyeImage} width={1600} height={1312} alt="Detailed human iris under a subtle ophthalmic scan" fetchPriority="high" className="absolute inset-0 size-full object-cover object-[65%_center]" />
    <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/70 via-transparent to-transparent" />
    {!reducedMotion && <><div aria-hidden className="absolute inset-y-[12%] left-[12%] right-[12%] rounded-full border border-neon-teal/20" /><div aria-hidden className="scan-rotate absolute inset-[16%] rounded-full border border-dashed border-neon-teal/45" /><div aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-neon-teal/70 shadow-[0_0_14px_var(--color-neon-teal)]" /><div aria-hidden className="scan-sweep absolute inset-x-0 top-1/2 h-[22%] bg-gradient-to-b from-transparent via-neon-teal/10 to-transparent" /></>}
    <span aria-hidden className="marker-pulse absolute left-[19%] top-[25%] size-2 rounded-full bg-neon-teal shadow-[0_0_12px_var(--color-neon-teal)]" />
    <span className="absolute bottom-5 left-5 border-l border-neon-teal/70 pl-3 text-[9px] uppercase tracking-[0.16em] text-ice/75 sm:bottom-7 sm:left-7">Ophthalmology · Nanded</span>
    <span className="absolute right-4 top-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.12em] text-ice/70 sm:right-6 sm:top-6"><span className="size-1.5 rounded-full bg-neon-teal" /> Visual examination</span>
    <span className="absolute bottom-5 right-5 font-mono text-[9px] text-ice/45 sm:bottom-7 sm:right-7">HH · 01 / 02</span>
  </div>;
}

function Hero() {
  return <section className="relative overflow-hidden bg-deep-navy pt-[82px] text-ice">
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(to right, var(--color-ice) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ice) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
    <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-5 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:grid-cols-[0.86fr_1.14fr] lg:gap-14 lg:px-14 lg:pb-24 lg:pt-16">
      <div className="relative z-10 order-2 lg:order-1">
        <Reveal><Eyebrow light>Hendge Hospital · Nanded</Eyebrow><h1 className="max-w-xl font-display text-[clamp(3.25rem,6vw,5.8rem)] leading-[0.98]">Care that brings <span className="text-neon-teal">clarity</span> to life.</h1><p className="mt-7 max-w-lg text-base leading-7 text-ice/65 sm:text-lg sm:leading-8">Dedicated eye and dental care, delivered with skill, warmth and a deep commitment to your well-being.</p><div className="mt-9 flex flex-wrap gap-3"><Button asChild className="h-12 rounded-none bg-neon-teal px-6 font-semibold text-deep-navy hover:bg-neon-teal/85"><a href={waAppointment} target="_blank" rel="noreferrer">Book an appointment <ArrowUpRight size={16} /></a></Button><Button asChild variant="outline" className="h-12 rounded-none border-ice/25 bg-transparent px-6 text-ice hover:bg-ice/10 hover:text-ice"><Link to="/eye-care">Explore our care <ArrowRight size={16} /></Link></Button></div></Reveal>
        <div className="mt-12 grid max-w-[440px] grid-cols-3 border-t border-ice/15 pt-5"><div><p className="font-display text-2xl text-ice">2020</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-ice/45">Opened in Nanded</p></div><div className="border-x border-ice/15 px-4"><p className="font-display text-2xl text-ice">4.9 <span className="text-neon-teal">★</span></p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-ice/45">541+ Google reviews</p></div><div className="pl-4"><p className="font-display text-2xl text-ice">2</p><p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-ice/45">Care specialties</p></div></div>
      </div>
      <div className="order-1 lg:order-2"><HeroScan /></div>
    </div>
    <a href="#care" className="relative mx-auto mb-7 flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ice/45 transition-colors hover:text-neon-teal"><ArrowDownRight size={14} /> Discover our care</a>
  </section>;
}

function CarePillars() {
  return <section id="care" className="bg-ice py-20 sm:py-28"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12"><Reveal><SectionTitle kicker="Care, considered" title={<>Two specialties. <span className="text-medical-blue/55">One promise.</span></>} copy="A thoughtful approach to eye and dental health, with care shaped around the person in front of us." /></Reveal>
    <div className="mt-12 grid gap-5 md:grid-cols-2">
      <CareFeature image={eyeImage} imageAlt="Close-up of a human eye with a subtle scanning ring" label="01 / Vision" title="See the world with confidence." copy="From everyday eye examinations to specialist eye care, find support for your vision at every stage." link="Explore eye care" to="/eye-care" dark />
      <CareFeature image={dentalImage} imageAlt="Natural teeth and gums under a gentle dental scan" label="02 / Dental" title="A healthier smile, thoughtfully cared for." copy="Dental care and treatments guided by a personal, attentive approach." link="Explore dental care" to="/dental-care" />
    </div>
  </div></section>;
}

function CareFeature({ image, imageAlt, label, title, copy, link, to, dark = false }: { image: string; imageAlt: string; label: string; title: string; copy: string; link: string; to: "/eye-care" | "/dental-care"; dark?: boolean }) {
  const reducedMotion = useReducedMotion();
  return <Reveal><article className={`group grid min-h-[380px] overflow-hidden md:grid-cols-[1.08fr_0.92fr] ${dark ? "bg-deep-navy text-ice" : "bg-pure-white text-deep-navy"}`}>
    <div className="relative min-h-[230px] overflow-hidden md:min-h-[420px]"><img src={image} alt={imageAlt} width={1504} height={1200} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />{!reducedMotion && <div aria-hidden className="scan-sweep absolute inset-x-0 top-1/2 h-[18%] bg-gradient-to-b from-transparent via-neon-teal/20 to-transparent" />}<div aria-hidden className="absolute inset-3 border border-ice/40" /><div className="absolute left-7 top-7 bg-deep-navy/70 px-3 py-2 text-[9px] uppercase tracking-[0.18em] text-ice">{label}</div></div>
    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12"><p className="text-xs font-medium uppercase tracking-[0.16em] text-medical-blue">{label.split(" / ")[1]}</p><h3 className={`mt-4 font-display text-3xl leading-tight sm:text-4xl ${dark ? "text-ice" : "text-deep-navy"}`}>{title}</h3><p className={`mt-4 text-sm leading-7 ${dark ? "text-ice/65" : "text-secondary-text"}`}>{copy}</p><Link to={to} className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-medical-blue transition-colors hover:text-neon-teal">{link}<ArrowRight size={16} /></Link></div>
  </article></Reveal>;
}

function ServiceList({ services, prefix = "service" }: { services: string[]; prefix?: string }) {
  return <div className="grid gap-x-8 sm:grid-cols-2">{services.map((service, i) => <div key={service} className="flex items-center justify-between gap-4 border-b border-deep-navy/10 py-4"><span className="flex items-center gap-4 text-sm font-medium text-deep-navy"><span className="font-mono text-[10px] text-secondary-text">{String(i + 1).padStart(2, "0")}</span>{service}</span><a href={`${waAppointment}&${encodeURIComponent("service")}=${encodeURIComponent(service)}`} target="_blank" rel="noreferrer" aria-label={`Enquire about ${service}`} className="grid size-9 shrink-0 place-items-center border border-deep-navy/15 text-medical-blue transition-colors hover:border-neon-teal hover:bg-neon-teal hover:text-deep-navy"><ArrowUpRight size={15} /></a></div>)}</div>;
}

function TrustBand() {
  return <section className="bg-medical-blue text-ice"><div className="mx-auto grid max-w-[1280px] gap-0 px-5 sm:px-8 md:grid-cols-3 lg:px-12"><TrustItem icon={<HeartHandshake size={20} />} title="Care with compassion" detail="Personalized care for our community, including elderly patients." /><TrustItem icon={<Eye size={20} />} title="Dedicated eye care" detail="An in-house eye operation theatre at Hendge Hospital." /><TrustItem icon={<ShieldCheck size={20} />} title="Trusted by patients" detail="4.9 out of 5 from 541+ Google reviews." /></div></section>;
}

function TrustItem({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return <div className="flex gap-4 border-b border-ice/15 py-7 md:border-b-0 md:border-r md:px-6 md:py-9 md:first:pl-0 md:last:border-r-0"><span className="mt-1 text-neon-teal">{icon}</span><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 max-w-xs text-xs leading-6 text-ice/60">{detail}</p></div></div>;
}

function GalleryStrip() {
  const localPhotos = useLocalHospitalGallery();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const photos = [...localPhotos.map(({ src, alt }) => ({ src, alt })), ...originalGalleryPhotos];
  const scrollCarousel = (direction: -1 | 1) => carouselRef.current?.scrollBy({ left: direction * (carouselRef.current.clientWidth * 0.82), behavior: "smooth" });
  useEffect(() => {
    if (paused || reducedMotion || photos.length < 2) return;
    const timer = window.setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;
      const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8;
      carousel.scrollTo({ left: atEnd ? 0 : carousel.scrollLeft + carousel.clientWidth * 0.82, behavior: "smooth" });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, photos.length, reducedMotion]);
  return <section className="bg-pure-white py-20 sm:py-28"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><SectionTitle kicker="Inside Hendge" title="Care, in practice." copy="A glimpse of the people and moments behind our care." /><div className="flex flex-wrap items-center gap-3"><div className="flex gap-2"><Button type="button" variant="outline" size="icon" aria-label="Previous gallery images" onClick={() => scrollCarousel(-1)} className="rounded-none border-deep-navy/20 bg-transparent text-deep-navy"><ArrowLeft size={16} /></Button><Button type="button" variant="outline" size="icon" aria-label="Next gallery images" onClick={() => scrollCarousel(1)} className="rounded-none border-deep-navy/20 bg-transparent text-deep-navy"><ArrowRight size={16} /></Button></div><Button asChild variant="outline" className="h-11 rounded-none border-deep-navy/20 bg-transparent px-5 text-deep-navy"><Link to="/gallery">View the gallery <ArrowRight size={15} /></Link></Button></div></div><div ref={carouselRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:thin]">{photos.map((photo, i) => <Reveal key={`${photo.src}-${i}`} delay={(i % 3) * 0.08} className="min-w-0 basis-[84%] shrink-0 snap-start sm:basis-[48%] lg:basis-[32%]"><Link to="/gallery" aria-label={`Open gallery: ${photo.alt}`} className="group relative block aspect-[1.2/1] overflow-hidden bg-ice"><img src={photo.src} alt={photo.alt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-navy/80 to-transparent p-5 pt-14 text-xs font-medium text-ice">{photo.alt}</span></Link></Reveal>)}</div></div></section>;
}

function Reviews() {
  const reviews = [
    { name: "Baburao Wankhede", quote: "Satisfied with treatment." },
    { name: "Arvind Kakde", quote: "Nice experience. Doctor is humble and polite." },
    { name: "Jagdevrao Kadam", quote: "Got operated my right eye for cataract. Nice result." },
  ];
  return <section className="bg-ice py-20 sm:py-28"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12"><div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]"><Reveal><div><Eyebrow>Patient voices</Eyebrow><p className="font-display text-6xl text-deep-navy">4.9<span className="text-neon-teal">★</span></p><p className="mt-2 text-sm text-secondary-text">Based on 541+ Google reviews</p><a href={HOSPITAL_MAP_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-medical-blue">Read reviews on Google <ArrowUpRight size={15} /></a></div></Reveal><div className="grid gap-4 sm:grid-cols-3">{reviews.map((review, i) => <Reveal key={review.name} delay={i * 0.1}><blockquote className="flex h-full flex-col justify-between border-t-2 border-neon-teal bg-pure-white p-6"><div><div className="flex gap-1 text-neon-teal" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={12} fill="currentColor" />)}</div><p className="mt-5 font-display text-xl leading-snug text-deep-navy">“{review.quote}”</p></div><cite className="mt-6 text-xs not-italic font-semibold text-secondary-text">{review.name}</cite></blockquote></Reveal>)}</div></div></div></section>;
}

function AppointmentBand() {
  return <section className="bg-deep-navy px-5 py-14 text-ice sm:px-8 sm:py-16"><div className="mx-auto flex max-w-[1280px] flex-col gap-7 sm:flex-row sm:items-center sm:justify-between lg:px-12"><div><Eyebrow light>We’re here for you</Eyebrow><h2 className="font-display text-3xl sm:text-4xl">Let’s take the next step together.</h2></div><Button asChild className="h-12 w-fit rounded-none bg-neon-teal px-6 font-semibold text-deep-navy hover:bg-neon-teal/85"><a href={waAppointment} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={16} /></a></Button></div></section>;
}

export function HomePage() {
  return <SiteShell darkHeader><Hero /><TrustBand /><GalleryStrip /><CarePillars /><HomeAbout /><HomeServices /><Reviews /><AppointmentBand /></SiteShell>;
}

export function ServicesPage() {
  const opticalAndCheckups = ["Eye Exams", "Lens And Contact Prescriptions", "Refraction"];
  const eyeServices = EYE_SERVICES.filter((service) => !opticalAndCheckups.includes(service));
  return <SiteShell><PageHero kicker="Our services" title={<>Care for your <span className="text-medical-blue/55">whole self.</span></>} copy="Explore eye care, dental services, optical support and checkups available at Hendge Hospital in Nanded." image={careTeamImage} imageAlt="Doctors and staff at Hendge Hospital in Nanded" /><section className="bg-ice py-14 sm:py-20"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12"><Reveal><SectionTitle kicker="Care at a glance" title="Services for clearer days." copy="A look at the eye and dental care available at Hendge Hospital." /></Reveal><FeaturedServiceCards /></div></section><section className="bg-pure-white py-14 sm:py-20"><div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:px-12"><Reveal><div><div className="mb-3 flex items-center gap-3 text-sm font-semibold text-deep-navy"><Eye size={18} className="text-medical-blue" /> Eye care</div><p className="mb-5 text-sm text-secondary-text">Eye care and ophthalmology services</p><ServiceCardGrid services={eyeServices} /></div></Reveal><Reveal><div><div className="mb-3 flex items-center gap-3 text-sm font-semibold text-deep-navy"><ScanEye size={18} className="text-medical-blue" /> Optical &amp; checkups</div><p className="mb-5 text-sm text-secondary-text">Vision tests, prescriptions and checkups</p><ServiceCardGrid services={opticalAndCheckups} /></div></Reveal><Reveal><div><div className="mb-3 flex items-center gap-3 text-sm font-semibold text-deep-navy"><Smile size={18} className="text-medical-blue" /> Dental care</div><p className="mb-5 text-sm text-secondary-text">Comprehensive oral health services</p><ServiceCardGrid services={DENTAL_SERVICES} /></div></Reveal></div></section><AppointmentBand /></SiteShell>;
}

function HomeAbout() {
  return <section className="bg-pure-white py-20 sm:py-28"><div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-12"><Reveal><div className="relative"><img src={eyeCareImage} alt="Eye care at Hendge Hospital" loading="lazy" className="aspect-[1.12/1] w-full object-cover" /><span className="absolute bottom-5 left-5 bg-neon-teal px-4 py-3 text-xs font-semibold text-deep-navy">Serving Nanded since 2020</span></div></Reveal><Reveal><SectionTitle kicker="About Hendge Hospital" title={<>Care that feels <span className="text-medical-blue/55">personal.</span></>} copy="Since opening in 2020, Hendge Hospital has been dedicated to eye and dental care that puts patient well-being first. Our doctors, surgeons and staff bring a personalized approach to routine check-ups and advanced treatments alike." /><p className="mt-5 text-sm leading-7 text-secondary-text">With an in-house eye operation theatre and a commitment to serving our community, we combine attentive care with a focus on comfort and trust.</p><Link to="/about" className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-medical-blue">Get to know us <ArrowRight size={16} /></Link></Reveal></div></section>;
}

function HomeServices() {
  return <section className="bg-ice py-16 sm:py-20"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12"><div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><Reveal><SectionTitle kicker="Our services" title={<>Care for your <span className="text-medical-blue/55">whole self.</span></>} copy="Explore eye and dental care available at Hendge Hospital." /></Reveal><Link to="/services" className="inline-flex shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-medical-blue transition-colors hover:text-deep-navy">See all services <ArrowRight size={15} /></Link></div><FeaturedServiceCards /></div></section>;
}

function FeaturedServiceCards() {
  const reducedMotion = useReducedMotion();
  return <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {featuredServices.map((service, index) => <motion.article
      key={service.title}
      initial={reducedMotion ? false : { y: 28, rotateX: 2 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      {...(!reducedMotion ? { whileHover: { y: -7, rotateX: 1, rotateY: index === 1 ? 0 : index === 0 ? -1 : 1, scale: 1.01 } } : {})}
      transition={{ duration: 0.65, delay: reducedMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="service-feature group overflow-hidden rounded-lg bg-pure-white shadow-[0_12px_36px_-24px_rgba(9,42,55,0.6)]"
    >
      <p className="px-5 pt-5 text-lg font-medium text-deep-navy">{service.title}</p>
      <div className="service-feature-image relative mt-4 aspect-[1.45/1] overflow-hidden bg-medical-blue/10">
        <img src={service.image} alt={service.imageAlt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-deep-navy/20 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 bg-deep-navy/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-ice">{service.category}</span>
      </div>
      <div className="p-5">
        <p className="min-h-12 text-sm leading-6 text-secondary-text">{service.description}</p>
        <a href={`${HOSPITAL_WHATSAPP_URL}?text=${encodeURIComponent(`Hello Hendge Hospital, I would like to enquire about ${service.title}.`)}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-medical-blue transition-colors hover:text-deep-navy">Get service <ArrowRight size={16} /></a>
      </div>
    </motion.article>)}
  </div>;
}

function ServiceCardGrid({ services }: { services: string[] }) {
  return <div className="grid gap-3 sm:grid-cols-2">{services.map((service, index) => <a key={service} href={`${waAppointment}&${encodeURIComponent("service")}=${encodeURIComponent(service)}`} target="_blank" rel="noreferrer" className="service-card group flex min-h-[72px] items-center justify-between gap-3 rounded-md border border-deep-navy/10 bg-pure-white px-4 py-3 shadow-[0_5px_16px_-12px_rgba(9,42,55,0.5)] transition duration-300 hover:border-medical-blue/40 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-medical-blue"><span className="flex min-w-0 items-start gap-3"><span className="mt-0.5 font-mono text-[10px] text-secondary-text">{String(index + 1).padStart(2, "0")}</span><span><span className="block text-sm font-medium text-deep-navy">{service}</span><span className="mt-1 block text-xs leading-5 text-secondary-text">{serviceDescriptions[service]}</span></span></span><span aria-hidden="true" className="grid size-8 shrink-0 place-items-center border border-deep-navy/10 text-medical-blue transition-colors group-hover:border-medical-blue/30 group-hover:bg-ice"><ArrowUpRight size={15} /></span></a>)}</div>;
}

export function PageHero({ kicker, title, copy, dark = false, image, imageAlt = "Hendge Hospital care and treatment" }: { kicker: string; title: React.ReactNode; copy: string; dark?: boolean; image?: string; imageAlt?: string }) {
  return <section className={`relative overflow-hidden pt-[82px] ${dark ? "bg-deep-navy text-ice" : "bg-ice text-deep-navy"}`}><div className="mx-auto grid max-w-[1280px] items-center gap-8 px-5 pb-16 pt-16 sm:px-8 sm:pb-20 lg:grid-cols-[1fr_0.85fr] lg:px-12 lg:pb-24 lg:pt-20"><div className="relative z-10"><Eyebrow light={dark}>{kicker}</Eyebrow><h1 className="max-w-2xl font-display text-5xl leading-[1.05] sm:text-6xl">{title}</h1><p className={`mt-6 max-w-xl text-base leading-7 ${dark ? "text-ice/65" : "text-secondary-text"}`}>{copy}</p><Button asChild className="mt-8 h-12 rounded-none bg-neon-teal px-6 font-semibold text-deep-navy hover:bg-neon-teal/85"><a href={waAppointment} target="_blank" rel="noreferrer">Enquire about an appointment <ArrowUpRight size={16} /></a></Button></div>{image && <div className="relative aspect-[1.15/1] overflow-hidden"><img src={image} alt={imageAlt} className="size-full object-cover" /><div aria-hidden className="absolute inset-3 border border-ice/50" /></div>}</div></section>;
}

export function AboutPage() {
  return <SiteShell><PageHero kicker="About Hendge Hospital" title={<>Thoughtful care. <span className="text-medical-blue/55">Closer to home.</span></>} copy="Since opening in 2020, Hendge Hospital has been dedicated to eye and dental care that prioritizes patient well-being and satisfaction." image={careTeamImage} imageAlt="Doctors and staff at Hendge Hospital" /><section className="bg-pure-white py-16 sm:py-24"><div className="mx-auto grid max-w-[1100px] gap-10 px-5 sm:px-8 md:grid-cols-[0.7fr_1.3fr] lg:px-12"><Reveal><div className="text-xs font-semibold uppercase tracking-[0.17em] text-medical-blue">Our commitment</div></Reveal><Reveal><h2 className="font-display text-3xl leading-tight text-deep-navy sm:text-4xl">A hospital built around people, not just appointments.</h2><p className="mt-6 text-sm leading-7 text-secondary-text">Our experienced team of doctors, surgeons and staff offers comprehensive, personalized care—from routine check-ups to advanced treatments. We are especially committed to serving elderly patients and supporting our Nanded community.</p><p className="mt-4 text-sm leading-7 text-secondary-text">Hendge Hospital also has an in-house eye operation theatre, bringing dedicated ophthalmic care together under one roof.</p></Reveal></div></section><TrustBand /><AppointmentBand /></SiteShell>;
}

export function EyeCarePage() {
  return <SiteShell darkHeader><PageHero dark kicker="Ophthalmology" title={<>A clearer path to <span className="text-neon-teal">better vision.</span></>} copy="From routine eye examinations to specialist care, explore the ophthalmology services available at Hendge Hospital." image={eyeImage} imageAlt="Close-up of a human eye with a subtle scanning ring" /><section className="bg-pure-white py-16 sm:py-24"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12"><Reveal><SectionTitle kicker="Eye care services" title="Support for your vision." copy="Talk with our team about the care that may be right for you." /></Reveal><Reveal><ServiceList services={EYE_SERVICES} /></Reveal></div></section><section className="bg-ice py-14 sm:py-20"><div className="mx-auto grid max-w-[1100px] items-center gap-8 px-5 sm:px-8 md:grid-cols-2 lg:px-12"><div><Eyebrow>Ophthalmology at Hendge</Eyebrow><h2 className="font-display text-3xl leading-tight text-deep-navy">Care with an eye on the details.</h2><p className="mt-5 text-sm leading-7 text-secondary-text">Hendge Hospital has an in-house eye operation theatre and offers eye care services in Nanded. Get in touch with the hospital to ask about availability and next steps.</p></div><img src={operatingRoom} alt="Ophthalmology care at Hendge Hospital" loading="lazy" className="aspect-[1.3/1] w-full object-cover" /></div></section><AppointmentBand /></SiteShell>;
}

export function DentalCarePage() {
  return <SiteShell><PageHero kicker="Dental care" title={<>Care for every <span className="text-medical-blue/55">kind of smile.</span></>} copy="Explore dental services at Hendge Hospital, with a personal approach to your comfort and care." image={dentalImage} imageAlt="Natural teeth and gums under a gentle dental scan" /><section className="bg-pure-white py-16 sm:py-24"><div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:px-12"><Reveal><SectionTitle kicker="Dental services" title="A little more reason to smile." copy="Ask the team about dental service availability and the right next step for you." /></Reveal><Reveal><ServiceList services={DENTAL_SERVICES} /></Reveal></div></section><section className="bg-ice py-16 sm:py-24"><div className="mx-auto grid max-w-[1100px] items-center gap-8 px-5 sm:px-8 md:grid-cols-2 lg:px-12"><div><Eyebrow>At Hendge Hospital</Eyebrow><h2 className="font-display text-3xl leading-tight text-deep-navy">Thoughtful dental care, tailored to you.</h2><p className="mt-5 text-sm leading-7 text-secondary-text">From check-ups and cleaning to restorative dental services, our team is here to help you understand your options and make an enquiry.</p></div><div className="relative overflow-hidden"><img src={dentalImage} alt="Natural teeth under a gentle dental scan" loading="lazy" width={1504} height={1200} className="aspect-[1.3/1] w-full object-cover" /><div aria-hidden className="absolute inset-4 border border-neon-teal/50" /></div></div></section><AppointmentBand /></SiteShell>;
}

export function GalleryPage() {
  const localPhotos = useLocalHospitalGallery();
  const photos = [...localPhotos.map(({ src, alt, id }) => ({ src, alt, key: id })), ...originalGalleryPhotos.map((photo, index) => ({ ...photo, key: `hospital-${index}` }))];
  return <SiteShell><PageHero kicker="Hospital gallery" title={<>A closer look at <span className="text-medical-blue/55">Hendge.</span></>} copy="Moments and images from the hospital and its work in the Nanded community." image={hospitalExterior} imageAlt="Hendge Hospital exterior in Nanded" /><section className="bg-pure-white py-14 sm:py-20"><div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{photos.map((photo, i) => <Reveal key={photo.key} delay={(i % 3) * 0.07}><figure className="group relative aspect-[1.15/1] overflow-hidden bg-ice"><img src={photo.src} alt={photo.alt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep-navy/85 via-deep-navy/30 to-transparent px-5 pb-5 pt-14 text-xs font-medium text-ice">{photo.alt}</figcaption></figure></Reveal>)}</div><p className="mt-8 text-xs text-secondary-text">Images shared by Hendge Hospital.</p></div></section><AppointmentBand /></SiteShell>;
}

export function GalleryManagerPage() {
  const photos = useLocalHospitalGallery();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [altText, setAltText] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const selectedFile = new FormData(event.currentTarget).get("gallery-image");
    if (!(selectedFile instanceof File) || selectedFile.size === 0) {
      setMessage("Choose an image before saving.");
      return;
    }
    if (!selectedFile.type.startsWith("image/")) {
      setMessage("Choose a JPG, PNG, WebP or other image file.");
      return;
    }
    if (selectedFile.size > 12 * 1024 * 1024) {
      setMessage("Choose an image smaller than 12 MB.");
      return;
    }

    setSaving(true);
    setMessage("");
    try {
      await addLocalGalleryPhoto({
        id: crypto.randomUUID(),
        name: title.trim() || selectedFile.name.replace(/\.[^.]+$/, ""),
        alt: altText.trim() || title.trim() || selectedFile.name.replace(/\.[^.]+$/, ""),
        blob: selectedFile,
        createdAt: Date.now(),
      });
      setFile(null);
      setTitle("");
      setAltText("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setMessage("Image saved in this browser and added to the gallery.");
    } catch {
      setMessage("The image could not be saved. Check available browser storage and try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(id: string) {
    try {
      await removeLocalGalleryPhoto(id);
      setMessage("Image removed from this browser’s gallery.");
    } catch {
      setMessage("The image could not be removed. Please try again.");
    }
  }

  return <SiteShell>
    <PageHero
      kicker="Gallery manager"
      title={<>Manage local <span className="text-medical-blue/55">gallery images.</span></>}
      copy="Add and remove images for this browser’s Hendge Hospital gallery."
    />
    <section className="bg-pure-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-[1120px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div>
          <Eyebrow>Browser gallery</Eyebrow>
          <h2 className="font-display text-3xl text-deep-navy">Add an image</h2>
          <p className="mt-4 text-sm leading-7 text-secondary-text">
            Gallery changes stay on this device and appear in the gallery page and homepage carousel. There is no account or secure administrator sign-in on this preview.
          </p>
          <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
            <label className="grid gap-2 text-xs font-semibold text-deep-navy" htmlFor="gallery-image">
              Image file
              <input
                ref={fileInputRef}
                id="gallery-image"
                name="gallery-image"
                type="file"
                accept="image/*"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                className="w-full border border-deep-navy/15 bg-pure-white p-3 text-sm font-normal text-deep-navy file:mr-3 file:border-0 file:bg-ice file:px-3 file:py-2 file:text-xs file:font-semibold file:text-medical-blue"
              />
            </label>
            <label className="grid gap-2 text-xs font-semibold text-deep-navy" htmlFor="gallery-title">
              Image title <span className="font-normal text-secondary-text">(optional)</span>
              <input id="gallery-title" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={90} className="h-12 border border-deep-navy/15 bg-pure-white px-4 text-sm font-normal text-deep-navy focus-visible:outline-2 focus-visible:outline-neon-teal" />
            </label>
            <label className="grid gap-2 text-xs font-semibold text-deep-navy" htmlFor="gallery-alt">
              Image description <span className="font-normal text-secondary-text">(optional)</span>
              <input id="gallery-alt" value={altText} onChange={(event) => setAltText(event.target.value)} maxLength={140} className="h-12 border border-deep-navy/15 bg-pure-white px-4 text-sm font-normal text-deep-navy focus-visible:outline-2 focus-visible:outline-neon-teal" />
            </label>
            <Button type="submit" disabled={saving} className="h-12 w-fit rounded-none bg-neon-teal px-6 font-semibold text-deep-navy">
              <Upload size={16} />{saving ? "Saving image…" : "Add to gallery"}
            </Button>
            {message && <p role="status" className="text-sm text-medical-blue">{message}</p>}
          </form>
        </div>
        <div>
          <Eyebrow>Saved on this device</Eyebrow>
          <h2 className="font-display text-3xl text-deep-navy">Your images <span className="font-sans text-lg text-secondary-text">({photos.length})</span></h2>
          {photos.length === 0 ? (
            <p className="mt-6 border-t border-deep-navy/10 py-5 text-sm text-secondary-text">No local images yet.</p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {photos.map((photo) => (
                <li key={photo.id} className="border border-deep-navy/10">
                  <img src={photo.src} alt={photo.alt} className="aspect-[1.3/1] w-full object-cover" />
                  <div className="flex items-center justify-between gap-3 p-3">
                    <span className="min-w-0 truncate text-sm font-medium text-deep-navy">{photo.name}</span>
                    <Button type="button" variant="outline" size="icon" aria-label={`Remove ${photo.name}`} onClick={() => void handleRemove(photo.id)} className="shrink-0 rounded-none border-deep-navy/20 text-deep-navy">
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
    <AppointmentBand />
  </SiteShell>;
}

export function ContactPage() {
  const [service, setService] = useState("Eye care");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = `Hello Hendge Hospital, I would like to enquire about ${service.toLowerCase()}.${message ? ` ${message}` : ""}`;
    window.open(`${HOSPITAL_WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  }
  return <SiteShell><PageHero kicker="Contact Hendge Hospital" title={<>We’re here to <span className="text-medical-blue/55">listen.</span></>} copy="For appointment enquiries, directions or service availability, reach out to our team." /><section className="bg-pure-white py-14 sm:py-20"><div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12"><div><Eyebrow>Visit or get in touch</Eyebrow><h2 className="font-display text-3xl text-deep-navy">A conversation is a good place to start.</h2><a href={`tel:${HOSPITAL_PHONE_LINK}`} className="mt-8 flex items-center gap-4 border-t border-deep-navy/10 py-5"><span className="grid size-11 place-items-center bg-ice text-medical-blue"><Phone size={19} /></span><span><span className="block text-xs text-secondary-text">Call us</span><span className="mt-1 block text-sm font-semibold text-deep-navy">{HOSPITAL_PHONE}</span></span></a><div className="flex items-center gap-4 border-t border-deep-navy/10 py-5"><span className="grid size-11 place-items-center bg-ice text-medical-blue"><Clock3 size={19} /></span><span><span className="block text-xs text-secondary-text">Business hours</span><span className="mt-1 block text-sm font-semibold text-deep-navy">{HOSPITAL_HOURS}</span><span className="mt-1 block text-xs text-secondary-text">Sunday: hours not listed</span></span></div><div className="flex items-center gap-4 border-y border-deep-navy/10 py-5"><span className="grid size-11 place-items-center bg-ice text-medical-blue"><MapPin size={19} /></span><span><span className="block text-xs text-secondary-text">Find us</span><span className="mt-1 block text-sm font-semibold text-deep-navy">{HOSPITAL_LOCATION}</span></span></div><Button asChild variant="outline" className="mt-5 h-11 rounded-none border-deep-navy/20 bg-transparent text-deep-navy"><a href={HOSPITAL_MAP_URL} target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={15} /></a></Button></div>
    <div className="bg-ice p-6 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.17em] text-medical-blue">Appointment enquiry</p><h2 className="mt-3 font-display text-3xl text-deep-navy">How can we help?</h2><p className="mt-3 text-sm leading-6 text-secondary-text">Share a little about what you need and continue in WhatsApp.</p><form className="mt-7 grid gap-5" onSubmit={handleSubmit}><label className="grid gap-2 text-xs font-semibold text-deep-navy" htmlFor="care-service">I’m enquiring about<select id="care-service" value={service} onChange={(event) => setService(event.target.value)} className="h-12 border border-deep-navy/15 bg-pure-white px-4 text-sm font-normal text-deep-navy focus-visible:outline-2 focus-visible:outline-neon-teal"><option>Eye care</option><option>Dental care</option><option>General enquiry</option></select></label><label className="grid gap-2 text-xs font-semibold text-deep-navy" htmlFor="enquiry-message">Message <span className="font-normal text-secondary-text">(optional)</span><textarea id="enquiry-message" value={message} onChange={(event) => setMessage(event.target.value)} rows={4} placeholder="Tell us how we can help" className="resize-y border border-deep-navy/15 bg-pure-white p-4 text-sm font-normal text-deep-navy placeholder:text-secondary-text focus-visible:outline-2 focus-visible:outline-neon-teal" /></label><Button type="submit" className="h-12 w-fit rounded-none bg-neon-teal px-6 font-semibold text-deep-navy hover:bg-neon-teal/85">Continue in WhatsApp <ArrowUpRight size={16} /></Button>{submitted && <p role="status" className="text-xs text-medical-blue">Your enquiry is ready in WhatsApp. Please send it there to reach the hospital.</p>}</form></div>
  </div></section><section className="bg-ice px-5 py-12 sm:px-8"><div className="mx-auto max-w-[1200px] lg:px-12"><div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><Eyebrow>Find us in Nanded</Eyebrow><p className="text-sm text-secondary-text">Hendge Hospital · {HOSPITAL_LOCATION}</p></div><a href={HOSPITAL_MAP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-medical-blue">View on Google Maps <ArrowUpRight size={15} /></a></div><div className="mt-6 overflow-hidden border border-deep-navy/10 bg-pure-white"><iframe title="Google Map showing Hendge Hospital in Nanded" src="https://www.google.com/maps?q=19.1638381,77.3174737&output=embed" width="100%" height="420" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-[320px] w-full sm:h-[420px]" /></div></div></section></SiteShell>;
}