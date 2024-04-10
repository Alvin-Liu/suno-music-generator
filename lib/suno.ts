import UserAgent from 'user-agents';
import { fetchEnhanced } from '@/utils/request';
import { sleep } from '@/utils';

import type { Music } from '@/types/music';

const BASE_URL = "https://studio-api.suno.ai";
const CLERK_BASE_URL = 'https://clerk.suno.com';

export class Suno {
  private retryTime = 0;
  private songInfo: Pick<Music, 'lyric' | 'song_name'> & { song_ids?: string[]; } = {};
  private currentData?: Record<string, any>;
  private sid?: string;
  private token?: string;
  private readonly client: typeof fetchEnhanced;

  constructor(cookie: string, { userAgent }: { userAgent?: string }) {
    this.client = (url: string, options: any) => {
      return fetchEnhanced(url, {
        ...options,
        headers: {
          "Cookie": cookie,
          "Accept-Encoding": "gzip, deflate, br",
          "User-Agent": userAgent || new UserAgent(/Chrome/).random().toString(),
          ...options.headers,
        }
      });
    }
  }

  public async init() {
    const response = await this.client(`${CLERK_BASE_URL}/v1/client?_clerk_js_version=4.72.0-snapshot.vc141245`, {
      method: 'GET',
    })

    const sid = response?.response?.last_active_session_id;

    if (!sid) {
      throw new Error("Failed to get session id");
    }

    this.sid = sid;

    return await this.getAuthToken();
  }

  private async getAuthToken() {
    if (!this.sid) {
      throw new Error("Session ID not found");
    }

    const response = await this.client(
      `${CLERK_BASE_URL}/v1/client/sessions/${this.sid}/tokens?_clerk_js_version=4.72.0-snapshot.vc141245`, {
        method: 'POST'
      }
    );

    this.token = response.jwt;

    return response.jwt;
  }

  public async generate(options: string | { title?: string, tags?: string, prompt?: string, continue_at?: string, continue_clip_id?: string }) {
    const params = typeof options === 'string' ? {
      gpt_description_prompt: options,
      mv: "chirp-v3-0",
      prompt: "",
      make_instrumental: false,
    } : {
      continue_at: options?.continue_at || null,
      continue_clip_id: options?.continue_clip_id || null,
      mv: "chirp-v3-0",
      prompt: options?.prompt || "",
      gpt_description_prompt: options?.prompt || "",
      tags: options?.tags ||"",
      title: options?.title || "",
    }

    const response = await this.client(
      `${BASE_URL}/api/generate/v2/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        data: params
      }
    );

    return response?.clips?.map?.((i: { id: string; }) => i.id);
  }

  public async getSongs(prompt: string) {
    const response = await this.client(
      `${BASE_URL}/api/generate/v2/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        data: {
          gpt_description_prompt: prompt,
          mv: "chirp-v3-0",
          prompt: "",
          make_instrumental: false,
        }
      }
    );

    const request_ids = response?.clips?.map?.((i: { id: string; }) => i.id);

    let startWait = Date.now();
    console.log("Waiting for results...");

    while (true) {
      if (Date.now() - startWait > 600000) {
        throw new Error("Request timeout");
      }

      const hasSongInfo = await this.fetchSongsMetadata(request_ids);

      if (!hasSongInfo) {
        console.log(".", { end: "", flush: true });
      } else {
        break;
      }

      await sleep(Math.min(10000, this.retryTime * 2000));

      this.retryTime = Math.max(0, this.retryTime - 1);
    }

    return this.songInfo;
  }

  async fetchSongsMetadata(ids: string[]) {
    const [id1, id2] = ids.slice(0, 2);
    const url = `${BASE_URL}/api/feed/?ids=${encodeURIComponent(id1)}%2C${encodeURIComponent(id2)}`;

    try {
      const response = await this.client(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      const data = Array.isArray(response) ? response : [response];
      this.currentData = data;

      for (const d of data) {
        if (d.audio_url) {
          const [song_name, lyric] = this.parseLyrics(d);

          this.songInfo.song_name = song_name;
          this.songInfo.lyric = lyric;
          this.songInfo.song_ids = [id1, id2];

          return true;
        }
      }

      return false;
    } catch (e: any) {
      if (e.detail === "Unauthorized") {
        console.log("Token expired, renewing...");

        this.retryTime += 1;
        if (this.retryTime > 3) {
          const [song_name, lyric] = this.parseLyrics(this.currentData?.[0]);

          this.songInfo.song_name = song_name;
          this.songInfo.lyric = lyric;
          this.songInfo.song_ids = [id1, id2];

          return true;
        }

        await this.getAuthToken();
        await sleep(5000);

        return false;
      } else {
        const [song_name, lyric] = this.parseLyrics(this.currentData?.[0]);

        this.songInfo.song_name = song_name;
        this.songInfo.lyric = lyric;
        this.songInfo.song_ids = [id1, id2];

        return true;
      }
    }
  }

  public parseLyrics(data: Record<string, any>) {
    const song_name = data.title || "";
    const mt = data.metadata;

    if (!mt || !song_name) return ['', ''];

    const lyrics = mt.prompt.replace(/\[.*?\]/g, "");
    return [song_name, lyrics];
  }

  public async getCredits() {
    const response = await this.client(`${BASE_URL}/api/billing/info/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return response.total_credits_left;
  }
}

export const getSunoClient = async ({ cookie, userAgent }: { cookie?: string; userAgent?: string }) => {
  const sunoCookie = process.env.SUNO_COOKIE || cookie;

  if (!sunoCookie) {
    throw new Error("Cookie not found");
  }

  const client = new Suno(sunoCookie, { userAgent });

  await client.init();

  return client
}