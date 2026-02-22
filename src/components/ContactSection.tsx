import { useState } from "react";
import { Send, Linkedin, ExternalLink, Database } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:ashharn@icloud.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section-padding bg-surface-subtle">
      <div className="container mx-auto max-w-4xl">
        <p className="text-teal text-sm font-semibold tracking-[0.15em] uppercase mb-3">Get in Touch</p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-10">Contact</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input type="text" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea required maxLength={1000} rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none" placeholder="Your message..." />
            </div>
            <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-teal-light transition-all duration-300 shadow-teal">
              <Send size={16} /> Send Message
            </button>
            {submitted && <p className="text-teal text-sm font-medium">Thank you! Your message has been noted.</p>}
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
