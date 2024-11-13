import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import MainPage from '../pageobjects/main.page'
import EventListPage from '../pageobjects/event-list.page'
import EventCreatePage from '../pageobjects/event-create.page'
import SecurePage from '../pageobjects/secure.page'

describe('Acessar a aplicação ', () => {
    it('Acessar a pagina de login de administrador', async () => {
        await LoginPage.open();
        await browser.pause(500);
        await LoginPage.clickButton('login');
        await LoginPage.clickButton('admin');
        await LoginPage.login('michelef@.com', '123', 'sign');
    })
})

describe('Evento criado com sucesso', () => {
    it('Acessar a lista de eventos', async () => {
        await MainPage.clickButton('event');
        await MainPage.clickButton('list-events');
    })

    it('Acessar  a página de criar um novo evento', async () => {
        await EventListPage.clickButton('create-event');
        await browser.pause(100);
    })

    it('Evento criado com sucesso', async () => {
        await EventCreatePage.createEvent('Evento 10', '365', 'Evento criado para teste', 'Tecnologia', '21/11/2024', '12:40', '19:40', 'create');
        const messageToastr = await EventCreatePage.getMessageToastr();
        const text = await messageToastr.getText();
        expect(text).toContain('Dados salvos com sucesso!');
        await browser.pause(3000);
        await browser.pause(3000);
    })
})



describe('Criar novo evento sem preencher as informações', () => {
    it('Acessar a lista de eventos', async () => {
        await MainPage.clickButton('event');
        await MainPage.clickButton('list-events');
    })

    it('Acessar  a página de criar um novo evento', async () => {
        await EventListPage.clickButton('create-event');
        await browser.pause(100);
    })

    it('Erro ao criar novo evento sem preencher as informações', async () => {
        await browser.pause(3000);
        await EventCreatePage.clickButton('create');
        await EventCreatePage.clickButton('create');
        const messageToastr = await EventCreatePage.getMessageToastr();
        const text = await messageToastr.getText();
        expect(text).toContain('Preencha todos os campos obrigatórios corretamente antes de cadastrar o evento.');
        await browser.pause(3000);
    })
})


describe('Sair da aplicação', () => {
    it('Realizar o logout', async () => {
        await MainPage.clickButton('my-profile');
        await MainPage.clickButton('logout');
        await LoginPage.open();
    })

})

