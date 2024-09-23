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


insert into "user" (id, email, password, access_type, person_id)
values (default, 'michelef@.com', '123', 'Administrador', 1),
       (default, 'laviniabf@.com', '321', 'Colaborador', 2),
       (default, 'lucassf@.com', '456', 'Colaborador', 3),
       (default, 'alansf@.com', '654', 'Colaborador', 4),
       (default, 'leandrof@.com', '789', 'Administrador', 5),
       (default, 'brunogf@.com', '987', 'Administrador', 6),
       (default, 'brunavf@.com', '147', 'Colaborador', 7),
       (default, 'danielebf@.com', '258', 'Colaborador', 8),
       (default, 'josuesf@.com', '369', 'Administrador', 9),
       (default, 'patriciarf@.com', '741', 'Colaborador', 10);



insert into event (id, code, name, description, business, date, start_time, end_time)
values (default, '001', 'Reunião de Equipe', 'Discussão sobre o novo projeto', 'Desenvolvimento', '2024-05-20',
        '09:00:00', '11:00:00'),
       (default, '002', 'Workshop de Marketing', 'Estratégias para aumentar as vendas', 'Marketing', '2024-05-25',
        '14:00:00', '17:00:00'),
       (default, '003', 'Lançamento de Produto', 'Apresentação do novo produto X', 'Vendas', '2024-06-10', '10:00:00',
        '12:00:00'),
       (default, '004', 'Treinamento Técnico', 'Atualização sobre novas tecnologias', 'TI', '2024-06-15', '09:00:00',
        '16:00:00'),
       (default, '005', 'Conferência Anual', 'Discussão sobre tendências de mercado', 'Estratégia', '2024-07-05',
        '08:00:00', '18:00:00'),
       (default, '006', 'Feira de Emprego', 'Conectar talentos com empresas', 'Recursos Humanos', '2024-07-20',
        '10:00:00', '16:00:00'),
       (default, '007', 'Almoço de Equipe', 'Integração da nova equipe', 'Recursos Humanos', '2024-08-02', '12:00:00',
        '14:00:00'),
       (default, '008', 'Hackathon', 'Desenvolvimento de soluções inovadoras', 'Inovação', '2024-08-15', '18:00:00',
        '02:00:00'),
       (default, '009', 'Palestra Motivacional', 'Inspiração para a equipe', 'Desenvolvimento', '2024-09-01',
        '15:00:00', '16:00:00'),
       (default, '010', 'Reunião de Diretoria', 'Discussão sobre metas anuais', 'Diretoria', '2024-09-15', '10:00:00',
        '12:00:00');



insert into task (id, name)
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



insert into contract (id, number, signature_date, user_id, event_id)
values (default, 100, now(), 2, 9),
       (default, 200, now(), 1, 7),
       (default, 300, now(), 4, 5),
       (default, 400, now(), 3, 3),
       (default, 500, now(), 6, 1),
       (default, 600, now(), 5, 8),
       (default, 700, now(), 8, 6),
       (default, 800, now(), 7, 4),
       (default, 900, now(), 10, 2),
       (default, 1000, now(), 9, 10);


insert into scheduling (id, start_time, end_time, date, status, activity_id, contract_id)
values (default, '2024-09-07', '2024-09-07', '2024-08-20', 'Em aberto', 2, 1),
       (default, '2024-04-07', '2024-04-09', '2024-01-20', 'Finalizada', 1, 2),
       (default, '2024-09-07', '2024-09-11', '2024-09-01', 'Em aberto', 3, 4),
       (default, '2024-10-08', '2024-09-09', '2024-07-29', 'Em andamento', 4, 3),
       (default, '2024-09-22', '2024-09-07', '2024-08-20', 'Em andamento', 5, 6),
       (default, '2023-09-07', '2023-10-07', '2023-09-20', 'Finalizada', 6, 5),
       (default, '2022-01-07', '2022-01-07', '2022-01-01', 'Finalizada', 7, 8),
       (default, '2024-12-25', '2024-09-07', '2024-08-20', 'Em aberto', 8, 7),
       (default, '2024-12-31', '2024-09-07', '2024-08-20', 'Em aberto', 9, 10),
       (default, '2024-11-15', '2024-11-15', '2024-08-20', 'Em aberto', 10, 9);
