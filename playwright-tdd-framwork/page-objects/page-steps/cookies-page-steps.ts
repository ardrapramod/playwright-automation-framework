import { Page } from '@playwright/test';
import cookiesPage  from '../page-elements/cookies-page-elements.json' with { type: 'json' };
import { WebCommons } from  '../../commons/ui/web-commons.js'

export class CookiesPageSteps {

    page : Page;
    web : WebCommons;

    constructor(page: Page) {
        this.page = page;
        this.web = new WebCommons(page);
    }

    //Method to verify cookies popup is displayed 
    async verifyCookiesPopupIsDisplayed() {
        await this.web.isElementVisible(cookiesPage.cookiesHeader);
    }

    //Method to verify cookies pop-up content 
    async verifyCookiesPopupContent(expContent: string) {
        await this.web.isElementVisible(cookiesPage.cookiesContent);
        const actualContent = await this.web.getElementText(cookiesPage.cookiesContent);
        await this.web.compareText(actualContent, expContent);
    }

    //Method to verify the logos displayed on the cookies popup 
    async verifyCookiesPopupLogos() {
        await this.web.isElementVisible(cookiesPage.creatioLogo);
        await this.web.isElementVisible(cookiesPage.cookiebotLogo);
    }

    //Method to Verify switch buttons displayed on the cookies popup. 
    async verifyCookiesPopupSwitchButtons() {
        await this.web.isElementVisible(cookiesPage.necessarySwitchButton);
        await this.web.isElementVisible(cookiesPage.preferencesSwitchButton);
        await this.web.isElementVisible(cookiesPage.statisticsSwitchButton);
        await this.web.isElementVisible(cookiesPage.marketingSwitchButton);
    }

    //Method to verify selection buttons displayed on the cookies popup
    async verifyCookiesPopupSelectionButtons() {
        await this.web.isElementVisible(cookiesPage.allowAllButton);
        await this.web.isElementVisible(cookiesPage.allowSelectionButton);
        await this.web.isElementVisible(cookiesPage.denyButton);
    }

    //Method to verify the show details link displayed on the cookies popup 
    async verifyCookiesPopupShowDetailsLink() {
        await this.web.isElementVisible(cookiesPage.showDetailsLink);
    }

    //Method to click on the show details link on the cookies popup
    async clickOnShowDetailsLink() {
        await this.web.clickElement(cookiesPage.showDetailsLink);
    }

    //Method to verify expanded view of cookies pop-up after clicking on show details link 
    async verifyExpandedViewOfCookiesPopup() {
        await this.web.isElementVisible(cookiesPage.cookiePopupExpandedView);
    }

    //Method to click on the selection button. 
    async clickOnSelectionButton(buttonName: string) {
        switch (buttonName.toLowerCase()) {
            case 'allow all':
                await this.web.clickElement(cookiesPage.allowAllButton);
                break;
            case 'allow selection':
                await this.web.clickElement(cookiesPage.allowSelectionButton);
                break;
            case 'deny':
                await this.web.clickElement(cookiesPage.denyButton);
                break;
            default:
                throw new Error(`Unknown button name: ${buttonName}`);
        }
    }

    //Method to verify cookies popup is closed successfully after clicking on the selection button.
    async verifyCookiesPopupIsClosed() {
        await this.web.isElementDisappeared(cookiesPage.cookiesHeader);
    }

}