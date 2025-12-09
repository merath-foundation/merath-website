interface MerathGlyphProps {
  className?: string;
}

export function MerathGlyph({ className }: MerathGlyphProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Merath labyrinth mark"
    >
      <defs>
        <pattern id="grid" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#dcf300" />
          <rect width="1" height="6" fill="#c6da00" />
          <rect x="0" y="0" width="6" height="1" fill="#c6da00" />
        </pattern>
      </defs>
      <rect width="220" height="220" fill="url(#grid)" rx="12" />
      <g stroke="#050505" strokeWidth="4" fill="none" strokeLinecap="round">
        <line x1="24" y1="64" x2="196" y2="64" />
        <line x1="24" y1="76" x2="196" y2="76" />
        <rect x="28" y="84" width="164" height="108" rx="6" />
      </g>
      <text x="32" y="52" fontFamily="'Cairo', 'Inter', sans-serif" fontSize="28" fill="#050505">
        ميراث
      </text>
      <path
        d="M60 120h60v20h40v40H80v-40h-20z"
        fill="none"
        stroke="#050505"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <circle cx="124" cy="130" r="12" fill="#ffff64" stroke="#050505" strokeWidth="6" />
      <circle cx="150" cy="168" r="3" fill="#050505" />
      <circle cx="160" cy="176" r="3" fill="#050505" />
    </svg>
  );
}
