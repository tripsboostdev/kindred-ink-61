import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/content";

const Index = () => {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-16">
        <div className="mb-16">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Stories & Thoughts
          </h1>
          <p className="font-body text-base text-muted-foreground mt-4 max-w-lg leading-relaxed">
            A collection of essays on design, technology, and the craft of building things that last.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="font-body text-muted-foreground text-center py-20">
            No posts yet. Add some content via the admin panel.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
