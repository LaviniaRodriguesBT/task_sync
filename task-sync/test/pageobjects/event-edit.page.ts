import { $ } from '@wdio/globals'
import Page from './page';

class EventEditPage extends Page {

    public getField(fieldName: string) {
        return $(`.ft-field-${fieldName}`);
    }

    public async writeInput(fieldName: string, value: string) {
        const field = this.getField(fieldName);
        await field.click();
        await field.setValue(value);
        await browser.pause(500);
    }

    public getButton(buttonName: string) {
        return $(`.ft-btn-${buttonName}`);
    }

    public getFieldDate(buttonName: string) {
        return $(`.ft-field-${buttonName}`);
    }

    public async clickButton(buttonName: string) {
        const button = this.getButton(buttonName);
        await button.click();
        await browser.pause(500);
        
    }

    public async getMessageToastr() {
        const toastrElement = $(`.toast-container`);
        return toastrElement;
    }
    
    public async editEvent(
        nameEvent: string, 
        button: string) {
        await this.writeInput('name-event', nameEvent);
        await this.clickButton(button)
    }
}

export default new EventEditPage();
