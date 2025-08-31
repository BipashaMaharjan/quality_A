const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
    constructor(page) {
        this.page = page;

        // Form fields
        this.addContact = '#add-contact';
        this.firstName = '#firstName';
        this.lastName = '#lastName';
        this.dob = 'input[placeholder="yyyy-MM-dd"]';
        this.email = '#email';
        this.phone = '#phone';
        this.address = 'input[placeholder="Address 1"]';
        this.city = '#city';
        this.state = 'input[placeholder="State or Province"]';
        this.postal = '#postal';
        this.country = 'input[placeholder="Country"]';
        this.Save = '#submit';

        // Saved contact view selectors (updated)
        this.savedFirstName = '#saved-firstName';
        this.savedLastName = '#saved-lastName';
        this.savedDOB = '#saved-dob';
        this.savedEmail = '#saved-email';
        this.savedPhone = '#saved-phone';
        this.savedAddress = '#saved-address';
        this.savedCity = '#saved-city';
        this.savedState = '#saved-state';
        this.savedPostal = '#saved-postal';
        this.savedCountry = '#saved-country';

        // Actions
        this.editContact = '#edit-contact';
        this.delete = '#delete';
        this.viewCreatedContact = '#view-contact';
    }

    async contactAdd(firstName, lastName, dateOfBirth, email, phone, address, city, state, postal, country) {
        await this.page.locator(this.addContact).click();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.locator(this.lastName).fill(lastName);
        await this.page.locator(this.dob).fill(dateOfBirth);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.phone).fill(phone);
        await this.page.locator(this.address).fill(address);
        await this.page.locator(this.city).fill(city);
        await this.page.locator(this.state).fill(state);
        // await this.page.locator(this.postal).fill(postal);
        // await this.page.locator(this.country).fill(country);

        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'load' }),
            this.page.locator(this.Save).click()
        ]);

    }
        async contactEdit(firstName) {
        await this.page.locator(this.editContact).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.firstName).clear();
        await this.page.locator(this.firstName).fill(firstName);
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.Save).click();


        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'load' }),
            this.page.locator(this.Save).click()
        ]);
    }
    async contactDelete(){
        await this.page.waitForTimeout(2000);
        this.page.once('dialog', async dialog=>{
            console.log('Dialog message: $(dialog.message()}');
            await dialog.accept();
        });
        await this.page.locator(this.deleteContact).click();
    }


    async viewContact() {
        await this.page.locator(this.viewCreatedContact).click();
    }

    async validateContactCreated(fName, lName, dob, email, phone, address, city, postal, state, country) {
        await expect(this.page.locator(this.savedFirstName)).toHaveText(fName);
        await expect(this.page.locator(this.savedLastName)).toHaveText(lName);
        await expect(this.page.locator(this.savedDOB)).toHaveText(dob);
        await expect(this.page.locator(this.savedEmail)).toHaveText(email);
        await expect(this.page.locator(this.savedPhone)).toHaveText(phone);
        await expect(this.page.locator(this.savedAddress)).toHaveText(address);
        await expect(this.page.locator(this.savedCity)).toHaveText(city);
        await expect(this.page.locator(this.savedPostal)).toHaveText(postal);
        await expect(this.page.locator(this.savedState)).toHaveText(state);
        await expect(this.page.locator(this.savedCountry)).toHaveText(country);
    }
}