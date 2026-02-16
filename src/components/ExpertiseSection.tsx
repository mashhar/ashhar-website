import { useEffect, useRef, useState } from "react";
import { Brain, Cloud, Database, GitBranch, Layers, Users, ShieldCheck } from "lucide-react";

const domains = [
  { icon: Brain, label: "AI & Machine Learning Strategy" },
  { icon: Cloud, label: "Cloud Architecture (AWS, Azure)" },
  { icon: Database, label: "Enterprise Data Platforms" },
  { icon: GitBranch, label: "DevOps & Platform Engineering" },
  { icon: Layers, label: "Digital Transformation" },
  { icon: Users, label: "Engineering Leadership" },
];

const certifications = [
  "AI Fundamentals – DataCamp",
  "Certified Palantir Foundry Data Engineer Professional",
  "SnowPro Associate Platform Certification",
  "AWS Architecting Solutions on AWS",
  "Microsoft Azure Fundamentals (AZ-900)",
  "AWS Cloud Practitioner (CLF-C02)",
  "Google Generative AI Fundamentals",
  "Google Advanced Data Analytics Specialization",
  "Scrum Alliance CSPO",
  "Snowflake – Introduction to Generative AI",
  "Snowflake – Introduction to Modern Data Engineering",
];

const tools = [
  "AWS", "Microsoft Azure", "Snowflake", "Palantir Foundry",
  "Python", "SQL", "Power BI", "Redshift",
  "CI/CD Pipelines", "DevOps Toolchains", "Data Engineering",
  "AI/ML Frameworks", "GitHub", "Microsoft Fabric", "NoCode/AI Tools",
];

const ExpertiseSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="expertise" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-teal text-sm font-semibold tracking-[0.15em] uppercase mb-3">Skills</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            AI & Cloud Expertise
          </h2>
        </div>

        {/* Domains */}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 mb-16 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {domains.map((d, i) => (
            <div
              key={d.label}
              className="glass-card p-5 flex items-center gap-4 hover:shadow-teal hover:border-teal/30 transition-all duration-300"
              style={{ transitionDelay: `${300 + i * 60}ms` }}
            >
              <d.icon className="text-teal shrink-0" size={24} />
              <span className="text-sm font-medium text-foreground">{d.label}</span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className={`mb-16 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h3 className="font-display font-bold text-xl text-foreground mb-6 flex items-center gap-2">
            <ShieldCheck className="text-teal" size={22} /> Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div className={`transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <h3 className="font-display font-bold text-xl text-foreground mb-6">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span key={tool} className="tech-tile">{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
