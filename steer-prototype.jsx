import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const HI = {
  bg: "#07070F",
  surface: "#0F0F1C",
  card: "#161626",
  border: "#22223A",
  accent: "#3DFFA0",
  accentDim: "#0B2A1C",
  orange: "#FF5E3A",
  orangeDim: "#2D1008",
  text: "#EEEEF8",
  sub: "#8888A8",
  dim: "#44445A",
  red: "#FF4466",
};

const LO = {
  bg: "#FFFFFF",
  surface: "#F4F4F4",
  card: "#E8E8E8",
  border: "#BBBBBB",
  accent: "#222222",
  text: "#111111",
  sub: "#777777",
  block: "#CCCCCC",
  blockDark: "#AAAAAA",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function Btn({ label, onClick, variant = "primary", c, hifi, style = {} }) {
  const base = {
    width: "100%", padding: "15px", borderRadius: 14, border: "none",
    fontFamily: hifi ? "DM Sans, sans-serif" : "monospace",
    fontWeight: 700, fontSize: 15, cursor: "pointer", ...style,
  };
  if (variant === "primary") return (
    <button onClick={onClick} style={{ ...base, background: hifi ? c.accent : c.accent, color: hifi ? "#07070F" : "#FFFFFF" }}>{label}</button>
  );
  if (variant === "secondary") return (
    <button onClick={onClick} style={{ ...base, background: "transparent", border: `1.5px solid ${c.border}`, color: c.text }}>{label}</button>
  );
  if (variant === "danger") return (
    <button onClick={onClick} style={{ ...base, background: hifi ? c.orange : c.blockDark, color: hifi ? "#FFFFFF" : c.text }}>{label}</button>
  );
  return null;
}

function BackBar({ title, onBack, c, hifi }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: `1px solid ${c.border}` }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: c.text, fontSize: 22, cursor: "pointer", padding: 0, lineHeight: 1 }}>←</button>
      <span style={{ fontFamily: hifi ? "Syne, sans-serif" : "monospace", fontWeight: 700, fontSize: 17, color: c.text }}>{title}</span>
    </div>
  );
}

function MapBox({ c, hifi, height = 180 }) {
  return (
    <div style={{ height, background: hifi ? "linear-gradient(135deg, #0A1A2A 0%, #0D2A1A 50%, #1A0A2A 100%)" : c.block, borderRadius: 16, position: "relative", overflow: "hidden", flexShrink: 0 }}>
      {hifi ? (
        <>
          <div style={{ position: "absolute", inset: 0, opacity: 0.3, backgroundImage: "radial-gradient(circle at 30% 40%, #3DFFA030 0%, transparent 60%), radial-gradient(circle at 70% 60%, #FF5E3A20 0%, transparent 50%)" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 18, height: 18, background: c.accent, borderRadius: "50%", boxShadow: `0 0 0 6px ${c.accent}30` }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, background: "#07070FC0", backdropFilter: "blur(8px)", borderRadius: 8, padding: "6px 10px" }}>
            <span style={{ fontFamily: "DM Sans", fontSize: 11, color: c.sub }}>Live Map</span>
          </div>
        </>
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: c.sub }}>[MAP VIEW]</span>
        </div>
      )}
    </div>
  );
}

function Tag({ label, c, hifi, active }) {
  return (
    <div style={{
      padding: "7px 14px", borderRadius: 50, fontSize: 13, fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 600, cursor: "pointer", flexShrink: 0,
      background: active ? (hifi ? c.accentDim : c.accent) : (hifi ? c.card : c.surface),
      border: `1.5px solid ${active ? c.accent : c.border}`,
      color: active ? (hifi ? c.accent : "#FFFFFF") : c.sub,
    }}>{label}</div>
  );
}

function Avatar({ src, size = 44, c, hifi, emoji }) {
  return (
    <div style={{ width: size, height: size, borderRadius: size / 2, background: hifi ? `linear-gradient(135deg, ${c.accentDim}, ${c.card})` : c.block, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.4, border: `2px solid ${c.border}` }}>
      {hifi && emoji ? emoji : <span style={{ fontFamily: "monospace", fontSize: 10, color: c.sub }}>IMG</span>}
    </div>
  );
}

function Stars({ rating, c, hifi }) {
  return (
    <span style={{ color: hifi ? "#FFD23F" : c.sub, fontSize: 13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: c.sub, fontSize: 12, marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

function OwnerCard({ name, car, modes, rate, rating, emoji, c, hifi, onClick }) {
  return (
    <div onClick={onClick} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, cursor: "pointer", display: "flex", gap: 14, alignItems: "flex-start" }}>
      <Avatar c={c} hifi={hifi} size={50} emoji={emoji} />
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 15, color: c.text }}>{hifi ? name : "[OWNER NAME]"}</div>
        <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub, marginTop: 2 }}>{hifi ? car : "[CAR DETAILS]"}</div>
        <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
          {modes.map(m => <Tag key={m} label={m} c={c} hifi={hifi} active={false} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
          <Stars rating={rating} c={c} hifi={hifi} />
          <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 14, color: hifi ? c.accent : c.text }}>{hifi ? `KES ${rate}/hr` : "[RATE]"}</span>
        </div>
      </div>
    </div>
  );
}

// ─── SCREENS ──────────────────────────────────────────────────────────────────

