import { $ } from '@wdio/globals'
import Page from './page';

class EventCreatePage extends Page {

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

    public calendarioClick() {
        return  $(`.calendar-icon`).click()
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
    

    public async createEvent(
        nameEvent: string, 
        codeEvent: string,
        descriptionEvent: string, 
        businessEvent: string,
        dateEvent: string,
        starTimeEvent: string,
        endTimeEvent: string, 
        button: string) {
        await this.writeInput('name', nameEvent);
        await this.writeInput('code', codeEvent);
        await this.writeInput('description', descriptionEvent);
        await this.writeInput('business', businessEvent);
        await this.writeInput('date', dateEvent);
        await this.writeInput('starTime', starTimeEvent);
        await this.writeInput('endTime', endTimeEvent);
        await this.clickButton(button)
    }
}

export default new EventCreatePage();
