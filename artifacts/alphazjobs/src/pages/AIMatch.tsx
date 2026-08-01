import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TopNav } from '@/components/TopNav';
import { QuickApplyDialog } from '@/components/QuickApplyDialog';
import { jobs, currentUser as fallbackUser } from '@/data/mock-data';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface JobMatch {
  job: typeof jobs[0];
  match: number;
  skillsScore: number;
  interestScore: number;
  reason: string;
}

export default function AIMatch() {
  const { t } = useLanguage();
  const { user, savedJobIds, appliedJobIds, toggleSaveJob } = useUser();
  const { toast } = useToast();
  const activeUser = user ?? fallbackUser;

  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState<JobMatch[]>([]);
  const [applyJobId, setApplyJobId] = useState<string | null>(null);
  const applyJob = matches.find((m) => m.job.id === applyJobId)?.job ?? null;

  useEffect(() => {
    const timer = setTimeout(() => {
      const userSkills = activeUser.skills;
      const jobMatches = jobs
        .map((job) => {
          const matchingSkills = job.skills.filter((skill) =>
            userSkills.includes(skill)
          );
          const skillsScore = matchingSkills.length > 0
            ? Math.round((matchingSkills.length / job.skills.length) * 100)
            : 0;

          const interestHit = activeUser.interests.find((interest) =>
            `${job.title} ${job.description}`.toLowerCase().includes(interest.toLowerCase())
          );
          const interestScore = interestHit ? 100 : matchingSkills.length > 0 ? 60 : 30;

          const matchPercentage = Math.min(
            95,
            Math.max(55, Math.round(skillsScore * 0.7 + interestScore * 0.3))
          );

          let reason = '';
          if (matchingSkills.length > 0) {
            const interestPart = interestHit
              ? ` + interest in ${interestHit}`
              : activeUser.interests.length > 0
                ? ` + interest in ${activeUser.interests[0]}`
                : '';
            reason = `Your ${matchingSkills.join(' & ')} skills${interestPart} = perfect fit`;
          } else {
            const interestPart =
              activeUser.interests.length > 0
                ? activeUser.interests[0]
                : 'your areas';
            reason = `Your interests in ${interestPart} align with this role`;
          }

          return {
            job,
            match: matchPercentage,
            skillsScore,
            interestScore,
            reason,
          };
        })
        .sort((a, b) => b.match - a.match)
        .slice(0, 5);

      setMatches(jobMatches);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeUser]);

  const handleSave = (jobId: string, jobTitle: string) => {
    const wasSaved = savedJobIds.includes(jobId);
    toggleSaveJob(jobId);
    toast(
      wasSaved
        ? { title: 'Removed from saved', description: `${jobTitle} removed from your list.` }
        : { title: 'Saved to your list', description: `${jobTitle} saved.` }
    );
  };

  return (
    <div className="min-h-[100dvh] bg-background md:pt-16">
      <TopNav />
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border-4 border-primary/10 border-b-primary/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
                </div>
              </div>
              <h2 className="text-2xl font-black mb-4 text-center">
                {t.messages.loading}
              </h2>
              <p className="text-muted-foreground text-center animate-pulse">
                {t.headings.aiMatchAnalyzing}
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
                <p className="text-sm text-primary font-semibold mb-1">{t.messages.matchFound}</p>
                <h1 className="text-4xl font-black mb-2">{t.headings.aiMatchTitle}</h1>
                <p className="text-muted-foreground">
                  {matches.length} opportunities tailored for {activeUser.name}
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
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2 text-primary">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-2xl font-black">{match.match}%</span>
                      </div>
                      <div className="flex-1">
                        <Progress value={match.match} className="h-2" />
                      </div>
                    </div>

                    {/* Match Breakdown */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Skills match</span>
                          <span>{match.skillsScore}%</span>
                        </div>
                        <Progress value={match.skillsScore} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Interest fit</span>
                          <span>{match.interestScore}%</span>
                        </div>
                        <Progress value={match.interestScore} className="h-1.5" />
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
                          variant={activeUser.skills.includes(skill) ? 'default' : 'secondary'}
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
                        <Button
                          size="sm"
                          variant={savedJobIds.includes(match.job.id) ? 'default' : 'outline'}
                          onClick={() => handleSave(match.job.id, match.job.title)}
                        >
                          {savedJobIds.includes(match.job.id) ? 'Saved' : t.buttons.save}
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setApplyJobId(match.job.id)}
                          disabled={appliedJobIds.includes(match.job.id)}
                          variant={appliedJobIds.includes(match.job.id) ? 'outline' : 'default'}
                        >
                          {appliedJobIds.includes(match.job.id) ? 'Applied' : t.buttons.apply}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {applyJob && (
        <QuickApplyDialog
          job={applyJob}
          open={applyJobId !== null}
          onOpenChange={(open) => !open && setApplyJobId(null)}
        />
      )}
    </div>
  );
}
