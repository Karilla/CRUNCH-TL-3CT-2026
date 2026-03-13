import { Menu, Bell, Search, LogOut } from 'lucide-react';
import tlLogo from 'figma:asset/a07c7fbb0fe7e417ac0889a14df7e5ce24192732.png';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  onLogout?: () => void;
}

export function MobileHeader({ title, subtitle, onLogout }: MobileHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200" style={{ backgroundColor: 'var(--tl-red)' }}>
      <div className="flex items-center gap-3">
        <div className="bg-white rounded-lg p-2 flex items-center justify-center">
          <img src={tlLogo} alt="tl logo" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex-1">
          <h1 className="text-white text-lg mb-0">{title}</h1>
          {subtitle && <p className="text-white/90 text-xs">{subtitle}</p>}
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
  );
}