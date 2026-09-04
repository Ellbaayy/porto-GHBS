import { contact } from "@/data/portfolio";
import { scenes } from "@/data/scenes";
import { Container } from "@/components/ui/Container";
import { Scene } from "@/components/Scene";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";

export function Contact() {
  return (
    <section id="contact" className="scene-host region-coral relative isolate overflow-hidden py-20 md:py-28">
      <Scene scene={scenes.contact} />
      <Container>
        <SectionHeader title="Get in touch" meta="open to collaboration" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <Reveal className="max-w-[52ch]">
            <p className="font-display text-[clamp(1.4rem,2.3vw,1.9rem)] leading-[1.35] text-ink m-0 mb-5">
              {contact.intro}
            </p>
            <p className="text-ink-2 text-[15px] m-0 border-l-2 border-accent pl-4">
              {contact.vision}
            </p>
          </Reveal>

          <Stagger gap={0.08}>
          <ul className="border-t border-rule">
            {contact.links.map((l) => (
              <li
                key={l.label}
                data-stagger-item
                className="grid grid-cols-[110px_1fr] gap-4 items-center py-5 border-b border-rule"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                  {l.label}
                </span>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-[clamp(16px,1.6vw,20px)] text-ink hover:text-accent transition-colors"
                >
                  {l.value}
                </a>
              </li>
            ))}
            </ul>
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
