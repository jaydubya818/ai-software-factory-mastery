"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    let preference = document.documentElement.dataset.theme === "dark";
    try {
      const saved = window.localStorage.getItem("asfm-theme");
      preference = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      preference = false;
    }
    const frame = window.requestAnimationFrame(() => {
      document.documentElement.dataset.theme = preference ? "dark" : "light";
      setDark(preference);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggle() {
    const next = dark !== true;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    try {
      window.localStorage.setItem("asfm-theme", next ? "dark" : "light");
    } catch {
      // Theme persistence is optional.
    }
  }

  return (
    <button className="icon-button theme-toggle" type="button" onClick={toggle} aria-label={`Use ${dark ? "light" : "dark"} theme`}>
      <span aria-hidden="true">{dark ? "◐" : "◑"}</span>
    </button>
  );
}
