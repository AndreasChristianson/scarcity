create table scarcity_users (
  id integer primary key generated by default as identity,
  hash varchar(60) not null,
  name text UNIQUE not null,
  email text UNIQUE
);