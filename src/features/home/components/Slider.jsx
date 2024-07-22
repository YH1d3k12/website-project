import React, { useState, useEffect } from "react";

import arrow from "../../../assets/arrow.png";
import './slider.css';

export default function Slider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            id: "slide-1",
            src: "https://images.unsplash.com/photo-1517232115160-ff93364542dd?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: "slide-2",
            src: "https://images.unsplash.com/photo-1518895312237-a9e23508077d?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: "slide-3",
            src: "https://images.unsplash.com/photo-1618304925090-b68a8c744cbe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide]);

    return (
        <div className="slider">
            <button className="slider-button slider-button-left" onClick={prevSlide}>
                <img src={arrow} />
            </button>
            <button className="slider-button slider-button-right" onClick={nextSlide}>
                <img src={arrow} />
            </button>
            <div className="slider-container">
                {slides.map((slide, index) => (
                    <img
                        key={slide.id}
                        src={slide.src}
                        alt=""
                        className={index === currentSlide ? 'active' : ''}
                        style={{ opacity: index === currentSlide ? 1 : 0 }}
                    />
                ))}
            </div>
            <div className="slider-nav">
                {slides.map((slide, index) => (
                    <a
                        key={slide.id}
                        onClick={() => setCurrentSlide(index)}
                        className={index === currentSlide ? 'active' : ''}
                    />
                ))}
            </div>
            <button className="slider-play-button">Jogar</button>
        </div>
    );
};