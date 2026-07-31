import { useState } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SkillSelectorProps {
  availableSkills: string[];
  selectedSkills: string[];
  onSelectionChange: (skills: string[]) => void;
  placeholder?: string;
}

export function SkillSelector({
  availableSkills,
  selectedSkills,
  onSelectionChange,
  placeholder = 'Select skills',
}: SkillSelectorProps) {
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSelectionChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onSelectionChange([...selectedSkills, skill]);
    }
  };

  return (
    <div className="space-y-4">
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <Badge
              key={skill}
              variant="default"
              className="gap-1 cursor-pointer"
              onClick={() => toggleSkill(skill)}
            >
              {skill}
              <X className="w-3 h-3" />
            </Badge>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {availableSkills
          .filter((skill) => !selectedSkills.includes(skill))
          .map((skill) => (
            <Button
              key={skill}
              variant="outline"
              size="sm"
              onClick={() => toggleSkill(skill)}
              className="text-xs"
            >
              {skill}
            </Button>
          ))}
      </div>
    </div>
  );
}
