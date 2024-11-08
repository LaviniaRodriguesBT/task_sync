import { $ } from '@wdio/globals'
import Page from './page';

class LoginPage extends Page {
    

    public getField(fieldName: string) {
        return $(`.ft-field-${fieldName}`);
    }

    public async writeInput(fieldName: string, value: string) {
    
        const field = this.getField(fieldName);
        await field.click();
        await field.setValue(value);
        await browser.pause(500);
    }

    public get inputField() {
        return $('.ft-user-email');
    }

    public get inputPassword () {
        return $('ft-password');
    }



    public getButton(buttonName: string) {
        return $(`.ft-btn-${buttonName}`);
    }

    public async clickButton(buttonName: string) {
        const button = this.getButton(buttonName);
        await button.click();
        await browser.pause(500);
    }


      
    public override open () {
        return super.open('login');
    }

    public async login(username: string, password: string, button: string) {
        await this.writeInput('email', username);
        await this.writeInput('password', password);
        await this.clickButton(button);
        await browser.pause(500);
    }


}

export default new LoginPage();
