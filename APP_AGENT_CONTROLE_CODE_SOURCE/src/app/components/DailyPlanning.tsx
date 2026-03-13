import { Clock, Users, Target, MapPin, Coffee, TrendingUp, Train, TramFront, Bus, ChevronDown, ChevronUp } from 'lucide-react';
import { agents, teams, CURRENT_USER_ID } from '../data/mockData';
import { useState } from 'react';

interface DailyPlanningProps {
  compact?: boolean;
}

export function DailyPlanning({ compact = false }: DailyPlanningProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Get current user info
  const currentUser = agents.find(a => a.id === CURRENT_USER_ID);
  const currentTeam = teams.find(t => t.id === currentUser?.teamId);

  // Today's planning data
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  
  // Assigned lines for the day
  const assignedLines = [
    { 
      id: 'm1', 
      name: 'Métro M1', 
      type: 'metro', 
      color: '#E30613',
      stops: ['Renens Gare', 'UNIL-Sorge', 'EPFL', 'Flon']
    },
    { 
      id: 'm2', 
      name: 'Métro M2', 
      type: 'metro', 
      color: '#0066B3',
      stops: ['Croisettes', 'Délices', 'Ouchy-Olympique', 'Ouchy']
    },
    { 
      id: 'l1', 
      name: 'Ligne 1', 
      type: 'tram', 
      color: '#3B82F6',
      stops: ['Maladière', 'Riponne-M.Béjart', 'CHUV', 'Boissonnet']
    },
    { 
      id: 'l2', 
      name: 'Ligne 2', 
      type: 'tram', 
      color: '#22C55E',
      stops: ['Ouchy', 'Jordils', 'Flon', 'Grancy', 'La Sallaz']
    },
    { 
      id: 'b25', 
      name: 'Bus 25', 
      type: 'bus', 
      color: '#F97316',
      stops: ['Malley', 'Prilly-Centre', 'Chauderon', 'Flon']
    },
    { 
      id: 'b7', 
      name: 'Bus 7', 
      type: 'bus', 
      color: '#9333EA',
      stops: ['Blécherette', 'Béthusy', 'Georgette', 'Vennes']
    },
  ];

  // Tour information
  const tourInfo = {
    duration: '7h30',
    estimatedContacts: 1200,
    controlInterval: '15-20 min',
    team: currentTeam?.name || 'Équipe Rouge',
    zones: currentUser?.currentZone ? [currentUser.currentZone, 'St-François', 'Gare'] : ['Centre-Flon', 'St-François', 'Gare'],
  };

  // Break information
  const breakInfo = {
    time: '11h30 - 13h30',
    location: 'Région du Flon',
    duration: '45 min',
  };

  // Compact version for Dashboard
  if (compact) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 border-b border-gray-200 flex items-center justify-between hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--tl-red)' }}
        >
          <div className="flex items-center gap-2">
            <Clock className="size-5 text-white" />
            <div className="text-left">
              <h3 className="font-semibold text-white">Mon planning du jour</h3>
              <p className="text-xs text-white/90 capitalize">{today}</p>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="size-5 text-white flex-shrink-0" />
          ) : (
            <ChevronDown className="size-5 text-white flex-shrink-0" />
          )}
        </button>

        {isExpanded && (
          <div className="p-4 space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                <p className="text-xl font-bold text-blue-900">{assignedLines.length}</p>
                <p className="text-xs text-blue-700 mt-0.5">Lignes</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                <p className="text-xl font-bold text-green-900">{assignedLines.reduce((total, line) => total + line.stops.length, 0)}</p>
                <p className="text-xs text-green-700 mt-0.5">Arrêts</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 text-center">
                <p className="text-xl font-bold text-purple-900">{tourInfo.duration}</p>
                <p className="text-xs text-purple-700 mt-0.5">Durée</p>
              </div>
            </div>

            {/* Assigned Lines - Detailed */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <Target className="size-3.5" style={{ color: 'var(--tl-red)' }} />
                Lignes assignées
              </h4>
              <div className="space-y-2">
                {assignedLines.map((line) => {
                  const Icon = line.type === 'metro' ? Train : line.type === 'tram' ? TramFront : Bus;
                  const typeLabel = line.type === 'metro' ? 'Métro' : line.type === 'tram' ? 'Tram' : 'Bus';
                  
                  return (
                    <div
                      key={line.id}
                      className="bg-gray-50 rounded-lg border-2 border-black overflow-hidden"
                    >
                      {/* Line header */}
                      <div className="flex items-center gap-2 p-2 bg-white border-b border-black">
                        <div
                          className="size-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: line.color }}
                        >
                          <Icon className="size-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-gray-900 block">{line.name}</span>
                          <span className="text-xs text-gray-600">{typeLabel} · {line.stops.length} arrêts</span>
                        </div>
                      </div>
                      
                      {/* Stops list - compact */}
                      <div className="p-2">
                        <div className="grid grid-cols-2 gap-1">
                          {line.stops.map((stop, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-1.5 text-xs"
                            >
                              <div className="size-4 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-gray-700" style={{ fontSize: '9px' }}>{idx + 1}</span>
                              </div>
                              <span className="text-gray-900 text-xs truncate">{stop}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tour Organization - Compact */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <MapPin className="size-3.5" style={{ color: 'var(--tl-red)' }} />
                Organisation
              </h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">Équipe</span>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: currentTeam?.color }}
                    />
                    <span className="font-medium text-gray-900">{tourInfo.team}</span>
                  </div>
                </div>
                <div className="flex items-start justify-between text-xs">
                  <span className="text-gray-700">Zones principales</span>
                  <div className="text-right">
                    {tourInfo.zones.slice(0, 2).map((zone, index) => (
                      <div key={index} className="font-medium text-gray-900 text-xs">
                        {zone}
                      </div>
                    ))}</div>
                </div>
              </div>
            </div>

            {/* Today's shifts */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <Clock className="size-3.5" style={{ color: 'var(--tl-red)' }} />
                Horaires du jour
              </h4>
              <div className="space-y-2">
                {currentUser?.weekPlanning?.[0]?.shifts.map((shift, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                    <span className="text-xs font-medium text-gray-900">
                      {shift.startTime} - {shift.endTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Break */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <Coffee className="size-3.5" style={{ color: 'var(--tl-red)' }} />
                Pause
              </h4>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">Heure</span>
                  <span className="font-medium text-gray-900">{breakInfo.time}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">Durée</span>
                  <span className="font-medium text-gray-900">{breakInfo.duration}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">Zone recommandée</span>
                  <span className="font-medium text-gray-900">{breakInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Contact Objective */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                <TrendingUp className="size-3.5" style={{ color: 'var(--tl-red)' }} />
                Objectif de contacts
              </h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-700 mb-0.5">Estimation du jour</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tourInfo.estimatedContacts.toLocaleString('fr-FR')}
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  Basé sur {tourInfo.duration} de tournée
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full version for Map view
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200" style={{ backgroundColor: 'var(--tl-red)' }}>
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Clock className="size-6" />
          Mon planning du jour
        </h2>
        <p className="text-sm text-white/90 mt-1 capitalize">{today}</p>
      </div>

      <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-900">{assignedLines.length}</p>
            <p className="text-xs text-blue-700 mt-0.5">Lignes</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-900">{assignedLines.reduce((total, line) => total + line.stops.length, 0)}</p>
            <p className="text-xs text-green-700 mt-0.5">Arrêts</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-purple-900">{tourInfo.duration}</p>
            <p className="text-xs text-purple-700 mt-0.5">Durée</p>
          </div>
        </div>

        {/* Assigned Lines */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Target className="size-4" style={{ color: 'var(--tl-red)' }} />
            Lignes assignées
          </h3>
          <div className="space-y-3">
            {assignedLines.map((line) => {
              const Icon = line.type === 'metro' ? Train : line.type === 'tram' ? TramFront : Bus;
              const typeLabel = line.type === 'metro' ? 'Métro' : line.type === 'tram' ? 'Tram' : 'Bus';
              
              return (
                <div
                  key={line.id}
                  className="bg-gray-50 rounded-lg border-2 overflow-hidden transition-all hover:shadow-md"
                  style={{ borderColor: line.color }}
                >
                  {/* Line header */}
                  <div className="flex items-center gap-3 p-3 bg-white border-b-2" style={{ borderBottomColor: line.color }}>
                    <div
                      className="size-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: line.color }}
                    >
                      <Icon className="size-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-bold text-gray-900 block">{line.name}</span>
                      <span className="text-xs text-gray-600">{typeLabel} · {line.stops.length} arrêts</span>
                    </div>
                  </div>
                  
                  {/* Stops list */}
                  <div className="p-3 pt-2">
                    <p className="text-xs font-medium text-gray-600 mb-2">Arrêts principaux :</p>
                    <div className="space-y-1.5">
                      {line.stops.map((stop, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div className="size-6 rounded bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-semibold text-gray-700">{idx + 1}</span>
                          </div>
                          <span className="text-gray-900 font-medium">{stop}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tour Organization */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <MapPin className="size-4" style={{ color: 'var(--tl-red)' }} />
            Organisation de la tournée
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Équipe assignée</span>
              <div className="flex items-center gap-2">
                <div
                  className="size-3 rounded-full"
                  style={{ backgroundColor: currentTeam?.color }}
                />
                <span className="font-medium text-gray-900">{tourInfo.team}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Durée estimée</span>
              <span className="font-medium text-gray-900">{tourInfo.duration}</span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-gray-700">Zones principales</span>
              <div className="text-right">
                {tourInfo.zones.map((zone, index) => (
                  <div key={index} className="font-medium text-gray-900">
                    {zone}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Shifts */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Clock className="size-4" style={{ color: 'var(--tl-red)' }} />
            Horaires du jour
          </h3>
          <div className="space-y-2">
            {currentUser?.weekPlanning?.[0]?.shifts.map((shift, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {shift.startTime} - {shift.endTime}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">Zone: {shift.zone}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                  Actif
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Break */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Coffee className="size-4" style={{ color: 'var(--tl-red)' }} />
            Pause
          </h3>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Heure de pause</span>
              <span className="font-medium text-gray-900">{breakInfo.time}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Durée</span>
              <span className="font-medium text-gray-900">{breakInfo.duration}</span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-gray-700">Localisation recommandée</span>
              <span className="font-medium text-gray-900 text-right">{breakInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Contact Objective */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="size-4" style={{ color: 'var(--tl-red)' }} />
            Objectif de contacts
          </h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-700 mb-1">Estimation des contacts du jour</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {tourInfo.estimatedContacts.toLocaleString('fr-FR')}
            </p>
            <p className="text-xs text-gray-600">
              Basé sur la durée et les lignes assignées
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}