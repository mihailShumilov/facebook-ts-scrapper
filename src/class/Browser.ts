import * as puppeteer from 'puppeteer';
import {Proxy} from "../@types/Proxy";
import {Page} from "puppeteer";


export class Browser {

    private _browser: puppeteer.Browser;

    private proxy: Proxy;

    private readonly cookiePath: string;

    private headless: boolean = (process.env.NODE_ENV !== 'dev');

    constructor(proxy: Proxy, cookiePath: string) {
        this.proxy = proxy;
        this.cookiePath = cookiePath;
    }

    public async init(): Promise<void> {
        this._browser = await puppeteer.launch({
            headless: this.headless,
            userDataDir: this.cookiePath,
            // executablePath : '/usr/bin/chromium-browser',
            args: [
                '--proxy-server=' + this.proxy.host + ':' + this.proxy.port,
                '--disable-session-crashed-bubble',
                '--disable-restore-session-state',
                // '--no-sandbox',
                // '--disable-setuid-sandbox'
            ]
        });

        this._browser.on('disconnected', async () => {
            console.log('Browser disconnected!!!!');
            process.exit();
        });
    }

    async close(): Promise<void> {
        await this.browser.close();
    }

    async getPage(): Promise<Page> {
        const page = await this.browser.newPage();
        await page.setViewport({
            width  : Math.round(1440 + (300 * Math.random())),
            height : Math.round(900 + (200 * Math.random()))
        });

        await page.authenticate({
            username: this.proxy.user,
            password: this.proxy.pass
        });

        return page;
    }


    get browser(): puppeteer.Browser {
        return this._browser;
    }
}
