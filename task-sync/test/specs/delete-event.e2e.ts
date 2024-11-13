import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page'
import MainPage from '../pageobjects/main.page'
import EventListPage from '../pageobjects/event-list.page'
import EventCreatePage from '../pageobjects/event-create.page'
import SecurePage from '../pageobjects/secure.page'

describe('Buscar evento a ser excluído', () => {
    it('Filtrar evento', async () => {
        await browser.pause(500);
        await EventListPage.filter('michelef@.com', '123', 'sign');
    })
})
