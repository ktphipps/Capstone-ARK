import pyautogui;
import time;
import unittest 
from selenium import webdriver
from selenium.common.exceptions import NoAlertPresentException 
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.support import expected_conditions as EC

# inherit TestCase Class and create a new test class 
class userFirstLevel(unittest.TestCase): 

	# initialization of webdriver 
	def setUp(self): 
		self.driver = webdriver.Firefox()
		self.driver.implicitly_wait(30)

	# Test case method.
	def test_play_world1_level1_first_time(self): 
		
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

        # locate element using name 
		elem = driver.find_element_by_xpath("//a[contains(.,'Play Game')]") 
		# send data 
		elem.click()

		time.sleep(5)
		totalStars = driver.find_element_by_id("stars").text
		if (totalStars != "Total Stars: 0"):
		    assert False
		# locate element using name 
		elem = driver.find_element_by_id("world_1") 
		# send data 
		elem.click()

		time.sleep(5)
		stars = driver.find_element_by_id("stars").text
		if (stars != "Stars: 0"):
			assert False
		for i in range(2,12):
			if (driver.find_element_by_id("lvl_" + str(i)).is_enabled()):
				assert False
		# locate element using name 
		elem = driver.find_element_by_id("lvl_1") 
		# send data 
		elem.click()

		time.sleep(1)
		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'START')]") 
		# send data 
		elem.click() 

		time.sleep(0.38)

		# simulate playing the game
		timeLimit = time.time() + 30
		while time.time() < timeLimit:
			pyautogui.keyDown('space')
			time.sleep(0.1)
			pyautogui.keyUp('space')
			time.sleep(0.3)
		
		# check to make sure we are on the results screen
		elem = driver.find_element_by_id("score")
		time.sleep(5)
		# locate element using name 
		elem = driver.find_element_by_xpath("//a[contains(.,'Play Game')]") 
		# send data 
		elem.click()

		time.sleep(5)
		totalStars = driver.find_element_by_id("stars").text
		if (totalStars != "Total Stars: 2"):
		    assert False
		# locate element using name 
		elem = driver.find_element_by_id("world_1") 
		# send data 
		elem.click()
		
		time.sleep(5)
		stars = driver.find_element_by_id("stars").text
		if (stars != "Stars: 2"):
			assert False
		if (driver.find_element_by_id("lvl_2").is_enabled()):
			assert True
		else:
			assert False
		
		
	# cleanup method called after every test performed 
	def tearDown(self): 
		self.driver.close() 

# execute the script 
if __name__ == "__main__": 
	unittest.main() 
