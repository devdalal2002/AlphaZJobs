export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  skills: string[];
  compensation: string;
  ageRequirement?: string;
  type: 'remote' | 'hybrid' | 'onsite';
}

export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  skills: string[];
  interests: string[];
  lookingFor: string[];
  projects: string[];
  avatar?: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  members: number;
  recentMessage: string;
  recentMessageAuthor: string;
  messages: Message[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  postedBy: string;
  skillsRequired: string[];
}

export interface Receipt {
  id: string;
  challengeId: string;
  challengeTitle: string;
  completedFor: string;
  date: string;
  skillsProven: string[];
  status: 'pending' | 'verified';
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Junior Web Developer',
    company: 'Pixel Startup',
    description: 'Build modern web apps with our startup team',
    skills: ['React', 'Node.js', 'CSS'],
    compensation: '$25/hr',
    type: 'remote',
  },
  {
    id: '2',
    title: 'TikTok Video Editor',
    company: '@jenna.creates',
    description: 'Edit viral content for growing creator',
    skills: ['Video Editing', 'Trending Audio'],
    compensation: 'Exposure + Rev share',
    type: 'remote',
  },
  {
    id: '3',
    title: 'UI Designer',
    company: 'AppStudio',
    description: 'Design beautiful interfaces for mobile apps',
    skills: ['Figma', 'UX Research'],
    compensation: '$20/hr',
    type: 'hybrid',
  },
  {
    id: '4',
    title: 'Social Media Manager',
    company: 'BrandLab',
    description: 'Manage content strategy for growing brands',
    skills: ['Content Strategy', 'Copywriting'],
    compensation: '$18/hr',
    type: 'remote',
  },
  {
    id: '5',
    title: 'Data Analyst Intern',
    company: 'TechCo',
    description: 'Analyze user data to drive product decisions',
    skills: ['Python', 'SQL', 'Excel'],
    compensation: '$22/hr',
    ageRequirement: '18+',
    type: 'onsite',
  },
  {
    id: '6',
    title: 'Graphic Designer Freelance',
    company: 'Independent',
    description: 'Create stunning visuals for various clients',
    skills: ['Illustrator', 'Photoshop'],
    compensation: '$30/hr project',
    type: 'remote',
  },
  {
    id: '7',
    title: 'Junior Backend Dev',
    company: 'ScaleUp',
    description: 'Build scalable APIs and services',
    skills: ['Node.js', 'PostgreSQL'],
    compensation: '$28/hr',
    type: 'remote',
  },
  {
    id: '8',
    title: 'YouTube Thumbnail Designer',
    company: 'Creator Collective',
    description: 'Design clickable thumbnails for top creators',
    skills: ['Photoshop', 'Canva', 'Figma'],
    compensation: '$15/thumbnail',
    type: 'remote',
  },
  {
    id: '9',
    title: 'Influencer Manager',
    company: 'NextGen Agency',
    description: 'Manage talent and brand partnerships',
    skills: ['Social Media', 'Analytics'],
    compensation: '$19/hr',
    type: 'hybrid',
  },
  {
    id: '10',
    title: 'Community Manager',
    company: 'Digital Collective',
    description: 'Build and engage online communities',
    skills: ['Discord', 'Notion', 'Community Building'],
    compensation: '$17/hr',
    type: 'remote',
  },
];

export const currentUser: User = {
  id: 'alex-chen',
  name: 'Alex Chen',
  age: 17,
  bio: 'aspiring web dev',
  skills: ['React', 'JavaScript', 'CSS'],
  interests: ['Startup tech', 'Open source', 'Building in public'],
  lookingFor: ['Internship', 'Freelance gig', 'Mentorship'],
  projects: ['Personal portfolio site', 'Weather app using OpenWeather API'],
};

