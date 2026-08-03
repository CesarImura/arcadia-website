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
            className={`px-4 py-5 transition-colors duration-300 ease-out ${
              isOpen
                ? "bg-white"
                : "border-b border-black/15"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span
                className={`text-xl font-medium leading-[1.5] transition-colors duration-300 ${
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
                className={`size-6 shrink-0 transition-all duration-300 ease-out ${
                  isOpen
                    ? "rotate-180 opacity-100"
                    : "rotate-0 opacity-40"
                }`}
                aria-hidden
              />
            </button>

            <div
              className="grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
                marginTop: isOpen ? "0.5rem" : 0,
              }}
            >
              <div className="overflow-hidden">
                <div className="max-w-[703px] text-xl leading-[1.5] text-black/70">
                  {item.answer.split(/\n{2,}/).map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className={paragraphIndex > 0 ? "mt-4" : undefined}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
