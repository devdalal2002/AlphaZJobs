import { Home, Briefcase, User, MessageCircle, Users, Zap } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

export function TopNav() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const { isOnboarded } = useUser();
  const homeHref = isOnboarded ? '/discover' : '/';

  const navItems = [
    { href: homeHref, icon: Home, label: t.nav.home },
    { href: '/discover', icon: Briefcase, label: t.nav.discover },
    { href: '/profile', icon: User, label: t.nav.profile },
    { href: '/messages', icon: MessageCircle, label: t.nav.messages },
    { href: '/rooms', icon: Users, label: t.nav.rooms },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border hidden md:flex">
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-black text-xl hover:text-primary transition-colors"
        >
          <Zap className="w-5 h-5 text-primary" />
          AlphaZJobs
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
