"use client";

import { useState } from "react";

import Hero from "@/components/hero";
import Input from "@/components/input";
import { Music } from "@/types/music";

export default function () {
  const [music, setMusic] = useState<Music[]>();

  return (
    <div className="md:mt-16">
      <div className="max-w-3xl mx-auto">
        <Hero />

        <div className="flex flex-col mx-auto my-12 flex max-w-lg justify-center">
          <Input setMusic={setMusic} />
        </div>

        <div className="flex mt-6 mx-auto mt-6 justify-around gap-4">
          {
            music && music.map((music, index) => (
              <div key={index} className="relative flex w-68 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="p-6">
                  <audio className="mx-auto" controls src={music.song_url} />
                </div>
                <div className="p-6 pt-0">
                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {music.song_name}
                  </h5>
                  <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased max-h-40 verscroll-y-auto overflow-y-scroll" dangerouslySetInnerHTML={{
                    __html: music.lyric?.replace?.(/\n{1,2}/g, "<br>") ?? ''
                  }} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
