import type { ArtKind } from "@/lib/products";

type Props = {
  kind: ArtKind;
  className?: string;
};

/**
 * Hand-drawn product illustrations.
 * Deliberately flat and single-ink so every card reads as one catalogue.
 */
export default function ProductArt({ kind, className }: Props) {
  return (
    <svg
      viewBox="0 0 200 240"
      role="presentation"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* grounding shadow — shared by every piece */}
      <ellipse cx="100" cy="203" rx="58" ry="9" fill="currentColor" opacity="0.1" />
      {art[kind]}
    </svg>
  );
}

const art: Record<ArtKind, React.ReactNode> = {
  box: (
    <>
      <rect x="48" y="90" width="104" height="100" rx="4" fill="currentColor" opacity="0.92" />
      <rect x="40" y="66" width="120" height="28" rx="3" fill="currentColor" />
      <rect x="93" y="66" width="14" height="124" fill="#fcfaf5" opacity="0.55" />
      <ellipse cx="86" cy="62" rx="16" ry="11" transform="rotate(-18 86 62)" fill="currentColor" />
      <ellipse cx="114" cy="62" rx="16" ry="11" transform="rotate(18 114 62)" fill="currentColor" />
      <circle cx="100" cy="58" r="6" fill="#fcfaf5" opacity="0.55" />
    </>
  ),
  candle: (
    <>
      <rect x="62" y="98" width="76" height="92" rx="9" fill="currentColor" opacity="0.92" />
      <rect x="62" y="98" width="76" height="10" rx="5" fill="#fcfaf5" opacity="0.35" />
      <rect x="88" y="112" width="24" height="46" rx="3" fill="#fcfaf5" opacity="0.22" />
      <rect x="98" y="82" width="4" height="18" rx="2" fill="currentColor" />
      <path
        d="M100 56c9 9 13 15 13 22a13 13 0 0 1-26 0c0-7 4-13 13-22Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path d="M100 68c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" fill="#fcfaf5" opacity="0.8" />
    </>
  ),
  diffuser: (
    <>
      <rect x="72" y="112" width="56" height="78" rx="10" fill="currentColor" opacity="0.92" />
      <rect x="72" y="150" width="56" height="40" rx="10" fill="currentColor" />
      <rect x="88" y="94" width="24" height="20" rx="3" fill="currentColor" opacity="0.7" />
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.85">
        <path d="M100 94 78 44" />
        <path d="M100 94 90 38" />
        <path d="M100 94 110 38" />
        <path d="M100 94 122 44" />
        <path d="M100 94 100 34" />
      </g>
      <rect x="86" y="126" width="28" height="30" rx="2" fill="#fcfaf5" opacity="0.3" />
    </>
  ),
  throw: (
    <>
      <g fill="currentColor" opacity="0.92">
        <rect x="52" y="150" width="96" height="20" rx="7" transform="rotate(-2 100 160)" />
        <rect x="42" y="126" width="116" height="20" rx="7" transform="rotate(1.5 100 136)" />
        <rect x="54" y="100" width="92" height="20" rx="7" transform="rotate(-1 100 110)" />
      </g>
      <rect x="44" y="128" width="112" height="6" rx="3" fill="#fcfaf5" opacity="0.28" />
      <rect x="56" y="152" width="88" height="6" rx="3" fill="#fcfaf5" opacity="0.22" />
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.8">
        <path d="M58 170v12M70 171v12M82 172v12M94 172v12M106 172v12M118 171v12M130 170v12M142 169v12" />
      </g>
    </>
  ),
  kettle: (
    <>
      <path
        d="M62 148c0-26 16-40 38-42 22 2 38 16 38 42 0 22-16 32-38 32s-38-10-38-32Z"
        fill="currentColor"
        opacity="0.92"
      />
      <path d="M138 130c14 2 22 10 24 24" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
      <path d="M62 132c-12 4-16 12-16 22" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <rect x="86" y="98" width="28" height="10" rx="4" fill="currentColor" opacity="0.75" />
      <circle cx="100" cy="94" r="6" fill="currentColor" />
      <path d="M78 150h44" stroke="#fcfaf5" strokeWidth="4" strokeLinecap="round" opacity="0.28" />
    </>
  ),
  cup: (
    <>
      <path d="M58 122c0 26 18 42 42 42s42-16 42-42Z" fill="currentColor" opacity="0.92" />
      <ellipse cx="100" cy="122" rx="42" ry="10" fill="currentColor" />
      <ellipse cx="100" cy="122" rx="34" ry="7" fill="#fcfaf5" opacity="0.3" />
      <ellipse cx="100" cy="176" rx="52" ry="9" fill="currentColor" opacity="0.5" />
      <g stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.55">
        <path d="M88 104c-8-10 4-16-2-26" />
        <path d="M112 104c-8-10 4-16-2-26" />
      </g>
    </>
  ),
  lamp: (
    <>
      <circle cx="122" cy="98" r="30" fill="currentColor" opacity="0.92" />
      <circle cx="122" cy="98" r="19" fill="#fcfaf5" opacity="0.55" />
      <path d="M122 128 92 156" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <circle cx="92" cy="156" r="7" fill="currentColor" />
      <ellipse cx="88" cy="182" rx="36" ry="9" fill="currentColor" />
      <rect x="80" y="164" width="16" height="14" rx="4" fill="currentColor" opacity="0.85" />
    </>
  ),
  journal: (
    <>
      <rect x="64" y="74" width="78" height="112" rx="4" fill="currentColor" opacity="0.92" />
      <rect x="64" y="74" width="12" height="112" rx="4" fill="currentColor" />
      <rect x="76" y="74" width="4" height="112" fill="#fcfaf5" opacity="0.35" />
      <rect x="64" y="74" width="78" height="16" rx="4" fill="#fcfaf5" opacity="0.16" />
      <path d="M118 74v52l-9-8-9 8V74Z" fill="#fcfaf5" opacity="0.65" />
      <g stroke="#fcfaf5" strokeWidth="2.5" strokeLinecap="round" opacity="0.35">
        <path d="M88 118h34M88 130h26M88 142h30" />
      </g>
    </>
  ),
};
