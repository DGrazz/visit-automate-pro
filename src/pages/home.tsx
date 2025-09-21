
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EmailAutomation } from '@/components/EmailAutomation';
import { 
  Bot, 
  MessageSquare, 
  Mail, 
  Settings2, 
  Zap, 
  Shield,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Workflow,
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Network,
  MessageCircle,
  Bell,
  TrendingUp,
  DollarSign,
  Clock,
  Heart,
  Lightbulb,
  BarChart,
  Layers
} from 'lucide-react';
import dashboardMockup from '@/assets/dashboard-mockup.jpg';
import featuredLogos from '@/assets/featured-logos.jpg';

// Intersection Observer hook for scroll animations
const useIntersectionObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('.section-fade');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
};

// Hero Section
const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden">
    <div className="container mx-auto text-center section-fade relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full border border-primary/20">
            🚀 Presentando Nuevas Funciones
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
          Revoluciona Tu
          <br />
          <span className="text-gradient font-medium">Flujo de Trabajo con IA</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Aprovecha el futuro de la inteligencia artificial para aumentar la productividad, creatividad y toma de decisiones.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" size="lg" className="px-8">
            Comienza Gratis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            <Play className="mr-2 h-5 w-5" />
            Ver en Acción
          </Button>
        </div>
        
        {/* Automatización de Emails */}
        <div className="relative max-w-5xl mx-auto">
          <EmailAutomation />
        </div>
      </div>
    </div>
  </section>
);

// Featured In Section
const FeaturedSection = () => (
  <section className="py-16 section-fade">
    <div className="container mx-auto px-4 text-center">
      <p className="text-muted-foreground mb-8">Confiado por más de 99,000+ marcas y organizaciones de clase mundial</p>
      <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
        <img 
          src={featuredLogos} 
          alt="Destacado en publicaciones" 
          className="mx-auto max-h-16 object-contain"
        />
      </div>
    </div>
  </section>
);

