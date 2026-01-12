// src/components/ScrollToTop.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top smoothly when pathname changes
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Alternative: instant scroll (feels more like native app)
    // window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
