import React, { useContext, useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { UploadProductForm } from '../components/UploadProductForm';
import { ProductUploadModal } from '../components/ProductUploadModal';
import { PRODUCTS } from '../constants';
import { AppContext, Product } from '../types';
import { FadeIn } from '../components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer';

export const Home: React.FC = () => {
  const context = useContext(AppContext);
  const openConfigModal = context ? context.openConfigModal : () => console.warn("AppContext missing");
  
  const [customProduct, setCustomProduct] = useState<Product | null>(null);

  const handleProductReady = (data: { name: string; imageBase64: string }) => {
    const newProduct: Product = {
      id: `custom-${Date.now()}`,
      name: data.name,
      description: "Custom uploaded product ready for styling.",
      imageUrl: data.imageBase64,
      defaultColor: "Original",
      availableColors: [
        { name: "Midnight Black", hex: "#0F172A" },
        { name: "Ruby Red", hex: "#DC2626" },
        { name: "Sapphire Blue", hex: "#2563EB" },
        { name: "Emerald Green", hex: "#059669" },
        { name: "Goldenrod", hex: "#D97706" },
        { name: "White", hex: "#FFFFFF" }
      ]
    };
    setCustomProduct(newProduct);
  };

  return (
    <>
      <Hero />
      
      <section id="products" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" delay={0.2} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Collection</h2>
            <p className="mt-4 text-slate-600 max-w-2xl">
              Choose a product below and select a color. The request is sent to 
              <span className="font-semibold text-indigo-600"> n8n</span> where 
              <span className="font-semibold text-indigo-600"> Gemini</span> generates your style.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {PRODUCTS.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard 
                product={product} 
                onApiKeyMissing={openConfigModal}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Upload Section */}
      <section id="upload" className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <FadeIn direction="up" className="mx-auto max-w-2xl text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Bring Your Own Product</h2>
              <p className="mt-4 text-lg text-slate-600">
                Want to see this AI in action with your inventory? Upload a photo below.
              </p>
           </FadeIn>

           <UploadProductForm onProductReady={handleProductReady} />
           
           <ProductUploadModal 
              isOpen={!!customProduct}
              onClose={() => setCustomProduct(null)}
              product={customProduct}
              onApiKeyMissing={openConfigModal}
           />
        </div>
      </section>
    </>
  );
};