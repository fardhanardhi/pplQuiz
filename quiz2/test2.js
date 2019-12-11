console.log("");
console.log("----- Quiz 2 -----");
console.log("Loading...");

const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

(async function test() {
  let driver = await new Builder().forBrowser("firefox").build();
  try {
    // Navigate to Url
    await driver.get("https://demo.1crmcloud.com/login.php");

    const inputUsername = await driver.findElement(By.id("login_user"));
    const inputPassword = await driver.findElement(By.id("login_pass"));

    await inputUsername.sendKeys("admin");
    await inputPassword.sendKeys("admin", Key.RETURN);

    const expected = "admin";

    try {
      await driver.wait(until.elementLocated(By.id("sidebar-inner")), 10000);
    } catch (error) {
      console.log(error);
    }

    await driver.sleep(3000);
    await driver.findElement(By.className("default-avatar")).click();

    await driver.sleep(3000);

    try {
      const label = await driver.findElement(By.css("#_form_subheader > h4"));
      let actual = await label.getAttribute("textContent");
      actual = await actual.substr(9, actual.length);

      assert.equal(await actual, expected, "Not Match");
      console.log(
        "[v] pass | (expected: ",
        expected,
        " - actual: ",
        actual,
        ")"
      );
    } catch (error) {
      console.log(
        "[x] fail | (expected: ",
        error.expected,
        " - actual: ",
        error.actual,
        ") | msg: ",
        error.message,
        ")"
      );
    }
  } finally {
    driver.quit();
  }
})();
