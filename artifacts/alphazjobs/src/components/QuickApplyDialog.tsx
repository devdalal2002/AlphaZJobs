import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Job, sampleReceipts, currentUser as fallbackUser } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const NOTE_MAX = 140;

interface QuickApplyDialogProps {
  job: Job;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickApplyDialog({ job, open, onOpenChange }: QuickApplyDialogProps) {
  const { user, receipts, submitApplication } = useUser();
  const { toast } = useToast();
  const activeUser = user ?? fallbackUser;
  const isMinor = activeUser.age < 18;
  const verifiedReceipts = (user ? receipts : sampleReceipts).filter(
    (r) => r.status === 'verified'
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (open) {
      setSelectedIds(verifiedReceipts.map((r) => r.id));
      setNote('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, job.id]);

  const toggleReceipt = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const showcasedReceipts = verifiedReceipts.filter((r) => selectedIds.includes(r.id));
    submitApplication(job, note, showcasedReceipts);
    onOpenChange(false);
    toast({
      title: `Applied to ${job.company}! 🚀`,
      description:
        selectedIds.length > 0
          ? `Showcased ${selectedIds.length} receipt${selectedIds.length > 1 ? 's' : ''} with your application.`
          : `Your application for ${job.title} has been sent.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply to {job.title}</DialogTitle>
          <DialogDescription>{job.company}</DialogDescription>
        </DialogHeader>

        {job.ageRequirement && isMinor && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/90">
              This role has an age requirement ({job.ageRequirement}). You can still apply, but
              the employer may not be able to move forward until you meet it.
            </p>
          </div>
        )}

        {verifiedReceipts.length > 0 ? (
          <div>
            <p className="text-sm font-semibold mb-2">Showcase your Receipts</p>
            <div className="space-y-2">
              {verifiedReceipts.map((receipt) => (
                <label
                  key={receipt.id}
                  className="flex items-start gap-3 bg-card border border-border rounded-lg p-3 cursor-pointer hover:border-primary/50 transition-all"
                >
                  <Checkbox
                    checked={selectedIds.includes(receipt.id)}
                    onCheckedChange={() => toggleReceipt(receipt.id)}
                    className="mt-0.5"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{receipt.challengeTitle}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {receipt.skillsProven.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No verified Receipts yet — complete a Challenge to showcase proof of skill with
            future applications.
          </p>
        )}

        <div>
          <label className="text-sm font-semibold mb-2 block">Add a note (optional)</label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, NOTE_MAX))}
            placeholder="Why you're a fit for this role..."
            rows={3}
          />
          <p className="text-xs text-muted-foreground text-right mt-1">
            {note.length}/{NOTE_MAX}
          </p>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          Send application
        </Button>
      </DialogContent>
    </Dialog>
  );
}
