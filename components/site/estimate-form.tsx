"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, CircleCheck, LoaderCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { serviceOptions, validateContact } from "@/lib/contact-validation";

export function EstimateForm() {
  const [service, setService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const pending = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    setSubmitError("");
    const formData = new FormData(event.currentTarget);
    formData.set("service", service ?? "");
    const validated = validateContact(Object.fromEntries(formData));
    if (!validated.success) {
      setSubmitError(validated.error);
      return;
    }
    pending.current = true;
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.data),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success !== true) {
        throw new Error(typeof result?.error === "string" ? result.error : "Your request could not be confirmed. Please try again shortly.");
      }
      setSubmitted(true);
      toast.success("Estimate request sent!", { description: "Thank you for reaching out. Our team will follow up with you." });
    } catch (error) {
      const message = error instanceof TypeError ? "A connection issue prevented confirmation. Please check your connection and try again." : error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setSubmitError(message);
      toast.error("Request could not be confirmed", { description: message });
    } finally {
      pending.current = false;
      setSubmitting(false);
    }
  }

  if (submitted) return <div className="estimate-card estimate-success" role="status"><span className="success-icon"><CircleCheck size={33} /></span><h3>Your estimate request was sent.</h3><p>Thanks for reaching out. Our team will follow up with you.</p><Button type="button" className="form-submit" onClick={() => { setSubmitted(false); setService(null); setSubmitError(""); }}><RotateCcw size={17} /> Start another request</Button></div>;

  return <form className="estimate-card" onSubmit={handleSubmit} aria-busy={submitting}>
    <div className="form-top"><h3>Tell us what you need</h3><p>Fields marked * are required.</p></div>
    <fieldset disabled={submitting} className="form-grid min-w-0 border-0 p-0 m-0">
      <legend className="sr-only">Your contact details and cleaning service</legend>
      <div className="field"><label htmlFor="full-name">Full Name *</label><Input id="full-name" name="fullName" autoComplete="name" placeholder="Your full name" required minLength={2} maxLength={100} /></div>
      <div className="field"><label htmlFor="phone-number">Phone Number *</label><Input id="phone-number" name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" required minLength={7} maxLength={20} /></div>
      <div className="field"><label htmlFor="email">Email *</label><Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></div>
      <div className="field"><label htmlFor="zip-code">ZIP Code *</label><Input id="zip-code" name="zip" autoComplete="postal-code" inputMode="numeric" placeholder="ZIP code" required maxLength={10} pattern="[0-9]{5}(-[0-9]{4})?" title="Enter a ZIP code such as 12345 or 12345-6789" /></div>
      <div className="field field-wide"><label htmlFor="service">Service (optional)</label>
        <Select value={service} disabled={submitting} onValueChange={setService}>
          <SelectTrigger id="service" className="form-select"><SelectValue placeholder="Choose a cleaning service" /></SelectTrigger>
          <SelectContent className="service-dropdown" align="start" alignItemWithTrigger={false} sideOffset={6}>
            <SelectItem value="">Not sure yet</SelectItem>
            {serviceOptions.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="field field-wide"><label htmlFor="message">Message (optional)</label><Textarea id="message" name="message" placeholder="Tell us a little about your space or your concern..." rows={4} maxLength={1000} /></div>
    </fieldset>
    {submitError && <p className="field-error" role="alert">{submitError}</p>}
    <Button className="form-submit" type="submit" disabled={submitting}>{submitting ? <>Sending request... <LoaderCircle size={18} className="animate-spin" /></> : <>Request My Free Estimate <ArrowRight size={18} /></>}</Button>
  </form>;
}
