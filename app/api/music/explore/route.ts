import { respData, respErr, respJson } from "@/utils/response";
import { fetchEnhanced } from '@/utils/request';
import { headers } from "next/headers";

const BASE_URL = "https://studio-api.suno.ai";

export async function GET() {
  const headersList = headers();
  const Authorization = headersList.get("Authorization");
  const userAgent = headersList.get("User-Agent");

  try {
    const list = (await fetchEnhanced(
      `${BASE_URL}/api/feed/`,
      {
        method: "GET",
        headers: {
          "Cookie": process.env.SUNO_COOKIE || '',
          Authorization: `${Authorization}`,
          "Accept-Encoding": "gzip, deflate, br",
          "User-Agent": `${userAgent}`,
        },
      }
    ));

    // random sort
    return respData(list.sort(() => 0.5 - Math.random()));
  } catch (error: any) {
    console.error("Request failed:", error);
    if (error?.detail === 'Unauthorized') {
      return respJson('BIZ_UNAUTHORIZED', 'Unauthorized');
    }

    return respErr("An unexpected error occurred. Please try again later.");
  }
}
