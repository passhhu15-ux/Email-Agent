create table if not exists public.email_sends (
  id uuid primary key default gen_random_uuid(), recipient_email text not null, recipient_name text, company text,
  subject text not null, email_body text not null, provider_message_id text not null unique, sent_at timestamptz not null default now()
);
create table if not exists public.email_queue (
  id uuid primary key default gen_random_uuid(), recipient_email text not null, recipient_name text not null, company text not null,
  subject text not null, email_body text not null, template_name text not null, verified_detail text not null,
  status text not null check (status in ('pending','sending','sent','failed','needs_review','unsubscribed')) default 'pending',
  attempts integer not null default 0, provider_message_id text, error_message text, created_at timestamptz not null default now(), sent_at timestamptz
);
create unique index if not exists email_queue_active_recipient on public.email_queue (recipient_email) where status in ('pending','sending','sent');
alter table public.email_sends enable row level security;
alter table public.email_queue enable row level security;
