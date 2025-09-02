import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/login.po';
import { ContactPage } from '../pageObjects/contact.po';

// Import helpers correctly
const { authenticateUser, createEntity, getEntity, deleteEntity, validateEntity } = require('../utils/helper.spec');

// Import test data
const testData = require('../fixtures/loginFixture.json');
const contactTestData = require('../fixtures/contactFixture.json');

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await page.goto('/');
  await login.login(testData.validUser.userName, testData.validUser.password);
  await login.verifyValidLogin();
});

test.describe('Contact testcases', () => {
  test('Contact Add test', async ({ page, request }) => {
    const contact = new ContactPage(page);

    await contact.contactAdd(contactTestData.contact.firstName, contactTestData.contact.lastName);
    await contact.viewContact();
    await contact.validateContactCreated(contactTestData.contact.firstName, contactTestData.contact.lastName);

    let accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password);
    const id = await getEntity(accessToken, '/contacts', '200', { request });
    await deleteEntity(accessToken, `/contacts/${id}`, { request });
    await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
  });

  test('Contact Edit test', async ({ page, request }) => {
    const Data = {
      birthdate: '2009/05/12',
      city: 'Kathmandu',
      country: 'Nepal',
      email: 'bipashamaharjan4@gmail.com',
      firstName: 'Bipasha',
      lastName: 'Maharjan',
      phone: '9818329724',
      postalCode: '123',
      stateProvince: 'Bagmati',
      street1: 'Teku',
    };

    const contact = new ContactPage(page);
    let accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, { request });
    await createEntity(Data, accessToken, '/contacts', { request });

    await page.reload();
    await contact.viewContact();
    await contact.contactEdit(contactTestData.contactEdit.firstName);
    await contact.validateContactCreated(
      contactTestData.contactEdit.firstName,
      contactTestData.contact.lastName,
      contact
    );
  });

  test('Contact Delete test', async ({ page, request }) => {
    const Data = {
      birthdate: '2009/05/12',
      city: 'Kathmandu',
      country: 'Nepal',
      email: 'bipashamaharjan4@gmail.com',
      firstName: 'Bipasha',
      lastName: 'Maharjan',
      phone: '9818329724',
      postalCode: '123',
      stateProvince: 'Bagmati',
      street1: 'Teku',
    };

    const contact = new ContactPage(page);
    let accessToken = await authenticateUser(testData.validUser.userName, testData.validUser.password, { request });
    await createEntity(Data, accessToken, '/contacts', { request });

    await page.reload();
    await contact.viewContact();

    const id = await getEntity(accessToken, '/contacts', '200', { request });
    await contact.contactDelete();
    await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});
