console.log("");
console.log("----- Quiz 1 -----");
console.log("Loading...");

const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

(async function test() {
  let driver = await new Builder().forBrowser("firefox").build();
  try {
    // Navigate to Url
    await driver.get(
      "https://s2.demo.opensourcecms.com/orangehrm/symfony/web/index.php/auth/login"
    );

    const inputUsername = await driver.findElement(By.id("txtUsername"));
    const inputPassword = await driver.findElement(By.id("txtPassword"));

    await inputUsername.sendKeys("opensourcecms");
    await inputPassword.sendKeys("opensourcecms");

    await driver.findElement(By.id("btnLogin")).click();

    const expected = "Welcome Admin";

    try {
      await driver.wait(until.elementLocated(By.id("option-menu")), 5000);
    } catch (error) {}

    try {
      const label = await driver.findElement(
        By.css("#option-menu > :first-child")
      );
      const actual = await label.getAttribute("textContent");

      assert.equal(await actual, expected, "Not Match");
      console.log("[v] pass | (expected: ", expected, " - actual: ", actual);
    } catch (error) {
      console.log(
        "[x] fail | (expected: ",
        error.expected,
        " - actual: ",
        error.actual,
        ") | msg: ",
        error.message
      );
    }
  } finally {
    driver.quit();
  }
})();
