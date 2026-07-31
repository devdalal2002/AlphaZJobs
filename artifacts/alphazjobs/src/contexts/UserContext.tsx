import { createContext, useContext, useState, ReactNode } from 'react';
import { currentUser as defaultUser, User } from '@/data/mock-data';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isOnboarded: boolean;
  completeOnboarding: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  const completeOnboarding = () => {
    setUser(defaultUser);
    setIsOnboarded(true);
  };

  const value = {
    user,
    setUser,
    isOnboarded,
    completeOnboarding,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
