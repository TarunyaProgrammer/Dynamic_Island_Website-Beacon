import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { X } from "lucide-react";

type Mood = "welcoming" | "observing" | "impressed" | "excited" | "shocked" | "relieved" | "chill";

interface DialogueState {
  speech: string;
  subtext: string;
  mood: Mood;
}

export const BeaconSpiritCinematic: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [temporaryReaction, setTemporaryReaction] = useState<DialogueState | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Periodic living eye blink
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  // Scroll tracking
  const { scrollYProgress } = useScroll();

  // SMOOTH UNIFIED COMPANION ORBIT (NO erratic zigzagging!)
  // Stays gracefully alongside the content in the right flank, smoothly adjusting vertical height and subtle drift
  const rawXDesktop = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.45, 0.65, 0.82, 0.92, 1.0],
    ["78vw", "75vw", "77vw", "76vw", "74vw", "72vw", "78vw"]
  );

  const rawYDesktop = useTransform(
    scrollYProgress,
    [0.0, 0.2, 0.45, 0.65, 0.82, 0.92, 1.0],
    ["20vh", "26vh", "30vh", "32vh", "28vh", "25vh", "72vh"]
  );

  // DYNAMIC SCALE MORPHING: BIG in Hero & Pricing, sleek in content sections!
  const rawScaleDesktop = useTransform(
    scrollYProgress,
    [0.0, 0.15, 0.35, 0.55, 0.75, 0.88, 0.96, 1.0],
    [1.35, 1.1, 0.92, 0.92, 1.0, 1.45, 1.1, 1.0]
  );

  // Mobile trajectory
  const rawXMobile = useTransform(scrollYProgress, [0, 1], ["62vw", "62vw"]);
  const rawYMobile = useTransform(scrollYProgress, [0, 1], ["76vh", "76vh"]);
  const rawScaleMobile = useTransform(scrollYProgress, [0, 1], [0.95, 0.95]);

  // Spring physics for organic, swimming-like motion
  const smoothConfig = { stiffness: 45, damping: 16, mass: 0.8 };
  const smoothX = useSpring(isMobile ? rawXMobile : rawXDesktop, smoothConfig);
  const smoothY = useSpring(isMobile ? rawYMobile : rawYDesktop, smoothConfig);
  const smoothScale = useSpring(isMobile ? rawScaleMobile : rawScaleDesktop, smoothConfig);

  // Section Dialogue mapped smoothly by scroll threshold
  const [activeDialogue, setActiveDialogue] = useState<DialogueState>({
    speech: "Hi, I'm Beacon Spirit! ✦",
    subtext: "I live inside your MacBook notch. Scroll down with me!",
    mood: "welcoming",
  });

  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      if (p < 0.14) {
        setActiveDialogue({
          speech: "Hi, I'm Beacon Spirit! ✦",
          subtext: "I live inside your MacBook notch. Scroll down with me!",
          mood: "welcoming",
        });
      } else if (p < 0.35) {
        setActiveDialogue({
          speech: "Look at that notch below! 🍎",
          subtext: "Hover the notch or tap [+10] to see me expand in real time.",
          mood: "excited",
        });
      } else if (p < 0.55) {
        setActiveDialogue({
          speech: "5 native macOS surfaces! ⚡",
          subtext: "0.1% CPU, 45MB RAM, zero web wrappers. Pure hardware craft.",
          mood: "impressed",
        });
      } else if (p < 0.72) {
        setActiveDialogue({
          speech: "Checkboxes are boring! 🔥",
          subtext: "We track volume quotas, timed sprints, and compounding streaks.",
          mood: "observing",
        });
      } else if (p < 0.84) {
        setActiveDialogue({
          speech: "Software you own, not rent! 💎",
          subtext: "Why pay $15/month for a to-do list? Buy once, own forever.",
          mood: "chill",
        });
      } else if (p < 0.94) {
        setActiveDialogue({
          speech: "Wait... do I have to pay?! 💸",
          subtext: "Oh wait, $29 ONCE for life? No monthly subscription?! Okay phew, take my money!",
          mood: "shocked",
        });
      } else {
        setActiveDialogue({
          speech: "30-day full refund guarantee! 🤝",
          subtext: "Crafted by Tarunya Kesharwani. See you in your MacBook notch!",
          mood: "relieved",
        });
      }
    });
  }, [scrollYProgress]);

  // Click Easter Eggs
  const funnyJokes: DialogueState[] = [
    {
      speech: "Hey! Tickling is strictly against Apple HIG! 🍎",
      subtext: "Section 4.2: Mascot pokes incur a 0.01% CPU penalty.",
      mood: "excited",
    },
    {
      speech: "I run at 0.1% CPU, but your clicks push me to 0.12%! ⚡",
      subtext: "Energy conservation mode re-engaging...",
      mood: "observing",
    },
    {
      speech: "Buy Pioneer and I'll keep your notch cozy forever 💎",
      subtext: "Permanent residency in your Liquid Retina display.",
      mood: "welcoming",
    },
    {
      speech: "14-day streak on LeetCode?! You algorithmic beast! 🔥",
      subtext: "Currently out-pacing 96% of software engineers.",
      mood: "impressed",
    },
    {
      speech: "Hit ⌘⇧B anywhere to start a 25m sprint with me! ⏱️",
      subtext: "Zero tabs needed, pure flow.",
      mood: "chill",
    },
  ];

  const handleSpiritClick = () => {
    const nextIdx = clickCount % funnyJokes.length;
    setClickCount((prev) => prev + 1);
    setTemporaryReaction(funnyJokes[nextIdx]);
    setTimeout(() => {
      setTemporaryReaction(null);
    }, 4500);
  };

  if (isDismissed) return null;

  const currentDialogue = temporaryReaction || activeDialogue;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: smoothX,
        y: smoothY,
        scale: smoothScale,
        zIndex: 100,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        transformOrigin: "center center",
      }}
    >
      {/* Dynamic Speech Bubble */}
      <motion.div
        key={currentDialogue.speech}
        initial={{ opacity: 0, y: 8, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          pointerEvents: "auto",
          width: "260px",
          backgroundColor: "#FFFFFF",
          border: "1.5px solid var(--border-subtle)",
          borderRadius: "18px",
          padding: "12px 16px",
          boxShadow: "0 12px 36px rgba(25, 26, 25, 0.12), 0 2px 8px rgba(25, 26, 25, 0.05)",
          position: "relative",
          textAlign: "left",
          cursor: "pointer",
        }}
        onClick={handleSpiritClick}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "2px",
          }}
          title="Dismiss Spirit"
        >
          <X size={13} />
        </button>

        <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--text-ink)", display: "block", marginBottom: "3px", paddingRight: "12px", lineHeight: 1.3 }}>
          {currentDialogue.speech}
        </span>

        {currentDialogue.subtext && (
          <p style={{ margin: 0, fontSize: "12px", color: "var(--text-body)", lineHeight: 1.45, fontWeight: 400 }}>
            {currentDialogue.subtext}
          </p>
        )}

        {/* Speech triangle */}
        <div
          style={{
            position: "absolute",
            bottom: "-6px",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: "12px",
            height: "12px",
            backgroundColor: "#FFFFFF",
            borderRight: "1.5px solid var(--border-subtle)",
            borderBottom: "1.5px solid var(--border-subtle)",
          }}
        />
      </motion.div>

      {/* Prominent Large Living Mascot (96px × 68px) */}
      <motion.button
        type="button"
        onClick={handleSpiritClick}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.2,
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.92 }}
        style={{
          pointerEvents: "auto",
          width: "96px",
          height: "68px",
          borderRadius: "22px",
          backgroundColor: "#07080B",
          border: currentDialogue.mood === "shocked"
            ? "2.5px solid #EF4444"
            : "2.5px solid rgba(255, 122, 0, 0.65)",
          boxShadow: currentDialogue.mood === "shocked"
            ? "0 0 32px rgba(239, 68, 68, 0.5), 0 16px 36px rgba(0, 0, 0, 0.85)"
            : "0 0 28px rgba(255, 122, 0, 0.4), 0 14px 32px rgba(0, 0, 0, 0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          outline: "none",
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
        title="I am Beacon Spirit! Click to chat."
      >
        {/* Living Eyes Display */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
          {isBlinking ? (
            // Blinking (— —)
            <>
              <div style={{ width: "10px", height: "2px", backgroundColor: "#FFFFFF", borderRadius: "1px" }} />
              <div style={{ width: "10px", height: "2px", backgroundColor: "#FFFFFF", borderRadius: "1px" }} />
            </>
          ) : currentDialogue.mood === "shocked" ? (
            // Comic Panic Shocked Eyes (O O) + Sweat Drop
            <>
              <div style={{ width: "14px", height: "18px", borderRadius: "8px", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#07080B" }} />
              </div>
              <div style={{ width: "14px", height: "18px", borderRadius: "8px", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#07080B" }} />
              </div>
              <span style={{ position: "absolute", top: "-28px", right: "-12px", fontSize: "20px" }}>
                💧
              </span>
            </>
          ) : currentDialogue.mood === "excited" || currentDialogue.mood === "relieved" ? (
            // Cheerful Curved Eyes (^ ^)
            <>
              <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 900, lineHeight: 1 }}>^</span>
              <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 900, lineHeight: 1 }}>^</span>
            </>
          ) : (
            // Normal Alert Living Eyes (• •) with pupil glint
            <>
              <div style={{ width: "9px", height: "18px", borderRadius: "5px", backgroundColor: "#FFFFFF", position: "relative" }}>
                <div style={{ position: "absolute", top: "2px", left: "2px", width: "3px", height: "4px", backgroundColor: "#FFFFFF", borderRadius: "2px" }} />
              </div>
              <div style={{ width: "9px", height: "18px", borderRadius: "5px", backgroundColor: "#FFFFFF", position: "relative" }}>
                <div style={{ position: "absolute", top: "2px", left: "2px", width: "3px", height: "4px", backgroundColor: "#FFFFFF", borderRadius: "2px" }} />
              </div>
            </>
          )}
        </div>

        {/* Ambient Warm Underglow */}
        <div
          style={{
            position: "absolute",
            bottom: "-6px",
            width: "48px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--accent-solar)",
            filter: "blur(5px)",
            opacity: 0.7,
          }}
        />
      </motion.button>
    </motion.div>
  );
};