// Testimonials Carousel
const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      text: "ROI Creative transformó nuestra marca. Desde el lanzamiento de nuestro nuevo sitio web, el compromiso y las conversiones han aumentado un 300%.",
      author: "Alex Tellos",
      position: "Fundador de NovaTech",
      rating: 5
    },
    {
      text: "Esto se adapta perfectamente a nuestras necesidades. Es definitivamente la inversión y solución correcta. Con VisitScale pude ahorrar 20 horas por semana.",
      author: "Dana Jones",
      position: "CEO de InnovateCorp",
      rating: 5
    },
    {
      text: "VisitScale aumentó nuestra conversión de leads en un 30% mientras reducía nuestra carga de trabajo de atención al cliente en un 50%.",
      author: "Chris Mitchell",
      position: "CTO",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-muted-foreground">Construimos relaciones duraderas al ofrecer resultados excepcionales.</p>
        </div>
        
        <div className="max-w-3xl mx-auto relative">
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <blockquote className="text-lg mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">{testimonials[currentTestimonial].author}</p>
                  <p className="text-muted-foreground text-sm">{testimonials[currentTestimonial].position}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={prevTestimonial}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextTestimonial}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const steps = [
    {
      title: "1. Acelera tu producto",
      subtitle: "Conecta tus herramientas",
      description: "Utiliza las APIs de Slack para analizar respuestas de IA para tus clientes",
      icon: <Network className="h-8 w-8" />
    },
    {
      title: "2. Establece tus objetivos", 
      subtitle: "Elige tu flujo de automatización",
      description: "Dinos en qué necesitas ayuda.",
      icon: <Target className="h-8 w-8" />
    },
    {
      title: "3. Seguimiento y mejora",
      subtitle: "Lanza y escala", 
      description: "Observa tu progreso y optimiza.",
      icon: <TrendingUp className="h-8 w-8" />
    }
  ];

  return (
    <section className="py-20 section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Cómo Funciona</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comienza con nuestro simple proceso de tres pasos para transformar la automatización de tu negocio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center p-6 hover:scale-105 transition-transform duration-300">
              <CardHeader className="pb-4">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
                <CardDescription className="font-medium text-foreground">{step.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Features Grid Section
const FeaturesSection = () => {
  const features = [
    {
      title: "Integración CRM",
      description: "Conéctate sin problemas con tus sistemas CRM existentes para la sincronización automática de datos",
      icon: <Settings2 className="h-8 w-8" />
    },
    {
      title: "Chat en Lenguaje Natural",
      description: "Conversaciones potenciadas por IA que entienden el contexto y proporcionan respuestas similares a las humanas",
      icon: <MessageCircle className="h-8 w-8" />
    },
    {
      title: "Calificación de Leads",
      description: "Califica y puntúa leads automáticamente según tus criterios personalizados",
      icon: <Target className="h-8 w-8" />
    },
    {
      title: "Notificaciones en Tiempo Real",
      description: "Recibe alertas instantáneas sobre eventos importantes e interacciones con clientes",
      icon: <Bell className="h-8 w-8" />
    }
  ];

  return (
    <section className="py-20 section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Funciones Potentes</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitas para automatizar tus procesos de negocio y escalar eficientemente
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:scale-105 transition-transform duration-300">
              <CardHeader className="pb-4">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Section (New)
const BenefitsSection = () => {
  const benefits = [
    {
      title: "Ahorra Tiempo",
      description: "Automatiza tareas repetitivas y libera hasta 20 horas semanales para enfocarte en lo que realmente importa",
      icon: <Clock className="h-10 w-10" />
    },
    {
      title: "Reduce Costos",
      description: "Disminuye tus gastos operativos hasta un 40% eliminando procesos manuales y optimizando recursos",
      icon: <DollarSign className="h-10 w-10" />
    },
    {
      title: "Mejora la Experiencia del Cliente",
      description: "Ofrece respuestas instantáneas 24/7 y personaliza cada interacción para incrementar la satisfacción",
      icon: <Heart className="h-10 w-10" />
    },
    {
      title: "Decisiones Basadas en Datos",
      description: "Obtén insights valiosos y automatiza la generación de informes para tomar mejores decisiones",
      icon: <BarChart className="h-10 w-10" />
    },
    {
      title: "Escalabilidad Sin Límites",
      description: "Crece tu negocio sin aumentar proporcionalmente tu personal o recursos internos",
      icon: <Layers className="h-10 w-10" />
    },
    {
      title: "Innovación Constante",
      description: "Mantente a la vanguardia con actualizaciones automáticas y nuevas funcionalidades cada mes",
      icon: <Lightbulb className="h-10 w-10" />
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20 section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Beneficios de VisitScale</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo nuestra plataforma de automatización transforma completamente tu negocio
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 hover:scale-105 transition-transform duration-300 h-full">
              <CardHeader className="pb-4">
                <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                  <div className="text-primary">{benefit.icon}</div>
                </div>
                <CardTitle className="text-xl text-center">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Mission Section
const MissionSection = () => (
  <section className="py-20 section-fade">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-light mb-6">Nuestra Misión</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            En VisitScale, creemos que la automatización debe ser simple y accesible para empresas de todos los tamaños. 
            Nuestra misión es democratizar los flujos de trabajo impulsados por IA, permitiendo a las empresas centrarse 
            en lo que más importa: hacer crecer su negocio y atender a sus clientes. Estamos comprometidos a hacer que la 
            tecnología de automatización avanzada sea intuitiva, asequible e increíblemente efectiva.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// FAQ Section
const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "¿Qué tipos de automatización ofrece VisitScale?",
      answer: "VisitScale proporciona bots web, automatización de WhatsApp, automatización de correo electrónico, reserva de citas, atención al cliente, captura de leads y flujos de trabajo de asistencia de ventas."
    },
    {
      question: "¿Qué tan rápido puedo ver resultados?",
      answer: "La mayoría de los clientes ven resultados iniciales dentro de las primeras 24-48 horas de configuración. La optimización completa generalmente ocurre dentro de la primera semana a medida que nuestra IA aprende los patrones específicos de tu negocio."
    },
    {
      question: "¿Se integra con herramientas existentes?",
      answer: "Sí, nos integramos con más de 100 herramientas empresariales populares, incluyendo CRMs, plataformas de correo electrónico, sistemas de calendario y más. Nuestra API también permite integraciones personalizadas."
    },
    {
      question: "¿Hay una tarifa de configuración?",
      answer: "No hay tarifas de configuración. Todos los planes incluyen asistencia gratuita para la incorporación y configuración por parte de nuestro equipo para garantizar tu éxito desde el primer día."
    },
    {
      question: "¿Puedo cancelar en cualquier momento?",
      answer: "Absolutamente. Todos los planes son mensuales sin contratos a largo plazo. Puedes cancelar o cambiar tu plan en cualquier momento."
    }
  ];

  return (
    <section className="py-20 section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Preguntas Frecuentes</h2>
          <p className="text-muted-foreground">Todo lo que necesitas saber sobre VisitScale</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="mb-4">
              <CardHeader 
                className="cursor-pointer" 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                  <ChevronRight 
                    className={`h-5 w-5 transition-transform ${openFaq === index ? 'rotate-90' : ''}`} 
                  />
                </div>
              </CardHeader>
              {openFaq === index && (
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Home Component
const Home = () => {
  useIntersectionObserver();

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <BenefitsSection />
      <MissionSection />
      <FAQSection />
    </div>
  );
};

export default Home;
