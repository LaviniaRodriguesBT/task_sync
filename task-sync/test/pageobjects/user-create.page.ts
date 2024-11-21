import { $ } from '@wdio/globals'
import Page from './page';

class UserCreatePage extends Page {

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
    

    public async createUser(
        nameUser: string, 
        emailUser: string,
        passwordUser: string, 
        cpfUser: string,
        phoneUser: string,
        addressUser: string, 
        typeAcess: string,
        button: string) {
        await this.writeInput('name', nameUser);
        await this.writeInput('email', emailUser);
        await this.writeInput('password', passwordUser);
        await this.writeInput('cpf', cpfUser);
        await this.writeInput('phone', phoneUser);
        await this.writeInput('address', addressUser);
        await this.writeInput('type-access', typeAcess);
        await browser.pause(500);
        await this.clickButton(button)
    }
}

export default new UserCreatePage();
