import { useEffect, useState } from 'react'

import slide1 from '../assets/carousel/slide1.jpg'
import slide2 from '../assets/carousel/slide2.jpg'
import slide3 from '../assets/carousel/slide3.jpg'

/* =========================================================
   SLIDES
========================================================= */

const slides = [
  {
    image: slide1,
    alt: 'TCG collection',
    label: 'TCG',
    title: 'My TCG Journey',
    subtitle: 'Cards, collections and memorable moments along the way.',
  },
  {
    image: slide2,
    alt: 'Journal',
    label: 'JOURNAL',
    title: 'My Journal',
    subtitle: 'Sharing my latest TCG experiences, pickups and adventures.',
  },
  {
    image: slide3,
    alt: 'TCG matches',
    label: 'MATCHES',
    title: 'Game Day',
    subtitle: 'Match experiences, events and games I have played.',
  },
]

/*
  Carousel structure:

  Index 0 = REAL Slide 1
  Index 1 = REAL Slide 2
  Index 2 = REAL Slide 3
  Index 3 = CLONE Slide 1

  Animation:

  REAL 1
     ↓
  REAL 2
     ↓
  REAL 3
     ↓
  CLONE 1
     ↓
  secretly reset to REAL 1
*/

const extendedSlides = [
  ...slides,
  slides[0],
]

/* =========================================================
   CAROUSEL COMPONENT
========================================================= */

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  /* =======================================================
     AUTO SLIDE
  ======================================================= */

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTransitionEnabled(true)

      setCurrentSlide((current) => {
        /*
          Safety check.

          Normally this should never go above slides.length,
          but this prevents the carousel from moving into
          empty space if something unexpected happens.
        */

        if (current >= slides.length) {
          return 0
        }

        return current + 1
      })
    }, 5000)

    return () => clearTimeout(timeout)
  }, [currentSlide])

  /* =======================================================
     INFINITE LOOP RESET
  ======================================================= */

  const handleTransitionEnd = () => {
    /*
      When currentSlide reaches 3:

      REAL 3
        ↓
      CLONE 1

      Once the animation finishes,
      disable animation and secretly
      jump back to REAL 1.
    */

    if (currentSlide === slides.length) {
      setTransitionEnabled(false)
      setCurrentSlide(0)
    }
  }

  /* =======================================================
     ACTIVE INDICATOR
  ======================================================= */

  const activeSlide =
    currentSlide === slides.length
      ? 0
      : currentSlide

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="w-full max-w-6xl">

      {/* =================================================
          CAROUSEL
      ================================================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          bg-gray-100
          shadow-lg
        "
      >

        {/* ===============================================
            SLIDE TRACK
        =============================================== */}

        <div
          onTransitionEnd={handleTransitionEnd}
          className={`
            flex
            ${
              transitionEnabled
                ? 'transition-transform duration-700 ease-in-out'
                : ''
            }
          `}
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >

          {/* =============================================
              SLIDES
          ============================================= */}

          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              className="
                relative
                w-full
                shrink-0
                aspect-[4/3]
                sm:aspect-video
                lg:aspect-[16/7]
              "
            >

              {/* =========================================
                  IMAGE
              ========================================= */}

              <img
                src={slide.image}
                alt={slide.alt}
                draggable={false}
                onContextMenu={(event) => {
                  event.preventDefault()
                }}
                className="
                  h-full
                  w-full
                  select-none
                  object-cover
                "
              />

              {/* =========================================
                  DARK GRADIENT OVERLAY
              ========================================= */}

              <div
                className="
                  absolute
                  inset-0
                  bg-linear-to-t
                  from-black/75
                  via-black/10
                  to-transparent
                "
              />

              {/* =========================================
                  TEXT CONTENT
              ========================================= */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  max-w-2xl
                  p-6
                  text-white
                  sm:p-8
                  lg:p-10
                "
              >

                {/* Label */}

                <p
                  className="
                    mb-2
                    text-xs
                    font-bold
                    tracking-[0.25em]
                    text-purple-300
                    sm:text-sm
                  "
                >
                  {slide.label}
                </p>

                {/* Title */}

                <h2
                  className="
                    text-2xl
                    font-bold
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  {slide.title}
                </h2>

                {/* Subtitle */}

                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    text-gray-200
                    sm:text-base
                    lg:text-lg
                  "
                >
                  {slide.subtitle}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* =================================================
          INDICATORS
      ================================================= */}

      <div className="mt-5 flex justify-center gap-2">

        {slides.map((_, index) => (
          <span
            key={index}
            className={`
              h-2.5
              rounded-full
              transition-all
              duration-300
              ${
                activeSlide === index
                  ? 'w-8 bg-purple-600'
                  : 'w-2.5 bg-gray-300'
              }
            `}
          />
        ))}

      </div>

    </div>
  )
}

export default Carousel