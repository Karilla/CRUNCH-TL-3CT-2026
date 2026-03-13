import { Users } from 'lucide-react';
import { teams, agents, controlZones, CURRENT_USER_ID, type Agent } from '../data/mockData';

interface TeamSidebarProps {
  onAgentClick: (agent: Agent) => void;
}

export function TeamSidebar({ onAgentClick }: TeamSidebarProps) {
  // Get current user
  const currentUser = agents.find((a) => a.id === CURRENT_USER_ID);
  if (!currentUser) return null;

  // Get current user's team
  const currentTeam = teams.find((t) => t.id === currentUser.teamId);
  if (!currentTeam) return null;

  // Get all team members
  const teamMembers = agents.filter((a) => a.teamId === currentTeam.id);

  // Get team zones
  const teamZones = controlZones.filter((z) => z.teamId === currentTeam.id);

  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 z-10" style={{ backgroundColor: `${currentTeam.color}10` }}>
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="size-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: currentTeam.color }}
          >
            <Users className="size-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-lg">{currentTeam.name}</h2>
            <p className="text-xs text-gray-600">{teamMembers.length} membres</p>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
          Membres de l'équipe
        </h3>
        <div className="space-y-2">
          {teamMembers.map((member) => {
            const isCurrentUser = member.id === CURRENT_USER_ID;
            const statusColor =
              member.status === 'active'
                ? 'bg-green-500'
                : member.status === 'transit'
                ? 'bg-blue-500'
                : 'bg-gray-400';

            return (
              <button
                key={member.id}
                onClick={() => onAgentClick(member)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 group"
              >
                {/* Avatar with status indicator */}
                <div className="relative flex-shrink-0">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="size-12 rounded-full object-cover"
                    style={{
                      border: isCurrentUser ? `3px solid ${currentTeam.color}` : '2px solid #e5e7eb',
                    }}
                  />
                  <div
                    className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white ${statusColor}`}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 text-sm">
                      {member.name}
                    </p>
                    {isCurrentUser && (
                      <span
                        className="text-xs px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: currentTeam.color }}
                      >
                        Vous
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">{member.currentZone}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {member.status === 'active'
                      ? '🔴 En contrôle'
                      : member.status === 'transit'
                      ? '🔵 En déplacement'
                      : '⚪ En pause'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Team Zones */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
          Zones de contrôle
        </h3>
        <div className="space-y-2">
          {teamZones.map((zone) => (
            <div
              key={zone.id}
              className="p-3 rounded-lg border"
              style={{
                borderColor: currentTeam.color,
                backgroundColor: `${currentTeam.color}10`,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: currentTeam.color }}
                  />
                  <p className="font-medium text-sm text-gray-900">{zone.name}</p>
                </div>
                <span className="text-xs text-gray-600">{zone.coverageRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${zone.coverageRate}%`,
                    backgroundColor: currentTeam.color,
                  }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Dernier contrôle: {zone.lastControlled}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}