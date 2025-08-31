import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';
const testData = require('../fixtures/loginFixture.json');

test.beforeEach(async ({page}) => { //sabai ma change grna pryo vne garo hunxa so yo gryo vne sabai ma changes aauxa
await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
})

test.describe('Valid login test', ()=> {
    test('Login Using valid username and password', async({page})=>{
        const login = new LoginPage(page);
        await login.login(testData.validUser.userName, testData.validUser.password);
        await login.verifyValidLogin();
    });
})

test.describe('Invalid login test', ()=> {
    test('Login Using invalid username and valid password', async({page})=>{
        const login = new LoginPage(page);
        await login.login("qwerty", "@5uJJNViqHDPQj");
        await login.verifyInvalidLogin();
    });
})
test.describe('Invalid login test', ()=> {
    test('Login Using invalid username and Invalid password', async({page})=>{
        const login = new LoginPage(page);
        await login.login("qwerty", "@ab");
        await login.verifyInvalidLogin();
    });
})
test.describe('Invalid login test', ()=> {
    test('Login Using valid username and Invalid password', async({page})=>{
        const login = new LoginPage(page);
        await login.login("bipashamaharjan4@gmail.com", "@ab");// login.login ma test data pass grna prxa ok, tara json bata pass grne 
        await login.verifyInvalidLogin();
    });
})



