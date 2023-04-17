import { By, Builder, until } from 'selenium-webdriver'
import { describe, before, after, it } from 'mocha'
import assert from 'assert'

describe('suninjuly.github.io/explicit_wait2.html', () => {
  let driver
  const TEST_URL = 'http://suninjuly.github.io/explicit_wait2.html'

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.get(TEST_URL)
  })

  afterEach(async () => await driver.quit())

  it('loads the page', async () => {
    const title = await driver.getTitle()

    assert.equal('Simple registration form', title)
  })

  it('waits for the optimal price ($100), clicks the "book" button and solves the capture', async () => {
    const bookButton = await driver.findElement(By.id('book'))
    const priceLocated = await driver.findElement(By.id('price'))

    await driver.wait(until.elementTextIs(priceLocated, '$100'), 20000)
    await bookButton.click()

    const numberText = await driver.findElement(By.id('input_value')).getText()
    const number = Number(numberText)

    if (isNaN(number)) {
      throw new Error('Could not extract number from question text')
    }

    const answer = Math.log(Math.abs(12 * Math.sin(number)))
    const answerInput = await driver.findElement(By.id('answer'))
    await answerInput.sendKeys(answer.toString())

    await driver.findElement(By.id('solve')).click()

    assert.match(await driver.switchTo().alert().getText(), /Congrats, you've passed the task!/)
  })
})
