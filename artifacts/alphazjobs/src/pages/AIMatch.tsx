import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { jobs, currentUser } from '@/data/mock-data';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AIMatch() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<Array<{ job: typeof jobs[0]; match: number; reason: string }>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate AI matching based on user skills
      const userSkills = currentUser.skills;
      const jobMatches = jobs
        .map((job) => {
          const matchingSkills = job.skills.filter((skill) =>
            userSkills.includes(skill)
          );
          const matchPercentage = Math.min(
            95,
            Math.max(60, (matchingSkills.length / job.skills.length) * 100)
          );

          let reason = '';
          if (matchingSkills.length > 0) {
            reason = `Your ${matchingSkills.join(', ')} skills + interest in ${currentUser.interests[0]} = perfect fit`;
          } else {
            reason = `Your interests in ${currentUser.interests[0]} align with this role`;
          }

          return {
            job,
            match: Math.round(matchPercentage),
            reason,
          };
        })
        .sort((a, b) => b.match - a.match)
        .slice(0, 5);

      setMatches(jobMatches);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/profile">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24"
            >
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              </div>
              <h2 className="text-2xl font-black mb-4 text-center animate-shimmer bg-clip-text">
                {t.messages.loading}
              </h2>
              <p className="text-muted-foreground text-center">
                Analyzing your skills and interests...
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-8">
                <h1 className="text-4xl font-black mb-2">Your AI Matches</h1>
                <p className="text-muted-foreground">
                  {matches.length} opportunities tailored for you
                </p>
              </div>

              <div className="space-y-6">
                {matches.map((match, index) => (
                  <motion.div
                    key={match.job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all"
                  >
                    {/* Match Percentage */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 text-primary">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-2xl font-black">{match.match}%</span>
                      </div>
                      <div className="flex-1">
                        <Progress value={match.match} className="h-2" />
                      </div>
                    </div>

                    {/* Job Info */}
                    <h3 className="text-xl font-bold mb-1">{match.job.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {match.job.company}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {match.job.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={currentUser.skills.includes(skill) ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Match Reason */}
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                      <p className="text-sm text-foreground/90">
                        <span className="font-semibold">Why this matches: </span>
                        {match.reason}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        {match.job.compensation}
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          {t.buttons.save}
                        </Button>
                        <Button size="sm">{t.buttons.apply}</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
