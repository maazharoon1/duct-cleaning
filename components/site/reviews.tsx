"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

// Replace these examples with verified customer feedback before publication.
const testimonials = [
  { quote: "Really happy with how it turned out. They explained what they were doing as they went, which I appreciated.", name: "Mike R.", service: "Air duct cleaning" },

{ quote: "We had a lot of dust showing up around the house, so I figured it was time to get the ducts cleaned. The guys were nice, worked quickly, and cleaned up after themselves.", name: "Jessica M.", service: "Air duct cleaning" },

{ quote: "Scheduling was pretty easy. They came out, took a look at everything, and explained what needed to be done. No complaints from me.", name: "Tom W.", service: "Air duct cleaning" },

{ quote: "Our dryer just didn't seem to be drying clothes like it used to. Had the vent cleaned and it's definitely doing better now.", name: "Rachel P.", service: "Dryer vent cleaning" },

{ quote: "Honestly, I didn't think the dryer vent was that dirty until they showed me what came out of it. Glad we got it taken care of.", name: "Brian C.", service: "Dryer vent cleaning" },

{ quote: "They were on time and didn't make a big mess, which was probably my biggest concern. Everything was cleaned up before they left.", name: "Amanda T.", service: "Dryer vent cleaning" },

{ quote: "We had not had the chimney cleaned for a while, and it was certainly time. They had no problem cleaning it, and made sure everything was nice and clean.", name: "Kevin H.", service: "Chimney cleaning" },

{ quote: "The process was actually easier than I anticipated. They discussed what they found in the chimney and took care of it while they were there.", name: "Lauren B.", service: "Chimney cleaning" },

{ quote: "Overall, good experience. They worked carefully inside the home and cleaned up after themselves once they were finished at the fireplace.", name: "Chris D.", service: "Chimney cleaning" },

{ quote: "I contacted them to have my ducts cleaned, and they were able to schedule me right away without all the back-and-forth. They showed up, took care of the job, and I didn't have to think about it again.", name: "Steven G.", service: "Air duct cleaning" },

{ quote: "Clean and efficient process. They found some buildup in the dryer vent that I did not know about and removed it for me.", name: "Nicole F.", service: "Dryer vent cleaning" },
];



export function Reviews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const startX = useRef(0);
  const reduced = useReducedMotion();

  // Responsive review count
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      // Mobile
      if (width < 768) {
        setVisibleCount(1);
      }
      // Tablet / small laptop
      else if (width < 1100) {
        setVisibleCount(2);
      }
      // Desktop
      else {
        setVisibleCount(3);
      }

      const count = width < 768 ? 1 : width < 1100 ? 2 : 3;
      setActive((current) => Math.floor(current / count) * count);
    };

    updateLayout();

    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // Number of steps based on current viewport
  const step = visibleCount;
  const pageCount = Math.ceil(testimonials.length / step);

  const next = () => {
    setActive((current) => ((Math.floor(current / step) + 1) % pageCount) * step);
  };

  const previous = () => {
    setActive(
      (current) =>
        ((Math.floor(current / step) - 1 + pageCount) % pageCount) * step
    );
  };

  // Responsive autoplay speed
  useEffect(() => {
    if (paused || reduced) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    let autoplayDelay = 4500;

    // Mobile
    if (width < 768) {
      autoplayDelay = 5000;
    }
    // Tablet
    else if (width < 1100) {
      autoplayDelay = 4500;
    }
    // Small-height screens
    if (height < 700) {
      autoplayDelay = Math.max(3500, autoplayDelay - 500);
    }

    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActive((current) => ((Math.floor(current / step) + 1) % pageCount) * step);
      }
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [paused, reduced, step, pageCount]);

  return (
    <div
      className="reviews-widget"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div
        className={`review-grid reviews-visible-${visibleCount}`}
        onTouchStart={(event) => {
          startX.current = event.touches[0].clientX;
        }}
        onTouchEnd={(event) => {
          const delta =
            event.changedTouches[0].clientX - startX.current;

          if (Math.abs(delta) > 45) {
            if (delta < 0) {
              next();
            } else {
              previous();
            }
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {Array.from({ length: visibleCount }).map((_, offset) => {
            const item =
              testimonials[(active + offset) % testimonials.length];

            return (
              <motion.article
                className={`review-card review-offset-${offset}`}
                key={`${active}-${offset}`}
                initial={
                  reduced
                    ? false
                    : {
                        opacity: 0,
                        x: 14,
                      }
                }
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={
                  reduced
                    ? undefined
                    : {
                        opacity: 0,
                        x: -14,
                      }
                }
                transition={{
                  duration: 0.26,
                  delay: offset * 0.04,
                }}
              >
                <Quote
                  className="review-quote-icon"
                  size={18}
                  aria-hidden="true"
                />

                <blockquote>“{item.quote}”</blockquote>

                <div className="review-author">
                  <span className="review-avatar" aria-hidden="true">{item.name.charAt(0)}</span>

                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.service}</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="review-controls">
      <div className="review-dots" aria-label="Testimonial pages">
  {Array.from({
    length: Math.ceil(testimonials.length / visibleCount),
  }).map((_, pageIndex) => {
    const pageStart = pageIndex * visibleCount;
    const isActive =
      active >= pageStart &&
      active < pageStart + visibleCount;

    return (
      <button
        key={pageIndex}
        type="button"
        aria-label={`Show testimonial page ${pageIndex + 1}`}
        aria-current={isActive ? "true" : undefined}
        onClick={() => setActive(pageStart)}
      />
    );
  })}
</div>

        <div>
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={previous}
          >
            <ArrowLeft size={16} />
          </button>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={next}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
