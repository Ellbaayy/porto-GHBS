import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PUSB 2027 General Gift Essay — Gesang Hemas Bayu Sekti",
  robots: { index: false, follow: false },
};

const essays: { question: string; paragraphs: string[] }[] = [
  {
    question:
      "You are assigned as a committee member for a MOSA event. A mandatory class activity is scheduled at the same time as an important event preparation meeting. How would you handle the situation while maintaining your responsibilities in both? (Minimum 150 words)",
    paragraphs: [
      "The first thing I would do is refuse to treat this as a choice between two obligations that must be made quickly. Both matter. A mandatory class activity is tied to my academic standing, which is the reason I am a student in the first place, while the event preparation meeting is tied to a commitment I already accepted when I joined the committee. Deciding too fast is how a person ends up breaking one of them by accident, so I would start by establishing the facts: the exact date, time, duration, and whether either schedule can still be adjusted.",
      "With those facts in hand, I would communicate before I improvise. I would approach the academic side first, asking my lecturer whether the class activity allows for an alternative arrangement, since many mandatory sessions still have a substitute assignment or a different time slot. In parallel, I would message the Project Manager and the relevant coordinator of the event, explain the conflict honestly, and ask which part of the preparation meeting genuinely requires my presence and which part can be covered by a teammate who reports back to me. Being transparent early is far more useful than apologizing later, because it gives the team time to redistribute work instead of discovering a gap on the day of the event.",
      "If no compromise is possible, I would prioritize the mandatory academic obligation, inform the event team as early as I can, and then compensate in a way that actually helps: completing my assigned deliverables before the meeting, sending a written update that a teammate can read aloud, and taking on the follow-up tasks that result from the discussion. I would also ask for the meeting minutes and confirm the decisions that affect my scope, so that missing one session does not turn into missing the context.",
      "In the long run, I would reduce the chance of this repeating by keeping a single shared calendar for both academic and organizational commitments, and by declaring my class schedule to the committee at the start of the project so meetings can be planned around it. To me, responsibility is not about never having a conflict; it is about anticipating one, communicating it before it becomes a problem, and making sure that neither the classroom nor the committee is left carrying the cost of my silence.",
    ],
  },
  {
    question:
      "Two weeks before your event, your committee proposes an idea that could increase participant engagement but requires additional time and resources. Some members support the idea, while others prefer to stay with the original plan. As the Project Manager, what would you consider before making your decision? (Minimum 150 words)",
    paragraphs: [
      "With only two weeks remaining, my first consideration would be whether the proposal still fits inside the time we actually have. Two weeks is enough to refine an existing plan and not enough to build a new one from scratch, so I would break the idea down into concrete tasks, assign a realistic estimate to each, and check whether those tasks can be finished before the deadline without consuming the days reserved for final checks, rehearsal, and contingency. Any timeline that leaves zero buffer is already a failed timeline, because events rarely run exactly as planned.",
      "The second consideration is resources, and I would be specific rather than general about it. Additional time means more committee hours, which has to come from somewhere, and additional resources mean budget or equipment that is either already allocated or must be requested. If the budget is fixed, the honest question is not whether the idea is good, but what we would have to remove in order to fund it. I would also check whether the required resources can realistically be secured within two weeks, including approval, procurement, and permits, since some of those processes have their own waiting time that we cannot compress.",
      "The third consideration is the impact itself. I would ask the team to state, in measurable terms, how much engagement we expect this to add and why. If the answer is only a feeling that it would be more fun, that is not yet strong enough evidence to justify changing a plan that already works. I would want to know which participants would benefit, whether the change conflicts with the event's objective, and whether it introduces new risks, especially safety, permits, or reputation, that the original plan did not carry.",
      "The fourth consideration is the team. Half the committee supporting an idea and half preferring the original plan is not a vote to be settled by majority alone, because the members who disagree will still have to execute the decision. I would invite both sides to argue their case against the same criteria, then decide as a whole and explain the reasoning openly, so that whichever direction we take, everyone understands why and can commit to it fully.",
      "Finally, I would weigh the cost of being wrong in each direction. If we adopt a rushed idea and it fails, we damage the event at the worst possible moment and likely demoralize the committee. If we keep the original plan, we lose a potential improvement but retain a predictable outcome. In most cases with two weeks left, the safer path is to keep the original plan and document the proposal as a candidate for the next event, unless the team can demonstrate that the added work is genuinely within our capacity. As a Project Manager, my responsibility is not to be the most ambitious person in the room, but to deliver an event that actually happens and meets its objective. Protecting the outcome matters more than winning an argument about whose idea was better.",
    ],
  },
];

const countWords = (paragraphs: string[]) =>
  paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;

export default function EssayPage() {
  return (
    <html lang="en">
      <body>
        <main className="print-doc">
          <header className="print-cover">
            <h1>PUSB 2027 General Gift Essay</h1>
            <p className="print-subtitle">
              Gesang Hemas Bayu Sekti &middot; Informatics / 2025 &middot; MOC
              (Ministry of Communication)
            </p>
            <p className="print-subtitle">
              President University Student Board &mdash; Malvis Cabinet
            </p>
            <hr />
          </header>

          {essays.map((e, i) => (
            <section key={e.question}>
              <h2>Essay {i + 1}</h2>
              <p className="print-question">{e.question}</p>
              {e.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              <p className="print-wordcount">
                Word count: {countWords(e.paragraphs)} words
              </p>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}
