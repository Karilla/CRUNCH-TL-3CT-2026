import { X, Bus, Train } from 'lucide-react';
import { useState } from 'react';
import { LineDetailModal } from './LineDetailModal';

interface TransitLine {
  id: string;
  name: string;
  type: 'bus' | 'metro' | 'train';
  status: 'compliant' | 'partial' | 'non-compliant';
}

interface ZoneDetailModalProps {
  zoneName: string;
  onClose: () => void;
}

export function ZoneDetailModal({ zoneName, onClose }: ZoneDetailModalProps) {
  const [selectedLine, setSelectedLine] = useState<TransitLine | null>(null);
  
  // Mock data for transit lines in this zone
  const transitLines: TransitLine[] = [
    { id: '1', name: 'Bus 22', type: 'bus', status: 'compliant' },
    { id: '2', name: 'Bus 8', type: 'bus', status: 'partial' },
    { id: '3', name: 'Métro M2', type: 'metro', status: 'compliant' },
    { id: '4', name: 'Métro M1', type: 'metro', status: 'non-compliant' },
    { id: '5', name: 'Train régional', type: 'train', status: 'compliant' },
  ];

  const getStatusColor = (status: TransitLine['status']) => {
    switch (status) {
      case 'compliant':
        return { bg: 'bg-green-500', text: 'Conforme / Contrôlée', border: 'border-green-300' };
      case 'partial':
        return { bg: 'bg-orange-500', text: 'Partiellement contrôlée', border: 'border-orange-300' };
      case 'non-compliant':
        return { bg: 'bg-red-500', text: 'Non conforme / Contrôle manquant', border: 'border-red-300' };
    }
  };

  const getLineIcon = (type: TransitLine['type']) => {
    switch (type) {
      case 'bus':
        return <Bus className="size-5" />;
      case 'metro':
        return <Train className="size-5" />;
      case 'train':
        return <Train className="size-5" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-white text-xl font-bold mb-1">{zoneName}</h2>
                <p className="text-white/90 text-sm">Lignes de transport</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="size-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            {transitLines.map((line) => {
              const statusInfo = getStatusColor(line.status);
              return (
                <button
                  key={line.id}
                  onClick={() => setSelectedLine(line)}
                  className={`w-full border-2 ${statusInfo.border} rounded-lg p-3.5 hover:shadow-md transition-all cursor-pointer text-left`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${statusInfo.bg} p-2.5 rounded-lg text-white`}>
                      {getLineIcon(line.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{line.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2.5 h-2.5 rounded-full ${statusInfo.bg}`} />
                        <p className="text-xs text-gray-600">{statusInfo.text}</p>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl">
            <p className="text-xs font-semibold text-gray-700 mb-2">Légende</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-600">Ligne conforme / contrôlée</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500" />
                <span className="text-gray-600">Ligne partiellement contrôlée</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-gray-600">Ligne non conforme / contrôle manquant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Line Detail Modal */}
      {selectedLine && (
        <LineDetailModal
          lineName={selectedLine.name}
          lineType={selectedLine.type}
          onClose={() => setSelectedLine(null)}
        />
      )}
    </>
  );
}