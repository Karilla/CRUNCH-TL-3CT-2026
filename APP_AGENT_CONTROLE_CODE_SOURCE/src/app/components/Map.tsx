import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  LAUSANNE_CENTER,
  transitLines,
  stations,
  agents,
  controlZones,
  teams,
  CURRENT_USER_ID,
  type Agent,
  type Station,
} from '../data/mockData';

// Fix for default marker icons in Leaflet with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapProps {
  onAgentClick: (agent: Agent) => void;
  onTeamClick: (teamId: string) => void;
}

export function Map({ onAgentClick, onTeamClick }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(true);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(containerRef.current).setView(LAUSANNE_CENTER, 13);
    mapRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map);

    // Add control zones (colored by team)
    controlZones.forEach((zone) => {
      const team = teams.find((t) => t.id === zone.teamId);
      if (!team) return;

      const polygon = L.polygon(zone.coordinates as [number, number][], {
        color: team.color,
        fillColor: team.color,
        fillOpacity: 0.15,
        weight: 2,
        opacity: 0.6,
      }).addTo(map);

      polygon.bindPopup(`
        <div class="text-sm min-w-[180px]">
          <div class="flex items-center gap-2 mb-2">
            <div class="size-3 rounded-full" style="background-color: ${team.color}"></div>
            <h3 class="font-semibold">${zone.name}</h3>
          </div>
          <p class="text-xs mb-1"><span class="font-medium">${team.name}</span></p>
          <p class="text-xs text-gray-600 mb-1">Couverture: ${zone.coverageRate}%</p>
          <p class="text-xs text-gray-600">Dernier contrôle: ${zone.lastControlled}</p>
        </div>
      `);

      polygon.on('click', () => {
        if (onTeamClick && typeof onTeamClick === 'function') {
          onTeamClick(team.id);
        }
      });
    });

    // Add transit lines
    transitLines.forEach((line) => {
      const polyline = L.polyline(line.coordinates as [number, number][], {
        color: line.color,
        weight: 4,
        opacity: 0.7,
      }).addTo(map);

      polyline.bindPopup(`
        <div class="text-sm">
          <h3 class="font-semibold">${line.name}</h3>
          <p class="text-xs text-gray-600 capitalize">
            ${line.type === 'metro' ? 'Métro' : line.type === 'bus' ? 'Bus' : 'Trolleybus'}
          </p>
        </div>
      `);
    });

    // Add stations
    stations.forEach((station: Station) => {
      const marker = L.circleMarker(station.coordinates as [number, number], {
        color: '#fff',
        weight: 2,
        fillColor: station.isPrimaryHub ? '#E30613' : '#58585A',
        fillOpacity: 0.9,
        radius: station.isPrimaryHub ? 8 : 5,
      }).addTo(map);

      marker.bindPopup(`
        <div class="text-sm">
          <h3 class="font-semibold">${station.name}</h3>
          ${station.isPrimaryHub ? '<p class="text-xs text-gray-600">Pôle principal</p>' : ''}
        </div>
      `);
    });

    // Cleanup
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update agent markers based on team access rights
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing team markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Get current user's team
    const currentUser = agents.find(a => a.id === CURRENT_USER_ID);
    const currentUserTeamId = currentUser?.teamId;

    // Group agents by team
    const agentsByTeam: Record<string, Agent[]> = {};
    agents.forEach((agent: Agent) => {
      if (!agentsByTeam[agent.teamId]) {
        agentsByTeam[agent.teamId] = [];
      }
      agentsByTeam[agent.teamId].push(agent);
    });

    // For each team
    teams.forEach((team) => {
      const teamAgents = agentsByTeam[team.id] || [];

      // If this is the current user's team, show all individual agents
      if (team.id === currentUserTeamId) {
        teamAgents.forEach((agent: Agent) => {
          const isCurrentUser = agent.id === CURRENT_USER_ID;
          const iconSize = isCurrentUser ? 52 : 44;
          
          const iconHtml = `
            <div style="position: relative; width: ${iconSize}px; height: ${iconSize}px;">
              <img 
                src="${agent.photo}" 
                alt="${agent.name}"
                style="
                  width: ${iconSize}px;
                  height: ${iconSize}px;
                  border-radius: 50%;
                  object-fit: cover;
                  border: ${isCurrentUser ? '4px' : '3px'} solid ${team.color};
                  box-shadow: ${isCurrentUser ? '0 0 0 4px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.3)'};
                  cursor: pointer;
                  background: white;
                "
              />
              ${isCurrentUser ? `
                <div style="
                  position: absolute;
                  bottom: -3px;
                  right: -3px;
                  width: 18px;
                  height: 18px;
                  background: #3B82F6;
                  border: 3px solid white;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                ">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              ` : ''}
            </div>
          `;

          const customIcon = L.divIcon({
            html: iconHtml,
            className: 'custom-team-marker',
            iconSize: [iconSize, iconSize],
            iconAnchor: [iconSize / 2, iconSize / 2],
          });

          const marker = L.marker(agent.position as [number, number], {
            icon: customIcon,
            zIndexOffset: isCurrentUser ? 1000 : 0,
          }).addTo(mapRef.current!);

          marker.on('click', () => {
            if (onAgentClick && typeof onAgentClick === 'function') {
              onAgentClick(agent);
            }
          });

          const statusText = agent.status === 'active'
            ? 'En contrôle'
            : agent.status === 'transit'
            ? 'En déplacement'
            : 'En pause';

          const statusColor = agent.status === 'active'
            ? 'bg-green-100 text-green-800'
            : agent.status === 'transit'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800';

          marker.bindPopup(`
            <div class="text-sm min-w-[200px]">
              <div class="flex items-center gap-2 mb-2">
                <img 
                  src="${agent.photo}" 
                  alt="${agent.name}"
                  class="size-12 rounded-full object-cover border-2"
                  style="border-color: ${team.color}"
                />
                <div>
                  <h3 class="font-semibold">${agent.name}</h3>
                  <p class="text-xs" style="color: ${team.color}">${team.name}</p>
                </div>
              </div>
              <div class="space-y-1 text-xs">
                <span class="inline-block px-2 py-0.5 rounded ${statusColor}">
                  ${statusText}
                </span>
                <p class="text-gray-600 mt-1"><strong>Zone:</strong> ${agent.currentZone}</p>
                ${isCurrentUser ? '<p class="text-blue-600 font-medium mt-1">👤 Votre position</p>' : ''}
                <p class="text-gray-500 mt-1 italic">Cliquez pour plus de détails</p>
              </div>
            </div>
          `);

          markersRef.current.push(marker);
        });
      } else if (teamAgents.length === 0) {
        // For teams with no agents, show a gray marker indicating uncovered zone
        // Calculate center of team's zones
        const teamZones = controlZones.filter(z => z.teamId === team.id);
        if (teamZones.length > 0) {
          let totalLat = 0;
          let totalLng = 0;
          let pointCount = 0;
          
          teamZones.forEach(zone => {
            zone.coordinates.forEach(coord => {
              totalLat += coord[0];
              totalLng += coord[1];
              pointCount++;
            });
          });
          
          const teamPosition: [number, number] = [totalLat / pointCount, totalLng / pointCount];

          const emptyTeamIconHtml = `
            <div style="position: relative; width: 50px; height: 50px;">
              <div style="
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #9CA3AF;
                border: 4px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: white;
                font-size: 24px;
              ">
                −
              </div>
            </div>
          `;

          const emptyTeamIcon = L.divIcon({
            html: emptyTeamIconHtml,
            className: 'custom-team-empty-marker',
            iconSize: [50, 50],
            iconAnchor: [25, 25],
          });

          const emptyTeamMarker = L.marker(teamPosition, {
            icon: emptyTeamIcon,
            zIndexOffset: -100,
          }).addTo(mapRef.current!);

          emptyTeamMarker.on('click', () => {
            if (onTeamClick && typeof onTeamClick === 'function') {
              onTeamClick(team.id);
            }
          });

          emptyTeamMarker.bindPopup(`
            <div class="text-sm min-w-[180px]">
              <div class="flex items-center gap-2 mb-2">
                <div class="size-4 rounded-full bg-gray-400"></div>
                <h3 class="font-semibold text-gray-700">${team.name}</h3>
              </div>
              <p class="text-xs text-gray-700 mb-1 font-semibold">⚠️ Zone non couverte</p>
              <p class="text-xs text-gray-600 mb-1">Aucun agent actuellement sur le terrain</p>
              <p class="text-xs text-gray-500">Zone: ${team.zones.join(', ')}</p>
            </div>
          `);

          markersRef.current.push(emptyTeamMarker);
        }
      } else {
        // For other teams with agents, show a global team marker (average position)
        const avgLat = teamAgents.reduce((sum, a) => sum + a.position[0], 0) / teamAgents.length;
        const avgLng = teamAgents.reduce((sum, a) => sum + a.position[1], 0) / teamAgents.length;
        const teamPosition: [number, number] = [avgLat, avgLng];

        const teamIconHtml = `
          <div style="position: relative; width: 50px; height: 50px;">
            <div style="
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: ${team.color};
              border: 4px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              color: white;
              font-size: 18px;
            ">
              ${teamAgents.length}
            </div>
          </div>
        `;

        const teamIcon = L.divIcon({
          html: teamIconHtml,
          className: 'custom-team-global-marker',
          iconSize: [50, 50],
          iconAnchor: [25, 25],
        });

        const teamMarker = L.marker(teamPosition, {
          icon: teamIcon,
          zIndexOffset: -100,
        }).addTo(mapRef.current!);

        teamMarker.on('click', () => {
          if (onTeamClick && typeof onTeamClick === 'function') {
            onTeamClick(team.id);
          }
        });

        teamMarker.bindPopup(`
          <div class="text-sm min-w-[180px]">
            <div class="flex items-center gap-2 mb-2">
              <div class="size-4 rounded-full" style="background-color: ${team.color}"></div>
              <h3 class="font-semibold">${team.name}</h3>
            </div>
            <p class="text-xs text-gray-700 mb-1">${teamAgents.length} agent${teamAgents.length > 1 ? 's' : ''} sur le terrain</p>
            <p class="text-xs text-gray-600 mb-1">Zone générale: ${team.zones.join(', ')}</p>
            <p class="text-xs text-gray-500 italic mt-2">Position globale de l'équipe</p>
            <p class="text-xs text-gray-500">Cliquez pour voir la composition</p>
          </div>
        `);

        markersRef.current.push(teamMarker);
      }
    });
  }, [onAgentClick, onTeamClick]);

  return (
    <div className="relative size-full">
      <div ref={containerRef} className="size-full" />

      {/* Map Legend Overlay - Collapsible - Repositionnée en haut à droite */}
      {isLegendCollapsed ? (
        /* Collapsed Legend - Small Icon */
        <button
          onClick={() => setIsLegendCollapsed(false)}
          className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 text-xs z-[1000] hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <span className="font-semibold text-gray-900">Légende</span>
          <ChevronRight className="size-4 text-gray-600" />
        </button>
      ) : (
        /* Expanded Legend - Full Content */
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg text-xs z-[1000] max-w-[240px] flex flex-col max-h-[calc(100vh-200px)]">
          {/* Header with collapse button */}
          <div className="flex items-center justify-between p-3 border-b border-gray-200 flex-shrink-0">
            <h3 className="font-semibold text-gray-900">Légende</h3>
            <button
              onClick={() => setIsLegendCollapsed(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Réduire la légende"
            >
              <ChevronLeft className="size-4 text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-3 space-y-3">
            {/* Your Position */}
            <div className="pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full border-2 border-blue-500 bg-gray-300 flex-shrink-0 shadow-md" />
                <span className="text-gray-700 text-xs">Votre position (halo bleu)</span>
              </div>
            </div>

            {/* Teams List */}
            <div className="space-y-1.5">
              <p className="font-medium text-gray-700 text-xs mb-2">Équipes (cliquez pour voir):</p>
              {teams.map((team) => {
                const teamAgentCount = agents.filter(a => a.teamId === team.id).length;
                return (
                  <button
                    key={team.id}
                    onClick={() => {
                      if (onTeamClick && typeof onTeamClick === 'function') {
                        onTeamClick(team.id);
                      }
                    }}
                    className="w-full flex items-center gap-2 p-1.5 rounded hover:bg-gray-100 transition-colors group"
                  >
                    <div 
                      className="size-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: teamAgentCount === 0 ? '#9CA3AF' : team.color }} 
                    />
                    <span className="text-gray-700 text-xs flex-1 text-left">
                      {team.name}
                      {teamAgentCount === 0 && ' (non couverte)'}
                    </span>
                    <svg className="size-3 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
