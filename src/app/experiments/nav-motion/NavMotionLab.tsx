"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "motion/react";
import { ArrowDown, ArrowUp, Check, MoveUpRight } from "lucide-react";
import { NavHomeIcon } from "@/components/NavHomeIcon";
import styles from "./nav-motion.module.css";

/* ANIMATION STORYBOARD
 *   0ms   outgoing symbol starts its quiet exit
 * 0–90ms incoming symbol begins, overlapping the exit slightly
 * 480–760ms both layers reach their resting state
 * The same gesture reverses. Each card can be played independently.
 * In the full preview, the portrait's viewport exit is the trigger.
 */
const EASE = [0.22, 1, 0.36, 1] as const;
const VISIBLE: TargetAndTransition = {
  opacity: 1, scale: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)",
};
type Study = {
  id: string;
  name: string;
  description: string;
  enter: number;
  exit: number;
  delay: number;
  home: TargetAndTransition;
  photo: TargetAndTransition;
  photoVisible?: TargetAndTransition;
  recommended?: boolean;
  spring?: boolean;
  halo?: boolean;
};
const STUDIES: Study[] = [
  { id: "dissolve", name: "Still dissolve", description: "Nothing moves. One image quietly becomes the other.", enter: 640, exit: 420, delay: 0, home: {}, photo: {}, recommended: true },
  { id: "handoff", name: "Quiet handoff", description: "A soft exit, a tiny pause, then the photo settles in.", enter: 560, exit: 280, delay: 90, home: { scale: 0.97 }, photo: { scale: 0.97 } },
  { id: "breathe", name: "A small breath", description: "Almost imperceptible scaling with a generous, soft finish.", enter: 720, exit: 440, delay: 40, home: { scale: 0.95 }, photo: { scale: 0.96 }, recommended: true },
  { id: "veil", name: "Through a veil", description: "The icon softens as the photo comes gently into focus.", enter: 640, exit: 400, delay: 30, home: { filter: "blur(2px)" }, photo: { filter: "blur(3px)" } },
  { id: "focus", name: "Focus pull", description: "A very slight zoom recedes into a clear portrait.", enter: 700, exit: 420, delay: 20, home: { scale: 1.025, filter: "blur(1.5px)" }, photo: { scale: 1.04, filter: "blur(2px)" } },
  { id: "iris", name: "Circle reveal", description: "The photo opens from the center, inside the same circle.", enter: 680, exit: 420, delay: 0, home: { scale: 0.98 }, photo: { opacity: 1, clipPath: "circle(0% at 50% 50%)" }, photoVisible: { clipPath: "circle(72% at 50% 50%)" }, recommended: true },
  { id: "tide", name: "Rising tide", description: "A rounded reveal travels upward like a quiet tide.", enter: 720, exit: 420, delay: 0, home: { y: -1 }, photo: { opacity: 1, clipPath: "inset(100% 0% 0% 0% round 50%)" }, photoVisible: { clipPath: "inset(0% 0% 0% 0% round 50%)" } },
  { id: "curtain", name: "Side curtain", description: "The portrait is uncovered from left to right.", enter: 680, exit: 440, delay: 0, home: {}, photo: { opacity: 1, clipPath: "inset(0% 100% 0% 0% round 50%)" }, photoVisible: { clipPath: "inset(0% 0% 0% 0% round 50%)" } },
  { id: "diagonal", name: "Diagonal light", description: "A soft diagonal opening adds a little character.", enter: 760, exit: 480, delay: 0, home: {}, photo: { opacity: 1, clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" }, photoVisible: { clipPath: "polygon(0% 0%, 200% 0%, 0% 200%, 0% 100%)" } },
  { id: "lift", name: "Gentle lift", description: "Just three pixels of upward movement, then stillness.", enter: 620, exit: 400, delay: 40, home: { y: -3 }, photo: { y: 3 } },
  { id: "pass", name: "Passing through", description: "A tiny sideways exchange keeps the gesture flowing.", enter: 620, exit: 400, delay: 30, home: { x: -3 }, photo: { x: 3 } },
  { id: "unfold", name: "Unfold", description: "The photo opens vertically from a narrow center seam.", enter: 720, exit: 400, delay: 0, home: { scale: 0.98 }, photo: { opacity: 1, clipPath: "inset(50% 0% 50% 0% round 50%)" }, photoVisible: { clipPath: "inset(0% 0% 0% 0% round 50%)" } },
  { id: "tilt", name: "A slight turn", description: "A four-degree tilt makes the exchange feel lightly human.", enter: 700, exit: 420, delay: 30, home: { rotate: -4, scale: 0.97 }, photo: { rotate: 4, scale: 0.97 } },
  { id: "settle", name: "Soft landing", description: "A restrained spring settles without an obvious bounce.", enter: 680, exit: 420, delay: 40, home: { scale: 0.96 }, photo: { scale: 0.94 }, spring: true },
  { id: "halo", name: "A passing halo", description: "A faint ring acknowledges the change, then disappears.", enter: 700, exit: 440, delay: 30, home: { scale: 0.98 }, photo: { scale: 0.98 }, halo: true },
];
const HALO = { duration: 850, scale: [0.96, 1.1, 1.14], opacity: [0, 0.18, 0] };
const SPRING = { type: "spring" as const, stiffness: 170, damping: 27, mass: 1 };

function AvatarStudy({ study, stage, speed, icon }: {
  study: Study; stage: number; speed: number; icon: "solid" | "outline";
}) {
  const reduced = useReducedMotion();
  const portrait = stage >= 1;
  const transition = (incoming: boolean): Transition => {
    if (reduced) return { duration: 0, delay: 0 };
    const delay = incoming ? study.delay / 1000 / speed : 0;
    return study.spring
      ? { ...SPRING, stiffness: SPRING.stiffness * speed * speed, damping: SPRING.damping * speed, delay }
      : { duration: (incoming ? study.enter : study.exit) / 1000 / speed, delay, ease: EASE };
  };
  return (
    <span className={styles.avatar} aria-hidden="true">
      <motion.span className={`${styles.layer} ${styles.home}`} initial={false}
        animate={portrait ? { ...VISIBLE, opacity: 0, ...study.home } : VISIBLE}
        transition={transition(!portrait)}>
        <NavHomeIcon variant={icon} />
      </motion.span>
      <motion.span className={`${styles.layer} ${styles.photo}`} initial={false}
        animate={portrait ? { ...VISIBLE, ...study.photoVisible } : { ...VISIBLE, opacity: 0, ...study.photo }}
        transition={transition(portrait)}>
        <Image src="/avatar-thumb.webp" alt="" width={160} height={160} draggable={false} />
      </motion.span>
      {study.halo && !reduced ? <motion.span key={stage} className={styles.halo}
        initial={{ opacity: 0 }} animate={{ opacity: HALO.opacity, scale: HALO.scale }}
        transition={{ duration: HALO.duration / 1000 / speed, ease: EASE }} /> : null}
    </span>
  );
}

function FullPreview({ study, speed, icon }: { study: Study; speed: number; icon: "solid" | "outline" }) {
  const viewport = useRef<HTMLDivElement>(null);
  const portrait = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const element = portrait.current;
    const root = viewport.current;
    if (!element || !root) return;
    const observer = new IntersectionObserver(([entry]) => {
      setStage(!entry.isIntersecting && entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? 0) ? 1 : 0);
    }, { root });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.fullFrame}>
      <div className={styles.mockNav}>
        <AvatarStudy study={study} stage={stage} speed={speed} icon={icon} />
        <div className={styles.mockLinks}><span>About</span><span>Resume</span></div>
      </div>
      <div ref={viewport} className={styles.scrollViewport} tabIndex={0} aria-label={`${study.name} scroll preview`}>
        <section className={styles.mockHero}>
          <figure ref={portrait} className={styles.heroPortrait}>
            <Image src="/home-hero-portrait.jpg" alt="Graham at the ocean" width={1000} height={978} />
          </figure>
          <h2>In pursuit of shipping<br />products customers love.</h2>
          <p>Graham Bunt is a product designer making sense of complex systems, shaping product direction, and bringing ideas to life through design and code.</p>
        </section>
        <div className={styles.mockWork}>
          <span>Select work</span>
          <div><Image src="/work/paper-trades/hero-poster-4k-v3.webp" alt="Paper Trades" width={2400} height={1487} /><p>Paper Trades</p></div>
        </div>
      </div>
      <div className={styles.previewFooter}>
        <span>{stage >= 1 ? "Portrait has left view · photo in nav" : "Portrait is visible · home in nav"}</span>
        <button onClick={() => viewport.current?.scrollTo({ top: stage >= 1 ? 0 : 360, behavior: "smooth" })}>
          {stage >= 1 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}{stage >= 1 ? "Scroll back" : "Try the scroll"}
        </button>
      </div>
    </div>
  );
}

