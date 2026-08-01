import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, Clock } from 'lucide-react';
import { Challenge } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
}

export function ChallengeCard({ challenge, index }: ChallengeCardProps) {
  const { receipts, submitChallenge } = useUser();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submission, setSubmission] = useState('');

  const receipt = receipts.find((r) => r.challengeId === challenge.id);

  const handleSubmit = () => {
    submitChallenge(challenge);
    setDialogOpen(false);
    setSubmission('');
    toast({
      title: 'Submitted for review',
      description: "You'll get a verified Receipt on your profile once it's checked out.",
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all group"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {challenge.title}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">Posted by {challenge.postedBy}</p>
          </div>
        </div>

        <p className="text-sm text-foreground/80 mb-4">{challenge.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {challenge.skillsRequired.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {receipt ? (
          <Button size="sm" variant="outline" disabled className="gap-2">
            {receipt.status === 'verified' ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Receipt earned
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                Under review
              </>
            )}
          </Button>
        ) : (
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            Take this on
          </Button>
        )}
      </motion.div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{challenge.title}</DialogTitle>
            <DialogDescription>
              Drop a link or a short note about what you built. This earns you a verified Receipt
              for {challenge.skillsRequired.join(', ')} once it's reviewed.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Link to your work, or describe what you did..."
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            rows={4}
          />
          <Button onClick={handleSubmit} disabled={submission.trim().length === 0} className="w-full">
            Submit for review
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
