const webdriver = require("selenium-webdriver");
const By = webdriver.By;
const until = webdriver.until;
const chai = require('chai');
const expect = chai.expect;

const driver = new webdriver.Builder()
    .forBrowser("chrome")
    .build();

xdescribe("Bucketlist", () => {
    before(() => {
        driver.navigate().to("http://127.0.0.1:3000/");
    });

    describe("Create New Bucketlist", () => {
        it("should create a new Bucketlist", () => {
            driver.findElement(By.css("input[type=email]")).sendKeys("dan@gmail.com");
            driver.findElement(By.css("input[type=password]")).sendKeys("pass");
            driver.findElement(By.css(".ui.green.fluid.button")).click();

            //Wait for bucketlist home page to render
            driver.wait(until.elementLocated(By.css("div.ui.simple.dropdown.item")));

            let add_button = driver.findElement(By.css("a.ui.tiny.violet.circular.button"));
            add_button.click();

            //Wait for create bucketlist modal to display
            driver.wait(until.elementLocated(By.css("Modal.create-bucketlist")));

            driver.findElement(By.css("input[id=name]")).sendKeys("New bucketlist");
            driver.findElement(By.css("Button.ui.violet.button")).click();

            //Wait for the modal to disappear
            driver.wait(until.elementLocated(By.css("span.ui.header")));

            return driver.findElement(By.css("span.ui.header")).getText().then((text) => {
                expect(text).to.equal("Your Bucketlists")
            });
        }).timeout(50000);
    });

    after(() => {
        driver.quit();
    });
});