import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-border">
      <div className="container max-w-5xl mx-auto flex items-center justify-between py-6 px-4">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-foreground hover:opacity-70 transition-opacity">
          Journal
        </Link>
        <nav className="flex items-center gap-8">
          <Link to="/" className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
