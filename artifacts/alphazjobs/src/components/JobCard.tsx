import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Job } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface JobCardProps {
  job: Job;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { savedJobIds, appliedJobIds, toggleSaveJob, applyToJob } = useUser();
  const saved = savedJobIds.includes(job.id);
  const applied = appliedJobIds.includes(job.id);

  const handleApply = () => {
    applyToJob(job.id);
    toast({
      title: 'Applied!',
      description: `Your application for ${job.title} at ${job.company} has been sent.`,
    });
  };

  const handleSave = () => {
    toggleSaveJob(job.id);
    toast(
      saved
        ? { title: 'Removed from saved', description: `${job.title} removed from your list.` }
        : { title: 'Saved to your list', description: `${job.title} saved. Find it in your profile.` }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground">{job.company}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span className="capitalize">{job.type}</span>
        </div>
      </div>

      <p className="text-sm text-foreground/80 mb-4">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">{job.compensation}</span>
          {job.ageRequirement && (
            <span className="text-xs text-muted-foreground">{job.ageRequirement}</span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={saved ? 'default' : 'outline'}
            onClick={handleSave}
          >
            {saved ? 'Saved' : t.buttons.save}
          </Button>
          <Button
            size="sm"
            onClick={handleApply}
            disabled={applied}
            variant={applied ? 'outline' : 'default'}
          >
            {applied ? 'Applied' : t.buttons.apply}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
