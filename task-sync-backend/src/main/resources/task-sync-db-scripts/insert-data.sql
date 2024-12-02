CREATE EXTENSION IF NOT EXISTS pgcrypto;

insert into person (id, cpf, name, address, phone)
values (default, '123', 'Michele F', 'rua: 1', '987'),
       (default, '321', 'Lavinia B', 'rua: 2', '654'),
       (default, '456', 'Lucas S', 'rua: 3', '321'),
       (default, '654', 'Alan S', 'rua: 4', '963'),
       (default, '789', 'Leandro L', 'rua: 5', '258'),
       (default, '987', 'Bruno G', 'rua: 6', '147'),
       (default, '147', 'Bruna V', 'rua: 7', '753'),
       (default, '258', 'Daniele B', 'rua: 8', '159'),
       (default, '369', 'Josue S', 'rua: 9', '456'),
       (default, '741', 'Patricia R', 'rua: 10', '888');


insert into "user" (id, email, password, access_type, person_id, role)
values (default, 'michelef@.com', crypt('123', gen_salt('bf')), 'ADMINISTRADOR', 1, 'ADMINISTRADOR'),
       (default, 'laviniabf@.com', crypt('321', gen_salt('bf')), 'COLABORADOR', 2, 'COLABORADOR'),
       (default, 'lucassf@.com', crypt('456', gen_salt('bf')), 'COLABORADOR', 3, 'COLABORADOR'),
       (default, 'alansf@.com', crypt('654', gen_salt('bf')), 'COLABORADOR', 4, 'COLABORADOR'),
       (default, 'leandrof@.com', crypt('789', gen_salt('bf')), 'MASTER', 5, 'MASTER'),
       (default, 'brunogf@.com', crypt('987', gen_salt('bf')), 'ADMINISTRADOR', 6, 'ADMINISTRADOR'),
       (default, 'brunavf@.com', crypt('147', gen_salt('bf')), 'COLABORADOR', 7, 'COLABORADOR'),
       (default, 'danielebf@.com', crypt('258', gen_salt('bf')), 'COLABORADOR', 8, 'COLABORADOR'),
       (default, 'josuesf@.com', crypt('369', gen_salt('bf')), 'ADMINISTRADOR', 9, 'ADMINISTRADOR'),
       (default, 'patriciarf@.com', crypt('741', gen_salt('bf')), 'COLABORADOR', 10, 'COLABORADOR');


insert into groups (id, user_id)
values (default, 9),
       (default, 5),
       (default, 1);


insert into usergroup(id, group_id, user_id, adm_id)
values (default, 1, 2, 9),
       (default, 1, 3, 9),
       (default, 1, 6, 9),
       (default, 1, 4, 9),
       (default, 2, 7, 5),
       (default, 2, 8, 5),
       (default, 2, 10, 5),
       (default, 1, 9, 9),
       (default, 2, 5, 5);



insert into event (id, code, name, description, business, date, start_time, end_time, adm_id)
values (default, '001', 'Reunião de Equipe', 'Discussão sobre o novo projeto', 'Desenvolvimento', '2024-05-20',
        '09:00:00', '11:00:00', 1),
       (default, '002', 'Workshop de Marketing', 'Estratégias para aumentar as vendas', 'Marketing', '2024-05-25',
        '14:00:00', '17:00:00', 5),
       (default, '003', 'Lançamento de Produto', 'Apresentação do novo produto X', 'Vendas', '2024-06-10', '10:00:00',
        '12:00:00', 9),
       (default, '004', 'Treinamento Técnico', 'Atualização sobre novas tecnologias', 'TI', '2024-06-15', '09:00:00',
        '16:00:00', 5),
       (default, '005', 'Conferência Anual', 'Discussão sobre tendências de mercado', 'Estratégia', '2024-07-05',
        '08:00:00', '18:00:00', 1),
       (default, '006', 'Feira de Emprego', 'Conectar talentos com empresas', 'Recursos Humanos', '2024-07-20',
        '10:00:00', '16:00:00', 1),
       (default, '007', 'Almoço de Equipe', 'Integração da nova equipe', 'Recursos Humanos', '2024-08-02', '12:00:00',
        '14:00:00', 5),
       (default, '008', 'Hackathon', 'Desenvolvimento de soluções inovadoras', 'Inovação', '2024-08-15', '18:00:00',
        '02:00:00', 6),
       (default, '009', 'Palestra Motivacional', 'Inspiração para a equipe', 'Desenvolvimento', '2024-09-01',
        '15:00:00', '16:00:00', 6),
       (default, '010', 'Reunião de Diretoria', 'Discussão sobre metas anuais', 'Diretoria', '2024-09-15', '10:00:00',
        '12:00:00', 1);



insert into task (id, taskname)
values (default, 'limpeza'),
       (default, 'transporte'),
       (default, 'caixa'),
       (default, 'seguranca'),
       (default, 'venda'),
       (default, 'garçom'),
       (default, 'repositor'),
       (default, 'coordenador'),
       (default, 'DJs'),
       (default, 'cantor');


insert into activity (id, value, event_id, task_id)
values (default, 300.00, 10, 5),
       (default, 500.50, 9, 4),
       (default, 600.00, 8, 1),
       (default, 200.00, 7, 3),
       (default, 900.00, 6, 3),
       (default, 1000.00, 5, 9),
       (default, 500.00, 4, 3),
       (default, 600.00, 3, 1),
       (default, 1000.00, 2, 10),
       (default, 900.00, 1, 8);



insert into contract (id, user_id, event_id)
values (default, 2, 9),
       (default, 1, 7),
       (default, 4, 5),
       (default, 3, 3),
       (default, 5, 8),
       (default, 8, 6),
       (default, 7, 4),
       (default, 10, 2),
       (default, 9, 10);

insert into scheduling (id, start_time, end_time, date, status, activity_id, contract_id)
values (default, '10:00:00', '09:00:00', '2024-08-20', 'Em aberto', 2, 1),
       (default, '10:00:00', '09:00:00', '2024-01-20', 'Finalizada', 1, 2),
       (default, '10:00:00', '09:00:00', '2024-09-01', 'Em aberto', 3, 4),
       (default, '10:00:00', '09:00:00', '2024-07-29', 'Em andamento', 4, 3),
       (default, '10:00:00', '09:00:00', '2024-08-20', 'Em andamento', 5, 6),
       (default, '10:00:00', '09:00:00', '2023-09-20', 'Finalizada', 6, 5),
       (default, '10:00:00', '09:00:00', '2022-01-01', 'Finalizada', 7, 8),
       (default, '10:00:00', '09:00:00', '2024-08-20', 'Em aberto', 8, 7),
       (default, '10:00:00', '09:00:00', '2024-08-20', 'Em aberto', 10, 9);