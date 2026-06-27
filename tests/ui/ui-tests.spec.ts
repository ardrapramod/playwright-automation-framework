import { test, TestInfo } from '@playwright/test';
import { LoginPageSteps } from '../../page-objects/page-steps/login-page-steps.js';
import { HomePageSteps } from '../../page-objects/page-steps/home-page-steps.js';
import { CookiesPageSteps } from '../../page-objects/page-steps/cookies-page-steps.js';
import data from '../../testdata/ui/data.json' with { type: 'json' };

let loginPage: LoginPageSteps;
let homePage: HomePageSteps;
let cookiesPage: CookiesPageSteps;
let testdata:any;

test.describe('Application UI Tests', () => {

    //Initialize the page objects before each and every test case. 
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageSteps(page);
        homePage = new HomePageSteps(page);
        cookiesPage = new CookiesPageSteps(page);
    });

    //Test Case 1: Verify Cookies popup is displayed. 
    test('Verify Cookies popup is displayed', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
    })

    //Test Case 2: Verify Cookies popup content
    test('Verify Cookies popup content', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        //testdata = data["Verify Cookies popup content" as keyof typeof data];
       await loginPage.launchtheApplication();
       await cookiesPage.verifyCookiesPopupIsDisplayed();
       await cookiesPage.verifyCookiesPopupContent(testdata.content);
    })
    
    //Test Case 3: Verify Logos displayed in the cookies pop-up 
    test('Verify Logos displayed in the cookies pop-up', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupLogos();
    })

    //Test Case 4: Verify switch buttons are displayed in the cookies pop-up
    test('Verify switch buttons are displayed in the cookies pop-up', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSwitchButtons();
    })

    //Test Case 5: Verify selection buttons are displayed in the cookies pop-up
    test('Verify selection buttons are displayed in the cookies pop-up', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
    })

    //Test Case 6: Verify show details link is displayed in the cookies pop-up
    test('Verify show details link is displayed in the cookies pop-up', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupShowDetailsLink();
    })

    //Test Case 7: Verify Expanded view of Cookies pop-up
    test('Verify Expanded view of Cookies pop-up', async () => {
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupShowDetailsLink();
        await cookiesPage.clickOnShowDetailsLink();
        await cookiesPage.verifyExpandedViewOfCookiesPopup();
    })

    //Test Case 8: Verify cookies popup is getting closed after clicking on the Allow All button. 
    test('Verify cookies popup is getting closed', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
    })

    //Test Case 9: Verify login functionality with valid credentials. 
    test('Verify login with valid credentials', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterBusinessEmailAndPassword(testdata.username, testdata.password);
        await loginPage.clickOnLoginButton();
        await homePage.verifyHomePageLaunched();
    })

    //Test Case 10: Verify invalid email format validation.
    test('Verify invalid email format validation', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterBusinessEmailAndPassword(testdata.invalidEmail);
        await loginPage.clickPasswordField();
        await loginPage.verifyBusinessEmailValidationMessageIsDisplayed(testdata.expectedErrorMsg);
    })

    //Test Case 11: Verify excessive email length validation.
    test('Verify excessive email length validation', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        const longEmail = `${'a'.repeat(testdata.emailLength - '@example.com'.length)}@example.com`;
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterBusinessEmailAndPassword(longEmail);
        await loginPage.clickPasswordField();
        await loginPage.verifyBusinessEmailValidationMessageIsDisplayed(testdata.expectedErrorMsg);
    })

    //Test Case 12: Verify excessive password length validation.
    test('Verify excessive password length validation', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        const longPassword = 'A'.repeat(testdata.passwordLength);
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterBusinessEmailAndPassword(testdata.username, longPassword);
        await loginPage.clickOnLoginButton();
        await loginPage.verifyPasswordValidationMessageIsDisplayed(testdata.expectedErrorMsg);
    })

    //Test Case 13: Verify invalid credentials error message.
        test('Verify invalid credentials error message', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterBusinessEmailAndPassword(testdata.username, testdata.password);
        await loginPage.clickOnLoginButton();
        await loginPage.verifyErrorMessageForInvalidCredentials(testdata.expectedErrorMsg);
    }) 
    
    //Test Case 14: Verify forgot password functionality. 
    test('Verify forgot password functionality', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication(); 
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterBusinessEmailAndPassword(testdata.username);
        await loginPage.clickOnForgotPasswordLink();
        await loginPage.verifyForgotPasswordConfirmationMessageIsDisplayed();
    })
    //Test Case 15: Verify sign-up link and social media icons are displayed within the login page. 
    test('Verify sign-up link and social media icons are displayed within the login page', async () => {

        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton("Allow All");
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.verifySignUpLinkIsDisplayed();
        await loginPage.verifySocialMediaIconsAreDisplayed();
    })

    //Test Case 16: Verify adding a new user within the creation CRM application. 
    test('Verify adding a new user', async ({}, testInfo: TestInfo) => {
        testdata = data[testInfo.title as keyof typeof data];
        await loginPage.launchtheApplication();
        await cookiesPage.verifyCookiesPopupIsDisplayed();
        await cookiesPage.verifyCookiesPopupSelectionButtons();
        await cookiesPage.clickOnSelectionButton(testdata.buttonName);
        await cookiesPage.verifyCookiesPopupIsClosed();
        await loginPage.verifyLoginPageIsDisplayed();
        await loginPage.enterBusinessEmailAndPassword(testdata.username, testdata.password);
        await loginPage.clickOnLoginButton();
        await homePage.verifyHomePageLaunched();
        await homePage.clickUsersLink();
        await homePage.verifyAddUserButtonDisplayed();
        await homePage.clickAddUserButton();
        await homePage.verifyNewUserScreenDisplayed();
        await homePage.enterEmailAddress(testdata.newUserEmail);
        await homePage.selectRole(testdata.newUserRole);
        await homePage.clickInviteButton();
        await homePage.verifyInvitationSentToastMessageDisplayed();
    })

})
