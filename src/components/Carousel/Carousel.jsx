import { Children, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Carousel.css";

function getCardsPerView(width) {
  if (width <= 600) return 1;
  if (width <= 900) return 2;
  return 3;
}

export default function Carousel({ children }) {
  const slides = Children.toArray(children);

  const [cardsPerView, setCardsPerView] = useState(() =>
    getCardsPerView(window.innerWidth)
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    function handleResize() {
      const nextCardsPerView = getCardsPerView(window.innerWidth);

      setCardsPerView(prevCardsPerView => {
        if (prevCardsPerView === nextCardsPerView) return prevCardsPerView;

        setCurrentIndex(prevIndex => {
          const nextMaxIndex = Math.max(0, slides.length - nextCardsPerView);
          return Math.min(prevIndex, nextMaxIndex);
        });

        return nextCardsPerView;
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slides.length]);

  const maxIndex = useMemo(() => {
    return Math.max(0, slides.length - cardsPerView);
  }, [slides.length, cardsPerView]);

  useEffect(() => {
    setCurrentIndex(prev => Math.min(prev, maxIndex));
  }, [maxIndex]);

  function handlePrev() {
    setCurrentIndex(prev => Math.max(prev - cardsPerView, 0));
  }

  function handleNext() {
    setCurrentIndex(prev => Math.min(prev + cardsPerView, maxIndex));
  }

  return (
    <div className="carousel">
      <button
        className="carousel-arrow"
        type="button"
        onClick={handlePrev}
        disabled={currentIndex === 0}
        aria-label="Previous projects"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
          }}
        >
          {slides.map((slide, index) => (
            <div
              className="carousel-slide"
              key={index}
              style={{ flexBasis: `${100 / cardsPerView}%` }}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-arrow"
        type="button"
        onClick={handleNext}
        disabled={currentIndex >= maxIndex}
        aria-label="Next projects"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}