DROP TABLE IF EXISTS
  assessment, change, domain, location, mastery, member,
  offer, phase, rating, request, skill, status;

CREATE TABLE phase (
  id SERIAL PRIMARY KEY,
  description TEXT UNIQUE NOT NULL
);

CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  description TEXT UNIQUE NOT NULL
);

CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  description TEXT UNIQUE NOT NULL
);

CREATE TABLE domain (
  id SERIAL PRIMARY KEY,
  description TEXT UNIQUE NOT NULL
);

CREATE TABLE rating (
  id SERIAL PRIMARY KEY,
  description TEXT UNIQUE NOT NULL
);

CREATE TABLE skill (
  id SERIAL PRIMARY KEY,
  domain INTEGER REFERENCES domain(id) NOT NULL,
  description TEXT UNIQUE NOT NULL
);

CREATE TABLE member (
  id SERIAL PRIMARY KEY,
  fullname TEXT NOT NULL,
  handle TEXT UNIQUE NOT NULL,
  phase INTEGER REFERENCES phase(id) NOT NULL,
  status INTEGER REFERENCES status(id) NOT NULL
);

CREATE TABLE mastery (
  id SERIAL PRIMARY KEY,
  member INTEGER REFERENCES member(id) NOT NULL,
  skill INTEGER REFERENCES skill(id) NOT NULL
);

CREATE TABLE request (
  id SERIAL PRIMARY KEY,
  skill INTEGER REFERENCES skill(id) NOT NULL,
  start TIMESTAMP NOT NULL,
  member INTEGER REFERENCES member(id) NOT NULL,
  location INTEGER REFERENCES location(id) NOT NULL,
  comment TEXT
);

CREATE TABLE offer (
  id SERIAL PRIMARY KEY,
  request INTEGER REFERENCES request(id) NOT NULL,
  member INTEGER REFERENCES member(id) NOT NULL,
  start TIMESTAMP NOT NULL
);

CREATE TABLE assessment (
  id SERIAL PRIMARY KEY,
  request INTEGER REFERENCES request(id) NOT NULL,
  member INTEGER REFERENCES member(id) NOT NULL,
  rating INTEGER REFERENCES rating(id) NOT NULL,
  comment TEXT
);

CREATE TABLE change (
  id SERIAL PRIMARY KEY,
  time TIMESTAMP NOT NULL,
  member INTEGER REFERENCES member(id) NOT NULL,
  relname NAME REFERENCES pg_class(relname) NOT NULL,
  row integer NOT NULL,
  column NAME REFERENCES pg_attribute(attname) NOT NULL,
  old TEXT NOT NULL,
  new TEXT NOT NULL
);
