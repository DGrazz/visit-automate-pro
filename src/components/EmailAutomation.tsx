import React, { useState, useEffect } from 'react';
import { Mail, Folder, CheckCircle, Clock, Briefcase, Users, FileText, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

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
    name: 'Propuestas de negocio', 
    icon: Briefcase, 
    color: 'bg-primary/20 text-primary-foreground border-primary/40',
    count: 0 
  },
  employees: { 
    name: 'Mensajes de empleados', 
    icon: Users, 
    color: 'bg-accent/20 text-accent-foreground border-accent/40',
    count: 0 
  },
  cv: { 
    name: 'CVs recibidos', 
    icon: FileText, 
    color: 'bg-secondary/40 text-secondary-foreground border-secondary/60',
    count: 0 
  },
  personal: { 
    name: 'Personales', 
    icon: Heart, 
    color: 'bg-muted/40 text-muted-foreground border-muted/60',
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

  useEffect(() => {
    // Inicializar con el primer email
    setEmails([mockEmails[0]]);
    
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

    return () => clearInterval(interval);
  }, []);

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
        <p className="text-muted-foreground">
          Observa cómo la IA clasifica automáticamente tus emails en carpetas organizadas
        </p>
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

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(categories).map(([key, category]) => {
              const CategoryIcon = category.icon;
              const count = processedEmails[key as keyof typeof processedEmails].length;
              
              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${category.color}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CategoryIcon className="w-4 h-4" />
                    <span className="font-medium text-sm">{category.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {count} emails
                  </Badge>
                  
                  {count > 0 && (
                    <div className="mt-3 space-y-1">
                      {processedEmails[key as keyof typeof processedEmails]
                        .slice(-2)
                        .map((email) => (
                        <div key={email.id} className="text-xs opacity-80 truncate">
                          {email.subject}
                        </div>
                      ))}
                    </div>
                  )}
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