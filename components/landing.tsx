'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Brain, Shield, BarChart3 } from 'lucide-react';

interface LandingProps {
  onNavigate: () => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">FinTwin</span>
          </motion.div>
          <button
            onClick={onNavigate}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-balance leading-tight">
            Your AI Financial Intelligence Partner
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
            Upload your financial data and let FinTwin AI analyze your wealth, identify opportunities, and create personalized strategies—all powered by advanced artificial intelligence.
          </p>
          <button
            onClick={onNavigate}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: Brain,
              title: 'AI-Powered Analysis',
              description: 'Advanced AI interprets your financial data instantly',
            },
            {
              icon: BarChart3,
              title: 'Smart Recommendations',
              description: 'Personalized strategies tailored to your goals',
            },
            {
              icon: Shield,
              title: 'Risk Intelligence',
              description: 'Comprehensive risk assessment and monitoring',
            },
            {
              icon: TrendingUp,
              title: 'Scenario Planning',
              description: 'Explore multiple financial futures with clarity',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-xl border border-border/40 bg-card/50 hover:bg-card transition-colors"
            >
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">Trusted by financial professionals</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {['Goldman Sachs', 'Morgan Stanley', 'BlackRock', 'Vanguard'].map(
              (company) => (
                <div key={company} className="text-muted-foreground text-sm font-medium">
                  {company}
                </div>
              )
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
