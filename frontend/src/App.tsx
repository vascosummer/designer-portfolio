import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Cursor } from "@/components/layout/Cursor";
import { HUD } from "@/components/layout/HUD";
import HomePage from "@/pages/HomePage";
import WorkDetailPage from "@/pages/WorkDetailPage";
import ArchivePage from "@/pages/ArchivePage";
import StudioPage from "@/pages/StudioPage";
import ContactPage from "@/pages/ContactPage";

const Shell = () => {
  const { progress, scrolling } = useLenis();
  const reduced = useReducedMotion();
  const location = useLocation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <>
      {/* Atmosphere layers — always present */}
      {!reduced && <div className="grain" aria-hidden />}
      <div className="vignette" aria-hidden />

      {/* Custom cursor */}
      <Cursor />

      {/* HUD */}
      <HUD scrollProgress={progress} scrolling={scrolling} />

      {/* Pre-roll curtain */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-[#0A0A0B] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Routes — View Transition API owns work-route morphs; other routes fade in */}
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<WorkDetailPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}

export default App;