function Splash({ go, hifi, c }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 28px", background: hifi ? `radial-gradient(ellipse at top, #0F1E18 0%, ${c.bg} 70%)` : c.bg }}>
      <div style={{ width: 76, height: 76, borderRadius: 22, background: hifi ? `linear-gradient(135deg, ${c.accentDim}, ${c.card})` : c.block, border: `2px solid ${hifi ? c.accent : c.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, marginBottom: 20 }}>
        {hifi ? "🚗" : <span style={{ fontFamily: "monospace", fontSize: 11, color: c.sub }}>LOGO</span>}
      </div>
      <div style={{ fontFamily: hifi ? "Syne, sans-serif" : "monospace", fontWeight: 800, fontSize: 40, color: hifi ? c.text : c.text, letterSpacing: -1.5, marginBottom: 6 }}>
        {hifi ? "Steer" : "[STEER]"}
      </div>
      <div style={{ fontFamily: hifi ? "DM Sans, sans-serif" : "monospace", fontSize: 14, color: c.sub, marginBottom: 48, letterSpacing: hifi ? 3 : 0, textTransform: "uppercase" }}>
        {hifi ? "Drive · Learn · Explore" : "[TAGLINE]"}
      </div>

      <div style={{ width: "100%", background: hifi ? c.card : c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 20, marginBottom: 44 }}>
        {hifi ? (
          <>
            <div style={{ fontSize: 11, color: c.accent, fontFamily: "DM Sans", fontWeight: 700, letterSpacing: 1.5, marginBottom: 10, textTransform: "uppercase" }}>How it works</div>
            {["Book a verified vehicle owner", "Drive with them beside you", "Practice, explore, or travel"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: c.accentDim, border: `1px solid ${c.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: c.accent, fontWeight: 700 }}>{i + 1}</div>
                <span style={{ fontFamily: "DM Sans", fontSize: 13, color: c.sub }}>{t}</span>
              </div>
            ))}
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["[STEP 1 — HOW IT WORKS]", "[STEP 2]", "[STEP 3]"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: `1.5px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: c.sub }}>{i + 1}</div>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: c.sub }}>{t}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Btn label="Get Started" onClick={() => go("role_select")} c={c} hifi={hifi} />
      <div style={{ marginTop: 16, fontSize: 13, color: c.sub, fontFamily: hifi ? "DM Sans" : "monospace" }}>
        Already have an account?{" "}
        <span style={{ color: hifi ? c.accent : c.text, cursor: "pointer", fontWeight: 600 }}>Sign in</span>
      </div>
    </div>
  );
}

function RoleSelect({ go, setRole, hifi, c }) {
  const cards = [
    { role: "driver", emoji: "🧑‍✈️", label: "I want to Drive", sub: "Book an owner & drive their vehicle", next: "driver_reg" },
    { role: "owner", emoji: "🔑", label: "I'm a Vehicle Owner", sub: "List your vehicle and earn", next: "owner_reg" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "32px 24px", background: c.bg }}>
      <div style={{ fontFamily: hifi ? "Syne, sans-serif" : "monospace", fontWeight: 800, fontSize: 26, color: c.text, marginBottom: 8 }}>
        {hifi ? "Who are you?" : "[ROLE SELECTION]"}
      </div>
      <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 14, color: c.sub, marginBottom: 36 }}>
        {hifi ? "Choose your role to get started" : "[SUBTITLE]"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
        {cards.map(card => (
          <div key={card.role} onClick={() => { setRole(card.role); go(card.next); }} style={{
            background: c.card, border: `1.5px solid ${c.border}`, borderRadius: 20, padding: "28px 24px",
            cursor: "pointer", display: "flex", gap: 20, alignItems: "center", flex: 1,
            transition: "border-color 0.2s",
          }}>
            <div style={{ fontSize: 44 }}>{hifi ? card.emoji : ""}</div>
            {!hifi && <div style={{ width: 50, height: 50, background: c.block, borderRadius: 10 }} />}
            <div>
              <div style={{ fontFamily: hifi ? "Syne, sans-serif" : "monospace", fontWeight: 700, fontSize: 18, color: c.text }}>
                {hifi ? card.label : "[ROLE OPTION]"}
              </div>
              <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, color: c.sub, marginTop: 6 }}>
                {hifi ? card.sub : "[DESCRIPTION]"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DriverHome({ go, hifi, c }) {
  const [activeMode, setActiveMode] = useState("Practice");
  const modes = ["Practice", "Familiarize", "Transport"];
  const owners = [
    { name: "James Mutua", car: "Toyota Vitz · 2019 · White", modes: ["Practice", "Familiarize"], rate: 650, rating: 4.8, emoji: "👨🏾" },
    { name: "Grace Wanjiru", car: "Nissan Note · 2020 · Silver", modes: ["Transport", "Practice"], rate: 700, rating: 4.9, emoji: "👩🏾" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg, overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ padding: "16px 20px 12px", borderBottom: `1px solid ${c.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub }}>{hifi ? "Good morning," : "[GREETING]"}</div>
            <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 20, color: c.text }}>{hifi ? "Harrison 👋" : "[USER NAME]"}</div>
          </div>
          <Avatar c={c} hifi={hifi} size={42} emoji="👤" />
        </div>
        {/* Search bar */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: "11px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 16, opacity: 0.5 }}>🔍</span>
          <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 14, color: c.sub }}>{hifi ? "Search owners, areas..." : "[SEARCH BAR]"}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Map */}
        <MapBox c={c} hifi={hifi} height={160} />

        {/* Mode selector */}
        <div>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 14, color: c.sub, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1, fontSize: 11 }}>
            {hifi ? "What do you need?" : "[MODE SELECTOR]"}
          </div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {modes.map(m => (
              <div key={m} onClick={() => setActiveMode(m)}>
                <Tag label={m} c={c} hifi={hifi} active={activeMode === m} />
              </div>
            ))}
          </div>
        </div>

        {/* Nearby owners */}
        <div>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 11, color: c.sub, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
            {hifi ? "Nearby Owners" : "[NEARBY OWNERS]"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {owners.map((o, i) => (
              <OwnerCard key={i} {...o} c={c} hifi={hifi} onClick={() => go("browse_owners")} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ borderTop: `1px solid ${c.border}`, padding: "10px 0 20px", display: "flex", justifyContent: "space-around", background: c.surface }}>
        {[["🏠", "Home"], ["🗺️", "Map"], ["📋", "Bookings"], ["👤", "Profile"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: label === "Home" ? 1 : 0.4 }}>
            <span style={{ fontSize: 22 }}>{hifi ? icon : ""}</span>
            {!hifi && <div style={{ width: 24, height: 24, background: c.block, borderRadius: 4 }} />}
            <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 10, color: label === "Home" ? c.accent : c.sub }}>{hifi ? label : "[NAV]"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowseOwners({ go, hifi, c, onBack }) {
  const owners = [
    { name: "James Mutua", car: "Toyota Vitz · 2019 · White", modes: ["Practice", "Familiarize"], rate: 650, rating: 4.8, emoji: "👨🏾" },
    { name: "Grace Wanjiru", car: "Nissan Note · 2020 · Silver", modes: ["Transport", "Practice"], rate: 700, rating: 4.9, emoji: "👩🏾" },
    { name: "Kevin Ochieng", car: "Mazda Demio · 2018 · Blue", modes: ["Familiarize", "Transport"], rate: 580, rating: 4.6, emoji: "👨🏿" },
    { name: "Faith Chebet", car: "Honda Fit · 2021 · Red", modes: ["Practice"], rate: 620, rating: 5.0, emoji: "👩🏾" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg }}>
      <BackBar title={hifi ? "Available Owners" : "[BROWSE OWNERS]"} onBack={onBack} c={c} hifi={hifi} />
      <div style={{ padding: "12px 20px", borderBottom: `1px solid ${c.border}` }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2 }}>
          {["All", "Practice", "Familiarize", "Transport", "Top Rated"].map((f, i) => (
            <Tag key={f} label={f} c={c} hifi={hifi} active={i === 0} />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {owners.map((o, i) => (
          <OwnerCard key={i} {...o} c={c} hifi={hifi} onClick={() => go("owner_profile")} />
        ))}
      </div>
    </div>
  );
}

function OwnerProfile({ go, hifi, c, onBack }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg }}>
      <BackBar title={hifi ? "Owner Profile" : "[OWNER PROFILE]"} onBack={onBack} c={c} hifi={hifi} />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {/* Profile header */}
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
          <Avatar c={c} hifi={hifi} size={70} emoji="👨🏾" />
          <div>
            <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 22, color: c.text }}>{hifi ? "James Mutua" : "[OWNER NAME]"}</div>
            <Stars rating={4.8} c={c} hifi={hifi} />
            <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub, marginTop: 4 }}>{hifi ? "142 sessions · Member since 2024" : "[STATS]"}</div>
          </div>
        </div>

        {/* Car details */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 12, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "Vehicle" : "[VEHICLE]"}</div>
          {hifi ? (
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[["🚗", "Toyota Vitz"], ["📅", "2019"], ["⚪", "White"], ["🏙️", "Kitale"]].map(([icon, val]) => (
                <div key={val} style={{ background: c.accentDim, border: `1px solid ${c.border}`, borderRadius: 8, padding: "6px 12px", display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 14 }}>{icon}</span>
                  <span style={{ fontFamily: "DM Sans", fontSize: 13, color: c.text }}>{val}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["[MAKE/MODEL]", "[YEAR]", "[COLOUR]", "[AREA]"].map(t => (
                <div key={t} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, padding: "5px 10px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: c.sub }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modes & rates */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 12, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "Modes & Rates" : "[MODES & RATES]"}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["🎓", "Practice", "KES 650/hr", true], ["🗺️", "Familiarize", "KES 700/hr", true], ["🚕", "Transport", "—", false]].map(([icon, mode, rate, avail]) => (
              <div key={mode} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", opacity: avail ? 1 : 0.4 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 16 }}>{hifi ? icon : ""}</span>
                  {!hifi && <div style={{ width: 16, height: 16, background: c.block, borderRadius: 3 }} />}
                  <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 14, color: avail ? c.text : c.sub }}>{hifi ? mode : "[MODE]"}</span>
                </div>
                <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 14, color: avail ? c.accent : c.sub }}>{hifi ? rate : "[RATE]"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 12, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "Recent Reviews" : "[REVIEWS]"}</div>
          {hifi ? (
            [["Very patient and helpful!", "Brian K.", "4.9"], ["Good with highway driving", "Mary A.", "5.0"]].map(([text, name, r], i) => (
              <div key={i} style={{ paddingBottom: i === 0 ? 12 : 0, borderBottom: i === 0 ? `1px solid ${c.border}` : "none", marginBottom: i === 0 ? 12 : 0 }}>
                <div style={{ fontFamily: "DM Sans", fontSize: 13, color: c.text, marginBottom: 4 }}>{text}</div>
                <div style={{ fontFamily: "DM Sans", fontSize: 11, color: c.sub }}>— {name} · ★ {r}</div>
              </div>
            ))
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["[REVIEW 1]", "[REVIEW 2]"].map(t => (
                <div key={t} style={{ height: 44, background: c.surface, borderRadius: 8, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: c.sub }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <Btn label="Book This Owner" onClick={() => go("booking")} c={c} hifi={hifi} />
      </div>
    </div>
  );
}

function Booking({ go, hifi, c, onBack }) {
  const [mode, setMode] = useState("Practice");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg }}>
      <BackBar title={hifi ? "Confirm Booking" : "[BOOKING SCREEN]"} onBack={onBack} c={c} hifi={hifi} />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        {/* Mode picker */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{hifi ? "Session Mode" : "[MODE]"}</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["Practice", "Familiarize", "Transport"].map(m => (
              <div key={m} style={{ flex: 1 }} onClick={() => setMode(m)}>
                <div style={{ padding: "10px 6px", borderRadius: 12, textAlign: "center", border: `1.5px solid ${mode === m ? c.accent : c.border}`, background: mode === m ? c.accentDim : c.card, cursor: "pointer" }}>
                  <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 600, color: mode === m ? c.accent : c.sub }}>{hifi ? m : "[M]"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Date & Time */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "When?" : "[DATE & TIME]"}</div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["📅", "Date", "Wed, May 7"], ["🕐", "Time", "9:00 AM"], ["⏱️", "Duration", "1.5 hrs"]].map(([icon, label, val]) => (
              <div key={label} style={{ flex: 1, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 10, color: c.sub, marginBottom: 4 }}>{hifi ? label : "[LABEL]"}</div>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <span style={{ fontSize: 14 }}>{hifi ? icon : ""}</span>
                  <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, fontWeight: 600, color: c.text }}>{hifi ? val : "[VALUE]"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fare breakdown */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, marginBottom: 20 }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>{hifi ? "Fare Estimate" : "[FARE BREAKDOWN]"}</div>
          {[["Base fee", "KES 150"], ["Time (1.5 hrs × KES 8/min)", "KES 720"], ["Distance est. (~20 km × KES 12)", "KES 240"], ["Platform fee (15%)", "KES 167"]].map(([label, val], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, color: c.sub }}>{hifi ? label : `[LINE ${i + 1}]`}</span>
              <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, fontWeight: 600, color: c.text }}>{hifi ? val : "[AMT]"}</span>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 16, color: c.text }}>{hifi ? "Total" : "[TOTAL]"}</span>
            <span style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 18, color: hifi ? c.accent : c.text }}>{hifi ? "KES 1,277" : "[TOTAL AMT]"}</span>
          </div>
          <div style={{ marginTop: 8, fontSize: 11, fontFamily: hifi ? "DM Sans" : "monospace", color: c.sub }}>{hifi ? "⚡ Final fare calculated at session end based on actual time & distance" : "[DISCLAIMER]"}</div>
        </div>

        <Btn label="Confirm & Request" onClick={() => go("active_session")} c={c} hifi={hifi} />
        <div style={{ marginTop: 10 }}>
          <Btn label="Cancel" onClick={onBack} variant="secondary" c={c} hifi={hifi} />
        </div>
      </div>
    </div>
  );
}

