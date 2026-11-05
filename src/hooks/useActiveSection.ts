import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently in the reading band of the viewport.
 * Position is recalculated on every scroll and resize event, so the value never
 * goes stale after fast scrolling. The last section is forced at the page bottom.
 */
export function useActiveSection(ids: readonly string[], fallback: string) {
  const [active, setActive] = useState(fallback);

  useEffect(() => {
    const compute = () => {
      const readingLine = window.innerHeight * 0.4;
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= readingLine) current = id;
      }
      setActive(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids]);

  return active;
}
