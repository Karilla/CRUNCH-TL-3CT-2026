import { AlertTriangle, X } from 'lucide-react';
import { type Alert } from '../data/mockData';
import { useEffect } from 'react';

interface AlertPopupProps {
  alert: Alert;
  onClose: () => void;
  totalAlerts: number;
  onAcknowledge?: () => void;
}

export function AlertPopup({ alert, onClose, totalAlerts, onAcknowledge }: AlertPopupProps) {
  const currentIndex = totalAlerts > 0 ? totalAlerts : 1;
  const isLastAlert = totalAlerts === 1;

  const handleAcknowledge = () => {
    if (onAcknowledge) {
      onAcknowledge();
    }
    
    // If this is the last alert, close the popup
    if (isLastAlert) {
      onClose();
    }
    // Otherwise, the popup stays open and shows the next alert automatically
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in slide-in-from-top duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-5 rounded-t-2xl">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl animate-pulse">
                <AlertTriangle className="size-7 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-white text-xl font-bold mb-1">Alerte prioritaire</h2>
                <p className="text-white/90 text-sm">
                  {totalAlerts > 1 ? `${totalAlerts} alertes restantes` : 'Dernière alerte'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="size-5 text-white" />
            </button>
          </div>
          
          {/* Progress indicator when multiple alerts */}
          {totalAlerts > 1 && (
            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(totalAlerts, 5) }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full flex-1 ${
                    i === 0 ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{alert.title}</h3>
          <p className="text-base text-gray-700 leading-relaxed mb-4">{alert.message}</p>
          
          {alert.location && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">Localisation :</span> {alert.location}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{alert.time}</span>
            <span className="px-2.5 py-1 bg-red-100 text-red-700 font-semibold rounded-full">
              {alert.priority === 'high' ? 'PRIORITÉ HAUTE' : alert.priority.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
          <button
            onClick={handleAcknowledge}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: 'var(--tl-red)', color: 'white' }}
          >
            {isLastAlert ? 'J\'ai compris' : `J'ai compris (${totalAlerts - 1} restante${totalAlerts - 1 > 1 ? 's' : ''})`}
          </button>
        </div>
      </div>
    </div>
  );
}