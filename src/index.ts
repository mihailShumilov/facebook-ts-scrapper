import * as yargs from "yargs";
import {Browser} from "./class/Browser";
import Parser from "./class/Parser";
import {Post} from "./@types/Post";


(async () => {

    const argv = yargs
        .option('proxyHost', {
            describe: 'Proxy host',
            type: 'string',
            alias: 'ph',
            demandOption: true
        })
        .option('proxyPort', {
            describe: 'Proxy port',
            type: 'string',
            alias: 'pp',
            demandOption: true
        })
        .option('proxyUser', {
            describe: 'Proxy user',
            type: 'string',
            alias: 'pu',
            demandOption: true
        })
        .option('proxyPass', {
            describe: 'Proxy password',
            type: 'string',
            alias: 'ppw',
            demandOption: true
        })
        .option('login', {
            describe: 'User login',
            type: 'string',
            alias: 'l',
            demandOption: true
        })
        .option('password', {
            describe: 'User password',
            type: 'string',
            alias: 'p',
            demandOption: true
        })
        .option('link', {
            describe: 'Link to page for parsing',
            type: 'string',
            alias: 'ln',
            demandOption: true
        })
        .option('cookie', {
            describe: 'Path to cookie storage',
            type: 'string',
            alias: 'c',
            demandOption: true
        })
        .argv;

    const browser = new Browser({
        host: argv.proxyHost,
        port: argv.proxyPort,
        user: argv.proxyUser,
        pass: argv.proxyPass
    }, argv.cookie);

    await browser.init();

    const parser = new Parser({
        link: argv.link,
        login: argv.login,
        password: argv.password,
        browser: browser
    });

    const posts: Post[] = await parser.run();

    console.log(JSON.stringify(posts));
})();
