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
  "Student masterclass 4–5 p.m.",
  "Concert 6:30–8 p.m.",
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
});

test("concert program retains both ensembles, numbered sections, and official Army link", () => {
 const page = source("app/concerts/america250/page.tsx");
 assert.match(page, /programNumber[^>]*>1</);
 assert.match(page, /programNumber[^>]*>2</);
 assert.match(page, /programNumber[^>]*>3</);
 assert.match(page, /Syracuse University Brass Ensemble/);
 assert.match(page, /10th Mountain Division Band/);
 assert.match(page, /Joint finale/);
 assert.match(page, /https:\/\/home\.army\.mil\/drum\/units-tenants\/10th-mountain-division-band/);
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
