import { Link, useParams } from 'wouter';
import { ArrowLeft, MessageCircle, ShieldCheck, Trophy, CheckCircle2, Clock, Link2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/UserAvatar';
import { BottomNav } from '@/components/BottomNav';
import { TopNav } from '@/components/TopNav';
import { sampleUsers } from '@/data/mock-data';
import { platformMap, PlatformId } from '@/data/platforms';

function getAgeDisplay(age: number): string {
  if (age < 18) {
    const lower = Math.floor(age / 2) * 2;
    return `${lower}-${lower + 1}`;
  }
  return String(age);
}

export default function PersonProfile() {
  const { id } = useParams<{ id: string }>();
  const person = sampleUsers.find((u) => u.id === id);

  if (!person) {
    return (
      <div className="min-h-[100dvh] bg-background md:pt-16 flex items-center justify-center">
        <TopNav />
        <div className="text-center">
          <p className="text-muted-foreground mb-4">This person couldn't be found.</p>
          <Link href="/discover">
            <Button variant="outline">Back to Discover</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isMinor = person.age < 18;

  return (
    <div className="min-h-[100dvh] bg-background pb-20 md:pb-8 md:pt-16">
      <TopNav />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/discover">
          <Button variant="ghost" className="gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <UserAvatar name={person.name} src={person.avatar} className="w-20 h-20 text-2xl" />
            <div>
              <h1 className="text-3xl font-black">{person.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {isMinor ? (
                  <Badge variant="secondary" className="text-xs font-semibold">
                    {getAgeDisplay(person.age)}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground">{person.age}</span>
                )}
                <span className="text-muted-foreground">· {person.bio}</span>
              </div>
            </div>
          </div>
          <Link href="/messages">
            <Button size="sm" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Message
            </Button>
          </Link>
        </div>

        {isMinor && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              This user is under 18 — restricted mode is active. Only mentors and verified
              employers can message them directly.
            </p>
          </div>
        )}

        {/* Receipts */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Receipts
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Proof of what {person.name.split(' ')[0]} can actually do — earned by completing
            Challenges, not self-reported.
          </p>
          {person.receipts && person.receipts.length > 0 ? (
            <div className="space-y-3">
              {person.receipts.map((receipt) => (
                <div key={receipt.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold">{receipt.challengeTitle}</h3>
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
                  <p className="text-sm text-muted-foreground mb-2">
                    For {receipt.completedFor} · {receipt.date}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {receipt.skillsProven.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No Receipts yet.</p>
          )}
        </div>

        {/* Connected platforms */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Their vibe</h2>
          {person.platformIntegrations && person.platformIntegrations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {person.platformIntegrations.map((integration) => {
                const meta = platformMap[integration.platform as PlatformId];
                const Icon = meta?.icon ?? Link2;
                const url = meta ? meta.urlTemplate(integration.handle) : integration.handle;
                return (
                  <a
                    key={integration.platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-all group"
                  >
                    <Icon className="w-5 h-5 text-primary shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{meta?.label ?? integration.platform}</p>
                      <p className="text-xs text-muted-foreground truncate">@{integration.handle}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No platforms linked yet.</p>
          )}
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Top skills</h2>
          <div className="flex flex-wrap gap-2">
            {person.skills.map((skill) => (
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
            {person.interests.map((interest) => (
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
            {person.lookingFor.map((item) => (
              <Badge key={item} variant="outline" className="text-sm">
                {item}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects */}
        {person.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Sample projects</h2>
            <div className="space-y-3">
              {person.projects.map((project, index) => (
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
