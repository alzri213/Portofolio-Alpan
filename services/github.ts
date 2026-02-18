import axios from "axios";
import { GITHUB_ACCOUNTS } from "@/common/constants/github";

const GITHUB_USER_ENDPOINT = "https://api.github.com/graphql";

const GITHUB_USER_QUERY = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        colors
        totalContributions
        months {
          firstDay
          name
          totalWeeks
        }
        weeks {
          contributionDays {
            color
            contributionCount
            date
          }
          firstDay
        }
      }
    }
  }
}`;

const mockCalendar = {
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: 1234,
      weeks: Array.from({ length: 52 }).map((_, i) => ({
        contributionDays: Array.from({ length: 7 }).map((_, j) => ({
          color: "#216e39",
          contributionCount: Math.floor(Math.random() * 10),
          date: new Date(Date.now() - (i * 7 + j) * 24 * 60 * 60 * 1000).toISOString(),
        })),
      })),
      months: [],
      colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    },
  },
};

export const fetchGithubData = async (
  username: string,
  token: string | undefined,
) => {
  if (!token || token === "undefined" || token === "") {
    return { status: 200, data: mockCalendar };
  }

  try {
    const response = await axios.post(
      GITHUB_USER_ENDPOINT,
      {
        query: GITHUB_USER_QUERY,
        variables: {
          username: username,
        },
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      },
    );

    const status: number = response.status;
    const responseJson = response.data;

    if (status > 400 || responseJson.errors) {
      return { status: 200, data: mockCalendar };
    }

    return { status, data: responseJson.data.user };
  } catch (error: any) {
    return { status: 200, data: mockCalendar };
  }
};

export const getGithubData = async () => {
  const { username, token } = GITHUB_ACCOUNTS;
  return await fetchGithubData(username, token);
};
