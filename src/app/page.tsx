"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
      <h1 className="max-w-4xl text-center font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,5vw,4.25rem)] leading-[1.25] tracking-[-0.01em] text-white lg:leading-[1.15] lg:tracking-[-0.02em]">
        <span className="animate-reveal">
          Graham Bunt is a{" "}
          <em className="italic">Product Designer</em>
        </span>
        <span className="animate-reveal" style={{ animationDelay: "200ms" }}>
          based in Salt Lake City, Utah.
        </span>
      </h1>
    </main>
  );
}
