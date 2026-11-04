/** Original decorative SVG: a candlestick/area chart with a bell curve and formula chips. */
export function HeroArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 380" className={className} role="img" aria-label="Illustration of a price chart, a probability curve and formula cards">
      <defs>
        <linearGradient id="ha-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--c-primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--c-primary)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ha-card" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--c-primary)" />
          <stop offset="100%" stopColor="var(--c-accent)" />
        </linearGradient>
      </defs>
      <rect x="20" y="30" width="400" height="280" rx="20" fill="var(--c-surface)" stroke="var(--c-border)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="45" x2="395" y1={80 + i * 50} y2={80 + i * 50} stroke="var(--c-border)" strokeDasharray="4 6" />
      ))}
      <path d="M45 250 L95 220 L145 232 L195 180 L245 192 L295 140 L345 150 L395 100 L395 280 L45 280 Z" fill="url(#ha-area)" />
      <path d="M45 250 L95 220 L145 232 L195 180 L245 192 L295 140 L345 150 L395 100" fill="none" stroke="var(--c-primary)" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
      {[
        [80, 200, 240, 215, 230, true],
        [130, 205, 250, 228, 238, false],
        [180, 160, 210, 170, 195, true],
        [230, 170, 215, 185, 205, false],
        [280, 120, 170, 130, 155, true],
        [330, 128, 175, 138, 162, false],
      ].map(([x, hi, lo, o, c, up], i) => (
        <g key={i} opacity="0.55">
          <line x1={x as number} x2={x as number} y1={hi as number} y2={lo as number} stroke={up ? "var(--c-accent)" : "var(--c-danger)"} strokeWidth="2" />
          <rect x={(x as number) - 6} y={Math.min(o as number, c as number)} width="12" height={Math.abs((c as number) - (o as number))} rx="2" fill={up ? "var(--c-accent)" : "var(--c-danger)"} />
        </g>
      ))}
      <g transform="translate(250 230)">
        <rect width="210" height="120" rx="16" fill="var(--c-surface)" stroke="var(--c-border)" />
        <path d="M20 95 C 60 95, 70 25, 105 25 S 150 95, 190 95" fill="none" stroke="var(--c-accent)" strokeWidth="3" />
        <path d="M150 95 C 160 85, 168 70, 175 72 L190 95 Z" fill="var(--c-danger)" opacity="0.35" />
        <line x1="20" x2="190" y1="95" y2="95" stroke="var(--c-border)" />
        <text x="20" y="18" fontSize="11" fill="var(--c-muted)" fontFamily="ui-sans-serif, system-ui">Return distribution · tail risk</text>
      </g>
      <g transform="translate(0 0)">
        <rect x="300" y="0" width="160" height="56" rx="14" fill="url(#ha-card)" />
        <text x="318" y="34" fontSize="18" fill="#fff" fontFamily="ui-serif, Georgia, serif" fontStyle="italic">PV = FV/(1+r)ⁿ</text>
      </g>
      <g>
        <rect x="0" y="300" width="170" height="56" rx="14" fill="var(--c-surface)" stroke="var(--c-border)" />
        <circle cx="28" cy="328" r="12" fill="var(--c-success)" opacity="0.2" />
        <path d="M22 328 l5 5 l9 -10" stroke="var(--c-success)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="50" y="324" fontSize="12" fontWeight="600" fill="var(--c-foreground)" fontFamily="ui-sans-serif, system-ui">Quiz complete</text>
        <text x="50" y="341" fontSize="11" fill="var(--c-muted)" fontFamily="ui-sans-serif, system-ui">Instant explanations</text>
      </g>
    </svg>
  );
}
