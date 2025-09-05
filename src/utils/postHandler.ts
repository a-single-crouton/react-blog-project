/* eslint-disable @typescript-eslint/no-explicit-any */

// creating an interface for PostMetadata, includes all the information you'd get in the YAML header.
export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  [k: string]: any;
};

// This is the interface for what should be used in loader()
type LoaderMap = Record<string, () => Promise<any>>;

// This is all of our .mdx files, loaded by a Vite helper function.
const modules = import.meta.glob('../posts/*.mdx');

// This function takes one of the paths from loader, maybe? Like the dynamic import and cuts out the slug from the url
function getSlugFromPath(path: string): string {
  if (!path) return path;

  const parts = path.split('/');
  const file = parts[parts.length - 1] ?? '';

  const dot = file.lastIndexOf('.');
  const name = dot === -1 ? file : file.slice(0, dot);
  return name.trim().toLowerCase();
}

// This takes a slug that has been produced somewhere and makes it clean and usable. Im assuming for something like adding them to the UI so theyre just the words.
function normalizeSlug(s: string): string {
  if (!s) return s;
  let out = s.trim();

  while (out.startsWith('/')) out = out.slice(1);
  while (out.endsWith('/')) out = out.slice(0, -1);

  const lower = out.toLowerCase();
  if (lower.endsWith('.mdx')) {
    out = out.slice(0, out.length - 4);
  }

  return out.toLowerCase();
}

// This just extracts the frontmatter from each post and grabs whatever is available
function frontmatter(mod: any) {
  return mod?.attributes ?? mod?.default?.attributes ?? mod?.frontmatter ?? {};
}

// entries maps of each module, it returns an object containing the dynamic import (loader) and the clean slug (getSlugFromPath) from each module.
const entries = Object.keys(modules).map((path) => {
  return { slug: getSlugFromPath(path), loader: (modules as LoaderMap)[path] };
});

// This istantiates a module for the cache that is empty as its instantiated, and a function that empties the cache.
let _metaCache: PostMeta[] | null = null;
export function invalidateCache() { _metaCache = null; }

// Get all posts is an async function that returns a list of posts and accepts a promise of type postMeta
export async function getAllPostMeta(): Promise<PostMeta[]> {
    // if the cache exists simply return it.
  if (_metaCache) return _metaCache;

//   List awaits the entries we instantiated earlier. It deconstructs slug and loader from entries to create a list of all entries of type postMeta
  const list = await Promise.all(
    entries.map(async ({ slug, loader }) => {
      try {
        const mod = await loader();
        const fm = frontmatter(mod);
        const rawTags = fm?.tags;
        const tags: string[] | undefined =
          Array.isArray(rawTags)
            ? rawTags.filter(Boolean)
            : typeof rawTags === 'string' && rawTags.trim().length > 0
            ? rawTags.split(',').map(s => s.trim()).filter(Boolean)
            : undefined;
        return {
          slug,
          title: fm.title ?? slug,
          date: fm.date,
          excerpt: fm.excerpt,
          tags,
          ...fm,
        } as PostMeta;
      } catch (e: unknown) {

        if(e instanceof Error) {
          console.error('postHandler failed: ', e.message);
        } else {
          console.error('postHandler failed with non-Error:', e)
        }
        return { slug, title: slug } as PostMeta;
      }
    })
  );

// Date parsing shenanigans
  list.sort((a, b) => {
    const ta = a.date ? Date.parse(a.date) : 0;
    const tb = b.date ? Date.parse(b.date) : 0;
    const na = Number.isNaN(ta) ? 0 : ta;
    const nb = Number.isNaN(tb) ? 0 : tb;
    return nb - na;
  });

  _metaCache = list;
  return list;
}


// getPostBySlug accepts a raw slug and returns a promise containing metadata 
// and a component of any type. The slug is then cleaned, then entries is searched 
// for one matching the slug. If there isn't one, return null. Set mod to load the 
// found entry, and set fm to the matching frontmatter. Finally, return a component 
// containing the content and a meta object containing all of the metadata matching 
// the slug.
export async function getPostBySlug(slugRaw: string): Promise<{ component: any; meta: PostMeta } | null> {
  const slug = normalizeSlug(slugRaw);
  const entry = entries.find((e) => e.slug === slug);
  if (!entry) return null;
  const mod = await entry.loader();
  const fm = frontmatter(mod);
  return {
    component: mod?.default ?? null,
    meta: {
      slug,
      title: fm.title ?? slug,
      date: fm.date,
      excerpt: fm.excerpt,
      tags: fm.tags,
      ...fm,
    },
  };
}