function ActiveSession({ go, hifi, c, onBack }) {
  const [seconds, setSeconds] = useState(847);
  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = s => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const fare = (150 + (seconds / 60 * 8) + (7.4 * 12)).toFixed(0);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 17, color: c.text }}>{hifi ? "Session Active" : "[ACTIVE SESSION]"}</div>
        {hifi && <div style={{ background: c.accentDim, border: `1px solid ${c.accent}`, borderRadius: 20, padding: "4px 12px", fontSize: 11, color: c.accent, fontWeight: 700 }}>● LIVE</div>}
      </div>

      <MapBox c={c} hifi={hifi} height={200} />

      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Timer */}
        <div style={{ background: hifi ? `linear-gradient(135deg, ${c.accentDim}, ${c.card})` : c.card, border: `1px solid ${hifi ? c.accent : c.border}`, borderRadius: 20, padding: "20px", textAlign: "center" }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: hifi ? c.accent : c.sub, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>{hifi ? "Session Time" : "[TIMER]"}</div>
          <div style={{ fontFamily: hifi ? "Syne, monospace" : "monospace", fontWeight: 800, fontSize: 42, color: hifi ? c.accent : c.text, letterSpacing: -1 }}>
            {hifi ? fmt(seconds) : "00:14:07"}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12 }}>
          {[["Distance", hifi ? "7.4 km" : "[DIST]", "🛣️"], ["Speed", hifi ? "38 km/h" : "[SPD]", "💨"], ["Fare", hifi ? `KES ${fare}` : "[FARE]", "💰"]].map(([label, val, icon]) => (
            <div key={label} style={{ flex: 1, background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 10px", textAlign: "center" }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{hifi ? icon : ""}</div>
              {!hifi && <div style={{ width: 20, height: 20, background: c.block, borderRadius: 4, margin: "0 auto 4px" }} />}
              <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 14, color: c.text }}>{val}</div>
              <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 10, color: c.sub, marginTop: 2 }}>{hifi ? label : "[LABEL]"}</div>
            </div>
          ))}
        </div>

        {/* Owner info */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
          <Avatar c={c} hifi={hifi} size={44} emoji="👨🏾" />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 14, color: c.text }}>{hifi ? "James Mutua" : "[OWNER]"}</div>
            <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub }}>{hifi ? "Practice Mode" : "[MODE]"}</div>
          </div>
          {hifi && <div style={{ fontSize: 28, cursor: "pointer" }}>📞</div>}
        </div>

        <div style={{ marginTop: "auto" }}>
          <Btn label="End Session" onClick={() => go("session_end")} variant="danger" c={c} hifi={hifi} />
        </div>
      </div>
    </div>
  );
}

