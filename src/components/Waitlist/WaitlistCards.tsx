import React from "react";

interface WaitlistCardsProps {
  onJoinClick: () => void;
}

const surfaces = [
  { name: "Notch HUD", action: "Glance at momentum.", body: "Streaks, timers and media stay at the top edge of your work, not in another window.", image: "/assets/notch-island-clean.png" },
  { name: "Menu Bar", action: "Check progress in one click.", body: "Your daily state is there when you need it, without opening the workspace.", image: "/assets/menubar-hub-clean.png" },
  { name: "Command Engine", action: "Update without touching the mouse.", body: "Use ⌘⇧B to add progress or begin a focus sprint while your hands stay on the keyboard.", image: "/assets/command-engine-clean.png" },
  { name: "Workspace", action: "See the system behind the streak.", body: "Review milestones, trajectory and the work that compounds over time.", image: "/assets/dashboard-clean.png" },
  { name: "Spirit", action: "Break down what feels too large.", body: "An optional AI companion for pacing and milestone planning when you explicitly call on it.", image: "/assets/spirit-companion-clean.png" },
];

const models = [
  ["Habit", "Gym four times a week"], ["Count", "1,250 LeetCode problems"],
  ["Deadline", "Ship before October 30"], ["Milestone", "Build, beta, launch"],
  ["Duration", "100 hours of deep work"], ["Avoidance", "30 days without social media"],
];

export const WaitlistCards: React.FC<WaitlistCardsProps> = ({ onJoinClick }) => (
  <>
    <section className="context-section" aria-labelledby="context-title">
      <div className="context-copy">
        <p className="section-kicker">The problem</p>
        <h2 id="context-title">Productivity apps make you leave the work to manage the work.</h2>
        <p>You remember something, open a dashboard, hunt for the right field, then lose the thread. Beacon reduces that detour to a glance, a command or a single click.</p>
        <div className="context-steps" aria-label="Beacon context preservation flow"><span>Glance</span><span>Update</span><span>Move on</span></div>
      </div>
      <figure className="context-visual"><img src="/assets/context-preservation-macbook.png" alt="A MacBook on an obsidian desk with the notch subtly illuminated by Beacon" loading="lazy" /></figure>
    </section>

    <section id="surfaces" className="surfaces-section" aria-labelledby="surfaces-title">
      <div className="surfaces-heading">
        <p className="section-kicker">How Beacon works</p>
        <h2 id="surfaces-title">Five surfaces. One state.</h2>
        <p>The notch is where you glance. Beacon is where everything stays in sync.</p>
      </div>
      <div className="surface-rail">
        {surfaces.map((surface) => <article className="surface-card" key={surface.name}>
          <img src={surface.image} alt={`${surface.name} in Beacon`} loading="lazy" />
          <div><p className="surface-name">{surface.name}</p><h3>{surface.action}</h3><p>{surface.body}</p></div>
        </article>)}
      </div>
    </section>

    <section id="models" className="models-section" aria-labelledby="models-title">
      <div className="models-copy"><h2 id="models-title">Not every goal should be tracked the same way.</h2><p>Beacon uses progress models because a streak, a countdown and a long-term target need different signals to stay useful.</p></div>
      <div className="models-grid">{models.map(([model, example]) => <article key={model} className="model-item"><h3>{model}</h3><p>{example}</p></article>)}</div>
    </section>

    <section id="engineering" className="engineering-section" aria-labelledby="engineering-title">
      <div className="engineering-copy"><p className="section-kicker">Built to run quietly</p><h2 id="engineering-title">It runs quietly. You don't.</h2><p>Beacon is built specifically around macOS, with a React and Electron interface, local SQLite storage, and hardware-accelerated rendering.</p></div>
      <div className="engineering-specs">
        <article><strong>0.1%</strong><span>Idle CPU</span><p>Background surfaces stay restrained when you do not need them.</p></article>
        <article><strong>~45MB</strong><span>Memory target</span><p>Designed to avoid becoming another resource-heavy workspace.</p></article>
        <article><strong>SQLite</strong><span>Local-first storage</span><p>Your goals, habits and progress live on your Mac by default.</p></article>
        <article><strong>⌘⇧B</strong><span>Global shortcut</span><p>Update your system without leaving the keyboard.</p></article>
      </div>
    </section>

    <section id="pioneer" className="pioneer-section" aria-labelledby="pioneer-title">
      <div><p className="section-kicker">Pioneer lifetime license</p><h2 id="pioneer-title">$29 once. Keep Beacon forever.</h2><p>Reserve your Pioneer eligibility before public launch. No payment today.</p></div>
      <div className="pioneer-inclusions"><span>All five Beacon surfaces</span><span>All six progress models</span><span>Unlimited personal Macs</span><span>Future core app updates</span><span>No subscription</span><span>30-day refund guarantee</span><p>Optional cloud services, if introduced, are separately priced.</p><button type="button" onClick={onJoinClick} className="pioneer-button">Reserve Pioneer License</button></div>
    </section>
  </>
);
