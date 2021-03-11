import pyautogui;
import time;
import unittest 
from selenium import webdriver 
from selenium.webdriver.common.keys import Keys 

# inherit TestCase Class and create a new test class 
class legacyGameTest(unittest.TestCase): 

	# initialization of webdriver 
	def setUp(self): 
		self.driver = webdriver.Firefox() 

	# Test case method.
	def test_get_perfect_score(self): 
		
		# get driver 
		driver = self.driver 
		# get ractrainer web app using selenium 
		driver.get("https://ractrainer.web.app/") 

		time.sleep(2)

		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Play Game')]") 
		# send data 
		elem.click() 

		time.sleep(2)

		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'Start Game')]") 
		# send data 
		elem.click() 

		time.sleep(2)

		# locate element using name 
		elem = driver.find_element_by_xpath("//button[contains(.,'START')]") 
		# send data 
		elem.click() 

		time.sleep(0.38)

		timeLimit = time.time() + 25
		while time.time() < timeLimit:
			pyautogui.keyDown('space')
			time.sleep(0.1)
			pyautogui.keyUp('space')
			time.sleep(0.3)

		# check score
		elem = driver.find_element_by_id("score").text
		assert "Score: 100%" in elem 

		time.sleep(1)

	# cleanup method called after every test performed 
	def tearDown(self): 
		self.driver.close() 

# execute the script 
if __name__ == "__main__": 
	unittest.main() 
