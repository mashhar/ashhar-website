import { useEffect, useState } from "react";
import { ExternalLink, Calendar } from "lucide-react";

interface Post {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
}

const BlogSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getExcerpt = (html: string) => {
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > 150 ? text.slice(0, 150) + "…" : text;
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section id="blog" className="section-padding bg-surface-subtle">
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2 text-center">
          My <span className="text-gradient">Blog</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
          Thoughts, tutorials, and insights I share on Medium.
        </p>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No posts found. Check back later!
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 flex flex-col gap-3 group hover:shadow-teal hover:border-teal transition-all duration-300"
              >
                <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-teal transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm flex-1">
                  {getExcerpt(post.description)}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={14} />
                    {formatDate(post.pubDate)}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-teal group-hover:underline">
                    Read More <ExternalLink size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="https://ashharn.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            View All Posts on Medium <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
