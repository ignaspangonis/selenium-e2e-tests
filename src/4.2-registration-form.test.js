import { By, Builder } from 'selenium-webdriver'
import { describe, before, after, it } from 'mocha'
import assert from 'assert'

describe('suninjuly.github.io/registration1.html', () => {
  let driver
  const TEST_URL = 'http://suninjuly.github.io/registration1.html'

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async () => await driver.quit())

  beforeEach(async () => {
    await driver.get(TEST_URL)
  })

  it('fills and submits the form', async () => {
    const firstNameInput = await driver.findElement(By.className('first'))
    const lastNameInput = await driver.findElement(By.css('.first_block .second'))
    const emailInput = await driver.findElement(By.className('third'))
    const submitButton = await driver.findElement(By.className('btn'))

    assert.ok(await lastNameInput.isDisplayed())

    await firstNameInput.sendKeys('First name')
    await lastNameInput.sendKeys('Last name')
    await emailInput.sendKeys('email')
    await submitButton.click()

    assert.equal(
      'Congratulations! You have successfully registered!',
      await driver.findElement(By.css('h1')).getText(),
    )
  })
})

describe('suninjuly.github.io/registration2.html', () => {
  let driver
  const TEST_URL = 'http://suninjuly.github.io/registration2.html'

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async () => await driver.quit())

  beforeEach(async () => {
    await driver.get(TEST_URL)
  })

  // Desirable behavior - this test should fail
  it.skip('fills and submits the form', async () => {
    const firstNameInput = await driver.findElement(By.className('first'))
    const lastNameInput = await driver.findElement(By.css('.first_block .second'))
    const emailInput = await driver.findElement(By.className('third'))
    const submitButton = await driver.findElement(By.className('btn'))

    // This assertion should fail, because the last name input is not displayed
    assert.ok(await lastNameInput.isDisplayed())

    await firstNameInput.sendKeys('First name')
    await lastNameInput.sendKeys('Last name')
    await emailInput.sendKeys('email')
    await submitButton.click()

    assert.equal(
      'Congratulations! You have successfully registered!',
      await driver.findElement(By.css('h1')).getText(),
    )
  })
})
