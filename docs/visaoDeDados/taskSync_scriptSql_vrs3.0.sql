drop database if exists task_sync;

create database task_sync;

\c task_sync;

begin;

create table person (
    id serial primary key,
    cpf character varying(14) not null unique,
    name character varying(200) not null,
    address character varying(400) not null,
    phone character varying(14) not null
);


create table "user" (
    id serial primary key,
    login character varying(200) not null unique,
    password character varying(500) not null,
    access_type character varying(50) not null check (access_type in('Administrador','Colaborador')) default 'Colaborador',
    person_id integer not null unique references person(id) on update cascade on delete cascade
);

create table event (
    id serial primary key,
    code character varying(20) not null unique,
    name character varying(200) not null,
    description character varying(200) not null,
    business character varying(200) not null,
    date timestamp not null,
    start_time time not null,
    end_time time not null
);


create table task (
    id serial primary key,
    name character varying(200) not null unique
);

create table activity (
    id serial primary key,
    value numeric(1000, 2) not null,
    event_id integer not null references event(id) on update cascade,
    task_id integer not null references task(id) on update cascade,
    unique (event_id, task_id)
);

create table contract (
    id serial primary key,
    number integer unique not null,
    signature_date timestamp without time zone not null,
    user_id integer not null references "user"(id) on update cascade on delete cascade,
    event_id integer not null references event(id) on update cascade on delete cascade,
    unique (user_id, event_id)
);

create table scheduling (
    id serial primary key,
    start_time timestamp without time zone not null,
    end_time timestamp without time zone not null,
    date timestamp without time zone not null,
    status character varying(50) not null check (status in ('Em aberto', 'Em andamento', 'Finalizada')) default 'Em aberto',
    activity_id integer not null references activity(id) on update cascade,
    contract_id integer not null references contract(id) on update cascade on delete cascade,
    unique (date, contract_id, activity_id)
);

commit;