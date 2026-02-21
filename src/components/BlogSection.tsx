import { useEffect, useRef, useState } from "react";
import { ExternalLink, Calendar } from "lucide-react";

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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ashharn"
        );
        const data = await res.json();
        if (data.status === "ok") {
          setPosts(data.items.slice(0, 3));
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
    // Prefer the thumbnail field — this is Medium's featured/header image
    if (post.thumbnail) return post.thumbnail;
    // Fallback: extract first image from the post HTML
    const match = post.description?.match(/<img[^>]+src="([^"]+)"/);
    return match?.[1] || "";
  };

  const getExcerpt = (html: string) => {
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > 120 ? text.slice(0, 120) + "…" : text;
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section id="blog" className="section-padding bg-surface-subtle" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <div className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-teal text-sm font-semibold tracking-[0.15em] uppercase mb-3">Blog</p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground">
            Latest from <span className="text-gradient">Medium</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Thoughts, tutorials, and insights I share on Medium.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card overflow-hidden animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-5 space-y-3">
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
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, i) => {
              const image = getHeaderImage(post);
              return (
                <a
                  key={post.link}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card overflow-hidden flex flex-col group hover:shadow-teal hover:border-teal transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${300 + i * 120}ms` }}
                >
                  {image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col gap-2.5 flex-1">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={13} />
                      {formatDate(post.pubDate)}
                    </span>
                    <h3 className="font-display font-bold text-foreground group-hover:text-teal transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1 leading-relaxed">
                      {getExcerpt(post.description)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-teal group-hover:underline mt-auto pt-2">
                      Read More <ExternalLink size={14} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        <div className={`text-center mt-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "700ms" }}>
          <a
            href="https://ashharn.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity shadow-teal"
          >
            View All Posts on Medium <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
