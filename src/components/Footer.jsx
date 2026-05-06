import { div, footer } from "framer-motion/client";

function Footer() {
    return (
        <footer className="bg-slate-900 border-t-2 border-slate-800 overflow-x-hidden relative z-10 py-2 px-3">
              

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 ">

                       
                        <div>
                            <h2 className="shrink-0 text-base sm:text-xl md:text-2xl mb-6
        font-bold text-violet-500 cursor-pointer">
                                MovieBaz 
                            </h2>

                            <div className="space-y-3 text-sm md:text-base text-zinc-500 mb-10">
                                <p className="flex gap-2">
                                    <span>📍</span>
                                    <span>tehran-shahrRay-bayat ST-karimiShirazey ST</span>
                                </p>

                                <p className="flex gap-2">
                                    <span>📞</span>
                                    <span>+98 9199724318</span>
                                </p>
                            </div>

                            <h3 className="text-base md:text-lg font-semibold text-zinc-900 mb-4">
                                Never Miss the Best Deals
                            </h3>
                            <div className="flex w-72 max-w-72 items-center rounded-full border border-zinc-200 overflow-hidden h-11">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-3 py-4 outline-none text-sm text-zinc-700 placeholder:text-zinc-400"
                                />
                                <button
                                    type="button"
                                    className="px-4 py-3 text-zinc-700 hover:bg-zinc-100 transition "
                                >
                                    →
                                </button>
                            </div>
                        </div>


                <ul className="space-y-3 my-14 text-sm md:text-base text-zinc-500">
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                  <li>Cookie Policy</li>
                  <li>Refund & Cancellation Policy</li>
                  <li>User Agreement</li>
                </ul>
              
            </div>
        </footer>
    );
}
export default Footer;