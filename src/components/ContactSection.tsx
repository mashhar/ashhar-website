import { useState, useRef, useEffect } from "react";
import { Send, Linkedin, ExternalLink, Database, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", organization: "", message: "", honeypot: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [visible, setVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (form.honeypot) return;

    setStatus("loading");

    try {
      const subject = encodeURIComponent(`Website Contact – Message from ${form.name}`);
      const orgLine = form.organization ? `\nOrganization: ${form.organization}` : "";
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}${orgLine}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:ashharn@icloud.com?subject=${subject}&body=${body}`;
      setStatus("success");
      setForm({ name: "", email: "", organization: "", message: "", honeypot: "" });
      setTimeout(() => setStatus("idle"), 8000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const inputClasses = (field: string) =>
    `w-full px-4 py-3 rounded-xl border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300 ${
      focusedField === field ? "border-teal shadow-teal" : "border-border"
    }`;

  return (
    <section id="contact" className="section-padding bg-surface-subtle" ref={sectionRef}>
      <div className="container mx-auto max-w-4xl">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-teal text-sm font-semibold tracking-[0.15em] uppercase mb-3">Get in Touch</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-10">Contact</h2>
        </div>

        <div className={`grid md:grid-cols-2 gap-10 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot — hidden from real users */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={inputClasses("name")}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={inputClasses("email")}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Organization</label>
              <input
                type="text"
                maxLength={200}
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                onFocus={() => setFocusedField("org")}
                onBlur={() => setFocusedField(null)}
                className={inputClasses("org")}
                placeholder="Your organization (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
              <textarea
                required
                maxLength={1000}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={`${inputClasses("message")} resize-none`}
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-teal-light transition-all duration-300 shadow-teal disabled:opacity-70"
            >
              {status === "loading" ? (
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
                <CheckCircle size={20} className="text-teal shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Thank you for your message. It has been received successfully.</p>
                  <p className="text-xs text-muted-foreground mt-1">Ashhar will review your inquiry and respond at the earliest opportunity.</p>
                </div>
              </div>
            )}

            {/* Error message */}
            {status === "error" && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-destructive/30 bg-destructive/5 animate-fade-in">
                <AlertCircle size={20} className="text-destructive shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">We were unable to send your message at this time. Please try again later.</p>
              </div>
            )}
          </form>

          <div className="space-y-6">
            <h3 className="font-display font-bold text-lg text-foreground mb-4">Connect</h3>
            <div className="space-y-3">
              <a href="https://linkedin.com/in/ashhar/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 glass-card p-4 hover:shadow-teal hover:border-teal/30 transition-all duration-300 group">
                <Linkedin className="text-teal" size={20} />
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-teal transition-colors">LinkedIn</p>
                  <p className="text-xs text-muted-foreground">linkedin.com/in/ashhar</p>
                </div>
                <ExternalLink size={14} className="ml-auto text-muted-foreground" />
              </a>
              <a href="https://www.datacamp.com/portfolio/ashhar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 glass-card p-4 hover:shadow-teal hover:border-teal/30 transition-all duration-300 group">
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
