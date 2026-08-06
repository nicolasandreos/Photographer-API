import type { CSSProperties } from "react";

export interface ChangePasswordFormProps {
  token: string;
  error?: string | null;
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
  errorBg: "rgba(132, 53, 36, 0.1)",
  errorBorder: "rgba(132, 53, 36, 0.35)",
  errorText: "#8a3b28",
};

const headingAccent: CSSProperties = {
  color: colors.brassDeep,
  fontStyle: "italic",
  fontWeight: 500,
};

export function ChangePasswordForm({
  token,
  error = null,
}: ChangePasswordFormProps) {
  const formAction = `${process.env.CHANGE_PHOTOGRAPHER_PASSWORD_URL}?token=${encodeURIComponent(token)}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Change password — Photos AI</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
              @keyframes grain {
                0%, 100% { transform: translate(0, 0); }
                50% { transform: translate(-1%, 1%); }
              }
              @keyframes errorIn {
                from { opacity: 0; transform: translateY(-6px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .shell { animation: fadeRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
              .brand { animation: fadeRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both; }
              .card { animation: fadeRise 1s cubic-bezier(0.22, 1, 0.36, 1) 0.16s both; }
              .footer { animation: fadeRise 1s cubic-bezier(0.22, 1, 0.36, 1) 0.32s both; }
              .glow-a { animation: softGlow 7s ease-in-out infinite; }
              .glow-b { animation: softGlow 9s ease-in-out infinite 1.4s; }
              .accent-line {
                transform-origin: left center;
                animation: markDraw 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.45s both;
              }
              .grain { animation: grain 8s steps(2) infinite; }
              .error-banner { animation: errorIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
              .field input:focus {
                outline: none;
                border-color: ${colors.brass} !important;
                box-shadow: 0 0 0 3px rgba(184, 149, 108, 0.18);
              }
              .submit:hover {
                filter: brightness(1.08);
              }
              .submit:active {
                transform: translateY(1px);
              }
              @media (prefers-reduced-motion: reduce) {
                .shell, .brand, .card, .footer, .glow-a, .glow-b,
                .accent-line, .grain, .error-banner {
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

            <p style={styles.eyebrow}>Password reset</p>

            <h1 style={styles.heading}>
              Choose a <em style={headingAccent}>fresh key</em>.
            </h1>

            <p style={styles.bodyCopy}>
              Enter a new password for your Photos AI studio. Keep it between 6
              and 20 characters.
            </p>

            {error ? (
              <div
                className="error-banner"
                role="alert"
                style={styles.errorBanner}
              >
                <span style={styles.errorLabel}>Something went wrong</span>
                <span style={styles.errorMessage}>{error}</span>
              </div>
            ) : null}

            <form
              method="POST"
              action={formAction}
              style={styles.form}
              noValidate
            >
              <input type="hidden" name="token" value={token} />

              <label className="field" style={styles.field}>
                <span style={styles.label}>New password</span>
                <input
                  type="password"
                  name="newPassword"
                  autoComplete="new-password"
                  minLength={6}
                  maxLength={20}
                  required
                  placeholder="••••••••"
                  style={styles.input}
                />
              </label>

              <label className="field" style={styles.field}>
                <span style={styles.label}>Confirm new password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  minLength={6}
                  maxLength={20}
                  required
                  placeholder="••••••••"
                  style={styles.input}
                />
              </label>

              <p id="client-error" style={styles.clientError} hidden />

              <button type="submit" className="submit" style={styles.submit}>
                Update password
              </button>
            </form>

            <div style={styles.divider} />

            <p style={styles.helper}>
              If you did not request this change, close this page — your
              current password remains unchanged.
            </p>
          </section>

          <footer className="footer" style={styles.footer}>
            <p style={styles.footerBrand}>Photos AI</p>
            <p style={styles.footerMeta}>
              Crafted for photographers who chase light.
            </p>
          </footer>
        </main>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var form = document.querySelector("form");
                if (!form) return;
                var clientError = document.getElementById("client-error");
                form.addEventListener("submit", function (event) {
                  var newPassword = form.querySelector('[name="newPassword"]');
                  var confirmPassword = form.querySelector('[name="confirmPassword"]');
                  if (!newPassword || !confirmPassword || !clientError) return;
                  var next = newPassword.value;
                  var confirm = confirmPassword.value;
                  if (next.length < 6 || next.length > 20) {
                    event.preventDefault();
                    clientError.hidden = false;
                    clientError.textContent = "Password must be between 6 and 20 characters.";
                    return;
                  }
                  if (next !== confirm) {
                    event.preventDefault();
                    clientError.hidden = false;
                    clientError.textContent = "Passwords do not match.";
                    return;
                  }
                  clientError.hidden = true;
                  clientError.textContent = "";
                });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

export default ChangePasswordForm;

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
  eyebrow: {
    margin: "0 0 14px",
    color: colors.brassDeep,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.32em",
    textTransform: "uppercase",
  },
  heading: {
    margin: "0 0 14px",
    color: colors.charcoal,
    fontFamily: 'Fraunces, Georgia, "Times New Roman", serif',
    fontSize: "34px",
    fontWeight: 600,
    lineHeight: 1.18,
    letterSpacing: "-0.02em",
  },
  bodyCopy: {
    margin: "0 0 24px",
    color: colors.espresso,
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.65,
  },
  errorBanner: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginBottom: "22px",
    padding: "14px 16px",
    borderRadius: "3px",
    backgroundColor: colors.errorBg,
    border: `1px solid ${colors.errorBorder}`,
  },
  errorLabel: {
    color: colors.errorText,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
  },
  errorMessage: {
    color: colors.errorText,
    fontSize: "14px",
    lineHeight: 1.5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    margin: 0,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: colors.espresso,
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "2px",
    border: `1px solid ${colors.parchmentMuted}`,
    backgroundColor: colors.softWhite,
    color: colors.charcoal,
    fontFamily: "Outfit, Helvetica, Arial, sans-serif",
    fontSize: "15px",
    lineHeight: 1.4,
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },
  clientError: {
    margin: 0,
    color: colors.errorText,
    fontSize: "13px",
    lineHeight: 1.45,
  },
  submit: {
    marginTop: "6px",
    width: "100%",
    padding: "16px 24px",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
    backgroundColor: colors.charcoal,
    backgroundImage: `linear-gradient(180deg, ${colors.espresso} 0%, ${colors.charcoal} 100%)`,
    color: colors.softWhite,
    fontFamily: "Outfit, Helvetica, Arial, sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "filter 0.2s ease, transform 0.15s ease",
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
