/**
 * Abstract project artifacts — composed SVG compositions per project.
 * On-brand alternative to stock photography. Each artifact has a
 * distinct visual signature tied to its discipline.
 */
import { motion } from "framer-motion";

interface Props {
  index: number;
  color: string;
  className?: string;
}

export const ProjectArtifact = ({ index, color, className = "" }: Props) => {
  const i = ((index - 1) % 6 + 6) % 6;

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, #0A0A0B 100%)`,
      }}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {/* Grain texture overlay */}
        <defs>
          <filter id={`grain-${index}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" />
            <feColorMatrix values="0 0 0 0 1 0 0 0 0 0.92 0 0 0 0 0.87 0 0 0 0.12 0" />
          </filter>
          <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F2EBDD" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#F2EBDD" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill={`url(#grad-${index})`} />
        <rect width="800" height="600" filter={`url(#grain-${index})`} opacity="0.3" />

        {i === 0 && <SystemGrid />}
        {i === 1 && <BrandWordmark />}
        {i === 2 && <EditorSurface />}
        {i === 3 && <ComponentLibrary />}
        {i === 4 && <IdentityMark />}
        {i === 5 && <NetworkGraph />}
      </svg>
    </div>
  );
};

const SystemGrid = () => (
  <g stroke="#F2EBDD" strokeOpacity="0.18" strokeWidth="0.4" fill="none">
    {Array.from({ length: 20 }).map((_, i) => (
      <line key={`v-${i}`} x1={40 + i * 38} y1="60" x2={40 + i * 38} y2="540" />
    ))}
    {Array.from({ length: 14 }).map((_, i) => (
      <line key={`h-${i}`} x1="40" y1={60 + i * 36} x2="760" y2={60 + i * 36} />
    ))}
    <circle cx="400" cy="300" r="120" stroke="#F2EBDD" strokeOpacity="0.4" strokeWidth="0.5" />
    <circle cx="400" cy="300" r="160" stroke="#F2EBDD" strokeOpacity="0.25" strokeWidth="0.5" />
    <circle cx="400" cy="300" r="3" fill="#A8643C" />
  </g>
);

const BrandWordmark = () => (
  <g>
    <text
      x="400"
      y="340"
      textAnchor="middle"
      fontFamily="Fraunces, serif"
      fontSize="200"
      fontStyle="italic"
      fontWeight="300"
      fill="#F2EBDD"
      opacity="0.85"
    >
      Ipsum
    </text>
    <line x1="180" y1="380" x2="620" y2="380" stroke="#F2EBDD" strokeOpacity="0.3" strokeWidth="0.5" />
    <text x="400" y="410" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="12" letterSpacing="6" fill="#F2EBDD" opacity="0.5">
      FINANCIAL · 2024
    </text>
  </g>
);

const EditorSurface = () => (
  <g>
    <rect x="80" y="80" width="640" height="440" fill="none" stroke="#F2EBDD" strokeOpacity="0.2" strokeWidth="0.5" />
    <rect x="80" y="80" width="640" height="38" fill="#F2EBDD" fillOpacity="0.04" />
    <circle cx="100" cy="99" r="3" fill="#F2EBDD" fillOpacity="0.35" />
    <circle cx="112" cy="99" r="3" fill="#F2EBDD" fillOpacity="0.35" />
    <circle cx="124" cy="99" r="3" fill="#F2EBDD" fillOpacity="0.35" />
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={i} x1="120" y1={160 + i * 26} x2={120 + Math.random() * 480 + 80} y2={160 + i * 26} stroke="#F2EBDD" strokeOpacity={0.15 + (i % 3) * 0.06} strokeWidth="2" />
    ))}
    <rect x="600" y="160" width="100" height="100" fill="none" stroke="#A8643C" strokeOpacity="0.6" strokeWidth="0.5" />
    <circle cx="650" cy="210" r="3" fill="#A8643C" />
  </g>
);

const ComponentLibrary = () => (
  <g>
    {Array.from({ length: 6 }).map((_, row) =>
      Array.from({ length: 8 }).map((_, col) => {
        const x = 80 + col * 84;
        const y = 80 + row * 80;
        const variant = (row + col) % 4;
        return (
          <g key={`${row}-${col}`}>
            <rect x={x} y={y} width="64" height="60" fill="none" stroke="#F2EBDD" strokeOpacity={0.15 + (variant * 0.05)} strokeWidth="0.4" />
            {variant === 0 && <circle cx={x + 32} cy={y + 30} r="8" fill="none" stroke="#F2EBDD" strokeOpacity="0.4" strokeWidth="0.5" />}
            {variant === 1 && <line x1={x + 8} y1={y + 30} x2={x + 56} y2={y + 30} stroke="#F2EBDD" strokeOpacity="0.4" strokeWidth="1" />}
            {variant === 2 && <rect x={x + 12} y={y + 18} width="40" height="24" fill="#F2EBDD" fillOpacity="0.12" />}
            {variant === 3 && (
              <>
                <line x1={x + 12} y1={y + 22} x2={x + 52} y2={y + 22} stroke="#F2EBDD" strokeOpacity="0.3" strokeWidth="0.4" />
                <line x1={x + 12} y1={y + 30} x2={x + 40} y2={y + 30} stroke="#F2EBDD" strokeOpacity="0.3" strokeWidth="0.4" />
                <line x1={x + 12} y1={y + 38} x2={x + 48} y2={y + 38} stroke="#F2EBDD" strokeOpacity="0.3" strokeWidth="0.4" />
              </>
            )}
          </g>
        );
      })
    )}
  </g>
);

const IdentityMark = () => (
  <g>
    <circle cx="400" cy="300" r="180" fill="none" stroke="#F2EBDD" strokeOpacity="0.25" strokeWidth="0.5" />
    <text
      x="400"
      y="340"
      textAnchor="middle"
      fontFamily="Fraunces, serif"
      fontSize="220"
      fontWeight="300"
      fill="#F2EBDD"
      opacity="0.9"
    >
      A
    </text>
    <text x="400" y="500" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="6" fill="#F2EBDD" opacity="0.4">
      ADIPISCING · LABS
    </text>
  </g>
);

const NetworkGraph = () => {
  const nodes = Array.from({ length: 18 }).map((_, i) => ({
    x: 100 + Math.sin(i * 1.7) * 280 + Math.cos(i) * 100 + 300,
    y: 100 + Math.cos(i * 1.3) * 180 + 200,
  }));
  return (
    <g>
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 220) return null;
          return (
            <line
              key={`${i}-${j}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#F2EBDD"
              strokeOpacity={0.15}
              strokeWidth="0.4"
            />
          );
        })
      )}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={i === 8 ? 5 : 2}
          fill={i === 8 ? "#A8643C" : "#F2EBDD"}
          fillOpacity={i === 8 ? 1 : 0.55}
        />
      ))}
    </g>
  );
};
