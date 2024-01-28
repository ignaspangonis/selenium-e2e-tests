import { By, Builder } from 'selenium-webdriver'
import assert from 'assert'

describe('suninjuly.github.io/registration1.html', () => {
  let driver
  const TEST_URL = 'http://suninjuly.github.io/registration1.html'

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get(TEST_URL)
  })

  afterEach(async () => await driver.quit())

  it('fills and submits the form', async () => {
    const firstNameInput = await driver.findElement(By.className('first'))
    const lastNameInput = await driver.findElement(By.css('.first_block .second'))
    const emailInput = await driver.findElement(By.className('third'))
    const submitButton = await driver.findElement(By.className('btn'))

    assert.ok(await firstNameInput.isDisplayed())
    assert.ok(await lastNameInput.isDisplayed())
    assert.ok(await emailInput.isDisplayed())
    assert.ok(await submitButton.isDisplayed())

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
