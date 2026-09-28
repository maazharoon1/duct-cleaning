"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Brand } from "./brand";

const links = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  const handleHomeClick = () => {
    setOpen(false);
    if (pathname === "/") document.getElementById("home")?.scrollIntoView({ behavior: "instant", block: "start" });
  };
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return <>
    <header className={"site-header" + (scrolled ? " is-scrolled" : "")}>
      <div className="header-inner">
        <Link className="brand-link" href="/#home" onClick={handleHomeClick}><Brand /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <Link key={link.href} href={link.href} onClick={link.href === "/#home" ? handleHomeClick : undefined}>{link.label}</Link>)}</nav>
        <Link className="button button-primary header-cta" href="/#contact">Get a Free Estimate <ArrowRight size={17} /></Link>
        <button className="mobile-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
    </header>
    <AnimatePresence>
      {open && <motion.nav
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Mobile navigation"
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -12 }}
        transition={{ duration: 0.22 }}
      >
        <div className="mobile-menu-links">{links.map((link) => <Link key={link.href} href={link.href} onClick={link.href === "/#home" ? handleHomeClick : () => setOpen(false)}>{link.label}<ArrowRight size={19} /></Link>)}</div>
        <Link href="/#contact" className="button button-primary" onClick={() => setOpen(false)}>Get a Free Estimate <ArrowRight size={18} /></Link>
        <p>Cleaner air. Better living.</p>
      </motion.nav>}
    </AnimatePresence>
  </>;
}
