import { Home, Briefcase, User, MessageCircle, Users } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const { isOnboarded } = useUser();
  const homeHref = isOnboarded ? '/discover' : '/';

  const navItems = [
    { href: homeHref, icon: Home, label: t.nav.home },
    { href: '/discover', icon: Briefcase, label: t.nav.discover },
    { href: '/profile', icon: User, label: t.nav.profile },
    { href: '/messages', icon: MessageCircle, label: t.nav.messages, badge: true },
    { href: '/rooms', icon: Users, label: t.nav.rooms },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full gap-1 relative transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge && (
                <div className="absolute top-2 right-1/4 w-2 h-2 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
