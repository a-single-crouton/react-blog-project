const modules = import.meta.glob("./posts/**/*.mdx");

export const posts = Object.entries(modules).map(([path, loader]) => {
  // Turn the file path into a "slug"
  const slug = path
    .replace("./posts/", "")
    .replace(/\/index\.mdx$|\.mdx$/i, "");
  return { slug, loader };
});