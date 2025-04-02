"use client";

import { useAuthStore } from "@/lib/authStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/acceder");
    }
  }, [isAuthenticated, isLoading, isMounted, router]);

  if (!isMounted || isLoading) return null;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
