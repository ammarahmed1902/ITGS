create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 100),
  email text not null check (char_length(email) between 3 and 254),
  company text check (company is null or char_length(company) <= 120),
  service_interest text not null check (service_interest in (
    'Web development', 'Mobile app development', 'UI/UX design', 'Digital marketing',
    'Search engine optimization', 'Lead generation', 'E-commerce solutions',
    'Virtual assistance', 'Not sure yet', 'Something else'
  )),
  message text not null check (char_length(message) between 20 and 3000),
  source_path text not null default '/contact/' check (char_length(source_path) <= 200),
  status text not null default 'New' check (status in ('New', 'In progress', 'Closed')),
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;
revoke all on table public.contact_submissions from anon, authenticated;
grant insert on table public.contact_submissions to anon;

drop policy if exists "Public can submit contact enquiries" on public.contact_submissions;
create policy "Public can submit contact enquiries"
on public.contact_submissions for insert to anon
with check (
  status = 'New' and
  char_length(full_name) between 2 and 100 and
  char_length(email) between 3 and 254 and
  char_length(message) between 20 and 3000
);

comment on table public.contact_submissions is 'Private website enquiries. Browser roles cannot read, update or delete submissions.';
