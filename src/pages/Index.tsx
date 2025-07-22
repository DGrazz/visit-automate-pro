import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Home from './home';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default Index;
