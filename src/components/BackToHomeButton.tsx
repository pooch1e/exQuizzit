"use client";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface BackToHomeButtonProps {
  children: ReactNode;
  className?: string;
}

export const BackToHomeButton = ({
  children,
  className = "",
}: BackToHomeButtonProps) => {
  const router = useRouter();

  function handleBackToHome() {
    router.push("/home");
  }

  return (
    <button onClick={handleBackToHome} className={`w-full ${className}`}>
      {children}
    </button>
  );
};
