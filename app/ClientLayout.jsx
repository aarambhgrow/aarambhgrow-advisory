"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.scrollTo(0, {
        immediate: true,
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.05,
        duration: 1.8,
        smoothWheel: true,
        wheelMultiplier: 0.85,
      }}
    >
      {children}
    </ReactLenis>
  );
}