import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const source = (file) => readFileSync(path.join(root, file), "utf8");

test("America 250 public routes and artwork exist", () => {
 for (const file of [
  "app/concerts/america250/page.tsx",
  "app/concerts/america250/master-class/page.tsx",
  "app/concerts/america250/master-class/rsvp/page.tsx",
  "public/america250/america250--left.jpg",
  "public/america250/america250--featured-image.jpg",
 ]) assert.equal(existsSync(path.join(root, file)), true, `${file} should exist`);
});

test("concert landing page preserves essential event facts and navigation targets", () => {
 const page = source("app/concerts/america250/page.tsx");
 for (const expected of [
  "Friday, Nov. 13, 2026",
  "Free and open to the public",
  'href="#details"',
  'href="#masterclass"',
  'href="#program"',
  'href="#parking"',
  'id="details"',
  'id="masterclass"',
  'id="program"',
  'id="parking"',
 ]) assert.match(page, new RegExp(expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
 assert.match(page, /Student masterclass <span className=\{styles\.noWrap\}>4–5 p\.m\.<\/span>/);
 assert.match(page, /Concert <span className=\{styles\.noWrap\}>6:30–8 p\.m\.<\/span>/);
});

test("full-width layout offsets row gutters to prevent mobile horizontal scrolling", () => {
 const containerStyles = source("components/container.module.scss");
 assert.match(containerStyles, /&\.full\s*\{[\s\S]*padding-left: \.5rem;[\s\S]*padding-right: \.5rem;/);
});

test("concert page provides complete event SEO and social metadata", () => {
 const page = source("app/concerts/america250/page.tsx");
 assert.match(page, /title = "America 250 Concert"/);
 assert.match(page, /keywords:\s*\[/);
 assert.match(page, /robots:\s*\{/);
 assert.match(page, /siteName: "Syracuse University Brass Ensemble"/);
 assert.match(page, /"@type": "MusicEvent"/);
 assert.match(page, /"@type": "BreadcrumbList"/);
 assert.match(page, /streetAddress: "121 Crouse Drive"/);
 assert.match(page, /mainEntityOfPage: CANONICAL_URL/);
});

test("concert sections use accessible contextual Font Awesome icons", () => {
 const page = source("app/concerts/america250/page.tsx");
 for (const icon of ["faLandmark", "faGraduationCap", "faBookOpen", "faCircleInfo"]) {
  assert.match(page, new RegExp(`icon=\\{${icon}\\} aria-hidden="true"`));
 }
 assert.match(page, /className=\{styles\.sectionHeadingIcon\}/);
});

test("concert page displays an accessible visual breadcrumb trail", () => {
 const page = source("app/concerts/america250/page.tsx");
 assert.match(page, /<nav className=\{styles\.breadcrumbs\} aria-label="Breadcrumb">/);
 assert.match(page, /icon=\{faHouse\} aria-hidden="true"/);
 assert.match(page, /<Link href="\/concerts">Concerts<\/Link>/);
 assert.match(page, /<span aria-current="page">America 250<\/span>/);
});

test("concert program retains both ensembles, numbered sections, and official Army link", () => {
 const page = source("app/concerts/america250/page.tsx");
 assert.match(page, /src="\/images\/group-photo-2022\.jpg"/);
 assert.match(page, /src="\/america250\/10th-mountain-division-band\.jpeg"/);
 assert.match(page, /programNumber[^>]*>1</);
 assert.match(page, /programNumber[^>]*>2</);
 assert.match(page, /programNumber[^>]*>3</);
 assert.match(page, /Syracuse University Brass Ensemble/);
 assert.match(page, /10th Mountain Division Band/);
 assert.match(page, /Joint finale/);
 assert.match(page, /https:\/\/home\.army\.mil\/drum\/units-tenants\/10th-mountain-division-band/);
});

test("visitor information separates admission, parking, and accommodations", () => {
 const page = source("app/concerts/america250/page.tsx");
 for (const heading of ["Admission", "Parking", "Accommodations"]) {
  assert.match(page, new RegExp(`<h3>${heading}<\\/h3>`));
 }
 assert.match(page, /Irving Garage/);
 assert.match(page, /Stadium Pl/);
 assert.match(page, /google\.com\/maps\/search/);
 assert.match(page, /target="_blank" rel="noopener noreferrer"/);
});

test("master class routes enforce high-school-only messaging and route separation", () => {
 const landing = source("app/concerts/america250/master-class/page.tsx");
 const rsvp = source("app/concerts/america250/master-class/rsvp/page.tsx");
 assert.match(landing, /Students in grades 9–12/);
 assert.match(landing, /\/concerts\/america250\/master-class\/rsvp/);
 assert.match(rsvp, /exclusively for students currently enrolled in grades 9–12/);
 assert.match(rsvp, /RegistrationForm/);
});

test("RSVP form requires student, school, grade, instrument, and instructor details", () => {
 const form = source("app/master-class/registration-form.tsx");
 for (const name of ["firstName", "lastName", "school", "gradeLevel", "email", "instrument", "teacherName", "teacherEmail"]) {
  assert.match(form, new RegExp(`name="${name}"[^>]*required|required[^>]*name="${name}"`), `${name} should be required`);
 }
 assert.match(form, />Student information</);
 assert.match(form, />Music instructor</);
 assert.doesNotMatch(form, /Grade [6-8]/);
 assert.doesNotMatch(form, />College</);
 assert.doesNotMatch(form, />Adult</);
});

test("database and admin tools retain instructor contact fields", () => {
 const schema = source("database/master-class-registrations.sql");
 const admin = source("app/master-class/admin/page.tsx");
 const route = source("app/api/master-class/register/route.ts");
 for (const column of ["teacher_name", "teacher_email", "teacher_phone"]) {
  assert.match(schema, new RegExp(column));
  assert.match(route, new RegExp(column));
 }
 assert.match(admin, /row\.teacher_email/);
 assert.match(admin, /row\.teacher_phone/);
});

test("navigation, redirects, and sitemap point to canonical America 250 routes", () => {
 const nav = source("components/nav.tsx");
 const config = source("next.config.js");
 const sitemap = source("app/sitemap.ts");
 assert.match(nav, /title: "America 250"[\s\S]*path: "\/concerts\/america250"/);
 assert.doesNotMatch(nav, /title: "Master Class"/);
 assert.match(config, /source: '\/master-class'[\s\S]*destination: '\/concerts\/america250\/master-class'/);
 assert.match(config, /celebrate-americas-250th-anniversary-concert'[\s\S]*destination: '\/concerts\/america250'/);
 assert.match(sitemap, /"\/concerts\/america250\/master-class\/rsvp"/);
});

test("Hendricks Chapel venue preserves showcase and practical visitor information", () => {
 const venue = source("app/concerts/venues/[slug]/page.tsx");
 assert.match(venue, /Hendricks Chapel at Syracuse University/);
 assert.match(venue, /Review visitor parking information/);
 assert.match(venue, /View complete accessibility details/);
 assert.match(venue, /315-443-2901/);
 assert.doesNotMatch(venue, /Explore the history of Hendricks Chapel/);
});

test("smooth section navigation respects reduced-motion preferences", () => {
 const globalStyles = source("styles/global.scss");
 const pageStyles = source("app/concerts/america250/america250.module.scss");
 assert.match(globalStyles, /scroll-behavior:\s*smooth/);
 assert.match(globalStyles, /prefers-reduced-motion:\s*reduce[\s\S]*scroll-behavior:\s*auto/);
 for (const id of ["details", "masterclass", "program", "parking"]) assert.match(pageStyles, new RegExp(`#${id}`));
});

test("master class callout heading has accessible contrast", () => {
 const landing = source("app/concerts/america250/master-class/page.tsx");
 assert.match(landing, /<Heading level=\{2\} color="white"[^>]*>Reserve Your Place<\/Heading>/);
});

test("health check blocks production vulnerabilities while reporting development advisories", () => {
 const health = source("scripts/health-check.sh");
 assert.match(health, /npm audit --omit=dev --audit-level=low/);
 assert.match(health, /run_warning_check "Development dependency advisory report"/);
});

test("registration persists before sending a non-fatal email notification", () => {
 const route = source("app/api/master-class/register/route.ts");
 const insertPosition = route.indexOf("insert into master_class_registrations");
 const notificationPosition = route.indexOf("await sendMasterClassNotification");
 assert.ok(insertPosition > -1 && notificationPosition > insertPosition);
 assert.match(route, /try \{\s*await sendMasterClassNotification[\s\S]*catch \(notificationError\)/);
 assert.match(route, /returning id/);
});

test("admin provides authenticated create, update, archive, and restore operations", () => {
 const createRoute = source("app/api/master-class/admin/registrations/route.ts");
 const recordRoute = source("app/api/master-class/admin/registrations/[id]/route.ts");
 const adminPage = source("app/master-class/admin/page.tsx");
 assert.match(createRoute, /isAdminAuthenticated/);
 assert.match(createRoute, /insert into master_class_registrations/);
 assert.match(recordRoute, /isAdminAuthenticated/);
 assert.match(recordRoute, /update master_class_registrations set first_name/);
 assert.match(recordRoute, /deleted_at = now\(\)/);
 assert.match(recordRoute, /deleted_at = null/);
 assert.match(adminPage, /Add registration/);
 assert.match(adminPage, /View and edit/);
});
