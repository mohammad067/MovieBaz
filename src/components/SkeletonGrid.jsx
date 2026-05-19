function SkeletonGrid({ count = 30 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
      
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-stone-800/90 rounded-xl mt-2 overflow-hidden border-2 border-slate-700/50"
        >
          
          {/* جای پوستر فیلم */}
          <div className="aspect-[2/3] bg-stone-700/60 animate-pulse" />
          
        </div>
      ))}
      
    </div>
  );
}

export default SkeletonGrid;