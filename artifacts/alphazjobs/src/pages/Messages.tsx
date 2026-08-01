import { useState } from 'react';
import { Send, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/UserAvatar';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { conversations, Message } from '@/data/mock-data';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

type ConvMessages = Record<string, Message[]>;

const initialMessages: ConvMessages = {
  '1': [
    { id: '1', sender: 'Jenna Creates', content: "Hey! I saw your portfolio and I'm really impressed with your work.", isMe: false, timestamp: '10:23 AM' },
    { id: '2', sender: 'Jenna Creates', content: "I'm looking for a video editor for my TikTok content. Interested?", isMe: false, timestamp: '10:24 AM' },
    { id: '3', sender: 'You', content: "Hey Jenna! Thanks for reaching out. I'd love to hear more about it!", isMe: true, timestamp: '10:26 AM' },
    { id: '4', sender: 'Jenna Creates', content: "Awesome! I'm posting 3-4 times a week. Can you handle quick turnarounds?", isMe: false, timestamp: '10:28 AM' },
    { id: '5', sender: 'You', content: "Definitely! I work fast and I'm familiar with trending audio.", isMe: true, timestamp: '10:30 AM' },
  ],
  '2': [
    { id: '1', sender: 'AppStudio Recruiter', content: 'Hi! We came across your profile and love what we saw.', isMe: false, timestamp: '9:00 AM' },
    { id: '2', sender: 'AppStudio Recruiter', content: 'We love your Figma work! Would you be open to a quick chat?', isMe: false, timestamp: '9:01 AM' },
  ],
  '3': [
    { id: '1', sender: 'Sam', content: 'yo did you see that AppStudio posting?', isMe: false, timestamp: '3:00 PM' },
    { id: '2', sender: 'Sam', content: 'Yo you applying to that AppStudio role?', isMe: false, timestamp: '3:02 PM' },
  ],
};

function formatTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Messages() {
  const { t } = useLanguage();
  const { user } = useUser();
  const isMinor = user ? user.age < 18 : false;

  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [allMessages, setAllMessages] = useState<ConvMessages>(initialMessages);
  const [convList, setConvList] = useState(conversations);

  const currentMessages = allMessages[selectedConversation.id] ?? [];

  const handleSendMessage = () => {
    const text = messageInput.trim();
    if (!text) return;

    const newMsg: Message = {
      id: String(Date.now()),
      sender: 'You',
      content: text,
      timestamp: formatTime(),
      isMe: true,
    };

    setAllMessages((prev) => ({
      ...prev,
      [selectedConversation.id]: [...(prev[selectedConversation.id] ?? []), newMsg],
    }));

    setConvList((prev) =>
      prev.map((c) =>
        c.id === selectedConversation.id
          ? { ...c, lastMessage: text, unread: false }
          : c
      )
    );

    setMessageInput('');
  };

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8 md:pt-16">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-black mb-8">{t.nav.messages}</h1>

        {isMinor && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Restricted mode: </span>
              Only mentors and verified employers can message you directly. You can only message back people in shared Rooms.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100dvh-200px)]">
          {/* Conversation List */}
          <div className="md:col-span-1 space-y-2 overflow-y-auto">
            {convList.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all',
                  selectedConversation.id === conversation.id
                    ? 'bg-primary/10 border border-primary/30'
                    : 'bg-card border border-border hover:border-primary/50'
                )}
              >
                <UserAvatar name={conversation.name} className="w-12 h-12" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-semibold truncate">{conversation.name}</h3>
                    {conversation.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {allMessages[conversation.id]?.at(-1)?.content ?? conversation.lastMessage}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {conversation.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Active Chat */}
          <div className="md:col-span-2 flex flex-col bg-card border border-border rounded-lg overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <UserAvatar name={selectedConversation.name} className="w-10 h-10" />
                <div>
                  <h3 className="font-semibold">{selectedConversation.name}</h3>
                  <p className="text-xs text-muted-foreground">Active now</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
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
                      'max-w-[70%] rounded-lg p-3',
                      message.isMe
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={cn(
                        'text-xs mt-1',
                        message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
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
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
