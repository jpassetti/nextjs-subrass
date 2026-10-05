import { readFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const checks = [
 {
  file: "app/layout.tsx",
  tests: [
   {
    name: "metadataBase configured",
    regex: /metadataBase:\s*new URL\("https:\/\/subrass\.syr\.edu"\)/,
   },
   {
    name: "Open Graph metadata configured",
    regex: /openGraph:\s*\{/,
   },
   {
    name: "Twitter metadata configured",
    regex: /twitter:\s*\{/,
   },
  ],
 },
 {
  file: "app/concerts/america250/page.tsx",
  tests: [
   { name: "America 250 page includes MusicEvent JSON-LD", regex: /"@type":\s*"MusicEvent"/ },
   { name: "America 250 page includes BreadcrumbList JSON-LD", regex: /"@type":\s*"BreadcrumbList"/ },
   { name: "America 250 page has canonical metadata", regex: /alternates:\s*\{ canonical: CANONICAL_URL \}/ },
   { name: "America 250 page has indexable robots metadata", regex: /googleBot:\s*\{ index: true, follow: true/ },
   { name: "America 250 page has social metadata", regex: /siteName:\s*"Syracuse University Brass Ensemble"/ },
  ],
 },
 {
  file: "app/concerts/[year]/[slug]/page.tsx",
  tests: [
   {
    name: "concert page includes BreadcrumbList JSON-LD",
    regex: /"@type":\s*"BreadcrumbList"/,
   },
   {
    name: "concert page generates dynamic metadata",
    regex: /generateMetadata\(/,
   },
  ],
 },
 {
  file: "app/about/musicians/[id]/page.tsx",
  tests: [
   {
    name: "musician page includes BreadcrumbList JSON-LD",
    regex: /"@type":\s*"BreadcrumbList"/,
   },
   {
    name: "musician page has canonical metadata",
    regex: /canonical:/,
   },
  ],
 },
 {
  file: "app/ensembles/[id]/page.tsx",
  tests: [
   {
    name: "ensemble page includes MusicGroup JSON-LD",
    regex: /"@type":\s*"MusicGroup"/,
   },
   {
    name: "ensemble page includes BreadcrumbList JSON-LD",
    regex: /"@type":\s*"BreadcrumbList"/,
   },
  ],
 },
 {
  file: "app/concerts/venues/[slug]/page.tsx",
  tests: [
   {
    name: "venue page includes Place JSON-LD",
    regex: /"@type":\s*"Place"/,
   },
   {
    name: "venue page includes BreadcrumbList JSON-LD",
    regex: /"@type":\s*"BreadcrumbList"/,
   },
  ],
 },
 {
  file: "components/concert.tsx",
  tests: [
   {
    name: "event JSON-LD includes stable venue @id",
    regex: /"@id":\s*venueUrl/,
   },
   {
    name: "event JSON-LD includes Offer details",
    regex: /"@type":\s*"Offer"/,
   },
  ],
 },
 {
  file: "components/musician.tsx",
  tests: [
   {
    name: "person JSON-LD includes canonical url",
    regex: /url:\s*`https:\/\/subrass\.syr\.edu\/about\/musicians\//,
   },
   {
    name: "person JSON-LD includes affiliation object",
    regex: /affiliation:\s*\{\s*"@type":\s*"MusicGroup"/s,
   },
  ],
 },
 {
  file: "app/sitemap.ts",
  tests: [
   {
    name: "sitemap includes ensembles index",
    regex: /"\/ensembles"/,
   },
   {
    name: "sitemap includes venue entries",
    regex: /venueEntries/,
   },
  ],
 },
];

const failures = [];

for (const check of checks) {
 const filePath = path.join(ROOT, check.file);
 let source = "";
 try {
  source = readFileSync(filePath, "utf8");
 } catch (error) {
  failures.push(`${check.file}: unable to read file (${error.message})`);
  continue;
 }

 for (const test of check.tests) {
  if (!test.regex.test(source)) {
   failures.push(`${check.file}: ${test.name}`);
  }
 }
}

if (failures.length > 0) {
 console.error("SEO assertions failed:");
 failures.forEach((failure) => {
  console.error(`- ${failure}`);
 });
 process.exit(1);
}

console.log("SEO assertions passed.");
