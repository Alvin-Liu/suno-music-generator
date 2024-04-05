"use client";

import { useEffect } from "react";
import { SunoMusicType } from "@/types/music";
import { useRequest } from "ahooks";
import { fetchEnhanced } from '@/utils/request';
import { Loading } from "@/components/ui/loading";

export default function () {
  const { run, data: musicList, loading } = useRequest(async () => {
    const { code, data } = await fetchEnhanced("/api/music/token");

    if (code !== 0) {
      throw new Error('fetch token failed');
    }

    const resp = await fetchEnhanced("/api/music/explore", {
      headers: {
        "Authorization": `Bearer ${data}`,
      }
    });

    if (resp.code !== 0) {
      throw new Error('fetch explore failed');
    }

    return resp?.data
  }, {
    manual: true,
    retryCount: 3,
    retryInterval: 100
  });

  // Avoid executing the development environment twice, which may cause errors.
  useEffect(() => {
    const timeoutId = setTimeout(run, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [])

  return (
    <section>
      <div className="mx-auto max-w-7xl px-5">
        {!!loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:gap-12">
            {musicList && musicList.map((music: SunoMusicType, idx: number) => {
              return (
                <div className="rounded-xl overflow-hidden inline-block border border-solid border-[#cdcdcd]" key={idx}>
                  <div className="flex flex-col items-center justify-around h-full rounded-md bg-gradient-to-tr from-pink-400 to-yellow-400 p-4 font-mono text-xl text-white">
                    <div className="cover flex w-auto flex-col items-center">
                      <img src={music.image_url} alt={music.title} className="w-3/6 rounded-xl blur-[2px]" />
                      <p className="-translate-y-10 break-words text-center">{music.title}</p>
                    </div>
                    <audio className="mx-auto block w-full max-w-md" controls preload="none">
                      <source src={music.audio_url} type="audio/mpeg" />
                    </audio>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
