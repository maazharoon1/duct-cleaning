import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Fan, House } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "About | Duct Master",
  description: "Learn about Duct Master's focused approach to air duct, dryer vent, and chimney cleaning.",
};

const values = [
  { icon: House, title: "Care for your home", text: "We focus on the spaces inside your home that are easy to overlook." },
  { icon: Fan, title: "Purposeful cleaning", text: "Each service addresses a specific system and its common buildup." },
  { icon: ClipboardCheck, title: "A clear process", text: "From inspection to final check, you know what to expect." },
];

export default function AboutPage() {
  return <>
    <Header />
    <main className="inner-page">
      <section className="inner-hero"><div className="inner-hero-copy"><p className="eyebrow">ABOUT DUCT MASTER</p><h1>Cleaner living starts behind the scenes.</h1><p>Air ducts, dryer vents, and chimneys work quietly in the background. We give these often-overlooked spaces focused attention so your home can feel more comfortable.</p><Link className="button button-primary" href="/#contact">Request an Estimate <ArrowRight size={17} /></Link></div><div className="inner-hero-image"><Image src="/images/home-interior.jpg" alt="Clean, comfortable residential living room" fill priority sizes="(max-width: 700px) 100vw, 45vw" /></div></section>
      <Reveal className="inner-section"><p className="eyebrow">OUR APPROACH</p><h2>Simple, thoughtful home care.</h2><p className="about-lead">Dust, lint, and soot can collect in areas you rarely see. We focus on three specific cleaning services and explain the work clearly from the first conversation to the final walkthrough.</p><div className="about-values">{values.map(({ icon: Icon, title, text }) => <article key={title}><span><Icon size={22} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></Reveal>
      <Reveal className="inner-section inner-cta"><div><p className="eyebrow">EXPLORE WHAT WE DO</p><h2>Air ducts, dryer vents, and chimneys.</h2></div><Link className="button button-primary" href="/services">View Our Services <ArrowRight size={17} /></Link></Reveal>
    </main>
    <Footer />
  </>;
}
