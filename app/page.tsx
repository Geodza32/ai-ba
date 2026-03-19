import { Hero } from '@/components/Hero';
import { Overview } from '@/components/Overview';
import { Cases } from '@/components/Cases';
import { Media } from '@/components/Media';
import { Marketing } from '@/components/ContentSections';
import { Schedule } from '@/components/Schedule';
import { Values } from '@/components/Values';
import { Lifestyle } from '@/components/Lifestyle';
import { AiAssistant } from '@/components/AiAssistant';
import { RutubeShort } from '@/components/RutubeShort';

export default function Home() {
  return (
    <main className="w-full bg-black">
      <Hero />
      <Overview />
      <RutubeShort />
      <Cases />
      <Media />
      <Marketing />
      <Schedule />
      <Values />
      <Lifestyle />

      {/* Голосовой AI-ассистент Jarvis */}
      <AiAssistant />
    </main>
  );
}
