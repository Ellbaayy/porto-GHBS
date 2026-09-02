import { learning, agentTopics } from "@/data/portfolio";

const rowAccents = [
  "border-l-coral",
  "border-l-cobalt",
  "border-l-plum",
  "border-l-lemon-deep",
  "border-l-coral",
  "border-l-cobalt",
  "border-l-plum",
  "border-l-lemon-deep",
];

export function Learning() {
  return (
    <section id="learning" className="slide-section">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 lg:px-14">
        <header className="section-head mb-12 md:mb-14">
          <span className="section-num section-num-plum">04</span>
          <h2 className="section-title text-[clamp(28px,4vw,44px)]">Currently learning</h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-14 items-start">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr>
                  <th className="text-left py-4 px-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted font-medium border-b border-ink">
                    Area
                  </th>
                  <th className="text-left py-4 px-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted font-medium border-b border-ink">
                    Focus
                  </th>
                </tr>
              </thead>
              <tbody>
                {learning.map((l, i) => (
                  <tr
                    key={l.area}
                    className={`border-b border-line last:border-b-0 border-l-[3px] ${rowAccents[i % rowAccents.length]}`}
                  >
                    <td className="py-4 px-3.5 font-medium text-ink align-top">{l.area}</td>
                    <td className="py-4 px-3.5 text-ink-soft align-top">{l.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Agents side card */}
          <aside className="bg-cobalt-soft border border-cobalt/30 rounded-[18px] p-7 hover:border-cobalt transition">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] text-cobalt-deep font-medium m-0 mb-[14px]">
              Exploring AI Agents
            </h3>
            <p className="text-ink-soft text-[15px] m-0 mb-[18px]">
              I&apos;m exploring how AI agents can interact with tools, files, applications, and
              development environments to automate complex workflows.
            </p>
            <ul className="grid gap-2 mb-5">
              {agentTopics.map((t) => (
                <li
                  key={t}
                  className="relative pl-[22px] text-[14px] text-ink before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-[10px] before:h-[2px] before:bg-cobalt-deep"
                >
                  {t}
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-cobalt-deep/80 border-t border-dashed border-cobalt/40 pt-4 mt-2">
              The long-term goal is to build systems where an AI agent can understand a project,
              interact with its files and tools, execute tasks, test the result, and continuously
              improve the implementation.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}