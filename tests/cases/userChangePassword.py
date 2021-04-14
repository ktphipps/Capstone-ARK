import pyautogui;
import time;
import unittest 
from selenium import webdriver
from selenium.common.exceptions import NoAlertPresentException 
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support import expected_conditions as EC

# inherit TestCase Class and create a new test class 
class userChangePassword(unittest.TestCase): 

	# initialization of webdriver 
	def setUp(self): 
		self.driver = webdriver.Firefox()
		self.driver.implicitly_wait(30)

	# Test case method.
	def test_change_user_password(self): 
		
		# get driver 
		driver = self.driver 
		# get ractrainer web app using selenium 
		driver.get("http://localhost:5000/") 

		# locate element using name 
		elem = driver.find_element_by_xpath("//a[contains(.,'Login')]") 
		# send data 
		elem.click() 

		# locate element using id
		elem = driver.find_element_by_id("Uname")
		# send data 
		elem.send_keys('Temp@test.com')
		# locate element using id
		elem = driver.find_element_by_id("password")
		# send data 
		elem.send_keys('123456789')
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Log in')]") 
		# send data 
		elem.click()

		elem = driver.find_element_by_xpath("//button[contains(.,'Change Password')]") 
		# send data 
		elem.click()

		time.sleep(1)
		# locate element using id
		elem = driver.find_element_by_id("password")
		# send data 
		elem.send_keys('987654321')
        # locate element using id
		elem = driver.find_element_by_id("confirmPassword")
		# send data 
		elem.send_keys('987654321')

		time.sleep(1)
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Change Password')]") 
		# send data 
		elem.click()
        # give the database time to respond
		while (1):
			try:
				alert = driver.switch_to.alert
				alert.accept()
				break
			except NoAlertPresentException:
				continue

		time.sleep(1)
		# check to make sure we are on the user dashboard
		elem = driver.find_element_by_xpath("//a[contains(.,'Logout')]") 
		# send data 
		elem.click()

		# locate element using id
		elem = driver.find_element_by_id("Uname")
		# send data 
		elem.send_keys('Temp@test.com')
		# locate element using id
		elem = driver.find_element_by_id("password")
		# send data 
		elem.send_keys('123456789')
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Log in')]") 
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

		if (alertText != "The password is invalid or the user does not have a password."):
			assert False

		time.sleep(2)
		driver.refresh()
		# locate element using id
		elem = driver.find_element_by_id("Uname")
		# send data 
		elem.send_keys('Temp@test.com')
		# locate element using id
		elem = driver.find_element_by_id("password")
		# send data 
		elem.send_keys('987654321')
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Log in')]") 
		# send data 
		elem.click()
		
        #change the password back to the original
		elem = driver.find_element_by_xpath("//button[contains(.,'Change Password')]") 
		# send data 
		elem.click()
		
		time.sleep(1)
		# locate element using id
		elem = driver.find_element_by_id("password")
		# send data 
		elem.send_keys('123456789')
		# locate element using id
		elem = driver.find_element_by_id("confirmPassword")
		# send data 
		elem.send_keys('123456789')
		
		time.sleep(1)
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Change Password')]") 
		# send data 
		elem.click()
		# give the database time to respond
		while (1):
			try:
				alert = driver.switch_to.alert
				alert.accept()
				break
			except NoAlertPresentException:
				continue
		
		time.sleep(1)
		assert True        

	# cleanup method called after every test performed 
	def tearDown(self): 
		self.driver.close() 

# execute the script 
if __name__ == "__main__": 
	unittest.main() 
