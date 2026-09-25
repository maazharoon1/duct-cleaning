import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { services } from "@/components/site/services-data";

export const metadata: Metadata = {
  title: "Cleaning Services | Duct Master",
  description: "Explore Duct Master's air duct, dryer vent, and chimney cleaning services.",
};

export default function ServicesPage() {
  return <>
    <Header />
    <main className="inner-page">
      <section className="inner-hero">
        <div className="inner-hero-copy"><p className="eyebrow">WHAT WE CLEAN</p><h1>Three services. One cleaner home.</h1><p>Focused cleaning for your air ducts, dryer vent, and chimney. Explore what each service covers and request an estimate for your home.</p><Link className="button button-primary" href="/#contact">Get a Free Estimate <ArrowRight size={17} /></Link></div>
        <div className="inner-hero-image"><Image src="/images/duct-technician.jpg" alt="Technician opening a residential ceiling vent" fill priority sizes="(max-width: 700px) 100vw, 45vw" /></div>
      </section>
      <section className="inner-section"><p className="eyebrow">OUR SERVICES</p><h2>Cleaning where it counts</h2>
        <div className="full-service-grid">{services.map((service) => <Reveal className="full-service-card" key={service.slug}><div className="full-service-card-image"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 700px) 100vw, 31vw" /></div><div><h3>{service.title}</h3><p>{service.description}</p><Link href={"#" + service.slug}>Explore service <ArrowRight size={15} /></Link></div></Reveal>)}</div>
        {services.map((service) => <Reveal className="service-detail" key={service.slug}><div id={service.slug}><p className="eyebrow">FOCUSED HOME CARE</p><h2>{service.title}</h2><p>{service.detail}</p><ul>{service.points.map((point) => <li key={point}><CheckCircle2 size={17} />{point}</li>)}</ul><Link className="button button-primary" href="/#contact">Request an estimate <ArrowRight size={16} /></Link></div><div className="service-detail-image"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 700px) 100vw, 40vw" /></div></Reveal>)}
      </section>
      <section className="inner-section inner-cta"><div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Let&apos;s talk about your home.</h2></div><Link href="/#contact" className="button button-primary">Get a Free Estimate <ArrowRight size={17} /></Link></section>
    </main>
    <Footer />
  </>;
}
