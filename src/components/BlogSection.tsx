import { useEffect, useRef, useState, useCallback } from "react";
import { ExternalLink, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<MediumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [hovering, setHovering] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Auto-scroll: slow, elegant, pauses on hover
  useEffect(() => {
    if (!emblaApi || posts.length === 0) return;
    const start = () => {
      autoplayRef.current = setInterval(() => {
        if (!hovering) emblaApi.scrollNext();
      }, 4000);
    };
    start();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi, hovering, posts.length]);

  // Intersection observer for scroll-reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Fetch Medium RSS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ashharn"
        );
        const data = await res.json();
        if (data.status === "ok") {
          setPosts(data.items.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to fetch Medium posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const getHeaderImage = (post: MediumPost): string => {
    if (post.thumbnail) return post.thumbnail;
    const match = post.description?.match(/<img[^>]+src="([^"]+)"/);
    return match?.[1] || "";
  };

  const getExcerpt = (html: string) => {
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > 140 ? text.slice(0, 140) + "…" : text;
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section id="blog" className="section-padding bg-surface-subtle" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-teal text-sm font-semibold tracking-[0.15em] uppercase mb-3">Blog</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Insights & <span className="text-gradient">Thought Leadership</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl leading-relaxed">
            Sharing perspectives on AI, Cloud Strategy, Data Engineering, and Enterprise Transformation.
          </p>
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card overflow-hidden animate-pulse">
                <div className="h-52 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No posts found. Check back later!</p>
        ) : (
          <div
            className={`relative transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Arrow controls */}
            <button
              onClick={scrollPrev}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-teal hover:text-teal transition-colors"
              aria-label="Previous post"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:border-teal hover:text-teal transition-colors"
              aria-label="Next post"
            >
              <ChevronRight size={20} />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {posts.map((post) => {
                  const image = getHeaderImage(post);
                  return (
                    <div
                      key={post.link}
                      className="flex-[0_0_100%] min-w-0 md:flex-[0_0_calc(33.333%-16px)]"
                    >
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card overflow-hidden flex flex-col group hover:shadow-teal hover:border-teal/30 transition-all duration-300 h-full"
                      >
                        {image && (
                          <div className="h-52 overflow-hidden">
                            <img
                              src={image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-6 flex flex-col gap-3 flex-1">
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar size={13} />
                            {formatDate(post.pubDate)}
                          </span>
                          <h3 className="font-display font-bold text-foreground group-hover:text-teal transition-colors line-clamp-2 leading-snug text-lg">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm flex-1 leading-relaxed">
                            {getExcerpt(post.description)}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal group-hover:underline mt-auto pt-3">
                            Read Full Article <ExternalLink size={14} />
                          </span>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className={`text-center mt-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "700ms" }}>
          <a
            href="https://ashharn.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-accent-foreground font-semibold hover:bg-teal-light transition-all duration-300 shadow-teal"
          >
            View All Posts on Medium <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
