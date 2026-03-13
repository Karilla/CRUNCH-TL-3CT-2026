import { useState } from 'react';
import { AlertTriangle, Info, MessageSquare, LogOut, X } from 'lucide-react';
import { alerts, CURRENT_USER_ID } from '../data/mockData';
import tlLogo from 'figma:asset/a07c7fbb0fe7e417ac0889a14df7e5ce24192732.png';

interface AlertsViewProps {
  onLogout?: () => void;
  acknowledgedAlertIds?: Set<string>;
  onAcknowledgeAlert?: (alertId: string, message?: string) => void;
}

export function AlertsView({ onLogout, acknowledgedAlertIds = new Set(), onAcknowledgeAlert }: AlertsViewProps) {
  const [selectedAlert, setSelectedAlert] = useState<typeof alerts[0] | null>(null);
  const [acknowledgmentMessage, setAcknowledgmentMessage] = useState('');

  // Categorize alerts - New structure
  const priorityAlerts = alerts.filter(a => a.priority === 'high' && a.type !== 'message'); // Alertes prioritaires (excluding manager messages)
  const operationalInfo = alerts.filter(a => a.priority === 'medium'); // Informations opérationnelles
  const managerMessages = alerts.filter(a => a.type === 'message' || a.priority === 'high' && a.type === 'message'); // Messages du gestionnaire (including high priority ones)

  const handleAlertClick = (alert: typeof alerts[0]) => {
    // Only priority alerts need acknowledgment
    if (alert.priority === 'high') {
      setSelectedAlert(alert);
    }
  };

  const handleAcknowledge = () => {
    if (selectedAlert && onAcknowledgeAlert) {
      onAcknowledgeAlert(selectedAlert.id, acknowledgmentMessage.trim() || undefined);
      setSelectedAlert(null);
      setAcknowledgmentMessage('');
    }
  };

  const isAcknowledged = (alertId: string) => acknowledgedAlertIds.has(alertId);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', badge: 'bg-red-100 text-red-700', icon: 'text-red-600' };
      case 'medium':
        return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-900', badge: 'bg-orange-100 text-orange-700', icon: 'text-orange-600' };
      default:
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', badge: 'bg-blue-100 text-blue-700', icon: 'text-blue-600' };
    }
  };

  const renderAlertCard = (alert: typeof alerts[0], showAcknowledgeButton: boolean = false) => {
    const colors = getPriorityColor(alert.priority);
    const acknowledged = isAcknowledged(alert.id);

    return (
      <div
        key={alert.id}
        className={`w-full rounded-lg p-4 transition-all ${
          acknowledged 
            ? 'bg-gray-100 border-2 border-gray-300' 
            : `${colors.bg} border-2 ${colors.border}`
        }`}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className={`size-5 ${acknowledged ? 'text-gray-400' : colors.icon} flex-shrink-0 mt-0.5`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className={`font-bold ${acknowledged ? 'text-gray-500' : colors.text}`}>{alert.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                acknowledged ? 'bg-gray-200 text-gray-600' : colors.badge
              }`}>
                {alert.priority === 'high' ? 'PRIORITAIRE' : alert.priority === 'medium' ? 'OPÉRATIONNELLE' : 'INFO'}
              </span>
            </div>
            <p className={`text-sm mb-2 ${acknowledged ? 'text-gray-500' : 'text-gray-700'}`}>{alert.message}</p>
            {alert.location && (
              <p className={`text-xs mb-1 ${acknowledged ? 'text-gray-400' : 'text-gray-600'}`}>📍 {alert.location}</p>
            )}
            <p className={`text-xs mb-3 ${acknowledged ? 'text-gray-400' : 'text-gray-500'}`}>{alert.time}</p>
            
            {acknowledged && (
              <div className="flex items-center gap-1.5 text-green-700 mb-2 bg-green-50 border border-green-200 rounded-lg py-2 px-3">
                <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold">✓ Alerte déjà quittancée</span>
              </div>
            )}

            {showAcknowledgeButton && !acknowledged && (
              <button
                onClick={() => handleAlertClick(alert)}
                className="w-full py-2 px-4 rounded-lg font-semibold text-sm transition-colors"
                style={{ backgroundColor: 'var(--tl-red)', color: 'white' }}
              >
                J'ai compris
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderInfoCard = (alert: typeof alerts[0]) => {
    const colors = getPriorityColor(alert.priority);

    return (
      <div
        key={alert.id}
        className={`w-full ${colors.bg} border-2 ${colors.border} rounded-lg p-4 transition-all`}
      >
        <div className="flex items-start gap-3">
          <Info className={`size-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold ${colors.text} mb-1`}>{alert.title}</h3>
            <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
            {alert.location && (
              <p className="text-xs text-gray-600 mb-1">📍 {alert.location}</p>
            )}
            <p className="text-xs text-gray-500">{alert.time}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderManagerMessage = (alert: typeof alerts[0]) => {
    const acknowledged = isAcknowledged(alert.id);

    return (
      <div
        key={alert.id}
        className={`w-full rounded-lg p-4 transition-all ${
          acknowledged 
            ? 'bg-gray-100 border-2 border-gray-300' 
            : 'bg-blue-50 border-2 border-blue-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <MessageSquare className={`size-5 ${acknowledged ? 'text-gray-400' : 'text-blue-600'} flex-shrink-0 mt-0.5`} />
          <div className="flex-1 min-w-0">
            <h3 className={`font-bold mb-1 ${acknowledged ? 'text-gray-500' : 'text-blue-900'}`}>{alert.title}</h3>
            <p className={`text-sm mb-2 ${acknowledged ? 'text-gray-500' : 'text-gray-700'}`}>{alert.message}</p>
            <p className={`text-xs mb-3 ${acknowledged ? 'text-gray-400' : 'text-gray-500'}`}>{alert.time}</p>
            
            {acknowledged && (
              <div className="flex items-center gap-1.5 text-green-700 mb-2 bg-green-50 border border-green-200 rounded-lg py-2 px-3">
                <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold">✓ Message quittancé</span>
              </div>
            )}

            {!acknowledged && (
              <button
                onClick={() => setSelectedAlert(alert)}
                className="w-full py-2 px-4 rounded-lg font-semibold text-sm transition-colors bg-blue-600 hover:bg-blue-700 text-white"
              >
                Quittancer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto pb-16 bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200" style={{ backgroundColor: 'var(--tl-red)' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white rounded-lg p-2 flex items-center justify-center">
            <img src={tlLogo} alt="tl logo" className="h-8 w-auto object-contain" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-lg mb-0">Alertes et urgences</h1>
            <p className="text-white/90 text-xs">Notifications système</p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="size-5 text-white" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* 1. Alertes prioritaires - with acknowledgment */}
        {priorityAlerts.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="size-5 text-red-600" />
              <h2 className="text-base font-bold text-gray-900">Alertes prioritaires</h2>
              <span className="ml-auto text-xs px-2 py-1 bg-red-100 text-red-700 font-semibold rounded-full">
                {priorityAlerts.length}
              </span>
            </div>
            <div className="space-y-3">
              {priorityAlerts.map(alert => renderAlertCard(alert, true))}
            </div>
          </div>
        )}

        {/* 2. Informations opérationnelles - no acknowledgment needed */}
        {operationalInfo.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Info className="size-5 text-orange-600" />
              <h2 className="text-base font-bold text-gray-900">Informations opérationnelles</h2>
              <span className="ml-auto text-xs px-2 py-1 bg-orange-100 text-orange-700 font-semibold rounded-full">
                {operationalInfo.length}
              </span>
            </div>
            <div className="space-y-3">
              {operationalInfo.map(alert => renderInfoCard(alert))}
            </div>
          </div>
        )}

        {/* 3. Messages du gestionnaire - no acknowledgment needed */}
        {managerMessages.length > 0 && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="size-5 text-blue-600" />
              <h2 className="text-base font-bold text-gray-900">Messages ou remarques du gestionnaire</h2>
              <span className="ml-auto text-xs px-2 py-1 bg-blue-100 text-blue-700 font-semibold rounded-full">
                {managerMessages.length}
              </span>
            </div>
            <div className="space-y-3">
              {managerMessages.map(alert => renderManagerMessage(alert))}
            </div>
          </div>
        )}
      </div>

      {/* Alert Detail Popup with Acknowledgment - Only for priority alerts */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-in slide-in-from-top duration-300">
            {/* Header */}
            <div 
              className="p-5 rounded-t-2xl"
              style={{ 
                backgroundColor: selectedAlert.type === 'message' ? '#9333ea' : '#dc2626' 
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-xl animate-pulse">
                    {selectedAlert.type === 'message' ? (
                      <MessageSquare className="size-7 text-white" strokeWidth={2.5} />
                    ) : (
                      <AlertTriangle className="size-7 text-white" strokeWidth={2.5} />
                    )}
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold mb-1">
                      {selectedAlert.type === 'message' ? 'Message du gestionnaire' : 'Alerte prioritaire'}
                    </h2>
                    <p className="text-white/90 text-sm">
                      {selectedAlert.type === 'message' ? 'Acquittement requis' : 'Action requise'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedAlert(null);
                    setAcknowledgmentMessage('');
                  }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  title="Fermer"
                >
                  <X className="size-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{selectedAlert.title}</h3>
              <p className="text-base text-gray-700 leading-relaxed mb-4">{selectedAlert.message}</p>
              
              {selectedAlert.location && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">Localisation :</span> {selectedAlert.location}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{selectedAlert.time}</span>
                <span 
                  className="px-2.5 py-1 font-semibold rounded-full"
                  style={{
                    backgroundColor: selectedAlert.type === 'message' ? '#f3e8ff' : '#fee2e2',
                    color: selectedAlert.type === 'message' ? '#7e22ce' : '#991b1b'
                  }}
                >
                  {selectedAlert.type === 'message' ? 'GESTIONNAIRE' : 'PRIORITÉ HAUTE'}
                </span>
              </div>

              {/* Optional Message Input - only for manager messages */}
              {selectedAlert.type === 'message' && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message optionnel
                  </label>
                  <textarea
                    value={acknowledgmentMessage}
                    onChange={(e) => setAcknowledgmentMessage(e.target.value)}
                    placeholder="Ajoutez une remarque ou confirmation (optionnel)..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl space-y-2">
              <button
                onClick={handleAcknowledge}
                className="w-full py-3 px-4 rounded-lg font-semibold transition-colors"
                style={{ 
                  backgroundColor: selectedAlert.type === 'message' ? '#9333ea' : 'var(--tl-red)', 
                  color: 'white' 
                }}
              >
                {selectedAlert.type === 'message' ? 'Quittancer' : 'J\'ai compris'}
              </button>
              <button
                onClick={() => {
                  setSelectedAlert(null);
                  setAcknowledgmentMessage('');
                }}
                className="w-full py-2 px-4 rounded-lg font-semibold transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}