import {Page, Locator, expect} from '@playwright/test';

export class WebCommons {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Generates a Playwright locator for the provided selector string.
     * @param locator Selector used to locate the element.
     * @returns A Playwright Locator instance.
     * @author Bharath Reddy
     */
    async element(locator: string): Promise<Locator> {
        return this.page.locator(locator);
    }

    /**
     * Launches the application URL and optionally validates the page title.
     * @param url Application URL to open.
     * @param title Optional expected page title.
     * @returns Resolves when navigation and optional title validation complete.
     * @author Bharath Reddy
     */
    async launchApplication(url: string, title ?:string): Promise<void> {
        await this.page.goto(url);
        if(title){
            await expect(this.page).toHaveTitle(title);
        }
    }

    /**
     * Scrolls the target element into view if it is outside the viewport.
     * @param locator Selector used to identify the element.
     * @returns Resolves when the element is in view.
     * @author Bharath Reddy
     */
    async scrollToElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.scrollIntoViewIfNeeded();
    }

    /**
     * Performs a click action on the target element.
     * @param locator Selector used to identify the element.
     * @returns Resolves when click is completed.
     * @author Bharath Reddy
     */
    async clickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.click();
    }

    /**
     * Performs a double-click action on the target element.
     * @param locator Selector used to identify the element.
     * @returns Resolves when double-click is completed.
     * @author Bharath Reddy
     */
    async doubleClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.dblclick();
    }

    /**
     * Performs a right-click (context click) on the target element.
     * @param locator Selector used to identify the element.
     * @returns Resolves when right-click is completed.
     * @author Bharath Reddy
     */
    async rightClickElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.click({button: 'right'});
    }

    /**
     * Hovers the mouse pointer over the target element.
     * @param locator Selector used to identify the element.
     * @returns Resolves when hover action is completed.
     * @author Bharath Reddy
     */
    async hoverOverElement(locator: string): Promise<void> {
        const element = await this.element(locator);
        await element.hover();
    }

    /**
     * Clears and enters text into an input element.
     * @param locator Selector used to identify the input element.
     * @param text Text to enter.
     * @returns Resolves when text entry is completed.
     * @author Bharath Reddy
     */
    async enterText(locator: string, text: string): Promise<void> {
        const element = await this.element(locator);
        await  element.clear();
        await element.fill(text);
    }

    /**
     * Selects an option value from a dropdown element.
     * @param locator Selector used to identify the dropdown.
     * @param option Option value to select.
     * @returns Resolves when selection is completed.
     * @author Bharath Reddy
     */
    async selectOption(locator: string, option: string): Promise<void> {
        const element = await this.element(locator);
        await element.selectOption(option);
    }

    /**
     * Checks a checkbox element only if it is not already checked.
     * @param locator Selector used to identify the checkbox.
     * @returns Resolves when checkbox state is ensured.
     * @author Bharath Reddy
     */
    async checkCheckbox(locator: string): Promise<void> {
        const element = await this.element(locator);
        if(!await element.isChecked()){
            await element.check();
        }
    }

    /**
     * Reads text content from the target element.
     * @param locator Selector used to identify the element.
     * @returns Element text content or empty string when null.
     * @author Bharath Reddy
     */
    async getElementText(locator: string): Promise<string> {
        const element = await this.element(locator);
        return await element.textContent() || '';
    }

    /**
     * Reads a specific attribute value from the target element.
     * @param locator Selector used to identify the element.
     * @param attribute Attribute name to read.
     * @returns Attribute value or null when not present.
     * @author Bharath Reddy
     */
    async getElementAttribute(locator: string, attribute: string): Promise<string | null> {
        const element = await this.element(locator);
        return await element.getAttribute(attribute);
    }

    /**
     * Asserts that the target element is visible on the page.
     * @param locator Selector used to identify the element.
     * @returns Resolves when visibility assertion passes.
     * @author Bharath Reddy
     */
    async isElementVisible(locator: string): Promise<void> {
        const element = await this.element(locator);
        await expect(element).toBeVisible();
    }

    /**
     * Checks whether the target element is hidden.
     * @param locator Selector used to identify the element.
     * @returns True when element is hidden; otherwise false.
     * @author Bharath Reddy
     */
    async isElementDisappeared(locator: string): Promise<boolean> {
        const element = await this.element(locator);
        return await element.isHidden();
    }

    /**
     * Uploads a file using a file input element.
     * @param locator Selector used to identify the file input.
     * @param filePath Absolute or relative file path to upload.
     * @returns Resolves when file upload is set on input.
     * @author Bharath Reddy
     */
    async uploadFile(locator: string, filePath: string): Promise<void> {
        const element = await this.element(locator);
        await element.setInputFiles(filePath);
    }

    /**
     * Registers one-time dialog handling for alert, confirm, or prompt dialogs.
     * @param action Dialog action to perform: accept or dismiss.
     * @param promptText Optional text for prompt dialogs.
     * @returns Resolves after listener registration.
     * @author Bharath Reddy
     */
    async handleAlert(action: 'accept' | 'dismiss', promptText?: string): Promise<void> {
        this.page.once('dialog', async (dialog) => {
            if (promptText) {
                await dialog.accept(promptText);
            } else {
                if (action === 'accept') {
                    await dialog.accept();
                } else {
                    await dialog.dismiss();
                }
            }
        });
    }

    /**
     * Captures a screenshot of the current page.
     * @param filePath Destination file path for screenshot image.
     * @returns Resolves when screenshot is saved.
     * @author Bharath Reddy
     */
    async takeScreenshot(filePath: string): Promise<void> {
        await this.page.screenshot({ path: filePath });
    }

    /**
     * Sets browser viewport resolution for the current page.
     * @param width Viewport width in pixels.
     * @param height Viewport height in pixels.
     * @returns Resolves when viewport is updated.
     * @author Bharath Reddy
     */
    async setResolution(width: number, height: number): Promise<void> {
        await this.page.setViewportSize({ width, height });
    }

    /**
     * Refreshes the current page.
     * @returns Resolves when reload is completed.
     * @author Bharath Reddy
     */
    async refreshPage(): Promise<void> {
        await this.page.reload();
    }

    /**
     * Locates an element inside an iframe using frame and element selectors.
     * @param frameLocator Selector to locate the frame.
     * @param frameElement Selector to locate the element within the frame.
     * @returns A Locator for the element inside the frame.
     * @author Bharath Reddy
     */
    async frameElement(frameLocator: string, frameElement: string): Promise<Locator> {
        const element = this.page.frameLocator(frameLocator);
        const frame = await element.locator(frameElement)
        return frame;
    }

    /**
     * Locates an element using Playwright getBy* strategies encoded as method_value.
     * @param locator Combined locator format, for example getByText_Login.
     * @param role Optional role when getByRole is used.
     * @returns A Locator built from the requested Playwright method.
     * @author Bharath Reddy
     */
    async locateElementByMethod(locator: string, role?: Parameters<Page['getByRole']>[0]): Promise<Locator> {
        const values = locator.split('_');
        const method = values[0];
        const value = values[1];

        if (method === 'getByRole') {
            if (!role) {
                throw new Error('Role is required for getByRole locator method.');
            }
            return this.page.getByRole(role, { name: value ?? '' });
        }else if (method === 'getByText') {
            return this.page.getByText(value ?? '');
        } else if (method === 'getByLabel') {
            return this.page.getByLabel(value ?? '');
        } else if (method === 'getByPlaceholder') {
            return this.page.getByPlaceholder(value ?? '');
        } else if (method === 'getByAltText') {
            return this.page.getByAltText(value ?? '');
        } else if (method === 'getByTitle') {
            return this.page.getByTitle(value ?? '');   
        } 

        throw new Error(`Unsupported locator method: ${method}`);
    }

    /**
     * Compares actual and expected text values after trimming whitespace.
     * @param actual Actual text value from application.
     * @param expected Expected text value for validation.
     * @returns Resolves when assertion passes.
     * @author Bharath Reddy
     */
    async compareText(actual: string, expected: string): Promise<void> {
        expect(actual.trim()).toContain(expected.trim());
    }

}
