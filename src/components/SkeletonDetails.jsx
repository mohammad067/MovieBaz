
function SkeletonDetails() {
  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-stone-600/70 via-stone-700/80 to-stone-800/90 animate-pulse">
      
      <div className="relative w-full min-h-screen md:min-h-[650px] flex items-end">
        
        <div className="absolute inset-0 bg-stone-700/60" />

        <div className="relative z-10 max-w-8xl mx-auto md:mx-24 px-4 py-10 w-full">
          <div className="flex flex-col mt-2 sm:flex-row gap-8 items-start">
            
            <div className="flex-shrink-0">
              <div className="w-56 sm:w-64 md:w-80 aspect-[2/3] bg-stone-600/60 rounded-2xl" />
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xl">
              
              <div className="h-10 bg-stone-600/60 rounded-lg w-3/4" />

              <div className="flex gap-4">
                <div className="h-5 bg-stone-600/60 rounded w-24" />
                <div className="h-5 bg-stone-600/60 rounded w-16" />
                <div className="h-5 bg-stone-600/60 rounded w-20" />
              </div>

              <div className="flex gap-2">
                <div className="h-7 bg-stone-600/60 rounded-full w-16" />
                <div className="h-7 bg-stone-600/60 rounded-full w-20" />
                <div className="h-7 bg-stone-600/60 rounded-full w-14" />
              </div>

              <div className="h-5 bg-stone-600/60 rounded w-1/2" />

              <div className="h-12 bg-stone-600/60 rounded-2xl w-44 mt-4" />

              <div className="mt-6 flex flex-col gap-2">
                <div className="h-5 bg-stone-600/60 rounded w-24" />
                <div className="h-4 bg-stone-600/60 rounded w-full" />
                <div className="h-4 bg-stone-600/60 rounded w-5/6" />
                <div className="h-4 bg-stone-600/60 rounded w-4/6" />
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 max-w-8xl mx-auto md:mx-24 px-4 py-2">
        <div className="h-6 bg-stone-600/60 rounded w-24 mb-4" />
        <div className="bg-stone-900/50 border border-white/15 p-4 rounded-md">
          <div className="flex gap-4 overflow-hidden py-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-stone-600/60" />
                <div className="h-3 bg-stone-600/60 rounded w-16" />
                <div className="h-3 bg-stone-600/60 rounded w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default SkeletonDetails;