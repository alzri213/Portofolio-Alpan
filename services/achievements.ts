import { ACHIEVEMENTS_DUMMY } from "@/common/constants/achievements";
import { createClient } from "@/common/utils/server";

interface GetAchievementsDataProps {
  category?: string;
  search?: string;
}

export const getAchievementsData = async ({
  category,
  search,
}: GetAchievementsDataProps) => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("Supabase environment variables are missing.");
    return ACHIEVEMENTS_DUMMY;
  }

  const supabase = createClient();

  let query = supabase.from("achievements").select();

  if (category) {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase Error:", error.message);
    return ACHIEVEMENTS_DUMMY;
  }

  return data && data.length > 0 ? data : ACHIEVEMENTS_DUMMY;
};
