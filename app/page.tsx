import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarDays, Check, CircleCheck, ClipboardCheck, Fan, House, Search, ShieldCheck, Sparkles, Wind } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { Comparison } from "@/components/site/comparison";
import { Reviews } from "@/components/site/reviews";
import { EstimateForm } from "@/components/site/estimate-form";
import { services } from "@/components/site/services-data";

const steps = [
  { icon: CalendarDays, title: "Book your service", text: "Tell us which part of your home needs attention." },
  { icon: Search, title: "Inspection", text: "We look at the accessible system before cleaning." },
  { icon: Sparkles, title: "Professional cleaning", text: "We clean the selected duct, vent, or chimney." },
  { icon: CircleCheck, title: "Final check", text: "We review the work and walk you through the result." },
];

const reasons = [
  { icon: Fan, title: "Purposeful equipment", text: "Tools suited to the area being cleaned." },
  { icon: BadgeCheck, title: "Thoughtful service", text: "Care for your home and its systems." },
  { icon: ClipboardCheck, title: "Clear process", text: "Know what happens at every step." },
  { icon: Wind, title: "Hidden buildup addressed", text: "Attention to the places you rarely see." },
];

export default function Home() {
  return <>
    <Header />
    <main className="site-main vertical-home">
      <section id="home" className="home-section" aria-labelledby="hero-title">
        <div className="hero-card">
          <div className="hero-top">
            <div className="hero-content">
              <p className="hero-pill">CLEANER AIR. BETTER LIVING.</p>
              <h1 id="hero-title">Professional Duct Cleaning for a <span>Healthier Home.</span></h1>
              <p>We clean air ducts, dryer vents, and chimneys to help reduce buildup, improve airflow, and make your home feel more comfortable.</p>
              <div className="hero-actions">
                <Link className="button button-primary " href="/#contact">Get a Free Estimate <ArrowRight size={17} /></Link>
                <Link className="button button-outline" href="/services">Explore Services <ArrowUpRight size={17} /></Link>
              </div>
              <div className="hero-small-note"><Check size={15} /> Three services, one cleaner home.</div>
            </div>
            <div className="hero-visual">
              <Image src="/images/duct-technician.jpg" alt="Technician opening a ceiling air vent" fill preload sizes="(max-width: 700px) 100vw, 54vw" />
              <div className="hero-visual-label"><span><Wind size={18} /></span> Focused on the air you live in.</div>
            </div>
          </div>
          <div className="trust-row">
            <div><span><ShieldCheck size={20} /></span><strong>Focused home care</strong></div>
            <div><span><Fan size={20} /></span><strong>Purposeful cleaning</strong></div>
            <div><span><CircleCheck size={20} /></span><strong>Clear, simple process</strong></div>
          </div>
        </div>
      </section>

      <section id="services" className="home-section" aria-labelledby="services-title">
        <Reveal className="services-panel">
          <div className="panel-heading"><div><p className="eyebrow">OUR SERVICES</p><h2 id="services-title">Professional Cleaning Services</h2><p>Three focused ways to care for your home.</p></div><Link href="/services" className="panel-link">View all services <ArrowUpRight size={16} /></Link></div>
          <div className="mini-services">{services.map((service) => <article className="mini-service" key={service.slug}><Link href={"/services#" + service.slug} className="mini-service-image"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 700px) 100vw, 31vw" /></Link><div><h3>{service.title}</h3><p>{service.description}</p><Link href={"/services#" + service.slug}>Learn more <ArrowRight size={14} /></Link></div></article>)}</div>
        </Reveal>
      </section>

      <section id="difference" className="home-section" aria-labelledby="difference-title">
        <Reveal className="compare-panel">
          <div className="compare-header"><p className="eyebrow">BEFORE & AFTER</p><h2 id="difference-title">The difference is inside.</h2><p>Slide to explore an illustrative view of a duct before and after cleaning.</p></div>
          <div className="compare-panel-body"><Comparison /><div className="compare-benefits"><div><span><Sparkles size={18} /></span><strong>Less buildup</strong><small>Address dust and debris.</small></div><div><span><Wind size={18} /></span><strong>Better airflow</strong><small>Clearer pathways for air.</small></div><div><span><House size={18} /></span><strong>More comfort</strong><small>Care for hidden spaces.</small></div></div></div>

        </Reveal>
      </section>

      <section id="why-us" className="home-section" aria-labelledby="why-title">
        <Reveal className="about-preview">
          <div className="about-preview-copy">
            <p className="eyebrow">WHY HOMEOWNERS CHOOSE US</p>
            <h2 id="why-title">Good care goes beyond the surface.</h2>
            <p>Dust and debris can settle where you cannot see them. Our focused cleaning services give those often-overlooked spaces the attention they deserve.</p>
            <Link className="button button-primary" href="/about">Learn More About Us <ArrowRight size={16} /></Link>
          </div>
          <div className="about-preview-image"><Image src="/images/home-interior.jpg" alt="Comfortable, clean residential living room" fill sizes="(max-width: 700px) 100vw, 35vw" /></div>
          <div className="reason-stack">{reasons.map(({ icon: Icon, title, text }) => <div className="reason-item" key={title}><span><Icon size={18} /></span><div><strong>{title}</strong><small>{text}</small></div></div>)}</div>
        </Reveal>
      </section>

      <section id="how-it-works" className="home-section" aria-labelledby="process-title">
        <Reveal className="process-panel">
          <div className="process-intro"><div><p className="eyebrow">HOW IT WORKS</p><h2 id="process-title">A simple path to a cleaner home.</h2></div><p>Four clear steps from your first request to the final check.</p></div>
          <div className="process-list">{steps.map(({ icon: Icon, title, text }, index) => <div className="process-item" key={title}><span className="process-icon"><Icon size={22} /></span><div><span className="process-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></div>{index < 3 && <ArrowRight className="process-arrow" size={18} />}</div>)}</div>
        </Reveal>
      </section>

      <section id="reviews" className="home-section" aria-labelledby="reviews-title">
        <Reveal className="review-panel">
          <div className="review-panel-heading"><p className="eyebrow">TESTIMONIALS</p><h2 id="reviews-title">What homeowners are saying</h2><p>Sample feedback for this site template.</p></div>
          <Reviews />

        </Reveal>
      </section>

      <section id="contact" className="home-section" aria-labelledby="contact-title">
        <Reveal className="contact-panel">
          <div className="contact-panel-intro"><p className="eyebrow">CONTACT US</p><h2 id="contact-title">Ready for cleaner air?</h2><p>Tell us which part of your home needs attention, and request a free estimate.</p></div>
          <div className="contact-panel-grid">
            <div className="contact-panel-visual"><Image src="/images/home-interior.jpg" alt="Bright, comfortable living room" fill sizes="(max-width: 700px) 100vw, 45vw" /><div><span><House size={23} /></span><strong>Clean air. Better living.</strong><p>Focused cleaning for the spaces you use every day.</p></div></div>
            <div className="form-panel"><div className="form-panel-heading"><h3>Get a Free Estimate</h3><p>Fill in the form and our team will follow up.</p></div><EstimateForm /></div>
          </div>
        </Reveal>
      </section>
    </main>
    <Footer />
  </>;
}
