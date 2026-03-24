import { Link } from "react-router-dom";
import type { BlogPost } from "@/lib/content";

interface PostCardProps {
  post: BlogPost;
  index: number;
}

const PostCard = ({ post, index }: PostCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      to={`/post/${post.slug}`}
      className="group block opacity-0 animate-fade-in"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <article className="overflow-hidden">
        <div className="aspect-[16/10] overflow-hidden bg-secondary">
          <img
            src={post.cover}
            alt={post.title}
            loading="lazy"
            width={1200}
            height={800}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
          />
        </div>
        <div className="pt-5 pb-2">
          <time className="font-body text-xs tracking-widest uppercase text-muted-foreground">
            {formattedDate}
          </time>
          <h2 className="font-display text-xl md:text-2xl font-semibold mt-2 text-foreground group-hover:opacity-70 transition-opacity leading-tight">
            {post.title}
          </h2>
          <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
