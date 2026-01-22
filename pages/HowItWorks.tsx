import React from 'react';
import { Link } from '@tanstack/react-router';
import { FadeIn } from '../components/animations/FadeIn';
import { WorkflowStep } from '../components/WorkflowStep';

export const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <FadeIn direction="up">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Workflow</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              From Selection to Style in Seconds
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Understand the journey of your data from the frontend interface to the AI processing engine and back.
            </p>
          </FadeIn>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-100 -translate-x-1/2 hidden md:block"></div>
                
                <div className="space-y-16">
                    <WorkflowStep
                      stepNumber={1}
                      title="User Selection"
                      description="The user visits the landing page, browses the featured products, and selects a specific color variant they wish to visualize."
                      delay={0.2}
                      codeSnippet={
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs font-mono text-slate-500">
                          Selection: "Modern Lounge Chair"<br/>
                          Color: "Ruby Red"<br/>
                          Model: "Gemini 2.0 Flash"<br/>
                          Image: [Base64 Data]
                        </div>
                      }
                    />

                    <WorkflowStep
                      stepNumber={2}
                      title="n8n Webhook Trigger"
                      description="The application captures the image and metadata, converting them into a JSON payload sent securely to your configured n8n Webhook URL."
                      delay={0.3}
                      codeSnippet={
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs font-mono text-slate-500">
                          POST https://n8n.webhook/path<br/>
                          Payload: &#123; image, color, product, model &#125;
                        </div>
                      }
                    />

                    <WorkflowStep
                      stepNumber={3}
                      title="Gemini Processing"
                      description="n8n passes the data to the Google Gemini node. The AI analyzes the image structure and applies the requested color while preserving shadows and textures."
                      delay={0.4}
                      codeSnippet={
                         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs font-mono text-slate-500">
                            Prompt: "Change the color of the Modern Lounge Chair to Ruby Red..."
                         </div>
                      }
                    />

                    <WorkflowStep
                      stepNumber={4}
                      title="Visual Update"
                      description="The generated image is returned to the browser. The React application receives the response and seamlessly swaps the original image with the AI-styled version."
                      delay={0.5}
                      codeSnippet={
                         <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs font-mono text-slate-500">
                            Response: &#123; "image": "data:image/png..." &#125;
                         </div>
                      }
                    />
                </div>
            </div>
            
            <FadeIn direction="up" delay={0.6}>
              <div className="mt-16 text-center">
                   <Link to="/" className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Try it yourself
                   </Link>
              </div>
            </FadeIn>
        </div>
      </div>
    </div>
  );
};