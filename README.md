This project is the Syracuse University Brass Ensemble site built on Next.js.

## Master Class Registration

Master class information is available at `/concerts/america250/master-class`, the registration form is at `/concerts/america250/master-class/rsvp`, and the protected registration list remains at `/master-class/admin`.

1. Run `database/master-class-registrations.sql` in the Neon SQL Editor.
2. Add these environment variables locally and in the deployment environment:

   - `DATABASE_URL`: Neon pooled connection string
   - `MASTER_CLASS_ADMIN_PASSWORD`: password for the registration list
   - `MASTER_CLASS_ADMIN_SESSION_SECRET`: a long random value used to sign administrator sessions

## Quality and Health

- Run full project checks: `npm run health`
- Health includes: lint, typecheck, tests, build, SEO assertions, npm audit, dependency update audit

## SEO Validation

- Run source-level SEO assertions: `npm run seo:check`
- Generate external validation links for core pages: `npm run seo:validators`
- Generate validator links for specific pages:
	- `npm run seo:validators -- https://subrass.syr.edu/concerts/2026-27/horns-and-harmonies-concert-2`
	- `npm run seo:validators -- https://subrass.syr.edu/about/musicians/james-t-spencer`
	- `npm run seo:validators -- https://subrass.syr.edu/concerts/venues/hendricks-chapel`

### Recommended Post-Content-Update Checklist

1. Run `npm run health`.
2. Deploy or preview the changed pages.
3. Run `npm run seo:validators -- <url>` for each changed page and open:
	 - Rich Results Test
	 - Schema Markup Validator
	 - Open Graph preview
4. Confirm valid schema, correct canonical URL, and social preview image/title/description.

## CI

GitHub Actions workflow: `.github/workflows/health-seo.yml`

On pushes and pull requests, CI runs:

1. `npm ci`
2. `npm run health`
3. `npm run seo:check`
