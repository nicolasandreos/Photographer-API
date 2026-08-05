import type { CSSProperties } from "react";

export type EmailConfirmedVariant = "success" | "already-verified";

export interface EmailConfirmedProps {
  variant?: EmailConfirmedVariant;
}

const colors = {
  ink: "#0f0e0c",
  charcoal: "#1c1915",
  parchment: "#f6f0e6",
  parchmentMuted: "#ebe3d4",
  brass: "#b8956c",
  brassDeep: "#8f7048",
  espresso: "#3d3429",
  warmGray: "#7a7165",
  softWhite: "#faf7f2",
};

const headingAccent: CSSProperties = {
  color: colors.brassDeep,
  fontStyle: "italic",
  fontWeight: 500,
};

const copy = {
  success: {
    title: "Email confirmed — Photos AI",
    eyebrow: "Email verified",
    headingBefore: "Welcome to the ",
    headingAccent: "golden hour",
    headingAfter: ".",
    body: "Your account is active. The studio doors are open — organize shoots, refine your craft, and let Photos AI carry the weight behind every frame.",
    status: "Confirmed just now",
  },
  "already-verified": {
    title: "Already verified — Photos AI",
    eyebrow: "Already verified",
    headingBefore: "You're already in the ",
    headingAccent: "light",
    headingAfter: ".",
    body: "This email address was confirmed before. Nothing else to do here — your Photos AI studio is ready whenever you return.",
    status: "Previously confirmed",
  },
} as const;

