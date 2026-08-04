import { Link } from 'wouter';
import { Sparkles, Bookmark, Trophy, Send, ArrowRight, Users, MessageCircle, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/UserAvatar';
import { JobCard } from '@/components/JobCard';
import { TopNav } from '@/components/TopNav';
import { BottomNav } from '@/components/BottomNav';
import { useUser } from '@/contexts/UserContext';
import { currentUser as fallbackUser, jobs } from '@/data/mock-data';

export default function Dashboard() {
  const { user, savedJobIds, appliedJobIds, receipts, isEmployer, postedJobs, applications } = useUser();
  const displayUser = user ?? fallbackUser;

  const recommended = jobs
    .map((job) => ({
      job,
      matchingSkills: job.skills.filter((s) => displayUser.skills.includes(s)).length,
    }))
    .filter((j) => j.matchingSkills > 0)
    .sort((a, b) => b.matchingSkills - a.matchingSkills)
    .slice(0, 3)
    .map((j) => j.job);

  const stats = [
    { label: 'Receipts', value: receipts.length, icon: Trophy, href: '/profile' },
    { label: 'Saved jobs', value: savedJobIds.length, icon: Bookmark, href: '/profile' },
    { label: 'Applications', value: appliedJobIds.length, icon: Send, href: '/profile' },
  ];

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8 md:pt-16">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Greeting */}
        <div className="flex items-center gap-4 mb-8">
          <UserAvatar name={displayUser.name} src={displayUser.avatar} className="w-14 h-14 text-xl" />
          <div>
            <h1 className="text-2xl md:text-3xl font-black">Hey, {displayUser.name.split(' ')[0]} 👋</h1>
            <p className="text-muted-foreground text-sm">Here's where things stand</p>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} href={stat.href}>
                <div className="bg-card border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-all cursor-pointer">
                  <Icon className="w-4 h-4 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Employer summary, if applicable */}
        {isEmployer && (
          <Link href="/employer">
            <div className="bg-card border border-border rounded-lg p-4 mb-8 flex items-center gap-3 hover:border-primary/50 transition-all cursor-pointer">
              <Briefcase className="w-5 h-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {postedJobs.length} job{postedJobs.length === 1 ? '' : 's'} posted · {applications.length} total applicant{applications.length === 1 ? '' : 's'}
                </p>
                <p className="text-xs text-muted-foreground">Manage your listings</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </div>
          </Link>
        )}

        {/* AI Match CTA */}
        <Link href="/ai-match">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-6 mb-8 hover:border-primary/50 transition-all group cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold">Get your AI matches</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Personalized job matches based on your skills and interests
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Recommended jobs */}
        {recommended.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recommended for you</h2>
              <Link href="/discover">
                <span className="text-sm text-primary underline cursor-pointer">See all</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recommended.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/rooms">
            <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3 hover:border-primary/50 transition-all cursor-pointer">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Rooms</span>
            </div>
          </Link>
          <Link href="/messages">
            <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-3 hover:border-primary/50 transition-all cursor-pointer">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Messages</span>
            </div>
          </Link>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
