import { Link } from 'wouter';
import { Edit, Sparkles, ExternalLink, Settings, ShieldCheck, Bookmark, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/UserAvatar';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { currentUser as fallbackUser, jobs } from '@/data/mock-data';

function getAgeDisplay(age: number): string {
  if (age < 18) {
    const lower = Math.floor(age / 2) * 2;
    return `${lower}-${lower + 1}`;
  }
  return String(age);
}

export default function Profile() {
  const { t } = useLanguage();
  const { user, savedJobIds, appliedJobIds, toggleSaveJob } = useUser();
  const displayUser = user ?? fallbackUser;
  const isMinor = displayUser.age < 18;
  const trackedJobIds = Array.from(new Set([...savedJobIds, ...appliedJobIds]));
  const trackedJobs = jobs.filter((job) => trackedJobIds.includes(job.id));

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8 md:pt-16">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <UserAvatar name={displayUser.name} src={displayUser.avatar} className="w-20 h-20 text-2xl" />
            <div>
              <h1 className="text-3xl font-black">{displayUser.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {isMinor ? (
                  <Badge variant="secondary" className="text-xs font-semibold">
                    {getAgeDisplay(displayUser.age)}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">{displayUser.age}</span>
                )}
                <span className="text-muted-foreground">· {displayUser.bio}</span>
              </div>
              {isMinor && (
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  <span>Protected mode active</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/settings">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/profile/edit">
              <Button variant="outline" size="sm" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </Link>
          </div>
        </div>

        {/* Minor safety notice */}
        {isMinor && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold mb-1">Restricted mode is on</p>
              <p className="text-xs text-muted-foreground">
                Only mentors and verified employers can message you directly. Your exact age is hidden — a range is shown instead. You can manage these settings in{' '}
                <Link href="/settings">
                  <span className="text-primary underline cursor-pointer">Settings</span>
                </Link>
                .
              </p>
            </div>
          </div>
        )}

        {/* AI Match CTA */}
        <Link href="/ai-match">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-6 mb-8 hover:border-primary/50 transition-all group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">{t.buttons.aiMatch}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get personalized job matches based on your skills and interests
                </p>
              </div>
              <ExternalLink className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Saved / Applied Jobs */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-primary" />
            Saved jobs
          </h2>
          {trackedJobs.length > 0 ? (
            <div className="space-y-3">
              {trackedJobs.map((job) => {
                const isApplied = appliedJobIds.includes(job.id);
                const isSaved = savedJobIds.includes(job.id);
                return (
                  <div
                    key={job.id}
                    className="bg-card border border-border rounded-lg p-4 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold truncate">{job.title}</h3>
                        {isApplied && (
                          <Badge variant="outline" className="text-xs">Applied</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                      <p className="text-sm font-semibold text-primary mt-1">{job.compensation}</p>
                    </div>
                    {isSaved && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={() => toggleSaveJob(job.id)}
                        aria-label="Remove from saved"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No saved jobs yet.{' '}
              <Link href="/discover">
                <span className="text-primary underline cursor-pointer">Browse opportunities</span>
              </Link>
            </p>
          )}
        </div>

        {/* Top Skills */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t.headings.profileTopSkills}</h2>
          {displayUser.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {displayUser.skills.map((skill) => (
                <Badge key={skill} variant="default" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {t.empty.noSkills}{' '}
              <Link href="/profile/edit">
                <span className="text-primary underline cursor-pointer">Add some</span>
              </Link>
            </p>
          )}
        </div>

        {/* Interests */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t.headings.profileInterests}</h2>
          {displayUser.interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {displayUser.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="text-sm">
                  {interest}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t.empty.noInterests}</p>
          )}
        </div>

        {/* Looking For */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">{t.headings.profileLookingFor}</h2>
          <div className="flex flex-wrap gap-2">
            {displayUser.lookingFor.map((item) => (
              <Badge key={item} variant="outline" className="text-sm">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects */}
        {displayUser.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">{t.headings.profileProjects}</h2>
            <div className="space-y-3">
              {displayUser.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all"
                >
                  <p className="text-sm font-medium">{project}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
