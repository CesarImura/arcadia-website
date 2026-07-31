"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroStatusLine() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      setTime(
        new Intl.DateTimeFormat("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "America/Sao_Paulo",
        }).format(new Date()),
      );
    }

    updateTime();
    const interval = window.setInterval(updateTime, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 font-arc-mono text-base uppercase leading-none text-black">
      <Image
        src="/images/hero/bracket-left.svg"
        alt=""
        width={7}
        height={20}
        className="h-5 w-[7px]"
      />
      <span className="size-1 bg-black" />
      <span>online</span>
      <span>/</span>
      <span>brasil {time || "00:00"}</span>
      <Image
        src="/images/hero/bracket-right.svg"
        alt=""
        width={7}
        height={20}
        className="h-5 w-[7px]"
      />
    </div>
  );
}
