import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
      <p>Hi {firstName},</p>
      <p>We were unable to process your latest payment.</p>
      <p>Please review your payment method in the Billing Page to avoid service interruption.</p>
    </div>
);

export default EmailTemplate;
