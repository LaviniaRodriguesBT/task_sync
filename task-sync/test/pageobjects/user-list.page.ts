import { $ } from '@wdio/globals'
import Page from './page';

class UserListPage extends Page {

    public getButton(buttonName: string) {
        return $(`.ft-btn-${buttonName}`);
    }

    public async getMessageToastr() {
        const toastrElement = $(`.toast-container`);
        return toastrElement;
    }
    
    public async clickButton(buttonName: string) {
        const button = this.getButton(buttonName);
        await button.click();
        await browser.pause(500);
    }

    public getField(fieldName: string) {
        return $(`.ft-field-${fieldName}`);
    }

    public async writeInput(fieldName: string, value: string) {
    
        const field = this.getField(fieldName);
        await field.click();
        await field.setValue(value);
        await browser.pause(500);
    }
      
}

export default new UserListPage();