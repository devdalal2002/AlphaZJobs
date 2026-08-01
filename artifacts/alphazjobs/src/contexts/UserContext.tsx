import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/data/mock-data';

interface OnboardingData {
  name: string;
  age: number;
  bio: string;
  skills: string[];
  interests: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isOnboarded: boolean;
  completeOnboarding: (data: OnboardingData) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

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
