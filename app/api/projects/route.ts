import { NextResponse } from "next/server";

import { getProjectsData } from "@/services/projects";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const data = await getProjectsData();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Projects API Error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 },
    );
  }
};
