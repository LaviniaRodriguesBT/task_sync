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

// describe('Usuario criado com sucesso', () => {
//     it('Acessar a lista de usuarios', async () => {
//         await browser.pause(5000);
//         await MainPage.clickButton('user');
//         await MainPage.clickButton('list-user');
//     })

//     it('Acessar  a página de criar um novo usuario', async () => {
//         await UserListPage.clickButton('create-user');
//         await browser.pause(100);
//     })

//     it('Usuario criado com sucesso', async () => {
//         await UserCreatePage.createUser('Carlos', 'carlosfernandes@gmail.com', 'carlos123*carlos', '12345678910', '12345678910', 'Rua João de Camargo, 45, Santa Ria do Sapucaí', 'admin', 'create');
//         const messageToastr = await UserCreatePage.getMessageToastr();
//         const text = await messageToastr.getText();
//         expect(text).toContain('Dados salvos com sucesso!');
//         await browser.pause(3000);
//         await browser.pause(3000);
//     })
// })



// describe('Criar novo evento sem preencher as informações', () => {
//     it('Acessar a lista de eventos', async () => {
//         await MainPage.clickButton('event');
//         await MainPage.clickButton('list-events');
//     })

//     it('Acessar  a página de criar um novo evento', async () => {
//         await UserListPage.clickButton('create-event');
//         await browser.pause(100);
//     })

//     it('Erro ao criar novo evento sem preencher as informações', async () => {
//         await browser.pause(3000);
//         await UserCreatePage.clickButton('create');
//         await UserCreatePage.clickButton('create');
//         const messageToastr = await UserCreatePage.getMessageToastr();
//         const text = await messageToastr.getText();
//         expect(text).toContain('Preencha todos os campos obrigatórios corretamente antes de cadastrar o evento.');
//         await browser.pause(3000);
//     })
//})


describe('Sair da aplicação', () => {
    it('Realizar o logout', async () => {
        await MainPage.clickButton('my-profile');
        await MainPage.clickButton('logout');
        await LoginPage.open();
    })

})

