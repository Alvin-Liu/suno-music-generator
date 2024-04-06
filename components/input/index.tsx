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

interface Props {
  setMusic: (music: Music) => void;
}

export default function ({ setMusic }: Props) {
  const { user } = useContext(AppContext);

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const requestGenMusic = async function () {
    try {
      const uri = "/api/genMusic";

      setLoading(true);
      const resp = await fetchEnhanced(uri, {
        method: "POST",
        data: {
          description: description,
        },
      });

      const { code, message, data } = resp || {};

      setLoading(false);

      if (code === 401) {
        toast.error("Please Log In First");
        router.push("/sign-in");
        return;
      }

      if (resp.message) {
        if (code !== 0) {
          toast.error(message);
          return;
        }

        if (data) {
          setMusic(data);
          setDescription("");
          toast.success("Gen music success");
          return;
        }
      }

      toast.error("Gen music failed");
    } catch (e) {
      console.log("failed: ", e);
      toast.error("Gen music failed");
    }
  };

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

    requestGenMusic();
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
