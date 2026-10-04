create extension if not exists pgcrypto;
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  published_at timestamptz not null default now(),
  category text not null,
  status text not null default 'Draft' check (status in ('Published', 'Draft')),
  excerpt text,
  content text not null,
  image_url text,
  meta_title text,
  meta_description text,
  read_time text default '5 min',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.blog_posts enable row level security;
drop policy if exists "Public can read published posts" on public.blog_posts;
create policy "Public can read published posts" on public.blog_posts for select to anon using (status = 'Published');
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
drop trigger if exists set_blog_posts_updated_at on public.blog_posts;
create trigger set_blog_posts_updated_at before update on public.blog_posts for each row execute function public.set_updated_at();

-- Apply to an existing blog_posts table after taking a backup.
-- Existing rows remain unapproved until reviewed and completed.
alter table public.blog_posts add column if not exists slug text;
alter table public.blog_posts add column if not exists author text;
alter table public.blog_posts add column if not exists approved boolean not null default false;
alter table public.blog_posts add column if not exists image_alt text;
alter table public.blog_posts add column if not exists share_image_url text;
create unique index if not exists blog_posts_slug_unique on public.blog_posts(slug);
alter table public.blog_posts drop constraint if exists blog_posts_published_fields;
alter table public.blog_posts add constraint blog_posts_published_fields check (
  not approved or status <> 'Published' or (
    slug is not null and slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and
    author is not null and length(trim(author)) > 0 and length(trim(title)) > 0 and length(trim(content)) > 0 and
    meta_description is not null and length(trim(meta_description)) > 0 and
    image_url is not null and image_url ~ '^https://' and image_alt is not null and length(trim(image_alt)) > 0
  )
);
drop policy if exists "Public can read published posts" on public.blog_posts;
create policy "Public can read published posts" on public.blog_posts for select to anon
using (status = 'Published' and approved = true and published_at <= now());
-- Browser writes remain unavailable. Publish/unpublish changes require a site rebuild.

