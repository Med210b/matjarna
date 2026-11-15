import {
  ArrowUpRight,
  Layers,
  ScanLine,
  Sparkles,
} from 'lucide-react';

import InteractiveSurface from './animations/InteractiveSurface';

export default function StudioComposition() {
  return (
    <InteractiveSurface className="studio-surface mx-auto w-full max-w-md">
      <div
        className="studio-composition"
        role="img"
        aria-label="Layered composition connecting brand, content, and technology at Matjrnaa"
      >
        <div className="studio-grid" aria-hidden="true" />

        <div className="studio-ring" aria-hidden="true" />

        <div
          className="studio-ring studio-ring-inner"
          aria-hidden="true"
        />

        <div className="studio-core" aria-hidden="true">
          <span className="font-display">m.</span>
        </div>

        <div className="studio-label studio-label-brand">
          <Layers size={18} />

          <div>
            <small>01 / IDENTITY</small>
            <strong>Brand</strong>
          </div>

          <ArrowUpRight size={16} />
        </div>

        <div className="studio-label studio-label-content">
          <Sparkles size={18} />

          <div>
            <small>02 / EXPRESSION</small>
            <strong>Content</strong>
          </div>

          <ArrowUpRight size={16} />
        </div>

        <div className="studio-label studio-label-tech">
          <ScanLine size={18} />

          <div>
            <small>03 / EXPERIENCE</small>
            <strong>Technology</strong>
          </div>

          <ArrowUpRight size={16} />
        </div>

        <div className="studio-caption">
          <span>
            Independent thinking.
            <br />
            Connected experiences.
          </span>

          <span>
            DUBAI
            <br />
            UAE ↗
          </span>
        </div>
      </div>
    </InteractiveSurface>
  );
}