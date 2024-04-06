"use client";

import { useMemo } from "react";
import { SunoMusic } from "@/types/music";
import { useRequest } from "ahooks";
import { fetchEnhanced } from '@/utils/request';
import { Loading } from "@/components/ui/loading";

const regex = /\/([^.]*)\.mp3/;

export interface SunoMusicItem extends SunoMusic {
  image_url: string
}

export default function () {
  const { data: musicList, loading } = useRequest(async () => {
    const { code, data } = await fetchEnhanced("/api/personal/music");

    if (code !== 0) {
      throw new Error('fetch token failed');
    }

    return data
  }, {
    retryCount: 3,
    retryInterval: 100
  });

  const musicListData = useMemo(() => {
    return musicList?.reduce?.((prev: SunoMusicItem[], next: SunoMusicItem) => {
      const { song_url, song_url2, ...props } = next;
      const songId1 = song_url?.match?.(regex)?.[1];

      if (song_url2) {
        const songId2 = song_url2?.match?.(regex)?.[1];

        return prev.concat([
          { ...props, song_url, image_url: songId1 ? `https://cdn1.suno.ai/image_${songId1}.png` : '' },
          { ...props, song_url: song_url2, image_url: songId2 ? `https://cdn1.suno.ai/image_${songId2}.png` : '' },
        ])
      }

      return prev.concat([
        { ...props, song_url, image_url: songId1 ? `https://cdn1.suno.ai/image_${songId1}.png` : '' },
      ])
    }, []) as SunoMusicItem[]
  }, [musicList])

  return (
    <section>
      <div className="mx-auto max-w-7xl px-5">
        {!!loading ? (
          <Loading />
        ) : musicListData && musicListData.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-12">
            {musicListData.map((music: SunoMusicItem, idx: number) => {
              return (
                <div className="rounded-xl overflow-hidden inline-block border border-solid border-[#cdcdcd]" key={idx}>
                  <div className="flex flex-col items-center justify-around h-full rounded-md bg-gradient-to-tr from-pink-400 to-yellow-400 p-4 font-mono text-xl text-white">
                    <div className="cover flex w-auto flex-col items-center">
                      {music.image_url ? <img src={music.image_url} alt={music.song_name} className="w-3/6 rounded-xl blur-[2px]" /> : <div className="w-3/6 min-h-20 rounded-xl blur-[2px]" />}
                      <p className="-translate-y-10 break-words text-center">{music.song_name}</p>
                    </div>
                    <audio className="mx-auto block w-full max-w-md" controls preload="none">
                      <source src={music.song_url} type="audio/mpeg" />
                    </audio>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow text-center dark:bg-gray-800 dark:border-gray-700">
            <p className="my-4 font-normal text-center text-gray-700 dark:text-gray-400">
              No music found.
            </p>
            <a href="/" className="inline-flex mx-auto px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg">
              Generate music now
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
