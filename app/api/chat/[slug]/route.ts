import { NextResponse } from "next/server";
import { createClient } from "@/common/utils/server";

export const dynamic = "force-dynamic";

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string } },
) => {
  const supabase = createClient();
  try {
    const id = params.slug;
    await supabase.from("messages").delete().eq("id", id);
    return NextResponse.json("Message deleted successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { slug: string } },
) => {
  const supabase = createClient();
  try {
    const id = params.slug;
    const body = await req.json();

    const { error } = await supabase
      .from("messages")
      .update(body)
      .eq("id", id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json("Message updated successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
