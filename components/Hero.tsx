import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white pb-16 pt-24 sm:pb-24 lg:pb-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Instantly Recolour Products with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">AI Precision</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Visualize your inventory in infinite variations without a photoshoot. 
            Select a product, pick a color, and let our Gemini-powered engine handle the rest.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#products" className="rounded-full bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:scale-105">
              Try the Demo
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-slate-900 flex items-center gap-1 group">
              Learn more <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative background blob */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 -z-10 w-[800px] h-[800px] opacity-30 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-3xl"></div>
    </div>
  );
};