import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { X, Heart, Zap, RotateCcw, MapPin } from 'lucide-react';
import { Job } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuickApplyDialog } from '@/components/QuickApplyDialog';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const SWIPE_THRESHOLD = 100;

const cardVariants = {
  initial: { scale: 0.96, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'right' ? 500 : -500,
    rotate: direction === 'right' ? 20 : -20,
    opacity: 0,
    transition: { duration: 0.25 },
  }),
};

interface SwipeCardProps {
  job: Job;
  index: number;
  total: number;
  saved: boolean;
  applied: boolean;
  exitDirection: 'left' | 'right';
  onSkip: () => void;
  onSave: () => void;
  onApply: () => void;
}

function SwipeCard({ job, index, total, saved, applied, exitDirection, onSkip, onSave, onApply }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);
  const saveOpacity = useTransform(x, [20, 120], [0, 1]);
  const skipOpacity = useTransform(x, [-120, -20], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSave();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSkip();
    }
  };

  return (
    <motion.div
      drag="x"
      dragElastic={1}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, touchAction: 'pan-y' }}
      custom={exitDirection}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 bg-card border-2 border-border rounded-2xl p-6 flex flex-col shadow-xl cursor-grab active:cursor-grabbing"
    >
      {/* Drag direction overlays */}
      <motion.div
        style={{ opacity: saveOpacity }}
        className="absolute top-6 right-6 border-4 border-green-500 text-green-500 font-black text-xl px-3 py-1 rounded-lg rotate-12 z-10"
      >
        SAVE
      </motion.div>
      <motion.div
        style={{ opacity: skipOpacity }}
        className="absolute top-6 left-6 border-4 border-red-500 text-red-500 font-black text-xl px-3 py-1 rounded-lg -rotate-12 z-10"
      >
        SKIP
      </motion.div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0">
            <h2 className="text-2xl font-black mb-1">{job.title}</h2>
            <p className="text-muted-foreground font-medium">{job.company}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="gap-1 capitalize">
            <MapPin className="w-3 h-3" />
            {job.type}
          </Badge>
          <Badge variant="secondary">{job.compensation}</Badge>
          {job.ageRequirement && <Badge variant="outline">{job.ageRequirement}</Badge>}
        </div>

        <p className="text-sm text-foreground/80 mb-4">{job.description}</p>

        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>Job {index + 1} of {total}</span>
          <span>← Skip · Save →</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onSkip}
            className="bg-secondary hover:bg-secondary/80 text-foreground rounded-full p-3.5 transition-all active:scale-95"
            aria-label="Skip"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={onApply}
            disabled={applied}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 transition-all active:scale-95 disabled:opacity-50"
            aria-label="Apply"
          >
            <Zap className="w-6 h-6" />
          </button>
          <button
            onClick={onSave}
            className="bg-secondary hover:bg-secondary/80 text-foreground rounded-full p-3.5 transition-all active:scale-95"
            aria-label="Save"
          >
            <Heart className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

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
      <div
        className="relative h-[520px]"
        style={{ overscrollBehaviorY: 'contain' }}
      >
        {nextJob && (
          <div className="absolute inset-0 bg-card border border-border rounded-2xl scale-[0.96] translate-y-2 opacity-60" />
        )}
        <AnimatePresence custom={exitDirection}>
          <SwipeCard
            key={currentJob.id}
            job={currentJob}
            index={index}
            total={jobs.length}
            saved={savedJobIds.includes(currentJob.id)}
            applied={appliedJobIds.includes(currentJob.id)}
            exitDirection={exitDirection}
            onSkip={handleSkip}
            onSave={handleSave}
            onApply={() => setApplyJobId(currentJob.id)}
          />
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
