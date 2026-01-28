
import { Hero } from '@/components/Hero';
import { Overview } from '@/components/Overview';
import { Cases } from '@/components/Cases';
import { Media } from '@/components/Media';
import { Marketing, Personality } from '@/components/ContentSections';

export default function Home() {
  return (
    <main className="w-full bg-black">
      <Hero />
      <Overview />
      <Cases />
      <Media />
      <Marketing />
      <Personality />
    </main>
  );
}
