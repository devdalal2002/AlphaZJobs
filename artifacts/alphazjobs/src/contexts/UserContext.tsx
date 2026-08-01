import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/data/mock-data';

const STORAGE_KEY = 'alphazjobs.user';

interface OnboardingData {
  name: string;
  age: number;
  bio: string;
  skills: string[];
  interests: string[];
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isOnboarded: boolean;
  completeOnboarding: (data: OnboardingData) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function loadStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadStoredUser());
  const [isOnboarded, setIsOnboarded] = useState(() => loadStoredUser() !== null);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // localStorage unavailable (e.g. private browsing quota) - fail silently, state still works in-memory
    }
  }, [user]);

  const completeOnboarding = (data: OnboardingData) => {
    const newUser: User = {
      id: 'current-user',
      name: data.name,
      age: data.age,
      bio: data.bio,
      skills: data.skills,
      interests: data.interests,
      lookingFor: ['Internship', 'Freelance gig', 'Mentorship'],
      projects: [],
      avatar: data.avatar,
    };
    setUser(newUser);
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
