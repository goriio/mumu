"use client";

import { Container } from "../ui/container";
import { Logo } from "../ui/logo";
import { Player } from "../ui/player";
import { Search2Fill } from "~/components/icons/search-2-fill";
import { MenuFill } from "../icons/menu-fill";
import { SideNav } from "../ui/side-nav";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <Container className="relative md:pl-64">
      <SideNav isOpen={isSideNavOpen} setIsOpen={setIsSideNavOpen} />
      <div className="py-4 md:py-8">
        <main className="min-h-[80vh]">
          <div className="space-y-4 mb-4">
            <div className="flex md:hidden items-center justify-between">
              <Logo />
              <button onClick={() => setIsSideNavOpen(!isSideNavOpen)}>
                <MenuFill className="text-xl" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    router.push(`/search?query=${event.target.value}`);
                  }}
                  className="w-full px-4 py-2 pl-10 rounded-full border border-slate-800 text-slate-200 bg-transparent outline-none placeholder:text-slate-600"
                  placeholder="What do you want to play?"
                />
                <Search2Fill className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-200" />
              </div>
            </div>
          </div>
          {children}
        </main>
        <footer className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center justify-between mt-8 mb-20 pt-6 md:pt-8 border-t border-t-slate-800">
          <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
            <li className="text-sm text-slate-600 transition ease-linear hover:text-slate-400 cursor-pointer">
              <a href="https://github.com/goriio/mumu" target="_blank">
                Open Source
              </a>
            </li>
            <li className="text-sm text-slate-600 transition ease-linear hover:text-slate-400 cursor-pointer">
              <a href="https://github.com/goriio/mumu/issues" target="_blank">
                Report Issues
              </a>
            </li>
            <li className="text-sm text-slate-600 transition ease-linear hover:text-slate-400 cursor-pointer">
              <a href="https://github.com/goriio" target="_blank">
                About The Developer
              </a>
            </li>
          </ul>
          <p className="text-sm text-slate-600">
            {new Date().getFullYear()}.{" "}
            <span className="text-slate-400">Mumu</span>.
          </p>
        </footer>
      </div>
      <Player />
    </Container>
  );
}
