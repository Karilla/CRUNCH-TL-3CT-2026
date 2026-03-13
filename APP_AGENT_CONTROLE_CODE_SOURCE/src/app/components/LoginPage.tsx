import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import tlLogo from 'figma:asset/a07c7fbb0fe7e417ac0889a14df7e5ce24192732.png';

interface LoginPageProps {
  onLogin: (agentNumber: string, password: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [agentNumber, setAgentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agentNumber || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    // Simple validation - accept any agent number between 1001-1030 with password "tl2024"
    const agentNum = parseInt(agentNumber);
    if (agentNum >= 1001 && agentNum <= 1030 && password === 'tl2024') {
      onLogin(agentNumber, password);
    } else {
      setError('Numéro d\'agent ou mot de passe incorrect');
    }
  };

  return (
    <div className="size-full flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-block bg-white rounded-2xl p-4 mb-4 shadow-lg">
            <img src={tlLogo} alt="tl logo" className="h-16 w-auto object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Contrôle CCCT</h1>
          <p className="text-red-100 text-sm">Plateforme de coordination</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Connexion</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Agent Number */}
            <div>
              <label htmlFor="agentNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro d'agent
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  id="agentNumber"
                  type="text"
                  value={agentNumber}
                  onChange={(e) => {
                    setAgentNumber(e.target.value);
                    setError('');
                  }}
                  placeholder="Ex: 1001"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-800 text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-all shadow-lg hover:shadow-xl active:scale-98"
              style={{ backgroundColor: 'var(--tl-red)' }}
            >
              Se connecter
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-2">Informations de test :</p>
            <div className="bg-gray-50 rounded-lg p-3 space-y-1">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Numéro :</span> 1001 à 1030
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Mot de passe :</span> tl2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}