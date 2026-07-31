import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name: string;
  className?: string;
}

export function UserAvatar({ name, className }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Avatar className={cn('bg-primary text-primary-foreground', className)}>
      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
