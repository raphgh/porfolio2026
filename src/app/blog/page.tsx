import type { Metadata } from "next";
import { BlogView } from "@/components/blog/BlogView";

export const metadata: Metadata = {
  title: "Blog",
  description: "cool things worth sharing!",
};

export default function BlogPage() {
  return <BlogView />;
}
