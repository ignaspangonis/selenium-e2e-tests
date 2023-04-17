import { By, Builder, Key } from 'selenium-webdriver'
import { describe, it } from 'mocha'
import assert from 'assert'

describe('selenium.dev/selenium/web/web-form.html', () => {
  let driver
  const TEST_URL = 'https://www.selenium.dev/selenium/web/web-form.html'

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get(TEST_URL)
  })

  afterEach(async () => await driver.quit())

  it('loads the page', async () => {
    const title = await driver.getTitle()

    assert.equal('Web form', title)
  })

  it('does not write input to disabled fields', async () => {
    const readOnlyBox = await driver.findElement(By.name('my-readonly'))
    const disabledBox = await driver.findElement(By.name('my-disabled'))

    const disabledValue = await disabledBox.getAttribute('value')
    const readOnlyValue = await readOnlyBox.getAttribute('value')

    assert.equal('', disabledValue)
    assert.equal('Readonly input', readOnlyValue)

    await readOnlyBox.sendKeys('This should not be sent')
  })

  it('writes input to text fields and clears it', async () => {
    const textBox = await driver.findElement(By.name('my-text'))
    const passwordBox = await driver.findElement(By.name('my-password'))
    const textArea = await driver.findElement(By.name('my-textarea'))

    await textBox.sendKeys('Ignas Pangonis')
    await passwordBox.sendKeys('asdf1234')
    await textArea.sendKeys('This is a test message')

    assert.equal('Ignas Pangonis', await textBox.getAttribute('value'))
    assert.equal('asdf1234', await passwordBox.getAttribute('value'))
    assert.equal('This is a test message', await textArea.getAttribute('value'))

    await textBox.clear()
    await passwordBox.clear()
    await textArea.clear()

    assert.equal('', await textBox.getAttribute('value'))
    assert.equal('', await passwordBox.getAttribute('value'))
    assert.equal('', await textArea.getAttribute('value'))
  })

  it('writes to a datalist', async () => {
    const dropdown = await driver.findElement(By.name('my-datalist'))

    await dropdown.sendKeys('San Francisco')

    assert.equal('San Francisco', await dropdown.getAttribute('value'))
  })

  it('submits a form by clicking on the submit button', async () => {
    const textBox = await driver.findElement(By.name('my-text'))
    const submitButton = await driver.findElement(By.css('button'))

    await textBox.sendKeys('Ignas Pangonis')
    await submitButton.click()

    let message = await driver.findElement(By.id('message'))
    let value = await message.getText()

    assert.equal('Received!', value)
  })

  it('submits a form by pressing enter', async () => {
    const textBox = await driver.findElement(By.name('my-text'))

    await textBox.sendKeys('Ignas Pangonis')
    await textBox.sendKeys(Key.ENTER)

    let message = await driver.findElement(By.id('message'))
    let value = await message.getText()

    assert.equal('Received!', value)
  })

  it('checks and unchecks a checkbox', async () => {
    const checkbox = await driver.findElement(By.css("input[type='checkbox']:first-of-type"))

    assert.equal(true, await checkbox.isSelected())

    await checkbox.click()

    assert.equal(false, await checkbox.isSelected())

    await checkbox.click()

    assert.equal(true, await checkbox.isSelected())
  })
})
