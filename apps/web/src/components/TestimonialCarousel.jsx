import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from './TestimonialCard';

const TestimonialCarousel = () => {
  const testimonials = [
    {
      quote: "Trabajar con Juan fue un proceso claro y muy ordenado. Logro convertir ideas sueltas en una web profesional, rapida y alineada con nuestra marca.",
      author: "Carla Medina",
      title: "Directora",
      company: "Estudio Croma"
    },
    {
      quote: "No solo resolvio la parte tecnica: tambien mejoro la estructura del contenido y la experiencia general del sitio. Se nota el criterio de UI.",
      author: "Matias Roldan",
      title: "Founder",
      company: "Roldan Consulting"
    },
    {
      quote: "La comunicacion fue excelente y cada entrega tuvo sentido de negocio. El resultado final nos dio una presencia mucho mas solida online.",
      author: "Lucia Ferreyra",
      title: "Marketing Lead",
      company: "Stutt Ingenieria"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Lo que dicen <span className="text-slate-400">mis clientes</span></h2>
        </div>

        <div className="relative h-[300px] md:h-[250px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-2xl"
            >
              <TestimonialCard {...testimonials[currentIndex]} />
            </motion.div>
          </AnimatePresence>

          <button
            className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors z-10"
            onClick={() => paginate(-1)}
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors z-10"
            onClick={() => paginate(1)}
            aria-label="Siguiente testimonio"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-slate-400' : 'bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Ir al testimonio ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
