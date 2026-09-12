import Image from "next/image";
import { certifications } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger } from "@/components/motion/Stagger";

/**
 * Certifications — proofs of craft, stamped and dated.
 *
 * Each card shows the issued certificate itself (serial numbers, QR,
 * and signatures redacted for public display) above its ledger line.
 * Cards reuse the project-card hover language (accent border, deeper
 * pop shadow, vinyl sheen) and open the full redacted certificate in
 * a new tab. Images are local webp files served through the Next
 * optimizer; every number shown is read straight off the certificates.
 */
export function Certifications() {
  return (
    <section id="certifications" className="scene-host region-peach relative isolate overflow-hidden py-20 md:py-28 scroll-mt-24">
      <Container>
        <SectionHeader title="Certifications" meta="Proofs of craft, stamped and dated" />

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" gap={0.1}>
          {certifications.map((c) => (
            <a
              key={c.title}
              data-stagger-item
              href={c.image}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${c.title} (opens full certificate in new tab)`}
              className="card-pop project-card relative flex flex-col overflow-hidden no-underline"
            >
              <span className="relative block aspect-[4/3] border-b-[1.5px] border-ink bg-paper-2">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-3"
                />
              </span>
              <span className="flex flex-col gap-2 p-5">
                <span className="card-index chip font-display text-sm tabular self-start">
                  {c.year}
                </span>
                <strong className="block text-base leading-snug text-ink">{c.title}</strong>
                <span className="m-0 text-muted text-sm leading-relaxed">{c.desc}</span>
              </span>
            </a>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
