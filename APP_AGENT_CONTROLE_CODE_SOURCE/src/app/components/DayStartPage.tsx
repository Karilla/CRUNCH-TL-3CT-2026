import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle, LogOut } from 'lucide-react';
import { agents, teams, controlZones, CURRENT_USER_ID } from '../data/mockData';
import tlLogo from 'figma:asset/a07c7fbb0fe7e417ac0889a14df7e5ce24192732.png';

interface DayStartPageProps {
  agentNumber: string;
  onStartDay: () => void;
}

export function DayStartPage({ agentNumber, onStartDay }: DayStartPageProps) {
  // Find the agent based on agent number (we'll use the current user for demo)
  const currentAgent = agents.find((a) => a.id === CURRENT_USER_ID);
  const currentTeam = currentAgent ? teams.find((t) => t.id === currentAgent.teamId) : null;
  const teamMembers = currentAgent ? agents.filter((a) => a.teamId === currentAgent.teamId) : [];
  const assignedZone = currentAgent ? controlZones.find((z) => z.teamId === currentAgent.teamId) : null;

  if (!currentAgent || !currentTeam) return null;

  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200" style={{ backgroundColor: 'var(--tl-red)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white rounded-lg p-2 flex items-center justify-center">
              <img src={tlLogo} alt="tl logo" className="h-8 w-auto object-contain" />
            </div>
            <div className="flex-1">
              <h1 className="text-white text-xl font-semibold">Bienvenue</h1>
              <p className="text-white/90 text-sm">Agent {agentNumber}</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-2 text-white">
              <Calendar className="size-4" />
              <span className="text-sm capitalize">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 pb-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Welcome Message */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={currentAgent.photo}
                  alt={currentAgent.name}
                  className="size-20 rounded-full object-cover border-4"
                  style={{ borderColor: currentTeam.color }}
                />
                <div 
                  className="absolute -bottom-1 -right-1 size-7 rounded-full flex items-center justify-center border-2 border-white"
                  style={{ backgroundColor: currentTeam.color }}
                >
                  <CheckCircle className="size-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Bonjour, {currentAgent.name.split(' ')[0]} !</h2>
                <p className="text-gray-600 mb-3">Prêt à démarrer votre journée de contrôle</p>
                <div 
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-medium"
                  style={{ backgroundColor: currentTeam.color }}
                >
                  <Users className="size-4" />
                  {currentTeam.name}
                </div>
              </div>
            </div>
          </div>

          {/* Schedule for Today */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="size-5" style={{ color: 'var(--tl-red)' }} />
              Planning du jour
            </h3>
            
            <div className="space-y-4">
              {/* Start Time */}
              <div className="flex items-center gap-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="size-6 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-700 font-medium">Heure de début de service</p>
                  <p className="text-xl font-bold text-blue-900">08:00</p>
                </div>
              </div>

              {/* Team */}
              <div 
                className="flex items-center gap-4 p-3 rounded-lg border-2"
                style={{ 
                  backgroundColor: `${currentTeam.color}15`, 
                  borderColor: `${currentTeam.color}50` 
                }}
              >
                <div 
                  className="size-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${currentTeam.color}30` }}
                >
                  <Users className="size-6" style={{ color: currentTeam.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: currentTeam.color }}>Équipe assignée</p>
                  <p className="text-xl font-bold" style={{ color: currentTeam.color }}>{currentTeam.name}</p>
                  <p className="text-xs opacity-80" style={{ color: currentTeam.color }}>{teamMembers.length} agents</p>
                </div>
              </div>

              {/* Zone */}
              <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="size-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="size-6 text-green-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-700 font-medium">Zone de contrôle prévue</p>
                  <p className="text-xl font-bold text-green-900">{assignedZone?.name || 'Centre-ville'}</p>
                  <p className="text-xs text-green-600">Priorité haute</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="size-5" style={{ color: 'var(--tl-red)' }} />
              Vos collègues d'équipe
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {teamMembers.map((member) => {
                const isMe = member.id === CURRENT_USER_ID;
                return (
                  <div 
                    key={member.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      isMe 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className={`size-16 rounded-full object-cover border-2 ${
                            isMe ? 'border-blue-500' : 'border-gray-300'
                          }`}
                        />
                        {isMe && (
                          <div className="absolute -bottom-1 -right-1 size-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <span className="text-[8px] text-white font-bold">ME</span>
                          </div>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">
                          {member.name.split(' ')[0]}
                        </p>
                        <p className="text-xs text-gray-500">Agent {member.id.replace('agent', '')}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Start Day Button */}
          <button
            onClick={onStartDay}
            className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all shadow-lg hover:shadow-xl active:scale-98 flex items-center justify-center gap-3"
            style={{ backgroundColor: 'var(--tl-red)' }}
          >
            <span>Démarrer la journée</span>
            <ArrowRight className="size-6" />
          </button>

          <p className="text-center text-sm text-gray-500">
            Bonne journée de contrôle ! 🚇
          </p>
        </div>
      </div>
    </div>
  );
}