import React, { useState, useEffect } from 'react';
import { Mail, Folder, CheckCircle, Clock, Briefcase, Users, FileText, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Email {
  id: number;
  subject: string;
  sender: string;
  content: string;
  category: 'business' | 'employees' | 'cv' | 'personal';
  processed: boolean;
}

const mockEmails: Email[] = [
  {
    id: 1,
    subject: "Propuesta de colaboración estratégica",
    sender: "carlos.martinez@empresa.com",
    content: "Nos gustaría discutir una alianza...",
    category: 'business',
    processed: false
  },
  {
    id: 2,
    subject: "Solicitud de vacaciones - Julio",
    sender: "ana.garcia@miempresa.com",
    content: "Estimado equipo, solicito...",
    category: 'employees',
    processed: false
  },
  {
    id: 3,
    subject: "Aplicación para puesto de desarrollador",
    sender: "luis.rodriguez@gmail.com",
    content: "Adjunto mi currículum...",
    category: 'cv',
    processed: false
  },
  {
    id: 4,
    subject: "Invitación a cumpleaños",
    sender: "maria.lopez@gmail.com",
    content: "¡Hola! Te invito a mi...",
    category: 'personal',
    processed: false
  },
  {
    id: 5,
    subject: "Presupuesto para proyecto web",
    sender: "info@agenciadigital.com",
    content: "Estimado cliente, adjuntamos...",
    category: 'business',
    processed: false
  },
  {
    id: 6,
    subject: "Reporte mensual de ventas",
    sender: "pedro.santos@miempresa.com",
    content: "Adjunto el reporte...",
    category: 'employees',
    processed: false
  }
];

export const EmailAutomation = () => {
  const { t } = useLanguage();
  const [emails, setEmails] = useState<Email[]>([]);
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [processedEmails, setProcessedEmails] = useState<{ [key: string]: Email[] }>({
    business: [],
    employees: [],
    cv: [],
    personal: []
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoInterval, setDemoInterval] = useState<NodeJS.Timeout | null>(null);

  const categories = {
    business: { 
      name: t('category.business.name'), 
      description: t('category.business.description'),
      icon: Briefcase, 
      color: 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-200 border-blue-500/30',
      hoverColor: 'hover:from-blue-500/30 hover:to-blue-600/30 hover:border-blue-400/50',
      badgeColor: 'bg-blue-500',
      count: 0 
    },
    employees: { 
      name: t('category.employees.name'), 
      description: t('category.employees.description'),
      icon: Users, 
      color: 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-200 border-emerald-500/30',
      hoverColor: 'hover:from-emerald-500/30 hover:to-emerald-600/30 hover:border-emerald-400/50',
      badgeColor: 'bg-emerald-500',
      count: 0 
    },
    cv: { 
      name: t('category.cv.name'), 
      description: t('category.cv.description'),
      icon: FileText, 
      color: 'bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-200 border-purple-500/30',
      hoverColor: 'hover:from-purple-500/30 hover:to-purple-600/30 hover:border-purple-400/50',
      badgeColor: 'bg-purple-500',
      count: 0 
    },
    personal: { 
      name: t('category.personal.name'), 
      description: t('category.personal.description'),
      icon: Heart, 
      color: 'bg-gradient-to-r from-rose-500/20 to-rose-600/20 text-rose-200 border-rose-500/30',
      hoverColor: 'hover:from-rose-500/30 hover:to-rose-600/30 hover:border-rose-400/50',
      badgeColor: 'bg-rose-500',
      count: 0 
    }
  };

  const startDemo = () => {
    if (isDemoRunning) return;
    
    setIsDemoRunning(true);
    setEmails([mockEmails[0]]);
    setCurrentEmailIndex(0);
    setProcessedEmails({
      business: [],
      employees: [],
      cv: [],
      personal: []
    });
    
    // Simular llegada de emails
    const interval = setInterval(() => {
      setCurrentEmailIndex(prev => {
        const nextIndex = (prev + 1) % mockEmails.length;
        setEmails(prevEmails => {
          // Solo agregar si no existe ya
          const emailExists = prevEmails.some(email => email.id === mockEmails[nextIndex].id);
          if (!emailExists) {
            return [...prevEmails, mockEmails[nextIndex]];
          }
          return prevEmails;
        });
        return nextIndex;
      });
    }, 3000);
    
    setDemoInterval(interval);
    
    // Detener la demo después de todos los emails
    setTimeout(() => {
      setIsDemoRunning(false);
      if (interval) clearInterval(interval);
    }, mockEmails.length * 3000 + 2000);
  };
  
  const stopDemo = () => {
    setIsDemoRunning(false);
    if (demoInterval) {
      clearInterval(demoInterval);
      setDemoInterval(null);
    }
  };
  
  useEffect(() => {
    return () => {
      if (demoInterval) clearInterval(demoInterval);
    };
  }, [demoInterval]);

  useEffect(() => {
    // Procesar emails automáticamente
    const unprocessedEmail = emails.find(email => !email.processed);
    if (unprocessedEmail && !isProcessing) {
      setIsProcessing(true);
      
      setTimeout(() => {
        // Marcar como procesado
        setEmails(prevEmails =>
          prevEmails.map(email =>
            email.id === unprocessedEmail.id
              ? { ...email, processed: true }
              : email
          )
        );

        // Agregar a la carpeta correspondiente
        setProcessedEmails(prev => ({
          ...prev,
          [unprocessedEmail.category]: [
            ...prev[unprocessedEmail.category],
            unprocessedEmail
          ]
        }));

        setIsProcessing(false);
      }, 2000);
    }
  }, [emails, isProcessing]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {t('email.title')}
        </h2>
        <p className="text-muted-foreground mb-4">
          {t('email.subtitle')}
        </p>
        <Button 
          onClick={isDemoRunning ? stopDemo : startDemo}
          variant={isDemoRunning ? "destructive" : "default"}
          size="lg"
          className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow transition-all duration-300"
        >
          {isDemoRunning ? t('email.stopDemo') : t('email.startTest')}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Panel de emails entrantes */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">{t('email.inbox')}</h3>
            <Badge variant="secondary">{emails.filter(e => !e.processed).length}</Badge>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  email.processed
                    ? 'bg-muted/20 border-muted/40 opacity-50'
                    : 'bg-card border-border/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-foreground">
                    {email.subject}
                  </span>
                  {email.processed ? (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  ) : (
                    <Clock className="w-4 h-4 text-muted-foreground animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  De: {email.sender}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {email.content}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Panel de carpetas organizadas */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Folder className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">{t('email.organizedFolders')}</h3>
          </div>

          <div className="space-y-3">
            {Object.entries(categories).map(([key, category]) => {
              const CategoryIcon = category.icon;
              const count = processedEmails[key as keyof typeof processedEmails].length;
              
              return (
                <div
                  key={key}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg backdrop-blur-sm ${category.color} ${category.hoverColor}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="w-6 h-6 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-base">{category.name}</span>
                          {count > 0 && (
                            <div className={`w-6 h-6 rounded-full ${category.badgeColor} text-white text-xs flex items-center justify-center font-bold shadow-md`}>
                              {count}
                            </div>
                          )}
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed text-left">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Indicador de procesamiento */}
      {isProcessing && (
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-xl backdrop-blur-sm shadow-lg">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-base text-primary font-semibold">
              {t('email.analyzing')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};