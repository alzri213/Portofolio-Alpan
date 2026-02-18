import { createClient } from "@/common/utils/server";
import { NextResponse } from "next/server";

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
  const supabase = createClient();
  try {
    const body = await req.json();
    const { error } = await supabase.from("messages").insert([body]);
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