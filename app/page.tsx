import { Hero } from '@/components/Hero';
import { Overview } from '@/components/Overview';
import { Cases } from '@/components/Cases';
import { Media } from '@/components/Media';
import { Marketing } from '@/components/ContentSections';
import { Values } from '@/components/Values';
import { Lifestyle } from '@/components/Lifestyle';

export default function Home() {
  return (
    <main className="w-full bg-black">
      <Hero />
      <Overview />
      <Cases />
      <Media />
      <Marketing />
      <Values />
      <Lifestyle />
    </main>
  );
}
