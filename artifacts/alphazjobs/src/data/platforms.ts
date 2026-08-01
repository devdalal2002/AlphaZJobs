import { Github, Instagram, Youtube, Figma, Dribbble, Camera, Code2, Music2, LucideIcon } from 'lucide-react';

export type PlatformId =
  | 'github'
  | 'tiktok'
  | 'instagram'
  | 'youtube'
  | 'figma'
  | 'dribbble'
  | 'unsplash'
  | 'leetcode';

export interface PlatformMeta {
  id: PlatformId;
  label: string;
  icon: LucideIcon;
  urlTemplate: (handle: string) => string;
}

function stripAt(handle: string): string {
  return handle.replace(/^@/, '');
}

export const platforms: PlatformMeta[] = [
  { id: 'github', label: 'GitHub', icon: Github, urlTemplate: (h) => `https://github.com/${stripAt(h)}` },
  { id: 'tiktok', label: 'TikTok', icon: Music2, urlTemplate: (h) => `https://tiktok.com/@${stripAt(h)}` },
  { id: 'instagram', label: 'Instagram', icon: Instagram, urlTemplate: (h) => `https://instagram.com/${stripAt(h)}` },
  { id: 'youtube', label: 'YouTube', icon: Youtube, urlTemplate: (h) => `https://youtube.com/@${stripAt(h)}` },
  { id: 'figma', label: 'Figma', icon: Figma, urlTemplate: (h) => `https://figma.com/@${stripAt(h)}` },
  { id: 'dribbble', label: 'Dribbble', icon: Dribbble, urlTemplate: (h) => `https://dribbble.com/${stripAt(h)}` },
  { id: 'unsplash', label: 'Unsplash', icon: Camera, urlTemplate: (h) => `https://unsplash.com/@${stripAt(h)}` },
  { id: 'leetcode', label: 'LeetCode', icon: Code2, urlTemplate: (h) => `https://leetcode.com/${stripAt(h)}` },
];

export const platformMap: Record<PlatformId, PlatformMeta> = platforms.reduce(
  (acc, p) => ({ ...acc, [p.id]: p }),
  {} as Record<PlatformId, PlatformMeta>
);
