import React from 'react';
import { FadeIn } from '../components/animations/FadeIn';

export const N8nWorkflow: React.FC = () => {
  const exampleJson = `{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "ai-style",
        "responseMode": "responseNode",
        "options": {}
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [460, 460]
    },
    {
      "parameters": {
        "modelId": {
          "__rl": true,
          "value": "={{ $json.body.model }}",
          "mode": "id"
        },
        "prompt": "Change the color of the {{ $json.body.productName }} to {{ $json.body.color }}. Maintain lighting.",
        "binaryDataKey": "data"
      },
      "name": "Google Gemini",
      "type": "n8n-nodes-base.googleGemini",
      "typeVersion": 1,
      "position": [680, 460]
    },
    {
      "parameters": {
        "options": {}
      },
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [900, 460]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Google Gemini",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}`;

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <FadeIn direction="up">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Integration</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Setting up your n8n Workflow
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Follow these steps to configure your n8n backend to handle image processing requests from this application.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 max-w-5xl mx-auto space-y-12">
            
            <FadeIn direction="up" delay={0.2}>
              <div className="grid md:grid-cols-2 gap-8">
                  <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Step 1: Create the Webhook Node</h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Add a <strong>Webhook</strong> node to your canvas.</li>
                          <li>Set the HTTP Method to <strong>POST</strong>.</li>
                          <li>Set the Path to something unique, e.g., <code>ai-style</code>.</li>
                          <li><strong>Note:</strong> Since we are adding a Response node, you can keep "Response Mode" as "On Received" or "Last Node".</li>
                          <li>The webhook will receive JSON: <code>{`{ "image": "...", "color": "...", "productName": "..." }`}</code>.</li>
                      </ul>
                  </div>
                  <div className="bg-slate-100 rounded-xl p-6 flex items-center justify-center border border-slate-200">
                      <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-lg text-white mb-2">
                              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          </div>
                          <p className="font-mono text-sm text-slate-600">Webhook Node</p>
                      </div>
                  </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="order-2 md:order-1 bg-slate-100 rounded-xl p-6 flex items-center justify-center border border-slate-200">
                       <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-lg text-white mb-2">
                             <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                          </div>
                          <p className="font-mono text-sm text-slate-600">Gemini Node</p>
                      </div>
                  </div>
                  <div className="order-1 md:order-2">
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Step 2: Configure Gemini Node</h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Add a <strong>Google Gemini</strong> node.</li>
                          <li>Authenticate with your Google Cloud credentials.</li>
                          <li>In the <strong>Model ID</strong> field, select "Expression" and enter: <code>{`{{ $json.body.model }}`}</code>.</li>
                          <li>In the prompt field, map the expression: <br/><code className="text-xs bg-slate-100 p-1 rounded">Change the color of {'{{ $json.body.productName }}'} to {'{{ $json.body.color }}'}...</code></li>
                          <li>Pass the base64 image from the webhook to the model.</li>
                      </ul>
                  </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="grid md:grid-cols-2 gap-8">
                  <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">Step 3: Connect Response Node</h3>
                      <ul className="list-disc pl-5 space-y-2 text-slate-600">
                          <li>Add a <strong>Respond to Webhook</strong> node.</li>
                          <li>Connect the output of the Gemini node to this node.</li>
                          <li>Ensure default settings (Respond with: JSON).</li>
                          <li>This node ensures the generated image is sent back to the frontend immediately.</li>
                      </ul>
                  </div>
                  <div className="bg-slate-100 rounded-xl p-6 flex items-center justify-center border border-slate-200">
                       <div className="text-center">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-700 rounded-lg text-white mb-2">
                             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                          </div>
                          <p className="font-mono text-sm text-slate-600">Respond to Webhook</p>
                      </div>
                  </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="bg-slate-900 rounded-xl p-6 overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                      <h4 className="text-white font-mono text-sm">workflow.json</h4>
                      <button className="text-xs text-indigo-400 hover:text-indigo-300" onClick={() => navigator.clipboard.writeText(exampleJson)}>Copy JSON</button>
                  </div>
                  <pre className="text-xs text-slate-300 font-mono overflow-x-auto p-2">
                      {exampleJson}
                  </pre>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.5}>
              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 text-center">
                  <p className="text-indigo-900 text-sm">
                      <strong>Note:</strong> Once your workflow is active (Production URL), copy the Webhook URL and paste it into the 
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white ml-1 border border-indigo-200 align-middle"><svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
                      <strong>Settings</strong> menu in the header.
                  </p>
              </div>
            </FadeIn>
        </div>
      </div>
    </div>
  );
};