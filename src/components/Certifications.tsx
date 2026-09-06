import { certifications } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Stagger } from "@/components/motion/Stagger";

/**
 * Certifications — proofs of craft, stamped and dated.
 *
 * A ledger-style list (year, title, issuer line), same voice as the
 * Achievements block. No scene photo of its own: the section stays
 * transparent over the passing panorama, with the peach region as the
 * reduced-motion fallback. Every number here is read straight off the
 * issued certificates.
 */
export function Certifications() {
  return (
    <section id="certifications" className="scene-host region-peach relative isolate overflow-hidden py-20 md:py-28">
      <Container>
        <SectionHeader title="Certifications" meta="Proofs of craft, stamped and dated" />

        <Stagger className="border-t-2 border-ink" gap={0.1}>
          <ul>
            {certifications.map((c) => (
              <li
                key={c.title}
                data-stagger-item
                className="grid grid-cols-[80px_1fr] gap-5 items-start py-5 border-b border-rule last:border-b-0 text-safe"
              >
                <span className="font-display text-base text-accent tabular">{c.year}</span>
                <div>
                  <strong className="block text-base mb-1 text-ink">{c.title}</strong>
                  <p className="m-0 text-muted text-sm">{c.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </Stagger>
      </Container>
    </section>
  );
}
