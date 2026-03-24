// Blog post type and utilities for loading content
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  cover: string;
  excerpt: string;
  body: string;
}

export interface SiteSettings {
  email: string;
  linkedin: string;
  twitter: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  for (const line of frontmatter.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, content };
}

// Import all markdown files from content/posts at build time
const postFiles = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default', eager: true });
const settingsFile = import.meta.glob('/content/settings.json', { eager: true });

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, raw] of Object.entries(postFiles)) {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const { data, content } = parseFrontmatter(raw as string);

    posts.push({
      slug,
      title: data.title || '',
      date: data.date || '',
      cover: data.cover || '',
      excerpt: data.excerpt || '',
      body: content.trim(),
    });
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getSettings(): SiteSettings {
  const entries = Object.values(settingsFile);
  if (entries.length > 0) {
    const s = entries[0] as { default?: SiteSettings } & SiteSettings;
    return s.default || s;
  }
  return { email: '', linkedin: '', twitter: '' };
}
