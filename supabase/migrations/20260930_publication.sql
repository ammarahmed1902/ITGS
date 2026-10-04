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
