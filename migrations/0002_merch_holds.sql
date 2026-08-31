-- Anonymous merch size-holds. No names, emails, or handles.
create table if not exists merch_holds (
  id serial primary key,
  sku text not null,
  size text not null,
  created_at timestamptz not null default now()
);
create index if not exists merch_holds_sku_size_idx on merch_holds (sku, size);
