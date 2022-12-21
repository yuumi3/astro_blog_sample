import type { MarkdownInstance } from "astro";


export const blogParms = (post: MarkdownInstance<Record<string, any>>) => {
  const [_, y, m, d, name] = post.file.match(/_blog\/(\d+)-(\d+)-(\d+)-(.+?).md/) ?? [0, 1,1,1,''];
  return {y, m, d, name};
}

export const blogUrl = (post: MarkdownInstance<Record<string, any>>) => {
  const p = blogParms(post);
  return `/blog/${p.y}/${p.m}/${p.d}/${p.name}`;
};
