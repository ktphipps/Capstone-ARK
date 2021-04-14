import pyautogui;
import time;
import unittest; 
from selenium import webdriver
from selenium.common.exceptions import NoAlertPresentException 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support import expected_conditions as EC

# inherit TestCase Class and create a new test class 
class adminCreateUser(unittest.TestCase): 

	# initialization of webdriver 
	def setUp(self): 
		self.driver = webdriver.Firefox()
		self.driver.implicitly_wait(30)

	# Test case method.
	def test_create_user_new_first(self): 
		
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
				alert.accept()
				break
			except NoAlertPresentException:
				continue

		# locate element using name 
		elem = driver.find_element_by_xpath("//a[contains(.,'Research Portal')]") 
		# send data 
		elem.click()

		# locate element using id
		elem = driver.find_element_by_id("search")
		# send data 
		time.sleep(2)
		elem.send_keys('Temp')
		
		try:
			# locate elements using name 
			elem = driver.find_element_by_xpath("//td[contains(.,'Temp')]")
            # if no 'NoSuchElementException' is given then the user has been located in the table
			assert True
		except:
			assert False

	# cleanup method called after every test performed 
	def tearDown(self): 
		self.driver.close() 

# execute the script 
if __name__ == "__main__": 
	unittest.main() 
