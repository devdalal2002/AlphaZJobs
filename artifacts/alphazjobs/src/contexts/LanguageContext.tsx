import { createContext, useContext, useState, ReactNode } from 'react';

type LanguageType = 'en-chronically-online' | 'en-us';

interface Translations {
  nav: {
    home: string;
    discover: string;
    profile: string;
    messages: string;
    rooms: string;
  };
  buttons: {
    startBuilding: string;
    apply: string;
    save: string;
    explore: string;
    aiMatch: string;
  };
  messages: {
    loading: string;
    matchFound: string;
    noMatches: string;
    joinRoom: string;
    sendMessage: string;
  };
  headings: {
    landingHero1: string;
    landingHero2: string;
    landingSub: string;
    landingTagline: string;
    aiMatchTitle: string;
    aiMatchAnalyzing: string;
    onboarding1Title: string;
    onboarding1Placeholder: string;
    onboarding2Title: string;
    onboarding2Placeholder: string;
    onboarding3Title: string;
    onboarding3Sub: string;
    onboarding4Title: string;
    onboarding4Sub: string;
    onboarding5Title: string;
    onboarding5Sub: string;
    onboardingNext: string;
    onboardingGetStarted: string;
    roomsSub: string;
    settingsTitle: string;
    settingsLangMode: string;
    settingsNotifications: string;
    settingsNotificationsSub: string;
    settingsProfileSection: string;
    settingsAbout: string;
    profileTopSkills: string;
    profileInterests: string;
    profileLookingFor: string;
    profileProjects: string;
  };
  empty: {
    noJobs: string;
    noPeople: string;
    noSkills: string;
    noInterests: string;
  };
  placeholders: {
    searchJobs: string;
    searchPeople: string;
  };
}

const translations: Record<LanguageType, Translations> = {
  'en-chronically-online': {
    nav: {
      home: 'Home',
      discover: 'Slide into opportunities',
      profile: 'Your vibe',
      messages: 'Chop it up',
      rooms: 'The crew',
    },
    buttons: {
      startBuilding: 'Cook your profile',
      apply: 'Slide in',
      save: 'Yeet this',
      explore: 'Peep this',
      aiMatch: 'AI suggests your vibe',
    },
    messages: {
      loading: 'Brewing your matches 🔮',
      matchFound: 'Yo this is giving main character energy',
      noMatches: 'Crickets... try adding more skills 🦗',
      joinRoom: 'Join the crew',
      sendMessage: 'Spill the tea',
    },
    headings: {
      landingHero1: 'Build your career',
      landingHero2: 'your way',
      landingSub: 'creator. dev. designer. data girlie. all paths hit different. find ur bag and connect with ur people.',
      landingTagline: 'For Gen Z & Gen Alpha',
      aiMatchTitle: 'what the AI cooked up for u 🤌',
      aiMatchAnalyzing: 'cooking up ur perfect match rn...',
      onboarding1Title: 'who we talkin to? 👀',
      onboarding1Placeholder: 'drop ur name',
      onboarding2Title: 'how old r u?',
      onboarding2Placeholder: 'ur age',
      onboarding3Title: 'what are you built for?',
      onboarding3Sub: 'pick everything that slaps',
      onboarding4Title: "what's got you buzzin?",
      onboarding4Sub: 'this helps the algo matchmake u',
      onboarding5Title: 'drop ur pfp 📸',
      onboarding5Sub: 'u can skip this ngl',
      onboardingNext: 'next',
      onboardingGetStarted: "let's get it 🚀",
      roomsSub: 'link up with communities that match ur vibe',
      settingsTitle: 'Settings',
      settingsLangMode: 'Language Mode',
      settingsNotifications: 'Notifications',
      settingsNotificationsSub: 'ping me when sth pops off',
      settingsProfileSection: 'Profile Settings',
      settingsAbout: 'About AlphaZJobs',
      profileTopSkills: 'Top skills',
      profileInterests: 'Interests',
      profileLookingFor: 'Looking for',
      profileProjects: 'Sample projects',
    },
    empty: {
      noJobs: "nothing's hitting rn, try again 💀",
      noPeople: "no one's out here rn 👀",
      noSkills: 'no skills added yet bestie → add some fr',
      noInterests: 'no interests yet, add some!',
    },
    placeholders: {
      searchJobs: 'search the bag... 💼',
      searchPeople: 'who you looking for? 👀',
    },
  },
  'en-us': {
    nav: {
      home: 'Home',
      discover: 'Discover opportunities',
      profile: 'Profile',
      messages: 'Messages',
      rooms: 'Communities',
    },
    buttons: {
      startBuilding: 'Create profile',
      apply: 'Apply',
      save: 'Save',
      explore: 'Explore',
      aiMatch: 'AI job matches',
    },
    messages: {
      loading: 'Finding your matches...',
      matchFound: 'Great match found',
      noMatches: 'No matches yet. Add more skills.',
      joinRoom: 'Join community',
      sendMessage: 'Send message',
    },
    headings: {
      landingHero1: 'Build your career',
      landingHero2: 'your way',
      landingSub: 'Content creator. Developer. Designer. Data analyst. All paths are valid. Find opportunities and connect with people like you.',
      landingTagline: 'For Gen Z & Gen Alpha',
      aiMatchTitle: 'Your AI Matches',
      aiMatchAnalyzing: 'Analyzing your skills and interests...',
      onboarding1Title: "What's your name?",
      onboarding1Placeholder: 'Your name',
      onboarding2Title: 'How old are you?',
      onboarding2Placeholder: 'Your age',
      onboarding3Title: 'What are your skills?',
      onboarding3Sub: 'Select all that apply',
      onboarding4Title: 'What are you curious about?',
      onboarding4Sub: 'Your interests help us match you',
      onboarding5Title: 'Add a profile photo',
      onboarding5Sub: 'You can skip this for now',
      onboardingNext: 'Next',
      onboardingGetStarted: 'Get started',
      roomsSub: 'Connect with communities that match your vibe',
      settingsTitle: 'Settings',
      settingsLangMode: 'Language Mode',
      settingsNotifications: 'Notifications',
      settingsNotificationsSub: 'Get notified about new matches and messages',
      settingsProfileSection: 'Profile Settings',
      settingsAbout: 'About AlphaZJobs',
      profileTopSkills: 'Top skills',
      profileInterests: 'Interests',
      profileLookingFor: 'Looking for',
      profileProjects: 'Sample projects',
    },
    empty: {
      noJobs: 'No jobs found. Try a different search.',
      noPeople: 'No people found. Try a different search.',
      noSkills: 'No skills added yet.',
      noInterests: 'No interests added yet.',
    },
    placeholders: {
      searchJobs: 'Search jobs, companies, skills...',
      searchPeople: 'Search people, skills, interests...',
    },
  },
};

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>('en-chronically-online');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
