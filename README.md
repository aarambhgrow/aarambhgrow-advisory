<div align="right"><img src="https://img.shields.io/badge/production-live-brightgreen"></div>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.





Setup

- content/blog/*.mdx holds one file per post.
- app/blog/page.js is the listing page, built automatically from each post's header.
- app/blog/[slug]/page.js renders any post and generates its SEO metadata.
- app/components/blog/ holds the reusable blocks.
- Optionally add a layout: field in the header ("classic", "wide", "magazine") to switch the overall page frame.

Your workflow

1. Your team sends the content as a Doc or Word file, plus images.
2. You create one .mdx file and drop the images into public/blog/<slug>/.
3. You arrange the blocks to suit that post.
4. You commit and deploy, and the post is live and added to the sitemap.

Once there's a library of blocks, each new post should take about 15–30 minutes.


