import { PROJECTS_DUMMY } from "@/common/constants/projects";
import { createClient } from "@/common/utils/server";

export const getProjectsData = async () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase environment variables are missing.");
    return PROJECTS_DUMMY;
  }

  const supabase = createClient();

  const { data, error } = await supabase.from("projects").select();

  if (error) {
    console.error("Supabase Error:", error.message);
    return PROJECTS_DUMMY;
  }

  return data && data.length > 0 ? data : PROJECTS_DUMMY;
};

export const getProjectsDataBySlug = async (slug: string) => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase environment variables are missing.");
    return PROJECTS_DUMMY.find((p) => p.slug === slug) || null;
  }

  const supabase = createClient();

  const { data, error } = await supabase.from("projects").select().eq("slug", slug).single();

  if (error) {
    return PROJECTS_DUMMY.find((p) => p.slug === slug) || null;
  }

  return data;
};
