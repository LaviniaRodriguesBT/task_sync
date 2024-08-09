--Inserts tabela Person
insert into person (id, cpf, name, address) values (default, '123', 'Michele F', 'rua: 1');
insert into person (id, cpf, name, address) values (default, '321', 'Lavinia B', 'rua: 2');
insert into person (id, cpf, name, address) values (default, '456', 'Lucas S', 'rua: 3');
insert into person (id, cpf, name, address) values (default, '654', 'Alan S', 'rua: 4');
insert into person (id, cpf, name, address) values (default, '789', 'Leandro L', 'rua: 5');
insert into person (id, cpf, name, address) values (default, '987', 'Bruno G', 'rua: 6');
insert into person (id, cpf, name, address) values (default, '147', 'Bruna V', 'rua: 7');
insert into person (id, cpf, name, address) values (default, '258', 'Daniele B', 'rua: 8');
insert into person (id, cpf, name, address) values (default, '369', 'Josue S', 'rua: 9');
insert into person (id, cpf, name, address) values (default, '741', 'Patricia R', 'rua: 10');

--Inserts tabela Person_phone
insert into person_phone (id, phone, person_id) values (default, '35123', 1);
insert into person_phone (id, phone, person_id) values (default, '35321', 2);
insert into person_phone (id, phone, person_id) values (default, '35456', 3);
insert into person_phone (id, phone, person_id) values (default, '35654', 4);
insert into person_phone (id, phone, person_id) values (default, '35789', 5);
insert into person_phone (id, phone, person_id) values (default, '35987', 6);
insert into person_phone (id, phone, person_id) values (default, '35147', 7);
insert into person_phone (id, phone, person_id) values (default, '35258', 8);
insert into person_phone (id, phone, person_id) values (default, '35369', 9);
insert into person_phone (id, phone, person_id) values (default, '35741', 10);

--Inserts tabela User
insert into user (id, login, password, person_id) values (default, 'michelef', '123', 1);
insert into user (id, login, password, person_id) values (default, 'laviniab', '321', 2);
insert into user (id, login, password, person_id) values (default, 'lucass', '456', 3);
insert into user (id, login, password, person_id) values (default, 'alans', '654', 4);
insert into user (id, login, password, person_id) values (default, 'leandrol', '789', 5);
insert into user (id, login, password, person_id) values (default, 'brunog', '987', 6);
insert into user (id, login, password, person_id) values (default, 'brunav', '147', 7);
insert into user (id, login, password, person_id) values (default, 'danieleb', '258', 8);
insert into user (id, login, password, person_id) values (default, 'josues', '369', 9);
insert into user (id, login, password, person_id) values (default, 'patriciar', '741', 10);

--Inserts tabela Event
insert into event (id, code, name, description, business, date) values (default, '001', 'loucuras loucuras loucuras', 'evento de loucuras', 'onlybusiness','2024-11-11');
insert into event (id, code, name, description, business, date) values (default, '002', 'loucuras de verão', 'evento de loucuras no calor','onlybusiness','2024-11-11');
insert into event (id, code, name, description, business, date) values (default, '003', 'loucuras de inverno', 'evento de loucuras no frio', 'onlybusiness','2024-11-11');
insert into event (id, code, name, description, business, date) values (default, '004', 'loucuras nas primavera', 'evento de loucuras flores nascendo', 'onlybusiness','2024-11-11');
insert into event (id, code, name, description, business, date) values (default, '005', 'loucuras de outono', 'evento de loucuras folhas caindo','onlybusiness','2024-11-11');
insert into event (id, code, name, description, business, date) values (default, '006', 'caldeirão da loucura', 'evento de loucuras sopisticas','onlybusiness','2024-11-11');
insert into event (id, code, name, description, business, date) values (default, '007', 'vish truta', 'evento de pescaria','onlybusiness','2024-11-11');
insert into event (id, code, name, description, business, date) values (default, '008', 'o que é o que é clara e salgada', 'Batalha de charadas', 'onlybusiness','2024-11-11');
insert into event (id, code, name, description, business, date) values (default, '009', 'Festa do Jalim Mahmar', 'Festa arabe', 'onlybusiness','2024-11-11');
insert into event (id, code, name, description, business, date) values (default, '010', 'Churras da Oficinal Simas Turbo', 'Encontro automobilistico','onlybusiness','2024-11-11');

