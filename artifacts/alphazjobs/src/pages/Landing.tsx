import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { jobs } from '@/data/mock-data';

export default function Landing() {
  const { t } = useLanguage();
  const { isOnboarded } = useUser();

  const featuredJobs = jobs.slice(0, 3);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{t.headings.landingTagline}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            {t.headings.landingHero1}
            <br />
            <span className="text-primary">{t.headings.landingHero2}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.headings.landingSub}
          </p>

          <Link href={isOnboarded ? '/home' : '/onboarding'}>
            <Button size="lg" className="text-lg px-8 py-6 group">
              {isOnboarded ? 'Back to your dashboard' : t.buttons.startBuilding}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* Featured Job Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {featuredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all"
            >
              <h3 className="text-lg font-bold mb-2">{job.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{job.company}</p>
              <p className="text-xs text-foreground/70 mb-4 line-clamp-2">{job.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">{job.compensation}</span>
                <span className="text-xs text-muted-foreground capitalize">{job.type}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="container mx-auto px-4 py-16 border-t border-border"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-black text-primary mb-2">2.4k+</div>
            <div className="text-sm text-muted-foreground">Active opportunities</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-primary mb-2">8.7k+</div>
            <div className="text-sm text-muted-foreground">Gen Z members</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black text-primary mb-2">94%</div>
            <div className="text-sm text-muted-foreground">Match success rate</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
