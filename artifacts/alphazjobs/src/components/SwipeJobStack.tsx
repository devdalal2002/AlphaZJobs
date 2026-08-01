import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, Heart, Zap, RotateCcw, MapPin } from 'lucide-react';
import { Job } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuickApplyDialog } from '@/components/QuickApplyDialog';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const SWIPE_THRESHOLD = 100;

interface SwipeJobStackProps {
  jobs: Job[];
}

export function SwipeJobStack({ jobs }: SwipeJobStackProps) {
  const { savedJobIds, appliedJobIds, toggleSaveJob } = useUser();
  const { toast } = useToast();
  const [index, setIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('right');
  const [applyJobId, setApplyJobId] = useState<string | null>(null);

  const applyJob = jobs.find((j) => j.id === applyJobId) ?? null;
  const currentJob = jobs[index];
  const nextJob = jobs[index + 1];

  const advance = () => setIndex((prev) => prev + 1);

  const handleSkip = () => {
    setExitDirection('left');
    advance();
  };

  const handleSave = () => {
    if (currentJob && !savedJobIds.includes(currentJob.id)) {
      toggleSaveJob(currentJob.id);
      toast({ title: 'Saved to your list', description: `${currentJob.title} saved.` });
    }
    setExitDirection('right');
    advance();
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      handleSave();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      handleSkip();
    }
  };

  if (!currentJob) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground mb-4">
          You've seen all {jobs.length} jobs. Try adjusting your filters, or start over.
        </p>
        <Button variant="outline" onClick={() => setIndex(0)} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Start over
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-[520px]">
        {nextJob && (
          <div className="absolute inset-0 bg-card border border-border rounded-2xl scale-[0.96] translate-y-2 opacity-60" />
        )}
        <AnimatePresence>
          <motion.div
            key={currentJob.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, x: 0, rotate: 0 }}
            exit={{
              x: exitDirection === 'right' ? 400 : -400,
              rotate: exitDirection === 'right' ? 15 : -15,
              opacity: 0,
              transition: { duration: 0.3 },
            }}
            className="absolute inset-0 bg-card border-2 border-border rounded-2xl p-6 flex flex-col shadow-xl cursor-grab active:cursor-grabbing"
          >
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-start justify-between mb-3">
                <div className="min-w-0">
                  <h2 className="text-2xl font-black mb-1">{currentJob.title}</h2>
                  <p className="text-muted-foreground font-medium">{currentJob.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="gap-1 capitalize">
                  <MapPin className="w-3 h-3" />
                  {currentJob.type}
                </Badge>
                <Badge variant="secondary">{currentJob.compensation}</Badge>
                {currentJob.ageRequirement && (
                  <Badge variant="outline">{currentJob.ageRequirement}</Badge>
                )}
              </div>

              <p className="text-sm text-foreground/80 mb-4">{currentJob.description}</p>

              <div className="flex flex-wrap gap-2">
                {currentJob.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border mt-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span>Job {index + 1} of {jobs.length}</span>
                <span>← Skip · Save →</span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleSkip}
                  className="bg-secondary hover:bg-secondary/80 text-foreground rounded-full p-3.5 transition-all active:scale-95"
                  aria-label="Skip"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setApplyJobId(currentJob.id)}
                  disabled={appliedJobIds.includes(currentJob.id)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 transition-all active:scale-95 disabled:opacity-50"
                  aria-label="Apply"
                >
                  <Zap className="w-6 h-6" />
                </button>
                <button
                  onClick={handleSave}
                  className="bg-secondary hover:bg-secondary/80 text-foreground rounded-full p-3.5 transition-all active:scale-95"
                  aria-label="Save"
                >
                  <Heart
                    className="w-5 h-5"
                    fill={savedJobIds.includes(currentJob.id) ? 'currentColor' : 'none'}
                  />
                </button>
              </div>
            </div>
          </motion.div>
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
