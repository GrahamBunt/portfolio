export type NavAvatarStage = 0 | 1;

// Retain the last homepage state across client-side page navigation.
// A fresh visit starts with the home icon on / and the portrait elsewhere.
let currentStage: NavAvatarStage | undefined;
const listeners = new Set<() => void>();

export function getNavAvatarStage(fallback: NavAvatarStage) {
  return currentStage ?? fallback;
}

export function setNavAvatarStage(stage: NavAvatarStage) {
  if (currentStage === stage) return;
  currentStage = stage;
  listeners.forEach((listener) => listener());
}

export function subscribeNavAvatar(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
