import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/experience", "/extracurriculars", "/lab", "/about"];
  const studies = projects.filter((p) => p.caseStudy).map((p) => `/work/${p.slug}`);
  return [...routes, ...studies].map((path) => ({ url: `${site.url}${path}` }));
}
