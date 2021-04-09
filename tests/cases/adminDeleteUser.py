import pyautogui;
import time;
import unittest 
from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 

# inherit TestCase Class and create a new test class 
class adminCreateUser(unittest.TestCase): 

	# initialization of webdriver 
	def setUp(self): 
		self.driver = webdriver.Firefox() 

	# Test case method.
	def test_create_user(self): 
		
		# get driver 
		driver = self.driver 
		# get ractrainer web app using selenium 
		driver.get("http://localhost:5000/") 

		time.sleep(2)

		# locate element using name 
		elem = driver.find_element_by_xpath("//a[contains(.,'Login')]") 
		# send data 
		elem.click() 
		# give the browser time to respond
		time.sleep(2)

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
		# give the browser time to respond
		time.sleep(2)

		# locate element using id
		elem = driver.find_element_by_id("search")
		# send data 
		elem.send_keys('Temp')
        # give the browser time to respond
		time.sleep(2)

		try:
			# locate elements using name 
			elem = driver.find_element_by_xpath("//td[contains(.,'Temp')]")
            # if no 'NoSuchElementException' is given then the user has been located in
			# the table and we can continue the test
		except:
			assert False
        
        # send data 
		elem.click()
        # give the browser time to respond
		time.sleep(2)

        # locate element using name 
		elem = driver.find_element_by_xpath("//a[contains(.,'Account Recovery')]") 
		# send data 
		elem.click()
        # give the browser time to respond
		time.sleep(2)

        # locate element using name 
		elem = driver.find_element_by_id("btnDeleteUser")
		# send data 
		elem.click()
        # give the database time to respond
		time.sleep(10)
        # confirm deletion in pop-up window
		pyautogui.press('space')
        # give the database time to respond
		time.sleep(3)
        # exit confirmation of deletion
		pyautogui.press('space')
        # give the browser time to respond
		time.sleep(2)

        # locate element using id
		elem = driver.find_element_by_id("search")
		# send data 
		elem.send_keys('Temp')
        # give the browser time to respond
		time.sleep(2)

		try:
			# locate elements using name 
			elem = driver.find_element_by_xpath("//td[contains(.,'Temp')]")
            # if no 'NoSuchElementException' is given then the user has been located in the table
            # since they were supposed to be deleted in this case, this would be BAD
			assert False
		except:
			assert True

	# cleanup method called after every test performed 
	def tearDown(self): 
		self.driver.close() 

# execute the script 
if __name__ == "__main__": 
	unittest.main() 
