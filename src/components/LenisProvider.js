import React, { useRef, useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

const LenisProvider = ({ children }) => {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useLenis(({ scroll, limit, velocity, direction, progress }) => {
    ScrollTrigger.update();
  });

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 1,
        duration: 0,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        easing: (t) => t,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
