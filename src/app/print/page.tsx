import type { Metadata } from "next";
import {
  profile,
  aboutInfo,
  techStack,
  projects,
  achievements,
  certifications,
  learning,
  journey,
  contact,
} from "@/data/portfolio";

/**
 * Document-form rendering of the portfolio, meant for printing to PDF.
 *
 * The interactive site uses a display face, animated scenes, and a
 * scroll-driven layout, none of which survive paper. This route re-renders
 * the same data in a plain document format instead, so there is still a
 * single source of truth for the content.
 */

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  robots: { index: false, follow: false },
};

export default function PrintPage() {
  return (
    <html lang="en">
      <body>
        <main className="print-doc">
          <header className="print-cover">
            <h1>{profile.name}</h1>
            <p className="print-subtitle">
              Informatics Student, President University &middot; Artificial
              Intelligence Concentration
            </p>
            <ul className="print-contact-line">
              <li>{profile.email}</li>
              <li>{contact.links[1].value}</li>
              <li>{contact.links[2].value}</li>
            </ul>
            <hr />
          </header>

          <section>
            <h2>Profile</h2>
            <p>{profile.summary}</p>
            <table className="print-table">
              <tbody>
                {aboutInfo.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2>Technical Skills</h2>
            {techStack.map((group) => (
              <p key={group.heading} className="print-skill-row">
                <strong>{group.heading}:</strong> {group.items.join(", ")}
              </p>
            ))}
          </section>

          <section>
            <h2>Projects</h2>
            {projects.map((p) => (
              <article key={p.index} className="print-project">
                <h3>
                  {p.index}. {p.title}
                  <span className="print-tag"> — {p.tag}</span>
                </h3>
                <p>{p.description}</p>
                <p className="print-meta">
                  <strong>Stack:</strong> {p.stack.join(", ")}
                </p>
                <p className="print-meta">
                  <strong>Links:</strong>{" "}
                  {p.links.map((l, i) => (
                    <span key={l.href}>
                      {i > 0 && " · "}
                      {l.label}: {l.href}
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </section>

          <section>
            <h2>Achievements</h2>
            <ul className="print-list">
              {achievements.map((a) => (
                <li key={a.title}>
                  <strong>{a.title}</strong> ({a.year}) — {a.desc}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Certifications</h2>
            <ul className="print-list">
              {certifications.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong> ({c.year}) — {c.desc}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Currently Learning</h2>
            <ul className="print-list">
              {learning.map((l) => (
                <li key={l.area}>
                  <strong>{l.area}</strong> — {l.focus}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Journey</h2>
            {journey.map((j) => (
              <div key={j.year} className="print-journey">
                <h3>
                  {j.year} — {j.heading}
                </h3>
                {j.bullets && (
                  <ul className="print-list">
                    {j.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>

          <section>
            <h2>Contact</h2>
            <p>{contact.intro}</p>
            <table className="print-table">
              <tbody>
                {contact.links.map((l) => (
                  <tr key={l.label}>
                    <th scope="row">{l.label}</th>
                    <td>{l.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </body>
    </html>
  );
}
