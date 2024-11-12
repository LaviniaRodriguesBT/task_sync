import { $ } from '@wdio/globals'
import Page from './page';

class EventListPage extends Page {

    public getButton(buttonName: string) {
        return $(`.ft-btn-${buttonName}`);
    }

    public async clickButton(buttonName: string) {
        const button = this.getButton(buttonName);
        await button.click();
        await browser.pause(500);
    }
      
}

export default new EventListPage();