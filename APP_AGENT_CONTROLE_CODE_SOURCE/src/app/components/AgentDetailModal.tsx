import { X, Calendar, Cake } from 'lucide-react';
import { type Agent, CURRENT_USER_ID, teams } from '../data/mockData';

interface AgentDetailModalProps {
  agent: Agent;
  onClose: () => void;
}

// Calculate years of service
function calculateYearsOfService(hireDate?: string): string {
  if (!hireDate) return 'Non renseigné';
  
  const hire = new Date(hireDate);
  const today = new Date();
  const years = today.getFullYear() - hire.getFullYear();
  const months = today.getMonth() - hire.getMonth();
  
  if (years === 0) {
    return `${Math.max(1, months)} mois`;
  } else if (months < 0) {
    return `${years - 1} an${years - 1 > 1 ? 's' : ''}`;
  } else {
    return `${years} an${years > 1 ? 's' : ''}`;
  }
}

export function AgentDetailModal({ agent, onClose }: AgentDetailModalProps) {
  const isCurrentUser = agent.id === CURRENT_USER_ID;
  const team = teams.find(t => t.id === agent.teamId);
  const yearsOfService = calculateYearsOfService(agent.hireDate);

  const statusColor =
    agent.status === 'active'
      ? 'bg-green-100 text-green-800'
      : agent.status === 'transit'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800';

  const statusText =
    agent.status === 'active'
      ? 'En contrôle'
      : agent.status === 'transit'
      ? 'En déplacement'
      : 'En pause';

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
          <h2 className="font-semibold text-lg">
            {isCurrentUser ? 'Mon profil' : 'Profil collaborateur'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Agent Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={agent.photo}
                alt={agent.name}
                className="size-20 rounded-full object-cover border-4"
                style={{ borderColor: team?.color || '#e5e7eb' }}
              />
              {isCurrentUser && (
                <div 
                  className="absolute bottom-0 right-0 size-6 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: '#3B82F6' }}
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{agent.name}</h3>
              {team && (
                <p className="text-sm font-medium mb-1" style={{ color: team.color }}>{team.name}</p>
              )}
              <span className={`inline-block px-2 py-1 rounded text-xs ${statusColor}`}>
                {statusText}
              </span>
            </div>
          </div>

          {isCurrentUser && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <p className="text-blue-900 font-medium">
                👤 Ceci est votre profil
              </p>
            </div>
          )}

          {/* Birthday */}
          {agent.birthday && (
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm mb-1">
                <Cake className="size-4 text-pink-600" />
                <span className="font-medium text-pink-900">Date d'anniversaire</span>
              </div>
              <p className="text-sm text-gray-700 pl-6">{agent.birthday}</p>
            </div>
          )}

          {/* Ancienneté */}
          {agent.hireDate && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm mb-1">
                <Calendar className="size-4" style={{ color: team?.color || 'var(--tl-red)' }} />
                <span className="font-medium">Ancienneté aux TL</span>
              </div>
              <p className="text-sm text-gray-700 pl-6 font-semibold">{yearsOfService}</p>
              <p className="text-xs text-gray-600 pl-6">Depuis le {new Date(agent.hireDate).toLocaleDateString('fr-FR')}</p>
            </div>
          )}

          {/* Week Planning */}
          {agent.weekPlanning && agent.weekPlanning.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-2 text-sm mb-3">
                <Calendar className="size-4" style={{ color: team?.color || 'var(--tl-red)' }} />
                <span className="font-medium">Planning 7 prochains jours</span>
              </div>
              <div className="space-y-2">
                {agent.weekPlanning.map((day, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-3 border ${
                      day.shifts && day.shifts.length > 0
                        ? 'bg-white border-gray-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900">
                        {day.day}
                      </span>
                      <span className="text-xs text-gray-600">{day.date}</span>
                    </div>
                    {day.shifts && day.shifts.length > 0 ? (
                      <div className="space-y-1.5">
                        {day.shifts.map((shift, shiftIndex) => (
                          <div
                            key={shiftIndex}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-gray-700">
                              {shift.startTime} - {shift.endTime}
                            </span>
                            <span
                              className="px-2 py-0.5 rounded text-white font-medium"
                              style={{ backgroundColor: team?.color || 'var(--tl-red)' }}
                            >
                              {shift.zone}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 italic">Repos</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
