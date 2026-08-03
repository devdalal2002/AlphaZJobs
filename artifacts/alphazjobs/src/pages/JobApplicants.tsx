import { Link, useParams } from 'wouter';
import { ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/UserAvatar';
import { TopNav } from '@/components/TopNav';
import { BottomNav } from '@/components/BottomNav';
import { sampleUsers } from '@/data/mock-data';
import { useUser } from '@/contexts/UserContext';

export default function JobApplicants() {
  const { jobId } = useParams<{ jobId: string }>();
  const { postedJobs, applicationsForJob } = useUser();
  const job = postedJobs.find((j) => j.id === jobId);
  const applications = jobId ? applicationsForJob(jobId) : [];

  if (!job) {
    return (
      <div className="min-h-[100dvh] bg-background md:pt-16 flex items-center justify-center">
        <TopNav />
        <div className="text-center">
          <p className="text-muted-foreground mb-4">This job posting couldn't be found.</p>
          <Link href="/employer">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8 md:pt-16">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/employer">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>

        <h1 className="text-3xl font-black mb-1">{job.title}</h1>
        <p className="text-muted-foreground mb-8">
          {job.company} · {applications.length} applicant{applications.length === 1 ? '' : 's'}
        </p>

        {applications.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <p className="text-muted-foreground">No applications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
              const isSampleUser = sampleUsers.some((u) => u.id === app.applicantId);
              const profileHref = isSampleUser ? `/people/${app.applicantId}` : '/profile';

              return (
                <div key={app.id} className="bg-card border border-border rounded-lg p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <UserAvatar name={app.applicantName} src={app.applicantAvatar} className="w-11 h-11 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold truncate">{app.applicantName}</h3>
                        <span className="text-xs text-muted-foreground shrink-0">{app.appliedAt}</span>
                      </div>
                      <Link href={profileHref}>
                        <span className="text-xs text-primary underline cursor-pointer">View profile</span>
                      </Link>
                    </div>
                  </div>

                  {app.note && (
                    <p className="text-sm text-foreground/80 mb-3 bg-secondary/30 rounded-lg p-3">
                      "{app.note}"
                    </p>
                  )}

                  {app.receipts.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                        Showcased Receipts
                      </p>
                      <div className="space-y-2">
                        {app.receipts.map((receipt) => (
                          <div
                            key={receipt.id}
                            className="flex items-center justify-between gap-2 bg-secondary/30 rounded-lg p-2.5"
                          >
                            <span className="text-sm font-medium">{receipt.challengeTitle}</span>
                            {receipt.status === 'verified' ? (
                              <Badge variant="default" className="text-xs gap-1 shrink-0">
                                <CheckCircle2 className="w-3 h-3" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs gap-1 shrink-0">
                                <Clock className="w-3 h-3" />
                                Pending
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
