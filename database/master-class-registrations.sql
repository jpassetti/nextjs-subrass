create table if not exists master_class_registrations (
 id bigint generated always as identity primary key,
 first_name text not null,
 last_name text not null,
 school text not null,
 teacher_name text,
 teacher_email text,
 teacher_phone text,
 email text not null,
 phone text,
 parent_name text,
 parent_email text,
 parent_phone text,
 instrument text not null,
 grade_level text,
 notes text,
 consent_to_contact boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 deleted_at timestamptz
);

alter table master_class_registrations
 add column if not exists parent_name text,
 add column if not exists parent_email text,
 add column if not exists parent_phone text,
 add column if not exists teacher_email text,
 add column if not exists teacher_phone text,
 add column if not exists updated_at timestamptz not null default now(),
 add column if not exists deleted_at timestamptz;

create index if not exists master_class_registrations_created_at_idx
 on master_class_registrations (created_at desc);

create index if not exists master_class_registrations_email_idx
 on master_class_registrations (lower(email));

create extension if not exists pg_trgm;

drop index if exists master_class_registrations_search_idx;

create index master_class_registrations_search_idx
 on master_class_registrations using gin (
  (coalesce(first_name, '') || ' ' || coalesce(last_name, '') || ' ' || coalesce(school, '') || ' ' ||
   coalesce(parent_name, '') || ' ' || coalesce(parent_email, '') || ' ' || coalesce(parent_phone, '') || ' ' ||
   coalesce(teacher_name, '') || ' ' || coalesce(email, '') || ' ' || coalesce(teacher_email, '') || ' ' ||
   coalesce(instrument, '') || ' ' || coalesce(notes, '')) gin_trgm_ops
 );

create index if not exists master_class_registrations_student_name_idx
 on master_class_registrations (lower(last_name), lower(first_name));

create index if not exists master_class_registrations_school_idx
 on master_class_registrations (lower(school));

create index if not exists master_class_registrations_teacher_idx
 on master_class_registrations (lower(teacher_name));

create index if not exists master_class_registrations_instrument_idx
 on master_class_registrations (lower(instrument));

create index if not exists master_class_registrations_grade_idx
 on master_class_registrations (grade_level);

create index if not exists master_class_registrations_deleted_at_idx
 on master_class_registrations (deleted_at);
