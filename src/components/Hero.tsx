import { profile, heroStats, marqueeWords } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="hero" className="slide-section">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-16 items-end">
          {/* Left: main display */}
          <div>
            <span className="inline-block mb-7 px-3 py-1.5 text-[12px] font-mono uppercase tracking-[0.08em] text-coral-deep bg-coral-soft rounded-full">
              {profile.tagline}
            </span>

            <div className="relative inline-block">
              {/* Pop-art splash background */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <span className="absolute -top-3 -left-6 w-32 h-10 md:w-44 md:h-12 bg-coral rounded-full opacity-90 rotate-[-6deg] blur-[1px]" />
                <span className="absolute top-6 -right-8 w-28 h-8 md:w-40 md:h-10 bg-lemon rounded-full opacity-90 rotate-[5deg]" />
                <span className="absolute -bottom-2 left-10 w-36 h-8 md:w-52 md:h-10 bg-cobalt rounded-full opacity-90 rotate-[-3deg] blur-[1px]" />
                <span className="absolute bottom-10 -right-4 w-24 h-8 md:w-32 md:h-10 bg-plum rounded-full opacity-80 rotate-[7deg]" />
              </span>

              <h1 className="font-serif font-normal text-[clamp(58px,11vw,156px)] leading-[0.92] tracking-[-0.025em] mb-9">
                <span className="text-ink">Gesang</span>
                <br />
                <span className="text-cobalt-deep">Hemas</span>
                <br />
                <em className="text-plum">Bayu Sekti.</em>
              </h1>
            </div>

            <p className="max-w-[56ch] text-[clamp(16px,1.3vw,19px)] text-ink-soft leading-relaxed mb-9">
              Informatics student at{" "}
              <span className="hl">{` `}</span>
              <strong className="text-ink font-semibold hl">President University</strong>{" "}
              — focused on{" "}
              <strong className="text-ink font-semibold hl hl-coral">
                Artificial&nbsp;Intelligence
              </strong>
              ,{" "}
              <strong className="text-ink font-semibold hl hl-cobalt">
                Computer&nbsp;Vision
              </strong>
              , and building intelligent systems that turn ideas into working software.
            </p>

            <div className="flex flex-wrap gap-3.5">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-[22px] py-[14px] text-[14px] font-medium rounded-full bg-ink text-bg hover:bg-accent-deep hover:-translate-y-px transition"
              >
                View Projects →
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-[22px] py-[14px] text-[14px] font-medium rounded-full border border-line-strong text-ink hover:border-ink hover:bg-bg-soft transition"
              >
                About me
              </a>
            </div>
          </div>

          {/* Right: stat cards */}
          <aside className="grid grid-cols-2 gap-3.5">
            {/* big card spans full */}
            <div className="col-span-2 bg-coral-soft border border-coral/30 rounded-[18px] p-[22px] flex flex-col gap-1.5 hover:border-coral transition">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-coral-deep">
                {heroStats[0].label}
              </span>
              <span className="font-serif text-[clamp(40px,5vw,64px)] leading-none text-coral-deep">
                {heroStats[0].display}
              </span>
              <span className="text-[12px] text-coral-deep/80">{heroStats[0].foot}</span>
            </div>

            <div className="bg-cobalt-soft border border-cobalt/40 rounded-[18px] p-[22px] flex flex-col gap-1.5 hover:border-cobalt-deep transition">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-cobalt-deep">
                {heroStats[1].label}
              </span>
              <span className="font-serif text-[clamp(24px,2.5vw,32px)] leading-none text-cobalt-deep">
                {heroStats[1].display}
              </span>
              <span className="text-[12px] text-cobalt-deep/80">{heroStats[1].foot}</span>
            </div>

            <div className="bg-lemon-soft border border-lemon/50 rounded-[18px] p-[22px] flex flex-col gap-1.5 hover:border-lemon-deep transition">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-lemon-deep">
                {heroStats[2].label}
              </span>
              <span className="font-serif text-[clamp(40px,5vw,64px)] leading-none text-lemon-deep">
                {heroStats[2].display}
              </span>
              <span className="text-[12px] text-lemon-deep/85">{heroStats[2].foot}</span>
            </div>
          </aside>
        </div>
      </div>

      {/* Marquee */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14 mt-12 md:mt-20">
        <div
          className="border-y border-line overflow-hidden py-3.5"
          aria-hidden="true"
        >
          <div className="marquee-track">
            {[...marqueeWords, ...marqueeWords].flatMap((w, i) => (
              <span key={`${w}-${i}`}>
                {w}
                {i % 2 === 0 ? " ·" : ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}