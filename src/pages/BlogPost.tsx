import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/lib/content";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground">Post not found</h1>
            <Link to="/" className="font-body text-sm text-muted-foreground mt-4 inline-block hover:text-foreground transition-colors underline underline-offset-4">
              ← Back to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Cover image */}
        <div className="w-full max-w-5xl mx-auto px-4 pt-8">
          <div className="aspect-[21/9] overflow-hidden bg-secondary">
            <img
              src={post.cover}
              alt={post.title}
              width={1200}
              height={514}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article content */}
        <article className="container max-w-2xl mx-auto px-4 py-12">
          <Link
            to="/"
            className="font-body text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            ← All Posts
          </Link>

          <time className="block font-body text-xs tracking-widest uppercase text-muted-foreground mt-8">
            {formattedDate}
          </time>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mt-3 leading-tight">
            {post.title}
          </h1>

          <div className="mt-10 prose prose-neutral max-w-none font-body text-foreground leading-[1.8] [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-6 [&_blockquote]:border-l-2 [&_blockquote]:border-foreground [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_li]:mb-2 [&_strong]:font-semibold [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-70">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.body}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
