import BlogHero from "@/components/blogs/BlogsHero";
import FeaturedPost from "@/components/blogs/FeaturedPost";
import BlogGrid from "@/components/blogs/BlogGrid";
import Newsletter from "@/components/blogs/Newsletter";
import CTA from "@/components/common/CTA/CTA";

export default function BlogsPage() {
  return (
    <>
      <BlogHero />
      <FeaturedPost />
      <BlogGrid />
      <Newsletter />
      <CTA />
    </>
  );
}