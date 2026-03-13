import { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Clock, Users, MapPin, Shield, LogOut, AlertTriangle, RefreshCw, Cake, ArrowRight } from 'lucide-react';
import { agents, controlZones, CURRENT_USER_ID, teams } from '../data/mockData';
import tlLogo from 'figma:asset/a07c7fbb0fe7e417ac0889a14df7e5ce24192732.png';
import { AlertPopup } from './AlertPopup';
import { DailyPlanning } from './DailyPlanning';
import { ZoneDetailModal } from './ZoneDetailModal';
import { ZoneHierarchyView } from './ZoneHierarchyView';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { alerts, stats } from '../data/mockData';

// Footprints Icon Component
const FootprintsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21c0-1.5 1.5-3 3-3s3 1.5 3 3m-6-9c0-1.5 1.5-3 3-3s3 1.5 3 3m-6-9c0-1.5 1.5-3 3-3s3 1.5 3 3" />
  </svg>
);

interface DashboardProps {
  onAlertsClick?: () => void;
  onLogout?: () => void;
  acknowledgedAlertIds?: Set<string>;
  onAcknowledgeAlert?: (alertId: string, message?: string) => void;
}

export function Dashboard({ onAlertsClick, onLogout, acknowledgedAlertIds = new Set(), onAcknowledgeAlert }: DashboardProps) {
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [isStepCounterEnabled, setIsStepCounterEnabled] = useState(true);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(false);
  const [birthdayMessage, setBirthdayMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [networkCoverageState, setNetworkCoverageState] = useState(stats.networkCoverageRate);
  const [selectedMainZone, setSelectedMainZone] = useState<string | null>(null);
  const [selectedSubZone, setSelectedSubZone] = useState<string | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [showZoneHierarchy, setShowZoneHierarchy] = useState(false);
  
  const highPriorityAlerts = alerts.filter(a => a.priority === 'high');
  
  // Get unacknowledged alerts
  const unacknowledgedAlerts = highPriorityAlerts.filter(alert => !acknowledgedAlertIds.has(alert.id));
  const currentAlert = unacknowledgedAlerts.length > 0 ? unacknowledgedAlerts[0] : null;
  
  // Network coverage progress (0-100)
  const networkCoverage = networkCoverageState;
  
  // Calculate remaining zones (example: total 10 zones, coverage 85% = 1-2 zones left)
  const totalZones = 10;
  const zonesRemaining = Math.max(1, Math.round((100 - networkCoverage) / 10));

  // Planning adherence (0-100, represents adherence percentage)
  const planningAdherence = 88; // Example: 88% adherence = 12% deviation

  // Recommended destinations - Plus concrètes avec ligne + arrêt spécifique
  const recommendedDestinations = [
    { 
      line: 'Métro M1', 
      stop: 'UNIL Mouline',
      type: 'metro',
      lineColor: '#E30613',
      priority: 'high',
      reason: '2 arrêts non contrôlés'
    },
    { 
      line: 'Bus 4', 
      stop: 'Pully Centre',
      type: 'bus',
      lineColor: '#22C55E',
      priority: 'medium',
      reason: '3 arrêts non contrôlés'
    }
  ];

  // Main Zones - 3 grandes zones géographiques principales
  const mainZones = [
    {
      id: 'renens-crissier',
      name: 'Renens / Crissier',
      status: 'partially-controlled', // controlled, partially-controlled, not-controlled
      coverage: 75,
      image: 'https://images.unsplash.com/photo-1760987793701-289abfc06e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2l0emVybGFuZCUyMHRyYWluJTIwc3RhdGlvbiUyMG1vZGVybnxlbnwxfHx8fDE3NzMzMTMxODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'flon-hypercentre',
      name: 'Flon / Hypercentre',
      status: 'controlled',
      coverage: 92,
      image: 'https://images.unsplash.com/photo-1671814207528-1fc7faa359b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXVzYW5uZSUyMGNpdHklMjBjZW50ZXIlMjBtZXRyb3xlbnwxfHx8fDE3NzMzMTMxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'pully-lutry',
      name: 'Pully / Lutry',
      status: 'not-controlled',
      coverage: 45,
      image: 'https://images.unsplash.com/photo-1657469181380-53d718f7742c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWxseSUyMGx1dHJ5JTIwbGFrZSUyMGdlbmV2YXxlbnwxfHx8fDE3NzMzMTMxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
  ];

  // Helper function to get status info
  const getZoneStatusInfo = (status: string) => {
    switch (status) {
      case 'controlled':
        return {
          color: '#10b981',
          label: 'Zone contrôlée',
          icon: '🟢'
        };
      case 'partially-controlled':
        return {
          color: '#f59e0b',
          label: 'Zone partiellement contrôlée',
          icon: '🟠'
        };
      case 'not-controlled':
        return {
          color: '#ef4444',
          label: 'Zone non contrôlée',
          icon: '🔴'
        };
      default:
        return {
          color: '#9ca3af',
          label: 'Statut inconnu',
          icon: '⚪'
        };
    }
  };

  // Birthday agent (example)
  const birthdayAgent = agents.find(a => a.id === 'a3'); // Marc Durand as example

  // Daily steps counter
  const dailySteps = 7240;

  const handleAlertClick = () => {
    setShowAlertPopup(true);
  };

  const handleSendBirthdayWish = () => {
    if (!messageSent) {
      setShowBirthdayMessage(true);
    }
  };

  const handleConfirmBirthdayMessage = () => {
    // Simulate sending message
    setMessageSent(true);
    setShowBirthdayMessage(false);
    setBirthdayMessage('');
    // Message could be sent to backend here
  };

  // Calculate progress bar color for planning adherence
  const getAdherenceColor = (adherence: number) => {
    if (adherence >= 80) return 'from-green-600 to-green-500'; // Good adherence
    if (adherence >= 70) return 'from-orange-600 to-orange-500'; // Near threshold (80% = 20% deviation)
    return 'from-red-600 to-red-500'; // Poor adherence
  };

  // Handle refresh with animation
  const handleRefreshCoverage = () => {
    setIsRefreshing(true);
    
    // Simulate refresh after 1.5 seconds
    setTimeout(() => {
      // Randomly improve coverage by 2-5%
      const improvement = Math.floor(Math.random() * 4) + 2;
      const newCoverage = Math.min(100, networkCoverageState + improvement);
      setNetworkCoverageState(newCoverage);
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <div className="bg-white md:border-l border-gray-200 w-full md:w-80 lg:w-96 h-full overflow-y-auto flex-shrink-0">
      <div className="p-4 border-b border-gray-200" style={{ backgroundColor: 'var(--tl-red)' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-white rounded-lg p-2 flex items-center justify-center">
            <img src={tlLogo} alt="tl logo" className="h-8 w-auto object-contain" />
          </div>
          <div className="flex-1">
            <h1 className="text-white text-lg mb-0">Contrôle CCCT</h1>
            <p className="text-white/90 text-xs">Plateforme de coordination</p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="size-5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Alerts Banner - More Visible */}
      {currentAlert && (
        <button
          onClick={handleAlertClick}
          className="w-full bg-gradient-to-r from-red-600 to-red-500 border-b-4 border-red-700 p-4 hover:from-red-700 hover:to-red-600 transition-all text-left shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2.5 rounded-xl animate-pulse">
              <AlertTriangle className="size-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-white mb-1">
                {unacknowledgedAlerts.length} ALERTE{unacknowledgedAlerts.length > 1 ? 'S' : ''} PRIORITAIRE{unacknowledgedAlerts.length > 1 ? 'S' : ''}
              </p>
              <p className="text-sm text-white/90 truncate font-medium">
                {currentAlert.title}
              </p>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <svg
                className="size-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      )}

      <div className="p-4 space-y-5">
        {/* Mon Planning du Jour */}
        <DailyPlanning compact={true} />

        {/* 1. Network Coverage + Recommended Directions (Combined) */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-blue-900">Couverture réseau aujourd'hui</h3>
            <button
              onClick={handleRefreshCoverage}
              disabled={isRefreshing}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
              title="Actualiser la couverture"
            >
              <RefreshCw className={`size-4 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <p className="text-lg font-bold text-blue-800 mb-3">
            Encore {zonesRemaining} zone{zonesRemaining > 1 ? 's' : ''} à couvrir
          </p>
          
          {/* Progress Bar - Added */}
          <div className="w-full bg-blue-200 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${networkCoverage}%` }}
            />
          </div>
          
          {/* Recommended Directions integrated */}
          <div className="border-t border-blue-300 pt-3">
            <p className="text-sm font-semibold text-blue-900 mb-2">Directions recommandées</p>
            <div className="space-y-2">
              {recommendedDestinations.map((destination, index) => (
                <div
                  key={index}
                  className="bg-white/70 border border-blue-300 rounded-lg p-2.5 hover:bg-white hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <ArrowRight className="size-4 flex-shrink-0" style={{ color: 'var(--tl-red)' }} />
                    <span className="text-sm font-semibold text-gray-900">{destination.line} - {destination.stop}</span>
                    {destination.priority === 'high' && (
                      <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">
                        Prioritaire
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. État des zones - 3 Grandes zones principales */}
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-3">État des zones</h2>
          <div className="space-y-3">
            {mainZones.map((zone) => {
              const statusInfo = getZoneStatusInfo(zone.status);
              
              return (
                <button
                  key={zone.id}
                  onClick={() => {
                    setSelectedMainZone(zone.id);
                    setShowZoneHierarchy(true);
                  }}
                  className="relative w-full rounded-xl overflow-hidden border-2 hover:scale-[1.02] transition-transform cursor-pointer shadow-md"
                  style={{ borderColor: statusInfo.color }}
                >
                  <div className="relative h-32">
                    <ImageWithFallback
                      src={zone.image}
                      alt={zone.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Zone Info Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white text-base font-bold">{zone.name}</h3>
                        <div
                          className="size-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: statusInfo.color }}
                        >
                          <MapPin className="size-4 text-white" />
                        </div>
                      </div>
                      
                      {/* Status and Coverage */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-lg">{statusInfo.icon}</span>
                          <span className="text-white text-xs font-medium">{statusInfo.label}</span>
                        </div>
                        <span className="text-white text-sm font-bold">{zone.coverage}%</span>
                      </div>
                      
                      {/* Mini Progress Bar */}
                      <div className="w-full bg-white/20 rounded-full h-1.5 mt-2">
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{ 
                            width: `${zone.coverage}%`,
                            backgroundColor: statusInfo.color
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-3 flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-base">🟢</span>
              <span className="text-gray-600">Contrôlée</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">🟠</span>
              <span className="text-gray-600">Partielle</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">🔴</span>
              <span className="text-gray-600">Non contrôlée</span>
            </div>
          </div>
        </div>

        {/* 3. Planning Adherence - Redesigned */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-4">
          <h3 className="text-base font-bold text-green-900 mb-1">Adhésion à la planification</h3>
          <p className="text-sm text-green-700 mb-3">Actuel : {planningAdherence}%</p>
          
          <div className="relative w-full bg-gray-200 rounded-full h-5 mb-2 overflow-hidden">
            {/* Red threshold line at 80% (20% deviation threshold) */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-red-400/60 z-10"
              style={{ left: '80%' }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-red-600 font-medium whitespace-nowrap">
                seuil 80%
              </div>
            </div>
            
            {/* Progress bar */}
            <div
              className={`h-5 rounded-full transition-all duration-500 bg-gradient-to-r ${getAdherenceColor(planningAdherence)}`}
              style={{ width: `${planningAdherence}%` }}
            />
          </div>
          
          <p className="text-xs text-gray-600 text-center">
            {planningAdherence >= 80 
              ? '✓ Planification respectée' 
              : planningAdherence >= 70
              ? '⚠️ Attention : proche du seuil'
              : '❌ Écarts importants détectés'
            }
          </p>
        </div>

        {/* 4. Daily Steps Widget with Toggle */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-indigo-500 p-3 rounded-xl">
              <FootprintsIcon className="size-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-indigo-900">🚶 Activité du jour</p>
              <p className="text-2xl font-bold text-indigo-800">
                {isStepCounterEnabled ? dailySteps.toLocaleString() : '—'} pas
              </p>
            </div>
          </div>
          
          {/* Toggle */}
          <div className="flex items-center justify-between pt-3 border-t border-indigo-300">
            <span className="text-sm text-indigo-900 font-medium">Activer le comptage</span>
            <button
              onClick={() => setIsStepCounterEnabled(!isStepCounterEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isStepCounterEnabled ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isStepCounterEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 5. Birthday Widget */}
        {birthdayAgent && (
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-300 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Cake className="size-6 text-pink-600" />
              <h3 className="text-base font-bold text-pink-900">🎂 Anniversaire du jour</h3>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src={birthdayAgent.photo}
                alt={birthdayAgent.name}
                className="size-12 rounded-full border-2 border-pink-300 object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{birthdayAgent.name.split(' ')[0]}</p>
                <p className="text-xs text-gray-600">Bon anniversaire ! 🎉</p>
              </div>
            </div>
            {!messageSent ? (
              <button
                className="w-full py-2 px-4 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors"
                onClick={handleSendBirthdayWish}
              >
                Envoyer un 🎉
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 py-2 px-4 bg-green-100 border-2 border-green-300 text-green-700 text-sm font-semibold rounded-lg">
                <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Message envoyé !
              </div>
            )}
          </div>
        )}
      </div>

      {/* Birthday Message Modal */}
      {showBirthdayMessage && birthdayAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-400 p-5 rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Cake className="size-7 text-white" />
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold mb-1">Message d'anniversaire</h2>
                  <p className="text-white/90 text-sm">Pour {birthdayAgent.name.split(' ')[0]}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4 p-3 bg-pink-50 rounded-lg border border-pink-200">
                <img
                  src={birthdayAgent.photo}
                  alt={birthdayAgent.name}
                  className="size-14 rounded-full border-2 border-pink-300 object-cover"
                />
                <div>
                  <p className="font-bold text-gray-900">{birthdayAgent.name}</p>
                  <p className="text-sm text-gray-600">🎂 Bon anniversaire !</p>
                </div>
              </div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Votre message personnel
              </label>
              <textarea
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none resize-none"
                rows={4}
                value={birthdayMessage}
                onChange={(e) => setBirthdayMessage(e.target.value)}
                placeholder="Écrivez votre message d'anniversaire ici... 🎉"
              />
              <p className="text-xs text-gray-500 mt-1">
                {birthdayMessage.length}/200 caractères
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-2xl space-y-2">
              <button
                onClick={handleConfirmBirthdayMessage}
                disabled={!birthdayMessage.trim()}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  birthdayMessage.trim()
                    ? 'bg-pink-500 hover:bg-pink-600 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Envoyer le message 🎉
              </button>
              <button
                onClick={() => {
                  setShowBirthdayMessage(false);
                  setBirthdayMessage('');
                }}
                className="w-full py-2 px-4 rounded-lg font-semibold transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert Popup */}
      {showAlertPopup && currentAlert && (
        <AlertPopup
          alert={currentAlert}
          onClose={() => setShowAlertPopup(false)}
          totalAlerts={unacknowledgedAlerts.length}
          onAcknowledge={() => {
            if (onAcknowledgeAlert) {
              onAcknowledgeAlert(currentAlert.id, birthdayMessage);
            }
          }}
        />
      )}
      
      {/* Zone Detail Modal */}
      {selectedZone && (
        <ZoneDetailModal
          zoneName={selectedZone}
          onClose={() => setSelectedZone(null)}
        />
      )}

      {/* Zone Hierarchy View */}
      {showZoneHierarchy && (
        <ZoneHierarchyView
          onClose={() => {
            setShowZoneHierarchy(false);
            setSelectedMainZone(null);
          }}
          initialZoneId={selectedMainZone}
        />
      )}
    </div>
  );
}