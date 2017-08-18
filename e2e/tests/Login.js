const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
const chai = require('chai');
const expect = chai.expect;

const driver = new webdriver.Builder()
    .forBrowser("chrome")
    .build();

describe("Login", () => {

    before(() => {
        driver.navigate().to("http://127.0.0.1:3000/");
    });

    describe("Failed login", () => {
        it("Enters invalid email and password fields fails to sign in", function () {
            driver.findElement(By.css("input[type=email]")).sendKeys("wrong@gmail.com");
            driver.findElement(By.css("input[type=password]")).sendKeys("");
            driver.findElement(By.css(".ui.green.fluid.button")).click();

            return driver.findElement(By.css("span.logo-name")).getText().then((text) => {
                expect(text).to.equal("Bucketlist")
            });
        }).timeout(20000);
    });

    describe("Successful Login", () => {
        it("Enters valid email and password fields and signs in successfully", function () {
            driver.findElement(By.css("input[type=email]")).clear();
            driver.findElement(By.css("input[type=password]")).clear();

            driver.findElement(By.css("input[type=email]")).sendKeys("dan@gmail.com");
            driver.findElement(By.css("input[type=password]")).sendKeys("pass");
            driver.findElement(By.css(".ui.green.fluid.button")).click();

            driver.wait(until.elementLocated(By.css("div.ui.simple.dropdown.item")));

            return driver.findElement(By.css("div.ui.simple.dropdown.item")).getText().then(text =>
                expect(text).to.equal("Dannie")
            );
        }).timeout(20000);
    });

    after(() => {
        driver.quit();
    });
});