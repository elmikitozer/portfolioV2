export type Lang = 'fr' | 'en'

export const translations = {
  fr: {
    nav: {
      projects: 'Projets',
      experience: 'Expérience',
      stack: 'Stack',
      contact: 'Contact',
      available: 'Disponible mai 2026',
    },
    hero: {
      subtitle: 'Full Stack & AI Engineer',
      school: 'École 42 Paris',
      degree: 'Master 2 Finance',
      available: 'Disponible mai 2026',
      ctaPrimary: 'Voir mes projets',
      ctaSecondary: 'GitHub',
      scroll: 'Scroll',
    },
    projects: {
      sectionLabel: '// 01 — Projets',
      sectionTitle1: 'Ce que j\'ai',
      sectionTitle2: 'construit',
      proLabel: 'Projets professionnels',
      personalLabel: 'Projets personnels',
      proItems: [
        'Site vitrine pour une marque de cocktails artisanaux. Design immersif, identité visuelle forte.',
        'Portfolio en ligne pour une photographe professionnelle. Galeries dynamiques, expérience visuelle épurée.',
        'Site d\'une directrice artistique et coordinatrice de défilés. Direction visuelle haut de gamme.',
      ],
      personalItems: [
        'Pong multijoueur temps réel avec authentification OAuth2, système de tournoi et chat en temps réel.',
        'Serveur IRC from scratch conforme au protocole RFC 1459, gestion multi-clients par multiplexing I/O.',
        'Infrastructure DevOps complète orchestrée par Docker Compose avec reverse proxy nginx et certificats SSL.',
        'Shell Unix from scratch avec parsing complet, redirections, pipes, variables d\'environnement et signaux.',
      ],
    },
    experience: {
      sectionLabel: '// 02 — Expérience',
      sectionTitle1: 'Là où j\'ai',
      sectionTitle2: 'travaillé',
      items: [
        {
          role: 'Ingénieur Full Stack & IA',
          period: 'Nov 2025 – Mai 2026',
          description: 'Développement backend Java Spring Boot, intégration de LLM APIs (OpenAI, Mistral) pour automatisation, déploiement sur GCP.',
        },
        {
          role: 'Analyste Finance',
          period: 'Mars – Août 2022',
          description: 'Analyse financière et automatisation de reporting sur un budget de 2.4M EUR. Développement d\'outils Python et Excel VBA.',
        },
      ],
    },
    stack: {
      sectionLabel: '// 03 — Stack',
      sectionTitle1: 'Mes',
      sectionTitle2: 'technologies',
    },
    contact: {
      sectionLabel: '// 04 — Contact',
      sectionTitle1: 'Travaillons',
      sectionTitle2: 'ensemble',
      description: 'Disponible à partir de mai 2026 pour des opportunités Full Stack ou ingénierie IA. Ouvert aux missions freelance en parallèle.',
    },
    footer: {
      built: 'Fait avec React · Three.js · GSAP',
      backToTop: '↑ Haut de page',
    },
  },
  en: {
    nav: {
      projects: 'Projects',
      experience: 'Experience',
      stack: 'Stack',
      contact: 'Contact',
      available: 'Available May 2026',
    },
    hero: {
      subtitle: 'Full Stack & AI Engineer',
      school: 'École 42 Paris',
      degree: 'MSc Finance',
      available: 'Available May 2026',
      ctaPrimary: 'View my projects',
      ctaSecondary: 'GitHub',
      scroll: 'Scroll',
    },
    projects: {
      sectionLabel: '// 01 — Projects',
      sectionTitle1: 'What I\'ve',
      sectionTitle2: 'built',
      proLabel: 'Professional projects',
      personalLabel: 'Personal projects',
      proItems: [
        'Showcase website for an artisanal cocktail brand. Immersive design, strong visual identity.',
        'Online portfolio for a professional photographer. Dynamic galleries, clean visual experience.',
        'Website for an art director and fashion show coordinator. High-end visual direction.',
      ],
      personalItems: [
        'Real-time multiplayer Pong with OAuth2 authentication, tournament system and live chat.',
        'IRC server built from scratch, RFC 1459 compliant, multi-client management via I/O multiplexing.',
        'Full DevOps infrastructure orchestrated with Docker Compose, nginx reverse proxy and SSL certificates.',
        'Unix shell from scratch with full parsing, redirections, pipes, environment variables and signals.',
      ],
    },
    experience: {
      sectionLabel: '// 02 — Experience',
      sectionTitle1: 'Where I\'ve',
      sectionTitle2: 'worked',
      items: [
        {
          role: 'Full Stack & AI Engineer',
          period: 'Nov 2025 – May 2026',
          description: 'Java Spring Boot backend development, LLM API integration (OpenAI, Mistral) for automation, GCP deployment.',
        },
        {
          role: 'Finance Analyst',
          period: 'Mar – Aug 2022',
          description: 'Financial analysis and reporting automation on a €2.4M budget. Development of Python and Excel VBA tools.',
        },
      ],
    },
    stack: {
      sectionLabel: '// 03 — Stack',
      sectionTitle1: 'My',
      sectionTitle2: 'technologies',
    },
    contact: {
      sectionLabel: '// 04 — Contact',
      sectionTitle1: 'Let\'s work',
      sectionTitle2: 'together',
      description: 'Available from May 2026 for Full Stack or AI engineering roles. Open to freelance projects in the meantime.',
    },
    footer: {
      built: 'Built with React · Three.js · GSAP',
      backToTop: '↑ Back to top',
    },
  },
}

export type Translations = typeof translations.fr
