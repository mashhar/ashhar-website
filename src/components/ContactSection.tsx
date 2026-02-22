import { useState, useRef } from "react";
import { Send, Linkedin, ExternalLink, Database, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (honeypotRef.current?.value) return;

    setStatus("sending");

    try {
      const subject = encodeURIComponent(`Website Contact – Message from ${form.name}`);
      const orgLine = form.organization ? `\nOrganization: ${form.organization}` : "";
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}${orgLine}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:ashharn@icloud.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setForm({ name: "", email: "", organization: "", message: "" });
    } catch {
      setStatus("error");
    }

    setTimeout(() => setStatus("idle"), 6000);
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-teal transition-all duration-300";

  return (
    <section id="contact" className="section-padding bg-surface-subtle">
      <div className="container mx-auto max-w-4xl">
        <p className="text-teal text-sm font-semibold tracking-[0.15em] uppercase mb-3">Get in Touch</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-10">Contact</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot – hidden from users */}
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="absolute opacity-0 h-0 w-0 pointer-events-none"
              aria-hidden="true"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClasses}
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClasses}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Organization
              </label>
              <input
                type="text"
                maxLength={150}
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className={inputClasses}
                placeholder="Company or organization (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                required
                maxLength={1000}
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClasses} resize-none`}
                placeholder="How can Ashhar help you?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-teal-light transition-all duration-300 shadow-teal disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>

            {/* Success message */}
            {status === "success" && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-teal/30 bg-teal/5 animate-fade-in">
                <CheckCircle className="text-teal shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-semibold text-foreground">Thank you for your message.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    It has been received successfully. Ashhar will review your inquiry and respond at the earliest opportunity.
                  </p>
                </div>
              </div>
            )}

            {/* Error message */}
            {status === "error" && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 animate-fade-in">
                <AlertCircle className="text-destructive shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-foreground">
                  We were unable to send your message at this time. Please try again later.
                </p>
              </div>
            )}
          </form>

          {/* Connect sidebar */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-foreground mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://linkedin.com/in/ashhar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass-card p-4 hover:shadow-teal hover:border-teal/30 transition-all duration-300 group"
              >
                <Linkedin className="text-teal" size={20} />
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-teal transition-colors">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">linkedin.com/in/ashhar</p>
                </div>
                <ExternalLink size={14} className="ml-auto text-muted-foreground" />
              </a>
              <a
                href="https://www.datacamp.com/portfolio/ashhar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 glass-card p-4 hover:shadow-teal hover:border-teal/30 transition-all duration-300 group"
              >
                <Database className="text-teal" size={20} />
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-teal transition-colors">DataCamp Portfolio</p>
                  <p className="text-xs text-muted-foreground">datacamp.com/portfolio/ashhar</p>
                </div>
                <ExternalLink size={14} className="ml-auto text-muted-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
