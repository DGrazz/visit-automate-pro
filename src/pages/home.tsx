import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Clock
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
  <section className="min-h-screen flex items-center justify-center px-4 pt-20">
    <div className="container mx-auto text-center section-fade">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full border border-primary/20">
            🚀 Introducing New Features
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
          Revolutionize Your
          <br />
          <span className="text-gradient font-medium">Workflow with AI Power</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Harness the future of artificial intelligence to boost productivity, creativity, and decision-making.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" size="lg" className="px-8">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            <Play className="mr-2 h-5 w-5" />
            See It In Action
          </Button>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <img 
            src={dashboardMockup} 
            alt="VisitScale Dashboard" 
            className="rounded-xl shadow-2xl animate-float glassmorphic border border-border/20"
          />
        </div>
      </div>
    </div>
  </section>
);

// Featured In Section
const FeaturedSection = () => (
  <section className="py-16 section-fade">
    <div className="container mx-auto px-4 text-center">
      <p className="text-muted-foreground mb-8">Trust by 99,000+ world-class brands and organizations</p>
      <div className="opacity-60 hover:opacity-100 transition-opacity duration-300">
        <img 
          src={featuredLogos} 
          alt="Featured in publications" 
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
      text: "ROI Creative transformed our brand. Since launching our new website, engagement and conversions have risen by 300%.",
      author: "Alex Tellos",
      position: "Founder of NovaTech",
      rating: 5
    },
    {
      text: "This has our needs perfectly. It is definitely the right investment and solution. With VisitScale I was able to save 20 hours per week.",
      author: "Dana Jones",
      position: "CEO at InnovateCorp",
      rating: 5
    },
    {
      text: "VisitScale increased our lead conversion by 30% while reducing our customer support workload by 50%.",
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
          <h2 className="text-3xl md:text-4xl font-light mb-4">What our clients say about us</h2>
          <p className="text-muted-foreground">We build lasting partnerships by delivering outstanding results.</p>
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
      title: "1. Accelerate your product",
      subtitle: "Connect your tools",
      description: "Use Slack APIs to analyze AI answers for your customers",
      icon: <Network className="h-8 w-8" />
    },
    {
      title: "2. Set Your Goals", 
      subtitle: "Choose your automation flow",
      description: "Tell us what you need help with.",
      icon: <Target className="h-8 w-8" />
    },
    {
      title: "3. Track & Improve",
      subtitle: "Launch and scale", 
      description: "See your progress and optimize.",
      icon: <TrendingUp className="h-8 w-8" />
    }
  ];

  return (
    <section className="py-20 section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get started with our simple three-step process to transform your business automation
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
      title: "CRM Integration",
      description: "Seamlessly connect with your existing CRM systems for automated data synchronization",
      icon: <Settings2 className="h-8 w-8" />
    },
    {
      title: "Natural Language Chat",
      description: "AI-powered conversations that understand context and provide human-like responses",
      icon: <MessageCircle className="h-8 w-8" />
    },
    {
      title: "Lead Qualification",
      description: "Automatically qualify and score leads based on your custom criteria",
      icon: <Target className="h-8 w-8" />
    },
    {
      title: "Real-time Notifications",
      description: "Get instant alerts for important events and customer interactions",
      icon: <Bell className="h-8 w-8" />
    }
  ];

  return (
    <section className="py-20 section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to automate your business processes and scale efficiently
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

// Mission Section
const MissionSection = () => (
  <section className="py-20 section-fade">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-light mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At VisitScale, we believe that automation should be simple and accessible for businesses of all sizes. 
            Our mission is to democratize AI-powered workflows, enabling companies to focus on what matters most - 
            growing their business and serving their customers. We're committed to making advanced automation 
            technology intuitive, affordable, and incredibly effective.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Pricing Section
const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for small businesses getting started with automation",
      features: [
        "All Basic plan features",
        "Advanced AI insights and predictions", 
        "Dynamic pricing optimization",
        "24/7 priority support",
        "Custom dashboard configuration"
      ],
      isRecommended: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month", 
      description: "Ideal for growing businesses with advanced automation needs",
      features: [
        "All Basic plan features",
        "Advanced AI insights and predictions",
        "Dynamic pricing optimization", 
        "24/7 priority support",
        "Custom dashboard configuration"
      ],
      isRecommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations requiring custom solutions",
      features: [
        "All Pro plan features",
        "Full API access and integrations",
        "Personalized AI model training",
        "Dedicated account manager",
        "Unlimited report generation"
      ],
      isRecommended: false
    }
  ];

  return (
    <section className="py-20 section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Pick the Perfect Plan</h2>
          <p className="text-muted-foreground">Flexible pricing plans designed to fit businesses of all sizes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-6 ${plan.isRecommended ? 'ring-2 ring-primary' : ''}`}>
              {plan.isRecommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-6">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.isRecommended ? "default" : "outline"}
                >
                  Start your free trial
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "What types of automation does VisitScale offer?",
      answer: "VisitScale provides web bots, WhatsApp automation, email automation, appointment booking, customer support, lead capture, and sales assistance workflows."
    },
    {
      question: "How quickly can I see results?",
      answer: "Most clients see initial results within 24-48 hours of setup. Full optimization typically occurs within the first week as our AI learns your specific business patterns."
    },
    {
      question: "Do you integrate with existing tools?",
      answer: "Yes, we integrate with 100+ popular business tools including CRMs, email platforms, calendar systems, and more. Our API allows for custom integrations as well."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees. All plans include free onboarding and setup assistance from our team to ensure you're successful from day one."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. All plans are month-to-month with no long-term contracts. You can cancel or change your plan at any time."
    }
  ];

  return (
    <section className="py-20 section-fade">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about VisitScale</p>
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
      <MissionSection />
      <PricingSection />
      <FAQSection />
    </div>
  );
};

export default Home;