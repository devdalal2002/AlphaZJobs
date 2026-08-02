import { useState } from 'react';
import { Search, SlidersHorizontal, Briefcase, Users, Trophy, X, LayoutList, Layers } from 'lucide-react';
import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { JobCard } from '@/components/JobCard';
import { ChallengeCard } from '@/components/ChallengeCard';
import { SwipeJobStack } from '@/components/SwipeJobStack';
import { UserAvatar } from '@/components/UserAvatar';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { jobs, sampleUsers, challenges, availableSkills, availableInterests, Job } from '@/data/mock-data';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

type TabType = 'jobs' | 'people' | 'challenges';
type JobsViewMode = 'list' | 'swipe';
type JobType = Job['type'];
const JOB_TYPES: JobType[] = ['remote', 'hybrid', 'onsite'];

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
  const [jobsViewMode, setJobsViewMode] = useState<JobsViewMode>('list');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleJobType = (type: JobType) => {
    setSelectedJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t2) => t2 !== type) : [...prev, type]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const clearFilters = () => {
    setSelectedJobTypes([]);
    setSelectedSkills([]);
    setSelectedInterests([]);
  };

  const activeFilterCount =
    activeTab === 'jobs'
      ? selectedJobTypes.length + selectedSkills.length
      : activeTab === 'challenges'
        ? selectedSkills.length
        : selectedSkills.length + selectedInterests.length;

  const filteredJobs = jobs.filter(
    (job) =>
      (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )) &&
      (selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type)) &&
      (selectedSkills.length === 0 ||
        job.skills.some((skill) => selectedSkills.includes(skill)))
  );

  const filteredChallenges = challenges.filter(
    (c) =>
      (c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.postedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skillsRequired.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )) &&
      (selectedSkills.length === 0 ||
        c.skillsRequired.some((skill) => selectedSkills.includes(skill)))
  );

  // Exclude first entry (Alex Chen / currentUser placeholder)
  const discoverUsers = sampleUsers.slice(1).filter(
    (u) =>
      (u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        u.interests.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (selectedSkills.length === 0 ||
        u.skills.some((s) => selectedSkills.includes(s))) &&
      (selectedInterests.length === 0 ||
        u.interests.some((i) => selectedInterests.includes(i)))
  );

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8 md:pt-16">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">{t.nav.discover}</h1>
          <p className="text-muted-foreground">
            {activeTab === 'jobs'
              ? `${filteredJobs.length} opportunities waiting for you`
              : activeTab === 'challenges'
                ? `${filteredChallenges.length} challenges to prove your skills`
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
          <button
            onClick={() => setActiveTab('challenges')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all',
              activeTab === 'challenges'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Trophy className="w-4 h-4" />
            Challenges
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={
                activeTab === 'jobs'
                  ? t.placeholders.searchJobs
                  : activeTab === 'challenges'
                    ? 'Search challenges, skills...'
                    : t.placeholders.searchPeople
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="h-12 w-12 relative">
                <SlidersHorizontal className="w-5 h-5" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto py-1 px-2 text-xs gap-1">
                    <X className="w-3 h-3" />
                    Clear all
                  </Button>
                )}
              </div>

              {activeTab === 'jobs' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Job type
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {JOB_TYPES.map((type) => (
                        <Badge
                          key={type}
                          variant={selectedJobTypes.includes(type) ? 'default' : 'outline'}
                          className="capitalize cursor-pointer"
                          onClick={() => toggleJobType(type)}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                      {availableSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'challenges' && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {availableSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'people' && (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {availableSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                      Interests
                    </p>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {availableInterests.map((interest) => (
                        <Badge
                          key={interest}
                          variant={selectedInterests.includes(interest) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleInterest(interest)}
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

        {/* Jobs tab */}
        {activeTab === 'jobs' && (
          <>
            {/* Mobile-only list/swipe toggle */}
            <div className="flex md:hidden gap-1 bg-card border border-border rounded-lg p-1 mb-6 w-fit">
              <button
                onClick={() => setJobsViewMode('list')}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
                  jobsViewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <LayoutList className="w-3.5 h-3.5" />
                List
              </button>
              <button
                onClick={() => setJobsViewMode('swipe')}
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all',
                  jobsViewMode === 'swipe'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Layers className="w-3.5 h-3.5" />
                Swipe
              </button>
            </div>

            {jobsViewMode === 'swipe' && (
              <div className="md:hidden fixed inset-0 z-[60] bg-background flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h2 className="font-bold text-lg">Swipe jobs</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setJobsViewMode('list')}
                    aria-label="Close swipe mode"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <div className="flex-1 p-4 min-h-0">
                  <SwipeJobStack
                    key={`${searchQuery}|${selectedJobTypes.join(',')}|${selectedSkills.join(',')}`}
                    jobs={filteredJobs}
                  />
                </div>
              </div>
            )}

            <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', jobsViewMode === 'swipe' && 'hidden md:grid')}>
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
            {filteredJobs.length === 0 && jobsViewMode === 'list' && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">{t.empty.noJobs}</p>
              </div>
            )}
          </>
        )}

        {/* Challenges tab */}
        {activeTab === 'challenges' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredChallenges.map((challenge, index) => (
                <ChallengeCard key={challenge.id} challenge={challenge} index={index} />
              ))}
            </div>
            {filteredChallenges.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No challenges found. Try a different search.</p>
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
                    <UserAvatar name={person.name} src={person.avatar} className="w-14 h-14" />
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

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {person.interests.slice(0, 2).map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>

                  {person.receipts && person.receipts.length > 0 && (
                    <p className="flex items-center gap-1 text-xs text-primary font-medium mb-4">
                      <Trophy className="w-3.5 h-3.5" />
                      {person.receipts.length} Receipt{person.receipts.length > 1 ? 's' : ''}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Link href={`/people/${person.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        View profile
                      </Button>
                    </Link>
                    <Link href="/messages" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Message
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            {discoverUsers.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">{t.empty.noPeople}</p>
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
