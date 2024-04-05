import { User } from "./user";

export interface Music {
  song_name?: string;
  lyric?: string;
  song_url?: string;
  song_url2?: string;
}

export interface SunoMusicParams {
  description?: string;
  style?: string;
  instrumental?: boolean;
  song_name?: string;
  lyric?: string;
}

export interface SunoMusic extends SunoMusicParams, Music {
  id?: number;
  user_email: string;
  created_at: string;
  status?: number;
}
