import { notFound } from "next/navigation";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import JsonLd from "../../components/seo/JsonLd";
import ArticleLayout from "../../components/blog/ArticleLayout";
import { getPost, posts } from "../../../content/blog";
import { OG_IMAGE, ORGANIZATION_ID, SITE_URL } from "../../data/site";
import { buildMetadata } from "../../lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  const metadata = buildMetadata({
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    path: `/blogs/${post.slug}`,
  });

  return {
    ...metadata,
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: post.date },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const url = `${SITE_URL}/blogs/${post.slug}`;
  const { Content } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.seo?.description || post.excerpt,
        datePublished: post.date,
        dateModified: post.updated || post.date,
        image: OG_IMAGE.url,
        url,
        mainEntityOfPage: url,
        author: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blogs` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  const faqSchema = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <Navbar />

      <main className="min-h-screen bg-white">
        <ArticleLayout post={post}>
          <Content />
        </ArticleLayout>
      </main>

      <Footer />
    </>
  );
}
