"use client";
import { useRouter } from "next/navigation";

export const BackToHomeButton = ({ children }) => {
  const router = useRouter();

  function handleBackToHome() {
    router.push("/home");
  }

  return <button onClick={handleBackToHome}>{children}</button>;
};
