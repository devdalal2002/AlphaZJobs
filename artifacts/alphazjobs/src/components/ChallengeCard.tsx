import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, Clock, Users } from 'lucide-react';
import { Challenge, sampleUsers } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { UserAvatar } from '@/components/UserAvatar';
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
  const { user, receipts, submitChallenge, squadPartners, formSquad } = useUser();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [squadOpen, setSquadOpen] = useState(false);
  const [submission, setSubmission] = useState('');

  const receipt = receipts.find((r) => r.challengeId === challenge.id);
  const partnerName = squadPartners[challenge.id];

  const suggestedTeammates = sampleUsers
    .filter((u) => u.id !== (user?.id ?? 'alex-chen'))
    .filter((u) => u.skills.some((s) => challenge.skillsRequired.includes(s)));

  const handleTeamUp = (partner: string) => {
    formSquad(challenge.id, partner);
    setSquadOpen(false);
    toast({ title: `Teamed up with ${partner}!`, description: `You'll both work on "${challenge.title}" together.` });
  };

  const handleSubmit = () => {
    submitChallenge(challenge, partnerName);
    setDialogOpen(false);
    setSubmission('');
    toast({
      title: 'Submitted for review',
      description: partnerName
        ? `You and ${partnerName} will get a shared Receipt once it's checked out.`
        : "You'll get a verified Receipt on your profile once it's checked out.",
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
          {challenge.linkedJobTitle && (
            <Badge variant="outline" className="text-xs shrink-0">
              For: {challenge.linkedJobTitle}
            </Badge>
          )}
        </div>

        <p className="text-sm text-foreground/80 mb-4">{challenge.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {challenge.skillsRequired.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {partnerName && !receipt && (
          <p className="flex items-center gap-1.5 text-xs text-primary font-medium mb-3">
            <Users className="w-3.5 h-3.5" />
            Squadded with {partnerName}
          </p>
        )}

        <div className="flex gap-2">
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
            <>
              <Button size="sm" onClick={() => setDialogOpen(true)}>
                Take this on
              </Button>
              {!partnerName && suggestedTeammates.length > 0 && (
                <Button size="sm" variant="outline" className="gap-2" onClick={() => setSquadOpen(true)}>
                  <Users className="w-4 h-4" />
                  Squad up
                </Button>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Submit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{challenge.title}</DialogTitle>
            <DialogDescription>
              Drop a link or a short note about what you built. This earns you a verified Receipt
              for {challenge.skillsRequired.join(', ')} once it's reviewed
              {partnerName ? `, shared with ${partnerName}` : ''}.
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

      {/* Squad up dialog */}
      <Dialog open={squadOpen} onOpenChange={setSquadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Squad up on {challenge.title}</DialogTitle>
            <DialogDescription>
              Team up with someone whose skills complement this Challenge. You'll both earn a
              shared Receipt when it's submitted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {suggestedTeammates.map((teammate) => (
              <div
                key={teammate.id}
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-3"
              >
                <UserAvatar name={teammate.name} src={teammate.avatar} className="w-10 h-10 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold truncate">{teammate.name}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {teammate.skills.slice(0, 2).map((s) => (
                      <Badge key={s} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button size="sm" onClick={() => handleTeamUp(teammate.name)} className="shrink-0">
                  Team up
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
