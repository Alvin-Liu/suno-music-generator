import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import User from "@/components/user";
import { usePathname } from "next/navigation";
import { cs } from "@/utils";
import Social from "../social";

export interface Tab {
  title: string;
  name?: string;
  url?: string;
}

const navigations: Tab[] = [
  { name: "home", title: "Home", url: "/" },
  { name: "explore", title: "Explore", url: "/explore" },
  { name: "pricing", title: "Pricing", url: "/pricing" },
  { name: "personal", title: "Personal", url: "/personal" },
];

export default function () {
  const { user } = useContext(AppContext);
  const pathname = usePathname()

  return (
    <header>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-row items-center px-6 py-8 lg:flex-row lg:items-center justify-between lg:px-10 lg:py-8 xl:px-20">
            <a href="/" className="text-xl font-medium flex items-center">
              <img
                src="/logo.png"
                className="w-39 h-20"
                alt="Suno Music"
              />
            </a>

            <div className="hidden md:flex ml-16 flex-1 gap-x-10">
              {navigations.map((tab: Tab, idx: number) => (
                <a
                  key={idx}
                  href={tab.url}
                  className={cs("text-md font-medium leading-6 text-gray-900", {
                    "text-primary": pathname === tab.url,
                  })}
                >
                  {tab.title}
                </a>
              ))}
            </div>

            <div className="flex flex-row items-center lg:flex lg:flex-row lg:space-x-3 lg:space-y-0">
              <div className="hidden md:block mr-4">
                <Social />
              </div>

              {user === undefined ? (
                <>loading...</>
              ) : (
                <>
                  {user ? <User user={user} /> : (
                    <a className="cursor-pointer" href="/si">
                      <Button>Sign In</Button>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