export function EmailConfirmed({
  variant = "success",
}: EmailConfirmedProps) {
  const content = copy[variant];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{content.title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Outfit:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              *, *::before, *::after { box-sizing: border-box; }
              html, body { margin: 0; min-height: 100%; }
              body {
                background: ${colors.ink};
                color: ${colors.softWhite};
                font-family: Outfit, Helvetica, Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
              }
              @keyframes fadeRise {
                from { opacity: 0; transform: translateY(18px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes softGlow {
                0%, 100% { opacity: 0.35; transform: scale(1); }
                50% { opacity: 0.55; transform: scale(1.06); }
              }
              @keyframes markDraw {
                from { transform: scaleX(0); }
                to { transform: scaleX(1); }
              }
              @keyframes checkIn {
                0% { opacity: 0; transform: scale(0.7); }
                60% { opacity: 1; transform: scale(1.08); }
                100% { opacity: 1; transform: scale(1); }
              }
              @keyframes grain {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(-1%, 1%); }
              }
              .shell { animation: fadeRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
              .brand { animation: fadeRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both; }
              .card { animation: fadeRise 1s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both; }
              .footer { animation: fadeRise 1s cubic-bezier(0.22, 1, 0.36, 1) 0.32s both; }
              .glow-a {
                animation: softGlow 7s ease-in-out infinite;
              }
              .glow-b {
                animation: softGlow 9s ease-in-out infinite 1.4s;
              }
              .accent-line {
                transform-origin: left center;
                animation: markDraw 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both;
              }
              .badge {
                animation: checkIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.55s both;
              }
              .grain {
                animation: grain 8s steps(2) infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .shell, .brand, .card, .footer, .glow-a, .glow-b,
                .accent-line, .badge, .grain {
                  animation: none !important;
                  opacity: 1 !important;
                  transform: none !important;
                }
              }
            `,
          }}
        />
      </head>
      <body style={styles.body}>
        <div className="glow-a" style={styles.glowA} aria-hidden="true" />
        <div className="glow-b" style={styles.glowB} aria-hidden="true" />
        <div className="grain" style={styles.grain} aria-hidden="true" />

        <main className="shell" style={styles.shell}>
          <header className="brand" style={styles.topBar}>
            <p style={styles.brandMark}>PHOTOS&nbsp;AI</p>
            <p style={styles.brandTag}>Studio workspace</p>
          </header>

          <section className="card" style={styles.card}>
            <div className="accent-line" style={styles.accentLine} />

            <div className="badge" style={styles.badge}>
              <span style={styles.badgeDot} />
              <span style={styles.badgeText}>{content.status}</span>
            </div>

            <p style={styles.eyebrow}>{content.eyebrow}</p>

            <h1 style={styles.heading}>
              {content.headingBefore}
              <em style={headingAccent}>{content.headingAccent}</em>
              {content.headingAfter}
            </h1>

            <p style={styles.bodyCopy}>{content.body}</p>

            <div style={styles.divider} />

            <p style={styles.helper}>
              You can close this tab and return to Photos AI whenever you&apos;re
              ready.
            </p>
          </section>

          <footer className="footer" style={styles.footer}>
            <p style={styles.footerBrand}>Photos AI</p>
            <p style={styles.footerMeta}>
              Crafted for photographers who chase light.
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}

export default EmailConfirmed;

const styles: Record<string, CSSProperties> = {
  body: {
    margin: 0,
    minHeight: "100vh",
    backgroundColor: colors.ink,
    backgroundImage:
      "radial-gradient(ellipse at 18% 8%, #2a2318 0%, transparent 52%), radial-gradient(ellipse at 86% 92%, #1a1610 0%, transparent 48%)",
    position: "relative",
    overflow: "hidden",
  },
  glowA: {
    position: "fixed",
    top: "-12%",
    left: "8%",
    width: "42vw",
    height: "42vw",
    maxWidth: "520px",
    maxHeight: "520px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(184, 149, 108, 0.22) 0%, transparent 70%)",
    pointerEvents: "none",
    filter: "blur(8px)",
  },
  glowB: {
    position: "fixed",
    bottom: "-18%",
    right: "0%",
    width: "48vw",
    height: "48vw",
    maxWidth: "560px",
    maxHeight: "560px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(143, 112, 72, 0.18) 0%, transparent 72%)",
    pointerEvents: "none",
    filter: "blur(10px)",
  },
  grain: {
    position: "fixed",
    inset: "-20%",
    pointerEvents: "none",
    opacity: 0.07,
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    backgroundSize: "180px 180px",
    mixBlendMode: "overlay" as CSSProperties["mixBlendMode"],
  },
  shell: {
    position: "relative",
    zIndex: 1,
    margin: "0 auto",
    padding: "72px 20px 56px",
    maxWidth: "560px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  topBar: {
    padding: "0 8px 28px",
    textAlign: "center",
  },
  brandMark: {
    margin: 0,
    color: colors.brass,
    fontFamily: 'Fraunces, Georgia, "Times New Roman", serif',
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.42em",
    textTransform: "uppercase",
  },
  brandTag: {
    margin: "8px 0 0",
    color: colors.warmGray,
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "0.28em",
    textTransform: "uppercase",
  },
  card: {
    position: "relative",
    backgroundColor: colors.parchment,
    backgroundImage:
      "linear-gradient(165deg, #faf6ee 0%, #f3ebdc 48%, #efe6d6 100%)",
    borderRadius: "4px",
    padding: "44px 40px 40px",
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
    overflow: "hidden",
  },
  accentLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: `linear-gradient(90deg, ${colors.brassDeep}, ${colors.brass}, ${colors.brassDeep})`,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "22px",
    padding: "8px 12px",
    borderRadius: "999px",
    backgroundColor: "rgba(143, 112, 72, 0.12)",
    border: `1px solid rgba(184, 149, 108, 0.35)`,
  },
  badgeDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    backgroundColor: colors.brassDeep,
    boxShadow: `0 0 0 3px rgba(184, 149, 108, 0.2)`,
  },
  badgeText: {
    color: colors.brassDeep,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
  },
  eyebrow: {
    margin: "0 0 14px",
    color: colors.brassDeep,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.32em",
    textTransform: "uppercase",
  },
  heading: {
    margin: "0 0 18px",
    color: colors.charcoal,
    fontFamily: 'Fraunces, Georgia, "Times New Roman", serif',
    fontSize: "34px",
    fontWeight: 600,
    lineHeight: 1.18,
    letterSpacing: "-0.02em",
  },
  bodyCopy: {
    margin: "0 0 8px",
    color: colors.espresso,
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.65,
  },
  divider: {
    height: "1px",
    margin: "28px 0 20px",
    backgroundColor: colors.parchmentMuted,
    border: "none",
  },
  helper: {
    margin: 0,
    color: colors.warmGray,
    fontSize: "13px",
    lineHeight: 1.55,
  },
  footer: {
    padding: "32px 8px 0",
    textAlign: "center",
  },
  footerBrand: {
    margin: "0 0 6px",
    color: colors.brass,
    fontFamily: 'Fraunces, Georgia, "Times New Roman", serif',
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.12em",
  },
  footerMeta: {
    margin: 0,
    color: colors.warmGray,
    fontSize: "12px",
    fontStyle: "italic",
    lineHeight: 1.5,
  },
};
