import { X, Bus, Train, MapPin } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  status: 'controlled' | 'partial' | 'uncontrolled';
}

interface LineDetailModalProps {
  lineName: string;
  lineType: 'bus' | 'metro' | 'train';
  onClose: () => void;
}

export function LineDetailModal({ lineName, lineType, onClose }: LineDetailModalProps) {
  // Mock data for stations
  const stations: Station[] = [
    { id: '1', name: 'Lausanne Gare', status: 'controlled' },
    { id: '2', name: 'Place de la Riponne', status: 'controlled' },
    { id: '3', name: 'Rue de Bourg', status: 'partial' },
    { id: '4', name: 'Place Saint-François', status: 'controlled' },
    { id: '5', name: 'Georgette', status: 'uncontrolled' },
    { id: '6', name: 'Montbenon', status: 'partial' },
    { id: '7', name: 'Tunnel', status: 'controlled' },
    { id: '8', name: 'Ouchy', status: 'uncontrolled' },
  ];

  const getStatusColor = (status: Station['status']) => {
    switch (status) {
      case 'controlled':
        return { bg: 'bg-green-500', border: 'border-green-500', text: 'Contrôlé' };
      case 'partial':
        return { bg: 'bg-orange-500', border: 'border-orange-500', text: 'Partiellement contrôlé' };
      case 'uncontrolled':
        return { bg: 'bg-red-500', border: 'border-red-500', text: 'Non contrôlé / Prioritaire' };
    }
  };

  const getLineColor = () => {
    switch (lineType) {
      case 'bus':
        return 'bg-blue-600';
      case 'metro':
        return 'bg-purple-600';
      case 'train':
        return 'bg-green-600';
    }
  };

  const getLineIcon = () => {
    switch (lineType) {
      case 'bus':
        return <Bus className="size-6" />;
      case 'metro':
        return <Train className="size-6" />;
      case 'train':
        return <Train className="size-6" />;
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`${getLineColor()} p-5 rounded-t-2xl`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                {getLineIcon()}
              </div>
              <div>
                <h2 className="text-white text-xl font-bold mb-1">{lineName}</h2>
                <p className="text-white/90 text-sm">Plan de la ligne • {stations.length} arrêts</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="size-5 text-white" />
            </button>
          </div>
        </div>

        {/* Line Visualization - Scrollable */}
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <div className="min-w-max">
            {/* Horizontal Line */}
            <div className="relative py-8">
              {/* Main Transport Line */}
              <div className={`absolute left-0 right-0 top-1/2 h-1.5 ${getLineColor()} rounded-full`} />
              
              {/* Stations */}
              <div className="relative flex items-center justify-between gap-8 px-4">
                {stations.map((station, index) => {
                  const statusInfo = getStatusColor(station.status);
                  const isFirst = index === 0;
                  const isLast = index === stations.length - 1;
                  
                  return (
                    <div key={station.id} className="flex flex-col items-center min-w-[140px]">
                      {/* Station Name (Above) */}
                      <div className="mb-4 text-center">
                        <p className="text-sm font-bold text-gray-900 mb-1 whitespace-nowrap">
                          {station.name}
                        </p>
                        <p className={`text-xs ${
                          station.status === 'controlled' ? 'text-green-700' :
                          station.status === 'partial' ? 'text-orange-700' :
                          'text-red-700'
                        } font-medium`}>
                          {station.status === 'controlled' ? '✓ Contrôlé' :
                           station.status === 'partial' ? '⚠ Partiel' :
                           '✗ Prioritaire'}
                        </p>
                      </div>
                      
                      {/* Station Point */}
                      <div className="relative z-10">
                        <div 
                          className={`w-6 h-6 rounded-full ${statusInfo.bg} border-4 border-white shadow-lg ring-2 ${statusInfo.border}`}
                        >
                          {(isFirst || isLast) && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <MapPin className="size-4 text-white" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Station Status Detail (Below) */}
                      <div className="mt-4">
                        <div className={`px-3 py-1.5 rounded-full ${
                          station.status === 'controlled' ? 'bg-green-100 text-green-700' :
                          station.status === 'partial' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        } text-xs font-semibold whitespace-nowrap`}>
                          {isFirst && '🚏 Terminus'}
                          {isLast && '🚏 Terminus'}
                          {!isFirst && !isLast && `Arrêt ${index + 1}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="border-t border-gray-200 p-5 bg-white rounded-b-2xl">
          <p className="text-sm font-semibold text-gray-700 mb-3">Légende des contrôles</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-600" />
              <span className="text-gray-700">Arrêt contrôlé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500 border-2 border-orange-600" />
              <span className="text-gray-700">Arrêt partiellement contrôlé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-600" />
              <span className="text-gray-700">Arrêt non contrôlé / Zone prioritaire</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
