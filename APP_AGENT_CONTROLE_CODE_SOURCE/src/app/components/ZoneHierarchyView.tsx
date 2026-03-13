import { ChevronRight, MapPin, Train, TramFront, Bus, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface ZoneHierarchyViewProps {
  onClose: () => void;
  initialZoneId?: string | null;
}

// Niveau 1: Grandes zones principales
const mainZones = [
  {
    id: 'renens-crissier',
    name: 'Renens / Crissier',
    color: '#3B82F6', // Blue
    coverage: 85,
  },
  {
    id: 'flon-hypercentre',
    name: 'Flon / Hyper-centre',
    color: '#10B981', // Green
    coverage: 92,
  },
  {
    id: 'pully-lutry',
    name: 'Pully / Lutry',
    color: '#F59E0B', // Orange
    coverage: 78,
  },
];

// Niveau 2: Sous-zones pour chaque grande zone
const subZones: Record<string, Array<{id: string, name: string, status: string}>> = {
  'renens-crissier': [
    { id: 'renens-gare', name: 'Renens Gare', status: 'covered' },
    { id: 'croix-blanche', name: 'Croix-Blanche', status: 'monitor' },
    { id: 'crissier-centre', name: 'Crissier Centre', status: 'to-cover' },
  ],
  'flon-hypercentre': [
    { id: 'flon', name: 'Flon', status: 'covered' },
    { id: 'st-francois', name: 'St-François', status: 'covered' },
    { id: 'riponne', name: 'Riponne', status: 'monitor' },
    { id: 'gare-cff', name: 'Gare CFF', status: 'covered' },
  ],
  'pully-lutry': [
    { id: 'pully-gare', name: 'Pully Gare', status: 'monitor' },
    { id: 'pully-centre', name: 'Pully Centre', status: 'to-cover' },
    { id: 'lutry-village', name: 'Lutry Village', status: 'covered' },
  ],
};

// Niveau 3: Lignes pour chaque sous-zone
const lines: Record<string, Array<{id: string, name: string, type: string, color: string}>> = {
  'renens-gare': [
    { id: 'm1', name: 'Métro M1', type: 'metro', color: '#E30613' },
    { id: 'b33', name: 'Bus 33', type: 'bus', color: '#9333EA' },
  ],
  'flon': [
    { id: 'm1', name: 'Métro M1', type: 'metro', color: '#E30613' },
    { id: 'm2', name: 'Métro M2', type: 'metro', color: '#0066B3' },
    { id: 'l1', name: 'Ligne 1', type: 'tram', color: '#3B82F6' },
  ],
  'st-francois': [
    { id: 'l1', name: 'Ligne 1', type: 'tram', color: '#3B82F6' },
    { id: 'l2', name: 'Ligne 2', type: 'tram', color: '#22C55E' },
    { id: 'b7', name: 'Bus 7', type: 'bus', color: '#9333EA' },
  ],
  'gare-cff': [
    { id: 'b1', name: 'Bus 1', type: 'bus', color: '#F97316' },
    { id: 'b3', name: 'Bus 3', type: 'bus', color: '#EF4444' },
  ],
  'riponne': [
    { id: 'l1', name: 'Ligne 1', type: 'tram', color: '#3B82F6' },
  ],
  'pully-gare': [
    { id: 'l2', name: 'Ligne 2', type: 'tram', color: '#22C55E' },
  ],
  'croix-blanche': [
    { id: 'm1', name: 'Métro M1', type: 'metro', color: '#E30613' },
  ],
  'crissier-centre': [
    { id: 'b33', name: 'Bus 33', type: 'bus', color: '#9333EA' },
  ],
  'pully-centre': [
    { id: 'b4', name: 'Bus 4', type: 'bus', color: '#22C55E' },
  ],
  'lutry-village': [
    { id: 'b9', name: 'Bus 9', type: 'bus', color: '#06B6D4' },
  ],
};

// Niveau 4: Arrêts pour chaque ligne avec statut de contrôle
const stops: Record<string, Array<{name: string, controlled: boolean}>> = {
  'm1': [
    { name: 'Renens Gare', controlled: true },
    { name: 'UNIL-Sorge', controlled: true },
    { name: 'UNIL-Mouline', controlled: false },
    { name: 'EPFL', controlled: true },
    { name: 'Bassenges', controlled: false },
    { name: 'Flon', controlled: true },
  ],
  'm2': [
    { name: 'Croisettes', controlled: true },
    { name: 'Fourmi', controlled: false },
    { name: 'Délices', controlled: true },
    { name: 'Ouchy-Olympique', controlled: true },
    { name: 'Ouchy', controlled: false },
  ],
  'l1': [
    { name: 'Maladière', controlled: true },
    { name: 'St-François', controlled: true },
    { name: 'Riponne-M.Béjart', controlled: true },
    { name: 'Tunnel', controlled: false },
    { name: 'CHUV', controlled: false },
  ],
  'l2': [
    { name: 'Ouchy', controlled: false },
    { name: 'Jordils', controlled: true },
    { name: 'Délices', controlled: true },
    { name: 'Flon', controlled: true },
    { name: 'Grancy', controlled: false },
    { name: 'Croisettes', controlled: true },
  ],
  'b7': [
    { name: 'Blécherette', controlled: false },
    { name: 'Chailly-Village', controlled: false },
    { name: 'Béthusy', controlled: true },
    { name: 'St-François', controlled: true },
    { name: 'Vennes', controlled: true },
  ],
  'b1': [
    { name: 'Gare CFF', controlled: true },
    { name: 'Rue Centrale', controlled: true },
    { name: 'Riponne', controlled: false },
    { name: 'Maladière', controlled: false },
  ],
  'b3': [
    { name: 'Gare CFF', controlled: true },
    { name: 'Tunnel', controlled: false },
    { name: 'Sévelin', controlled: false },
    { name: 'Malley', controlled: true },
  ],
  'b33': [
    { name: 'Renens Gare', controlled: true },
    { name: 'Crissier Centre', controlled: false },
    { name: 'Prilly', controlled: false },
    { name: 'Malley', controlled: true },
  ],
  'b4': [
    { name: 'Pully Gare', controlled: false },
    { name: 'Pully Centre', controlled: false },
    { name: 'La Rosiaz', controlled: false },
  ],
  'b9': [
    { name: 'Lutry Village', controlled: true },
    { name: 'Lutry Gare', controlled: true },
    { name: 'Belmont', controlled: false },
  ],
};

export function ZoneHierarchyView({ onClose, initialZoneId }: ZoneHierarchyViewProps) {
  const [selectedMainZone, setSelectedMainZone] = useState<string | null>(initialZoneId || null);
  const [selectedSubZone, setSelectedSubZone] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);

  // Fonction pour calculer le statut global d'une ligne basé sur ses arrêts
  const getLineGlobalStatus = (lineId: string): 'controlled' | 'partial' | 'priority' => {
    const lineStops = stops[lineId] || [];
    const totalStops = lineStops.length;
    const controlledCount = lineStops.filter(s => s.controlled).length;
    const uncontrolledCount = totalStops - controlledCount;

    if (controlledCount === totalStops) {
      return 'controlled'; // 🟢 Tous les arrêts contrôlés
    } else if (uncontrolledCount >= 2) {
      return 'priority'; // 🔴 Plusieurs arrêts non contrôlés (prioritaire)
    } else {
      return 'partial'; // 🟠 Quelques arrêts à contrôler
    }
  };

  const getLineStatusInfo = (status: 'controlled' | 'partial' | 'priority') => {
    switch (status) {
      case 'controlled':
        return {
          color: '#10b981',
          bgColor: '#dcfce7',
          label: 'Ligne contrôlée',
          icon: '🟢',
          priority: 'low'
        };
      case 'partial':
        return {
          color: '#f59e0b',
          bgColor: '#fef3c7',
          label: 'Ligne partiellement contrôlée',
          icon: '🟠',
          priority: 'medium'
        };
      case 'priority':
        return {
          color: '#ef4444',
          bgColor: '#fee2e2',
          label: 'Ligne prioritaire',
          icon: '🔴',
          priority: 'high'
        };
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'covered') return '#10b981';
    if (status === 'monitor') return '#f59e0b';
    return '#ef4444';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'covered') return 'Couvert';
    if (status === 'monitor') return 'Surveiller';
    return 'À couvrir';
  };

  const handleBack = () => {
    if (selectedLine) {
      setSelectedLine(null);
    } else if (selectedSubZone) {
      setSelectedSubZone(null);
    } else if (selectedMainZone) {
      setSelectedMainZone(null);
    } else {
      onClose();
    }
  };

  const currentMainZone = mainZones.find(z => z.id === selectedMainZone);
  const currentSubZones = selectedMainZone ? subZones[selectedMainZone] || [] : [];
  const currentLines = selectedSubZone ? lines[selectedSubZone] || [] : [];
  const currentStops = selectedLine ? stops[selectedLine] || [] : [];
  const selectedLineData = currentLines.find(l => l.id === selectedLine);
  const lineStatus = selectedLine ? getLineGlobalStatus(selectedLine) : null;
  const lineStatusInfo = lineStatus ? getLineStatusInfo(lineStatus) : null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header Simplifié */}
        <div className="p-4 border-b border-gray-200" style={{ backgroundColor: 'var(--tl-red)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {(selectedMainZone || selectedSubZone || selectedLine) && (
                <button
                  onClick={handleBack}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft className="size-5 text-white" />
                </button>
              )}
              <div>
                <h2 className="text-white text-lg font-bold">
                  {selectedLine ? selectedLineData?.name :
                   selectedSubZone ? currentSubZones.find(sz => sz.id === selectedSubZone)?.name :
                   selectedMainZone ? currentMainZone?.name :
                   'Navigation des zones'}
                </h2>
                <p className="text-white/80 text-xs mt-0.5">
                  {selectedLine ? 'Arrêts de la ligne' :
                   selectedSubZone ? 'Lignes de transport' :
                   selectedMainZone ? 'Sous-zones' :
                   'Grandes zones'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Niveau 1: Grandes zones */}
          {!selectedMainZone && (
            <div className="space-y-3">
              {mainZones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedMainZone(zone.id)}
                  className="w-full bg-white border-2 rounded-xl p-4 hover:shadow-lg transition-all text-left"
                  style={{ borderColor: zone.color }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: zone.color }}
                      >
                        <MapPin className="size-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{zone.name}</h3>
                        <p className="text-sm text-gray-600">Grande zone principale</p>
                      </div>
                    </div>
                    <ChevronRight className="size-6 text-gray-400" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${zone.coverage}%`, backgroundColor: zone.color }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{zone.coverage}%</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Niveau 2: Sous-zones */}
          {selectedMainZone && !selectedSubZone && (
            <div className="space-y-3">
              {currentSubZones.map((subZone) => (
                <button
                  key={subZone.id}
                  onClick={() => setSelectedSubZone(subZone.id)}
                  className="w-full bg-white border-2 border-gray-300 rounded-xl p-4 hover:shadow-lg hover:border-gray-400 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: getStatusColor(subZone.status) }}
                      >
                        <MapPin className="size-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{subZone.name}</h4>
                        <p className="text-xs text-gray-600">{getStatusLabel(subZone.status)}</p>
                      </div>
                    </div>
                    <ChevronRight className="size-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Niveau 3: Lignes avec indicateur global */}
          {selectedSubZone && !selectedLine && (
            <div className="space-y-3">
              {currentLines.length > 0 ? (
                currentLines.map((line) => {
                  const Icon = line.type === 'metro' ? Train : line.type === 'tram' ? TramFront : Bus;
                  const typeLabel = line.type === 'metro' ? 'Métro' : line.type === 'tram' ? 'Tram' : 'Bus';
                  const globalStatus = getLineGlobalStatus(line.id);
                  const statusInfo = getLineStatusInfo(globalStatus);
                  const lineStops = stops[line.id] || [];
                  const controlledCount = lineStops.filter(s => s.controlled).length;
                  const totalStops = lineStops.length;
                  
                  return (
                    <button
                      key={line.id}
                      onClick={() => setSelectedLine(line.id)}
                      className="w-full bg-white border-2 rounded-xl p-4 hover:shadow-lg transition-all text-left"
                      style={{ borderColor: statusInfo.color }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="size-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: line.color }}
                          >
                            <Icon className="size-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{line.name}</h4>
                            <p className="text-xs text-gray-600">{typeLabel} · {totalStops} arrêts</p>
                          </div>
                        </div>
                        <ChevronRight className="size-5 text-gray-400" />
                      </div>
                      
                      {/* Statut global de la ligne */}
                      <div 
                        className="rounded-lg p-2.5 flex items-center justify-between"
                        style={{ backgroundColor: statusInfo.bgColor }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{statusInfo.icon}</span>
                          <span className="text-xs font-semibold" style={{ color: statusInfo.color }}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-gray-700">
                          {controlledCount}/{totalStops} contrôlés
                        </span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Aucune ligne disponible pour cette zone
                </div>
              )}
            </div>
          )}

          {/* Niveau 4: Arrêts - Visualisation type plan de métro */}
          {selectedLine && selectedLineData && lineStatusInfo && (
            <div>
              {/* Header de la ligne */}
              <div className="mb-4">
                <div 
                  className="rounded-xl p-4 mb-3"
                  style={{ backgroundColor: lineStatusInfo.bgColor }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{lineStatusInfo.icon}</span>
                      <div>
                        <p className="text-sm font-bold" style={{ color: lineStatusInfo.color }}>
                          {lineStatusInfo.label}
                        </p>
                        <p className="text-xs text-gray-600">
                          {currentStops.filter(s => s.controlled).length}/{currentStops.length} arrêts contrôlés
                        </p>
                      </div>
                    </div>
                    {lineStatusInfo.priority === 'high' && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white">
                        PRIORITAIRE
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Plan de ligne horizontal */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-600 mb-3">Plan de la ligne :</p>
                <div className="relative">
                  {/* Ligne de fond */}
                  <div className="absolute top-8 left-0 right-0 h-1 bg-gray-300 rounded-full" />
                  
                  {/* Arrêts */}
                  <div className="flex justify-between items-start relative">
                    {currentStops.map((stop, index) => {
                      const isControlled = stop.controlled;
                      const statusColor = isControlled ? '#10b981' : '#ef4444';
                      
                      return (
                        <div key={index} className="flex flex-col items-center" style={{ width: `${100 / currentStops.length}%` }}>
                          {/* Numéro et statut */}
                          <div className="relative z-10 mb-2">
                            <div 
                              className="size-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                              style={{ backgroundColor: statusColor }}
                            >
                              <span className="text-white text-sm font-bold">{index + 1}</span>
                            </div>
                          </div>
                          
                          {/* Nom de l'arrêt */}
                          <div className="text-center mt-2 px-1">
                            <p 
                              className="text-xs font-medium leading-tight"
                              style={{ 
                                color: statusColor,
                                fontSize: currentStops.length > 5 ? '10px' : '11px'
                              }}
                            >
                              {stop.name}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Liste détaillée des arrêts */}
              <div className="mt-6">
                <p className="text-xs font-semibold text-gray-600 mb-3">Détail des arrêts :</p>
                <div className="space-y-2">
                  {currentStops.map((stop, index) => {
                    const isControlled = stop.controlled;
                    const statusIcon = isControlled ? '🟢' : '🔴';
                    const statusLabel = isControlled ? 'Contrôlé' : 'Non contrôlé';
                    const statusColor = isControlled ? '#10b981' : '#ef4444';
                    
                    return (
                      <div
                        key={index}
                        className="border-2 rounded-lg p-3 flex items-center gap-3"
                        style={{ borderColor: statusColor, backgroundColor: isControlled ? '#f0fdf4' : '#fef2f2' }}
                      >
                        <div 
                          className="size-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white shadow"
                          style={{ backgroundColor: statusColor }}
                        >
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </div>
                        <span className="flex-1 text-sm font-medium text-gray-900">{stop.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{statusIcon}</span>
                          <span className="text-xs font-semibold" style={{ color: statusColor }}>
                            {statusLabel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Legend */}
              <div className="mt-5 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-600 mb-2">Légende :</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🟢</span>
                    <span className="text-xs text-gray-600">Arrêt contrôlé</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base">🔴</span>
                    <span className="text-xs text-gray-600">Arrêt non contrôlé</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
