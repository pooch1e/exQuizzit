import Link from 'next/link';
import SpaceBackground from '@/components/SpaceBackground';
import EarthAnimation from '@/components/EarthAnimation';

export default function Home() {
  return (
    <SpaceBackground className="flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl thick-yellow-border p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">exQuizzit</h1>
        
        {/* Earth Animation */}
        <EarthAnimation />
        
        <p className="text-gray-600 mb-8">Test your knowledge of countries around the world!</p>
        
        <div className="space-y-4">
          <Link 
            href="/quiz"
            className="block w-full bg-purple-600 text-white py-4 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg"
          >
            Start Quiz 🚀
          </Link>
          
          <Link 
            href="/leaderboard"
            className="block w-full bg-slate-600 text-white py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors font-semibold"
          >
            View Leaderboard 🏆
          </Link>
          
          <button 
            className="block w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
          >
            Open Loot Box - 1000 Coins 💰
          </button>
        </div>
      </div>
    </SpaceBackground>
  );
}
