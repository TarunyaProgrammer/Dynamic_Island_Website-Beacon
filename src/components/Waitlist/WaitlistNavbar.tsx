import React from "react";

interface WaitlistNavbarProps {
  onJoinClick: () => void;
}

export const WaitlistNavbar: React.FC<WaitlistNavbarProps> = ({ onJoinClick }) => {
  return (
    <nav className="beacon-navbar" aria-label="Main Navigation">
      <a href="#" className="beacon-nav-logo">
        <img
          src="/logo.png"
          alt="Beacon Logo"
          className="beacon-logo-img"
        />
        <span className="beacon-logo-text">BEACON</span>
      </a>

      <ul className="beacon-nav-links">
        <li>
          <a href="#surfaces">SURFACES</a>
        </li>
        <li>
          <a href="#models">PROGRESS MODELS</a>
        </li>
        <li>
          <a href="#engineering">ENGINEERING</a>
        </li>
        <li>
          <a href="https://tarunya.me" target="_blank" rel="noopener noreferrer">
            FOUNDER
          </a>
        </li>
      </ul>

      <button onClick={onJoinClick} className="beacon-nav-cta">
        RESERVE LICENSE
      </button>
    </nav>
  );
};
