import { test, TestInfo } from '@playwright/test';
import { LoginPageSteps } from '../../page-objects/page-steps/login-page-steps.js';
import { HomePageSteps } from '../../page-objects/page-steps/home-page-steps.js';
import { CookiesPageSteps } from '../../page-objects/page-steps/cookies-page-steps.js';
import testdata from '../../testdata/db/data.json' with {type : 'json'};
import { DBCommons } from '../../commons/db/db-commons.js';


let loginPage: LoginPageSteps;
let homePage: HomePageSteps;
let cookiesPage: CookiesPageSteps;

test.describe('Application UI Tests', () => {

    //Initialize the page objects before each and every test case. 
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageSteps(page);
        homePage = new HomePageSteps(page);
        cookiesPage = new CookiesPageSteps(page);
    });

    //Test Case 1: Verify Cookies popup content compare UI vs DB
    test('Verify Cookies popup content', async () => {
        const query  = testdata["Verify Cookies popup content"];
        console.log(query);
        const data = await new DBCommons().getData(query);
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupContent((data[0] as any)["content"]);
    })

})