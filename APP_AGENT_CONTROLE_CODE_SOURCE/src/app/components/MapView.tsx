import { Map } from './Map';
import { MobileHeader } from './MobileHeader';
import { type Agent } from '../data/mockData';
import { DailyPlanning } from './DailyPlanning';
import { Calendar, X } from 'lucide-react';
import { useState } from 'react';

interface MapViewProps {
  onAgentClick: (agent: Agent) => void;
  onTeamClick: (teamId: string) => void;
  onLogout?: () => void;
}

export function MapView({ onAgentClick, onTeamClick, onLogout }: MapViewProps) {
  const [showPlanning, setShowPlanning] = useState(false);

  return (
    <div className="h-full flex flex-col pb-16 md:pb-0 bg-gray-50">
      <div className="md:hidden">
        <MobileHeader 
          title="Carte interactive" 
          subtitle="Position des équipes"
          onLogout={onLogout}
        />
      </div>
      <div className="relative flex-1">
        <Map 
          onAgentClick={onAgentClick}
          onTeamClick={onTeamClick}
        />

        {/* Planning Button - Left side to avoid SOS button */}
        <button
          onClick={() => setShowPlanning(true)}
          className="fixed bottom-24 left-6 z-[1500] size-14 rounded-full bg-blue-600 shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 md:bottom-6 md:left-6"
          title="Mon planning"
        >
          <Calendar className="size-6 text-white" />
        </button>

        {/* Planning Modal */}
        {showPlanning && (
          <div className="fixed inset-0 bg-black/50 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="relative">
              {/* Close button */}
              <button
                onClick={() => setShowPlanning(false)}
                className="absolute -top-3 -right-3 z-10 size-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors md:top-2 md:right-2"
              >
                <X className="size-5 text-gray-700" />
              </button>
              
              <DailyPlanning compact={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}