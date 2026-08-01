import { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { TopNav } from '@/components/TopNav';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/contexts/UserContext';

export default function Settings() {
  const { language, setLanguage, t } = useLanguage();
  const { user } = useUser();
  const isMinor = user ? user.age < 18 : false;

  const isChronicallyOnline = language === 'en-chronically-online';

  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const handleLanguageToggle = () => {
    setLanguage(isChronicallyOnline ? 'en-us' : 'en-chronically-online');
  };

  return (
    <div className="min-h-[100dvh] bg-background md:pt-16">
      <TopNav />
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

        <h1 className="text-4xl font-black mb-8">{t.headings.settingsTitle}</h1>

        <div className="space-y-6">
          {/* Minor safety banner */}
          {isMinor && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold mb-1">Restricted mode is active</p>
                <p className="text-xs text-muted-foreground">
                  Because you're under 18, some features are limited to keep you safe. Only mentors and verified employers can send you direct messages. Your exact age is hidden from other users.
                </p>
              </div>
            </div>
          )}

          {/* Language Toggle */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-semibold">{t.headings.settingsLangMode}</Label>
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
                <Label className="text-base font-semibold">{t.headings.settingsNotifications}</Label>
                <p className="text-sm text-muted-foreground">
                  {t.headings.settingsNotificationsSub}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          {/* Profile Settings */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{t.headings.settingsProfileSection}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm">Email</span>
                <span className="text-sm text-muted-foreground">
                  {user ? `${user.name.toLowerCase().replace(/\s/g, '.')}@example.com` : 'user@example.com'}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <span className="text-sm">Privacy</span>
                  {isMinor && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Lock className="w-3 h-3 text-primary" />
                      <span className="text-xs text-primary">Restrictions active</span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setPrivacyOpen(true)}>
                  Manage
                </Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <span className="text-sm">Account</span>
                  {isMinor && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Lock className="w-3 h-3 text-primary" />
                      <span className="text-xs text-primary">Restrictions active</span>
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setAccountOpen(true)}>
                  Manage
                </Button>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">{t.headings.settingsAbout}</h3>
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

      {/* Privacy Dialog */}
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Privacy Settings
            </DialogTitle>
            <DialogDescription>
              {isMinor
                ? 'Your account is in restricted mode because you are under 18.'
                : 'Manage your privacy preferences.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {isMinor ? (
              <>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2 text-primary">Minor account restrictions</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Your exact age is hidden. A range is shown instead (e.g. "16-17").</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>DMs are restricted. Only verified employers and mentors can message you directly.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>You can freely message anyone in shared Rooms.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Your profile is not shown in general people discovery to unverified users.</span>
                    </li>
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground">These restrictions are lifted automatically when you turn 18.</p>
              </>
            ) : (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Profile visibility: <span className="text-foreground font-medium">Public</span></p>
                <p>Who can message you: <span className="text-foreground font-medium">Everyone</span></p>
                <p>Show in discovery: <span className="text-foreground font-medium">Yes</span></p>
              </div>
            )}
          </div>
          <DialogClose asChild>
            <Button className="w-full mt-2">Got it</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Account Dialog */}
      <Dialog open={accountOpen} onOpenChange={setAccountOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Account Settings
            </DialogTitle>
            <DialogDescription>
              {isMinor
                ? 'Some account features are restricted for minor accounts.'
                : 'Manage your account settings.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {isMinor ? (
              <>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm font-semibold mb-2 text-primary">Minor account restrictions</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>You cannot receive unsolicited payment offers or job contracts requiring legal sign-off.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Jobs marked "18+" will show a notice before you can apply.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>All employer contacts go through the platform — no direct contact info shared.</span>
                    </li>
                  </ul>
                </div>
                <p className="text-xs text-muted-foreground">These protections are in place to keep you safe while you explore opportunities.</p>
              </>
            ) : (
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>Account type: <span className="text-foreground font-medium">Standard</span></p>
                <p>Member since: <span className="text-foreground font-medium">2026</span></p>
                <Button variant="destructive" size="sm" className="mt-2">Delete account</Button>
              </div>
            )}
          </div>
          <DialogClose asChild>
            <Button className="w-full mt-2">Got it</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
