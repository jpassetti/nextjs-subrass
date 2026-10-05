import Link from "next/link";
import { redirect } from "next/navigation";

import Heading from "../../../components/heading";
import Layout from "../../../components/layout";
import Section from "../../../components/section";
import { isAdminAuthenticated } from "../../../lib/admin-auth";
import {
 buildMasterClassRegistrationWhere,
 getMasterClassRegistrationOrder,
 hasActiveMasterClassFilters,
 masterClassFiltersToSearchParams,
 parseMasterClassAdminFilters,
} from "../../../lib/master-class-admin.mjs";
import { getDatabase } from "../../../lib/neon";
import styles from "../master-class.module.scss";

export const dynamic = "force-dynamic";
export const metadata = { title: "Master Class Registrations", robots: { index: false, follow: false } };

const dateTimeFormatter = new Intl.DateTimeFormat("en-US", {
 month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
 timeZone: "America/New_York", timeZoneName: "short",
});

function countValue(rows) {
 return Number(rows?.[0]?.count || 0);
}

function display(value) {
 return value == null || value === "" ? "—" : String(value);
}

export default async function MasterClassAdminPage({ searchParams }) {
 if (!(await isAdminAuthenticated())) redirect("/master-class/admin/login");

 const filters = parseMasterClassAdminFilters(await searchParams);
 const where = buildMasterClassRegistrationWhere(filters);
 const orderBy = getMasterClassRegistrationOrder(filters);
 const offset = (filters.page - 1) * filters.pageSize;
 const sql = getDatabase();
 const [rows, matchingRows, totalRows, instrumentRows] = await Promise.all([
  sql.query(`select * from master_class_registrations ${where.clause} order by ${orderBy} limit $8 offset $9`, [...where.values, filters.pageSize, offset]),
  sql.query(`select count(*)::int as count from master_class_registrations ${where.clause}`, where.values),
  sql.query("select count(*)::int as count from master_class_registrations"),
  sql.query("select distinct instrument from master_class_registrations where instrument is not null and instrument <> '' order by instrument"),
 ]);

 const matchingCount = countValue(matchingRows);
 const totalCount = countValue(totalRows);
 const totalPages = Math.max(1, Math.ceil(matchingCount / filters.pageSize));
 if (filters.page > totalPages) {
  const corrected = masterClassFiltersToSearchParams(filters, { page: totalPages });
  redirect(`/master-class/admin${corrected.size ? `?${corrected}` : ""}`);
 }

 const makeHref = (overrides = {}) => {
  const params = masterClassFiltersToSearchParams(filters, overrides);
  return `/master-class/admin${params.size ? `?${params}` : ""}`;
 };
 const exportParams = masterClassFiltersToSearchParams(filters, { page: 1, pageSize: 25 });
 const exportHref = `/api/master-class/admin/export${exportParams.size ? `?${exportParams}` : ""}`;
 const firstResult = matchingCount === 0 ? 0 : offset + 1;
 const lastResult = Math.min(offset + rows.length, matchingCount);
 const activeFilters = hasActiveMasterClassFilters(filters);

 return (
  <Layout><Section><div className={styles.adminContent}>
   <div className={styles.adminHeader}>
    <div>
     <p className={styles.adminEyebrow}>America 250 · Student master class</p>
     <Heading level={1} marginTop="1" marginBottom="1">Registration Admin</Heading>
     <p className={styles.adminSubhead}>Search, organize, and export student registrations.</p>
    </div>
    <div className={styles.adminActions}>
     <Link className={styles.button} href="/master-class/admin/registrations/new">Add registration</Link>
     <a className={styles.linkButton} href={exportHref}>Download {activeFilters ? "filtered " : ""}CSV</a>
     <form action="/api/master-class/admin/logout" method="post"><button className={styles.secondaryButton}>Sign out</button></form>
    </div>
   </div>

   <div className={styles.summaryGrid} aria-label="Registration summary">
    <div><span>Total registrations</span><strong>{totalCount}</strong></div>
    <div><span>Matching results</span><strong>{matchingCount}</strong></div>
    <div><span>Current page</span><strong>{filters.page} <small>of {totalPages}</small></strong></div>
   </div>

   <form className={styles.filterPanel} action="/master-class/admin" method="get">
    <div className={styles.searchField}><label htmlFor="admin-search">Search registrations</label><input id="admin-search" name="q" type="search" defaultValue={filters.q} placeholder="Student, school, instructor, email, instrument…" /></div>
    <div className={styles.compactField}><label htmlFor="admin-grade">Grade</label><select id="admin-grade" name="grade" defaultValue={filters.grade}><option value="">All grades</option>{[9, 10, 11, 12].map((grade) => <option key={grade} value={grade}>Grade {grade}</option>)}</select></div>
    <div className={styles.compactField}><label htmlFor="admin-instrument">Instrument</label><select id="admin-instrument" name="instrument" defaultValue={filters.instrument}><option value="">All instruments</option>{instrumentRows.map((row) => <option key={String(row.instrument)} value={String(row.instrument)}>{String(row.instrument)}</option>)}</select></div>
    <div className={styles.compactField}><label htmlFor="admin-from">Submitted from</label><input id="admin-from" name="from" type="date" defaultValue={filters.from} /></div>
    <div className={styles.compactField}><label htmlFor="admin-to">Submitted through</label><input id="admin-to" name="to" type="date" defaultValue={filters.to} /></div>
    <div className={styles.compactField}><label htmlFor="admin-status">Status</label><select id="admin-status" name="status" defaultValue={filters.status}><option value="active">Active</option><option value="archived">Archived</option><option value="all">All records</option></select></div>
    <div className={styles.compactField}><label htmlFor="admin-sort">Sort by</label><select id="admin-sort" name="sort" defaultValue={filters.sort}><option value="submitted">Submitted date</option><option value="student">Student name</option><option value="school">School</option><option value="instructor">Instructor</option><option value="instrument">Instrument</option><option value="grade">Grade</option></select></div>
    <div className={styles.compactField}><label htmlFor="admin-direction">Order</label><select id="admin-direction" name="direction" defaultValue={filters.direction}><option value="desc">Descending</option><option value="asc">Ascending</option></select></div>
    <div className={styles.compactField}><label htmlFor="admin-page-size">Rows per page</label><select id="admin-page-size" name="pageSize" defaultValue={filters.pageSize}>{[25, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}</select></div>
    <div className={styles.filterActions}><button className={styles.button} type="submit">Apply filters</button>{activeFilters ? <Link className={styles.clearButton} href="/master-class/admin">Clear all</Link> : null}</div>
   </form>

   <div className={styles.resultsHeader}><p>{matchingCount ? `Showing ${firstResult}–${lastResult} of ${matchingCount}` : "No registrations match these filters."}</p>{activeFilters ? <span>Filtered view</span> : null}</div>

   {rows.length ? <>
    <div className={styles.desktopTableWrap}><table className={styles.adminTable}>
     <caption className={styles.srOnly}>Master class registration results</caption>
     <thead><tr><th>Submitted</th><th>Student</th><th>School and instructor</th><th>Notes</th></tr></thead>
     <tbody>{rows.map((row) => <tr key={String(row.id)}>
      <td><time dateTime={new Date(String(row.created_at)).toISOString()}>{dateTimeFormatter.format(new Date(String(row.created_at)))}</time></td>
      <td><strong className={styles.personName}>{display(row.first_name)} {display(row.last_name)}</strong><div className={styles.badges}><span>Grade {display(row.grade_level)}</span><span>{display(row.instrument)}</span>{row.deleted_at ? <span className={styles.archivedBadge}>Archived</span> : null}</div><a href={`mailto:${row.email}`}>{display(row.email)}</a>{row.phone ? <a href={`tel:${row.phone}`}>{String(row.phone)}</a> : null}<Link className={styles.rowAction} href={`/master-class/admin/registrations/${row.id}`}>View and edit</Link></td>
      <td><strong>{display(row.school)}</strong><span className={styles.detailLabel}>Music instructor</span><span>{display(row.teacher_name)}</span>{row.teacher_email ? <a href={`mailto:${row.teacher_email}`}>{String(row.teacher_email)}</a> : null}{row.teacher_phone ? <a href={`tel:${row.teacher_phone}`}>{String(row.teacher_phone)}</a> : null}</td>
      <td className={styles.notesCell}>{display(row.notes)}</td>
     </tr>)}</tbody>
    </table></div>

    <div className={styles.registrationCards}>{rows.map((row) => <article className={styles.registrationCard} key={String(row.id)}>
     <div className={styles.cardHeader}><div><strong className={styles.personName}>{display(row.first_name)} {display(row.last_name)}</strong><div className={styles.badges}><span>Grade {display(row.grade_level)}</span><span>{display(row.instrument)}</span>{row.deleted_at ? <span className={styles.archivedBadge}>Archived</span> : null}</div></div><time dateTime={new Date(String(row.created_at)).toISOString()}>{dateTimeFormatter.format(new Date(String(row.created_at)))}</time></div>
     <dl>
      <div><dt>Student contact</dt><dd><a href={`mailto:${row.email}`}>{display(row.email)}</a>{row.phone ? <><br /><a href={`tel:${row.phone}`}>{String(row.phone)}</a></> : null}</dd></div>
      <div><dt>School</dt><dd>{display(row.school)}</dd></div>
      <div><dt>Music instructor</dt><dd>{display(row.teacher_name)}{row.teacher_email ? <><br /><a href={`mailto:${row.teacher_email}`}>{String(row.teacher_email)}</a></> : null}{row.teacher_phone ? <><br /><a href={`tel:${row.teacher_phone}`}>{String(row.teacher_phone)}</a></> : null}</dd></div>
      <div><dt>Notes</dt><dd>{display(row.notes)}</dd></div>
     </dl>
     <Link className={styles.rowAction} href={`/master-class/admin/registrations/${row.id}`}>View and edit registration</Link>
    </article>)}</div>
   </> : <div className={styles.emptyState}><strong>No registrations found</strong><p>Try broadening your search or clearing the active filters.</p></div>}

   {matchingCount ? <nav className={styles.pagination} aria-label="Registration results pages">
    <Link className={filters.page <= 1 ? styles.disabledPageLink : styles.pageLink} href={filters.page <= 1 ? makeHref({ page: 1 }) : makeHref({ page: filters.page - 1 })} aria-disabled={filters.page <= 1}>Previous</Link>
    <span>Page {filters.page} of {totalPages}</span>
    <Link className={filters.page >= totalPages ? styles.disabledPageLink : styles.pageLink} href={filters.page >= totalPages ? makeHref({ page: totalPages }) : makeHref({ page: filters.page + 1 })} aria-disabled={filters.page >= totalPages}>Next</Link>
   </nav> : null}
  </div></Section></Layout>
 );
}
