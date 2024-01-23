import {
  Body,
  Container,
  Column,
  Button,
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

interface ConfirmEmailProps {
  id?: string;
}

const baseUrl = `https://www.platospeach.com/`;

export const Email = ({
  id
}: ConfirmEmailProps) => (
  <Html>
    <Head />
    <Preview>You just made a smart move.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to Plato's Peach</Heading>

        <Section>
          <Row>
            <Text style={heroText}>
              Congratulations! You're joining over 12,000 Educators who use Plato's Peach content to create and share lesson plans.
            </Text>

            <Text style={heroText}>Here's how to get started:</Text>
          </Row>
        </Section>

        <ul>
          <li style={{ fontSize: 20, marginBottom: 15 }} key={2}>
            <strong>Bookmark content from catalog.</strong> Find the subjects and content you want to include in your lesson plans.{" "}
            <Link href="https://www.platospeach.com/catalog/" style={{ color: "#3a70cd" }}>See the video lesson catalog</Link>.
          </li>
          <li style={{ fontSize: 20, marginBottom: 15 }} key={1}>
            <strong>Create your first lesson plan.</strong>{" "}
            <Link href="https://www.platospeach.com/playlist/create" style={{ color: "#3a70cd" }}>Build a custom plan</Link>, or choose from a template in the gallery.
          </li>
          <li style={{ fontSize: 20, marginBottom: 15 }} key={3}>
            <strong>Share with Google Classroom.</strong> Check out some example lesson plans: <Link style={{ color: "#3a70cd" }} href={`${baseUrl}plans/civil-rights-movement`}>Civil Rights Movement</Link>, <Link style={{ color: "#3a70cd" }} href={`${baseUrl}plans/patrick-henry`}>Patrick Henry</Link>, <Link style={{ color: "#3a70cd" }} href={`${baseUrl}plans/new-deal`}>The New Deal</Link>.
          </li>
          <li style={{ fontSize: 20, marginBottom: 25 }} key={4}>
            <strong>Use the AI Quiz Generator.</strong> Reduce the amount of time needed to create lesson plans with our
            <Link style={{ color: "#3a70cd" }} href={`${baseUrl}quiz/create/`}> quiz generator tool here</Link>!
          </li>
        </ul>

        <Section>
          <Button style={welcomeButton} href={`${baseUrl}user/${id}`}>
            Go to your dashboard
          </Button>
        </Section>

        <Text style={text}>
          If you didn't sign up for Plato's Peach, please contact us <Link style={{ color: "#3a70cd" }} href={`${baseUrl}contact`}>here</Link>
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
          <Text style={footerText}>
            ©2024 Page Two Productions, LLC. <br />
            1757 Playa Vista, San Marcos, CA 92078, USA <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default Email;

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

const welcomeButton = {
  backgroundColor: "#3a70cd",
  borderRadius: "4px",
  color: "#ffffff",
  padding: "15px 30px",
  fontSize: 20,
}

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

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
};
