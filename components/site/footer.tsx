import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./brand";

export function Footer() {
  return <footer className="site-footer">
    <div className="site-footer-main">
      <div className="footer-identity"><Link href="/" aria-label="Duct Master home"><Brand /></Link><p>Cleaner air. Better living.</p></div>
      <div><h3>Explore</h3><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/#how-it-works">How It Works</Link></div>
      <div><h3>Services</h3><Link href="/services#air-duct-cleaning">Air Duct Cleaning</Link><Link href="/services#dryer-vent-cleaning">Dryer Vent Cleaning</Link><Link href="/services#chimney-cleaning">Chimney Cleaning</Link></div>
      <div><h3>Get started</h3><p>Tell us which part of your home needs attention.</p><Link className="footer-cta" href="/#contact">Request an estimate <ArrowUpRight size={16} /></Link></div>
    </div>
    <div className="site-footer-bottom"><span>© {new Date().getFullYear()} Duct Master. All rights reserved.</span><span>Air ducts · Dryer vents · Chimneys</span></div>
  </footer>;
}
