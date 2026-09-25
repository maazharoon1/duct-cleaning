"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// Replace these examples with verified customer feedback before publication.
const testimonials = [
  { quote: "The process felt simple from the first conversation to the final check. Everything was explained clearly.", name: "Sample homeowner", service: "Air duct cleaning" },
  { quote: "It helped to understand exactly what was being cleaned and why. The service felt careful and professional.", name: "Sample homeowner", service: "Dryer vent cleaning" },
  { quote: "Scheduling was straightforward, and the work was handled with care around the home.", name: "Sample homeowner", service: "Chimney cleaning" },
];

export function Reviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);
  const reduced = useReducedMotion();
  const next = () => setActive((current) => (current + 1) % testimonials.length);
  const previous = () => setActive((current) => (current - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused || reduced) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % testimonials.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [paused, reduced]);

  return <div className="reviews-widget" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
    <div className="review-grid" onTouchStart={(event) => { startX.current = event.touches[0].clientX; }} onTouchEnd={(event) => { const delta = event.changedTouches[0].clientX - startX.current; if (Math.abs(delta) > 45) { if (delta < 0) next(); else previous(); } }}>
      <AnimatePresence mode="popLayout">
        {[0, 1, 2].map((offset) => {
          const item = testimonials[(active + offset) % testimonials.length];
          return <motion.article
            className={"review-card review-offset-" + offset}
            key={active + "-" + offset}
            initial={reduced ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -14 }}
            transition={{ duration: .26, delay: offset * .04 }}
          >
            <Quote className="review-quote-icon" size={18} aria-hidden="true" />
            <blockquote>“{item.quote}”</blockquote>
            <div className="review-author"><span className="review-avatar">S</span><div><strong>{item.name}</strong><span>{item.service}</span></div></div>
          </motion.article>;
        })}
      </AnimatePresence>
    </div>
    <div className="review-controls">
      <div className="review-dots" aria-label="Testimonial pages">{testimonials.map((_, index) => <button key={index} type="button" aria-label={"Show testimonial " + (index + 1)} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} />)}</div>
      <div><button type="button" aria-label="Previous testimonial" onClick={previous}><ArrowLeft size={16} /></button><button type="button" aria-label="Next testimonial" onClick={next}><ArrowRight size={16} /></button></div>
    </div>
  </div>;
}
