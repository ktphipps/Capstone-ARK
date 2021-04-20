import pyautogui;
import time;
import unittest 
from selenium import webdriver
from selenium.common.exceptions import NoAlertPresentException
from selenium.webdriver.common import alert 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.alert import Alert

# inherit TestCase Class and create a new test class 
class adminCreateUserExisting(unittest.TestCase): 

	# initialization of webdriver 
	def setUp(self): 
		self.driver = webdriver.Firefox()
		self.driver.implicitly_wait(30)
    
    # Test case method.
	def test_create_existing(self): 
		
		# get driver 
		driver = self.driver 
		# get ractrainer web app using selenium 
		driver.get("https://ractrainer.web.app/") 

		# locate element using name 
		elem = driver.find_element_by_xpath("//a[contains(.,'Login')]") 
		# send data 
		elem.click() 

		# locate element using id
		elem = driver.find_element_by_id("Uname")
		# send data 
		elem.send_keys('devteam@ractrainer.com')
		# locate element using id
		elem = driver.find_element_by_id("password")
		# send data 
		elem.send_keys('MEGAFISH')
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Log in')]") 
		# send data 
		elem.click() 

		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Create User')]") 
		# send data 
		elem.click() 

        # locate element using id
		elem = driver.find_element_by_id("createUname")
		# send data 
		elem.send_keys('Temp@test.com')
		# locate element using id
		elem = driver.find_element_by_id("createPassword")
		# send data 
		elem.send_keys('123456789')
        # locate element using id
		elem = driver.find_element_by_id("btnCreateUser")
        # send data 
		elem.click() 
		# give the database time to respond
		while (1):
			try:
				alert = driver.switch_to.alert
				alertText = alert.text
				alert.accept()
				break
			except NoAlertPresentException:
				continue
		assert "The email address is already in use by another account." in alertText
		

	# cleanup method called after every test performed 
	def tearDown(self): 
		self.driver.close() 

# execute the script 
if __name__ == "__main__": 
	unittest.main() 