--Inserts tabela Administrator
insert into administrator (id, user_id, event_id) values (default, 1, 3);
insert into administrator (id, user_id, event_id) values (default, 2, 3);
insert into administrator (id, user_id, event_id) values (default, 3, 3);
insert into administrator (id, user_id, event_id) values (default, 4, 1);
insert into administrator (id, user_id, event_id) values (default, 5, 1);
insert into administrator (id, user_id, event_id) values (default, 6, 4);
insert into administrator (id, user_id, event_id) values (default, 7, 5);
insert into administrator (id, user_id, event_id) values (default, 8, 7);
insert into administrator (id, user_id, event_id) values (default, 9, 7);
insert into administrator (id, user_id, event_id) values (default, 10, 2);

--Inserts tabela Task
insert into task (id, name) values (default, 'limpeza');
insert into task (id, name) values (default, 'transporte');
insert into task (id, name) values (default, 'caixa');
insert into task (id, name) values (default, 'seguranca');
insert into task (id, name) values (default, 'venda');
insert into task (id, name) values (default, 'garçom');
insert into task (id, name) values (default, 'repositor');
insert into task (id, name) values (default, 'coordenador');
insert into task (id, name) values (default, 'DJs');
insert into task (id, name) values (default, 'cantor');

--Inserts tabela Activity
insert into activity (id, value, event_id, task_id) values (default, 300.00, 10, 5);
insert into activity (id, value, event_id, task_id) values (default, 500.50, 9, 4);
insert into activity (id, value, event_id, task_id) values (default, 600.00, 8, 1);
insert into activity (id, value, event_id, task_id) values (default, 200.00, 7, 3);
insert into activity (id, value, event_id, task_id) values (default, 900.00, 6, 3);
insert into activity (id, value, event_id, task_id) values (default, 1000.00, 5, 9);
insert into activity (id, value, event_id, task_id) values (default, 500.00, 4, 3);
insert into activity (id, value, event_id, task_id) values (default, 600.00, 3, 1);
insert into activity (id, value, event_id, task_id) values (default, 1000.00, 2, 10);
insert into activity (id, value, event_id, task_id) values (default, 900.00, 1, 8);

--Inserts tabela Contract
insert into contract (id, number, signature_date, user_id, event_id) values (default, 100, now(), 2, 9);
insert into contract (id, number, signature_date, user_id, event_id) values (default, 200, now(), 1, 7);
insert into contract (id, number, signature_date, user_id, event_id) values (default, 300, now(), 4, 5);
insert into contract (id, number, signature_date, user_id, event_id) values (default, 400, now(), 3, 3);
insert into contract (id, number, signature_date, user_id, event_id) values (default, 500, now(), 6, 1);
insert into contract (id, number, signature_date, user_id, event_id) values (default, 600, now(), 5, 8);
insert into contract (id, number, signature_date, user_id, event_id) values (default, 700, now(), 8, 6);
insert into contract (id, number, signature_date, user_id, event_id) values (default, 800, now(), 7, 4);
insert into contract (id, number, signature_date, user_id, event_id) values (default, 900, now(), 10, 2);
insert into contract (id, number, signature_date, user_id, event_id) values (default, 1000, now(), 9, 10);


--Inserts tabela Scheduling
insert into scheduling (id, start_time, end_time, date, status, activity_id, contract_id) values ();

--Inserts tabela Chat
insert into chat (id, type, date_time, user_id, event_id) values ();

--Inserts tabela Chat_user
insert into chat_user (id, user_id, chat_id) values ();

--Inserts tabela Message
insert into message (id, date_time, textm user_id, chat_id) values ();