import { SunoMusic } from "@/types/music";
import { getDb } from "./db";

export const insertMusic = async (music: SunoMusic) => {
  const db = getDb();
  const res = await db.query(
    `INSERT INTO music 
        (user_email, description, style, instrumental, lyric, song_name, song_url, created_at, status) 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `,
    [
      music.user_email,
      music.description || '',
      music.style || '',
      music.instrumental ? '1' : '0',
      music.lyric || '',
      music.song_name || '',
      music.song_url || '',
      music.created_at,
      `${music.status || '0'}`
    ]
  );

  return res;
}

export const getMusicCount = async (): Promise<number> => {
  const db = getDb();
  const res = await db.query(`SELECT count(1) as count FROM music`);
  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export const getUserMusicCount = async (
  user_email: string
): Promise<number> => {
  const db = getDb();
  const res = await db.query(
    `SELECT count(1) as count FROM music WHERE user_email = $1`,
    [user_email]
  );

  if (res.rowCount === 0) {
    return 0;
  }

  const { rows } = res;
  const row = rows[0];

  return row.count;
}

export const findMusicList = async (user_email: string): Promise<SunoMusic[]> => {
  const db = getDb();
  const res = await db.query(
    `SELECT * FROM music WHERE user_email = $1`,
    [user_email]
  );

  if (res.rowCount === 0) {
    return [];
  }

  return res.rows;
}
