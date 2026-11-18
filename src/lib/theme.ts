export type Theme = "dark" | "light";

const STORAGE_KEY = "portfolio-theme";
const CHANGE_EVENT = "portfolio-theme-change";

// Run before the page paints so a saved light preference never flashes dark.
export const THEME_INIT_SCRIPT = `(()=>{let theme="dark";try{if(localStorage.getItem("${STORAGE_KEY}")==="light")theme="light"}catch{}document.documentElement.dataset.theme=theme})()`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function getServerTheme(): Theme {
  return "dark";
}

export function toggleTheme() {
  const theme = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Theme switching still works when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeTheme(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "light" ? "light" : "dark";
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
