import { Linkedin, ExternalLink } from "lucide-react";

const Footer = () => (
  <footer className="bg-navy py-8 px-4">
    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-primary-foreground/60 text-sm">
        © {new Date().getFullYear()} Mohammad Ashhar Nadeem. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <a
          href="https://linkedin.com/in/ashhar/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-foreground/60 hover:text-teal transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <a
          href="https://www.datacamp.com/portfolio/ashhar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-foreground/60 hover:text-teal transition-colors"
          aria-label="DataCamp"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
