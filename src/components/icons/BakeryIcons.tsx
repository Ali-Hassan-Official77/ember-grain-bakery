import type { IconKey } from "@/types";

interface IconProps {
  className?: string;
}

/** Shared gradient + filter defs, reused via url() refs across every icon. */
function IconDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`crust-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E3B36A" />
        <stop offset="45%" stopColor="#C0863F" />
        <stop offset="100%" stopColor="#7A4A22" />
      </linearGradient>
      <linearGradient id={`crumb-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FBEFD8" />
        <stop offset="100%" stopColor="#EAD3A4" />
      </linearGradient>
      <linearGradient id={`jam-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9A3B49" />
        <stop offset="100%" stopColor="#601A26" />
      </linearGradient>
      <radialGradient id={`shine-${id}`} cx="35%" cy="25%" r="60%">
        <stop offset="0%" stopColor="#FFF6E3" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFF6E3" stopOpacity="0" />
      </radialGradient>
      <filter id={`soft-${id}`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#241811" floodOpacity="0.28" />
      </filter>
    </defs>
  );
}

function Pretzel({ className }: IconProps) {
  const id = "pretzel";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <IconDefs id={id} />
      <g filter={`url(#soft-${id})`}>
        <path
          d="M55 70 C40 55 45 30 68 30 C82 30 88 42 88 55 L88 110 C88 130 100 138 112 122 L148 68 C158 53 178 62 172 80 C168 92 148 118 132 138 C118 155 94 168 72 158 C50 148 40 122 55 100 C62 90 72 90 78 98 C84 106 78 116 70 112 C64 109 62 100 68 96"
          fill="none"
          stroke={`url(#crust-${id})`}
          strokeWidth="17"
          strokeLinecap="round"
        />
        <path
          d="M55 70 C40 55 45 30 68 30 C82 30 88 42 88 55 L88 110 C88 130 100 138 112 122 L148 68 C158 53 178 62 172 80 C168 92 148 118 132 138 C118 155 94 168 72 158 C50 148 40 122 55 100 C62 90 72 90 78 98 C84 106 78 116 70 112 C64 109 62 100 68 96"
          fill="none"
          stroke={`url(#shine-${id})`}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>
      {/* salt crystals */}
      {[
        [70, 45], [95, 60], [120, 95], [140, 78], [100, 130], [80, 150], [60, 115],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={2.6} fill="#FBF6EC" opacity={0.9} />
      ))}
    </svg>
  );
}

function Croissant({ className }: IconProps) {
  const id = "croissant";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <IconDefs id={id} />
      <g filter={`url(#soft-${id})`}>
        <path
          d="M34 118 C34 78 66 46 108 42 C150 38 176 66 168 84 C160 74 138 66 118 72 C142 78 158 96 152 114 C144 104 126 98 110 102 C132 108 144 124 136 140 C128 132 112 128 98 132 C114 138 122 150 112 160 C98 150 72 156 52 146 C36 138 34 130 34 118 Z"
          fill={`url(#crust-${id})`}
        />
        <path
          d="M108 42 C150 38 176 66 168 84 C160 74 138 66 118 72"
          fill="none"
          stroke={`url(#shine-${id})`}
          strokeWidth="4"
          opacity="0.7"
        />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${58 + i * 20} ${150 - i * 4} q10 -18 26 -22`}
            fill="none"
            stroke="#5C3A1E"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.45"
          />
        ))}
      </g>
    </svg>
  );
}

function Berliner({ className }: IconProps) {
  const id = "berliner";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <IconDefs id={id} />
      <g filter={`url(#soft-${id})`}>
        <ellipse cx="100" cy="108" rx="66" ry="52" fill={`url(#crust-${id})`} />
        <ellipse cx="100" cy="96" rx="66" ry="50" fill={`url(#crumb-${id})`} />
        <ellipse cx="82" cy="80" rx="30" ry="18" fill={`url(#shine-${id})`} opacity="0.8" />
      </g>
      {/* powdered sugar */}
      {[
        [64, 70], [80, 60], [98, 66], [116, 58], [132, 72], [70, 90], [128, 92], [100, 82], [110, 100], [88, 100],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 3.2 : 2.1} fill="#FFFDF7" opacity={0.95} />
      ))}
      {/* jam dollop */}
      <ellipse cx="128" cy="128" rx="16" ry="12" fill={`url(#jam-${id})`} filter={`url(#soft-${id})`} />
      <ellipse cx="122" cy="123" rx="5" ry="3.4" fill="#C86478" opacity="0.7" />
    </svg>
  );
}