function SessionEnd({ go, hifi, c }) {
  const [rating, setRating] = useState(0);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg, padding: "28px 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 54, marginBottom: 12 }}>{hifi ? "🏁" : ""}</div>
        {!hifi && <div style={{ width: 60, height: 60, background: c.block, borderRadius: "50%", margin: "0 auto 12px" }} />}
        <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 800, fontSize: 26, color: c.text }}>
          {hifi ? "Session Complete!" : "[SESSION COMPLETE]"}
        </div>
        <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 14, color: c.sub, marginTop: 6 }}>
          {hifi ? "Great job on the road, Harrison." : "[SUBTITLE]"}
        </div>
      </div>

      {/* Summary */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 20, padding: 20, marginBottom: 20 }}>
        <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>{hifi ? "Session Summary" : "[SUMMARY]"}</div>
        {[["⏱️", "Duration", "1h 24m"], ["🛣️", "Distance", "17.2 km"], ["🎓", "Mode", "Practice"]].map(([icon, label, val], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 16 }}>{hifi ? icon : ""}</span>
              {!hifi && <div style={{ width: 14, height: 14, background: c.block, borderRadius: 3 }} />}
              <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 14, color: c.sub }}>{hifi ? label : "[LABEL]"}</span>
            </div>
            <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 14, fontWeight: 600, color: c.text }}>{hifi ? val : "[VAL]"}</span>
          </div>
        ))}
        <div style={{ borderTop: `1px solid ${c.border}`, marginTop: 8, paddingTop: 14, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 17, color: c.text }}>{hifi ? "Total Fare" : "[TOTAL]"}</span>
          <span style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 800, fontSize: 20, color: hifi ? c.accent : c.text }}>{hifi ? "KES 1,148" : "[AMT]"}</span>
        </div>
      </div>

      {/* Rating */}
      <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 20, padding: 20, marginBottom: 20, textAlign: "center" }}>
        <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, color: c.sub, marginBottom: 12 }}>{hifi ? "Rate James Mutua" : "[RATE OWNER]"}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <span key={n} onClick={() => setRating(n)} style={{ fontSize: 34, cursor: "pointer", filter: n <= (hifi ? rating : 4) ? "brightness(1)" : "brightness(0.3)" }}>⭐</span>
          ))}
        </div>
      </div>

      <Btn label={hifi ? "Pay KES 1,148 via M-Pesa" : "[PAY VIA M-PESA]"} onClick={() => go("driver_home")} c={c} hifi={hifi} />
    </div>
  );
}

