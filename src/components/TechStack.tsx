import { techStack } from "@/data/portfolio";

export function TechStack() {
  return (
    <section id="tech" className="slide-section">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14">
        <header className="section-head mb-12 md:mb-14">
          <span className="section-num section-num-cobalt">02</span>
          <h2 className="section-title text-[clamp(28px,4vw,44px)]">Tech stack</h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-9">
          {techStack.map((col, i) => {
            const accentBar = [
              "border-t-coral",
              "border-t-cobalt",
              "border-t-plum",
              "border-t-accent",
            ][i];
            const headingColor = [
              "text-coral-deep",
              "text-cobalt-deep",
              "text-plum-deep",
              "text-accent-deep",
            ][i];
            return (
              <div key={col.heading} className={`border-t-2 ${accentBar} pt-[18px]`}>
                <h3
                  className={`font-mono text-[12px] uppercase tracking-[0.08em] font-medium m-0 mb-[18px] ${headingColor}`}
                >
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {col.items.map((it) => (
                    <li
                      key={it}
                      className="text-[18px] text-ink py-1 border-b border-line last:border-b-0"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}