const HeroWaterSvg = () => (
  <svg
    viewBox="0 0 240 240"
    className="w-full h-full hero-water"
    shapeRendering="geometricPrecision"
  >
    <defs>
      <clipPath id="clipCircle">
        <circle cx="120" cy="120" r="100" />
      </clipPath>

      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="50%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>

      <linearGradient id="waterFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity=".55" />
        <stop offset="100%" stopColor="#06b6d4" stopOpacity=".55" />
      </linearGradient>

      <path
        id="wave"
        d="M0 12 C20 2,40 22,60 12 S100 2,120 12 S160 22,180 12 S220 2,240 12 V140 H0 Z"
      />
    </defs>

    {/* Ring */}
    <circle
      cx="120"
      cy="120"
      r="108"
      fill="none"
      stroke="url(#ring)"
      strokeWidth="10"
    />

    {/* Water */}
    <g clipPath="url(#clipCircle)">
      {/* Moving waves */}
      <g id="slosh" transform="translate(0, 110)">
        <g className="tile">
          <use href="#wave" fill="#38bdf8" opacity=".5" />
          <use href="#wave" x="240" fill="#38bdf8" opacity=".5" />
        </g>

        <g className="tile slow" transform="translate(0, 6)">
          <use href="#wave" fill="#0ea5e9" opacity=".35" />
          <use href="#wave" x="240" fill="#0ea5e9" opacity=".35" />
        </g>
      </g>
    </g>
  </svg>
);

export default HeroWaterSvg;