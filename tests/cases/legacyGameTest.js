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
  driver.get('http://localhost:5000/');

  driver.sleep(9000).then(function() {
    driver.findElement(By.xpath("//button[contains(.,'Set Parameters')]")).click();
  });

  driver.sleep(11000).then(function() {
    driver.findElement(By.xpath("//button[contains(.,'Start Game')]")).click();
  });

  driver.sleep(12000).then(function() {
    driver.findElement(By.id('startButton')).click();
  });

  driver.sleep(14000).then(function() {
    while (driver.getCurrentUrl() !== 'http://localhost:5000/user/results.html')
    {
        driver.sleep(600);
        driver.findElement(By.id('gameCanvas')).sendKeys(webdriver.Key.SPACE);
        console.log('Pressed Space');
    }

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