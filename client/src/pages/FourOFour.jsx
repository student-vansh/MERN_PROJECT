import React from "react";
import { useEffect, useState } from "react";

const lineCount = 12;

export default function FourOFour() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.page}>
      <div style={{
        ...styles.paper,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) rotate(-1.5deg)" : "translateY(24px) rotate(-1.5deg)"
      }}>

        {/* Ruled lines */}
        <div style={styles.linesWrapper}>
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} style={{ ...styles.ruleLine, top: `${60 + i * 36}px` }} />
          ))}
          <div style={styles.marginLine} />
        </div>

        {/* Spiral holes */}
        <div style={styles.holes}>
          {[0, 1, 2].map((i) => <div key={i} style={styles.hole} />)}
        </div>

        {/* Content */}
        <div style={styles.content}>
          <p style={styles.subject}>
            Subject: <span style={styles.subjectVal}>Page Not Found</span>
          </p>

          <div style={styles.errorNumWrapper}>
            <span style={styles.errorNumBg}>404</span>
            <span style={styles.errorNum}>404</span>
          </div>

          <p style={styles.handwritten}><em>Hmm, this note seems to be missing…</em></p>
          <div style={styles.divider} />
          <p style={styles.body}>Looks like this page wandered off your notebook.</p>
          <p style={styles.body}>Double-check the URL, or head back to your workspace.</p>

          <div style={styles.btnRow}>
            <a href="/home" style={styles.btn}>← Back to Notes</a>
            <button onClick={() => window.history.back()} style={styles.btnGhost}>
              Go Back
            </button>
          </div>
        </div>

        {/* Torn bottom edge */}
        <svg viewBox="0 0 600 28" preserveAspectRatio="none" style={styles.tornEdge}>
          <path
            d="M0,0 Q30,14 60,7 Q90,0 120,14 Q150,28 180,14 Q210,0 240,14 Q270,28 300,14 Q330,0 360,14 Q390,28 420,14 Q450,0 480,14 Q510,28 540,14 Q570,0 600,14 L600,0 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Floating doodles */}
      <span style={{ ...styles.doodle, top: "12%", left: "8%", transform: "rotate(-18deg)", opacity: visible ? 1 : 0 }}>oops!</span>
      <span style={{ ...styles.doodle, top: "18%", right: "9%", transform: "rotate(12deg)", opacity: visible ? 1 : 0 }}>lost?</span>
      <span style={{ ...styles.doodle, bottom: "14%", left: "10%", transform: "rotate(10deg)", opacity: visible ? 1 : 0 }}>404…</span>
      <span style={{ ...styles.doodle, bottom: "18%", right: "8%", transform: "rotate(-14deg)", opacity: visible ? 1 : 0 }}>¯\_(ツ)_/¯</span>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600&family=EB+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0ede4; min-height: 100vh; }
      `}</style>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #f0ede4 0%, #e8e4d8 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'EB Garamond', Georgia, serif", position: "relative", overflow: "hidden", padding: "2rem" },
  paper: { position: "relative", background: "white", width: "100%", maxWidth: "560px", borderRadius: "2px 2px 0 0", boxShadow: "0 8px 40px rgba(0,0,0,0.13)", paddingBottom: "28px", transition: "opacity 0.55s ease, transform 0.55s ease", zIndex: 1 },
  linesWrapper: { position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit", pointerEvents: "none" },
  ruleLine: { position: "absolute", left: 0, right: 0, height: "1px", background: "#ccd7f0", opacity: 0.55 },
  marginLine: { position: "absolute", top: 0, bottom: 0, left: "64px", width: "1.5px", background: "#f09595", opacity: 0.55 },
  holes: { position: "absolute", top: 0, left: "28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", pointerEvents: "none" },
  hole: { width: "18px", height: "18px", borderRadius: "50%", background: "#f0ede4", border: "1.5px solid #d3d1c7" },
  content: { position: "relative", padding: "40px 40px 20px 88px", zIndex: 1 },
  subject: { fontSize: "13px", color: "#888780", marginBottom: "24px", borderBottom: "1px solid #e8e4d8", paddingBottom: "10px" },
  subjectVal: { color: "#534AB7", fontWeight: 600 },
  errorNumWrapper: { position: "relative", marginBottom: "16px", lineHeight: 1, userSelect: "none" },
  errorNumBg: { position: "absolute", fontSize: "96px", fontWeight: 700, color: "#AFA9EC", opacity: 0.18, top: "-14px", left: "-6px", letterSpacing: "-4px" },
  errorNum: { fontSize: "80px", fontWeight: 700, color: "#534AB7", letterSpacing: "-3px", lineHeight: 1, display: "block" },
  handwritten: { fontFamily: "'Caveat', cursive", fontSize: "22px", color: "#3C3489", marginBottom: "10px", marginTop: "8px" },
  divider: { borderBottom: "1px dashed #AFA9EC", marginBottom: "14px", width: "80%" },
  body: { fontSize: "16px", color: "#5F5E5A", lineHeight: 1.75, marginBottom: "6px" },
  btnRow: { display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" },
  btn: { display: "inline-block", padding: "10px 24px", background: "#534AB7", color: "white", borderRadius: "24px", fontSize: "15px", textDecoration: "none", border: "none", cursor: "pointer" },
  btnGhost: { display: "inline-block", padding: "10px 24px", background: "transparent", color: "#534AB7", borderRadius: "24px", fontSize: "15px", border: "1.5px solid #AFA9EC", cursor: "pointer" },
  tornEdge: { position: "absolute", bottom: 0, left: 0, width: "100%", height: "28px", display: "block" },
  doodle: { position: "absolute", fontFamily: "'Caveat', cursive", fontSize: "18px", color: "#AFA9EC", pointerEvents: "none", transition: "opacity 0.7s ease" },
};