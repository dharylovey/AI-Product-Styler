import React, { useState, useEffect } from 'react';
import { getWebhookUrl } from '../services/geminiService';

interface N8nConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
}

export const N8nConfigModal: React.FC<N8nConfigModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [webhookInput, setWebhookInput] = useState('');
  const isEnvConfigured = !!import.meta.env.VITE_N8N_WEBHOOK_URL;

  useEffect(() => {
    if (isOpen) {
      const currentUrl = getWebhookUrl();
      if (currentUrl) {
        setWebhookInput(currentUrl);
      }
    }
  }, [isOpen, isEnvConfigured]);

  const handleSave = () => {
    onSave(webhookInput.trim());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900">Configure n8n</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
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
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={handleSave}
            className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 shadow-sm"
          >
            {isEnvConfigured ? 'Close' : 'Save Configuration'}
          </button>
        </div>
      </div>
    </div>
  );
};
