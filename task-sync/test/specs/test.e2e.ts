import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import MainPage from '../pageobjects/main.page'
import EventListPage from '../pageobjects/event-list.page'
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


describe('Acessar a lista de eventos ', () => {
    it('Acessar a lista de eventos', async () => {
        await MainPage.clickButton('event');
        await MainPage.clickButton('list-events');
    })
})

describe('Acessar a pagina de criar novo evento', () => {
    it('Criar novo evento', async () => {
        await EventListPage.clickButton('create-event');
        await browser.pause(3000);
    })
})

