import { useState } from 'react';
import { Send, AlertTriangle, Users, LogOut, Shield } from 'lucide-react';
import { chatMessages, agents, CURRENT_USER_ID, teams, managers, type ChatMessage } from '../data/mockData';

interface ChatViewProps {
  onAgentClick: (agentId: string) => void;
  onLogout?: () => void;
}

// Manager color - distinct from team red
const MANAGER_COLOR = '#58585A'; // TL grey color

export function ChatView({ onAgentClick, onLogout }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [newMessage, setNewMessage] = useState('');

  const currentUser = agents.find((a) => a.id === CURRENT_USER_ID);
  const currentTeam = currentUser ? teams.find((t) => t.id === currentUser.teamId) : null;
  const teamMembers = currentUser ? agents.filter((a) => a.teamId === currentUser.teamId) : [];
  const activeMembers = teamMembers.filter((m) => m.status === 'active').length;
  
  // Combine team members and managers for display
  const allParticipants = [...teamMembers, ...managers];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentUser) return;

    const message: ChatMessage = {
      id: `msg${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      message: newMessage,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      type: 'message',
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!currentUser || !currentTeam) return null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-3 border-b border-gray-200" style={{ backgroundColor: `${currentTeam.color}` }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div 
              className="size-10 rounded-full flex items-center justify-center bg-white/20"
            >
              <Users className="size-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-lg">{currentTeam.name}</h1>
              <p className="text-xs text-white/90">
                {activeMembers} membre{activeMembers > 1 ? 's' : ''} actif{activeMembers > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          {onLogout && (
            <button 
              onClick={onLogout}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              title="Déconnexion"
            >
              <LogOut className="size-5 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Team Members Strip */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {allParticipants.map((member) => {
            const statusColor =
              member.status === 'active'
                ? 'border-green-500'
                : member.status === 'transit'
                ? 'border-blue-500'
                : 'border-gray-400';

            return (
              <button
                key={member.id}
                onClick={() => onAgentClick(member.id)}
                className="flex flex-col items-center gap-1 flex-shrink-0"
              >
                <div className="relative">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className={`size-14 rounded-full object-cover border-3 ${statusColor}`}
                  />
                  {member.id === CURRENT_USER_ID && (
                    <div className="absolute bottom-0 right-0 size-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">ME</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-700 max-w-[60px] truncate">
                  {member.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Messages - Added pb-32 to account for input bar + bottom navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-32">
        {messages.map((msg) => {
          const isCurrentUser = msg.senderId === CURRENT_USER_ID;
          const sender = [...agents, ...managers].find((a) => a.id === msg.senderId);
          const isManager = sender?.isManager || false;

          if (msg.type === 'alert') {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 flex items-center gap-2 max-w-xs">
                  <AlertTriangle className="size-4 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-yellow-900">{msg.message}</p>
                    <p className="text-[10px] text-yellow-700 mt-0.5">{msg.time}</p>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
            >
              {!isCurrentUser && sender && (
                <div className="relative">
                  <img
                    src={sender.photo}
                    alt={sender.name}
                    className="size-8 rounded-full object-cover flex-shrink-0"
                  />
                  {isManager && (
                    <div className="absolute -bottom-1 -right-1 size-4 bg-gray-700 rounded-full border-2 border-white flex items-center justify-center">
                      <Shield className="size-2.5 text-white" />
                    </div>
                  )}
                </div>
              )}
              <div className={`max-w-[75%] ${isCurrentUser ? 'order-first' : ''}`}>
                {!isCurrentUser && (
                  <div className="flex items-center gap-1.5 mb-1 px-3">
                    <p className="text-[10px] text-gray-600">{msg.senderName}</p>
                    {isManager && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-blue-600 text-white font-semibold">
                        Gestionnaire opérationnel
                      </span>
                    )}
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    isCurrentUser
                      ? 'rounded-br-sm'
                      : 'rounded-bl-sm'
                  }`}
                  style={
                    isCurrentUser
                      ? { backgroundColor: currentTeam.color, color: 'white' }
                      : isManager
                      ? { backgroundColor: MANAGER_COLOR, color: 'white' }
                      : { backgroundColor: '#F3F4F6', color: '#1F2937' }
                  }
                >
                  <p className="text-sm break-words">{msg.message}</p>
                </div>
                <p className={`text-[10px] text-gray-500 mt-1 px-3 ${isCurrentUser ? 'text-right' : ''}`}>
                  {msg.time}
                </p>
              </div>
              {isCurrentUser && sender && (
                <img
                  src={sender.photo}
                  alt={sender.name}
                  className="size-8 rounded-full object-cover flex-shrink-0"
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Input Bar - Fixed at bottom, positioned above bottom navigation with proper spacing */}
      <div className="fixed bottom-20 left-0 right-0 border-t border-gray-200 bg-white p-3 pb-safe shadow-lg z-10">
        <div className="flex items-center gap-2 max-w-screen-xl mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Écrivez un message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:bg-gray-50 focus:ring-2 focus:ring-offset-0 transition-all"
            style={{ 
              focusRingColor: currentTeam.color 
            }}
            autoComplete="off"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="size-11 rounded-full flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md active:scale-95 flex-shrink-0"
            style={{ backgroundColor: newMessage.trim() ? currentTeam.color : '#9CA3AF' }}
            aria-label="Envoyer le message"
          >
            <Send className="size-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}