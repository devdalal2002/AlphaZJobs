import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { ArrowLeft, Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SkillSelector } from '@/components/SkillSelector';
import { TopNav } from '@/components/TopNav';
import { BottomNav } from '@/components/BottomNav';
import { availableSkills, Job } from '@/data/mock-data';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const POST_PRICE = 49;

export default function PostJob() {
  const [, setLocation] = useLocation();
  const { user, postJob } = useUser();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    company: user ? `${user.name}'s Company` : '',
    description: '',
    skills: [] as string[],
    compensation: '',
    type: 'remote' as Job['type'],
    ageRequirement: '',
  });

  const [attachChallenge, setAttachChallenge] = useState(false);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');

  const [processing, setProcessing] = useState(false);

  const canSubmit =
    formData.title.trim().length > 0 &&
    formData.company.trim().length > 0 &&
    formData.description.trim().length > 0 &&
    formData.skills.length > 0 &&
    formData.compensation.trim().length > 0 &&
    (!attachChallenge || (challengeTitle.trim().length > 0 && challengeDescription.trim().length > 0));

  const handleSubmit = () => {
    if (!canSubmit) return;
    setProcessing(true);
    setTimeout(() => {
      postJob(
        {
          title: formData.title,
          company: formData.company,
          description: formData.description,
          skills: formData.skills,
          compensation: formData.compensation,
          type: formData.type,
          ageRequirement: formData.ageRequirement || undefined,
        },
        attachChallenge
          ? { title: challengeTitle, description: challengeDescription, skillsRequired: formData.skills }
          : undefined
      );
      setProcessing(false);
      toast({
        title: 'Job posted! 🎉',
        description: `$${POST_PRICE} charged. Your listing is now live in Discover.`,
      });
      setLocation('/employer');
    }, 1200);
  };

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8 md:pt-16">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/employer">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>

        <h1 className="text-3xl font-black mb-8">Post a job</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Job title</label>
            <Input
              placeholder="e.g. Junior Web Developer"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Company</label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Description</label>
            <Textarea
              placeholder="What will they actually be doing?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Required skills</label>
            <SkillSelector
              availableSkills={availableSkills}
              selectedSkills={formData.skills}
              onSelectionChange={(skills) => setFormData({ ...formData, skills })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Compensation</label>
              <Input
                placeholder="e.g. $20/hr"
                value={formData.compensation}
                onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Type</label>
              <Select
                value={formData.type}
                onValueChange={(v) => setFormData({ ...formData, type: v as Job['type'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">Onsite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Age requirement (optional)</label>
            <Input
              placeholder="e.g. 18+"
              value={formData.ageRequirement}
              onChange={(e) => setFormData({ ...formData, ageRequirement: e.target.value })}
            />
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <Label className="text-sm font-semibold">Attach a Challenge to this listing</Label>
              <Switch checked={attachChallenge} onCheckedChange={setAttachChallenge} />
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Applicants who complete it earn a Receipt specific to this role — stronger proof
              than a generic one.
            </p>
            {attachChallenge && (
              <div className="space-y-3 pt-2">
                <Input
                  placeholder="Challenge title, e.g. Fix this login bug"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                />
                <Textarea
                  placeholder="What should they actually do?"
                  value={challengeDescription}
                  onChange={(e) => setChallengeDescription(e.target.value)}
                  rows={2}
                />
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || processing}
            className="w-full gap-2"
            size="lg"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing payment...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Pay ${POST_PRICE} & post job
              </>
            )}
          </Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