export function NavMotionLab() {
  const [selected, setSelected] = useState(STUDIES[0].id);
  const [stages, setStages] = useState<Record<string, number>>({});
  const [speed, setSpeed] = useState(1);
  const [icon, setIcon] = useState<"solid" | "outline">("solid");
  const study = STUDIES.find(item => item.id === selected) ?? STUDIES[0];
  const setAll = (stage: number) => setStages(Object.fromEntries(STUDIES.map(item => [item.id, stage])));

  return (
    <main className={styles.lab}>
      <header className={styles.header}>
        <Link href="/">← Back to portfolio</Link>
        <p className={styles.eyebrow}>NAVIGATION / MOTION STUDIES</p>
        <h1>A quieter change.</h1>
        <p className={styles.intro}>15 ways to move from home to portrait. Every preview uses the actual 40px button. Try one in the page below, or compare them side by side.</p>
      </header>

      <section className={styles.focusSection} aria-labelledby="focus-title">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>IN CONTEXT</p><h2 id="focus-title">{String(STUDIES.indexOf(study) + 1).padStart(2, "0")} / {study.name}</h2></div><span>Scroll inside the preview</span></div>
        <FullPreview key={selected} study={study} speed={speed} icon={icon} />
      </section>

      <section className={styles.compare} aria-labelledby="compare-title">
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>COMPARE</p><h2 id="compare-title">Find the right feeling.</h2></div><span>Start with 01, 03, or 06</span></div>
        <div className={styles.controls}>
          <div className={styles.controlGroup}><span>All previews</span><button onClick={() => setAll(1)}>To portrait</button><button onClick={() => setAll(0)}>To home</button></div>
          <div className={styles.controlGroup}><span>Icon</span><button aria-pressed={icon === "solid"} onClick={() => setIcon("solid")}>Solid</button><button aria-pressed={icon === "outline"} onClick={() => setIcon("outline")}>Outline</button></div>
          <div className={styles.controlGroup}><label htmlFor="motion-speed">Speed</label><select id="motion-speed" value={speed} onChange={event => setSpeed(Number(event.target.value))}><option value={1}>Normal</option><option value={0.5}>Half speed</option><option value={0.25}>Quarter speed</option></select></div>
        </div>
        <div className={styles.grid}>
          {STUDIES.map((item, index) => {
            const stage = stages[item.id] ?? 0;
            return (
              <article key={item.id} className={`${styles.card} ${selected === item.id ? styles.selected : ""}`}>
                <div className={styles.cardTop}><span>{String(index + 1).padStart(2, "0")}</span>{item.recommended ? <span className={styles.recommendation}>Try first</span> : null}</div>
                <button className={styles.sample} aria-label={`Play ${item.name} ${stage >= 1 ? "to home" : "to portrait"}`} onClick={() => setStages(current => ({ ...current, [item.id]: stage >= 1 ? 0 : 1 }))}>
                  <AvatarStudy study={item} stage={stage} speed={speed} icon={icon} />
                  <span className={styles.sampleLinks}>About <span>Resume</span></span>
                </button>
                <h3>{item.name}</h3><p className={styles.description}>{item.description}</p>
                <div className={styles.cardActions}>
                  <button onClick={() => setStages(current => ({ ...current, [item.id]: stage >= 1 ? 0 : 1 }))}>{stage >= 1 ? "← To home" : "To portrait →"}</button>
                  <button aria-pressed={selected === item.id} onClick={() => { setSelected(item.id); document.getElementById("focus-title")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>{selected === item.id ? <Check size={13} /> : <MoveUpRight size={13} />}In context</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <footer className={styles.footer}>Choose the motion first. The homepage transition stays as-is while you compare.</footer>
    </main>
  );
}
