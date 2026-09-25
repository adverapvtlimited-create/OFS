export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-ofs-navy-950 flex flex-col items-center justify-center p-6 select-none">
      {/* Background radial ambient glow */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-red-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute w-[280px] h-[280px] rounded-full bg-blue-600/10 blur-[90px] pointer-events-none" />

      {/* Industrial Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full">
        {/* Animated Brand Logo / Spinner Ring */}
        <div className="relative flex items-center justify-center mb-7">
          {/* Ambient Glow */}
          <div className="absolute w-20 h-20 rounded-full bg-red-500/20 blur-xl animate-pulse" />
          
          {/* Outer Orbital Ring */}
          <div className="w-16 h-16 rounded-full border-2 border-white/10 border-t-red-500 border-r-rose-400 animate-spin [animation-duration:1s]" />
          
          {/* Inner Counter-Rotating Ring */}
          <div className="absolute w-10 h-10 rounded-full border border-blue-400/20 border-b-blue-400 animate-spin [animation-duration:1.4s] [animation-direction:reverse]" />
          
          {/* Central Logo Core */}
          <div className="absolute flex items-center justify-center font-heading font-black text-sm text-white tracking-tighter">
            OFS
          </div>
        </div>

        {/* Brand Name & Loading Tag */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-slate-300 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>Loading Experience</span>
          </div>

          <h2 className="font-heading text-lg font-bold text-white tracking-wide">
            OFS GROUP INDIA
          </h2>

          <p className="font-mono text-xs text-slate-400">
            Industrial Procurement &amp; Engineering Solutions
          </p>
        </div>

        {/* Progress Bar Shimmer */}
        <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent w-full image-shimmer-sweep" />
        </div>
      </div>
    </div>
  );
}
