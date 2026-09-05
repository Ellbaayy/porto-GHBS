import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Learning } from "@/components/Learning";
import { Journey } from "@/components/Journey";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <TechStack />
      <Projects />
      <Learning />
      <Journey />
      <Contact />
    </>
  );
}