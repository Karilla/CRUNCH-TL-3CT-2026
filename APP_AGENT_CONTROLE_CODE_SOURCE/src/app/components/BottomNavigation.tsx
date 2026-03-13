import { MapIcon, MessageCircle, Home, Bell } from 'lucide-react';

interface BottomNavigationProps {
  activeView: 'home' | 'map' | 'chat' | 'alerts';
  onViewChange: (view: 'home' | 'map' | 'chat' | 'alerts') => void;
  unreadCount?: number;
  alertCount?: number;
}

export function BottomNavigation({ activeView, onViewChange, unreadCount = 0, alertCount = 0 }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[2000] bg-white/95 backdrop-blur-lg border-t border-gray-200/50 safe-area-inset-bottom shadow-lg">
      <div className="flex items-center justify-around px-2 py-2 max-w-screen-xl mx-auto">
        {/* Accueil Button */}
        <button
          onClick={() => onViewChange('home')}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[60px] ${
            activeView === 'home'
              ? 'text-red-600'
              : 'text-gray-500'
          }`}
        >
          <Home className={`size-6 ${activeView === 'home' ? 'fill-current' : ''}`} />
          <span className={`text-[10px] font-medium ${activeView === 'home' ? 'font-semibold' : ''}`}>
            Accueil
          </span>
        </button>

        {/* Carte Button */}
        <button
          onClick={() => onViewChange('map')}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[60px] ${
            activeView === 'map'
              ? 'text-red-600'
              : 'text-gray-500'
          }`}
        >
          <MapIcon className={`size-6 ${activeView === 'map' ? 'fill-current' : ''}`} />
          <span className={`text-[10px] font-medium ${activeView === 'map' ? 'font-semibold' : ''}`}>
            Carte
          </span>
        </button>

        {/* Alertes Button */}
        <button
          onClick={() => onViewChange('alerts')}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all relative min-w-[60px] ${
            activeView === 'alerts'
              ? 'text-red-600'
              : 'text-gray-500'
          }`}
        >
          <div className="relative">
            <Bell className={`size-6 ${activeView === 'alerts' ? 'fill-current' : ''}`} />
            {alertCount > 0 && (
              <div className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">
                  {alertCount > 9 ? '9+' : alertCount}
                </span>
              </div>
            )}
          </div>
          <span className={`text-[10px] font-medium ${activeView === 'alerts' ? 'font-semibold' : ''}`}>
            Alertes
          </span>
        </button>

        {/* Chat Button */}
        <button
          onClick={() => onViewChange('chat')}
          className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all relative min-w-[60px] ${
            activeView === 'chat'
              ? 'text-red-600'
              : 'text-gray-500'
          }`}
        >
          <div className="relative">
            <MessageCircle className={`size-6 ${activeView === 'chat' ? 'fill-current' : ''}`} />
            {unreadCount > 0 && (
              <div className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[9px] font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </div>
            )}
          </div>
          <span className={`text-[10px] font-medium ${activeView === 'chat' ? 'font-semibold' : ''}`}>
            Chat
          </span>
        </button>
      </div>
    </div>
  );
}