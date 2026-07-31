import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { JobCard } from '@/components/JobCard';
import { BottomNav } from '@/components/BottomNav';
import { jobs } from '@/data/mock-data';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Discover() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2">{t.nav.discover}</h1>
          <p className="text-muted-foreground">
            {filteredJobs.length} opportunities waiting for you
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <SlidersHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Job Grid */}
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
      </div>

      <BottomNav />
    </div>
  );
}
