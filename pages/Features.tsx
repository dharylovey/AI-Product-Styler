import React from 'react';

export const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Capabilities</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Everything you need to style products
        </p>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          Our platform leverages the power of Google Gemini and n8n automation to deliver real-time, high-quality product restyling.
        </p>
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {[
            {
              name: 'Real-time Color Variations',
              description: 'Generate infinite color variations for your product catalog without scheduling new photoshoots. Visualize inventory instantly.',
              icon: (
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.04 2.825C10.126 17.81 12.065 18 14.158 18c2.093 0 4.032-.19 5.628-.682m-10.256.402C9.29 18.25 8.75 19 8.1 19c-.65 0-1.19-.75-1.43-1.72m-1.43-1.72c.24.97.78 1.72 1.43 1.72m0 0h.01M12 12a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
            },
            {
              name: 'Powered by Gemini 2.5',
              description: 'Utilizing the state-of-the-art multimodal capabilities of Gemini 2.5 Flash Image to understand lighting, texture, and context.',
              icon: (
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              ),
            },
            {
              name: 'n8n Automation Integration',
              description: 'Built on a flexible n8n architecture. Connect your styling workflow to databases, CRMs, or CMS systems effortlessly.',
              icon: (
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              ),
            },
          ].map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
                  {feature.icon}
                </div>
                {feature.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};