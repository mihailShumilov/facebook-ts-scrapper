import {Browser} from "./Browser";
import {Post} from "../@types/Post";
import {Page} from "puppeteer";

export default class Parser {

    private link: string

    private login: string;

    private password: string;

    private browser: Browser;

    private posts: Post[] = [];

    private page: Page;

    constructor({link, login, password, browser}) {
        this.link = link;
        this.login = login;
        this.password = password;
        this.browser = browser;
    }

    public async run(): Promise<Post[]> {
        const self = this;
        setTimeout(async () => {
            await this.browser.close();
            if (self.browser.browser.process() != null) self.browser.browser.process().kill('SIGINT');
            return self.posts;
        }, 600000);

        await this.openPage();
        await this.checkLogin();

        // await this.browser.close();
        return this.posts;
    }

    private async openPage(): Promise<void> {
        this.page = await this.browser.getPage();
        await this.page.goto(this.link, {waitUntil : 'domcontentloaded'});
    }

    private async checkLogin(): Promise<void> {
        if(await this.page.$('#login_form') !== null){
            await this.page.type('#email', this.login, {delay : 70});
            await this.page.type('#pass', this.password, {delay : 70});
            await this.page.click('#loginbutton');
            await this.page.waitForNavigation({timeout : 120000});
        }
    }

}
