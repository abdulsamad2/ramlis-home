"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image: "https://m.media-amazon.com/images/I/41espsnE9AL.jpg",
    title: "Premium Cookware",
    description: "Professional CAROTE non-stick cookware sets for your culinary adventures.",
    cta: "Shop Cookware",
    link: "/products?category=cookware",
  },
  {
    id: 2,
    image: "https://m.media-amazon.com/images/I/51HIwG13ufL.jpg",
    title: "Baking Essentials", 
    description: "Premium bakeware and tools for perfect results every time.",
    cta: "Shop Bakeware",
    link: "/products?category=bakeware",
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/31mFCg47fJL.jpg",
    title: "Smart Appliances",
    description: "Compact kitchen appliances that make cooking faster and easier.",
    cta: "Shop Appliances",
    link: "/products?category=small-appliances",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () => setCurrent((curr) => (curr + 1) % slides.length);

  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-slate-900 group">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === current ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover opacity-60"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
          
          <div className="absolute inset-x-0 bottom-0 flex h-full items-center justify-center text-center">
            <div className="container-width px-4">
              <div 
                className={cn(
                  "max-w-3xl mx-auto space-y-6 transform transition-all duration-1000 delay-300",
                  index === current ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                )}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-slate-200 font-light">
                  {slide.description}
                </p>
                <div className="pt-4">
                  <Link
                    href={slide.link}
                    className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-white transition-colors border border-white/30 rounded-full hover:bg-white hover:text-slate-900 glass focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === current ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
