import React, { useContext } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../constants';
import { AppContext } from '../types';

export const Home: React.FC = () => {
  const context = useContext(AppContext);
  const openConfigModal = context ? context.openConfigModal : () => console.warn("AppContext missing");

  return (
    <>
      <Hero />
      <section id="products" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Collection</h2>
            <p className="mt-4 text-slate-600 max-w-2xl">
              Choose a product below and select a color. The request is sent to 
              <span className="font-semibold text-indigo-600"> n8n</span> where 
              <span className="font-semibold text-indigo-600"> Gemini</span> generates your style.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onApiKeyMissing={openConfigModal}
            />
          ))}
        </div>
      </section>
    </>
  );
};