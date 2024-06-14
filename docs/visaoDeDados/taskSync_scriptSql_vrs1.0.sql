drop database if exists task_sync;

create database task_sync;

create table person (
    id serial primary key,
    cpf character varying(14) not null unique,
    name character varying(200) not null,
    address character varying(400) not null
);

create table user_system (
    id serial primary key,
    login character varying(200) not null unique,
    password character varying(500) not null,
    user_system_fk1 integer not null,
    foreign key (user_system_fk1) references person(id) on delete no action
);

create table event (
    id serial primary key,
    sigla character varying(20) not null unique,
    name character varying(200) not null,
    description character varying(200) not null,
    business character varying(200) not null
);

create table administrator (
    id serial primary key,
    user_system_fk1 integer not null,
    event_fk2 integer not null,
    foreign key (user_system_fk1) references user_system(id) on delete no action,
    foreign key (event_fk2) references event(id) on delete no action,
    unique (user_system_fk1, event_fk2)
);

create table task (
    id serial primary key,
    name character varying(14) not null unique
);

create table activity (
    id serial primary key,
    value numeric(1000, 2) not null,
    task_fk1 integer not null,
    event_fk2 integer not null,
    foreign key (task_fk1) references task(id) on delete no action,
    foreign key (event_fk2) references event(id) on delete no action,
    unique (value, task_fk1, event_fk2)
);

create table scheduling (
    id serial primary key,
    start_time timestamp without time zone not null,
    end_time timestamp without time zone not null,
    date timestamp without time zone not null,
    status character varying(50) not null check (status in ('Em aberto', 'Em andamento', 'Finalizada')) default 'Em aberto',
    task_fk1 integer not null,
    foreign key (task_fk1) references task(id) on delete no action,
    unique (date, task_fk1)
);

create table contract (
    id serial primary key,
    number integer not null, 
    signature_date timestamp without time zone not null,
    user_system_fk1 integer not null,
    event_fk2 integer not null,
    scheduling_fk3 integer not null,
    foreign key (user_system_fk1) references user_system(id) on delete no action,
    foreign key (event_fk2) references event(id) on delete no action,
    foreign key (scheduling_fk3) references scheduling(id) on delete no action,
    unique (number, signature_date)
);

create table chat (
    id serial primary key,
    type character varying(14) not null,
    date_time timestamp without time zone not null,
    user_system_fk1 integer not null,
    event_fk2 integer not null,
    foreign key (user_system_fk1) references user_system(id) on delete no action,
    foreign key (event_fk2) references event(id) on delete no action,
    unique (date_time, type, user_system_fk1, event_fk2)
);

create table message (
    id serial primary key,
    date_time timestamp without time zone not null,
    text character varying(800) not null,
    user_system_fk1 integer not null,
    chat_fk2 integer not null,
    foreign key (user_system_fk1) references user_system(id) on delete no action,
    foreign key (chat_fk2) references chat(id) on delete no action,
    unique (date_time, text, chat_fk2)
);