export const sampleUsers: User[] = [
  currentUser,
  {
    id: 'jordan-kim',
    name: 'Jordan Kim',
    age: 16,
    bio: 'TikTok creator',
    skills: ['Video Editing', 'Trending Audio'],
    interests: ['Collabs', 'Brand deals'],
    lookingFor: ['Brand partnerships', 'Collaborations'],
    projects: ['TikTok series on productivity', 'YouTube channel'],
  },
  {
    id: 'sam-rivera',
    name: 'Sam Rivera',
    age: 18,
    bio: 'UI designer',
    skills: ['Figma', 'UX Research'],
    interests: ['Design systems', 'Accessibility'],
    lookingFor: ['Design internship', 'Portfolio reviews'],
    projects: ['Design system for startup', 'Accessibility toolkit'],
  },
];

export const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Jenna Creates',
    lastMessage: "Hey! I saw your portfolio...",
    timestamp: '2m ago',
    unread: true,
  },
  {
    id: '2',
    name: 'AppStudio Recruiter',
    lastMessage: 'We love your Figma work!',
    timestamp: '1h ago',
    unread: false,
  },
  {
    id: '3',
    name: 'Sam',
    lastMessage: 'Yo you applying to that AppStudio role?',
    timestamp: '3h ago',
    unread: false,
  },
];

export const rooms: Room[] = [
  {
    id: 'web-dev-crew',
    name: '#web-dev-crew',
    description: "What's the best way to get your first dev job?",
    members: 847,
    recentMessage: 'honestly just build stuff and post it',
    recentMessageAuthor: '@maya',
    messages: [
      {
        id: '1',
        sender: '@carlos',
        content: "I've been learning React for 3 months, is that enough to start applying?",
        timestamp: '10:23 AM',
        isMe: false,
      },
      {
        id: '2',
        sender: '@maya',
        content: 'honestly just build stuff and post it',
        timestamp: '10:25 AM',
        isMe: false,
      },
      {
        id: '3',
        sender: '@dev_king',
        content: 'build in public >> resume',
        timestamp: '10:26 AM',
        isMe: false,
      },
      {
        id: '4',
        sender: 'You',
        content: 'this is facts, started posting my projects last week',
        timestamp: '10:28 AM',
        isMe: true,
      },
      {
        id: '5',
        sender: '@maya',
        content: 'nice! drop your portfolio link',
        timestamp: '10:29 AM',
        isMe: false,
      },
    ],
  },
  {
    id: 'content-creators',
    name: '#content-creators',
    description: 'Anyone doing YouTube Shorts + TikTok?',
    members: 1234,
    recentMessage: 'repurposing is the move fr',
    recentMessageAuthor: '@vid_queen',
    messages: [
      {
        id: '1',
        sender: '@creator_jay',
        content: 'Anyone doing YouTube Shorts + TikTok?',
        timestamp: '9:15 AM',
        isMe: false,
      },
      {
        id: '2',
        sender: '@vid_queen',
        content: 'repurposing is the move fr',
        timestamp: '9:18 AM',
        isMe: false,
      },
      {
        id: '3',
        sender: '@content_mike',
        content: 'what editing software yall use?',
        timestamp: '9:20 AM',
        isMe: false,
      },
      {
        id: '4',
        sender: '@vid_queen',
        content: 'CapCut for quick stuff, Premiere for longer vids',
        timestamp: '9:22 AM',
        isMe: false,
      },
    ],
  },
  {
    id: 'design-vibes',
    name: '#design-vibes',
    description: 'Figma tips for beginners',
    members: 563,
    recentMessage: 'auto layout changed my life ngl',
    recentMessageAuthor: '@pixel_perfect',
    messages: [
      {
        id: '1',
        sender: '@new_designer',
        content: 'just started learning Figma, any tips?',
        timestamp: '2:40 PM',
        isMe: false,
      },
      {
        id: '2',
        sender: '@pixel_perfect',
        content: 'auto layout changed my life ngl',
        timestamp: '2:42 PM',
        isMe: false,
      },
      {
        id: '3',
        sender: '@ui_sam',
        content: 'also learn components early, saves so much time',
        timestamp: '2:44 PM',
        isMe: false,
      },
    ],
  },
  {
    id: 'just-starting-out',
    name: '#just-starting-out',
    description: "Scared to apply? Let's hype each other up",
    members: 2109,
    recentMessage: 'applied today!! thanks for the push',
    recentMessageAuthor: '@first_timer',
    messages: [
      {
        id: '1',
        sender: '@nervous_dev',
        content: "I'm scared to apply to my first job, what if I'm not good enough?",
        timestamp: '11:00 AM',
        isMe: false,
      },
      {
        id: '2',
        sender: '@hype_crew',
        content: 'you got this!! everyone starts somewhere',
        timestamp: '11:02 AM',
        isMe: false,
      },
      {
        id: '3',
        sender: '@first_timer',
        content: 'applied today!! thanks for the push',
        timestamp: '11:15 AM',
        isMe: false,
      },
      {
        id: '4',
        sender: '@hype_crew',
        content: 'LETS GOOO',
        timestamp: '11:16 AM',
        isMe: false,
      },
    ],
  },
  {
    id: 'career-questions',
    name: '#career-questions',
    description: 'Is it too late to learn coding at 16?',
    members: 934,
    recentMessage: '16 is literally the perfect time bro',
    recentMessageAuthor: '@senior_dev',
    messages: [
      {
        id: '1',
        sender: '@worried_16',
        content: 'Is it too late to learn coding at 16?',
        timestamp: '3:30 PM',
        isMe: false,
      },
      {
        id: '2',
        sender: '@senior_dev',
        content: '16 is literally the perfect time bro',
        timestamp: '3:32 PM',
        isMe: false,
      },
      {
        id: '3',
        sender: '@coder_21',
        content: 'I started at 19 and got my first job at 20, you have time',
        timestamp: '3:35 PM',
        isMe: false,
      },
    ],
  },
];

