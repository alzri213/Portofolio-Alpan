import { WAKATIME_ACCOUNT } from "@/common/constants/wakatime";
import axios from "axios";

const { api_key, base_url, all_time_endpoint, stats_endpoint } =
  WAKATIME_ACCOUNT;

const mockStats = {
  status: 200,
  data: {
    start_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date().toISOString(),
    last_update: new Date().toISOString(),
    best_day: {
      date: "2024-06-15",
      text: "8 hrs 20 mins",
    },
    human_readable_daily_average: "5 hrs 45 mins",
    human_readable_total: "40 hrs 15 mins",
    languages: [
      { name: "TypeScript", percent: 45 },
      { name: "JavaScript", percent: 25 },
      { name: "React", percent: 15 },
      { name: "Tailwind CSS", percent: 10 },
      { name: "HTML", percent: 5 },
    ],
    editors: [
      { name: "VS Code", percent: 100 },
    ],
  }
};

const mockAllTime = {
  status: 200,
  data: {
    text: "1,234 hrs 56 mins",
    total_seconds: 4445760,
  }
};

export const getReadStats = async () => {
  if (!api_key || api_key === "undefined") {
    return mockStats;
  }

  try {
    const response = await axios.get(`${base_url}${stats_endpoint}/last_7_days`, {
      headers: {
        Authorization: `Basic ${api_key}`,
      },
    });

    const status = response.status;
    if (status >= 400) return mockStats;

    const getData = response.data;
    return {
      status,
      data: {
        start_date: getData?.data?.start,
        end_date: getData?.data?.end,
        last_update: getData?.data?.modified_at,
        best_day: {
          date: getData?.data?.best_day?.date,
          text: getData?.data?.best_day?.text,
        },
        human_readable_daily_average: getData?.data?.human_readable_daily_average_including_other_language,
        human_readable_total: getData?.data?.human_readable_total_including_other_language,
        languages: getData?.data?.languages?.slice(0, 6),
        editors: getData?.data?.editors,
      },
    };
  } catch (error) {
    return mockStats;
  }
};

export const getAllTimeSinceToday = async () => {
  if (!api_key || api_key === "undefined") {
    return mockAllTime;
  }

  try {
    const response = await axios.get(`${base_url}${all_time_endpoint}`, {
      headers: {
        Authorization: `Basic ${api_key}`,
      },
    });

    const status = response.status;
    if (status >= 400) return mockAllTime;

    const getData = response.data;
    return {
      status,
      data: {
        text: getData?.data?.text,
        total_seconds: getData?.data?.total_seconds,
      },
    };
  } catch (error) {
    return mockAllTime;
  }
};
