import { marqueeWords } from "@/data/portfolio";

/**
 * Marquee — the radio ticker. Real interest words from the portfolio
 * data scroll in one restrained strip; under reduced-motion the strip
 * rests as a horizontally scrollable line instead.
 */
export function Marquee() {
  const row = (prefix: string) => (
    <div aria-hidden={prefix === "b"} className="flex shrink-0 items-center">
      {marqueeWords.map((w) => (
        <span key={`${prefix}-${w}`} className="flex shrink-0 items-center">
          <span className="font-display text-lg text-ink">{w}</span>
          <span aria-hidden="true" className="mx-6 font-display text-lg text-accent">
            /
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee relative isolate overflow-hidden border-y-2 border-ink bg-paper py-3">
      <div className="marquee-track flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
