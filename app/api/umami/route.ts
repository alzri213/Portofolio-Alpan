import { NextResponse } from "next/server";
import { getPageViewsByDataRange, getWebsiteStats } from "@/services/umami";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const pageViewsByDataRange = await getPageViewsByDataRange();
    const websiteStats = await getWebsiteStats();

    if (pageViewsByDataRange.status >= 400 || websiteStats.status >= 400) {
      // With our new service implementation, this shouldn't happen often as it falls back to mock data
      return NextResponse.json(
        { message: "Failed to fetch Umami data" },
        { status: 400 },
      );
    }

    const result = {
      ...pageViewsByDataRange.data,
      websiteStats: websiteStats.data,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
