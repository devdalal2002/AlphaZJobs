import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Settings() {
  const { language, setLanguage } = useLanguage();

  const isChronicallyOnline = language === 'en-chronically-online';

  const handleLanguageToggle = () => {
    setLanguage(isChronicallyOnline ? 'en-us' : 'en-chronically-online');
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/profile">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-black mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Language Toggle */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">Language Mode</Label>
                <p className="text-sm text-muted-foreground">
                  {isChronicallyOnline
                    ? 'English (Chronically Online)'
                    : 'English (US)'}
                </p>
              </div>
              <Switch checked={isChronicallyOnline} onCheckedChange={handleLanguageToggle} />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about new matches and messages
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          {/* Profile Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm">Email</span>
                <span className="text-sm text-muted-foreground">alex.chen@example.com</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm">Privacy</span>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm">Account</span>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">About AlphaZJobs</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Version 1.0.0 · Made for Gen Z & Gen Alpha
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Terms
              </Button>
              <Button variant="outline" size="sm">
                Privacy
              </Button>
              <Button variant="outline" size="sm">
                Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
