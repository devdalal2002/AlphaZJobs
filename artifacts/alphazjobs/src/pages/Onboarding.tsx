import { useState, useRef, type ChangeEvent } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, ArrowRight, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressIndicator } from '@/components/ProgressIndicator';
import { SkillSelector } from '@/components/SkillSelector';
import { UserAvatar } from '@/components/UserAvatar';
import { useUser } from '@/contexts/UserContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { availableSkills, availableInterests } from '@/data/mock-data';
import { fileToResizedDataUrl } from '@/lib/image';
import { useToast } from '@/hooks/use-toast';

const TOTAL_STEPS = 5;

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { completeOnboarding } = useUser();
  const { t } = useLanguage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    skills: [] as string[],
    interests: [] as string[],
    avatar: '',
  });

  const handlePhotoSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Not an image', description: 'Please pick an image file.' });
      return;
    }
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      setFormData((prev) => ({ ...prev, avatar: dataUrl }));
    } catch {
      toast({ title: "Couldn't load that photo", description: 'Try a different image.' });
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const bio =
        formData.skills.length > 0
          ? `${formData.skills[0]} enthusiast`
          : 'aspiring creator';
      completeOnboarding({
        name: formData.name,
        age: Number(formData.age),
        bio,
        skills: formData.skills,
        interests: formData.interests,
        avatar: formData.avatar || undefined,
      });
      setLocation('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0;
      case 2: {
        const age = Number(formData.age);
        return formData.age.trim().length > 0 && Number.isInteger(age) && age >= 13 && age <= 100;
      }
      case 3:
        return formData.skills.length > 0;
      case 4:
        return formData.interests.length > 0;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="mb-12">
          <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-black">{t.headings.onboarding1Title}</h2>
                <Input
                  placeholder={t.headings.onboarding1Placeholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-lg h-14"
                  autoFocus
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-black">{t.headings.onboarding2Title}</h2>
                <Input
                  type="number"
                  min={13}
                  max={100}
                  placeholder={t.headings.onboarding2Placeholder}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="text-lg h-14"
                  autoFocus
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black mb-2">{t.headings.onboarding3Title}</h2>
                  <p className="text-muted-foreground">{t.headings.onboarding3Sub}</p>
                </div>
                <SkillSelector
                  availableSkills={availableSkills}
                  selectedSkills={formData.skills}
                  onSelectionChange={(skills) => setFormData({ ...formData, skills })}
                />
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black mb-2">{t.headings.onboarding4Title}</h2>
                  <p className="text-muted-foreground">{t.headings.onboarding4Sub}</p>
                </div>
                <SkillSelector
                  availableSkills={availableInterests}
                  selectedSkills={formData.interests}
                  onSelectionChange={(interests) => setFormData({ ...formData, interests })}
                />
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black mb-2">{t.headings.onboarding5Title}</h2>
                  <p className="text-muted-foreground">{t.headings.onboarding5Sub}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="relative w-32 h-32 rounded-full group"
                  >
                    <UserAvatar
                      name={formData.name || '?'}
                      src={formData.avatar || undefined}
                      className="w-32 h-32 text-4xl border-2 border-dashed border-primary/30"
                    />
                    <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    {formData.avatar ? 'Change photo' : 'Upload photo'}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between">
          {currentStep > 1 ? (
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
            size="lg"
          >
            {currentStep === TOTAL_STEPS
              ? t.headings.onboardingGetStarted
              : t.headings.onboardingNext}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
