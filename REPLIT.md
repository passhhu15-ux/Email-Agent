# Run on Replit

This project is configured for Replit. It runs as a Next.js web server on port `3000` and listens to `0.0.0.0`, which lets Replit expose the preview publicly.

## Import and run

1. Push this project to GitHub.
2. In Replit, select **Create Repl → Import from GitHub** and choose the repository.
3. Replit reads `.replit`, installs the Node.js 20 environment, and uses this development command:

   ```bash
   npm run dev -- --hostname 0.0.0.0 --port 3000
   ```

4. Add the required secrets in Replit's **Secrets** tool. Do not put them in source code or `.replit`.
5. Click **Run** and open the web preview.

## Deploy on Replit

Choose **Deployments → Autoscale**. The included deployment configuration runs the Next.js build and start commands. Add the same secrets to the Deployment environment before publishing.

## Gmail note

Gmail SMTP is suitable only for small, manually reviewed batches. For a more reliable production deployment, use Resend, Postmark, or Amazon SES with a domain you control and appropriate SPF/DKIM/DMARC records.
