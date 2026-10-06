const SORT_COLUMNS = {
 submitted: "created_at",
 student: "lower(last_name), lower(first_name)",
 school: "lower(school)",
 instructor: "lower(teacher_name)",
 instrument: "lower(instrument)",
 grade: "grade_level",
};

const PAGE_SIZES = new Set([25, 50, 100]);
const GRADES = new Set(["9", "10", "11", "12"]);
const STATUSES = new Set(["active", "archived", "all"]);

function value(input, key) {
 const raw = typeof input?.get === "function" ? input.get(key) : input?.[key];
 return Array.isArray(raw) ? raw[0] : raw;
}

function text(input, key, maxLength = 100) {
 const raw = value(input, key);
 return typeof raw === "string" ? raw.trim().slice(0, maxLength) : "";
}

function validDate(input) {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(input)) return "";
 const date = new Date(`${input}T00:00:00Z`);
 return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== input ? "" : input;
}

function positiveInteger(input, fallback) {
 const parsed = Number.parseInt(input, 10);
 return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function parseMasterClassAdminFilters(input = {}) {
 const grade = text(input, "grade", 2);
 const requestedPageSize = positiveInteger(text(input, "pageSize", 3), 25);
 const requestedSort = text(input, "sort", 20);
 const requestedDirection = text(input, "direction", 4);
 const requestedStatus = text(input, "status", 10);

 return {
  q: text(input, "q", 120),
  grade: GRADES.has(grade) ? grade : "",
  instrument: text(input, "instrument", 80),
  from: validDate(text(input, "from", 10)),
  to: validDate(text(input, "to", 10)),
  status: STATUSES.has(requestedStatus) ? requestedStatus : "active",
  sort: Object.hasOwn(SORT_COLUMNS, requestedSort) ? requestedSort : "submitted",
  direction: requestedDirection === "asc" ? "asc" : "desc",
  page: positiveInteger(text(input, "page", 8), 1),
  pageSize: PAGE_SIZES.has(requestedPageSize) ? requestedPageSize : 25,
 };
}

function escapeLike(input) {
 return input.replaceAll("\\", "\\\\").replaceAll("%", "\\%").replaceAll("_", "\\_");
}

export function buildMasterClassRegistrationWhere(filters) {
 return {
  clause: `where
   ($1 = '' or (coalesce(first_name, '') || ' ' || coalesce(last_name, '') || ' ' || coalesce(school, '') || ' ' || coalesce(parent_name, '') || ' ' || coalesce(parent_email, '') || ' ' || coalesce(parent_phone, '') || ' ' || coalesce(teacher_name, '') || ' ' || coalesce(email, '') || ' ' || coalesce(teacher_email, '') || ' ' || coalesce(instrument, '') || ' ' || coalesce(notes, '')) ilike $2 escape '\\')
   and ($3 = '' or grade_level = $3)
   and ($4 = '' or instrument = $4)
   and ($5 = '' or created_at >= nullif($5, '')::date)
   and ($6 = '' or created_at < nullif($6, '')::date + interval '1 day')
   and ($7 = 'all' or ($7 = 'archived' and deleted_at is not null) or ($7 = 'active' and deleted_at is null))`,
  values: [filters.q, `%${escapeLike(filters.q)}%`, filters.grade, filters.instrument, filters.from, filters.to, filters.status],
 };
}

export function getMasterClassRegistrationOrder(filters) {
 const column = SORT_COLUMNS[filters.sort] || SORT_COLUMNS.submitted;
 const direction = filters.direction === "asc" ? "asc" : "desc";
 return `${column} ${direction}, id ${direction}`;
}

export function masterClassFiltersToSearchParams(filters, overrides = {}) {
 const merged = { ...filters, ...overrides };
 const params = new URLSearchParams();
 for (const key of ["q", "grade", "instrument", "from", "to", "status", "sort", "direction", "page", "pageSize"]) {
  const current = merged[key];
  const isDefault = (key === "sort" && current === "submitted") ||
   (key === "direction" && current === "desc") ||
   (key === "page" && current === 1) ||
   (key === "status" && current === "active") ||
   (key === "pageSize" && current === 25);
  if (current !== "" && current != null && !isDefault) params.set(key, String(current));
 }
 return params;
}

export function hasActiveMasterClassFilters(filters) {
 return Boolean(filters.q || filters.grade || filters.instrument || filters.from || filters.to || filters.status !== "active");
}
