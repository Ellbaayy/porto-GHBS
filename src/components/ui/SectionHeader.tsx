import { Reveal } from "@/components/motion/Reveal";

export function SectionHeader({
  title,
  meta,
}: {
  title: string;
  meta?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-14 border-b border-rule pb-5">
      <h2 className="section-title text-[clamp(1.75rem,3.5vw,2.75rem)]">{title}</h2>
      {meta ? (
        <p className="mt-3 font-mono text-xs text-muted">{meta}</p>
      ) : null}
    </Reveal>
  );
}
