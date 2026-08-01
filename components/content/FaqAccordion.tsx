"use client";

import Image from "next/image";
import { useState } from "react";
import type { FaqItem } from "@/lib/faq-section";

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!items.length) return null;

  return (
    <div className="flex w-full flex-col">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={`${item.question}-${index}`}
            className={
              isOpen
                ? "bg-white px-4 py-5"
                : "border-b border-black/15 px-4 py-5"
            }
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span
                className={`text-xl font-medium leading-[1.5] ${
                  isOpen ? "text-black" : "text-black/70"
                }`}
              >
                {item.question}
              </span>
              <Image
                src="/images/faq/expand.svg"
                alt=""
                width={24}
                height={24}
                className={`size-6 shrink-0 transition-opacity ${
                  isOpen ? "opacity-100" : "opacity-40"
                }`}
                aria-hidden
              />
            </button>

            {isOpen ? (
              <div className="mt-2 max-w-[703px] text-xl leading-[1.5] text-black/70">
                {item.answer.split(/\n{2,}/).map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className={paragraphIndex > 0 ? "mt-0" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