function OwnerDashboard({ go, hifi, c, setRole }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg }}>
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${c.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub }}>{hifi ? "Owner Dashboard" : "[DASHBOARD]"}</div>
            <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 22, color: c.text }}>{hifi ? "James Mutua 🔑" : "[OWNER NAME]"}</div>
          </div>
          <Avatar c={c} hifi={hifi} size={44} emoji="👨🏾" />
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Earnings */}
        <div style={{ display: "flex", gap: 12 }}>
          {[["Today", "KES 2,300", hifi ? c.accentDim : c.card, hifi ? c.accent : c.border], ["This Week", "KES 14,800", c.card, c.border]].map(([label, val, bg, border]) => (
            <div key={label} style={{ flex: 1, background: bg, border: `1px solid ${border}`, borderRadius: 16, padding: 16 }}>
              <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 11, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{hifi ? label : "[LABEL]"}</div>
              <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 800, fontSize: 20, color: hifi ? (label === "Today" ? c.accent : c.text) : c.text }}>{hifi ? val : "[KES —]"}</div>
            </div>
          ))}
        </div>

        {/* Incoming request alert */}
        <div onClick={() => go("incoming_request")} style={{ background: hifi ? c.orangeDim : c.card, border: `1.5px solid ${hifi ? c.orange : c.border}`, borderRadius: 16, padding: 16, cursor: "pointer", display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ fontSize: 30 }}>{hifi ? "🔔" : ""}</div>
          {!hifi && <div style={{ width: 32, height: 32, background: c.block, borderRadius: 6 }} />}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 14, color: hifi ? c.orange : c.text }}>{hifi ? "New Booking Request!" : "[INCOMING REQUEST]"}</div>
            <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub }}>{hifi ? "Brian K. · Practice · Tomorrow 9AM" : "[DETAILS]"}</div>
          </div>
          <span style={{ color: hifi ? c.orange : c.sub, fontSize: 20 }}>›</span>
        </div>

        {/* Upcoming sessions */}
        <div>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 11, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>{hifi ? "Upcoming" : "[UPCOMING]"}</div>
          {[["Mary A.", "Familiarize", "Today 2PM", "👩🏾"], ["Peter K.", "Transport", "Thu 11AM", "👨🏾"]].map(([name, mode, time, emoji], i) => (
            <div key={i} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 14, padding: 14, marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
              <Avatar c={c} hifi={hifi} size={40} emoji={emoji} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 14, color: c.text }}>{hifi ? name : "[DRIVER NAME]"}</div>
                <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub }}>{hifi ? `${mode} · ${time}` : "[MODE · TIME]"}</div>
              </div>
              <Tag label={hifi ? mode : "[M]"} c={c} hifi={hifi} active={false} />
            </div>
          ))}
        </div>

        {/* Quick stats */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16 }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 11, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "Your Stats" : "[STATS]"}</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {[["142", "Sessions"], ["4.8★", "Rating"], ["96%", "Accept Rate"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 800, fontSize: 20, color: hifi ? c.accent : c.text }}>{hifi ? val : "—"}</div>
                <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 11, color: c.sub, marginTop: 2 }}>{hifi ? label : "[LABEL]"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ borderTop: `1px solid ${c.border}`, padding: "10px 0 20px", display: "flex", justifyContent: "space-around", background: c.surface }}>
        {[["🏠", "Home"], ["📋", "Sessions"], ["💰", "Earnings"], ["👤", "Profile"]].map(([icon, label]) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, opacity: label === "Home" ? 1 : 0.4 }}>
            <span style={{ fontSize: 22 }}>{hifi ? icon : ""}</span>
            {!hifi && <div style={{ width: 24, height: 24, background: c.block, borderRadius: 4 }} />}
            <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 10, color: label === "Home" ? c.accent : c.sub }}>{hifi ? label : "[NAV]"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IncomingRequest({ go, hifi, c, onBack }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg }}>
      <BackBar title={hifi ? "Booking Request" : "[INCOMING REQUEST]"} onBack={onBack} c={c} hifi={hifi} />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>

        {/* Driver card */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 20, padding: 20, marginBottom: 16, display: "flex", gap: 16, alignItems: "center" }}>
          <Avatar c={c} hifi={hifi} size={64} emoji="👨🏿" />
          <div>
            <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 20, color: c.text }}>{hifi ? "Brian Otieno" : "[DRIVER NAME]"}</div>
            <Stars rating={4.6} c={c} hifi={hifi} />
            <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub, marginTop: 4 }}>{hifi ? "License: KBZ 3 months ago · 8 sessions" : "[LICENSE INFO]"}</div>
          </div>
        </div>

        {/* Request details */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>{hifi ? "Request Details" : "[DETAILS]"}</div>
          {[["🎓", "Mode", "Practice"], ["📅", "Date", "Tomorrow, May 7"], ["🕘", "Time", "9:00 AM"], ["⏱️", "Duration", "~1.5 hours"], ["📍", "Area", "Kitale Town Circuit"]].map(([icon, label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 15 }}>{hifi ? icon : ""}</span>
                {!hifi && <div style={{ width: 14, height: 14, background: c.block, borderRadius: 3 }} />}
                <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, color: c.sub }}>{hifi ? label : "[LABEL]"}</span>
              </div>
              <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, fontWeight: 600, color: c.text }}>{hifi ? val : "[VAL]"}</span>
            </div>
          ))}
        </div>

        {/* Estimated earnings */}
        <div style={{ background: hifi ? c.accentDim : c.card, border: `1px solid ${hifi ? c.accent : c.border}`, borderRadius: 16, padding: 16, marginBottom: 24 }}>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 700, color: hifi ? c.accent : c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{hifi ? "Your Estimated Earnings" : "[EARNINGS EST.]"}</div>
          <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 800, fontSize: 28, color: hifi ? c.accent : c.text }}>{hifi ? "KES 975 – 1,200" : "[KES RANGE]"}</div>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub, marginTop: 4 }}>{hifi ? "After Steer's 15% platform fee" : "[AFTER PLATFORM FEE]"}</div>
        </div>

        <Btn label={hifi ? "✓ Accept Request" : "[ACCEPT]"} onClick={() => go("owner_dashboard")} c={c} hifi={hifi} />
        <div style={{ marginTop: 10 }}>
          <Btn label={hifi ? "✗ Decline" : "[DECLINE]"} onClick={onBack} variant="secondary" c={c} hifi={hifi} />
        </div>
      </div>
    </div>
  );
}

// ─── SHARED REGISTRATION HELPERS ─────────────────────────────────────────────

function StepBar({ total, current, c, hifi }) {
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 4, borderRadius: 4,
          background: i < current ? (hifi ? c.accent : c.accent) : (hifi ? c.card : c.block),
          transition: "background 0.3s",
        }} />
      ))}
    </div>
  );
}

function Field({ label, placeholder, value, type = "text", c, hifi, options }) {
  const base = {
    width: "100%", padding: "13px 14px", borderRadius: 12, border: `1.5px solid ${c.border}`,
    background: hifi ? c.card : c.surface, color: c.text,
    fontFamily: hifi ? "DM Sans, sans-serif" : "monospace", fontSize: 14,
    boxSizing: "border-box", outline: "none",
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 600, color: c.sub, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.8 }}>
        {hifi ? label : `[${label.toUpperCase()}]`}
      </div>
      {type === "select" ? (
        <select defaultValue={value} style={{ ...base, appearance: "none" }}>
          {options?.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input
          type={type}
          defaultValue={value}
          placeholder={hifi ? placeholder : ""}
          style={base}
        />
      )}
    </div>
  );
}

function UploadBox({ label, hint, emoji, c, hifi }) {
  return (
    <div style={{
      border: `2px dashed ${hifi ? c.accent + "60" : c.border}`,
      borderRadius: 16, padding: "24px 16px", textAlign: "center",
      background: hifi ? c.accentDim + "40" : c.surface, marginBottom: 14, cursor: "pointer",
    }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{hifi ? emoji : ""}</div>
      {!hifi && <div style={{ width: 40, height: 40, background: c.block, borderRadius: 8, margin: "0 auto 8px" }} />}
      <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 600, fontSize: 14, color: c.text }}>{hifi ? label : `[${label.toUpperCase()}]`}</div>
      <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: c.sub, marginTop: 4 }}>{hifi ? hint : "[UPLOAD HINT]"}</div>
    </div>
  );
}

function ChoiceChip({ label, selected, onClick, c, hifi }) {
  return (
    <div onClick={onClick} style={{
      flex: 1, padding: "14px 8px", borderRadius: 14, textAlign: "center", cursor: "pointer",
      border: `2px solid ${selected ? c.accent : c.border}`,
      background: selected ? (hifi ? c.accentDim : c.accent) : c.card,
    }}>
      <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 14, color: selected ? (hifi ? c.accent : "#FFF") : c.sub }}>
        {label}
      </div>
    </div>
  );
}

// ─── DRIVER REGISTRATION ──────────────────────────────────────────────────────

