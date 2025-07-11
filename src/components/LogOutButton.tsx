"use client";
import { useRouter } from "next/navigation";

type LogOutButtonProps = {
  className?: string;
};

export const LogOutButton = ({ className }: LogOutButtonProps) => {
  const router = useRouter();
  const handleLogOutButton = async () => {
    const data = await fetch("/api/logout", {
      method: "POST",
    });

    if (!data) {
      console.log("logout failed");
    } else {
      router.push("/");
    }
  };
  return (
    <button onClick={handleLogOutButton} className={className}>
      Logout
    </button>
  );
};
