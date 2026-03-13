import { X, Users } from 'lucide-react';
import { teams, agents, type Agent } from '../data/mockData';

interface TeamCompositionModalProps {
  teamId: string;
  onClose: () => void;
  onAgentClick: (agent: Agent) => void;
}

export function TeamCompositionModal({ teamId, onClose, onAgentClick }: TeamCompositionModalProps) {
  const team = teams.find((t) => t.id === teamId);
  if (!team) return null;

  const teamMembers = agents.filter((a) => a.teamId === teamId);

  const activeMembers = teamMembers.filter((m) => m.status === 'active').length;
  const transitMembers = teamMembers.filter((m) => m.status === 'transit').length;
  const breakMembers = teamMembers.filter((m) => m.status === 'break').length;

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div 
          className="sticky top-0 border-b border-gray-200 p-4 flex items-center justify-between z-10"
          style={{ backgroundColor: `${team.color}15` }}
        >
          <div className="flex items-center gap-3">
            <div 
              className="size-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: team.color }}
            >
              <Users className="size-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">{team.name}</h2>
              <p className="text-sm text-gray-600">{teamMembers.length} membres</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="p-4 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-700">{activeMembers}</div>
              <div className="text-xs text-green-600 mt-1">En contrôle</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-700">{transitMembers}</div>
              <div className="text-xs text-blue-600 mt-1">En déplacement</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-gray-700">{breakMembers}</div>
              <div className="text-xs text-gray-600 mt-1">En pause</div>
            </div>
          </div>
        </div>

        {/* Zones */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Zones de contrôle</h3>
          <div className="flex flex-wrap gap-2">
            {team.zones.map((zone, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: team.color }}
              >
                {zone}
              </span>
            ))}
          </div>
        </div>

        {/* Members */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Membres de l'équipe</h3>
          <div className="grid grid-cols-1 gap-2">
            {teamMembers.map((member) => {
              const statusColor =
                member.status === 'active'
                  ? 'bg-green-500'
                  : member.status === 'transit'
                  ? 'bg-blue-500'
                  : 'bg-gray-400';

              const statusText =
                member.status === 'active'
                  ? 'En contrôle'
                  : member.status === 'transit'
                  ? 'En déplacement'
                  : 'En pause';

              return (
                <button
                  key={member.id}
                  onClick={() => {
                    onAgentClick(member);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 text-left group"
                >
                  {/* Avatar with status indicator */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="size-14 rounded-full object-cover border-3"
                      style={{ borderColor: team.color }}
                    />
                    <div
                      className={`absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-white ${statusColor}`}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600">{member.currentZone}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{statusText}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Dernier contrôle: {member.lastControl}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors">
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
