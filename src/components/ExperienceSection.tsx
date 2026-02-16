import { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Director – Data & Cloud Engineering",
    company: "EXL",
    period: "Nov 2023 – Present",
    highlights: [
      "Driving innovation in analytics and data platforms through AI and cloud technologies",
      "Delivering impactful business outcomes and enhancing client success across data engineering initiatives",
      "Leading enterprise-scale cloud migration and modernization programs",
      "Establishing best practices for data engineering and AI-driven decision-making",
    ],
  },
  {
    title: "Founder",
    company: "IntellicHUB",
    period: "Dec 2022 – Nov 2023",
    highlights: [
      "Enabled non-tech entrepreneurs and businesses to build and launch apps using NoCode and AI tools",
      "Accelerated rapid application development for startups and SMBs",
      "Helped firms stay competitive through technology-led transformation",
    ],
  },
  {
    title: "Sr Product Manager",
    company: "WIN Home Inspection",
    period: "Sep 2022 – Nov 2022",
    highlights: [
      "Managed product strategy and roadmap for home inspection technology platform",
      "Drove product improvements focused on operational efficiency and customer experience",
    ],
  },
  {
    title: "Sr Business Solution Consultant",
    company: "Coforge",
    period: "Apr 2019 – Aug 2022",
    highlights: [
      "Led enterprise solution architecture for major client accounts",
      "Drove DevOps modernization and cloud-first strategies",
      "Delivered digital transformation programs across multiple business units",
      "Advised C-suite stakeholders on technology roadmap and innovation",
    ],
  },
  {
    title: "Business Solutions Consultant",
    company: "Coforge",
    period: "Dec 2015 – Mar 2019",
    highlights: [
      "Designed and implemented enterprise business solutions",
      "Bridged technology and business strategy for large-scale programs",
      "Built high-performing cross-functional delivery teams",
    ],
  },
  {
    title: "Sr Business Consultant",
    company: "INSZoom",
    period: "Nov 2014 – Oct 2015",
    highlights: [
      "Provided strategic consulting on immigration technology solutions",
      "Optimized platform capabilities and client engagement workflows",
    ],
  },
  {
    title: "Sr Product Lead – Mortgage Services",
    company: "First American Financial Corporation",
    period: "Oct 2012 – Oct 2014",
    highlights: [
      "Led lender integration management for mortgage services division",
      "Drove product innovation and process automation initiatives",
      "Managed cross-functional teams delivering enterprise mortgage solutions",
    ],
  },
  {
    title: "Business Systems Analyst Advisor – Global Product Data",
    company: "Dell",
    period: "Jun 2009 – Oct 2012",
    highlights: [
      "Advised on global product data management and systems architecture",
      "Led enterprise data quality and governance initiatives",
      "Collaborated with global teams on platform engineering projects",
    ],
  },
  {
    title: "System Analyst & Team Lead",
    company: "Infosys Technologies Ltd",
    period: "Sep 2002 – May 2009",
    highlights: [
      "Led development teams delivering enterprise software solutions",
      "Progressed from engineer to team lead managing cross-functional delivery",
      "Built foundational expertise in systems design and engineering practices",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section-padding bg-surface-subtle" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-teal text-sm font-semibold tracking-[0.15em] uppercase mb-3">Career</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Professional Experience
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`relative pl-12 md:pl-16 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${200 + i * 80}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 md:left-3.5 top-1.5 w-4 h-4 rounded-full bg-teal border-4 border-background shadow-sm" />

                <div className="glass-card p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h3 className="font-display font-bold text-foreground text-lg">{exp.title}</h3>
                      <p className="text-teal font-semibold text-sm flex items-center gap-2">
                        <Briefcase size={14} /> {exp.company}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 sm:mt-0 whitespace-nowrap">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-teal mt-1.5 shrink-0">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
