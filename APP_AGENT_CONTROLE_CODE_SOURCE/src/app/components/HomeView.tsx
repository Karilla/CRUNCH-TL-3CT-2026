import { Dashboard } from './Dashboard';

interface HomeViewProps {
  onAlertsClick: () => void;
  onLogout?: () => void;
  acknowledgedAlertIds: Set<string>;
  onAcknowledgeAlert: (alertId: string, message?: string) => void;
}

export function HomeView({ onAlertsClick, onLogout, acknowledgedAlertIds, onAcknowledgeAlert }: HomeViewProps) {
  return (
    <div className="h-full overflow-y-auto pb-16 bg-gray-50">
      <Dashboard 
        onAlertsClick={onAlertsClick} 
        onLogout={onLogout}
        acknowledgedAlertIds={acknowledgedAlertIds}
        onAcknowledgeAlert={onAcknowledgeAlert}
      />
    </div>
  );
}