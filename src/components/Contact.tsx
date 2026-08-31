import { contact } from "@/data/portfolio";

const linkColors = [
  "var(--coral)",
  "var(--cobalt)",
  "var(--plum)",
  "var(--lemon-deep)",
];

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-28">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14">
        <header className="section-head mb-12 md:mb-14">
          <span className="section-num section-num-cobalt">06</span>
          <h2 className="section-title text-[clamp(28px,4vw,44px)]">Get in touch</h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-16 items-start">
          <div>
            <p className="font-serif text-[clamp(22px,2.2vw,30px)] leading-[1.35] text-ink m-0 mb-6">
              {contact.intro}
            </p>
            <p className="font-serif italic text-[18px] text-cobalt-deep border-l-[3px] border-cobalt pl-4 m-0">
              &ldquo;{contact.vision}&rdquo;
            </p>
          </div>

          <ul className="grid border-t border-line">
            {contact.links.map((l, i) => {
              const accent = linkColors[i % linkColors.length];
              return (
                <li
                  key={l.label}
                  className="grid grid-cols-[120px_1fr] gap-[18px] items-center py-[22px] border-b border-line group"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                    {l.label}
                  </span>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="relative w-fit text-[clamp(18px,1.8vw,24px)] text-ink transition-colors"
                    style={{ ["--link-color" as never]: accent }}
                  >
                    {l.value}
                    <span
                      className="absolute left-0 -bottom-0.5 h-[1.5px] transition-all w-0 group-hover:w-full"
                      style={{ background: accent }}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}