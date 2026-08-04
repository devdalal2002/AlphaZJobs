import { Link } from 'wouter';
import { Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { Quest, challenges, jobs } from '@/data/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

interface QuestCardProps {
  quest: Quest;
}

export function QuestCard({ quest }: QuestCardProps) {
  const { receipts } = useUser();
  const verifiedChallengeIds = new Set(
    receipts.filter((r) => r.status === 'verified').map((r) => r.challengeId)
  );
  const completedCount = quest.challengeIds.filter((id) => verifiedChallengeIds.has(id)).length;
  const total = quest.challengeIds.length;
  const isComplete = completedCount === total;
  const unlockedJob = jobs.find((j) => j.id === quest.unlocksJobId);

  return (
    <div
      className={cn(
        'border rounded-lg p-6 transition-all',
        isComplete ? 'border-primary bg-primary/5' : 'border-border bg-card'
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="text-lg font-bold">{quest.title}</h3>
        </div>
        {isComplete && (
          <Badge className="text-xs gap-1 shrink-0">
            <CheckCircle2 className="w-3 h-3" />
            Unlocked
          </Badge>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{quest.description}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {quest.challengeIds.map((id) => {
          const challenge = challenges.find((c) => c.id === id);
          const done = verifiedChallengeIds.has(id);
          return (
            <Badge key={id} variant={done ? 'default' : 'outline'} className="text-xs gap-1">
              {done ? <CheckCircle2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              {challenge?.title ?? id}
            </Badge>
          );
        })}
      </div>

      <Progress value={(completedCount / total) * 100} className="h-1.5 mb-2" />
      <p className="text-xs text-muted-foreground mb-4">
        {completedCount}/{total} steps complete
      </p>

      {isComplete && unlockedJob ? (
        <Link href="/discover">
          <Button size="sm" className="w-full">
            Apply to {unlockedJob.title} at {unlockedJob.company}
          </Button>
        </Link>
      ) : (
        <p className="text-xs text-primary font-medium">{quest.reward}</p>
      )}
    </div>
  );
}
