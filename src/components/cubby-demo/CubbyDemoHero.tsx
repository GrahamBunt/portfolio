"use client";

import { CubbyProjectMedia } from '@/components/CubbyProjectMedia';
import { CubbyDemoApp } from './CubbyDemoApp';

export function CubbyDemoHero() {
  return <CubbyProjectMedia variant="hero" showMenuBar
    wallpaper={{ src: '/work/cubby/wallpapers/alpine-stillness.webp', zoom: 125 }}
    appPreview={<CubbyDemoApp />} />;
}
