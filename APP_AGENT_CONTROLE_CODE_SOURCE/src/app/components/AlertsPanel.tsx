import { AlertTriangle, Info, MessageSquare, X } from 'lucide-react';
import { alerts, type Alert } from '../data/mockData';

interface AlertsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlertsPanel({ isOpen, onClose }: AlertsPanelProps) {
  if (!isOpen) return null;

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'operational':
        return <AlertTriangle className="size-5" />;
      case 'incident':
        return <AlertTriangle className="size-5" />;
      case 'message':
        return <MessageSquare className="size-5" />;
      default:
        return <Info className="size-5" />;
    }
  };

  const getAlertColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'medium':
        return 'bg-orange-50 border-orange-200 text-orange-900';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getIconColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const highPriorityAlerts = alerts.filter((a) => a.priority === 'high');
  const otherAlerts = alerts.filter((a) => a.priority !== 'high');

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5" style={{ color: 'var(--tl-red)' }} />
            <h2 className="font-semibold text-lg">Alertes et urgences</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* High Priority Alerts */}
          {highPriorityAlerts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-500" />
                Priorité élevée
              </h3>
              <div className="space-y-2">
                {highPriorityAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-lg border-2 p-3 ${getAlertColor(alert.priority)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={getIconColor(alert.priority)}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                        <p className="text-sm mb-2">{alert.message}</p>
                        <div className="flex items-center gap-3 text-xs opacity-75">
                          {alert.location && <span>📍 {alert.location}</span>}
                          <span>🕐 {alert.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Alerts */}
          {otherAlerts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Autres alertes</h3>
              <div className="space-y-2">
                {otherAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-lg border p-3 ${getAlertColor(alert.priority)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={getIconColor(alert.priority)}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1">{alert.title}</h4>
                        <p className="text-sm mb-2">{alert.message}</p>
                        <div className="flex items-center gap-3 text-xs opacity-75">
                          {alert.location && <span>📍 {alert.location}</span>}
                          <span>🕐 {alert.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {alerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Info className="size-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Aucune alerte pour le moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
