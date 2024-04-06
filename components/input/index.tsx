"use client";

import {
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music } from "@/types/music";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fetchEnhanced } from '@/utils/request';
import { useRequest } from "ahooks";

interface Props {
  setMusic: (music: Music[]) => void;
}

export default function ({ setMusic }: Props) {
  const { user } = useContext(AppContext);

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const { runAsync: generate, data: ids } = useRequest(async () => {
    const { code, data } = await fetchEnhanced("/api/music/generate", {
      method: "POST",
      data: {
        description: description,
      }
    });

    if (code === 401) {
      toast.error("Please Log In First");
      router.push("/sign-in");
      return;
    }

    if (code === 0 && data) {
      return data
    }

    throw new Error("Gen music failed");
  }, {
    manual: true,
    onSuccess: () => getToken(),
    onError: () => {
      toast.error("Gen music failed");
      setLoading(false);
    }
  });

  const { run: getToken, data: token } = useRequest(async () => {
    const { code, data } = await fetchEnhanced("/api/music/token");

    if (code !== 0) {
      throw new Error('fetch token failed');
    }

    return data
  }, {
    manual: true,
    onSuccess: () => {
      setTimeout(async () => await getFeed(), 100)
    },
    onError: () => {
      toast.error("Gen music failed");
      setLoading(false);
    }
  });

  const { runAsync: getFeed } = useRequest(async () => {
    const { code, data } = await fetchEnhanced("/api/music/feed", {
      method: "POST",
      data: {
        description: description,
        ids: ids,
      },
      headers: {
        "X-Authorization": `Bearer ${token}`,
      }
    });

    if (code === 0 && data) {
      return data
    }

    throw new Error(code);
  }, {
    manual: true,
    onSuccess: (data) => {
      if (!data?.isFinish) {
        setTimeout(async () => await getFeed(), Math.min(15000, Math.random() * 2000))
        return
      }

      setMusic(data.list)
      setDescription("");
      toast.success("Gen music success");
      setLoading(false);
    },
    onError: async (error: any) => {
      if (error === 'BIZ_UNAUTHORIZED') {
        getToken()
        return
      }

      if (error?.code === 'BIZ_MODERATION_FAILURE') {
        toast.error("Sorry, prompt likely copyrighted");
      } else {
        toast.error("Gen music failed");
      }
      
      setLoading(false);
    }
  });

  const onInputKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        onSubmit();
      }
    }
  };

  const onSubmit = function () {
    if (!description) {
      toast.error("Please Enter Your Song Description");
      inputRef.current?.focus();
      return;
    }

    if (!user) {
      toast.error("Please Log In First");
      return;
    }

    setLoading(true);
    generate();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form
      className="w-full"
      onSubmit={() => false}
    >
      <div className="cursor-pointer rounded-md font-semibold">
        <Input
          rows={5}
          placeholder="a psychedelic reggaeton song about being trapped in an AI song factory, help!"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={onInputKeydown}
          disabled={loading}
          ref={inputRef}
        />
      </div>
      
      <Button className="w-full mt-4" type="button" disabled={loading} onClick={onSubmit}>
        {user ? (loading ? "Generating..." : "Generate") : "Available after logging in"}
      </Button>
    </form>
  );
}
