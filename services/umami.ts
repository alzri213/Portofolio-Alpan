import axios from "axios";
import { UMAMI_ACCOUNT } from "@/common/constants/umami";

const { api_key, website_id, endpoint, base_url, parameters } = UMAMI_ACCOUNT;

const mockData = {
  pageviews: [
    { x: "2024-01-01", y: 120 },
    { x: "2024-02-01", y: 250 },
    { x: "2024-03-01", y: 400 },
    { x: "2024-04-01", y: 350 },
    { x: "2024-05-01", y: 600 },
    { x: "2024-06-01", y: 800 },
    { x: "2024-07-01", y: 950 },
  ],
  sessions: [
    { x: "2024-01-01", y: 80 },
    { x: "2024-02-01", y: 150 },
    { x: "2024-03-01", y: 200 },
    { x: "2024-04-01", y: 180 },
    { x: "2024-05-01", y: 300 },
    { x: "2024-06-01", y: 450 },
    { x: "2024-07-01", y: 500 },
  ],
  websiteStats: {
    pageviews: { value: 3470, change: 12 },
    visitors: { value: 1850, change: 8 },
    visits: { value: 1240, change: 15 },
    bounces: { value: 450, change: -5 },
    totaltime: { value: 89000, change: 3 },
  }
};

export const getPageViewsByDataRange = async () => {
  if (!api_key || !website_id) {
    return { status: 200, data: { pageviews: mockData.pageviews, sessions: mockData.sessions } };
  }

  const url = `${base_url}/${website_id}${endpoint.page_views}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "x-umami-api-key": api_key,
      },
      params: parameters,
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: 200, // Return mock on error too
      data: { pageviews: mockData.pageviews, sessions: mockData.sessions },
    };
  }
};

export const getWebsiteStats = async () => {
  if (!api_key || !website_id) {
    return { status: 200, data: mockData.websiteStats };
  }

  const url = `${base_url}/${website_id}${endpoint.sessions}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        "x-umami-api-key": api_key,
      },
      params: { startAt: parameters.startAt, endAt: parameters.endAt },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: 200, // Return mock on error too
      data: mockData.websiteStats,
    };
  }
};
