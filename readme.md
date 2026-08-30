## Implementing Resend with Next.js

This projects guides on how to test the email deliverability via API route using Next.js and Resend, including an attachment file and a link.

## 1. Get an API key

1. Sign up at [resend.com](https://resend.com).
2. Go to **API Keys -> Create API Key** and copy it.


## 2. Verify a Domain

Without a verified domain, you can only send from `onboarding@resend.dev`, and it only delivers to the email address you signed up with. 
Check [this guide](https://resend.com/docs/add-a-domain) to send from your own address and to any recipient.


## 3. Set up the project

Define your environment variable:

```bash
cp .env.example .env
```

Add your key to `.env`:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
```

Install dependencies:

```bash
npm install
# or
yarn
```

Install Resend Node.JS SDK:
```bash
npm install resend
```

Run Next.js locally:

```bash
npm run dev
```

## 4. Create your Attachment(s)
Create the attachment file(s) that you will use in this sample and place them accordingly. In the next steps, the directory used to host the files will be used.

## 5. Create your Email Template

Create your email-template file on `components/email-template.tsx` and update the email's body as you wish:

```tsx
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
    <p>Create your email description</p>
    <p>Please review your payment method in the Billing Page to avoid service interruption.</p>
    <p>
      This is a link placement example:{" "}
      <a href={repoUrl}>{repoUrl}</a>
    </p>
  </div>
);

export default EmailTemplate;
```

## 6. Send email using React
Create a route file under `app/api/send/route.tsx`. In this file, ensure to update the correct filename and directory for the attachment. Also, "from", "to", subject", "firstname" and "repoURL" need attention.

```tsx
import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import fs from 'fs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Test <onboarding@resend.dev>',
      to: ['yourname@yourdomain.com'],
      subject: 'Update your subject',
      react: (
        <EmailTemplate
          firstName="Jorge"
          repoUrl="https://github.com/jorgecferreiraf/resend-takehome"
        />
      ),
      attachments: [
        {
          filename: 'submission.txt',
          content: fs.readFileSync('./submission.txt'),
        },
      ],
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
```
## 7. Test
Send a cURL request to:
`curl -X POST http://localhost:3000/api/send`
