create table password_reset_nonce (
  id integer primary key generated by default as identity,
  stamp timestamp with time zone default (now()) not null,
  user_id integer REFERENCES scarcity_users (id),
  nonce text not null
);

alter table games
  alter column created_by set not null;