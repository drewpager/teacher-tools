import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface SlackConfirmEmailProps {
  validationCode?: string;
}

const baseUrl = process.env.PUBLIC_URL
  ? `https://${process.env.PUBLIC_URL}`
  : "";

export const SlackConfirmEmail = ({
  validationCode,
}: SlackConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirm your email address</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            // src={`${baseUrl}/static/fruit.png`}
            src={`../../assets/fruit.png`}
            width="120"
            height="36"
            alt="Slack"
          />
        </Section>
        <Heading style={h1}>Welcome to Plato's Peach</Heading>
        <Text style={heroText}>
          Your confirmation code is below - enter it in your open browser window
          and we'll help you get signed in.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>{validationCode}</Text>
        </Section>

        <Text style={text}>
          If you didn't sign up for Plato's Peach, please contact us <Link style={{ color: "#57996a" }} href={`${baseUrl}/contact`}>here</Link>
        </Text>

        <Section>
          <Link
            style={footerLink}
            href="https://www.platospeach.com/plans"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lesson Plan Templates
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://www.platospeach.com/catalog/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Catalog
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://www.platospeach.com/contact/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://slack.com/community"
            target="_blank"
            rel="noopener noreferrer"
            data-auth="NotApplicable"
            data-linkindex="6"
          >
            Community
          </Link>
          <Text style={footerText}>
            ©2024 Page One Productions, LLC. <br />
            1757 Playa Vista, San Marcos, CA 92078, USA <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

SlackConfirmEmail.PreviewProps = {
  validationCode: "DJZ-TLX",
} as SlackConfirmEmailProps;

export default SlackConfirmEmail;

const footerText = {
  fontSize: "12px",
  color: "#b7b7b7",
  lineHeight: "15px",
  textAlign: "left" as const,
  marginBottom: "50px",
};

const footerLink = {
  color: "#b7b7b7",
  textDecoration: "underline",
};

const footerLogos = {
  marginBottom: "32px",
  paddingLeft: "8px",
  paddingRight: "8px",
  width: "100%",
};

const socialMediaIcon = {
  display: "inline",
  marginLeft: "32px",
};

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "0px 20px",
};

const logoContainer = {
  marginTop: "32px",
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
};

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
};

const codeBox = {
  background: "rgb(245, 244, 245)",
  borderRadius: "4px",
  marginBottom: "30px",
  padding: "40px 10px",
};

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
};

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
