import React, { useState, useEffect } from "react";
import { NotchTab } from "../types";
import { 
  Sparkles, 
  Play, 
  Pause, 
  Music2, 
  Check, 
  Flame, 
  Search, 
  Command, 
  Layout, 
  Layers, 
  BatteryCharging, 
  Pin, 
  Compass 
} from "lucide-react";

const AppleIcon: React.FC<{ size?: number; color?: string }> = ({ size = 12, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 170 170" fill={color} style={{ display: "inline-block", verticalAlign: "middle" }} aria-label="Apple">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.33-6.19-9.54-11.09-20.73-14.7-33.56-3.6-12.83-5.41-24.81-5.41-35.94 0-14.58 3.7-26.68 11.1-36.31 7.4-9.63 16.71-14.54 27.93-14.74 5.1 0 10.77 1.43 17.01 4.3 6.24 2.87 10.09 4.36 11.55 4.46 1.7 0 5.75-1.57 12.16-4.71 6.4-3.14 12.06-4.54 16.99-4.21 12.76.94 22.84 5.69 30.23 14.26-11.08 6.72-16.51 16.27-16.28 28.66.24 9.87 4.04 18.06 11.41 24.58 7.37 6.52 16.03 10.23 25.99 11.13-2.32 6.94-5.08 14.07-8.28 21.39zM119.22 31.84c0-7.72 2.76-14.88 8.27-21.49 5.51-6.61 12.35-10.35 20.52-11.23.23 1.04.35 1.98.35 2.81 0 7.61-2.92 14.88-8.76 21.82-5.84 6.94-12.81 10.66-20.91 11.17-.12-.94-.18-1.97-.18-3.08z"/>
  </svg>
);

type SurfaceView = "island" | "menubar" | "command";

export const IslandSimulator: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(true);
  const [hasAutoUnpinned, setHasAutoUnpinned] = useState(false);
  const [surfaceMode, setSurfaceMode] = useState<SurfaceView>("island");
  const [activeTab, setActiveTab] = useState<NotchTab>("beacon");

  // Interactive Goal State
  const [goalProgress, setGoalProgress] = useState(61);
  const [goalName, setGoalName] = useState("Launch SaaS App");
  const [focusSeconds, setFocusSeconds] = useState(25 * 60 - 42); // 24:18
  const [isFocusRunning, setIsFocusRunning] = useState(true);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  const [streakDays, setStreakDays] = useState(14);
  const [completedFlash, setCompletedFlash] = useState(false);
  const [currentTime, setCurrentTime] = useState("10:24 AM");

  const isExpanded = isHovered || isPinned;

  useEffect(() => {
    if (!isFocusRunning) return;
    const interval = setInterval(() => {
      setFocusSeconds((prev) => (prev > 0 ? prev - 1 : 25 * 60));
    }, 1000);
    return () => clearInterval(interval);
  }, [isFocusRunning]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleIncrement = (amount: number) => {
    setGoalProgress((prev) => Math.min(100, Math.max(0, prev + amount)));
  };

  const handleComplete = () => {
    setGoalProgress(100);
    setCompletedFlash(true);
    setTimeout(() => setCompletedFlash(false), 1200);
  };

  const handleNotchMouseEnter = () => {
    setIsHovered(true);
    // Auto-unpin on first hover so when the user moves their cursor away,
    // the notch smoothly collapses, demonstrating that it's a live simulation and not a photo.
    if (isPinned && !hasAutoUnpinned) {
      setIsPinned(false);
      setHasAutoUnpinned(true);
    }
  };

  const handleNotchMouseLeave = () => {
    setIsHovered(false);
  };

  const overallPercent = Math.min(100, goalProgress);

  return (
    <section id="simulator" style={{ padding: "40px 0 100px 0" }}>
      <div className="container">
        {/* Dark Hardware Theater Box (Like Wispr Flow's dark section transition) */}
        <div
          style={{
            backgroundColor: "#0B0D13",
            borderRadius: "32px",
            padding: "clamp(32px, 5vw, 64px) clamp(16px, 3vw, 40px)",
            boxShadow: "0 30px 90px rgba(25, 26, 25, 0.15)",
          }}
        >
          {/* Header inside theater */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "11px",
                fontFamily: "var(--font-mono)",
                color: "rgba(255, 255, 255, 0.6)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "12px",
              }}
            >
              PLAYABLE HARDWARE SIMULATOR
            </span>
            <h2
              className="serif-headline"
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(30px, 4.5vw, 48px)",
                marginBottom: "12px",
              }}
            >
              Touch the notch.<br />
              <span className="serif-italic" style={{ color: "rgba(255, 255, 255, 0.85)" }}>Test live progress sync.</span>
            </h2>
            <p style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "15px", maxWidth: "560px", margin: "0 auto" }}>
              Hover over or click the notch. Switch between the Dynamic Island, Menu Bar Popover, and Command Engine.
            </p>

            {/* Surface Mode Segmented Controls */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "4px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                maxWidth: "100%",
                overflowX: "auto",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                onClick={() => setSurfaceMode("island")}
                style={{
                  padding: "7px 16px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  backgroundColor: surfaceMode === "island" ? "#FFFFFF" : "transparent",
                  color: surfaceMode === "island" ? "#0B0D13" : "#FFFFFF",
                  transition: "all 0.15s ease",
                }}
              >
                Dynamic Island Notch
              </button>

              <button
                type="button"
                onClick={() => setSurfaceMode("menubar")}
                style={{
                  padding: "7px 16px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  backgroundColor: surfaceMode === "menubar" ? "#FFFFFF" : "transparent",
                  color: surfaceMode === "menubar" ? "#0B0D13" : "#FFFFFF",
                  transition: "all 0.15s ease",
                }}
              >
                Menu Bar Hub
              </button>

              <button
                type="button"
                onClick={() => setSurfaceMode("command")}
                style={{
                  padding: "7px 16px",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  backgroundColor: surfaceMode === "command" ? "#FFFFFF" : "transparent",
                  color: surfaceMode === "command" ? "#0B0D13" : "#FFFFFF",
                  transition: "all 0.15s ease",
                }}
              >
                Command Engine (⌘⇧B)
              </button>
            </div>
          </div>

          {/* Virtual MacBook Screen */}
          <div
            style={{
              maxWidth: "960px",
              margin: "0 auto",
              backgroundColor: "#0d0f14",
              borderRadius: "22px 22px 10px 10px",
              border: "min(10px, 2vw) solid #1c1e28",
              borderBottom: "min(14px, 3vw) solid #1c1e28",
              boxShadow: "0 28px 80px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.12)",
              position: "relative",
              minHeight: "460px",
              backgroundImage: "url('/assets/macos-wallpaper-dark.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* macOS Menu Bar */}
            <div
              style={{
                width: "100%",
                height: "30px",
                backgroundColor: "rgba(10, 12, 18, 0.75)",
                backdropFilter: "blur(20px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.9)",
                zIndex: 30,
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px", fontWeight: 600 }}>
                <AppleIcon size={12} color="#ffffff" />
                <span style={{ color: "#ffffff", fontWeight: 800 }}>Beacon</span>
                <span style={{ opacity: 0.65 }}>Goals</span>
                <span style={{ opacity: 0.65 }}>Focus</span>
                <span style={{ opacity: 0.65 }}>Window</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "11px", fontWeight: 600 }}>
                <span style={{ color: "var(--accent-solar)" }}>⌘⇧B</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>100% <BatteryCharging size={13} color="#10b981" /></span>
                <span>Fri Sep 4  {currentTime}</span>
              </div>
            </div>

            {/* Hardware Camera Notch Cutout */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "150px",
                height: "24px",
                backgroundColor: "#07080b",
                borderRadius: "0 0 12px 12px",
                zIndex: 35,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                pointerEvents: "none",
              }}
            >
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#151824", border: "1px solid rgba(255,255,255,0.15)" }} />
              <div style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "#10b981" }} />
            </div>

            {/* Dynamic Island Surface */}
            {surfaceMode === "island" && (
              <div style={{ display: "flex", justifyContent: "center", width: "100%", position: "relative", zIndex: 40 }}>
                <div
                  onMouseEnter={handleNotchMouseEnter}
                  onMouseLeave={handleNotchMouseLeave}
                  onClick={() => {
                    if (!isExpanded) {
                      setIsPinned(true);
                    }
                  }}
                  style={{
                    width: isExpanded ? "660px" : "200px",
                    height: isExpanded ? "146px" : "32px",
                    backgroundColor: "#07080b",
                    borderRadius: isExpanded ? "20px" : "0 0 14px 14px",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.16)",
                    borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRight: "1px solid rgba(255, 255, 255, 0.12)",
                    boxShadow: isExpanded ? "0 24px 60px rgba(0, 0, 0, 0.95)" : "0 8px 24px rgba(0, 0, 0, 0.6)",
                    transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    padding: isExpanded ? "10px 14px" : "0 14px",
                    marginTop: isExpanded ? "6px" : "0px",
                  }}
                >
                  {!isExpanded ? (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>Beacon</span>
                      <span style={{ fontSize: "10px", color: "rgba(255, 255, 255, 0.45)", fontWeight: 500 }}>Hover to expand</span>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--accent-solar)" }}>{overallPercent}%</span>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "8px" }}>
                      {/* Tabs */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setActiveTab("beacon"); }}
                            style={{
                              padding: "3px 10px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              border: "none",
                              cursor: "pointer",
                              backgroundColor: activeTab === "beacon" ? "rgba(255, 122, 0, 0.25)" : "transparent",
                              color: activeTab === "beacon" ? "var(--accent-solar)" : "rgba(255, 255, 255, 0.55)",
                            }}
                          >
                            • Beacon
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setActiveTab("focus"); }}
                            style={{
                              padding: "3px 10px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              border: "none",
                              cursor: "pointer",
                              backgroundColor: activeTab === "focus" ? "rgba(255, 255, 255, 0.15)" : "transparent",
                              color: activeTab === "focus" ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)",
                            }}
                          >
                            Focus
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setActiveTab("media"); }}
                            style={{
                              padding: "3px 10px",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 700,
                              border: "none",
                              cursor: "pointer",
                              backgroundColor: activeTab === "media" ? "rgba(255, 255, 255, 0.15)" : "transparent",
                              color: activeTab === "media" ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)",
                            }}
                          >
                            Media
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsPinned(!isPinned);
                          }}
                          aria-label={isPinned ? "Unpin Dynamic Island notch" : "Pin Dynamic Island notch open"}
                          title={isPinned ? "Currently pinned open · Click to unpin" : "Click to pin open"}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "3px 9px",
                            borderRadius: "6px",
                            fontSize: "10px",
                            fontWeight: 600,
                            border: isPinned ? "1px solid rgba(255, 122, 0, 0.45)" : "1px solid rgba(255, 255, 255, 0.16)",
                            backgroundColor: isPinned ? "rgba(255, 122, 0, 0.16)" : "rgba(255, 255, 255, 0.06)",
                            color: isPinned ? "var(--accent-solar)" : "rgba(255, 255, 255, 0.75)",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <Pin size={10} style={{ transform: isPinned ? "rotate(0deg)" : "rotate(45deg)", transition: "transform 0.15s ease" }} />
                          <span>{isPinned ? "Pinned" : "Pin Open"}</span>
                        </button>
                      </div>

                      {/* 3 Columns */}
                      <div style={{ display: "grid", gridTemplateColumns: "1.45fr 1.05fr 0.8fr", gap: "8px", flex: 1, minHeight: 0 }}>
                        {/* Col 1 */}
                        <div style={{ backgroundColor: completedFlash ? "rgba(16, 185, 129, 0.25)" : "rgba(16, 18, 26, 0.95)", borderRadius: "12px", padding: "8px 10px", display: "flex", alignItems: "center", gap: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
                          {activeTab === "beacon" && (
                            <>
                              <div style={{ width: "36px", height: "30px", borderRadius: "8px", backgroundColor: "#000000", border: "1px solid rgba(255, 122, 0, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", flexShrink: 0 }}>
                                <div style={{ width: "3px", height: "6px", borderRadius: "2px", backgroundColor: "#ffffff" }} />
                                <div style={{ width: "3px", height: "6px", borderRadius: "2px", backgroundColor: "#ffffff" }} />
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, gap: "2px" }}>
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>{goalName}</span>
                                <span style={{ fontSize: "9px", color: "rgba(255, 255, 255, 0.65)" }}>{goalProgress} / 100 problems</span>
                                <div style={{ width: "100%", height: "3px", backgroundColor: "rgba(255, 255, 255, 0.1)", borderRadius: "2px", overflow: "hidden" }}>
                                  <div style={{ width: `${goalProgress}%`, height: "100%", backgroundColor: "var(--accent-solar)" }} />
                                </div>
                                <div style={{ display: "flex", gap: "4px", marginTop: "2px" }}>
                                  <button type="button" onClick={(e) => { e.stopPropagation(); handleIncrement(-10); }} style={{ padding: "1px 5px", fontSize: "9px", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: "4px", cursor: "pointer" }}>-</button>
                                  <button type="button" onClick={(e) => { e.stopPropagation(); handleIncrement(10); }} style={{ padding: "1px 8px", fontSize: "9px", fontWeight: 800, background: "var(--accent-solar)", border: "none", color: "#000", borderRadius: "4px", cursor: "pointer" }}>+10</button>
                                  <button type="button" onClick={(e) => { e.stopPropagation(); handleComplete(); }} style={{ padding: "1px 5px", fontSize: "9px", background: "rgba(16, 185, 129, 0.3)", border: "none", color: "#10b981", borderRadius: "4px", cursor: "pointer" }}>✓</button>
                                </div>
                              </div>
                            </>
                          )}
                          {activeTab === "focus" && (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                              <div>
                                <span style={{ fontSize: "10px", fontWeight: 700, color: "#ffffff", display: "block" }}>Deep Work Sprint</span>
                                <span style={{ fontSize: "17px", fontWeight: 900, color: "#38bdf8", fontFamily: "var(--font-mono)" }}>{formatTimer(focusSeconds)}</span>
                              </div>
                              <button type="button" onClick={(e) => { e.stopPropagation(); setIsFocusRunning(!isFocusRunning); }} style={{ padding: "4px 10px", borderRadius: "6px", backgroundColor: "rgba(56, 189, 248, 0.2)", border: "1px solid rgba(56, 189, 248, 0.4)", color: "#38bdf8", fontSize: "10px", fontWeight: 700, cursor: "pointer" }}>{isFocusRunning ? "Pause" : "Resume"}</button>
                            </div>
                          )}
                          {activeTab === "media" && (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
                              <Music2 size={16} color="#c084fc" />
                              <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff" }}>Interstellar (Day One)</span>
                                <span style={{ fontSize: "9px", color: "#c084fc" }}>Hans Zimmer • Spotify</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Col 2 */}
                        <div style={{ backgroundColor: "rgba(16, 18, 26, 0.95)", borderRadius: "12px", padding: "6px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "3px", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <span style={{ fontSize: "10px", fontWeight: 800, color: "var(--accent-solar)" }}>SEP 04</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "3px", color: "var(--accent-solar)", fontWeight: 700, fontSize: "10px" }}>
                            <Flame size={12} />
                            <span>{streakDays}d streak</span>
                          </div>
                        </div>

                        {/* Col 3 */}
                        <div style={{ backgroundColor: "rgba(16, 18, 26, 0.95)", borderRadius: "12px", padding: "6px 8px", display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <span style={{ fontSize: "15px", fontWeight: 900, color: "var(--accent-solar)" }}>{overallPercent}%</span>
                          <svg width="32" height="32" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="3" />
                            <circle cx="16" cy="16" r="12" fill="none" stroke="var(--accent-solar)" strokeWidth="3" strokeDasharray={2 * Math.PI * 12} strokeDashoffset={2 * Math.PI * 12 * (1 - overallPercent / 100)} strokeLinecap="round" transform="rotate(-90 16 16)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Popover / Command Engine Surfaces */}
            {surfaceMode === "menubar" && (
              <div style={{ position: "absolute", top: "34px", right: "30px", width: "320px", backgroundColor: "#0d0f16", borderRadius: "14px", padding: "14px", border: "1px solid rgba(255,255,255,0.12)", zIndex: 45, boxShadow: "0 20px 50px rgba(0,0,0,0.9)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>Beacon Hub</span>
                  <span style={{ fontSize: "11px", color: "var(--accent-solar)", fontWeight: 700 }}>Active</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {["SaaS App", "LeetCode 100", "Gym Workout"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 8px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)" }}>
                      <span style={{ fontSize: "12px", color: "#fff" }}>{item}</span>
                      <button type="button" onClick={() => handleIncrement(10)} style={{ padding: "2px 8px", borderRadius: "4px", backgroundColor: "var(--accent-solar)", border: "none", color: "#000", fontSize: "10px", fontWeight: 800, cursor: "pointer" }}>+10</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {surfaceMode === "command" && (
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "420px", backgroundColor: "#0b0d14", borderRadius: "14px", padding: "14px", border: "1px solid rgba(255,255,255,0.15)", zIndex: 45, boxShadow: "0 24px 60px rgba(0,0,0,0.9)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 10px", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                  <Search size={14} color="rgba(255,255,255,0.5)" />
                  <input
                    type="text"
                    defaultValue="+10 SaaS App"
                    placeholder="Type a command or search goals..."
                    aria-label="Command search input"
                    style={{ background: "none", border: "none", color: "#fff", fontSize: "12px", outline: "none", width: "100%" }}
                  />
                  <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>esc</span>
                </div>
              </div>
            )}

            {/* macOS Dock */}
            <div style={{ marginTop: "auto", marginBottom: "12px", display: "flex", justifyContent: "center", width: "100%", zIndex: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", borderRadius: "14px", backgroundColor: "rgba(18, 20, 28, 0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "6px", backgroundColor: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>
                  <AppleIcon size={14} color="#ffffff" />
                </div>
                <div style={{ width: "26px", height: "26px", borderRadius: "6px", backgroundColor: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}><Compass size={14} color="#ffffff" /></div>
                <div style={{ width: "26px", height: "26px", borderRadius: "6px", backgroundColor: "#1e2230", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}>&gt;_</div>
                <img src="/logo.png" alt="Beacon" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
