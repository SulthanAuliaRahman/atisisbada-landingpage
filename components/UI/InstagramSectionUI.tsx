"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process(): void;
      };
    };
  }
}

type InstagramPost = {
  url: string;
  deskripsi?: string;
};

interface InstagramSectionUIProps {
  posts: InstagramPost[];
}

export default function InstagramSectionUI({ posts }: InstagramSectionUIProps) {
  const id = useId();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // run instagram embed processing
  useEffect(() => {
    const timer = setTimeout(() => {
      window.instgrm?.Embeds?.process?.();
    }, 100);

    return () => clearTimeout(timer);
  }, [posts, activeIndex]);

  const scrollToIndex = (index: number) => {
  const el = sliderRef.current;
  if (!el) return;

  const target = el.children[index] as HTMLElement;
  if (!target) return;

  // Very important: offsetLeft is relative to the scroll container's content start
  // so we must account for any left padding the container might have
  const containerPaddingLeft = parseFloat(getComputedStyle(el).paddingLeft) || 0;

  const offset = target.offsetLeft - containerPaddingLeft - el.clientWidth / 2 + target.clientWidth / 2;

  el.scrollTo({
    left: offset,
    behavior: "smooth",
  });

  setActiveIndex(index);
};

  return (
    <>
      <Script src="//www.instagram.com/embed.js" strategy="afterInteractive" />

      <section className="py-16 md:py-24 bg-item-bg relative">
        {" "}
      <div className="pointer-events-none absolute -top-32 -right-32 w-70 h-70 bg-white/30 rounded-full blur-3xl" />
      {" "}
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-70 h-70 bg-white/25 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          

          {/* LEFT BUTTON */}
          <button
            onClick={() => scrollToIndex(Math.max(activeIndex - 1, 0))}
            disabled={activeIndex === 0}
            className={`
              absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full shadow
              ${
                activeIndex === 0 ? "bg-background opacity-50 cursor-not-allowed" : "bg-background hover:bg-white"
              }
            `}
          >
            ‹
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={() =>
              scrollToIndex(Math.min(activeIndex + 1, posts.length - 1))
            }
            disabled={activeIndex === posts.length - 1}
            className={`
              absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full shadow
              ${
                activeIndex === posts.length - 1 ? "bg-background opacity-50 cursor-not-allowed" : "bg-background hover:bg-white"
              }
            `}
          >
            ›
          </button>

          {/* SLIDER */}
          <div
            ref={sliderRef}
            className="
              flex gap-20 md:gap-32 overflow-x-hidden snap-x snap-mandatory scroll-smooth
              px-4 sm:px-12 lg:px-24 -mx-4 sm:-mx-6 lg:-mx-8 pb-6                       
            "
            style={{ scrollPaddingLeft: '25%', scrollPaddingRight: '25%' }} 
          >
            {posts.map((post, index) => {
              const isActive = index === activeIndex;
              const isAdjacent = Math.abs(index - activeIndex) === 1;
              return (
                <div
                  key={`${id}-${index}`}
                  className={`
                    shrink-0 w-fit max-w-100
                    transition-all duration-300 ease-out
                    ${isActive ? "scale-100 opacity-100 z-10" : isAdjacent ? "scale-90 opacity-60 blur-[1px]" : "scale-75 opacity-30 blur-sm pointer-events-none"}`}
                >
                  <div
                    className={`rounded-2xl overflow-hidden shadow-lg ${isActive ? "" : "pointer-events-none"}
                    `}
                  >
                    <div className="w-full max-w-[540px] mx-auto aspect-[4/5] overflow-hidden rounded-xl">
                      <blockquote
                        className="instagram-media"
                        data-instgrm-permalink={post.url}
                        data-instgrm-version="14"
                        style={{
                          background: "transparent",
                          border: 0,
                          margin: 0,
                          padding: 0,
                          width: "100%",
                        }}
                      >
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          View post on Instagram
                        </a>
                      </blockquote>
                    </div>
                  </div>

                  {post.deskripsi && (
                    <p className="mt-3 text-center text-sm text-white">
                      {post.deskripsi}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
