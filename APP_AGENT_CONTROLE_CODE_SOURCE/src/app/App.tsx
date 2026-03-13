import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { DayStartPage } from './components/DayStartPage';
import { HomeView } from './components/HomeView';
import { MapView } from './components/MapView';
import { ChatView } from './components/ChatView';
import { AlertsView } from './components/AlertsView';
import { Dashboard } from './components/Dashboard';
import { TeamSidebar } from './components/TeamSidebar';
import { AgentDetailModal } from './components/AgentDetailModal';
import { TeamCompositionModal } from './components/TeamCompositionModal';
import { AlertsPanel } from './components/AlertsPanel';
import { Chat } from './components/Chat';
import { SOSButton } from './components/SOSButton';
import { BottomNavigation } from './components/BottomNavigation';
import { type Agent, agents, chatMessages, alerts } from './data/mockData';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDayStarted, setIsDayStarted] = useState(false);
  const [agentNumber, setAgentNumber] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'map' | 'chat' | 'alerts'>('home');
  const [acknowledgedAlertIds, setAcknowledgedAlertIds] = useState<Set<string>>(new Set());

  const handleLogin = (agentNum: string, password: string) => {
    setAgentNumber(agentNum);
    setIsAuthenticated(true);
  };

  const handleStartDay = () => {
    setIsDayStarted(true);
  };

  const handleLogout = () => {
    // Reset all states to initial values
    setIsAuthenticated(false);
    setIsDayStarted(false);
    setAgentNumber('');
    setSelectedAgent(null);
    setSelectedTeamId(null);
    setShowAlerts(false);
    setActiveView('home');
    setAcknowledgedAlertIds(new Set());
  };

  const handleAcknowledgeAlert = (alertId: string, message?: string) => {
    setAcknowledgedAlertIds(prev => new Set(prev).add(alertId));
    // You can also log or store the optional message here if needed
    if (message) {
      console.log(`Alert ${alertId} acknowledged with message: ${message}`);
    }
  };

  const handleAgentClick = (agentOrId: Agent | string) => {
    if (typeof agentOrId === 'string') {
      const agent = agents.find((a) => a.id === agentOrId);
      if (agent) {
        setSelectedAgent(agent);
      }
    } else {
      setSelectedAgent(agentOrId);
    }
  };

  const unreadCount = chatMessages.filter((m) => m.type === 'alert').length;
  const alertCount = alerts.filter(a => a.priority === 'high').length;

  // Show Login Page
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Show Day Start Page
  if (!isDayStarted) {
    return <DayStartPage agentNumber={agentNumber} onStartDay={handleStartDay} />;
  }

  // Main Application
  return (
    <div className="size-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Left Sidebar - Team */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <TeamSidebar onAgentClick={handleAgentClick} />
        </div>

        {/* Main Map */}
        <div className="flex-1">
          <MapView 
            onAgentClick={handleAgentClick}
            onTeamClick={setSelectedTeamId}
          />
        </div>

        {/* Right Sidebar - Dashboard */}
        <Dashboard onAlertsClick={() => setShowAlerts(true)} />

        {/* Floating Chat (Desktop only) */}
        <Chat />

        {/* SOS Button (Desktop) */}
        <SOSButton />
      </div>

      {/* Mobile Layout with Navigation */}
      <div className="md:hidden flex-1 overflow-hidden">
        {activeView === 'home' && (
          <HomeView 
            onAlertsClick={() => setShowAlerts(true)} 
            onLogout={handleLogout}
            acknowledgedAlertIds={acknowledgedAlertIds}
            onAcknowledgeAlert={handleAcknowledgeAlert}
          />
        )}
        
        {activeView === 'map' && (
          <>
            <MapView 
              onAgentClick={handleAgentClick}
              onTeamClick={setSelectedTeamId}
              onLogout={handleLogout}
            />
            {/* SOS Button (Mobile - visible only on Map view) */}
            <SOSButton />
          </>
        )}
        
        {activeView === 'alerts' && (
          <AlertsView 
            onLogout={handleLogout}
            acknowledgedAlertIds={acknowledgedAlertIds}
            onAcknowledgeAlert={handleAcknowledgeAlert}
          />
        )}
        
        {activeView === 'chat' && (
          <ChatView onAgentClick={handleAgentClick} onLogout={handleLogout} />
        )}
      </div>

      {/* Modals */}
      {selectedAgent && (
        <AgentDetailModal 
          agent={selectedAgent} 
          onClose={() => setSelectedAgent(null)} 
        />
      )}

      {selectedTeamId && (
        <TeamCompositionModal
          teamId={selectedTeamId}
          onClose={() => setSelectedTeamId(null)}
          onAgentClick={(agent) => {
            setSelectedAgent(agent);
            setSelectedTeamId(null);
          }}
        />
      )}

      <AlertsPanel 
        isOpen={showAlerts} 
        onClose={() => setShowAlerts(false)} 
      />

      {/* Bottom Navigation (Mobile/Tablet only) */}
      <div className="md:hidden">
        <BottomNavigation
          activeView={activeView}
          onViewChange={setActiveView}
          unreadCount={unreadCount}
          alertCount={alertCount}
        />
      </div>
    </div>
  );
}