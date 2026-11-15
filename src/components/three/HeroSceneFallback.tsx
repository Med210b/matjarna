import { useId } from 'react';

export default function HeroSceneFallback() {
  const id = useId().replace(/:/g, '');

  return (
    <div
      className="flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 480 420"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient
            id={`${id}-ceramic`}
            x1="170"
            y1="100"
            x2="310"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#d28b96" />

            <stop
              offset="0.3"
              stopColor="#ac5369"
            />

            <stop
              offset="0.65"
              stopColor="#92394f"
            />

            <stop
              offset="1"
              stopColor="#532335"
            />
          </linearGradient>

          <radialGradient id={`${id}-shadow`}>
            <stop
              stopColor="#85052d"
              stopOpacity="0.1"
            />

            <stop
              offset="1"
              stopColor="#85052d"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        <ellipse
          cx="240"
          cy="315"
          rx="84"
          ry="14"
          fill={`url(#${id}-shadow)`}
        />

        <g transform="rotate(-24 240 200)">
          <ellipse
            cx="240"
            cy="200"
            rx="56"
            ry="78"
            stroke="#532335"
            strokeOpacity="0.14"
            strokeWidth="29"
            transform="translate(3 4)"
          />

          <ellipse
            cx="240"
            cy="200"
            rx="56"
            ry="78"
            stroke={`url(#${id}-ceramic)`}
            strokeWidth="27"
          />

          <path
            d="M207 141 C186 160 183 186 185 205"
            stroke="#fff8f3"
            strokeOpacity="0.27"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}