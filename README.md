# Selenium E2E tests

A repo for myself to learn E2E testing with Selenium.

## Prerequisites

### Run `npm install`
This installs necessary JS dependencies.

### Set up environment
Read [Selenium docs](https://www.selenium.dev/documentation/webdriver/getting_started/) to set it up. Most importantly, you need a Chrome driver. Locally, I have it in the local directory as `chromedriver` (that's why it's in the `.gitignore`).

## Avalable commands

### `npm test`

Runs tests

### `npm run test:watch`

Runs tests and watches them, i. e. listens for file changes, that trigger the tests.

### `npm run test:match {filename}`

This runs the tests that match the filename. For example, `npm run test:match "src/4.1-explicit-wait.test.js"`

## Notes

Note that some tests take a long time. This is because the page calls a terribly slow API while the test is waiting for a result. This can be improved by mocking the API, but I didn't bother doing that, as it is out of scope for what I wanted achieve with this project.
