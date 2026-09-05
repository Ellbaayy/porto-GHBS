import { Reveal } from "@/components/motion/Reveal";

export function SectionHeader({
  title,
  meta,
}: {
  title: string;
  meta?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-14 border-b-2 border-ink pb-5">
      <h2 className="section-title text-[clamp(1.75rem,3.5vw,2.75rem)]">{title}</h2>
      {meta ? <p className="section-meta mt-3">{meta}</p> : null}
    </Reveal>
  );
}
