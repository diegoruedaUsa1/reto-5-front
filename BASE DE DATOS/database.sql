CREATE DATABASE IF NOT EXISTS Quadbike;

CREATE TABLE clients(
  id              bigint(255) auto_increment NOT NULL,
  name            varchar(250),
  email           varchar(45),
  password        varchar(45),
  age             int(20),
  created_at      timestamp,
  updated_at      timestamp,
  CONSTRAINT pk_clients PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE categories(
  id                            bigint(255) auto_increment NOT NULL,
  name                          varchar(45),
  description                   varchar(250),
  created_at                    datetime,
  updated_at                    datetime,
  CONSTRAINT pk_categories   PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE quadbikes(
  id                            bigint(255) auto_increment NOT NULL,
  brand                         varchar(45),
  name                          varchar(45),
  age                           datetime,
  description                   varchar(250),
  id_category                   int(45),
  created_at                    datetime,
  updated_at                    datetime,
  CONSTRAINT pk_quadbikes       PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE messages(
  id                            bigint(255) auto_increment NOT NULL,
  messagetext                   varchar(250),
  id_quadbike                   int(255),
  created_at                    datetime,
  updated_at                    datetime,
  CONSTRAINT pk_messages       PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE bookings(
  id                            bigint(255) auto_increment NOT NULL,
  id_quadbike                   int(255),
  id_client                     int(255),
  start_date                    date,
  deliver_date                  date,
  created_at                    datetime,
  updated_at                    datetime,
  CONSTRAINT pk_bookings       PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE ratings(
  id                            bigint(255) auto_increment NOT NULL,
  message                       text(250),
  rating                        int(1),
  id_booking                    int(255),
  created_at                    datetime,
  updated_at                    datetime,
  CONSTRAINT pk_ratings       PRIMARY KEY(id)
)ENGINE=InnoDb;

CREATE TABLE admin_users(
  id              bigint(255) auto_increment NOT NULL,
  name            varchar(250),
  email           varchar(45),
  password        varchar(45),
  created_at      timestamp,
  updated_at      timestamp,
  CONSTRAINT pk_admin_users PRIMARY KEY(id)
)ENGINE=InnoDb;
