import { By, Builder } from 'selenium-webdriver'
import { describe, before, after, it } from 'mocha'
import assert from 'assert'

// TODO mock API calls

describe('suninjuly.github.io/alert_accept.html', () => {
  let driver
  const TEST_URL = 'http://suninjuly.github.io/alert_accept.html'

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async () => await driver.quit())

  beforeEach(async () => {
    await driver.manage().deleteAllCookies()

    await driver.get(TEST_URL)
  })

  it('loads the page', async () => {
    const title = await driver.getTitle()

    assert.equal('Accept alert', title)
  })

  it('solves the capture', async () => {
    await driver.findElement(By.css('button')).click()

    driver.switchTo().alert().accept()

    const numberText = await driver
      .findElement(By.css('body > form > div > div > div > label > span:nth-child(2)'))
      .getText()

    const number = Number(numberText)

    if (isNaN(number)) {
      throw new Error('Could not extract number from question text')
    }

    const answer = Math.log(Math.abs(12 * Math.sin(number)))
    const answerInput = await driver.findElement(By.id('answer'))
    await answerInput.sendKeys(answer.toString())

    await driver.findElement(By.css('button')).click()

    assert.match(await driver.switchTo().alert().getText(), /Congrats, you've passed the task!/)
  })
})

describe('suninjuly.github.io/redirect_accept.html', () => {
  let driver
  const TEST_URL = 'http://suninjuly.github.io/redirect_accept.html'

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async () => await driver.quit())

  beforeEach(async () => {
    await driver.manage().deleteAllCookies()

    await driver.get(TEST_URL)
  })

  it('loads the page', async () => {
    const title = await driver.getTitle()

    assert.equal('Redirect accept', title)
  })

  it('solves the capture', async () => {
    await driver.findElement(By.css('button')).click()

    const tabs = await driver.getAllWindowHandles()
    await driver.switchTo().window(tabs[1])

    const numberText = await driver
      .findElement(By.css('body > form > div > div > div > label > span:nth-child(2)'))
      .getText()

    const number = Number(numberText)

    if (isNaN(number)) {
      throw new Error('Could not extract number from question text')
    }

    const answer = Math.log(Math.abs(12 * Math.sin(number)))
    const answerInput = await driver.findElement(By.id('answer'))
    await answerInput.sendKeys(answer.toString())

    await driver.findElement(By.css('button')).click()

    assert.match(await driver.switchTo().alert().getText(), /Congrats, you've passed the task!/)
  })
})
