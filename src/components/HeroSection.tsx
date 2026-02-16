import { ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-navy-gradient opacity-80" />

      {/* Subtle animated glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-teal/5 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-teal/8 blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 container mx-auto text-center px-4">
        {/* Headshot placeholder */}
        <div className="mx-auto mb-8 w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-teal/40 overflow-hidden shadow-teal opacity-0 animate-scale-in bg-navy-light flex items-center justify-center">
          <img
            src="https://assets.datacamp.com/users/avatars/000/218/837/medium/profile-pic-5.png?1769317258"
            alt="Mohammad Ashhar Nadeem"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="text-teal text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Director – AI & Cloud Engineering
        </p>

        <h1 className="font-display font-900 text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          Mohammad Ashhar<br />
          <span className="text-gradient">Nadeem</span>
        </h1>

        <p className="max-w-2xl mx-auto text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          Transforming enterprises through AI-driven innovation, cloud architecture, and data engineering — building intelligent solutions that fuel growth at scale.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <button
            onClick={scrollToContact}
            className="px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-xl hover:bg-teal-light transition-all duration-300 shadow-teal hover:shadow-lg"
          >
            Connect With Me
          </button>
          <a
            href="https://linkedin.com/in/ashhar/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border border-primary-foreground/20 text-primary-foreground font-semibold rounded-xl hover:border-teal hover:text-teal transition-all duration-300"
          >
            View LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: "1.2s" }}>
        <ArrowDown className="text-teal animate-bounce" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;
