import React, { useState } from "react";

export const WaitlistInteractiveNotch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"focus" | "streak" | "music" | "specs">("focus");

  return (
    <div className="notch-simulator-container">
      {/* Top Camera Notch Housing */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Outer Aluminum Display Rim */}
        <div className="notch-bezel-rim">
          <div className="notch-camera-led"></div>
          <div className="notch-camera-lens"></div>
        </div>

        {/* Dynamic Island Expandable Capsule */}
        <div
          className="notch-capsule"
          style={{
            width: activeTab === "focus" ? "350px" : activeTab === "music" ? "360px" : "330px",
          }}
        >
          <div className="notch-inner-hud">
            {activeTab === "focus" && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
                  <div
                    className="notch-hud-icon-box"
                    style={{
                      background: "rgba(245, 158, 11, 0.15)",
                      color: "#F59E0B",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                    }}
                  >
                    ⌘B
                  </div>
                  <div>
                    <div className="notch-hud-title" style={{ color: "#F59E0B" }}>
                      DEEP WORK SPRINT
                    </div>
                    <div className="notch-hud-subtitle">Refactoring Kernel</div>
                  </div>
                </div>
                <div
                  className="notch-badge-pill"
                  style={{
                    background: "rgba(245, 158, 11, 0.15)",
                    color: "#F59E0B",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                  }}
                >
                  24:18
                </div>
              </>
            )}

            {activeTab === "streak" && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
                  <div
                    className="notch-hud-icon-box"
                    style={{
                      background: "rgba(52, 211, 153, 0.15)",
                      color: "#34D399",
                      border: "1px solid rgba(52, 211, 153, 0.3)",
                    }}
                  >
                    ⚡
                  </div>
                  <div>
                    <div className="notch-hud-title" style={{ color: "#34D399" }}>
                      HABIT MOMENTUM
                    </div>
                    <div className="notch-hud-subtitle">Deep Work Protocol</div>
                  </div>
                </div>
                <div
                  className="notch-badge-pill"
                  style={{
                    background: "rgba(52, 211, 153, 0.15)",
                    color: "#34D399",
                    border: "1px solid rgba(52, 211, 153, 0.25)",
                  }}
                >
                  18 DAYS
                </div>
              </>
            )}

            {activeTab === "music" && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
                  <div
                    className="notch-hud-icon-box"
                    style={{
                      background: "rgba(56, 189, 248, 0.15)",
                      color: "#38BDF8",
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                    }}
                  >
                    ♬
                  </div>
                  <div style={{ maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <div className="notch-hud-title" style={{ color: "#38BDF8" }}>
                      APPLE MUSIC
                    </div>
                    <div className="notch-hud-subtitle" style={{ whiteSpace: "nowrap" }}>
                      Solar Echoes · Ólafur
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <span style={{ width: "3px", height: "12px", background: "#38BDF8", borderRadius: "2px" }}></span>
                  <span style={{ width: "3px", height: "16px", background: "#38BDF8", borderRadius: "2px" }}></span>
                  <span style={{ width: "3px", height: "8px", background: "#38BDF8", borderRadius: "2px" }}></span>
                </div>
              </>
            )}

            {activeTab === "specs" && (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
                  <div
                    className="notch-hud-icon-box"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#FFFFFF",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    
                  </div>
                  <div>
                    <div className="notch-hud-title" style={{ color: "rgba(255,255,255,0.6)" }}>
                      HARDWARE HUD
                    </div>
                    <div className="notch-hud-subtitle">0.1% CPU · SQLite WAL</div>
                  </div>
                </div>
                <div className="notch-badge-pill" style={{ background: "rgba(255,255,255,0.1)", color: "#FFFFFF" }}>
                  45 MB
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Interactive HUD Switchers (Clickable Pills) */}
      <div className="notch-selector-row">
        <button
          onClick={() => setActiveTab("focus")}
          className={`notch-tab-btn ${activeTab === "focus" ? "notch-tab-active" : "notch-tab-inactive"}`}
        >
          ⌘ Focus Sprint
        </button>
        <button
          onClick={() => setActiveTab("streak")}
          className={`notch-tab-btn ${activeTab === "streak" ? "notch-tab-active" : "notch-tab-inactive"}`}
        >
          ⚡ Habit Streaks
        </button>
        <button
          onClick={() => setActiveTab("music")}
          className={`notch-tab-btn ${activeTab === "music" ? "notch-tab-active" : "notch-tab-inactive"}`}
        >
          ♬ Media HUD
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={`notch-tab-btn ${activeTab === "specs" ? "notch-tab-active" : "notch-tab-inactive"}`}
        >
           Hardware HUD
        </button>
      </div>
    </div>
  );
};
