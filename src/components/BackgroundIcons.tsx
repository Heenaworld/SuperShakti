import React from 'react';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Wind,
  Sun,
  Feather,
  Compass,
  Lock,
  LifeBuoy,
  Flower2,
  Droplets,
  Moon,
  CloudSun,
  Anchor,
  BookOpen
} from 'lucide-react';

interface FloatingIconConfig {
  id: string;
  icon: React.ElementType;
  top: string;
  left: string;
  size: string;
  colorClass: string;
  animationClass: string;
  opacityClass: string;
  rotation?: string;
}

const BACKGROUND_ICONS: FloatingIconConfig[] = [
  {
    id: 'bg-sparkles-top-left',
    icon: Sparkles,
    top: '6%',
    left: '4%',
    size: 'w-14 h-14',
    colorClass: 'text-rose-400',
    animationClass: 'animate-float-slow',
    opacityClass: 'opacity-20',
    rotation: '-rotate-12',
  },
  {
    id: 'bg-heart-top-right',
    icon: Heart,
    top: '8%',
    left: '92%',
    size: 'w-16 h-16',
    colorClass: 'text-purple-400',
    animationClass: 'animate-float-reverse',
    opacityClass: 'opacity-15',
    rotation: 'rotate-12',
  },
  {
    id: 'bg-shield-mid-left',
    icon: ShieldCheck,
    top: '32%',
    left: '2%',
    size: 'w-20 h-20',
    colorClass: 'text-emerald-400',
    animationClass: 'animate-float-drift',
    opacityClass: 'opacity-15',
    rotation: 'rotate-6',
  },
  {
    id: 'bg-wind-mid-right',
    icon: Wind,
    top: '28%',
    left: '94%',
    size: 'w-16 h-16',
    colorClass: 'text-teal-400',
    animationClass: 'animate-float-slow',
    opacityClass: 'opacity-20',
    rotation: '-rotate-6',
  },
  {
    id: 'bg-sun-center-left',
    icon: Sun,
    top: '48%',
    left: '5%',
    size: 'w-16 h-16',
    colorClass: 'text-amber-400',
    animationClass: 'animate-float-reverse',
    opacityClass: 'opacity-20',
  },
  {
    id: 'bg-feather-center-right',
    icon: Feather,
    top: '52%',
    left: '91%',
    size: 'w-16 h-16',
    colorClass: 'text-pink-400',
    animationClass: 'animate-float-drift',
    opacityClass: 'opacity-20',
    rotation: 'rotate-45',
  },
  {
    id: 'bg-flower-lower-left',
    icon: Flower2,
    top: '68%',
    left: '3%',
    size: 'w-18 h-18',
    colorClass: 'text-rose-400',
    animationClass: 'animate-float-slow',
    opacityClass: 'opacity-20',
    rotation: 'rotate-12',
  },
  {
    id: 'bg-compass-lower-right',
    icon: Compass,
    top: '72%',
    left: '93%',
    size: 'w-18 h-18',
    colorClass: 'text-indigo-400',
    animationClass: 'animate-float-reverse',
    opacityClass: 'opacity-20',
    rotation: '-rotate-12',
  },
  {
    id: 'bg-lock-bottom-left',
    icon: Lock,
    top: '88%',
    left: '6%',
    size: 'w-14 h-14',
    colorClass: 'text-teal-400',
    animationClass: 'animate-float-drift',
    opacityClass: 'opacity-15',
  },
  {
    id: 'bg-lifebuoy-bottom-right',
    icon: LifeBuoy,
    top: '86%',
    left: '90%',
    size: 'w-16 h-16',
    colorClass: 'text-purple-400',
    animationClass: 'animate-float-slow',
    opacityClass: 'opacity-20',
    rotation: 'rotate-12',
  },
  {
    id: 'bg-droplets-subtle-1',
    icon: Droplets,
    top: '18%',
    left: '48%',
    size: 'w-12 h-12',
    colorClass: 'text-cyan-400',
    animationClass: 'animate-float-drift',
    opacityClass: 'opacity-10',
  },
  {
    id: 'bg-book-subtle-2',
    icon: BookOpen,
    top: '62%',
    left: '52%',
    size: 'w-14 h-14',
    colorClass: 'text-amber-400',
    animationClass: 'animate-float-slow',
    opacityClass: 'opacity-10',
  }
];

export const BackgroundIcons: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {BACKGROUND_ICONS.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            style={{ top: item.top, left: item.left }}
            className={`absolute ${item.size} ${item.colorClass} ${item.opacityClass} ${item.animationClass} ${item.rotation || ''} transition-opacity duration-1000 hidden sm:block`}
          >
            <IconComponent className="w-full h-full stroke-[1.25]" />
          </div>
        );
      })}
    </div>
  );
};
