import { respData, respErr } from "@/utils/response";
import { currentUser } from "@clerk/nextjs";
import { getSunoClient } from "@/lib/suno";
import { getUserCredits } from "@/services/order";
import { insertMusic } from "@/models/music";
import { headers } from "next/headers";

import type { SunoMusic } from "@/types/music";

export async function POST(req: Request) {
  const headersList = headers();
  const userAgent = headersList.get("User-Agent");

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

    const client = await getSunoClient({ userAgent: userAgent || "" });

    const { description } = await req.json();

    if (!description) {
      return respErr("Please Enter Your Song Description");
    }

    const result = await client.getSongs(description)

    const music: SunoMusic = {
      user_email: userEmail,
      description: description,
      // style: style,
      // instrumental: instrumental,
      lyric: result?.lyric,
      song_name: result?.song_name,
      created_at: new Date().toISOString(),
      status: 1,
      song_url: `https://cdn1.suno.ai/${result?.song_ids?.[0]}.mp3`,
      song_url2: `https://cdn1.suno.ai/${result?.song_ids?.[1]}.mp3`,
    };
    
    insertMusic(music);

    return respData({
      ...result,
      song_url: result?.song_ids?.[0] && `https://audiopipe.suno.ai/?item_id=${result.song_ids[0]}`,
      song_url2: result?.song_ids?.[1] && `https://audiopipe.suno.ai/?item_id=${result.song_ids[1]}`,
    });
  } catch (e: any) {
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
