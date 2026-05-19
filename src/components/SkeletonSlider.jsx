// skeleton برای اسلایدر - فقط بک‌گراند + کارت‌های سمت راست
function SkeletonSlider() {
  return (
    <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[75vh] bg-stone-800/90 animate-pulse overflow-hidden">
      
      {/* جای بک‌گراند */}
      <div className="absolute inset-0 bg-stone-700/60" />
      {/* جای کارت‌های سمت راست */}
      <div className="absolute bottom-1/4 left-0 -right-1/2 z-10 hidden md:flex justify-center gap-1 py-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="translate-x-1/2 mx-1"
          >
            <div className="w-28 h-44 lg:w-48 lg:h-72 bg-stone-600/60 rounded-xl" />
          </div>
        ))}
      </div>

    </div>
  );
}

export default SkeletonSlider;