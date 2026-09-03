# AI Cold Email Agent

A Next.js dashboard that imports leads, creates reviewable AI email drafts, sends explicitly approved drafts through Gmail SMTP, and logs completed sends to Supabase.

## Automated campaign upgrade

This version automatically analyzes each supplied website, selects one of Paras's approved templates, and queues only drafts that pass the factual quality gate. Leads without a usable verified detail are marked for review and are never queued. The sender queue is capped at `DAILY_SEND_LIMIT` (default: 400). It uses Resend rather than Gmail SMTP.

Set `RESEND_API_KEY`, a verified-domain `EMAIL_FROM`, `CASE_STUDY_URL` (a secure public URL to the PDF), `APP_URL`, and `CRON_SECRET`. Configure a Vercel cron to call `/api/cron/send` using `Authorization: Bearer <CRON_SECRET>`. The endpoint sends one queued email each run, so set your cron frequency in line with `SEND_INTERVAL_SECONDS` and your plan limits.

See `CAMPAIGN_TEMPLATES.md` for the approved template rules. Use only contacts you are permitted to contact and maintain the supplied unsubscribe path.

## What you need

- An OpenAI API key.
- A Gmail address with two-step verification enabled and a **new Google App Password**.
- A Supabase project.
- A Vercel account and GitHub repository.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Complete every variable in `.env.local`. Never commit this file.

## Supabase setup

In Supabase, open **SQL Editor**, paste the contents of `supabase-schema.sql`, and run it. Copy the Project URL and the `service_role` key from Supabase's API settings into `.env.local` or Vercel. The service-role key is server-only: do not use a `NEXT_PUBLIC_` name for it.

## Gmail setup

1. Enable two-step verification on the Gmail account that will send mail.
2. Create a Google App Password.
3. Put its 16 characters in `EMAIL_PASS` (without the display spaces).
4. Set `EMAIL_USER`, `EMAIL_FROM`, and `REPLY_TO_EMAIL` to an account or address Gmail permits you to send from.

If an App Password was shared anywhere public, revoke it and create a replacement before deployment.

## CSV format

The required CSV headers are `Name`, `Email`, and `Company`. Optional headers are `Website`, `LinkedIn`, and `Notes`.

```csv
Name,Email,Company,Website,LinkedIn,Notes
Ada Lovelace,ada@example.com,Analytical Engines,https://example.com,https://linkedin.com/in/example,Met at a conference
```

The application deliberately does not scrape a site or LinkedIn URL, so it never claims knowledge it has not been given. Put a truthful, relevant detail in `Notes` if you want it available to the draft generator.

## Vercel deployment

No `vercel.json` is needed for this Next.js App Router project.

1. Create a GitHub repository, then commit and push this project:

   ```bash
   git init
   git add .
   git commit -m "feat: add AI cold email agent"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

2. In Vercel, choose **Add New → Project**, import the GitHub repository, and keep the detected Next.js framework preset.
3. Under **Settings → Environment Variables**, add every variable in `.env.example`, using real values. Add them for Production, Preview, and Development as appropriate.
4. Deploy. Vercel will run `npm run build` automatically.
5. Open the deployed app. Enter the `DASHBOARD_PASSWORD` you configured before generating drafts or sending mail.

## Security and sending controls

- API keys, Gmail credentials, and Supabase service-role access remain on the server.
- The dashboard prompts for `DASHBOARD_PASSWORD`; it is required by both API routes.
- Each draft starts unapproved. It must be explicitly checked before it can be sent.
- Only successful SMTP sends are written to the `email_sends` table.

For reliable high-volume production sending, consider a transactional provider such as Resend rather than consumer Gmail SMTP. Respect applicable anti-spam and privacy laws, use accurate sender details, and send only to contacts you are permitted to email.
