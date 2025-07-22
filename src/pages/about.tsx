import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  Sparkles, 
  TrendingUp,
  Award,
  Heart,
  Globe,
  Shield
} from 'lucide-react';

const About = () => {
  const stats = [
    { number: "99K+", label: "Happy Customers", icon: <Users className="h-6 w-6" /> },
    { number: "50M+", label: "Hours Saved", icon: <TrendingUp className="h-6 w-6" /> },
    { number: "150+", label: "Countries Served", icon: <Globe className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime SLA", icon: <Shield className="h-6 w-6" /> }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We're constantly pushing the boundaries of what's possible with AI automation, staying ahead of industry trends.",
      icon: <Sparkles className="h-8 w-8" />
    },
    {
      title: "Customer Success",
      description: "Your success is our success. We're committed to delivering measurable results that transform your business.",
      icon: <Target className="h-8 w-8" />
    },
    {
      title: "Reliability",
      description: "Built on enterprise-grade infrastructure with 99.9% uptime and industry-leading security standards.",
      icon: <Shield className="h-8 w-8" />
    },
    {
      title: "Simplicity",
      description: "Complex technology made simple. We believe powerful automation should be accessible to everyone.",
      icon: <Heart className="h-8 w-8" />
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      description: "Former Head of AI at Google, leading VisitScale's vision for democratizing automation.",
      image: "👩‍💼"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      description: "Ex-Tesla AI engineer with 15+ years building scalable automation systems.",
      image: "👨‍💻"
    },
    {
      name: "Emily Johnson",
      role: "Head of Product",
      description: "Product strategy expert from Salesforce, focused on user-centric automation solutions.",
      image: "👩‍🚀"
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      description: "Former Amazon architect specializing in distributed systems and AI infrastructure.",
      image: "👨‍🔬"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
              Transforming Business Through
              <br />
              <span className="text-gradient font-medium">Intelligent Automation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Founded in 2021, VisitScale has grown from a small team of AI enthusiasts to a leading 
              automation platform trusted by thousands of businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto mb-4">
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light mb-6">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                It all started with a simple observation: businesses were drowning in repetitive tasks that 
                could be automated, but existing solutions were too complex and expensive for most companies 
                to implement effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">The Challenge</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Traditional automation tools required months of setup, expensive consultants, and ongoing 
                  technical maintenance. Small and medium businesses were left behind while enterprises 
                  monopolized the benefits of AI automation.
                </p>
                
                <h3 className="text-2xl font-semibold mb-4">Our Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We built VisitScale to democratize automation. Our platform makes it possible for any 
                  business to implement sophisticated AI workflows in minutes, not months, without requiring 
                  technical expertise or massive budgets.
                </p>
              </div>
              
              <Card className="p-8">
                <CardContent className="pt-0">
                  <Award className="h-12 w-12 text-primary mb-6" />
                  <h4 className="text-xl font-semibold mb-4">Recognition</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Forbes "30 Under 30" - Enterprise Technology</li>
                    <li>• TechCrunch Disrupt Winner 2022</li>
                    <li>• Gartner Cool Vendor in AI</li>
                    <li>• Fast Company Most Innovative Companies</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:scale-105 transition-transform duration-300">
                <CardHeader className="pb-4">
                  <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
                    <div className="text-primary">{value.icon}</div>
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry veterans and AI pioneers working together to revolutionize business automation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="p-12">
              <CardContent>
                <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-light mb-6">Join Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Be part of the automation revolution. Whether you're a customer, partner, or potential team member, 
                  we'd love to hear from you and explore how we can work together to build the future of business automation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="hero" size="lg">
                    Start Your Journey
                  </Button>
                  <Button variant="outline" size="lg">
                    Contact Our Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;