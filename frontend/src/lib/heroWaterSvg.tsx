const HeroWaterSvg = () => (
  <svg viewBox="0 0 240 240" className="hero-water w-full h-full">
    <defs>
      <clipPath id="clipCircle">
        <circle cx="120" cy="120" r="92" />
      </clipPath>

      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="50%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>

      <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#22c55e" stopOpacity=".30" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity=".35" />
      </linearGradient>

      {/* Onda base */}
      <path
        id="wavePath"
        d="M0 12 C20 2,40 22,60 12 S100 2,120 12 S160 22,180 12 S220 2,240 12 V140 H0 Z"
      />
    </defs>

    {/* Aro externo */}
    <circle
      cx="120"
      cy="120"
      r="100"
      fill="none"
      stroke="url(#ring)"
      strokeWidth="8"
      opacity=".65"
    />

    {/* Agua recortada al círculo */}
    <g clipPath="url(#clipCircle)">
      {/* Fondo sutil */}
      <rect x="0" y="0" width="240" height="240" fill="rgba(255,255,255,.02)" />

      {/* Nivel (se puede ajustar moviendo translateY) */}
      <g id="slosh" transform="translate(0,140)">
        <rect x="0" y="0" width="240" height="120" fill="url(#waterGrad)" />

        {/* Onda 1: dos tiles para bucle perfecto */}
        <g className="tile">
          <use href="#wavePath" fill="#7cc4ff" opacity=".45" />
          <use href="#wavePath" x="240" fill="#7cc4ff" opacity=".45" />
        </g>

        {/* Onda 2 (más lenta y baja) */}
        <g className="tile slow" transform="translate(0,6)">
          <use href="#wavePath" fill="#34d399" opacity=".30" />
          <use href="#wavePath" x="240" fill="#34d399" opacity=".30" />
        </g>
      </g>
    </g>
  </svg>
);

export default HeroWaterSvg;
