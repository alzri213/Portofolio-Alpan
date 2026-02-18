import axios from "axios";
import { CODEWARS_ACCOUNT } from "@/common/constants/codewars";

const { user_id } = CODEWARS_ACCOUNT;

const mockData = {
  status: 200,
  data: {
    username: user_id || "User",
    honor: 543,
    clan: "Unknown",
    leaderboardPosition: 12345,
    ranks: {
      overall: { name: "4 kyu", color: "blue", score: 1200 },
      languages: {
        typescript: { name: "5 kyu", color: "yellow", score: 800 },
        javascript: { name: "5 kyu", color: "yellow", score: 850 },
      }
    },
    codeChallenges: { totalCompleted: 42 }
  }
};

const CODEWARS_ENDPOINT = `https://www.codewars.com/api/v1/users/${user_id}`;

export const getCodewarsData = async () => {
  if (!user_id || user_id === "undefined") {
    return mockData;
  }

  try {
    const response = await axios.get(CODEWARS_ENDPOINT);

    const status = response.status;
    const data = response.data;

    if (status > 400) {
      return mockData;
    }

    return { status, data };
  } catch (error) {
    return mockData;
  }
};
