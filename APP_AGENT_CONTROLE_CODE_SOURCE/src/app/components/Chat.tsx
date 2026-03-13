import { useState } from 'react';
import { MessageCircle, Send, AlertTriangle, MessageSquare, X, Users } from 'lucide-react';
import { chatMessages, agents, CURRENT_USER_ID, teams, type ChatMessage } from '../data/mockData';

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [newMessage, setNewMessage] = useState('');

  const currentUser = agents.find((a) => a.id === CURRENT_USER_ID);
  const currentTeam = currentUser ? teams.find((t) => t.id === currentUser.teamId) : null;
  const teamMembers = currentUser ? agents.filter((a) => a.teamId === currentUser.teamId) : [];

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
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 md:bottom-6 right-6 z-[1000] size-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        style={{ backgroundColor: currentTeam.color }}
      >
        {isOpen ? (
          <X className="size-6 text-white" />
        ) : (
          <>
            <MessageCircle className="size-6 text-white" />
            <div className="absolute -top-1 -right-1 size-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-gray-900">
              {messages.filter((m) => m.type === 'alert' || m.senderId !== CURRENT_USER_ID).length}
            </div>
          </>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-28 md:bottom-24 right-6 z-[1000] w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200" style={{ backgroundColor: currentTeam.color }}>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="size-5 text-white" />
              <h3 className="font-semibold text-white flex-1">{currentTeam.name}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="size-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-white/90 flex items-center gap-1">
              <Users className="size-3" />
              {teamMembers.length} membres en ligne
            </p>
          </div>

          {/* Team Members Preview */}
          <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
            <div className="flex -space-x-2">
              {teamMembers.slice(0, 5).map((member) => (
                <img
                  key={member.id}
                  src={member.photo}
                  alt={member.name}
                  className="size-8 rounded-full border-2 border-white object-cover"
                  title={member.name}
                />
              ))}
              {teamMembers.length > 5 && (
                <div className="size-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
                  +{teamMembers.length - 5}
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => {
              const isOwnMessage = msg.senderId === CURRENT_USER_ID;
              const isAlert = msg.type === 'alert';

              if (isAlert) {
                return (
                  <div
                    key={msg.id}
                    className="bg-yellow-50 border border-yellow-300 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="size-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-900">{msg.senderName}</p>
                        <p className="text-sm text-yellow-800 mt-1">{msg.message}</p>
                        <p className="text-xs text-yellow-600 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 ${
                      isOwnMessage
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {!isOwnMessage && (
                      <p className="text-xs font-medium mb-1 opacity-75">{msg.senderName}</p>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwnMessage ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Envoyer un message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                style={{ backgroundColor: 'var(--tl-red)' }}
              >
                <Send className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}