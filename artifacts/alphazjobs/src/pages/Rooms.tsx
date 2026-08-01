import { useState } from 'react';
import { Users, ArrowLeft, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { rooms, Room, Message } from '@/data/mock-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

type RoomMessages = Record<string, Message[]>;

function formatTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Rooms() {
  const { t } = useLanguage();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Store mutable messages per room, initialized from mock data
  const [roomMessages, setRoomMessages] = useState<RoomMessages>(() =>
    Object.fromEntries(rooms.map((r) => [r.id, [...r.messages]]))
  );

  const currentMessages = selectedRoom ? (roomMessages[selectedRoom.id] ?? []) : [];

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!text || !selectedRoom) return;

    const newMsg: Message = {
      id: String(Date.now()),
      sender: 'You',
      content: text,
      timestamp: formatTime(),
      isMe: true,
    };

    setRoomMessages((prev) => ({
      ...prev,
      [selectedRoom.id]: [...(prev[selectedRoom.id] ?? []), newMsg],
    }));

    setMessageInput('');
  };

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8 md:pt-16">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {!selectedRoom ? (
            <motion.div
              key="room-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-4xl font-black mb-2">{t.nav.rooms}</h1>
              <p className="text-muted-foreground mb-8">
                {t.headings.roomsSub}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all cursor-pointer group"
                    onClick={() => setSelectedRoom(room)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                          {room.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {room.description}
                        </p>
                      </div>
                      <Users className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-2" />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {room.members.toLocaleString()} members
                      </Badge>
                    </div>

                    <div className="bg-muted rounded-lg p-3 mb-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        {room.recentMessageAuthor}
                      </p>
                      <p className="text-sm">{room.recentMessage}</p>
                    </div>

                    <Button className="w-full" variant="outline">
                      {t.messages.joinRoom}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="room-chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-[calc(100dvh-200px)]"
            >
              {/* Room Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedRoom(null)}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <h2 className="text-2xl font-black">{selectedRoom.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedRoom.members.toLocaleString()} members
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 bg-card border border-border rounded-lg p-6 overflow-y-auto mb-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex',
                        message.isMe ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[70%]',
                          message.isMe ? 'text-right' : 'text-left'
                        )}
                      >
                        <p className="text-xs text-muted-foreground mb-1">
                          {message.sender} · {message.timestamp}
                        </p>
                        <div
                          className={cn(
                            'rounded-lg p-3 inline-block',
                            message.isMe
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          )}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  placeholder={t.messages.sendMessage}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}
