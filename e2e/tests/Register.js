const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
const chai = require('chai');
const expect = chai.expect;

const driver = new webdriver.Builder()
    .forBrowser("chrome")
    .build();

describe("Register", () => {
    before(() => {
        driver.navigate().to("http://127.0.0.1:3000/register");
    });

    describe("Failed registration", () => {
        it("should remain on the registration page", () => {
            driver.findElement(By.css(".ui.green.fluid.button")).click();

            return driver.findElement(By.css(".ui.green.fluid.button")).getText().then((text) => {
                expect(text).to.equal("Create Account")
            });
        }).timeout(10000);
    });

    describe("Successful registration", () => {
        it("should route user back to the login page", () => {
            driver.findElement(By.css("input[id=first_name]")).clear();
            driver.findElement(By.css("input[id=last_name]")).clear();
            driver.findElement(By.css("input[id=email]")).clear();
            driver.findElement(By.css("input[id=password]")).clear();
            driver.findElement(By.css("input[id=password_confirm]")).clear();

            driver.findElement(By.css("input[id=first_name]")).sendKeys("First");
            driver.findElement(By.css("input[id=last_name]")).sendKeys("Last");
            driver.findElement(By.css("input[id=email]")).sendKeys("wrong@gmail.com");
            driver.findElement(By.css("input[id=password]")).sendKeys("pass");
            driver.findElement(By.css("input[id=password_confirm]")).sendKeys("pass");

            driver.findElement(By.css(".ui.green.fluid.button")).click();

            driver.wait(until.elementLocated(By.css("div.Login.top-padding")));

            return driver.findElement(By.css("Button.ui.green.fluid.button")).getText().then((text) => {
                expect(text).to.equal("Sign in")
            });
        }).timeout(10000);
    });

    after(() => {
        driver.quit();
    });
});