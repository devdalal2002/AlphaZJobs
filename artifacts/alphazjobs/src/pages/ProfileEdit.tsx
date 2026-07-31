import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SkillSelector } from '@/components/SkillSelector';
import { currentUser, availableSkills, availableInterests } from '@/data/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function ProfileEdit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    age: currentUser.age.toString(),
    bio: currentUser.bio,
    skills: currentUser.skills,
    interests: currentUser.interests,
  });

  const handleSave = () => {
    toast({
      title: 'Profile updated',
      description: 'Your changes have been saved.',
    });
    setLocation('/profile');
  };

  return (
    <div className="min-h-[100dvh] bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/profile')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-black">Edit Profile</h1>
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>

        {/* Form */}
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-semibold mb-2">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Age</label>
            <Input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Bio</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Skills</label>
            <SkillSelector
              availableSkills={availableSkills}
              selectedSkills={formData.skills}
              onSelectionChange={(skills) => setFormData({ ...formData, skills })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Interests</label>
            <SkillSelector
              availableSkills={availableInterests}
              selectedSkills={formData.interests}
              onSelectionChange={(interests) =>
                setFormData({ ...formData, interests })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
