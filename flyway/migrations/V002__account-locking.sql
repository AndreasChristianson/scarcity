alter table scarcity_users
  add column stamp timestamp with time zone default (now()) not null,
  add column locked boolean default false not null,
  add column expired_password boolean default false not null;