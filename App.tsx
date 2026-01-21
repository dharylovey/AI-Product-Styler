import React, { useState } from 'react';
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
import { N8nConfigModal } from './components/N8nConfigModal';
import { setWebhookUrl } from './services/geminiService';
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
    const isEnvConfigured = !!import.meta.env.VITE_N8N_WEBHOOK_URL;

    const handleSaveConfig = (url: string) => {
      if (url && !isEnvConfigured) {
          setWebhookUrl(url);
      }
      setShowConfigModal(false);
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

          <N8nConfigModal 
            isOpen={showConfigModal}
            onClose={() => setShowConfigModal(false)}
            onSave={handleSaveConfig}
          />
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