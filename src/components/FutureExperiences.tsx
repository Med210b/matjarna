import {
  ArrowUpRight,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

import {
  FUTURE_EXPERIENCES,
} from '@/lib/content';

function ConceptVisual({
  index,
}: {
  index: number;
}) {
  if (index === 0) {
    return (
      <div
        className="journey-concept-visual journey-shop"
        aria-hidden="true"
      >
        <div className="journey-phone">
          <div className="journey-phone-top">
            <span>MATJRNAA</span>
            <span>↗</span>
          </div>

          <div className="journey-product">
            <span />
          </div>

          <div className="journey-phone-copy">
            <small>
              THE OBJECT COLLECTION
            </small>

            <strong>
              Every detail.
              <br />
              A new perspective.
            </strong>

            <span>
              Explore collection ↗
            </span>
          </div>
        </div>

        <span className="journey-floating-tag">
          A different way to discover.
        </span>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div
        className="journey-concept-visual journey-world"
        aria-hidden="true"
      >
        <div className="journey-world-orbit" />

        <div className="journey-world-orbit journey-world-orbit-two" />

        <div className="journey-world-core">
          <span>m.</span>
        </div>

        <span className="journey-world-label">
          STEP INSIDE THE BRAND
        </span>
      </div>
    );
  }

  return (
    <div
      className="journey-concept-visual journey-community"
      aria-hidden="true"
    >
      <div className="journey-message">
        <MessageCircle size={18} />
        <span>A conversation begins.</span>
      </div>

      <div className="journey-message journey-message-reply">
        <Sparkles size={18} />
        <span>An idea takes shape.</span>
      </div>

      <div className="journey-message">
        <span className="journey-avatar">
          m.
        </span>

        <span>A connection grows.</span>
      </div>

      <span className="journey-community-label">
        PEOPLE AT THE CENTER.
      </span>
    </div>
  );
}

export default function FutureExperiences() {
  return (
    <section
      id="future"
      className="journey-showcase"
      aria-labelledby="journey-showcase-title"
    >
      <div className="journey-showcase-stage">
        <header
          className="journey-showcase-heading"
          data-journey-heading
        >
          <div>
            <span className="journey-kicker">
              03 / EXPLORATIONS
            </span>

            <h2 id="journey-showcase-title">
              The next chapter.
              <br />
              <span>
                Already taking shape.
              </span>
            </h2>
          </div>

          <p>
            Three directions we are exploring.
            Conceptual experiences, not yet
            available as commercial services.
          </p>
        </header>

        <div
          className="journey-viewport"
          data-journey-viewport
        >
          <div
            className="journey-track"
            data-journey-track
          >
            {FUTURE_EXPERIENCES.map(
              (experience, index) => (
                <article
                  key={experience.title}
                  className="journey-panel"
                  data-journey-panel
                  aria-labelledby={
                    `journey-concept-${index}`
                  }
                >
                  <div className="journey-panel-inner">
                    <div className="journey-panel-copy">
                      <span className="journey-panel-number">
                        0{index + 1} / 03
                      </span>

                      <h3
                        id={
                          `journey-concept-${index}`
                        }
                      >
                        {experience.title}
                      </h3>

                      <p>
                        {experience.description}
                      </p>

                      <span className="journey-concept-tag">
                        {experience.tag}
                        {' · '}
                        In development

                        <ArrowUpRight
                          size={15}
                        />
                      </span>
                    </div>

                    <ConceptVisual
                      index={index}
                    />
                  </div>
                </article>
              )
            )}
          </div>
        </div>

        <div className="journey-showcase-controls">
          <span>
            <span
              data-journey-index
              role="status"
              aria-label="Current concept"
            >
              01
            </span>

            <span className="journey-total">
              {' / 03'}
            </span>
          </span>

          <div
            className="journey-progress-track"
            aria-hidden="true"
          >
            <span data-journey-progress />
          </div>

          <div
            className="journey-concept-buttons"
            role="group"
            aria-label="Choose a concept"
          >
            {FUTURE_EXPERIENCES.map(
              (experience, index) => (
                <button
                  key={experience.title}
                  data-journey-go={index}
                  aria-label={
                    `Show concept ${index + 1}: ${experience.title}`
                  }
                  aria-pressed={index === 0}
                >
                  0{index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}