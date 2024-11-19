import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import MainPage from '../pageobjects/main.page'
import UserListPage from '../pageobjects/user-list.page'
import UserCreatePage from '../pageobjects/user-create.page'
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

describe('Usuario criado com sucesso', () => {
    it('Acessar a lista de usuarios', async () => {
        await MainPage.clickButton('user');
        await MainPage.clickButton('list-user');
    });

    it('Acessar a página de criar um novo usuario', async () => {
        await UserListPage.clickButton('create-user');
    });

    it('Usuario criado com sucesso', async () => {
        await UserCreatePage.createUser('Carlos', 'carlosfernandes@gmail.com', 'carlos123*carlos', '12345678910', '12345678910', 'Rua João de Camargo, 45, Santa Ria do Sapucaí', 'Colaborador', 'create');

        const messageToastr = await UserCreatePage.getMessageToastr();
        expect(messageToastr).toContain('Dados salvos com sucesso!');
    });
});


describe('Sair da aplicação', () => {
    it('Realizar o logout', async () => {
        await MainPage.clickButton('my-profile');
        await MainPage.clickButton('logout');
        await LoginPage.open();
    })

})

