import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import slide1 from '../assets/carousel/slide1.jpg'
import slide2 from '../assets/carousel/slide2.jpg'
import slide3 from '../assets/carousel/slide3.jpg'

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

const extendedSlides = [
  slides[slides.length - 1], // clone of slide 3
  ...slides,
  slides[0], // clone of slide 1
]

function Carousel() {
  // Start at 1 because index 0 is the cloned slide 3
  const [currentSlide, setCurrentSlide] = useState(1)
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  const nextSlide = () => {
    setTransitionEnabled(true)
    setCurrentSlide((current) => current + 1)
  }

  const previousSlide = () => {
    setTransitionEnabled(true)
    setCurrentSlide((current) => current - 1)
  }

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Secret reset when reaching a cloned slide
  const handleTransitionEnd = () => {
    // Reached cloned slide 1 on the right
    if (currentSlide === slides.length + 1) {
      setTransitionEnabled(false)
      setCurrentSlide(1)
    }

    // Reached cloned slide 3 on the left
    if (currentSlide === 0) {
      setTransitionEnabled(false)
      setCurrentSlide(slides.length)
    }
  }

  // Convert extended index to actual slide index
  const activeSlide =
    currentSlide === 0
      ? slides.length - 1
      : currentSlide === slides.length + 1
        ? 0
        : currentSlide - 1

  return (
    <div className="w-full max-w-6xl">

      {/* Carousel */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg">

        {/* Slides */}
        <div
          onTransitionEnd={handleTransitionEnd}
          className={`flex ${
            transitionEnabled
              ? 'transition-transform duration-700 ease-in-out'
              : ''
          }`}
          style={{
            transform: `translateX(-${
              currentSlide * (100 / extendedSlides.length)
            }%)`,
            width: `${extendedSlides.length * 100}%`,
          }}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              className="
                relative
                aspect-[4/3]
                shrink-0
                sm:aspect-video
                lg:aspect-[16/7]
              "
              style={{
                width: `${100 / extendedSlides.length}%`,
              }}
            >
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.alt}
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
                className="h-full w-full select-none object-cover"
              />

              {/* Dark Gradient Overlay */}
              <div
                className="
                  absolute inset-0
                  bg-linear-to-t
                  from-black/75
                  via-black/10
                  to-transparent
                "
              />

              {/* Text */}
              <div
                className="
                  absolute bottom-0 left-0
                  max-w-2xl
                  p-6 text-white
                  sm:p-8
                  lg:p-10
                "
              >
                {/* Label */}
                <p
                  className="
                    mb-2
                    text-xs font-bold
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
                    text-2xl font-bold
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
                    text-sm text-gray-200
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

        {/* Previous Button */}
        <button
          type="button"
          onClick={previousSlide}
          className="
            absolute left-4 top-1/2
            flex h-11 w-11 -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-black/40 text-white
            transition
            hover:bg-black/60
          "
          aria-label="Previous slide"
        >
          <ChevronLeft size={26} />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          className="
            absolute right-4 top-1/2
            flex h-11 w-11 -translate-y-1/2
            items-center justify-center
            rounded-full
            bg-black/40 text-white
            transition
            hover:bg-black/60
          "
          aria-label="Next slide"
        >
          <ChevronRight size={26} />
        </button>

      </div>

      {/* Indicators */}
      <div className="mt-5 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setTransitionEnabled(true)
              setCurrentSlide(index + 1)
            }}
            className={`
              h-2.5 rounded-full
              transition-all duration-300
              ${
                activeSlide === index
                  ? 'w-8 bg-purple-600'
                  : 'w-2.5 bg-gray-300 hover:bg-gray-400'
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  )
}

export default Carousel