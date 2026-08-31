import { aboutInfo, interests } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="py-16 md:py-28">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Section header */}
        <header className="section-head mb-12 md:mb-14">
          <span className="section-num section-num-coral">01</span>
          <h2 className="section-title text-[clamp(28px,4vw,44px)]">About me</h2>
        </header>

        {/* Body grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-16 items-start">
          <div className="max-w-[60ch]">
            <p className="font-serif text-[clamp(22px,2.2vw,32px)] leading-[1.3] text-ink mb-5">
              Hi, I&apos;m{" "}
              <strong className="font-semibold hl">Gesang Hemas Bayu Sekti</strong> — an
              Informatics student at{" "}
              <strong className="font-semibold hl hl-coral">President University</strong>{" "}
              with a strong interest in{" "}
              <strong className="font-semibold hl hl-cobalt">
                Artificial Intelligence
              </strong>{" "}
              and software development.
            </p>

            <p className="text-ink-soft mb-4">
              I&apos;m passionate about exploring how AI can be transformed from an idea into
              a practical solution. My interests include{" "}
              <strong className="text-ink font-semibold hl">Machine Learning</strong>,{" "}
              <strong className="text-ink font-semibold hl hl-coral">Computer Vision</strong>,{" "}
              <strong className="text-ink font-semibold hl hl-plum">AI Agents</strong>,{" "}
              <strong className="text-ink font-semibold hl hl-cobalt">Data Science</strong>,{" "}
              <strong className="text-ink font-semibold hl">Web Development</strong>, and{" "}
              <strong className="text-ink font-semibold hl hl-coral">IoT</strong>.
            </p>

            <p className="text-ink-soft mb-7">
              I enjoy building projects, experimenting with new technologies, participating in
              competitions, and continuously improving my programming skills. My current goal is
              to become a <em className="text-accent-deep italic">highly skilled AI Engineer</em>{" "}
              and build technology that creates meaningful impact.
            </p>

            <div className="flex flex-wrap gap-3.5 mt-7">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-[22px] py-[14px] text-[14px] font-medium rounded-full bg-ink text-white hover:bg-coral hover:-translate-y-px transition"
              >
                Get in touch →
              </a>
              <a
                href="#journey"
                className="inline-flex items-center justify-center px-[22px] py-[14px] text-[14px] font-medium rounded-full border border-line-strong text-ink hover:border-cobalt hover:text-cobalt-deep hover:bg-cobalt-soft transition"
              >
                See my journey
              </a>
            </div>
          </div>

          <aside className="grid gap-[18px] lg:border-l lg:border-line lg:pl-9">
            {aboutInfo.map((it) => (
              <div key={it.label}>
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-muted mb-1">
                  {it.label}
                </span>
                <p className="m-0 text-ink font-medium">{it.value}</p>
              </div>
            ))}
          </aside>
        </div>

        {/* Interests chips */}
        <div className="mt-12 md:mt-16 pt-7 border-t border-dashed border-line">
          <span className="block font-mono text-[12px] tracking-[0.08em] uppercase text-muted mb-4">
            Areas of interest
          </span>
          <ul className="flex flex-wrap gap-2.5">
            {interests.map((tag) => (
              <li
                key={tag}
                className="text-[14px] px-[14px] py-2 border border-line-strong rounded-full text-ink-soft bg-white hover:bg-lemon hover:text-ink hover:border-lemon-deep transition cursor-default"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}