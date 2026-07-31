import { Link } from 'wouter';
import { Edit, Sparkles, ExternalLink, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/UserAvatar';
import { BottomNav } from '@/components/BottomNav';
import { currentUser } from '@/data/mock-data';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Profile() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <UserAvatar name={currentUser.name} className="w-20 h-20 text-2xl" />
            <div>
              <h1 className="text-3xl font-black">{currentUser.name}</h1>
              <p className="text-muted-foreground">
                {currentUser.age} · {currentUser.bio}
              </p>
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

        {/* Top Skills */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Top skills</h2>
          <div className="flex flex-wrap gap-2">
            {currentUser.skills.map((skill) => (
              <Badge key={skill} variant="default" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Interests</h2>
          <div className="flex flex-wrap gap-2">
            {currentUser.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-sm">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Looking for</h2>
          <div className="flex flex-wrap gap-2">
            {currentUser.lookingFor.map((item) => (
              <Badge key={item} variant="outline" className="text-sm">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Sample projects</h2>
          <div className="space-y-3">
            {currentUser.projects.map((project, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all"
              >
                <p className="text-sm font-medium">{project}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
