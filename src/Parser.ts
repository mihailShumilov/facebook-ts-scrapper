import {Browser} from "./Browser";

export default class Parser {

    private link: string

    private login: string;

    private password: string;

    private browser: Browser;

    constructor({link, login, password, browser}) {
        this.link = link;
        this.login = login;
        this.password = password;
        this.browser = browser;
    }
}
