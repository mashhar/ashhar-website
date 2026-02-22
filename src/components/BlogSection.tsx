import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar } from "lucide-react";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
}

const MEDIUM_RSS_URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ashharn";

const stripHtml = (html: string) => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

const extractImage = (content: string, thumbnail: string): string => {
  if (thumbnail && thumbnail.startsWith("http")) return thumbnail;
  const match = content?.match(/<img[^>]+src=["']([^"']+)["']/);
  return match?.[1] || "https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png";
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const scrollSpeed = 0.5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(MEDIUM_RSS_URL);
        const data = await res.json();
        if (data.status === "ok" && data.items) {
          const mapped: BlogPost[] = data.items.slice(0, 6).map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            thumbnail: extractImage(item.content || item.description, item.thumbnail),
            description: stripHtml(item.description || item.content || "").slice(0, 160) + "…",
          }));
          setPosts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Intersection observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll logic
  const animate = useCallback(() => {
    if (scrollRef.current && !isPaused) {
      const el = scrollRef.current;
      el.scrollLeft += scrollSpeed;
      // Loop back when reaching end
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
        el.scrollLeft = 0;
      }
    }
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    if (posts.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate, posts.length]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 380;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="blog" className="section-padding bg-background" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-teal text-sm font-semibold tracking-[0.15em] uppercase mb-3">Blog</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
            Insights & Thought Leadership
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
            Sharing perspectives on AI, Cloud Strategy, Data Engineering, and Enterprise Transformation.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[340px] glass-card animate-pulse">
                <div className="h-48 bg-muted rounded-t-2xl" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Carousel */}
        {!loading && posts.length > 0 && (
          <div
            className={`relative transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Arrow controls */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-teal hover:shadow-teal transition-all duration-300"
              aria-label="Previous posts"
            >
              <ArrowLeft size={18} className="text-foreground" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-teal hover:shadow-teal transition-all duration-300"
              aria-label="Next posts"
            >
              <ArrowRight size={18} className="text-foreground" />
            </button>

            {/* Scrollable container */}
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {posts.map((post, idx) => (
                <article
                  key={post.link}
                  className="group min-w-[320px] md:min-w-[360px] max-w-[380px] glass-card overflow-hidden flex-shrink-0 hover:shadow-teal hover:border-teal/30 transition-all duration-300"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar size={12} className="text-teal" />
                      {formatDate(post.pubDate)}
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground leading-snug line-clamp-2 group-hover:text-teal transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal-light transition-colors duration-200 mt-auto pt-2"
                    >
                      Read Full Article <ExternalLink size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* View All link */}
        {!loading && posts.length > 0 && (
          <div className={`mt-10 text-center transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <a
              href="https://ashharn.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-xl hover:border-teal hover:text-teal transition-all duration-300"
            >
              View All Articles <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