export const challenges: Challenge[] = [
  {
    id: 'c1',
    title: 'Edit this 30s reel',
    description: 'Turn a raw clip into a punchy 30-second short with captions and trending audio.',
    postedBy: '@jenna.creates',
    skillsRequired: ['Video Editing', 'Trending Audio'],
  },
  {
    id: 'c2',
    title: 'Fix this login bug',
    description: 'A small React app has broken form validation on the login page. Find and fix it.',
    postedBy: 'ScaleUp',
    skillsRequired: ['React', 'JavaScript'],
  },
  {
    id: 'c3',
    title: 'Design a landing page hero',
    description: 'Mock up a hero section for a new app launch — mobile and desktop.',
    postedBy: 'AppStudio',
    skillsRequired: ['Figma', 'UX Research'],
  },
  {
    id: 'c4',
    title: 'Sketch 3 thumbnail concepts',
    description: 'Three clickable YouTube thumbnail concepts for a tech review channel.',
    postedBy: 'Creator Collective',
    skillsRequired: ['Photoshop', 'Canva'],
  },
  {
    id: 'c5',
    title: 'Find one trend in this data',
    description: 'Given a small CSV of signups, find and summarize one interesting trend.',
    postedBy: 'TechCo',
    skillsRequired: ['Python', 'SQL'],
  },
];

export const sampleReceipts: Receipt[] = [
  {
    id: 'r1',
    challengeId: 'c2',
    challengeTitle: 'Fix this login bug',
    completedFor: 'ScaleUp',
    date: '2 weeks ago',
    skillsProven: ['React', 'JavaScript'],
    status: 'verified',
  },
  {
    id: 'r2',
    challengeId: 'c3',
    challengeTitle: 'Design a landing page hero',
    completedFor: 'AppStudio',
    date: '1 month ago',
    skillsProven: ['Figma'],
    status: 'verified',
  },
];

export const availableSkills = [
  'React',
  'JavaScript',
  'Python',
  'Figma',
  'Video Editing',
  'UX Research',
  'Node.js',
  'CSS',
  'SQL',
  'Photoshop',
  'Illustrator',
  'Content Strategy',
  'Copywriting',
  'Discord',
  'Notion',
  'PostgreSQL',
  'Canva',
  'Social Media',
  'Analytics',
  'Community Building',
];

export const availableInterests = [
  'Startup tech',
  'Open source',
  'Building in public',
  'Collabs',
  'Brand deals',
  'Design systems',
  'Accessibility',
  'Content creation',
  'Photography',
  'Music production',
  'Game development',
  'AI/ML',
  'Web3',
  'Freelancing',
];
