"use client";

import { useLayoutEffect, useState } from "react";
import { Toaster as ShadcnToaster } from "sonner";

export default function Toaster() {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <ShadcnToaster
      position={isMobile ? "top-center" : "bottom-right"}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "w-full flex items-center gap-2 p-4 rounded-xl border border-border/50 backdrop-blur-md bg-card/30 shadow-2xl",
          title: "text-sm font-semibold text-foreground",
          description: "text-xs text-muted-foreground",
          actionButton:
            "bg-primary text-primary-foreground text-xs px-3 py-1 ml-auto rounded-md",
          cancelButton:
            "bg-muted text-muted-foreground text-xs px-3 py-1 rounded-md",
        },
      }}
    />
  );
}
