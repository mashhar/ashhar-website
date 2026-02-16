import { useEffect, useRef, useState } from "react";
import { Award, Cloud, Cpu, Globe } from "lucide-react";

const stats = [
  { icon: Award, label: "Years Experience", value: "20+" },
  { icon: Cpu, label: "AI & Cloud Leadership", value: "Expert" },
  { icon: Cloud, label: "Enterprise Transformation", value: "Global" },
  { icon: Globe, label: "Industry Impact", value: "Multi-Sector" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-teal text-sm font-semibold tracking-[0.15em] uppercase mb-3">About</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-8">
            Executive Profile
          </h2>
        </div>

        <div className={`grid md:grid-cols-5 gap-10 items-start transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="md:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              With over two decades of experience spanning AI, Cloud Engineering, DevOps, and enterprise technology leadership, I specialize in driving large-scale digital transformation and building high-performance engineering organizations.
            </p>
            <p>
              As Director of Data and Cloud Engineering at EXL, I lead innovation in analytics and data platforms through AI and cloud technologies, delivering impactful business outcomes and enhancing client success in the rapidly evolving data engineering landscape.
            </p>
            <p>
              My career journey includes founding IntellicHUB — enabling non-tech entrepreneurs to build and launch applications using NoCode and AI tools — and holding senior consulting and product leadership roles at Coforge, Dell, First American Financial, and Infosys, where I drove engineering modernization, DevOps adoption, and enterprise-scale platform programs.
            </p>
            <p>
              Holding a PGDIT from IIT Kharagpur and a B.Tech in Electrical Engineering, I combine deep technical roots with strategic business acumen to bridge the gap between technology vision and enterprise execution.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`glass-card p-5 text-center transition-all duration-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                <stat.icon className="mx-auto mb-3 text-teal" size={28} />
                <p className="font-display font-bold text-lg text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
