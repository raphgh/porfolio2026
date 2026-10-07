/**
 * Temporary sketchbook objects. Each one is plain geometry: the shared
 * `#sketch` filter (see DoodleStage) adds the hand-drawn wobble, and the
 * offset accent fill imitates a misregistered marker. Replace any of these
 * with a real illustration by swapping the component in `doodles.ts`.
 */

type ArtProps = { className?: string };

const Stroke = ({ children }: { children: React.ReactNode }) => (
  <g
    fill="none"
    stroke="var(--color-ink)"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    filter="url(#sketch)"
  >
    {children}
  </g>
);

const Fill = ({ children }: { children: React.ReactNode }) => (
  <g fill="var(--color-accent)" opacity={0.9} transform="translate(3 3)">
    {children}
  </g>
);

const Svg = ({ children, className }: ArtProps & { children: React.ReactNode }) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden focusable="false">
    {children}
  </svg>
);

export function Computer({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <Fill>
        <rect x="70" y="58" width="10" height="7" />
      </Fill>
      <Stroke>
        <path d="M22 26 L98 25 L99 76 L21 77 Z" />
        <path d="M28 32 L92 31.5 L92.5 70 L27.5 70.5 Z" strokeWidth={1.4} />
        <path d="M10 86 L110 85 L103 95 L17 95.5 Z" />
        <path d="M50 90 L70 90" strokeWidth={1.6} />
        <path d="M35 41 L44 46 L35 51" />
        <path d="M49 52 L62 52" />
        <path d="M35 60 L64 60" strokeWidth={1.6} />
      </Stroke>
    </Svg>
  );
}

export function Guitar({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <Fill>
        <path d="M60 44 C71 44 76 51 75 59 C74 65 70 67 73 70 C83 74 85 84 83 92 C80 103 70 108 60 108 C50 108 40 103 37 92 C35 84 37 74 47 70 C50 67 46 65 45 59 C44 51 49 44 60 44 Z" />
      </Fill>
      <Stroke>
        <path d="M60 44 C71 44 76 51 75 59 C74 65 70 67 73 70 C83 74 85 84 83 92 C80 103 70 108 60 108 C50 108 40 103 37 92 C35 84 37 74 47 70 C50 67 46 65 45 59 C44 51 49 44 60 44 Z" />
        <circle cx="60" cy="78" r="7.5" fill="var(--color-paper)" />
        <path d="M56 45 L56.5 15 M64 45 L63.5 15" />
        <path d="M53 15 L67 15 L68 4 L52 4 Z" />
        <path d="M51 7 L48 7 M51 12 L48 12 M69 7 L72 7 M69 12 L72 12" strokeWidth={1.8} />
        <path d="M60 15 L60 97" strokeWidth={1} />
        <path d="M52 97 L68 97" strokeWidth={3} />
        <path d="M56 24 L64 24 M56 32 L64 32" strokeWidth={1} />
      </Stroke>
    </Svg>
  );
}

export function Camera({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <Fill>
        <circle cx="60" cy="66" r="17" />
      </Fill>
      <Stroke>
        <path d="M16 40 L44 39 L49 30 L71 30 L76 39 L104 40 L103 94 L17 95 Z" />
        <circle cx="60" cy="66" r="18" />
        <circle cx="60" cy="66" r="10" />
        <path d="M55 61 C57 59 60 59 62 60" strokeWidth={1.6} />
        <path d="M86 47 L96 47 L96 53 L86 53 Z" />
        <path d="M24 34 L34 34" />
      </Stroke>
    </Svg>
  );
}

export function Pencil({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <g transform="rotate(-35 60 60)">
        <Fill>
          <path d="M26 52 L90 52 L90 68 L26 68 Z" />
        </Fill>
        <Stroke>
          <path d="M26 52 L90 52 L90 68 L26 68 Z" />
          <path d="M90 52 L111 60 L90 68" />
          <path d="M104 57.5 L111 60 L104 62.5" fill="var(--color-ink)" />
          <path d="M26 60 L90 60" strokeWidth={1.2} />
          <path d="M20 52 L26 52 L26 68 L20 68" />
          <path d="M23 52 L23 68" strokeWidth={1.2} />
          <path d="M20 52 C12 52 10 56 10 60 C10 64 12 68 20 68" />
        </Stroke>
      </g>
    </Svg>
  );
}

export function Terminal({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <Fill>
        <rect x="56" y="70" width="10" height="13" />
      </Fill>
      <Stroke>
        <path d="M12 22 L108 21 L108 98 L12 99 Z" />
        <path d="M12 36 L108 35.5" />
        <circle cx="21" cy="28.5" r="2" />
        <circle cx="29" cy="28.5" r="2" />
        <circle cx="37" cy="28.5" r="2" />
        <path d="M22 48 L30 53 L22 58" />
        <path d="M36 58 L70 58" strokeWidth={1.8} />
        <path d="M22 70 L48 70" strokeWidth={1.8} />
        <path d="M22 82 L48 82" strokeWidth={1.8} />
      </Stroke>
    </Svg>
  );
}

export function Coffee({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <Fill>
        <path d="M30 62 L82 62 L79 100 C79 104 75 106 71 106 L41 106 C37 106 33 104 33 100 Z" />
      </Fill>
      <Stroke>
        <path d="M28 48 L84 48 L80 101 C80 105 76 107 72 107 L40 107 C36 107 32 105 32 101 Z" />
        <path d="M83 60 C97 59 100 68 98 76 C96 84 88 86 81 85" />
        <path d="M44 38 C40 32 48 28 44 20 M57 38 C53 30 61 26 57 16 M70 38 C66 32 74 28 70 20" strokeWidth={1.8} />
      </Stroke>
    </Svg>
  );
}

export function Headphones({ className }: ArtProps) {
  return (
    <Svg className={className}>
      <Fill>
        <path d="M18 70 L34 69 L35 100 L19 101 Z" />
        <path d="M86 69 L102 70 L101 101 L85 100 Z" />
      </Fill>
      <Stroke>
        <path d="M24 72 C22 40 38 20 60 20 C82 20 98 40 96 72" />
        <path d="M30 70 C30 46 42 30 60 30 C78 30 90 46 90 70" strokeWidth={1.4} />
        <path d="M18 70 L34 69 L35 100 L19 101 Z" />
        <path d="M86 69 L102 70 L101 101 L85 100 Z" />
        <path d="M34 76 L38 76 L38 94 L35 94 M86 76 L82 76 L82 94 L85 94" strokeWidth={1.6} />
      </Stroke>
    </Svg>
  );
}
