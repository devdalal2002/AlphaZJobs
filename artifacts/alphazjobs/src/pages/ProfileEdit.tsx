import { useState, useRef, type ChangeEvent } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Save, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SkillSelector } from '@/components/SkillSelector';
import { UserAvatar } from '@/components/UserAvatar';
import { availableSkills, availableInterests, currentUser as fallbackUser } from '@/data/mock-data';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { fileToResizedDataUrl } from '@/lib/image';

export default function ProfileEdit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, setUser } = useUser();
  const displayUser = user ?? fallbackUser;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: displayUser.name,
    age: displayUser.age.toString(),
    bio: displayUser.bio,
    skills: displayUser.skills,
    interests: displayUser.interests,
    avatar: displayUser.avatar ?? '',
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

  const handleSave = () => {
    const updatedUser = {
      ...displayUser,
      name: formData.name,
      age: Number(formData.age),
      bio: formData.bio,
      skills: formData.skills,
      interests: formData.interests,
      avatar: formData.avatar || undefined,
    };
    setUser(updatedUser);
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
          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative w-24 h-24 rounded-full group"
            >
              <UserAvatar
                name={formData.name || displayUser.name}
                src={formData.avatar || undefined}
                className="w-24 h-24 text-2xl"
              />
              <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Camera className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
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
