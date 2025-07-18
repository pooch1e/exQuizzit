//loading component
'use client';
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Space background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-32 left-1/3 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-40 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-3000"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-purple-200 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-2500"></div>
      </div>
      <div className="text-xl text-blue-200 relative z-10">
        Loading quiz questions...
      </div>
    </div>
  );
}
