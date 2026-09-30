"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type FullscreenElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};
type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

type LoadState = "idle" | "loading" | "ready" | "error";

const LOAD_TIMEOUT_MS = 10000;

export default function GamePlayer({
  iframeUrl,
  title,
  coverImage,
  fallbackHref = "/",
  className = "",
}: {
  iframeUrl: string;
  title: string;
  coverImage?: string;
  fallbackHref?: string;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [coverFailed, setCoverFailed] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const doc = document as FullscreenDocument;
      setIsFullscreen(
        Boolean(doc.fullscreenElement || doc.webkitFullscreenElement),
      );
    };
    document.addEventListener("fullscreenchange", onChange);
    document.addEventListener("webkitfullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      document.removeEventListener("webkitfullscreenchange", onChange);
    };
  }, []);

  useEffect(() => {
    if (!started || loadState !== "loading") return;
    const timer = window.setTimeout(() => {
      setLoadState((current) => (current === "loading" ? "error" : current));
    }, LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [started, loadState]);

  const toggleFullscreen = () => {
    const doc = document as FullscreenDocument;
    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      (doc.exitFullscreen || doc.webkitExitFullscreen)?.call(doc);
      return;
    }
    const el = wrapperRef.current as FullscreenElement | null;
    if (!el) return;
    (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  };

  const startGame = () => {
    setStarted(true);
    setLoadState("loading");
  };

  const stageClassName =
    "game-player-stage relative h-[calc(100dvh-7.5rem)] min-h-[560px] w-full";

  return (
    <div
      ref={wrapperRef}
      className={`game-player group relative overflow-hidden rounded-2xl border border-border bg-panel ${className}`}
    >
      {!started ? (
        <div className={stageClassName}>
          {coverImage && !coverFailed ? (
            // Decorative cover; game title is already exposed nearby as a heading.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverImage}
              alt=""
              onError={() => setCoverFailed(true)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#2d2521] px-6 text-center">
              <span className="text-2xl font-bold text-white sm:text-3xl">
                {title}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-[#2d2521]/35" aria-hidden="true" />
          <button
            type="button"
            onClick={startGame}
            aria-label={`Play ${title}`}
            className="absolute left-1/2 top-1/2 flex min-h-16 min-w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-2xl bg-brand px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-110 focus-visible:outline focus-visible:outline-offset-4"
          >
            <span className="text-2xl leading-none" aria-hidden="true">
              ▶
            </span>
            Play
          </button>
        </div>
      ) : (
        <div className={stageClassName}>
          {loadState === "loading" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#2d2521] text-white">
              <span
                className="h-10 w-10 animate-spin rounded-full border-4 border-white/25 border-t-white"
                aria-hidden="true"
              />
              <p className="text-sm font-semibold tracking-wide">Loading game…</p>
            </div>
          )}

          {loadState === "error" ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#2d2521] px-6 text-center text-white">
              <p className="max-w-md text-lg font-bold">
                This game could not be loaded right now.
              </p>
              <p className="max-w-md text-sm text-white/75">
                The provider may be blocking embeds, or the connection timed out.
                Try another game instead.
              </p>
              <Link
                href={fallbackHref}
                className="rounded-xl bg-brand px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
              >
                Try another game
              </Link>
            </div>
          ) : (
            <iframe
              src={iframeUrl}
              title={title}
              className="h-full min-h-[560px] w-full"
              allow="fullscreen; gamepad; autoplay; pointer-lock"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-orientation-lock allow-presentation"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => setLoadState("ready")}
            />
          )}
        </div>
      )}

      {started && loadState !== "error" && (
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-lg border border-border bg-bg/80 px-3 py-1.5 text-sm text-ink-dim backdrop-blur transition hover:border-brand hover:text-ink"
        >
          {isFullscreen ? (
            <>
              <span className="text-base leading-none">✕</span> Exit
            </>
          ) : (
            <>
              <span className="text-base leading-none">⛶</span> Fullscreen
            </>
          )}
        </button>
      )}
    </div>
  );
}
