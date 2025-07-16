import Link from "next/link";
import SpaceBackground from "@/components/SpaceBackground";
import EarthAnimation from "@/components/EarthAnimation";
import BackgroundMusic from "@/components/BackgroundMusic";
import { cookies } from "next/headers";


export default async function Home() {
  // Get the current logged-in user
  const cookieStore = await cookies();
  const currentUser = cookieStore.get("username")?.value;

  // Fallback username if user not found
  const displayName = currentUser || "Guest";

  return (
    <SpaceBackground className="flex items-center justify-center p-4">
      <BackgroundMusic />
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl thick-yellow-border p-8 max-w-md w-full text-center mt-16 relative">
        {/* Profile Section in Top Right Corner of Card */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-40">
          <span className="text-gray-700 font-semibold text-sm">
            {displayName}
          </span>
          <Link href="/home/profile">
            <div className="w-12 h-12 bg-gray-300 rounded-full border-2 border-purple-600 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-gray-600"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
        </div>
        <h1
          className="text-6xl font-black text-yellow-400 mb-2 tracking-wide font-mono drop-shadow-lg mt-8"
          style={{
            textShadow:
              "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
          }}
        >
          exQuizzit
        </h1>

        {/* Earth Animation */}
        <EarthAnimation />

        <p className="text-gray-600 mb-8">
          Test your knowledge of countries around the world!
        </p>

        <div className="space-y-4">
          <Link
            href="/quiz"
            className="block w-full bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 hover:scale-110 transition-all duration-200 font-semibold text-lg"
          >
            Start Quiz 🚀
          </Link>

          <Link
            href="/leaderboard"
            className="block w-full bg-slate-600 text-white py-3 px-6 rounded-lg hover:bg-slate-700 hover:scale-110 transition-all duration-200 font-semibold"
          >
            View Leaderboard 🏆
          </Link>

          <button className="block w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 hover:scale-110 transition-all duration-200 font-semibold">
            Open Loot Box - 1000 Coins 💰
          </button>
        </div>
      </div>
    </SpaceBackground>
  );
}
