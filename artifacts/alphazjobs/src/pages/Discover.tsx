import { useState } from 'react';
import { Search, SlidersHorizontal, Briefcase, Users } from 'lucide-react';
import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { JobCard } from '@/components/JobCard';
import { UserAvatar } from '@/components/UserAvatar';
import { BottomNav } from '@/components/BottomNav';
import { jobs, sampleUsers } from '@/data/mock-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

type TabType = 'jobs' | 'people';

function getAgeDisplay(age: number): string {
  if (age < 18) {
    const lower = Math.floor(age / 2) * 2;
    return `${lower}-${lower + 1}`;
  }
  return String(age);
}

export default function Discover() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('jobs');

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Exclude first entry (Alex Chen / currentUser placeholder)
  const discoverUsers = sampleUsers.slice(1).filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      u.interests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">{t.nav.discover}</h1>
          <p className="text-muted-foreground">
            {activeTab === 'jobs'
              ? `${filteredJobs.length} opportunities waiting for you`
              : `${discoverUsers.length} people to connect with`}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-card border border-border rounded-lg p-1 mb-6 w-fit">
          <button
            onClick={() => setActiveTab('jobs')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all',
              activeTab === 'jobs'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Briefcase className="w-4 h-4" />
            Jobs
          </button>
          <button
            onClick={() => setActiveTab('people')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all',
              activeTab === 'people'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Users className="w-4 h-4" />
            People
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={
                activeTab === 'jobs'
                  ? 'Search jobs, companies, skills...'
                  : 'Search people, skills, interests...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Jobs tab */}
        {activeTab === 'jobs' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
            {filteredJobs.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No jobs found. Try a different search.</p>
              </div>
            )}
          </>
        )}

        {/* People tab */}
        {activeTab === 'people' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {discoverUsers.map((person, index) => (
                <div
                  key={person.id}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all group"
                  style={{
                    animation: `fadeUp 0.4s ease ${index * 0.07}s both`,
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <UserAvatar name={person.name} className="w-14 h-14" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate">
                        {person.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {getAgeDisplay(person.age)} · {person.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {person.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {person.interests.slice(0, 2).map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  <Link href="/messages">
                    <Button variant="outline" size="sm" className="w-full">
                      Message
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            {discoverUsers.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No people found. Try a different search.</p>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <BottomNav />
    </div>
  );
}
