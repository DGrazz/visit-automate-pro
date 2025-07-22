import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, TrendingUp, Bot, Zap, Target } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: "How AI Chatbots Increased Customer Satisfaction by 40%",
      excerpt: "A detailed case study of how TechCorp implemented VisitScale's AI chatbots and saw dramatic improvements in customer engagement.",
      author: "Sarah Chen",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Case Study",
      icon: <Bot className="h-5 w-5" />
    },
    {
      title: "WhatsApp Automation: The Ultimate Guide to Business Growth",
      excerpt: "Learn how businesses are using WhatsApp automation to streamline customer communications and boost sales conversions.",
      author: "Michael Rodriguez", 
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "Strategy",
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: "Email Automation ROI: Real Results from 100+ Businesses",
      excerpt: "Comprehensive analysis of email automation performance across different industries and business sizes.",
      author: "Emily Johnson",
      date: "December 5, 2024", 
      readTime: "6 min read",
      category: "Analytics",
      icon: <Target className="h-5 w-5" />
    },
    {
      title: "The Future of Business Process Automation in 2025",
      excerpt: "Industry insights and predictions for how AI automation will reshape business operations in the coming year.",
      author: "David Kim",
      date: "November 28, 2024",
      readTime: "7 min read", 
      category: "Insights",
      icon: <Zap className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              Automation <span className="text-gradient font-medium">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Case studies, strategies, and insights to help you master business automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="group hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <div className="text-primary">{post.icon}</div>
                    </div>
                    <span className="text-sm text-primary font-medium">{post.category}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <Button variant="ghost" className="w-full group">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;