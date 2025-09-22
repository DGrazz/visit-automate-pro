import React, { useState, useEffect } from 'react';
import { Mail, Folder, CheckCircle, Clock, Briefcase, Users, FileText, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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

const categories = {
  business: { 
    name: 'Negocios', 
    description: 'Propuestas comerciales y oportunidades de negocio',
    icon: Briefcase, 
    color: 'bg-blue-100 text-blue-900 border-blue-200',
    darkColor: 'dark:bg-blue-900/30 dark:text-blue-100 dark:border-blue-800',
    badgeColor: 'bg-blue-500',
    count: 0 
  },
  employees: { 
    name: 'Empleados', 
    description: 'Comunicación interna y mensajes del equipo',
    icon: Users, 
    color: 'bg-green-100 text-green-900 border-green-200',
    darkColor: 'dark:bg-green-900/30 dark:text-green-100 dark:border-green-800',
    badgeColor: 'bg-green-500',
    count: 0 
  },
  cv: { 
    name: 'Candidatos', 
    description: 'CVs y aplicaciones de trabajo recibidas',
    icon: FileText, 
    color: 'bg-purple-100 text-purple-900 border-purple-200',
    darkColor: 'dark:bg-purple-900/30 dark:text-purple-100 dark:border-purple-800',
    badgeColor: 'bg-purple-500',
    count: 0 
  },
  personal: { 
    name: 'Personal', 
    description: 'Mensajes personales e invitaciones privadas',
    icon: Heart, 
    color: 'bg-pink-100 text-pink-900 border-pink-200',
    darkColor: 'dark:bg-pink-900/30 dark:text-pink-100 dark:border-pink-800',
    badgeColor: 'bg-pink-500',
    count: 0 
  }
};

export const EmailAutomation = () => {
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
          Automatización de Emails con IA
        </h2>
        <p className="text-muted-foreground mb-4">
          Observa cómo la IA clasifica automáticamente tus emails en carpetas organizadas
        </p>
        <Button 
          onClick={isDemoRunning ? stopDemo : startDemo}
          variant={isDemoRunning ? "destructive" : "default"}
          size="lg"
          className="px-6"
        >
          {isDemoRunning ? "Detener Demo" : "🚀 Iniciar Test"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Panel de emails entrantes */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Bandeja de entrada</h3>
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
            <h3 className="font-semibold">Carpetas organizadas</h3>
          </div>

          <div className="space-y-3">
            {Object.entries(categories).map(([key, category]) => {
              const CategoryIcon = category.icon;
              const count = processedEmails[key as keyof typeof processedEmails].length;
              
              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 relative ${category.color} ${category.darkColor}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CategoryIcon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{category.name}</span>
                          {count > 0 && (
                            <div className={`w-5 h-5 rounded-full ${category.badgeColor} text-white text-xs flex items-center justify-center font-medium`}>
                              {count}
                            </div>
                          )}
                        </div>
                        <p className="text-xs opacity-80 leading-relaxed text-left">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-primary font-medium">
              Analizando contenido con IA...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};