function Loaf({ className }: IconProps) {
  const id = "loaf";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <IconDefs id={id} />
      <g filter={`url(#soft-${id})`}>
        <path
          d="M36 132 C36 96 60 58 100 58 C140 58 164 96 164 132 C164 148 150 154 100 154 C50 154 36 148 36 132 Z"
          fill={`url(#crust-${id})`}
        />
        <path
          d="M50 128 C50 100 70 76 100 76 C130 76 150 100 150 128 C150 138 132 142 100 142 C68 142 50 138 50 128 Z"
          fill={`url(#shine-${id})`}
          opacity="0.5"
        />
      </g>
      {[-24, -6, 12, 30].map((dx, i) => (
        <path
          key={i}
          d={`M${100 + dx - 14} ${100 - i * 0} q14 -22 28 0`}
          fill="none"
          stroke="#5C3A1E"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

function Baguette({ className }: IconProps) {
  const id = "baguette";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <IconDefs id={id} />
      <g filter={`url(#soft-${id})`} transform="rotate(-18 100 100)">
        <rect x="34" y="86" width="132" height="34" rx="17" fill={`url(#crust-${id})`} />
        <rect x="34" y="86" width="132" height="14" rx="7" fill={`url(#shine-${id})`} opacity="0.6" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${52 + i * 24} 84 q6 18 -2 36`}
            fill="none"
            stroke="#5C3A1E"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        ))}
      </g>
    </svg>
  );
}

function Cookie({ className }: IconProps) {
  const id = "cookie";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <IconDefs id={id} />
      <g filter={`url(#soft-${id})`}>
        <circle cx="100" cy="104" r="60" fill={`url(#crust-${id})`} />
        <ellipse cx="80" cy="82" rx="26" ry="16" fill={`url(#shine-${id})`} opacity="0.7" />
      </g>
      {[
        [72, 90], [110, 76], [128, 108], [92, 120], [70, 128], [116, 132], [100, 96],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 2 === 0 ? 8 : 6} fill="#3B2015" opacity={0.85} />
      ))}
    </svg>
  );
}

function CinnamonRoll({ className }: IconProps) {
  const id = "cinnamonroll";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <IconDefs id={id} />
      <g filter={`url(#soft-${id})`}>
        <circle cx="100" cy="104" r="58" fill={`url(#crust-${id})`} />
        <path
          d="M100 104 m0 -42 a42 42 0 1 1 -29.7 71.7"
          fill="none"
          stroke="#5C3A1E"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M100 104 m0 -26 a26 26 0 1 1 -18.4 44.4"
          fill="none"
          stroke="#5C3A1E"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.55"
        />
        <circle cx="100" cy="104" r="9" fill="#5C3A1E" opacity="0.5" />
      </g>
      {/* glaze drizzle */}
      <path
        d="M52 88 C70 96 62 108 80 112 C98 116 92 128 112 128 C132 128 126 96 148 100"
        fill="none"
        stroke="#FBF6EC"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

function Cupcake({ className }: IconProps) {
  const id = "cupcake";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <IconDefs id={id} />
      <g filter={`url(#soft-${id})`}>
        <path
          d="M62 108 L138 108 L128 156 C126 164 118 168 100 168 C82 168 74 164 72 156 Z"
          fill={`url(#crust-${id})`}
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={68 + i * 12.5} y1="112" x2={62 + i * 13.5} y2="160" stroke="#5C3A1E" strokeWidth="2" opacity="0.35" />
        ))}
        <path
          d="M52 110 C52 78 66 46 100 46 C134 46 148 78 148 110 C148 118 136 122 100 122 C64 122 52 118 52 110 Z"
          fill={`url(#crumb-${id})`}
        />
        <ellipse cx="80" cy="80" rx="24" ry="14" fill={`url(#shine-${id})`} opacity="0.7" />
        <circle cx="100" cy="40" r="8" fill={`url(#jam-${id})`} />
      </g>
    </svg>
  );
}

function Tart({ className }: IconProps) {
  const id = "tart";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <IconDefs id={id} />
      <g filter={`url(#soft-${id})`}>
        <circle cx="100" cy="108" r="62" fill={`url(#crust-${id})`} />
        <circle cx="100" cy="104" r="50" fill={`url(#crumb-${id})`} />
      </g>
      {[
        [82, 92, "#9A3B49"], [116, 88, "#C89A4B"], [100, 116, "#7C2635"], [70, 116, "#E3B36A"], [128, 112, "#9A3B49"],
      ].map(([cx, cy, fill], i) => (
        <circle key={i} cx={Number(cx)} cy={Number(cy)} r={11} fill={String(fill)} />
      ))}
      <ellipse cx="90" cy="94" rx="10" ry="6" fill="#FFF6E3" opacity="0.5" />
    </svg>
  );
}

const ICONS: Record<IconKey, (props: IconProps) => React.JSX.Element> = {
  pretzel: Pretzel,
  croissant: Croissant,
  berliner: Berliner,
  loaf: Loaf,
  baguette: Baguette,
  cookie: Cookie,
  cinnamonroll: CinnamonRoll,
  cupcake: Cupcake,
  tart: Tart,
};

export function BakeryIcon({ icon, className }: { icon: IconKey; className?: string }) {
  const Cmp = ICONS[icon] ?? Pretzel;
  return <Cmp className={className} />;
}
