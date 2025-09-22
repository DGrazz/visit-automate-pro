import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en' | 'de';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': {
    es: 'Inicio',
    en: 'Home',
    de: 'Startseite'
  },
  'nav.about': {
    es: 'Acerca de',
    en: 'About',
    de: 'Über uns'
  },
  'nav.blog': {
    es: 'Blog',
    en: 'Blog',
    de: 'Blog'
  },
  'nav.contact': {
    es: 'Contacto',
    en: 'Contact',
    de: 'Kontakt'
  },
  'nav.getStarted': {
    es: 'Comenzar',
    en: 'Get Started',
    de: 'Loslegen'
  },

  // Email Automation
  'email.title': {
    es: 'Automatización de Emails con IA',
    en: 'AI Email Automation',
    de: 'KI E-Mail Automatisierung'
  },
  'email.subtitle': {
    es: 'Observa cómo la IA clasifica automáticamente tus emails en carpetas organizadas',
    en: 'Watch how AI automatically sorts your emails into organized folders',
    de: 'Beobachten Sie, wie KI Ihre E-Mails automatisch in organisierte Ordner sortiert'
  },
  'email.startTest': {
    es: '🚀 Iniciar Test',
    en: '🚀 Start Test',
    de: '🚀 Test Starten'
  },
  'email.stopDemo': {
    es: '⏹ Detener Demo',
    en: '⏹ Stop Demo',
    de: '⏹ Demo Stoppen'
  },
  'email.inbox': {
    es: 'Bandeja de entrada',
    en: 'Inbox',
    de: 'Posteingang'
  },
  'email.organizedFolders': {
    es: 'Carpetas organizadas',
    en: 'Organized Folders',
    de: 'Organisierte Ordner'
  },
  'email.analyzing': {
    es: 'Analizando contenido con IA...',
    en: 'Analyzing content with AI...',
    de: 'Inhalt wird mit KI analysiert...'
  },

  // Email Categories
  'category.business.name': {
    es: 'Negocios',
    en: 'Business',
    de: 'Geschäft'
  },
  'category.business.description': {
    es: 'Propuestas comerciales y oportunidades de negocio',
    en: 'Commercial proposals and business opportunities',
    de: 'Geschäftsvorschläge und Geschäftsmöglichkeiten'
  },
  'category.employees.name': {
    es: 'Empleados',
    en: 'Employees',
    de: 'Mitarbeiter'
  },
  'category.employees.description': {
    es: 'Comunicación interna y mensajes del equipo',
    en: 'Internal communication and team messages',
    de: 'Interne Kommunikation und Team-Nachrichten'
  },
  'category.cv.name': {
    es: 'Candidatos',
    en: 'Candidates',
    de: 'Kandidaten'
  },
  'category.cv.description': {
    es: 'CVs y aplicaciones de trabajo recibidas',
    en: 'CVs and job applications received',
    de: 'Erhaltene Lebensläufe und Bewerbungen'
  },
  'category.personal.name': {
    es: 'Personal',
    en: 'Personal',
    de: 'Persönlich'
  },
  'category.personal.description': {
    es: 'Mensajes personales e invitaciones privadas',
    en: 'Personal messages and private invitations',
    de: 'Persönliche Nachrichten und private Einladungen'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  // Load saved language from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['es', 'en', 'de'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage
  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};