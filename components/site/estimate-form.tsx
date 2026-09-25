"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CircleCheck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const serviceOptions = ["Air Duct Cleaning", "Dryer Vent Cleaning", "Chimney Cleaning"];

export function EstimateForm() {
  const [service, setService] = useState("");
  const [serviceError, setServiceError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!service) { setServiceError(true); return; }
    if (!event.currentTarget.reportValidity()) return;
    // Prototype only: connect this handler to a real endpoint before accepting leads.
    setSubmitted(true);
  }

  if (submitted) return <div className="estimate-card estimate-success" role="status"><span className="success-icon"><CircleCheck size={33} /></span><h3>Your details are ready.</h3><p>This site is a demo, so your request has not been sent. Once an estimate service is connected, submissions can be delivered to the business.</p><Button type="button" className="form-submit" onClick={() => { setSubmitted(false); setService(""); setServiceError(false); }}><RotateCcw size={17} /> Start another request</Button></div>;

  return <form className="estimate-card" onSubmit={handleSubmit}>
    <div className="form-top"><h3>Tell us what you need</h3><p>Fields marked * are required.</p></div>
    <div className="form-grid">
      <div className="field"><label htmlFor="full-name">Full Name *</label><Input id="full-name" name="fullName" autoComplete="name" placeholder="Your full name" required minLength={2} /></div>
      <div className="field"><label htmlFor="phone-number">Phone Number *</label><Input id="phone-number" name="phone" type="tel" autoComplete="tel" placeholder="(555) 000-0000" required pattern="[+0-9().\s-]{7,20}" title="Enter a valid phone number" /></div>
      <div className="field"><label htmlFor="email">Email *</label><Input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div>
      <div className="field"><label htmlFor="zip-code">ZIP Code *</label><Input id="zip-code" name="zip" autoComplete="postal-code" inputMode="numeric" placeholder="ZIP code" required pattern="[0-9]{5}(-[0-9]{4})?" title="Enter a five-digit ZIP code" /></div>

      <div className="field field-wide"><label htmlFor="message">Message</label><Textarea id="message" name="message" placeholder="Tell us a little about your space or your concern..." rows={4} maxLength={1000} /></div>
    </div>
    <Button className="form-submit" type="submit">Request My Free Estimate <ArrowRight size={18} /></Button>
    <p className="form-disclaimer">Demo form — no information is sent or stored.</p>
  </form>;
}
