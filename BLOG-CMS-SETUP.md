# CMS publishing

Use the authenticated Supabase dashboard; there is no public browser admin.

For a fresh database run `supabase/schema.sql`. For an existing table, review and apply `supabase/migrations/20260930_publication.sql` after backup. Existing records default to unapproved.

Published content requires a unique lowercase slug, author, complete text, category, publication date, approved status, HTTPS image, image alt text and meta description. Anonymous reads require Published + approved + publication date reached. Never use the service-role key in frontend configuration.

Configure SUPABASE_URL and SUPABASE_ANON_KEY on the build environment. Both absent gives empty Insights; one absent or malformed published data fails the build. CMS_REQUIRED=true requires a configured CMS.

Articles are statically generated for reliable initial HTML, HTTP behavior and sitemap consistency. Every content edit, publication, unpublication and scheduled release requires a new build/deployment. Configure a private deploy hook and scheduled builds with the account owner. Database unpublication alone does not remove an already deployed static snapshot. Verify removal at the public URL after deployment.

`QA_CONTENT_FILE=tests/fixtures/articles.json` may be used only in a preview test build. Production refuses this flag. Never promote a QA fixture artifact.
