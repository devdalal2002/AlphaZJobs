import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { User, Challenge, Receipt, Job, JobApplication, sampleUsers } from '@/data/mock-data';

const STORAGE_KEY = 'alphazjobs.user';
const SAVED_JOBS_KEY = 'alphazjobs.savedJobIds';
const APPLIED_JOBS_KEY = 'alphazjobs.appliedJobIds';
const RECEIPTS_KEY = 'alphazjobs.receipts';
const EMPLOYER_KEY = 'alphazjobs.isEmployer';
const POSTED_JOBS_KEY = 'alphazjobs.postedJobs';
const POSTED_CHALLENGES_KEY = 'alphazjobs.postedChallenges';
const APPLICATIONS_KEY = 'alphazjobs.applications';

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
  receipts: Receipt[];
  submitChallenge: (challenge: Challenge) => void;
  submitApplication: (job: Job, note: string, showcasedReceipts: Receipt[]) => void;
  isEmployer: boolean;
  toggleEmployerMode: () => void;
  postedJobs: Job[];
  postedChallenges: Challenge[];
  postJob: (job: Omit<Job, 'id'>, challenge?: Omit<Challenge, 'id' | 'postedBy' | 'linkedJobTitle'>) => void;
  applications: JobApplication[];
  applicationsForJob: (jobId: string) => JobApplication[];
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

function loadStoredReceipts(): Receipt[] {
  try {
    const raw = localStorage.getItem(RECEIPTS_KEY);
    return raw ? (JSON.parse(raw) as Receipt[]) : [];
  } catch {
    return [];
  }
}

function loadStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadStoredUser());
  const [isOnboarded, setIsOnboarded] = useState(() => loadStoredUser() !== null);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => loadStoredIds(SAVED_JOBS_KEY));
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => loadStoredIds(APPLIED_JOBS_KEY));
  const [receipts, setReceipts] = useState<Receipt[]>(() => loadStoredReceipts());
  const [isEmployer, setIsEmployer] = useState<boolean>(() => loadStoredJson(EMPLOYER_KEY, false));
  const [postedJobs, setPostedJobs] = useState<Job[]>(() => loadStoredJson(POSTED_JOBS_KEY, [] as Job[]));
  const [postedChallenges, setPostedChallenges] = useState<Challenge[]>(() =>
    loadStoredJson(POSTED_CHALLENGES_KEY, [] as Challenge[])
  );
  const [applications, setApplications] = useState<JobApplication[]>(() =>
    loadStoredJson(APPLICATIONS_KEY, [] as JobApplication[])
  );
  const verifyTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      verifyTimers.current.forEach(clearTimeout);
    };
  }, []);

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

  useEffect(() => {
    try {
      localStorage.setItem(RECEIPTS_KEY, JSON.stringify(receipts));
    } catch {
      // ignore
    }
  }, [receipts]);

  useEffect(() => {
    try {
      localStorage.setItem(EMPLOYER_KEY, JSON.stringify(isEmployer));
    } catch {
      // ignore
    }
  }, [isEmployer]);

  useEffect(() => {
    try {
      localStorage.setItem(POSTED_JOBS_KEY, JSON.stringify(postedJobs));
    } catch {
      // ignore
    }
  }, [postedJobs]);

  useEffect(() => {
    try {
      localStorage.setItem(POSTED_CHALLENGES_KEY, JSON.stringify(postedChallenges));
    } catch {
      // ignore
    }
  }, [postedChallenges]);

  useEffect(() => {
    try {
      localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
    } catch {
      // ignore
    }
  }, [applications]);

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const applyToJob = (jobId: string) => {
    setAppliedJobIds((prev) => (prev.includes(jobId) ? prev : [...prev, jobId]));
  };

  const submitChallenge = (challenge: Challenge) => {
    const receiptId = `receipt-${Date.now()}`;
    const newReceipt: Receipt = {
      id: receiptId,
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      completedFor: challenge.postedBy,
      date: 'Just now',
      skillsProven: challenge.skillsRequired,
      status: 'pending',
    };
    setReceipts((prev) => [newReceipt, ...prev]);

    const timer = setTimeout(() => {
      setReceipts((prev) =>
        prev.map((r) => (r.id === receiptId ? { ...r, status: 'verified' } : r))
      );
    }, 4000);
    verifyTimers.current.push(timer);
  };

  const submitApplication = (job: Job, note: string, showcasedReceipts: Receipt[]) => {
    setAppliedJobIds((prev) => (prev.includes(job.id) ? prev : [...prev, job.id]));
    const application: JobApplication = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      applicantId: user?.id ?? 'current-user',
      applicantName: user?.name ?? 'You',
      applicantAvatar: user?.avatar,
      note,
      receipts: showcasedReceipts,
      appliedAt: 'Just now',
    };
    setApplications((prev) => [application, ...prev]);
  };

  const toggleEmployerMode = () => setIsEmployer((prev) => !prev);

  const postJob = (
    jobData: Omit<Job, 'id'>,
    challengeData?: Omit<Challenge, 'id' | 'postedBy' | 'linkedJobTitle'>
  ) => {
    const jobId = `posted-${Date.now()}`;
    const newJob: Job = { ...jobData, id: jobId };
    setPostedJobs((prev) => [newJob, ...prev]);

    if (challengeData) {
      const linkedChallenge: Challenge = {
        ...challengeData,
        id: `posted-challenge-${Date.now()}`,
        postedBy: jobData.company,
        linkedJobTitle: jobData.title,
      };
      setPostedChallenges((prev) => [linkedChallenge, ...prev]);
    }

    // Seed a couple of sample applicants so the Applicants view isn't empty
    const fakeApplicants = sampleUsers.filter((u) => u.id !== 'alex-chen').slice(0, 2);
    const seededApplications: JobApplication[] = fakeApplicants.map((applicant, i) => ({
      id: `app-seed-${jobId}-${i}`,
      jobId,
      applicantId: applicant.id,
      applicantName: applicant.name,
      applicantAvatar: applicant.avatar,
      note: `Hey! I'd love to bring my ${applicant.skills[0]} experience to ${jobData.company}.`,
      receipts: applicant.receipts ?? [],
      appliedAt: 'Yesterday',
    }));
    setApplications((prev) => [...seededApplications, ...prev]);
  };

  const applicationsForJob = (jobId: string) => applications.filter((a) => a.jobId === jobId);

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
    receipts,
    submitChallenge,
    submitApplication,
    isEmployer,
    toggleEmployerMode,
    postedJobs,
    postedChallenges,
    postJob,
    applications,
    applicationsForJob,
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
