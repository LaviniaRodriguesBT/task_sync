import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import SecurePage from '../pageobjects/secure.page'

describe('ACessar o website', () => {
    it('Acessar a apgina de login de administrador', async () => {
        await LoginPage.open();
        await browser.pause(500);
        await LoginPage.clickButton();
        await browser.pause(500);

    //Criacao de mais testes


    })
})

