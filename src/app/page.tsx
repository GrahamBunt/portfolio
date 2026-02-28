"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(
      () => new Promise((r) => setTimeout(r, 350))
    ).then(() => setFontsReady(true));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
      <h1 className="max-w-4xl text-center font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,5vw,4.25rem)] leading-[1.25] tracking-[-0.01em] text-white lg:leading-[1.15] lg:tracking-[-0.02em]">
        <span className={fontsReady ? "animate-reveal" : "opacity-0"}>
          Graham Bunt is a{" "}
          <em className="italic">Product Designer</em>
        </span>
        <span
          className={fontsReady ? "animate-reveal" : "opacity-0"}
          style={fontsReady ? { animationDelay: "120ms" } : undefined}
        >
          based in Salt Lake City, Utah.
        </span>
      </h1>
    </main>
  );
}
