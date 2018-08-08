alter table scarcity_users
  add column stamp timestamp default current_timestamp not null,
  add column locked boolean default false not null,
  add column expired_password boolean default false not null;