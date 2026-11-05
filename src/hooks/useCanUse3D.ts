import { useEffect, useState } from "react";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decides whether the heavy React Three Fiber scene should be mounted.
 * 3D is skipped on small screens, when reduced motion is requested, or when
 * WebGL is unavailable. In those cases a lightweight CSS alternative is used.
 */
export function useCanUse3D(): boolean {
  const [canUse, setCanUse] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setCanUse(desktop.matches && !reduced.matches && hasWebGL());
    };

    evaluate();
    desktop.addEventListener("change", evaluate);
    reduced.addEventListener("change", evaluate);
    return () => {
      desktop.removeEventListener("change", evaluate);
      reduced.removeEventListener("change", evaluate);
    };
  }, []);

  return canUse;
}
