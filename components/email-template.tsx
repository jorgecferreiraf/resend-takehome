import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  repoUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  repoUrl,
}) => (
  <div>
    <p>Hi {firstName},</p>
    <p>We were unable to process your latest payment.</p>
    <p>Please review your payment method in the Billing Page to avoid service interruption.</p>
    <p>Sincerely,</p>
    <p>Billing Team</p>
    <p>
      You can find the full project here:{" "}
      <a href={repoUrl}>{repoUrl}</a>
    </p>
  </div>
);

export default EmailTemplate;