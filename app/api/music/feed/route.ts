import { respData, respErr, respJson } from "@/utils/response";
import { currentUser } from "@clerk/nextjs";
import { Suno } from "@/lib/suno";
import { getUserCredits } from "@/services/order";
import { insertMusic } from "@/models/music";
import { headers } from "next/headers";
import { fetchEnhanced } from '@/utils/request';
import UserAgent from 'user-agents';

import type { SunoMusic } from "@/types/music";

const BASE_URL = "https://studio-api.suno.ai";

export async function POST(req: Request) {
  const headersList = headers();
  const userAgent = headersList.get("User-Agent");
  const Authorization = headersList.get("X-Authorization");

  const user = await currentUser();
  if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
    return respErr("Please Log In First");
  }

  try {
    const userEmail = user.emailAddresses[0].emailAddress;
    const userCredits = await getUserCredits(userEmail);

    if (!userCredits || userCredits.left_credits < 1) {
      return respErr("Sorry, credits not enough");
    }

    const client = new Suno(process.env.SUNO_COOKIE || '', { userAgent: userAgent || '' });

    const { ids, description } = await req.json();

    if (!ids || ids.length < 1) {
      return respErr("Sorry for the service error, please try again later");
    }

    const [id1, id2] = ids.slice(0, 2);

    const response = (await fetchEnhanced(
      `${BASE_URL}/api/feed/?ids=${encodeURIComponent(id1)}%2C${encodeURIComponent(id2)}`,
      {
        method: "GET",
        headers: {
          "Cookie": process.env.SUNO_COOKIE || '',
          Authorization: `${Authorization}`,
          "Accept-Encoding": "gzip, deflate, br",
          "User-Agent": `${userAgent || new UserAgent(/Chrome/).random().toString()}`,
        },
      }
    ));

    const data = (Array.isArray(response) ? response : [response]).filter((item) => !!item?.audio_url);

    if (data && data.length > 0) {
      const result = data.map((item) => {
        const [song_name, lyric] = client.parseLyrics(item);

        const music: SunoMusic = {
          user_email: userEmail,
          description: description,
          // style: style,
          // instrumental: instrumental,
          lyric: lyric,
          song_name: song_name,
          created_at: new Date().toISOString(),
          status: 1,
          song_url: `https://cdn1.suno.ai/${item.id}.mp3`,
          song_url2: ''
        };
        
        insertMusic(music);

        return {
          song_name,
          lyric,
          song_url: item.audio_url,
          song_url2: ''
        }
      })

      return respData({ isFinish: true, list: result });
    }

    return respData({ isFinish: false, ids });
  } catch (e: any) {
    if (e?.detail === 'Unauthorized') {
      return respJson('BIZ_UNAUTHORIZED', 'Unauthorized');
    }

    // Service Unavailable: Due to heavy usage, generations are temporarily only enabled for subscribers.
    if (e?.detail === "Insufficient credits." || e?.detail === "Service Unavailable") {
      return respErr("Sorry for the service error, please try again later");
    }

    if (e?.detail) {
      return respErr(e.detail);
    }

    console.log("Generate music failed: ", e);

    return respErr("Generate music failed");
  }
}
