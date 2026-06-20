import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";

const Works = lazy(() => import("./pages/Works"));

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <BrowserRouter>
        <ScrollReset />
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />
        <main style={{ paddingBottom: "var(--dock-pad, 72px)" }}>
          {loaded && (
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/works" element={<Works />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          )}
        </main>
        <Footer />
        <style>{`
          @media (min-width: 768px) { :root { --dock-pad: 0px; } }
        `}</style>
      </BrowserRouter>
      <SpeedInsights />
    </>
  );
}
