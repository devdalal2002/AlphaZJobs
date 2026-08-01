import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/data/mock-data';

const STORAGE_KEY = 'alphazjobs.user';
const SAVED_JOBS_KEY = 'alphazjobs.savedJobIds';
const APPLIED_JOBS_KEY = 'alphazjobs.appliedJobIds';

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
  savedJobIds: string[];
  appliedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  applyToJob: (jobId: string) => void;
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

function loadStoredIds(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadStoredUser());
  const [isOnboarded, setIsOnboarded] = useState(() => loadStoredUser() !== null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => loadStoredIds(SAVED_JOBS_KEY));
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => loadStoredIds(APPLIED_JOBS_KEY));

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

  useEffect(() => {
    try {
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(savedJobIds));
    } catch {
      // ignore
    }
  }, [savedJobIds]);

  useEffect(() => {
    try {
      localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(appliedJobIds));
    } catch {
      // ignore
    }
  }, [appliedJobIds]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const applyToJob = (jobId: string) => {
    setAppliedJobIds((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  };

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
    savedJobIds,
    appliedJobIds,
    toggleSaveJob,
    applyToJob,
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
