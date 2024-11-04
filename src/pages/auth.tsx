// src/pages/AuthPage.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!window.location.hash) {
      router.replace("/login");
      return;
    }

    const token = window.location.hash.match(/token=([0-9a-fA-F-]{36})/)?.[1];

    window.history.replaceState(null, "", window.location.pathname);

    if (token) {
      console.log(token);
      sessionStorage.setItem("token", token);

      document.cookie = `logged=yes; path=/; ${
        process.env.NODE_ENV === "production" ? "Secure; HttpOnly;" : ""
      }`;

      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
};

export default AuthPage;
