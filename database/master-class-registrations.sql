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
 instrument text not null,
 grade_level text,
 notes text,
 consent_to_contact boolean not null default false,
 created_at timestamptz not null default now()
);

alter table master_class_registrations
 add column if not exists teacher_email text,
 add column if not exists teacher_phone text;

create index if not exists master_class_registrations_created_at_idx
 on master_class_registrations (created_at desc);

create index if not exists master_class_registrations_email_idx
 on master_class_registrations (lower(email));
