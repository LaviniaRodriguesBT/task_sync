import { $ } from '@wdio/globals'
import Page from './page';

class LoginPage extends Page {

    public get inputUserEmail () {
        return $('#username');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get btnSubmit () {
        return $('button[type="submit"]');
    }

    public get btnLogin () {
        return $('#btn-login');
    }

      
    public override open () {
        return super.open('login');
    }

    public async clickButton(){
        await this.btnLogin.click();
    }
    public async login (username: string, password: string) {
        await this.inputUserEmail.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }


}

export default new LoginPage();
