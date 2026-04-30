import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as bootstrap from "bootstrap"; // ✅ Import at the top
import WOW from "wow.js";
export default function GlobalEffectsProvider() {
  const { pathname } = useLocation();

  // Close any open modals/offcanvas on route change
  useEffect(() => {
    // Close all open modals
    document.querySelectorAll(".modal.show").forEach((modal) => {
      const instance = bootstrap.Modal.getOrCreateInstance(modal);
      if (instance) instance.hide();
    });

    // Close all open offcanvas
    document.querySelectorAll(".offcanvas.show").forEach((offcanvas) => {
      const instance = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
      if (instance) instance.hide();
    });
  }, [pathname]);

  // WOW.js: import once, but init on every route change

  useEffect(() => {
    const wow = new WOW({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  return null;
}
