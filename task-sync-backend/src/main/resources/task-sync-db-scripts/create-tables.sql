DROP TABLE IF EXISTS scheduling;
DROP TABLE IF EXISTS contract;
DROP TABLE IF EXISTS activity;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS person;
DROP TABLE IF EXISTS plan;



create table person (
    id serial primary key,
    cpf character varying(14) not null unique,
    name character varying(200) not null,
    address character varying(400) not null,
    phone character varying(14) not null
);

create table plan(
    id serial primary key,
    name_plan character varying(20) not null check (name_plan in ('Basic', 'Plus', 'Executive')) default 'Basic',
    price double precision not null,
    start_time_plan timestamp without time zone not null,
    end_time_plan timestamp without time zone not null,
    num_adm integer not null,
    num_colab integer not null
);

create table "user" (
    id serial primary key,
    email character varying(200) not null unique,
    password character varying(500) not null,
    access_type character varying(50) not null check (access_type in('Administrador','Colaborador')) default 'Colaborador',
    person_id integer not null unique references person(id) on update cascade on delete cascade,
    plan_id integer unique references plan(id) on update cascade on delete cascade
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
    taskname character varying(200) not null unique
);

create table activity (
    id serial primary key,
    value numeric(1000, 2) not null,
    event_id integer not null references event(id) on update cascade on delete cascade,
    task_id integer not null references task(id) on update cascade on delete cascade

);

create table contract (
    id serial primary key,

    signature_date timestamp without time zone not null,
    user_id integer not null references "user"(id) on update cascade on delete cascade,
    event_id integer not null references event(id) on update cascade on delete cascade,
    unique (user_id, event_id)

);

create table scheduling (
    id serial primary key,
    start_time time not null,
    end_time time not null,
    date timestamp without time zone not null,
    status character varying(50) not null check (status in ('Em aberto', 'Em andamento', 'Finalizada')) default 'Em aberto',
    activity_id integer not null references activity(id) on update cascade on delete cascade,
    contract_id integer not null references contract(id) on update cascade on delete cascade,
    unique (date, contract_id, activity_id)
);
