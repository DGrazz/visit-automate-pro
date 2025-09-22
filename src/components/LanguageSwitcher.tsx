import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { ChevronDown } from 'lucide-react';

const languages = {
  es: {
    name: 'Español',
    flag: '🇪🇸'
  },
  en: {
    name: 'English',
    flag: '🇺🇸'
  },
  de: {
    name: 'Deutsch',
    flag: '🇩🇪'
  }
};

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/60 backdrop-blur-sm border border-border/40 hover:bg-card/80 transition-all duration-200 text-foreground"
      >
        <span className="text-lg">{languages[language].flag}</span>
        <span className="text-sm font-medium hidden sm:inline">{languages[language].name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 py-2 w-48 bg-card border border-border/40 rounded-xl shadow-xl backdrop-blur-md z-50 animate-in slide-in-from-top-2">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent/50 transition-colors ${
                language === code ? 'bg-accent/30 text-accent-foreground' : 'text-foreground'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {language === code && (
                <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};