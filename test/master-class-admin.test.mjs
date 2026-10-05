import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
 buildMasterClassRegistrationWhere,
 getMasterClassRegistrationOrder,
 hasActiveMasterClassFilters,
 masterClassFiltersToSearchParams,
 parseMasterClassAdminFilters,
} from "../lib/master-class-admin.mjs";

test("normalizes admin filters and applies safe defaults", () => {
 const filters = parseMasterClassAdminFilters(new URLSearchParams("page=-2&pageSize=999&grade=Adult&sort=drop-table&direction=sideways"));
 assert.deepEqual(filters, {
  q: "", grade: "", instrument: "", from: "", to: "", status: "active",
  sort: "submitted", direction: "desc", page: 1, pageSize: 25,
 });
});

test("accepts supported search, filter, sorting, and pagination values", () => {
 const filters = parseMasterClassAdminFilters(new URLSearchParams("q=Jordan&grade=10&instrument=Trumpet&from=2026-10-01&to=2026-11-30&sort=student&direction=asc&page=3&pageSize=50"));
 assert.equal(filters.q, "Jordan");
 assert.equal(filters.grade, "10");
 assert.equal(filters.instrument, "Trumpet");
 assert.equal(filters.from, "2026-10-01");
 assert.equal(filters.to, "2026-11-30");
 assert.equal(filters.status, "active");
 assert.equal(filters.sort, "student");
 assert.equal(filters.direction, "asc");
 assert.equal(filters.page, 3);
 assert.equal(filters.pageSize, 50);
 assert.equal(hasActiveMasterClassFilters(filters), true);
});

test("keeps user input in parameter values rather than SQL", () => {
 const filters = parseMasterClassAdminFilters(new URLSearchParams("q=%27%3Bdrop+table+registrations%3B--&instrument=Trumpet"));
 const where = buildMasterClassRegistrationWhere(filters);
 assert.doesNotMatch(where.clause, /drop table/i);
 assert.match(where.values[0], /drop table/i);
 assert.equal(where.values[3], "Trumpet");
});

test("escapes SQL LIKE wildcard characters in search text", () => {
 const filters = parseMasterClassAdminFilters(new URLSearchParams("q=100%25_brass"));
 const where = buildMasterClassRegistrationWhere(filters);
 assert.equal(where.values[1], "%100\\%\\_brass%");
});

test("sorting is restricted to allowlisted SQL fragments", () => {
 assert.equal(getMasterClassRegistrationOrder(parseMasterClassAdminFilters(new URLSearchParams("sort=school&direction=asc"))), "lower(school) asc, id asc");
 assert.equal(getMasterClassRegistrationOrder(parseMasterClassAdminFilters(new URLSearchParams("sort=created_at;drop table&direction=asc"))), "created_at asc, id asc");
});

test("serializes shareable filter state and supports page overrides", () => {
 const filters = parseMasterClassAdminFilters(new URLSearchParams("q=Jordan&grade=10&page=4&pageSize=50"));
 const params = masterClassFiltersToSearchParams(filters, { page: 2 });
 assert.equal(params.get("q"), "Jordan");
 assert.equal(params.get("grade"), "10");
 assert.equal(params.get("page"), "2");
 assert.equal(params.get("pageSize"), "50");
});

test("database schema indexes scalable admin search and sorting fields", () => {
 const schema = readFileSync(new URL("../database/master-class-registrations.sql", import.meta.url), "utf8");
 assert.match(schema, /create extension if not exists pg_trgm/);
 assert.match(schema, /master_class_registrations_search_idx/);
 assert.match(schema, /master_class_registrations_student_name_idx/);
 assert.match(schema, /master_class_registrations_instrument_idx/);
 assert.match(schema, /master_class_registrations_grade_idx/);
});
