import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import fs from 'fs';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Test <onboarding@resend.dev>',
      to: ['jorge.cferreiraf@gmail.com'],
      subject: 'TakeHome Challenge — Billing Failure Email',
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