import { useId } from 'react';

export default function HeroSceneFallback() {
  const id = useId().replace(/:/g, '');

  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 480 420"
        className="h-full w-full max-w-[520px]"
        fill="none"
      >
        <defs>
          <linearGradient
            id={`${id}-metal`}
            x1="90"
            y1="100"
            x2="380"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#30130f" />
            <stop offset="0.15" stopColor="#a91442" />
            <stop offset="0.35" stopColor="#ee8b78" />
            <stop offset="0.48" stopColor="#fff8f3" />
            <stop offset="0.57" stopColor="#85052d" />
            <stop offset="0.85" stopColor="#30130f" />
            <stop offset="1" stopColor="#df7084" />
          </linearGradient>

          <linearGradient
            id={`${id}-peach`}
            x1="80"
            y1="250"
            x2="380"
            y2="110"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#85052d" />
            <stop offset="0.4" stopColor="#ffc29d" />
            <stop offset="0.7" stopColor="#fff8f3" />
            <stop offset="1" stopColor="#df7084" />
          </linearGradient>

          <radialGradient id={`${id}-shadow`}>
            <stop stopColor="#85052d" stopOpacity="0.18" />
            <stop
              offset="1"
              stopColor="#85052d"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        <ellipse
          cx="242"
          cy="350"
          rx="155"
          ry="25"
          fill={`url(#${id}-shadow)`}
        />

        <g className="animate-float-slow">
          <path
            d="M75 115 C115 65 122 293 160 294 C195 295 200 128 239 126 C278 124 291 295 324 294 C360 293 366 68 408 116"
            stroke="#30130f"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.14"
            transform="translate(0 5)"
          />

          <path
            d="M75 115 C115 65 122 293 160 294 C195 295 200 128 239 126 C278 124 291 295 324 294 C360 293 366 68 408 116"
            stroke={`url(#${id}-metal)`}
            strokeWidth="19"
            strokeLinecap="round"
          />

          <path
            d="M88 133 C133 116 137 257 166 259 C198 262 206 106 242 105 C277 104 295 259 325 258 C356 257 370 112 394 132"
            stroke={`url(#${id}-peach)`}
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        <circle
          cx="365"
          cy="73"
          r="20"
          stroke="#85052d"
          strokeOpacity="0.5"
        />

        <path
          d="M99 284 L112 306"
          stroke="#a91442"
          strokeWidth="2"
        />

        <path
          d="M381 269 l5 7 -5 7 -5 -7z"
          fill="#85052d"
        />
      </svg>
    </div>
  );
}