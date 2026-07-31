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
