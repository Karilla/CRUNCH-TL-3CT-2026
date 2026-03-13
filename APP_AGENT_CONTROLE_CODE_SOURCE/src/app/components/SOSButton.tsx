import { useState } from 'react';
import { AlertTriangle, X, Send, MapPin, Users, Clock } from 'lucide-react';
import { agents, teams, CURRENT_USER_ID } from '../data/mockData';

export function SOSButton() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');

  // Get current user info
  const currentUser = agents.find(a => a.id === CURRENT_USER_ID);
  const currentTeam = teams.find(t => t.id === currentUser?.teamId);
  const currentTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const handleSOSClick = () => {
    setShowConfirm(true);
    setMessage(''); // Reset message when opening
  };

  const handleConfirmSOS = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setShowConfirm(false);
      setMessage(''); // Reset message after sending
    }, 3000);
  };

  return (
    <>
      {/* SOS Button - positioned on the right side */}
      <button
        onClick={handleSOSClick}
        className="fixed bottom-24 right-6 z-[1500] size-16 rounded-full bg-red-600 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 animate-pulse md:bottom-6 md:right-6"
      >
        <AlertTriangle className="size-8 text-white" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[2000] flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white rounded-t-2xl md:rounded-2xl w-full md:max-w-md max-h-[90vh] md:max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-6" style={{ color: 'var(--tl-red)' }} />
                <h2 className="font-semibold text-lg">Alerte SOS</h2>
              </div>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isSent}
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-4">
              {!isSent ? (
                <div className="space-y-4">
                  {/* Warning message */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-900">
                      Vous êtes sur le point d'envoyer une <strong>alerte d'urgence</strong> aux agents de sécurité et aux membres de votre équipe.
                    </p>
                    <p className="text-sm text-red-900 mt-2">
                      Cette action doit être utilisée uniquement en cas de <strong>situation problématique grave</strong> nécessitant une assistance immédiate.
                    </p>
                  </div>

                  {/* Automatic information */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Informations envoyées automatiquement :</h3>
                    
                    <div className="space-y-3">
                      {/* Location */}
                      <div className="flex items-start gap-3">
                        <MapPin className="size-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-gray-700">Localisation actuelle</p>
                          <p className="text-sm text-gray-900">{currentUser?.currentLocation || 'Position inconnue'}</p>
                          <p className="text-xs text-gray-500">Zone: {currentUser?.currentZone || 'Non définie'}</p>
                        </div>
                      </div>

                      {/* Team */}
                      <div className="flex items-start gap-3">
                        <Users className="size-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-gray-700">Équipe concernée</p>
                          <div className="flex items-center gap-2">
                            <div 
                              className="size-3 rounded-full" 
                              style={{ backgroundColor: currentTeam?.color || '#9CA3AF' }}
                            />
                            <p className="text-sm text-gray-900">{currentTeam?.name || 'Équipe inconnue'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex items-start gap-3">
                        <Clock className="size-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-gray-700">Heure de l'alerte</p>
                          <p className="text-sm text-gray-900">{currentTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Optional message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Message (optionnel)
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                      rows={3}
                      placeholder="Ex: Besoin de renfort, incident avec un passager, situation tendue..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={isSent}
                    />
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="size-16 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="size-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Alerte envoyée !</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Votre alerte a été transmise avec succès.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                    <p className="text-sm text-blue-900 font-medium mb-2">Destinataires notifiés :</p>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="size-1.5 rounded-full bg-blue-600"></div>
                        Agents de sécurité
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="size-1.5 rounded-full bg-blue-600"></div>
                        Membres de votre équipe ({currentTeam?.name})
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with buttons - only visible when not sent */}
            {!isSent && (
              <div className="border-t border-gray-200 p-4 flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={handleConfirmSOS}
                  className="w-full px-4 py-3.5 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{ backgroundColor: 'var(--tl-red)' }}
                  disabled={isSent}
                >
                  <Send className="size-5" />
                  Envoyer l'alerte
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isSent}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}