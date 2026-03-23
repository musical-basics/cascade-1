import type { ReactNode } from 'react';
import './PhaseLane.css';

interface PhaseLaneProps {
  phaseNumber: number;
  children: ReactNode;
}

export function PhaseLane({ phaseNumber, children }: PhaseLaneProps) {
  return (
    <section className="phase-lane" data-phase={phaseNumber}>
      <div className="lane-header">
        <span className="lane-label">Phase {phaseNumber}</span>
        <span className="lane-count" />
      </div>
      <div className="lane-cards">{children}</div>
    </section>
  );
}
