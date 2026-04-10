// Language-agnostic data — text content lives in src/i18n.ts

export type ProProject = {
  id: number
  name: string
  domain: string
  url: string | null   // null = in progress
  tags: string[]
  color: string
  logoSrc?: string
  inProgress?: boolean
}

export type PersonalProject = {
  id: number
  name: string
  githubUrl: string
  tags: string[]
  emoji: string
  color: string
}

export const professionalProjects: ProProject[] = [
  {
    id: 1,
    name: 'Dix-huit zéro cinq',
    domain: 'dixhuitzerocinq.com',
    url: 'https://dixhuitzerocinq.com',
    tags: ['React', 'TypeScript', 'Tailwind'],
    color: '#f97316',
    logoSrc: '/dixhuitzerocinq.png',
  },
  {
    id: 2,
    name: 'Gil Anselmi — Photographe',
    domain: 'gilanselmi.com',
    url: 'https://gilanselmi.com',
    tags: ['React', 'TypeScript', 'Tailwind'],
    color: '#ec4899',
    logoSrc: '/GilAnselmiClear2.png',
  },
  {
    id: 3,
    name: 'PV Studio',
    domain: 'pvstudio.com',
    url: null,
    tags: ['React', 'TypeScript', 'Tailwind'],
    color: '#3a3a3a',
    logoSrc: '/PVStudioClear2.png',
    inProgress: true,
  },
]

export const personalProjects: PersonalProject[] = [
  {
    id: 1,
    name: 'ft_transcendence',
    githubUrl: 'https://github.com/elmikitozer/ft_transcendance',
    tags: ['TypeScript', 'NestJS', 'React', 'PostgreSQL', 'WebSocket', 'OAuth2'],
    emoji: '🏓',
    color: '#6366f1',
  },
  {
    id: 2,
    name: 'ft_irc',
    githubUrl: 'https://github.com/elmikitozer/ft_irc',
    tags: ['C++', 'Sockets', 'IRC Protocol', 'Multi-clients'],
    emoji: '💬',
    color: '#8b5cf6',
  },
  {
    id: 3,
    name: 'inception',
    githubUrl: 'https://github.com/elmikitozer/inception',
    tags: ['Docker Compose', 'nginx', 'MariaDB', 'SSL/TLS'],
    emoji: '🐳',
    color: '#0ea5e9',
  },
  {
    id: 4,
    name: 'minishell',
    githubUrl: 'https://github.com/elmikitozer/minishell',
    tags: ['C', 'UNIX', 'Parsing', 'Processes', 'Signals'],
    emoji: '🖥',
    color: '#10b981',
  },
]

type Experience = {
  id: number
  company: string
  tags: string[]
  color: string
  logoSrc?: string
  logoInitials: string
  logoBg: string
  logoPadding?: string
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Market Pay',
    tags: ['Java', 'Spring Boot', 'React', 'Node.js', 'LLM APIs', 'GCP'],
    color: '#6366f1',
    logoSrc: '/MP logo.png',
    logoInitials: 'MP',
    logoBg: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    id: 2,
    company: 'Thales',
    tags: ['Python', 'Excel VBA', 'Finance', '2.4M EUR'],
    color: '#0070c0',
    logoSrc: '/ThalesV2.png',
    logoInitials: 'TH',
    logoBg: 'linear-gradient(135deg, #0052a3, #0070c0)',
    logoPadding: '2px 4px',
  },
]

export const stack = [
  { name: 'Java', level: 90 },
  { name: 'Python', level: 88 },
  { name: 'TypeScript', level: 92 },
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Spring Boot', level: 82 },
  { name: 'LangChain', level: 78 },
  { name: 'OpenAI / Mistral', level: 80 },
  { name: 'Docker', level: 85 },
  { name: 'GCP', level: 75 },
]
