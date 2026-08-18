import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export interface EmailProps {
  token: string;
  photographerName: string;
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

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function PendingConfirmationEmail({
  token,
  photographerName,
}: EmailProps) {
  const firstName = capitalizeFirstLetter(photographerName.trim().split(/\s+/)[0]);
  const verificationUrl = `${process.env.EMAIL_VERIFICATION_URL}?token=${token}`;

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Fraunces"
          fallbackFontFamily="Georgia"
          webFont={{
            url: "https://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib14c7qv8x.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Fraunces"
          fallbackFontFamily="Georgia"
          webFont={{
            url: "https://fonts.gstatic.com/s/fraunces/v31/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib14c7qv8x.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
        <Font
          fontFamily="Outfit"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Outfit"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.woff2",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        Confirm your email to open your Photos AI studio — one click away.
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.shell}>
          <Section style={styles.topBar}>
            <Text style={styles.brandMark}>PHOTOS&nbsp;AI</Text>
            <Text style={styles.brandTag}>Studio workspace</Text>
          </Section>

          <Section style={styles.card}>
            <Text style={styles.eyebrow}>Email verification</Text>

            <Heading as="h1" style={styles.heading}>
              Welcome to the{" "}
              <span style={styles.headingAccent}>golden hour</span>, {firstName}.
            </Heading>

            <Text style={styles.bodyCopy}>
              Your account is ready. Confirm this email address to unlock your
              studio, start organizing shoots, and let Photos AI handle the
              heavy lifting behind every frame.
            </Text>

            <Section style={styles.ctaWrap}>
              <Button href={verificationUrl} style={styles.button}>
                Confirm email address
              </Button>
            </Section>

            <Text style={styles.helper}>
              This link expires in 24 hours. If you did not create a Photos AI
              account, you can safely ignore this message.
            </Text>

            <Hr style={styles.divider} />

          </Section>

          <Section style={styles.footer}>
            <Text style={styles.footerBrand}>Photos AI</Text>
            <Text style={styles.footerMeta}>
              Crafted for photographers who chase light.
            </Text>
            <Text style={styles.footerLegal}>
              © {new Date().getFullYear()} Photos AI. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default PendingConfirmationEmail;

const styles = {
  body: {
    margin: "0",
    padding: "0",
    backgroundColor: colors.ink,
    backgroundImage:
      "radial-gradient(ellipse at 20% 0%, #2a2318 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, #1a1610 0%, transparent 50%)",
    fontFamily: 'Outfit, Helvetica, Arial, sans-serif',
  },
  shell: {
    margin: "0 auto",
    padding: "48px 20px",
    maxWidth: "560px",
  },
  topBar: {
    padding: "0 8px 28px",
    textAlign: "center" as const,
  },
  brandMark: {
    margin: "0",
    color: colors.brass,
    fontFamily: 'Fraunces, Georgia, "Times New Roman", serif',
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.42em",
    textTransform: "uppercase" as const,
  },
  brandTag: {
    margin: "8px 0 0",
    color: colors.warmGray,
    fontSize: "11px",
    fontWeight: 400,
    letterSpacing: "0.28em",
    textTransform: "uppercase" as const,
  },
  card: {
    backgroundColor: colors.parchment,
    backgroundImage:
      "linear-gradient(165deg, #faf6ee 0%, #f3ebdc 48%, #efe6d6 100%)",
    borderRadius: "4px",
    borderTop: `3px solid ${colors.brass}`,
    padding: "44px 40px 40px",
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
  },
  eyebrow: {
    margin: "0 0 18px",
    color: colors.brassDeep,
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.32em",
    textTransform: "uppercase" as const,
  },
  heading: {
    margin: "0 0 20px",
    color: colors.charcoal,
    fontFamily: 'Fraunces, Georgia, "Times New Roman", serif',
    fontSize: "32px",
    fontWeight: 600,
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
  },
  headingAccent: {
    color: colors.brassDeep,
    fontStyle: "italic" as const,
  },
  bodyCopy: {
    margin: "0 0 32px",
    color: colors.espresso,
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "1.65",
  },
  ctaWrap: {
    textAlign: "center" as const,
    margin: "0 0 28px",
  },
  button: {
    backgroundColor: colors.charcoal,
    backgroundImage: `linear-gradient(180deg, ${colors.espresso} 0%, ${colors.charcoal} 100%)`,
    borderRadius: "2px",
    color: colors.softWhite,
    display: "inline-block",
    fontFamily: 'Outfit, Helvetica, Arial, sans-serif',
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.08em",
    lineHeight: "100%",
    padding: "18px 36px",
    textDecoration: "none",
    textTransform: "uppercase" as const,
  },
  helper: {
    margin: "0",
    color: colors.warmGray,
    fontSize: "13px",
    lineHeight: "1.55",
    textAlign: "center" as const,
  },
  divider: {
    borderColor: colors.parchmentMuted,
    borderTop: `1px solid ${colors.parchmentMuted}`,
    margin: "32px 0 24px",
  },
  fallbackLabel: {
    margin: "0 0 6px",
    color: colors.espresso,
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
  },
  fallbackCopy: {
    margin: "0 0 8px",
    color: colors.warmGray,
    fontSize: "13px",
    lineHeight: "1.5",
  },
  fallbackLink: {
    color: colors.brassDeep,
    fontSize: "12px",
    lineHeight: "1.5",
    wordBreak: "break-all" as const,
  },
  footer: {
    padding: "32px 8px 0",
    textAlign: "center" as const,
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
    margin: "0 0 16px",
    color: colors.warmGray,
    fontSize: "12px",
    fontStyle: "italic" as const,
    lineHeight: "1.5",
  },
  footerLegal: {
    margin: "0",
    color: "#5c554c",
    fontSize: "11px",
    lineHeight: "1.5",
  },
};
