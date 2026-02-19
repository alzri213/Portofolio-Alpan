import { createClient } from "@/common/utils/server";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/common/libs/auth";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const createAdminClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) { }
        },
      },
    }
  );
};

export const GET = async () => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("messages")
      .select()
      .order("created_at", { ascending: true });
    if (error) {
      console.error("Supabase Select Error:", error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(data || [], { status: 200 });
  } catch (error) {
    console.error("Chat GET Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized. Please login first." }, { status: 401 });
  }

  const supabase = createAdminClient();
  try {
    const body = await req.json();

    // Ensure the message user data matches the session data for security
    const messageData = {
      ...body,
      name: session.user?.name || body.name,
      email: session.user?.email || body.email,
      image: session.user?.image || body.image,
    };

    const { error } = await supabase.from("messages").insert([messageData]);
    if (error) {
      console.error("Supabase Insert Error:", error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json("Data saved successfully", { status: 200 });
  } catch (error) {
    console.error("Chat POST Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};