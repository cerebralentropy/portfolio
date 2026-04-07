import { Children, useEffect, useState, cloneElement, isValidElement } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import './Carousel.css'

function getCardsPerView(width) {
    if (width <= 880) return 1;
    if (width <= 1230) return 2;
    return 3;
}

export default function Carousel({ children }) {
    const slides = Children.toArray(children);
    const slideCount = slides.length;

    const [cardsPerView, setCardsPerView] = useState(() => {
        if (typeof window === 'undefined') return 3;
        return getCardsPerView(window.innerWidth);
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        function handleResize() {
            const nextCardsPerView = getCardsPerView(window.innerWidth);

            setCardsPerView(prevCardsPerView => {
                if (prevCardsPerView === nextCardsPerView) return prevCardsPerView;

                setCurrentIndex(prevIndex => {
                    const nextMaxIndex = Math.max(0, slideCount - nextCardsPerView);
                    return Math.min(prevIndex, nextMaxIndex);
                });

                return nextCardsPerView;
            });
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [slideCount]);

    const maxIndex = Math.max(0, slideCount - cardsPerView);

    function handlePrev() {
        setCurrentIndex(prev => Math.max(prev - cardsPerView, 0));
    }

    function handleNext() {
        setCurrentIndex(prev => Math.min(prev + cardsPerView, maxIndex));
    }

    const isMobile = cardsPerView === 1;

    return (
        <div className="carousel">
            {!isMobile && (
                <button
                    className="carousel-arrow"
                    type="button"
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    aria-label="Previous projects"
                >
                    <ChevronLeft size={20} />
                </button>
            )}

                <div className="carousel-viewport">
                    {isMobile ? (
                        <div className="carousel-stack">
                            {slides.map((slide, index) => (
                                <div className="carousel-stack-item" key={index}>
                                    {isValidElement(slide)
                                        ? cloneElement(slide, { small: true })
                                        : slide}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="carousel-track"
                            style={{
                                transform: `translateX(-${currentIndex * 21.5}rem)`
                            }}
                        >
                            {slides.map((slide, index) => (
                                <div
                                    className="carousel-slide"
                                    key={index}
                                    style={{ flexBasis: "21.5rem" }}
                                >
                                    {slide}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            {!isMobile && (
                <button
                    className="carousel-arrow"
                    type="button"
                    onClick={handleNext}
                    disabled={currentIndex >= maxIndex}
                    aria-label="Next projects"
                >
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
}
