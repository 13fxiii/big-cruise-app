create table if not exists cruise_members (
  code text primary key,
  name text not null,
  handle text not null default '',
  rank text not null default 'Big Cruiser',
  points integer not null default 0,
  level integer not null default 1,
  sits integer not null default 0,
  wins integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists cruise_crew (
  owner text not null,
  member text not null,
  added_at timestamptz not null default now(),
  primary key (owner, member)
);
