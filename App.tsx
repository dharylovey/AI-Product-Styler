import React, { useState, useEffect } from 'react';
import { 
  Outlet, 
  RouterProvider, 
  createRouter, 
  createRoute, 
  createRootRoute,
  createHashHistory,
  Link
} from '@tanstack/react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getWebhookUrl, setWebhookUrl } from './services/geminiService';
import { AppContext, AppContextType } from './types';
import { AI_MODELS } from './constants';

// Pages
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { HowItWorks } from './pages/HowItWorks';
import { N8nWorkflow } from './pages/N8nWorkflow';

// 1. Create Root Route (The Layout)
const rootRoute = createRootRoute({
  component: () => {
    const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [webhookInput, setWebhookInput] = useState('');

    const isEnvConfigured = !!import.meta.env.VITE_N8N_WEBHOOK_URL;

    useEffect(() => {
      const currentUrl = getWebhookUrl();
      if (currentUrl) {
          setWebhookInput(currentUrl);
      }
    }, [isEnvConfigured]);

    const handleSaveConfig = () => {
      if (webhookInput.trim() && !isEnvConfigured) {
          setWebhookUrl(webhookInput.trim());
          setShowConfigModal(false);
      } else if (isEnvConfigured) {
         setShowConfigModal(false);
      }
    };

    const contextValue: AppContextType = {
      openConfigModal: () => setShowConfigModal(true),
      selectedModel,
      setSelectedModel
    };

    return (
      <AppContext.Provider value={contextValue}>
        <div className="min-h-screen bg-slate-50 flex flex-col">
          <Header onOpenSettings={() => setShowConfigModal(true)} />
          
          <main className="flex-grow">
            <Outlet />
          </main>

          <Footer />

          {/* Configuration Modal */}
          {showConfigModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-900">Configure n8n</h3>
                        <button onClick={() => setShowConfigModal(false)} className="text-slate-400 hover:text-slate-600">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            n8n Webhook URL
                        </label>
                        <input 
                            type="url" 
                            placeholder="https://your-n8n-instance.com/webhook/..."
                            className={`w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm ${isEnvConfigured ? 'bg-slate-100 text-slate-500 cursor-not-allowed' : ''}`}
                            value={webhookInput}
                            onChange={(e) => setWebhookInput(e.target.value)}
                            disabled={isEnvConfigured}
                        />
                        {isEnvConfigured ? (
                             <p className="mt-2 text-xs text-green-600 font-semibold bg-green-50 p-2 rounded border border-green-200">
                                ✓ Configured via Environment Variable
                             </p>
                        ) : (
                            <p className="mt-2 text-xs text-slate-500">
                                The webhook should accept a POST request with JSON body: <code>{`{ image, color, productName }`}</code>
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3 justify-end">
                        {!isEnvConfigured && (
                            <button 
                                onClick={() => setShowConfigModal(false)}
                                className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                        )}
                        <button 
                            onClick={handleSaveConfig}
                            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 shadow-sm"
                        >
                            {isEnvConfigured ? 'Close' : 'Save Configuration'}
                        </button>
                    </div>
                </div>
            </div>
          )}
        </div>
      </AppContext.Provider>
    );
  },
  notFoundComponent: () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-slate-600 mb-8 max-w-md">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Link 
          to="/" 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Go Back Home
        </Link>
      </div>
    );
  }
});

// 2. Define Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/features',
  component: Features,
});

const howItWorksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/how-it-works',
  component: HowItWorks,
});

const n8nWorkflowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/n8n-workflow',
  component: N8nWorkflow,
});

// 3. Create Router
const routeTree = rootRoute.addChildren([
  indexRoute, 
  featuresRoute, 
  howItWorksRoute, 
  n8nWorkflowRoute
]);

// Use hash history to ensure compatibility with all hosting environments (like preview URLs)
const hashHistory = createHashHistory();

const router = createRouter({ 
  routeTree,
  history: hashHistory
} as any);

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;