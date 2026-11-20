import Countdown from "@/components/Countdown";
import Event from "@/components/Event";
import Families from "@/components/Families";
import Footer from "@/components/Footer";
import GiftBox from "@/components/GiftBox";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import RSVP from "@/components/RSVP";
import Timeline from "@/components/Timeline";

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full">
      <Hero />
      <Families />
      <Countdown />
      <Timeline />
      <Event />
      <GiftBox />
      <RSVP />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
