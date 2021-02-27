const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

let driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

let driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


greetingTest(driver_fx);
greetingTest(driver_chr);

function greetingTest(driver) {
  driver.get('https://ractrainer.web.app/');

  driver.sleep(9000).then(function() {
    driver.findElement(By.id("loginBtn")).click();
  });

  driver.sleep(11000).then(function() {
    driver.findElement(By.id('Uname')).sendKeys('AutomatedTestingDemo@test.com');
  });

  driver.sleep(12000).then(function() {
    driver.findElement(By.id('password')).sendKeys('demoPassword');
  });

  driver.sleep(14000).then(function() {
    driver.findElement(By.id('btnLogin')).click();
  });

  driver.sleep(19000).then(function() {
    driver.findElement(By.id('greeting')).getText().then(function(text) {
      if(text === 'Welcome, automatedtestingdemo!') {
        console.log('User Greeting Test passed');
      } else {
        console.log('User Greeting Test failed');
      }
      driver.quit();
    });
  });

}