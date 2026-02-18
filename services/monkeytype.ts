import axios from "axios";
import { MONKEYTYPE_ACCOUNT } from "@/common/constants/monkeytype";

const { username, api_key } = MONKEYTYPE_ACCOUNT;

const mockData = {
  status: 200,
  data: {
    name: username || "User",
    uid: "mock-uid",
    addedAt: 1622505600000,
    typingStats: {
      completedTests: 1234,
      startedTests: 1500,
      timeTyping: 86400,
    },
    personalBests: {
      time: {
        15: [{ wpm: 120, acc: 98, timestamp: Date.now() }],
        60: [{ wpm: 105, acc: 99, timestamp: Date.now() }],
      },
      words: {
        10: [{ wpm: 110, acc: 97, timestamp: Date.now() }],
        50: [{ wpm: 95, acc: 98, timestamp: Date.now() }],
      }
    },
    allTimeLbs: {
      time: {
        15: { english: { rank: 125, count: 10000 } },
        60: { english: { rank: 350, count: 15000 } }
      }
    },
    xp: 25000,
    streak: 15,
    maxStreak: 20,
    details: {
      bio: "Crafting beautiful code and typing fast.",
      keyboard: "Custom Mechanical Keyboard",
      socialProfiles: {
        github: username || "user",
      }
    }
  }
};

const USER_ENDPOINT = `https://api.monkeytype.com/users/${username}/profile`;

export const getMonkeytypeData = async () => {
  if (!api_key || api_key === "undefined" || api_key === "") {
    return mockData;
  }

  try {
    const response = await axios.get(USER_ENDPOINT, {
      headers: {
        Authorization: `ApeKey ${api_key}`,
      },
    });

    const status = response.status;
    const responseJson = response.data;

    // Even if API fails, return mock data to prevent UI from breaking
    if (status > 400 || !responseJson.data) {
      return mockData;
    }

    return { status, data: responseJson.data };
  } catch (error) {
    // Return mock data on catch to prevent UI from breaking
    return mockData;
  }
};
