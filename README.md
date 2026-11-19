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

## Blog Cover Images

Every post in `content/blog/` has a cover at `public/blog/<slug>/cover.png`, set by `cover` in the post's `metadata`. Until the file exists, the site shows a branded placeholder.

Covers follow the same design as the AarambhGrow services site: a cream background, a navy serif headline baked into the image, and a flat-vector scene.

- **Size:** 16:9 landscape (1920×1080). The site displays covers at 16:9, so any other ratio gets cropped and the headline can be cut off.
- **How to generate:** paste the **master style prompt**, then the **per-post prompt** below it. If the tool accepts a reference image (ChatGPT, Ideogram, or Midjourney with `--sref`), also attach one of the services site's covers (`aarambhgrow-services/public/blog/cgtmse-loan-scheme-2026.png`) as a style reference. That does the most for consistency.
- **Before uploading:** check that every word in the image is spelled correctly. If a label comes out garbled, remove it from the prompt and regenerate.

### Master style prompt (use for every cover)

```
Blog cover illustration for AarambhGrow Advisory, an Indian company registration, tax and compliance advisory.

FORMAT: 16:9 landscape, 1920x1080.

STYLE: Clean, modern flat-vector editorial illustration with soft gradients and gentle shading. Airy, premium, lots of empty space. Not photorealistic, not a 3D render, not cartoonish.

BACKGROUND: Warm off-white cream (#FAF7F2). Faint pale-grey city skyline along the horizon, a large soft peach-orange circle (like a sun) behind the main object, a few soft clouds, a light ground plane.

COLOURS: Deep navy #03254C (main), bright orange #F26522 (accent), forest green #157327 (trees, small accents), warm gold for small details, light greys. No other strong colours.

LAYOUT: Left half holds the headline, left-aligned and vertically centred. Right half holds the illustration. Keep a 6% empty margin on every edge.

TYPOGRAPHY: Headline in a heavy, high-contrast serif (like Playfair Display Black or DM Serif Display) in navy. The key number or year in the same serif in orange. Subtitle in a lighter serif, smaller, navy. Under the text, a thin short divider line in three segments: orange, light grey, green.

PEOPLE: Indian professionals in flat-vector style, simple features, navy business or smart-casual clothes.

RECURRING PROPS: White documents and certificates with grey text lines and a navy check-mark seal, a clipboard checklist with check marks, a wall or desk calendar with dates circled in orange, a laptop showing check marks, a rubber stamp, a small modern office building, rounded green trees, an orange upward arrow.

RULES: Spell all text exactly as given and add no other words. No government emblems, Ashoka lion, national flag, or MCA, tax department or other official logos. No watermarks, no real people.
```

AarambhGrow Advisory is a private firm, so covers must never use the national emblem or official logos. The law restricts private use of the emblem, and it can make the site look like a government body.

### Per-post prompt template

```
HEADLINE TEXT (exactly this, nothing else):
Line 1 (very large): <short topic, 1–3 words>
Line 2 (very large): <rest of title> <number or year in orange>
Line 3 (subtitle): <5–7 word promise>

SCENE (right half): <1 person> + <1 main object for the topic> + <1–2 supporting props from the recurring list>, soft sun circle behind the main object, skyline and trees at the horizon.

MOOD: <one line>
```

**For "A vs B" comparison posts**, replace the layout with this:

```
LAYOUT OVERRIDE: Split the image into two halves with a thin diagonal divider line that fades from orange to green, and a navy circle with white "VS" in the centre. Each half has its own short headline at the top, with its illustration below.
```

Keep the words in the image few and short. The more words a prompt asks for, the more spelling mistakes the image comes back with.

### Prompts for current posts

**`private-limited-company-compliance-checklist-2026`**

```
HEADLINE TEXT (exactly this, nothing else):
Line 1 (very large): Pvt Ltd Compliance
Line 2 (very large): Checklist 2026  ← "2026" in orange
Line 3 (subtitle): First-Year Deadlines & Annual Filings

SCENE (right half):
A young Indian founder in a navy suit holds a large white clipboard checklist with navy and green check marks.
Behind him, a large calendar page shows a short timeline with three orange milestone dots labelled "30", "60" and "180".
Beside the clipboard, a white certificate with a navy check-mark seal and a rubber stamp.
A soft peach sun circle sits behind the calendar. A small modern office building, a pale skyline and green trees are at the far right.

MOOD: Organised and in control, not stressful. Everything looks tidy and on schedule.
```

**`private-limited-company-registration-india-2026`** (replaces the current cover)

```
HEADLINE TEXT (exactly this, nothing else):
Line 1 (very large): Private Limited
Line 2 (very large): Registration 2026  ← "2026" in orange
Line 3 (subtitle): Process, Documents & Cost

SCENE (right half):
An Indian woman founder in a navy blazer stands beside a large white certificate with a navy check-mark seal.
Next to it, an open laptop shows a horizontal progress bar with four steps, three ticked in green.
A rubber stamp and a small stack of documents sit in the foreground.
A soft peach sun circle sits behind the certificate. A small new office building with an orange upward arrow, a pale skyline and green trees are at the far right.

MOOD: A fresh start, confident and straightforward.
```

**`private-limited-vs-llp-2026`** (replaces the current cover; uses the comparison layout)

```
LAYOUT OVERRIDE: Split the image into two halves with a thin diagonal divider line that fades from orange to green, and a navy circle with white "VS" in the centre. Each half has its own short headline at the top, with its illustration below.

HEADLINE TEXT (exactly this, nothing else):
Left half (very large): Private Limited
Left half (subtitle): Built for Investors
Right half (very large): LLP
Right half (subtitle): Built for Partners

SCENE:
Left half: a modern navy-and-white corporate office building, a white share certificate with a navy check-mark seal, and a small orange bar chart rising, with a soft blue-grey sun circle behind.
Right half: two Indian business partners shaking hands beside a white partnership agreement document with a pen, with a soft peach sun circle behind.
Pale skyline and green trees along the horizon on both sides.

MOOD: Balanced and fair. Neither side looks better than the other.
```

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


