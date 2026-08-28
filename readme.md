# Billing Failure Email — Next.js + Resend

This project is based on Resend's official
[Next.js (App Router) example](https://github.com/resend/resend-nextjs-app-router-example)
(now folded into the
[resend-examples](https://github.com/resend/resend-examples/tree/main/nextjs-resend-examples)
monorepo), customized to send a "payment failed" transactional email.

## Prerequisites

- A [Resend](https://resend.com) account
- A Resend **API key**
- A **verified domain** (optional for local testing — see below)

## 1. Get an API key

1. Sign up at [resend.com](https://resend.com).
2. Go to **API Keys → Create API Key** and copy it.

## 2. Verify a domain (optional)

Without a verified domain, you can only send from `onboarding@resend.dev`,
and it only delivers to the email address you signed up with. To send from
your own address and to any recipient:

1. Go to **Domains → Add Domain** in the dashboard.
2. Add the SPF/DKIM records it gives you to your DNS provider.
3. Click **Verify** once the records propagate.

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

Run Next.js locally:

```bash
npm run dev
```

Make a curl request:

```bash
curl -X POST http://localhost:3000/api/send
```

## How it works

**Step 1 — the email template**, as a plain React component
(`components/email-template.tsx`):

```tsx
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
```

**Step 2 — the API route** that renders it and calls Resend
(`app/api/send/route.tsx`):

```tsx
import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Test <onboarding@resend.dev>',
      to: ['recipient@example.com'],
      subject: 'Failed payment',
      react: <EmailTemplate firstName="Jorge" />,
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

`resend.emails.send()` takes the component directly via `react` — Resend
renders it to email-safe HTML, no separate build step needed. It returns
`{ data, error }` rather than throwing, so always check `error` even inside
a try/catch.

In production, this route would be called from wherever your payment
provider reports a failed charge (e.g. a Stripe `invoice.payment_failed`
webhook), with the real customer's name and email in place of the hardcoded
values above.

## Good to know

- **Rate limit:** 10 requests per second per account by default; exceeding
  it returns a `429`.
- **Idempotency:** for retries (e.g. inside a webhook handler), pass an
  `idempotencyKey` so a retried request doesn't send the email twice:
  ```tsx
  await resend.emails.send({
    // ...
    idempotencyKey: 'invoice-failed/12345',
  });
  ```
- **Required fields:** `from`, `to`, `subject`, and at least one of
  `html` / `text` / `react`.
- **Test addresses:** `delivered@resend.dev`, `bounced@resend.dev`,
  `complained@resend.dev` simulate those outcomes without needing a real
  inbox — useful for testing error handling.
- Don't use `onboarding@resend.dev` as `from` in production — verify your
  own domain first.

## Deploying

Any Next.js host works (e.g. [Vercel](https://vercel.com/new)). Set
`RESEND_API_KEY` as an environment variable on the host — `.env` files
aren't deployed with your code.

## License

MIT License
