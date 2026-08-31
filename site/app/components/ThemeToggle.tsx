"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let preference = false;
    try {
      preference = window.localStorage.getItem("asfm-theme") === "dark";
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
    const next = !dark;
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
