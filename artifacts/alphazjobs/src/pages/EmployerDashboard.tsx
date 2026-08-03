import { Link } from 'wouter';
import { ArrowLeft, Plus, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TopNav } from '@/components/TopNav';
import { BottomNav } from '@/components/BottomNav';
import { useUser } from '@/contexts/UserContext';

export default function EmployerDashboard() {
  const { postedJobs, applications } = useUser();

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8 md:pt-16">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/profile">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black mb-2">Employer Dashboard</h1>
            <p className="text-muted-foreground">Manage your job posts and review applicants</p>
          </div>
          <Link href="/employer/post">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Post a job
            </Button>
          </Link>
        </div>

        {postedJobs.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-lg">
            <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">You haven't posted any jobs yet.</p>
            <Link href="/employer/post">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Post your first job
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {postedJobs.map((job) => {
              const applicantCount = applications.filter((a) => a.jobId === job.id).length;
              return (
                <div
                  key={job.id}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge variant="secondary" className="capitalize shrink-0">
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">{job.compensation}</span>
                    <Link href={`/employer/jobs/${job.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Users className="w-4 h-4" />
                        {applicantCount} applicant{applicantCount === 1 ? '' : 's'}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
