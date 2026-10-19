This project is the Syracuse University Brass Ensemble site built on Next.js.

## Master Class Registration

Master class information is available at `/concerts/america250/master-class`, the registration form is at `/concerts/america250/master-class/rsvp`, and the protected registration list remains at `/master-class/admin`.

1. Run `database/master-class-registrations.sql` in the Neon SQL Editor.
2. Add these environment variables locally and in the deployment environment:

   - `DATABASE_URL`: Neon pooled connection string
   - `MASTER_CLASS_ADMIN_PASSWORD`: password for the registration list
   - `MASTER_CLASS_ADMIN_SESSION_SECRET`: a long random value used to sign administrator sessions
   - `RESEND_API_KEY`: sending-only Resend API key for the verified `subrass.org` domain
   - `RSVP_FROM_EMAIL`: sender identity, recommended as `SU Brass Ensemble <rsvp@subrass.org>`
   - `RSVP_REPLY_TO`: monitored inbox for replies, recommended as `subrass@syr.edu`
   - `RSVP_NOTIFICATION_TO`: administrator inbox receiving new-registration alerts

Registration notifications contain no student contact information or notes. A notification failure is logged but does not cause an otherwise successful database registration to fail.

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


## Event planning and concert archives

Single concert pages and the America 250 masterclass provide Google Calendar and Apple/Outlook (.ics) actions. Naive CMS dates are interpreted in America/New_York; downloads use UTC timestamps for daylight-saving correctness. Unknown end times are omitted from ICS and represented as a zero-length event in the Google Calendar template rather than assuming a concert duration. Visitors can adjust the end time when saving.

Upcoming events show attendance/accessibility details and directions; America 250 also includes confirmed Irving Garage parking information. Past events retain their original page and CMS content and hide calendar buttons. Unknown-duration concerts become archives after the local event day; confirmed-duration events become archives after their end time. Pages update according to their existing revalidation schedule.

To publish approved archive materials, add entries to `lib/event-resources.json`, keyed by the canonical concert pathname. Each entry is an array of `{ "label": "Concert program (PDF)", "url": "/path/to/program.pdf" }` objects. Programs, photo collections, and recordings appear only when links are supplied, and only for past events. Use HTTPS or site-relative URLs; confirm rights and availability before adding materials.

Analytics events: `calendar_google`, `calendar_download`, `event_directions`, `event_parking`, and `masterclass_rsvp_success`. Event actions send only a canonical public event URL; RSVP completion sends a fixed event label after a successful server response. No form values, student details, or contact information are sent by these events. Missing or blocked analytics does not prevent the actions. Mark `masterclass_rsvp_success` as a key event in GA4 if desired.
