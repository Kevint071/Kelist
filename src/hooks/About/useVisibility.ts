"use client";

import { useEffect, useState } from "react";

export function useVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return isVisible;
}
