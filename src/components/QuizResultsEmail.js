import * as React from "react";
import {
  Html,
  Head,
  Text,
  Section,
  Container,
  Button,
} from "@react-email/components";

export default function QuizResultsEmail({
  name,
  email,
  company,
  score,
  gaps,
  totalHoursWasted,
}) {
  return (
    <Html lang="en">
      <Head />
      <body
        style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f6f6" }}
      >
        <Container
          style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
        >
          <Section
            style={{
              backgroundColor: "#0F172A",
              padding: "40px",
              borderRadius: "8px",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              New Quiz Lead from Sing Singh
            </Text>
          </Section>
          <Section style={{ padding: "20px 0" }}>
            <Text style={{ color: "#333", fontSize: "16px" }}>
              Name: {name}
            </Text>
            <Text style={{ color: "#333", fontSize: "16px" }}>
              Email: {email}
            </Text>
            <Text style={{ color: "#333", fontSize: "16px" }}>
              Company: {company}
            </Text>
            <Text style={{ color: "#333", fontSize: "16px" }}>
              AI Readiness Score: {score}%
            </Text>
            <Text style={{ color: "#333", fontSize: "16px" }}>
              Hours Wasted/Week: {totalHoursWasted}
            </Text>
            {gaps && gaps.length > 0 && (
              <Text style={{ color: "#333", fontSize: "16px" }}>
                Top Gaps:{" "}
                {gaps
                  .map((gap) => `${gap.solution.name} (${gap.severity})`)
                  .join(", ")}
              </Text>
            )}
          </Section>
          <Section style={{ textAlign: "center" }}>
            <Button
              href={`mailto:${email}?subject=Follow up on your AI assessment`}
              style={{
                backgroundColor: "#0EA5E9",
                color: "#FFFFFF",
                padding: "12px 24px",
                textDecoration: "none",
                borderRadius: "4px",
              }}
            >
              Contact Lead
            </Button>
          </Section>
        </Container>
      </body>
    </Html>
  );
}
