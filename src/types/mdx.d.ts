/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXContent: ComponentType<any>;
  // If you export frontmatter from each file, type it here:
  export const frontmatter: {
    title: string;
    author: string;
    date: string;
    tags?: string[];
    image?: string;
  };
  export default MDXContent;
}