function DriverReg({ go, hifi, c, onBack }) {
  const [step, setStep] = useState(1);
  const next = () => step < 4 ? setStep(s => s + 1) : go("driver_home");
  const prev = () => step > 1 ? setStep(s => s - 1) : onBack();
  const TOTAL = 4;

  const stepTitles = ["Personal Info", "License Details", "ID & License Upload", "Almost Done"];
  const stepSubs = [
    "Tell us about yourself",
    "Your driving license information",
    "Upload your documents for verification",
    "Review and submit",
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg }}>
      <BackBar title={hifi ? "Driver Registration" : "[DRIVER REG]"} onBack={prev} c={c} hifi={hifi} />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <StepBar total={TOTAL} current={step} c={c} hifi={hifi} />

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 20, color: c.text }}>{hifi ? stepTitles[step - 1] : `[STEP ${step} TITLE]`}</div>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, color: c.sub, marginTop: 4 }}>{hifi ? stepSubs[step - 1] : "[SUBTITLE]"}</div>
        </div>

        {step === 1 && (
          <>
            <Field label="Full Name" placeholder="e.g. Brian Otieno" c={c} hifi={hifi} />
            <Field label="Phone Number" placeholder="+254 7XX XXX XXX" type="tel" c={c} hifi={hifi} />
            <Field label="Email Address" placeholder="you@email.com" type="email" c={c} hifi={hifi} />
            <Field label="National ID Number" placeholder="e.g. 12345678" c={c} hifi={hifi} />
            <Field label="Password" placeholder="Min. 8 characters" type="password" c={c} hifi={hifi} />
          </>
        )}

        {step === 2 && (
          <>
            <Field label="License Number" placeholder="e.g. DL/KE/2024/001234" c={c} hifi={hifi} />
            <Field label="Date of Issue" placeholder="DD/MM/YYYY" type="date" c={c} hifi={hifi} />
            <Field label="Date of Expiry" placeholder="DD/MM/YYYY" type="date" c={c} hifi={hifi} />
            <Field label="License Class" placeholder="" type="select" c={c} hifi={hifi}
              options={["Class A – Motorcycle", "Class B – Light Motor Vehicle", "Class C – Medium Motor Vehicle", "Class D – Heavy Motor Vehicle", "Class E – PSV"]}
            />
            <Field label="Years Driving" placeholder="" type="select" c={c} hifi={hifi}
              options={["Less than 6 months", "6–12 months", "1–2 years", "2–5 years", "5+ years"]}
            />

            {hifi && (
              <div style={{ background: c.orangeDim, border: `1px solid ${c.orange}`, borderRadius: 12, padding: "12px 14px", marginTop: 6 }}>
                <div style={{ fontFamily: "DM Sans", fontSize: 12, color: c.orange }}>⚠️ Drivers with less than 6 months experience are restricted to Practice mode only.</div>
              </div>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <UploadBox label="National ID — Front" hint="Clear photo, all 4 corners visible" emoji="🪪" c={c} hifi={hifi} />
            <UploadBox label="National ID — Back" hint="Clear photo, all 4 corners visible" emoji="🪪" c={c} hifi={hifi} />
            <UploadBox label="Driving License — Front" hint="Must show license number, class, and expiry" emoji="📋" c={c} hifi={hifi} />
            <UploadBox label="Selfie with ID" hint="Hold your ID next to your face, good lighting" emoji="🤳" c={c} hifi={hifi} />
            {hifi && <div style={{ fontFamily: "DM Sans", fontSize: 12, color: c.sub, marginTop: 4 }}>All documents are encrypted and stored securely. Verification takes up to 24 hours.</div>}
          </>
        )}

        {step === 4 && (
          <>
            {/* Summary review */}
            <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 11, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "Personal" : "[PERSONAL]"}</div>
              {[["Name", "Brian Otieno"], ["Phone", "+254 712 345 678"], ["ID No.", "29XXXXXXX"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, color: c.sub }}>{hifi ? k : `[${k.toUpperCase()}]`}</span>
                  <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, fontWeight: 600, color: c.text }}>{hifi ? v : "——"}</span>
                </div>
              ))}
            </div>
            <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 11, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "License" : "[LICENSE]"}</div>
              {[["License No.", "DL/KE/2024/001234"], ["Class", "Class B — Light Motor"], ["Expires", "14/03/2029"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, color: c.sub }}>{hifi ? k : `[${k.toUpperCase()}]`}</span>
                  <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, fontWeight: 600, color: c.text }}>{hifi ? v : "——"}</span>
                </div>
              ))}
            </div>
            <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: 16, marginBottom: 20 }}>
              <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 11, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "Documents" : "[DOCS]"}</div>
              {[["National ID", "✅ Uploaded"], ["License", "✅ Uploaded"], ["Selfie", "✅ Uploaded"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, color: c.sub }}>{hifi ? k : `[${k.toUpperCase()}]`}</span>
                  <span style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, fontWeight: 600, color: hifi ? c.accent : c.text }}>{hifi ? v : "——"}</span>
                </div>
              ))}
            </div>
            {hifi && (
              <div style={{ background: c.accentDim, border: `1px solid ${c.accent}`, borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
                <div style={{ fontFamily: "DM Sans", fontSize: 13, color: c.accent, fontWeight: 600 }}>By submitting, you agree to Steer's Terms of Service, Privacy Policy, and NTSA compliance requirements.</div>
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ padding: "16px 20px 24px", borderTop: `1px solid ${c.border}`, background: c.bg }}>
        <Btn label={step === TOTAL ? (hifi ? "Submit & Start Driving 🚗" : "[SUBMIT]") : (hifi ? `Continue →` : "[NEXT]")} onClick={next} c={c} hifi={hifi} />
        {step < TOTAL && (
          <div style={{ marginTop: 10 }}>
            <Btn label={hifi ? "Save & Continue Later" : "[SAVE LATER]"} onClick={onBack} variant="secondary" c={c} hifi={hifi} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── OWNER REGISTRATION ───────────────────────────────────────────────────────

function OwnerReg({ go, hifi, c, onBack }) {
  const [step, setStep] = useState(1);
  const [transmission, setTransmission] = useState("Manual");
  const [fuel, setFuel] = useState("Petrol");
  const [modes, setModes] = useState({ Practice: true, Familiarize: false, Transport: false });
  const TOTAL = 5;

  const next = () => step < TOTAL ? setStep(s => s + 1) : go("owner_dashboard");
  const prev = () => step > 1 ? setStep(s => s - 1) : onBack();

  const stepTitles = ["Personal Info", "Vehicle Details", "Vehicle Photos", "Modes & Rates", "Documents"];
  const stepSubs = [
    "Your personal and contact details",
    "Tell us about your vehicle",
    "Upload photos of your vehicle",
    "Choose what sessions to offer",
    "Upload your documents",
  ];

  const toggleMode = (m) => setModes(prev => ({ ...prev, [m]: !prev[m] }));

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: c.bg }}>
      <BackBar title={hifi ? "Owner Registration" : "[OWNER REG]"} onBack={prev} c={c} hifi={hifi} />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
        <StepBar total={TOTAL} current={step} c={c} hifi={hifi} />

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontFamily: hifi ? "Syne" : "monospace", fontWeight: 700, fontSize: 20, color: c.text }}>{hifi ? stepTitles[step - 1] : `[STEP ${step} TITLE]`}</div>
          <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 13, color: c.sub, marginTop: 4 }}>{hifi ? stepSubs[step - 1] : "[SUBTITLE]"}</div>
        </div>

        {step === 1 && (
          <>
            <Field label="Full Name" placeholder="e.g. James Mutua" c={c} hifi={hifi} />
            <Field label="Phone Number" placeholder="+254 7XX XXX XXX" type="tel" c={c} hifi={hifi} />
            <Field label="Email Address" placeholder="you@email.com" type="email" c={c} hifi={hifi} />
            <Field label="National ID Number" placeholder="e.g. 12345678" c={c} hifi={hifi} />
            <Field label="Location / Town" placeholder="e.g. Kitale" c={c} hifi={hifi} />
            <Field label="Password" placeholder="Min. 8 characters" type="password" c={c} hifi={hifi} />
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Number Plate" placeholder="e.g. KBZ 123A" c={c} hifi={hifi} />
            <Field label="Vehicle Make" placeholder="e.g. Toyota" c={c} hifi={hifi} />
            <Field label="Vehicle Model" placeholder="e.g. Vitz" c={c} hifi={hifi} />
            <Field label="Year of Manufacture" placeholder="e.g. 2019" type="select" c={c} hifi={hifi}
              options={Array.from({ length: 20 }, (_, i) => `${2025 - i}`)}
            />
            <Field label="Body Colour" placeholder="e.g. White" c={c} hifi={hifi} />
            <Field label="Number of Seats" placeholder="" type="select" c={c} hifi={hifi}
              options={["2 seats", "4 seats", "5 seats", "7 seats", "8+ seats"]}
            />
            <Field label="Fuel Type" placeholder="" type="select" c={c} hifi={hifi}
              options={["Petrol", "Diesel", "Hybrid", "Electric"]}
            />

            {/* Transmission toggle */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 600, color: c.sub, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.8 }}>
                {hifi ? "Transmission" : "[TRANSMISSION]"}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                {["Manual", "Automatic"].map(t => (
                  <ChoiceChip key={t} label={t} selected={transmission === t} onClick={() => setTransmission(t)} c={c} hifi={hifi} />
                ))}
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <UploadBox label="Front Exterior" hint="Full front view, plate visible, good lighting" emoji="📸" c={c} hifi={hifi} />
            <UploadBox label="Rear Exterior" hint="Full rear view, plate visible" emoji="📸" c={c} hifi={hifi} />
            <UploadBox label="Interior / Cabin" hint="Driver seat, dashboard, gear area visible" emoji="🪑" c={c} hifi={hifi} />
            <UploadBox label="Dashboard / Speedometer" hint="Clear close-up showing working instruments" emoji="🎛️" c={c} hifi={hifi} />
            {hifi && <div style={{ fontFamily: "DM Sans", fontSize: 12, color: c.sub }}>At least 3 photos required. Poor quality photos delay verification.</div>}
          </>
        )}

        {step === 4 && (
          <>
            <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "Session Modes" : "[SELECT MODES]"}</div>
            {[
              ["🎓", "Practice", "Sit with new drivers as they build skill"],
              ["🗺️", "Familiarize", "Guide drivers through towns or routes"],
              ["🚕", "Transport", "Passenger drives you to their destination"],
            ].map(([icon, mode, desc]) => (
              <div key={mode} onClick={() => toggleMode(mode)} style={{
                background: modes[mode] ? (hifi ? c.accentDim : c.accent) : c.card,
                border: `2px solid ${modes[mode] ? c.accent : c.border}`,
                borderRadius: 16, padding: 16, marginBottom: 12, cursor: "pointer",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: 26, marginTop: 2 }}>{hifi ? icon : ""}</span>
                {!hifi && <div style={{ width: 26, height: 26, background: c.block, borderRadius: 5, flexShrink: 0 }} />}
                <div>
                  <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontWeight: 700, fontSize: 15, color: modes[mode] ? (hifi ? c.accent : "#FFF") : c.text }}>{hifi ? mode : `[${mode.toUpperCase()}]`}</div>
                  <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, color: modes[mode] ? (hifi ? c.accent + "AA" : "#FFFFFF88") : c.sub, marginTop: 4 }}>{hifi ? desc : "[MODE DESCRIPTION]"}</div>
                </div>
                <div style={{ marginLeft: "auto", width: 22, height: 22, borderRadius: "50%", background: modes[mode] ? c.accent : c.border, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {modes[mode] && <span style={{ color: "#07070F", fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
              </div>
            ))}

            {/* Rate inputs per selected mode */}
            {Object.entries(modes).filter(([, v]) => v).length > 0 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12, fontWeight: 700, color: c.sub, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{hifi ? "Your Rates (KES/hr)" : "[SET RATES]"}</div>
                {Object.entries(modes).filter(([, v]) => v).map(([mode]) => (
                  <div key={mode} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 14, color: c.text, width: 110, flexShrink: 0 }}>{hifi ? mode : `[${mode.toUpperCase()}]`}</div>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", background: c.card, border: `1.5px solid ${c.border}`, borderRadius: 12, overflow: "hidden" }}>
                      <span style={{ padding: "0 12px", color: c.sub, fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 14 }}>{hifi ? "KES" : "KES"}</span>
                      <input type="number" defaultValue={650} style={{ flex: 1, background: "transparent", border: "none", outline: "none", padding: "12px 8px", color: c.text, fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 15, fontWeight: 700 }} />
                      <span style={{ padding: "0 12px", color: c.sub, fontFamily: hifi ? "DM Sans" : "monospace", fontSize: 12 }}>/hr</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {step === 5 && (
          <>
            <UploadBox label="National ID — Front & Back" hint="Both sides in one upload or separate" emoji="🪪" c={c} hifi={hifi} />
            <UploadBox label="Vehicle Logbook / Registration" hint="Must match the number plate you entered" emoji="📄" c={c} hifi={hifi} />
            <UploadBox label="Insurance Certificate" hint="Valid comprehensive or third-party cover" emoji="🛡️" c={c} hifi={hifi} />
            <UploadBox label="Your Driving License" hint="Owners must also hold a valid license" emoji="📋" c={c} hifi={hifi} />

            {hifi && (
              <>
                <div style={{ background: c.accentDim, border: `1px solid ${c.accent}`, borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
                  <div style={{ fontFamily: "DM Sans", fontSize: 12, color: c.accent, fontWeight: 600, marginBottom: 4 }}>✅ What happens next</div>
                  <div style={{ fontFamily: "DM Sans", fontSize: 12, color: c.sub }}>Our team will verify your vehicle and documents within 24–48 hours. You'll be notified via SMS when approved.</div>
                </div>
                <div style={{ fontFamily: "DM Sans", fontSize: 12, color: c.sub, marginBottom: 20 }}>By submitting, you confirm all documents are genuine and agree to Steer's Owner Terms and NTSA compliance standards.</div>
              </>
            )}
          </>
        )}
      </div>

      <div style={{ padding: "16px 20px 24px", borderTop: `1px solid ${c.border}`, background: c.bg }}>
        <Btn
          label={step === TOTAL ? (hifi ? "Submit for Verification 🔑" : "[SUBMIT]") : (hifi ? "Continue →" : "[NEXT]")}
          onClick={next} c={c} hifi={hifi}
        />
        {step < TOTAL && (
          <div style={{ marginTop: 10 }}>
            <Btn label={hifi ? "Save & Continue Later" : "[SAVE LATER]"} onClick={onBack} variant="secondary" c={c} hifi={hifi} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCREEN MAP ───────────────────────────────────────────────────────────────
const ALL_SCREENS = [
  { id: "splash", label: "Splash", group: "Entry" },
  { id: "role_select", label: "Role Select", group: "Entry" },
  { id: "driver_reg", label: "Driver Reg", group: "Driver" },
  { id: "driver_home", label: "Driver Home", group: "Driver" },
  { id: "browse_owners", label: "Browse", group: "Driver" },
  { id: "owner_profile", label: "Profile", group: "Driver" },
  { id: "booking", label: "Booking", group: "Driver" },
  { id: "active_session", label: "Session", group: "Driver" },
  { id: "session_end", label: "End", group: "Driver" },
  { id: "owner_reg", label: "Owner Reg", group: "Owner" },
  { id: "owner_dashboard", label: "Dashboard", group: "Owner" },
  { id: "incoming_request", label: "Request", group: "Owner" },
];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SteerPrototype() {
  const [hifi, setHifi] = useState(false);
  const [screen, setScreen] = useState("splash");
  const [role, setRole] = useState(null);
  const [history, setHistory] = useState([]);

  const go = (s) => {
    setHistory(h => [...h, screen]);
    setScreen(s);
  };
  const back = () => {
    if (history.length > 0) {
      setScreen(history[history.length - 1]);
      setHistory(h => h.slice(0, -1));
    }
  };

  const c = hifi ? HI : LO;

  const renderScreen = () => {
    const props = { go, hifi, c, onBack: back, setRole, role };
    switch (screen) {
      case "splash": return <Splash {...props} />;
      case "role_select": return <RoleSelect {...props} />;
      case "driver_reg": return <DriverReg {...props} />;
      case "driver_home": return <DriverHome {...props} />;
      case "browse_owners": return <BrowseOwners {...props} />;
      case "owner_profile": return <OwnerProfile {...props} />;
      case "booking": return <Booking {...props} />;
      case "active_session": return <ActiveSession {...props} />;
      case "session_end": return <SessionEnd {...props} />;
      case "owner_reg": return <OwnerReg {...props} />;
      case "owner_dashboard": return <OwnerDashboard {...props} />;
      case "incoming_request": return <IncomingRequest {...props} />;
      default: return <Splash {...props} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050508", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "24px 16px 40px", fontFamily: "system-ui" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');`}</style>

      {/* Header */}
      <div style={{ marginBottom: 24, textAlign: "center" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, color: "#EEEEF8", letterSpacing: -1 }}>Steer</div>
        <div style={{ fontSize: 12, color: "#6B6B80", marginTop: 4 }}>Interactive Prototype — Click to navigate</div>
      </div>

      {/* Fidelity toggle */}
      <div style={{ display: "flex", background: "#111118", border: "1px solid #252540", borderRadius: 50, padding: 4, marginBottom: 24, gap: 4 }}>
        {[["Lo-Fi", false], ["Hi-Fi", true]].map(([label, val]) => (
          <button key={label} onClick={() => setHifi(val)} style={{
            padding: "8px 24px", borderRadius: 50, border: "none", cursor: "pointer", fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: 13,
            background: hifi === val ? (val ? "#3DFFA0" : "#FFFFFF") : "transparent",
            color: hifi === val ? "#07070F" : "#6B6B80",
            transition: "all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      {/* Phone frame */}
      <div style={{
        width: 375, height: 720, borderRadius: 44, border: "8px solid #1C1C30", boxShadow: "0 40px 100px #00000080, 0 0 0 1px #2A2A50",
        overflow: "hidden", position: "relative", background: hifi ? HI.bg : LO.bg,
        display: "flex", flexDirection: "column",
      }}>
        {/* Status bar */}
        <div style={{ height: 36, background: hifi ? HI.surface : "#F8F8F8", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0, borderBottom: `1px solid ${hifi ? HI.border : "#E8E8E8"}` }}>
          <span style={{ fontFamily: "DM Sans", fontWeight: 600, fontSize: 12, color: hifi ? "#EEEEF8" : "#111" }}>9:41</span>
          <div style={{ width: 80, height: 12, background: hifi ? HI.card : "#E0E0E0", borderRadius: 10 }} />
          <span style={{ fontFamily: "DM Sans", fontSize: 11, color: hifi ? "#8888A8" : "#666" }}>100%</span>
        </div>
        {/* Screen content */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {renderScreen()}
        </div>
      </div>

      {/* Screen nav */}
      <div style={{ marginTop: 28, maxWidth: 460, width: "100%" }}>
        {["Entry", "Driver", "Owner"].map(group => (
          <div key={group} style={{ marginBottom: 12 }}>
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, fontWeight: 700, color: "#44445A", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 6 }}>{group}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ALL_SCREENS.filter(s => s.group === group).map(s => (
                <button key={s.id} onClick={() => { setHistory([]); setScreen(s.id); }} style={{
                  padding: "6px 14px", borderRadius: 50, fontSize: 12, fontFamily: "DM Sans, sans-serif", fontWeight: 600, cursor: "pointer",
                  background: screen === s.id ? "#3DFFA0" : "#111118",
                  color: screen === s.id ? "#07070F" : "#6B6B80",
                  border: `1px solid ${screen === s.id ? "#3DFFA0" : "#252540"}`,
                }}>{s.label}</button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, fontSize: 11, color: "#44445A", fontFamily: "DM Sans", textAlign: "center" }}>
        Driver: Splash → Role → <strong style={{ color: "#3DFFA060" }}>Reg (4 steps)</strong> → Home → Browse → Profile → Booking → Session → End<br />
        Owner: Role → <strong style={{ color: "#3DFFA060" }}>Reg (5 steps)</strong> → Dashboard → Request
      </div>
    </div>
  );
}
