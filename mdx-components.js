import * as Blog from "./app/components/blog/BlogBlocks";

/*
  Global MDX components. Markdown elements get the blog styling, and every
  blog block is available inside .mdx files without an import.
*/
const components = {
  h2: Blog.H2,
  h3: Blog.H3,
  p: Blog.P,
  ul: Blog.UL,
  li: Blog.LI,
  a: Blog.A,
  strong: Blog.Strong,
  ...Blog,
};

export function useMDXComponents() {
  return components;
}
